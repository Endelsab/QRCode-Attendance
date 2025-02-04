import { GetTodaysAttendance } from "@/app/actions/GetTodaysAttendance";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";``

async function PresentTable() {
	const presents = await GetTodaysAttendance();

	return (
		<div className="flex overflow-x-hidden justify-center shadow-lg w-[400px] h-[400px] mr-10">
			<Card className="w-screen overflow-x-hidden">
				<CardHeader>
					<CardTitle className="text-xl font-bold">
						Today&apos;s Present{" "}
						<span className="text-sm font-thin ml-2 ">
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
										{present.student.fullname}
									</TableCell>
									<TableCell>{present.student.course_Year}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);
}

export default PresentTable;
