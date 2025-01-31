

// type StudentType = {
// 	id: string;
// 	fullname: string;
// 	course_Year: string;
// };

// function PresentTable({ student }: { student: StudentType }) {
// 	return (
// 		<div className="flex overflow-x-hidden justify-center shadow-lg w-[400px] h-[400px] mr-10">
// 			<Card className="w-screen overflow-x-hidden">
// 				<CardHeader>
// 					<CardTitle className="text-xl font-bold">
// 						Today's Present{" "}
// 						<span className="text-lg font-thin ml-20">Total: {}</span>
// 					</CardTitle>
// 				</CardHeader>
// 				<CardContent>
// 					<Table>
// 						<TableHeader>
// 							<TableRow>
// 								<TableHead>Fullname</TableHead>
// 								<TableHead>Course/Year</TableHead>
// 							</TableRow>
// 						</TableHeader>
// 						<TableBody>
// 							<TableRow key={student.id}>
// 								<TableCell className="font-medium">
// 									{student.fullname}
// 								</TableCell>
// 								<TableCell>{student.course_Year}</TableCell>
// 							</TableRow>
// 						</TableBody>
// 					</Table>
// 				</CardContent>
// 			</Card>
// 		</div>
// 	);
// }

// export default PresentTable;
