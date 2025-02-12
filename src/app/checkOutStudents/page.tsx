import CheckOutScanner from "@/components/CheckOutScanner";
import CheckOutTable from "@/components/CheckOutTable";

function CheckOutStudents() {
	return (
		<div className="flex flex-row">
			<div className="basis-1/2">
				<CheckOutScanner />
			</div>
			<div className="basis-1/2 flex overflow-x-hidden justify-center  shadow-lg  h-[400px] ">
				<CheckOutTable />
			</div>
		</div>
	);
}

export default CheckOutStudents;
