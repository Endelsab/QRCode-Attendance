import Scanner from "@/components/ScanQrCode";
import { GetTodaysAttendance } from "../actions/getTodaysAttendance";
import PresentTable from "@/components/presentTable";

export default async function Attendance() {
	const presentsToday = await GetTodaysAttendance();

	return (
		<div className="flex flex-row">
			<div className="basis-2/3">
				<Scanner />
			</div>
			<div className="basis-1/3 flex overflow-x-hidden justify-center w-[450px] shadow-lg  h-[400px] mr-10">
				<PresentTable presents={presentsToday} />
			</div>
		</div>
	);
}
