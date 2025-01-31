import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import Scanner from "@/components/ScanQrCode";

import { getTodaysAttendance } from "../actions/getTodaysAttendance";

export default async function Attendance() {
	const presentsToday = await getTodaysAttendance();

	return (
		<div className="flex flex-row">
			<div className="basis-2/3">
				<Scanner />
			</div>
			<div className="basis-1/3 flex overflow-x-hidden justify-center w-[450px] shadow-lg  h-[400px] mr-10">
				<Card className="w-screen overflow-x-hidden">
					<CardHeader>
						<CardTitle className="text-xl font-bold">
							Today's Present{" "}
							{/* <span className="text-lg font-thin ml-20">Total: {}</span> */}
						</CardTitle>
					</CardHeader>
					<CardContent>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Fullname</TableHead>
									<TableHead>Course/Year</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{presentsToday.map((student) => (
									<TableRow key={student.studentId}>
										<TableCell className="font-medium">
											{student.student.fullname}
										</TableCell>
										<TableCell>{student.student.course_Year}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
