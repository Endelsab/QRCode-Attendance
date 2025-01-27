import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
	return (
		<div className=" flex bg-white justify-center items-center min-h-screen  ">
			<div className=" bg-white flex flex-col p-6 rounded-md shadow-lg justify-center items-center gap-20 ">
				<div>
					<h1 className="text-4xl font-bold ">POGI PROBLEMS</h1>
				</div>
				<div className="flex gap-10">
					<Link href={"/addstudent"}>
						<Button>generate qr-code</Button>
					</Link>

					<Link href={"/Scanner"}>
						<Button>scan qr-code</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}
