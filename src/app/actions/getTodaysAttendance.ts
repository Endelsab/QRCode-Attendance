"use server";

import prisma from "@/lib/prisma";

export async function GetTodaysAttendance() {
     const fiveMinutesAgo = new Date();
     fiveMinutesAgo.setMinutes(fiveMinutesAgo.getMinutes() - 5);

     const now = new Date();

     try {
          const presentToday = await prisma.attendance.findMany({
               where: {
                    createdAt: {
                         gte: fiveMinutesAgo,
                         lte: now,
                    },
               },
               distinct: ["studentId"], // Ensures only one record per student
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
