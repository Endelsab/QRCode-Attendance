"use client";

import {
     Card,
     CardContent,
     CardDescription,
     CardFooter,
     CardHeader,
     CardTitle,
} from "@/components/ui/card";
import {
     ChartConfig,
     ChartContainer,
     ChartTooltip,
     ChartTooltipContent,
} from "@/components/ui/chart";
import {
     Select,
     SelectContent,
     SelectItem,
     SelectTrigger,
     SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import { GetAttendanceByMonth } from "./actions/GetAttendanceByMonth";

export default function PresentChart() {
     // State for semester selection
     const [selectedSemester, setSelectedSemester] =
          useState("Second Semester");

     // Fetch data for all months of the selected semester
     const {
          data: attendanceData,
          isLoading,
          isError,
     } = useQuery({
          queryKey: ["GetAttendanceBySemester", selectedSemester],

          queryFn: async () => {
               const months =
                    selectedSemester === "First Semester" ?
                         [8, 9, 10, 11, 12]
                    :    [1, 2, 3, 4, 5];

               const promises = months.map((month) =>
                    GetAttendanceByMonth(month)
               );
               return Promise.all(promises);
          },
          refetchInterval: 500,
     });

     const firstSemesterMonths = [
          { name: "August", value: 8 },
          { name: "September", value: 9 },
          { name: "October", value: 10 },
          { name: "November", value: 11 },
          { name: "December", value: 12 },
     ];

     const secondSemesterMonths = [
          { name: "January", value: 1 },
          { name: "February", value: 2 },
          { name: "March", value: 3 },
          { name: "April", value: 4 },
          { name: "May", value: 5 },
     ];

     // Determine months to show based on semester selection
     const displayedMonths =
          selectedSemester === "First Semester" ? firstSemesterMonths : (
               secondSemesterMonths
          );

     // Get current month (to set future months to 0)
     const currentMonth = new Date().getMonth() + 1;

     // Format attendance data to ensure all months are displayed
     const chartData = displayedMonths.map((month, index) => {
          const attendance =
               (
                    attendanceData?.[index]?.attendance &&
                    month.value <= currentMonth
               ) ?
                    attendanceData[index].attendance
               :    0;

          return { month: month.name, desktop: attendance };
     });

     const chartConfig = {
          desktop: {
               label: "Present",
               color: "hsl(var(--chart-1))",
          },
     } satisfies ChartConfig;

     return (
          <Card>
               <CardHeader>
                    <CardTitle>Presents Analytics</CardTitle>
                    <CardDescription>
                         S.Y 2024-2025 - {selectedSemester}
                    </CardDescription>
               </CardHeader>
               <CardContent>
                    {/* Semester Selector */}
                    <Select
                         onValueChange={(value) => setSelectedSemester(value)}
                         value={selectedSemester}
                    >
                         <SelectTrigger className="w-[180px] mb-4">
                              <SelectValue placeholder="Select Semester" />
                         </SelectTrigger>
                         <SelectContent>
                              <SelectItem value="First Semester">
                                   First Semester
                              </SelectItem>
                              <SelectItem value="Second Semester">
                                   Second Semester
                              </SelectItem>
                         </SelectContent>
                    </Select>

                    {/* Chart */}
                    {isLoading ?
                         <p>Loading...</p>
                    : isError ?
                         <p>Error fetching data</p>
                    :    <ChartContainer config={chartConfig}>
                              <BarChart
                                   accessibilityLayer
                                   data={chartData}
                                   width={700}
                                   margin={{
                                        top: 20,
                                        right: 30,
                                        left: 20,
                                        bottom: 10,
                                   }}
                                   barSize={50}
                              >
                                   <CartesianGrid vertical={false} />
                                   <XAxis
                                        dataKey="month"
                                        tickLine={false}
                                        tickMargin={10}
                                        axisLine={false}
                                        tickFormatter={(value) =>
                                             value.slice(0, 3)
                                        }
                                   />
                                   <ChartTooltip
                                        cursor={false}
                                        content={
                                             <ChartTooltipContent hideLabel />
                                        }
                                   />
                                   <Bar
                                        dataKey="desktop"
                                        fill="var(--color-desktop)"
                                        radius={8}
                                   >
                                        <LabelList
                                             position="top"
                                             offset={12}
                                             className="fill-foreground"
                                             fontSize={12}
                                        />
                                   </Bar>
                              </BarChart>
                         </ChartContainer>
                    }
               </CardContent>
               <CardFooter className="flex-col items-start gap-2 text-sm">
                    <div className="leading-none text-muted-foreground">
                         powered by Wendel
                    </div>
               </CardFooter>
          </Card>
     );
}
