"use client";

import { Html5Qrcode } from "html5-qrcode";
import React, { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "./ui/button";
import { Attendance } from "@/app/actions/Attendance";

const Scanner = () => {
     const [result, setResult] = useState("Scan your QR code");
     const [isScanning, setIsScanning] = useState(false);

     const scannerRef = useRef<Html5Qrcode | null>(null);
     const lastScanTimeRef = useRef(0);
     const scanInterval = 1000;

     const startScanner = useCallback(async () => {
          if (scannerRef.current) {
               await scannerRef.current.stop().catch(console.error);
          }

          scannerRef.current = new Html5Qrcode("reader");
          setIsScanning(true);

          try {
               await scannerRef.current.start(
                    { facingMode: "environment" },
                    { fps: 15, qrbox: { width: 300, height: 270 } },
                    async (decodedText) => {
                         const now = Date.now();
                         if (now - lastScanTimeRef.current < scanInterval) {
                              console.log(
                                   "Scan ignored to prevent multiple triggers."
                              );
                              return;
                         }
                         lastScanTimeRef.current = now;

                         setResult(decodedText);

                         const audio = new Audio("/scan_beep.mp3");
                         audio.play();

                         const result = await Attendance(decodedText);

                         if (!result.success) {
                              toast.error(" error || Already checked out");
                              return;
                         } else {
                              toast.success("Present never absent ");
                         }
                    },
                    (errorMessage) => {
                         if (errorMessage.includes("NotFoundException")) {
                              return;
                         }
                         console.warn("QR Code scan error:", errorMessage);
                    }
               );
          } catch (error) {
               console.error("Failed to start scanner:", error);
               toast.error("Scanner failed to start");
          }
     }, []);

     const stopScanner = useCallback(async () => {
          if (scannerRef.current) {
               await scannerRef.current.stop().catch(console.error);
               await scannerRef.current.clear();
               scannerRef.current = null;
               setIsScanning(false);
          }
     }, []);

     useEffect(() => {
          startScanner();

          return () => {
               stopScanner();
          };
     }, [startScanner, stopScanner]);

     return (
          <div className="flex flex-col w-[400px] h-[400px] gap-2">
               <div id="reader"></div>
               <div className="w-[250px] flex justify-center items-center">
                    <h1 className="text-lg ml-20 font-bold">{result}</h1>
               </div>
               <Button
                    className="mt-2"
                    onClick={isScanning ? stopScanner : startScanner}
               >
                    {isScanning ? "Stop Scanning" : "Start Scanner"}
               </Button>
          </div>
     );
};

export default Scanner;
