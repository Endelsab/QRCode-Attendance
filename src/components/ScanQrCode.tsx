"use client";

import { Html5QrcodeScanner } from "html5-qrcode";
import { Html5QrcodeScannerConfig } from "html5-qrcode/esm/html5-qrcode-scanner";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const Scanner = () => {
	const [result, setResult] = useState("Scan your QR code");
	const scanInterval = 1000;
	const lastScanTimeRef = useRef(0); // 🔹 Persist last scan time
	const isPausedRef = useRef(false); // 🔹 Persist pause state

	const config: Html5QrcodeScannerConfig = {
		fps: 10,
		qrbox: { width: 250, height: 250 },
	};

	async function sendEmail(studentId: string) {
		try {
			const response = await fetch("/api/emails", {
				method: "POST",
				body: JSON.stringify({ studentId }),
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (!response.ok) {
				const error = await response.json();
				console.error("Failed to send email:", error);
				toast.error("Failed to send email");
				throw new Error(error.message || "Failed to send email");
			}

			const data = await response.json();
			console.log("Email sent successfully:", data);
			toast.success("Present never absent!");

			return { success: true, data };
		} catch (error) {
			console.error("Error sending email:", error);
			toast.error("Error sending email");
			return {
				success: false,
				error: error instanceof Error ? error.message : "Unknown error",
			};
		}
	}

	useEffect(() => {
		const scanner = new Html5QrcodeScanner("reader", config, false);

		async function success(decodedText: string) {
			const now = Date.now();

			if (now - lastScanTimeRef.current < scanInterval) {
				console.log("Scan ignored to prevent multiple triggers.");
				if (!isPausedRef.current) {
					scanner.pause();
					isPausedRef.current = true;
				}
				return;
			}

			lastScanTimeRef.current = now; // 🔹 Update last scan time
			setResult(decodedText);
			console.log("Scanned Data:", decodedText);

			await sendEmail(decodedText);

			setTimeout(() => {
				if (isPausedRef.current) {
					scanner.resume();
					isPausedRef.current = false;
				}
			}, scanInterval);
		}

		function error(err: any) {
			console.warn("Scan error:", err);
		}

		scanner.render(success, error);

		return () => {
			scanner
				.clear()
				.catch((err) => console.error("Failed to clear scanner:", err));
		};
	}, []);

	return (
		<div className="flex flex-col w-[400px] h-[400px] gap-2">
			<div id="reader"></div>
			<div className="w-[250px] flex justify-center items-center">
				<h1 className="text-xl font-bold">{result}</h1>
			</div>
		</div>
	);
};

export default Scanner;
