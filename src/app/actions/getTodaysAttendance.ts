"use server";

import prisma from "@/lib/prisma";

export async function GetTodaysAttendance() {
     const oneHoursAgo = new Date();
     oneHoursAgo.setHours(oneHoursAgo.getHours() - 1);

     const now = new Date();

     try {
          const presentToday = await prisma.attendance.findMany({
               where: {
                    createdAt: {
                         gte: oneHoursAgo,
                         lte: now,
                    },
               },
               distinct: ["studentId"],
               orderBy: {
                    createdAt: "desc",
               },
               include: {
                    student: {
                         select: {
                              id: true,
                              fullname: true,
                              course_Year: true,
                         },
                    },
               },
          });

          return presentToday;
     } catch (error) {
          console.error("Error in getPosts", error);
          return [];
     }
}
