import GetTodaysAttendance from "@/app/actions/GetTodaysAttendance";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

interface Student {
	fullname: string;
	course_Year: string;
}

interface Present {
	id: string;
	student?: Student;
}

export default async function PresentTable() {
	const presents: Present[] = await GetTodaysAttendance();
	return (
		<div className="flex overflow-x-hidden justify-center shadow-lg w-[400px] h-[400px] mr-10">
			<Card className="w-screen overflow-x-hidden">
				<CardHeader>
					<CardTitle className="text-xl font-bold">
						Today&apos;s Present{" "}
						<span className="text-sm font-thin ml-2">
							Total: {presents.length}
						</span>
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
							{presents.map((present) => (
								<TableRow key={present.id}>
									<TableCell className="font-medium">
										{present.student?.fullname || "N/A"}
									</TableCell>
									<TableCell>{present.student?.course_Year || "N/A"}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);
}
