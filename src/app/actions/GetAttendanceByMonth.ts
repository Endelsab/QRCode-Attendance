"use server";

import prisma from "@/lib/prisma";

export async function GetAttendanceByMonth(month: number) {
     const now = new Date();
     const year = now.getFullYear();

     const startOfMonth = new Date(year, month - 1, 1);

     const endOfMonth = new Date(year, month, 0, 23, 59, 59, 999);

     try {
          const attendance = await prisma.attendance.count({
               where: {
                    createdAt: {
                         gte: startOfMonth,
                         lte: endOfMonth,
                    },
               },
          });

          return { success: true, attendance };
     } catch (error: unknown) {
          console.error(error);

          return {
               success: false,
               message: "Failed to fetch attendance per month",
               status: 500,
          };
     }
}
