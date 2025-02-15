"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

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

const chartData = [
     { month: "January", desktop: 186 },
     { month: "February", desktop: 305 },
     { month: "March", desktop: 237 },
     { month: "April", desktop: 73 },
     { month: "May", desktop: 209 },
     { month: "June", desktop: 214 },
];

const chartConfig = {
     desktop: {
          label: "Present",
          color: "hsl(var(--chart-1))",
     },
} satisfies ChartConfig;

export default function PresentChart() {
     return (
          <Card>
               <CardHeader>
                    <CardTitle>Presents Analytics</CardTitle>
                    <CardDescription>
                         Second semester S.Y 2024-2025
                    </CardDescription>
               </CardHeader>
               <CardContent>
                    <ChartContainer config={chartConfig}>
                         <BarChart
                              accessibilityLayer
                              data={chartData}
                              margin={{
                                   top: 20,
                              }}
                         >
                              <CartesianGrid vertical={false} />
                              <XAxis
                                   dataKey="month"
                                   tickLine={false}
                                   tickMargin={10}
                                   axisLine={false}
                                   tickFormatter={(value) => value.slice(0, 3)}
                              />
                              <ChartTooltip
                                   cursor={false}
                                   content={<ChartTooltipContent hideLabel />}
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
               </CardContent>
               <CardFooter className="flex-col items-start gap-2 text-sm">
                    <div className="flex gap-2 font-medium leading-none">
                         Attendence up by 5.2% this month{" "}
                         <TrendingUp className="h-4 w-4" />
                    </div>
                    <div className="leading-none text-muted-foreground">
                         powered by Wendel
                    </div>
               </CardFooter>
          </Card>
     );
}
