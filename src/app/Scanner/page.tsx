"use client";

import { Html5QrcodeScanner } from "html5-qrcode";
import { Html5QrcodeScannerConfig } from "html5-qrcode/esm/html5-qrcode-scanner";
import React, { useEffect, useState } from "react";
import { sendEmail } from "../actions/send-email";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Scanner = () => {
	const [result, setResult] = useState("Scan your QR code");
	const scan_interval = 2000;
	let lastScanTime = 0;
	let isPaused = false;

	const config: Html5QrcodeScannerConfig = {
		fps: 10, // Scanning frames per second
		qrbox: { width: 300, height: 300 }, // Scanning area
	};

	useEffect(() => {
		const scanner = new Html5QrcodeScanner("reader", config, false);

		// Success callback for scanning
		async function success(decodedText: string) {
			const now = Date.now();

			// Check if the scan is within the allowed interval
			if (now - lastScanTime < scan_interval) {
				console.log("Scan ignored to prevent multiple triggers.");
				if (!isPaused) {
					scanner.pause();
					isPaused = true;
				}
				return;
			}

			lastScanTime = now;
			setResult(decodedText);
			console.log("Scanned Data:", decodedText);

			// Send an email
			try {
				await sendEmail(decodedText); //
				toast.success("Present !");
			} catch (err) {
				toast.error("Failed to scan present !");
				console.error("Email sending error:", err);
			}

			// Resume scanning after the rate limit interval
			setTimeout(() => {
				if (isPaused) {
					scanner.resume();
					isPaused = false;
				}
			}, scan_interval);
		}

		// Error callback for scanning
		function error(err: any) {
			console.warn("Scan error:", err);
		}

		scanner.render(success, error);

		// Cleanup on component unmount
		return () => {
			scanner
				.clear()
				.catch((err) => console.error("Failed to clear scanner:", err));
		};
	}, []);

	return (
		<div className=" flex flex-col min-h-screen justify-center items-center gap-6 ">
			<div id="reader"> </div>

			<div className="w-[250px] flex justify-center items-center">
				<h3 className="text-2xl font-bold"> {result} </h3>
			</div>

			<Link href={"/"}>
				<Button> cancel</Button>
			</Link>
		</div>
	);
};

export default Scanner;
