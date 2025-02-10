import Link from "next/link";
import { Button } from "./ui/button";
import { Users2, ContactRound, LogOutIcon } from "lucide-react";

function AppSidebar() {
	return (
		<div className="  w-[300px] h-[400px] shadow-lg  rounded-md flex flex-col p-4 ">
			<h1 className="font-bold text-md p-4 ml-24">Menu</h1>
			<div className="flex flex-col gap-5 p-2 mt-5 ">
				<Link href={"/students"}>
					<div className="flex gap-2 border-b hover:bg-slate-100 rounded-sm p-2 cursor-pointer ">
						<Users2 className="size-4" />
						<p className="">Students</p>
					</div>
				</Link>

				<Link href={"/attendance"}>
					<div className="flex gap-2 border-b hover:bg-slate-100 rounded-sm p-2 cursor-pointer ">
						<ContactRound className="size-4" />
						<p className="">Attendance</p>
					</div>
				</Link>
			</div>
			<div className=" mt-[140px] ">
				<Button variant={"destructive"} className="w-full">
					Logout <LogOutIcon className="ml-2  size-6" />
				</Button>
			</div>
		</div>
	);
}

export default AppSidebar;
