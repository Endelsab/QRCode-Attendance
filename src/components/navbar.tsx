"use client";

import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";

function Navbar() {
	return (
		<nav className="sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
			<div className="max-w-7xl mx-auto p-4 flex justify-between">
				<h1 className="font-bold text-2xl">Attendance</h1>
				<div className="flex gap-2 ">
					<ModeToggle />

					<Link href={"/"}>
						<Button variant={"outline"}>Dashboard</Button>
					</Link>

				
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
