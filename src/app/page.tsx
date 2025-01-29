import PresentChart from "@/components/chart";
import AppSidebar from "@/components/Sidebar";

export default function Home() {
	return (
		<div className="  bg-white ">
			<div className="flex ">
				<div className="basis-1/3 mt-5 ">
					<div className="flex justify-center items-center">
						<AppSidebar />
					</div>
				</div>

				<div className="basis-2/3 mt-5 px-4">
					<PresentChart />
				</div>
			</div>
		</div>
	);
}

{
	/* <div className=" bg-white flex flex-col p-6 rounded-md shadow-lg justify-center items-center gap-20 ">
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
</div>; */
}
