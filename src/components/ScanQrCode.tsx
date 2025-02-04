"use client";

import { Html5Qrcode } from "html5-qrcode";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "./ui/button";

const Scanner = () => {
	const [result, setResult] = useState("Scan your QR code");
	const [isScanning, setIsScanning] = useState(false);
	const scannerRef = useRef<Html5Qrcode | null>(null);
	const lastScanTimeRef = useRef(0);
	const scanInterval = 2000;

	async function sendEmail(studentId: string) {
		try {
			const response = await fetch("/api/emails", {
				method: "POST",
				body: JSON.stringify({ studentId }),
				headers: { "Content-Type": "application/json" },
			});

			if (!response.ok) {
				const error = await response.json();
				toast.error("Failed to send email");
				throw new Error(error.message || "Failed to send email");
			}
		} catch (error) {
			console.error("Error sending email:", error);
			console.error("Error sending email");
		}
	}

	const startScanner = async () => {
		if (!scannerRef.current) {
			scannerRef.current = new Html5Qrcode("reader");
		}

		setIsScanning(true);

		try {
			await scannerRef.current.start(
				{ facingMode: "environment" },
				{ fps: 10, qrbox: { width: 250, height: 250 } },

				async (decodedText) => {
					const now = Date.now();
					if (now - lastScanTimeRef.current < scanInterval) {
						console.log("Scan ignored to prevent multiple triggers.");
						return;
					}

					lastScanTimeRef.current = now;
					setResult(decodedText);
					toast.success("Present never absent !");
					console.log("Scanned Data:", decodedText);

					await sendEmail(decodedText);
				},
				(errorMessage) => {
					console.warn("QR Code scan error:", errorMessage);
				},
			);
		} catch (error) {
			console.error("Failed to start scanner:", error);
			toast.error("Scanner failed to start");
		}
	};

	const stopScanner = async () => {
		if (scannerRef.current) {
			await scannerRef.current.stop();
			setIsScanning(false);
		}
	};

	useEffect(() => {
		startScanner();

		return () => {
			stopScanner();
		};
	}, []);

	return (
		<div className="flex flex-col w-[400px] h-[400px] gap-2">
			<div id="reader"></div>
			<div className="w-[250px] flex justify-center items-center">
				<h1 className="text-lg ml-20 font-bold">{result}</h1>
			</div>
			<Button
				variant={"destructive"}
				onClick={isScanning ? stopScanner : startScanner}>
				{isScanning ? "Stop Scanning" : "Start Scanner"}
			</Button>
		</div>
	);
};

export default Scanner;
