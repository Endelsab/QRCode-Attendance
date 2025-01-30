"use client";

import { Html5QrcodeScanner } from "html5-qrcode";
import { Html5QrcodeScannerConfig } from "html5-qrcode/esm/html5-qrcode-scanner";
import React, { useEffect, useState } from "react";
import { sendEmail } from "../actions/send-email";
import toast from "react-hot-toast";
import PresentTable from "@/components/presentTable";

const Scanner = () => {
	const [result, setResult] = useState("Scan your QR code");
	const scan_interval = 2000;
	let lastScanTime = 0;
	let isPaused = false;

	const config: Html5QrcodeScannerConfig = {
		fps: 10,
		qrbox: { width: 300, height: 300 },
	};

	useEffect(() => {
		const scanner = new Html5QrcodeScanner("reader", config, false);

		async function success(decodedText: string) {
			const now = Date.now();

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

			try {
				await sendEmail(decodedText);
				toast.success("Present !");
			} catch (err) {
				toast.error("Failed to scan present !");
				console.error("Email sending error:", err);
			}

			setTimeout(() => {
				if (isPaused) {
					scanner.resume();
					isPaused = false;
				}
			}, scan_interval);
		}

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
		<div className="flex gap-6 justify-between ">
			<div className=" flex flex-col  w-[400px]   gap-2 ">
				<div id="reader"> </div>

				<div className="w-[250px] flex justify-center items-center">
					<h1 className="text-xl font-bold"> {result} </h1>
				</div>
			</div>

			<div className=" flex justify-center w-[400px] h-[400px]  mr-10 ">
				<PresentTable />
			</div>
		</div>
	);
};

export default Scanner;
