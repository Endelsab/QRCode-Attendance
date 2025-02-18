"use client";

import { useQuery } from "@tanstack/react-query";

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
import { GetCheckedOutStudents } from "@/app/actions/CheckOutStudents";

function CheckOutTable() {
     const {
          data: checkOutToday = [],
          isLoading,
          isError,
     } = useQuery({
          queryKey: ["GetCheckedOutStudents"],
          queryFn: GetCheckedOutStudents,
          refetchInterval: 500,
     });

     if (isLoading) return <SkeletonCard />;
     if (isError) return <div>Error loading attendance data.</div>;
     return (
          <div className="flex  overflow-x-hidden justify-center shadow-lg w-[600px] h-[400px] ">
               <Card className="w-screen overflow-x-hidden">
                    <CardHeader>
                         <CardTitle className="text-xl font-bold">
                              Checked-out Students
                              <span className="text-sm font-thin ml-5">
                                   Total: {checkOutToday.length}
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
                                   {checkOutToday.map((checkOutStudent) => (
                                        <TableRow key={checkOutStudent.id}>
                                             <TableCell className="font-medium max-w-[150px] truncate whitespace-nowrap overflow-hidden text-ellipsis">
                                                  {checkOutStudent.student
                                                       ?.fullname || "N/A"}
                                             </TableCell>
                                             <TableCell className="max-w-[120px] truncate whitespace-nowrap overflow-hidden text-ellipsis">
                                                  {checkOutStudent.student
                                                       ?.course_Year || "N/A"}
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

export default CheckOutTable;
