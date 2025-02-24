"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

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
          label: "Desktop",
          color: "hsl(var(--chart-1))",
     },
} satisfies ChartConfig;

function Home() {
     return (
          <Card>
               <CardHeader>
                    <CardTitle>Present Analytics</CardTitle>
                    <CardDescription className="mt-3">
                         First Semester
                    </CardDescription>
               </CardHeader>
               <CardContent>
                    <ChartContainer config={chartConfig}>
                         <BarChart accessibilityLayer data={chartData}>
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
                              />
                         </BarChart>
                    </ChartContainer>
               </CardContent>
               <CardFooter className="flex-col items-start gap-2 text-sm">
                    <div className="flex gap-2 font-medium leading-none">
                         Powered By Wendel aka ctrl c and v
                    </div>
               </CardFooter>
          </Card>
     );
}

export default Home;
