import type { Metadata } from "next";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/navbar";
import QueryProvider from "@/components/QueryProvider";
import AppSidebar from "@/components/Sidebar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
     variable: "--font-geist-sans",
     subsets: ["latin"],
});

const geistMono = Geist_Mono({
     variable: "--font-geist-mono",
     subsets: ["latin"],
});

export const metadata: Metadata = {
     title: "QRCodeAttendance",
     description: "Powered by Wendel",
};

export default function RootLayout({
     children,
}: Readonly<{
     children: React.ReactNode;
}>) {
     return (
          <html lang="en" suppressHydrationWarning={true}>
               <body
                    className={`${geistSans.variable} ${geistMono.variable} antialiased  `}
               >
                    <ThemeProvider
                         attribute="class"
                         defaultTheme="system"
                         enableSystem
                         disableTransitionOnChange
                    >
                         <QueryProvider>
                              <div className="min-h-screen">
                                   <Navbar />

                                   <div className="flex ">
                                        <div className="basis-1/3 mt-5 ">
                                             <div className="flex justify-center items-center">
                                                  <AppSidebar />
                                             </div>
                                        </div>

                                        <div className="basis-2/3 mt-5 px-4">
                                             {children}
                                        </div>
                                   </div>
                              </div>
                         </QueryProvider>

                         <Toaster />
                    </ThemeProvider>
               </body>
          </html>
     );
}
