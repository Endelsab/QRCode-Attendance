"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Users2, ContactRound, LogOutIcon, UserX2Icon } from "lucide-react";

function AppSidebar() {
	return (
		<div className="  w-[300px] h-[400px] shadow-lg border  rounded-md flex flex-col p-4  justify-between">
			<div>
				<h1 className="font-bold text-md p-4 ml-24">Menu</h1>
			</div>
			<div className="flex flex-col gap-5 p-2 mt-5 ">
				<Link href={"/students"}>
					<div
						className="flex gap-2 border-b border-gray-300 dark:border-gray-700 
                hover:bg-gray-100 dark:hover:bg-zinc-900 
                rounded-md p-2 cursor-pointer transition-colors duration-200">
						<Users2 className="size-4 text-gray-700 dark:text-gray-300" />
						<p className="text-gray-800 dark:text-gray-200">Students</p>
					</div>
				</Link>

				<Link href={"/attendance"}>
					<div
						className="flex gap-2 border-b border-gray-300 dark:border-gray-700 
                hover:bg-gray-100 dark:hover:bg-zinc-900 
                rounded-md p-2 cursor-pointer transition-colors duration-200">
						<ContactRound className="size-4" />
						<p className="">Attendance</p>
					</div>
				</Link>
				<Link href={"/checkOutStudents"}>
					<div
						className="flex gap-2 border-b border-gray-300 dark:border-gray-700 
                hover:bg-gray-100 dark:hover:bg-zinc-900 
                rounded-md p-2 cursor-pointer transition-colors duration-200">
						<UserX2Icon className="size-4" />
						<p className="">Check out</p>
					</div>
				</Link>
			</div>
			<div className=" ">
				<Button className="w-full">
					Logout <LogOutIcon className="ml-2  size-6" />
				</Button>
			</div>
		</div>
	);
}

export default AppSidebar;
