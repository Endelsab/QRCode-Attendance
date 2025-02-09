import Scanner from "@/components/ScanQrCode";

import PresentTable from "@/components/presentTable";

export default async function Attendance() {
	return (
		<div className="flex flex-row">
			<div className="basis-1/2">
				<Scanner />
			</div>
			<div className="basis-1/2 flex overflow-x-hidden justify-center  shadow-lg  h-[400px] ">
				<PresentTable />
			</div>
		</div>
	);
}
