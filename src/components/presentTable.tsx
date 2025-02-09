"use client";

import { useQuery } from "@tanstack/react-query";

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
import SkeletonCard from "./SkeletonCard";

export default function PresentTable() {
	const {
		data: presents = [],
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["todaysAttendance"],
		queryFn: GetTodaysAttendance,
		refetchInterval: 500,
	});

	if (isLoading) return <SkeletonCard />;
	if (isError) return <div>Error loading attendance data.</div>;

	return (
		<div className="flex  overflow-x-hidden justify-center shadow-lg w-[600px] h-[400px] ">
			<Card className="w-screen overflow-x-hidden">
				<CardHeader>
					<CardTitle className="text-xl font-bold">
						Today&apos;s Present{" "}
						<span className="text-sm font-thin ml-5">
							Total: {presents.length}
						</span>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<Table className="w-full table-auto">
						<TableHeader>
							<TableRow>
								<TableHead>Fullname</TableHead>
								<TableHead>Course/Year</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{presents.map((present) => (
								<TableRow key={present.id}>
									<TableCell className="font-medium max-w-[150px] truncate whitespace-nowrap overflow-hidden text-ellipsis">
										{present.student?.fullname || "N/A"}
									</TableCell>
									<TableCell className="max-w-[120px] truncate whitespace-nowrap overflow-hidden text-ellipsis">
										{present.student?.course_Year || "N/A"}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);
}
