import Link from "next/link";
import { Button } from "./ui/button";
import { Users2, ContactRound, ChartAreaIcon } from "lucide-react";

function AppSidebar() {
	return (
		<div className="  w-[300px] shadow-lg  rounded-md flex flex-col p-4  ">
			<h1 className="font-bold text-md p-4 ml-24">Menu</h1>
			<div className="flex flex-col gap-5 p-2 mt-5 ">
				<div className="flex gap-2 border-b hover:bg-slate-100 rounded-sm p-2 cursor-pointer ">
					<Users2 className="size-4" />
					<p className="">Students</p>
				</div>
				<Link href={"/Scanner"}>
					<div className="flex gap-2 border-b hover:bg-slate-100 rounded-sm p-2 cursor-pointer ">
						<ContactRound className="size-4" />
						<p className="">Attendance</p>
					</div>
				</Link>

				<div className="flex gap-2 border-b hover:bg-slate-100 rounded-sm p-2 cursor-pointer ">
					<ChartAreaIcon className="size-4" />
					<p className="">Chart</p>
				</div>
			</div>
			<div className="mt-20 ">
				<Button className="w-full">Logout</Button>
			</div>
		</div>
	);
}

export default AppSidebar;
