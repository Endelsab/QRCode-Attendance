"use server";

import { CheckOutEmailTemplate } from "@/components/CheckOutEmailTemplate";
import prisma from "@/lib/prisma";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function CheckOutStudents(studentId: string) {
     try {
          const student = await prisma.student.findUnique({
               where: {
                    studentId,
               },

               include: {
                    parent: true,
               },
          });

          if (!student) {
               return { error: "student not found", status: 404 };
          }

          const parentEmail = student.parent[0]?.parentEmail;

          if (!parentEmail)
               return { success: false, error: "No parent's email provided" };

          const now = new Date();
          const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);

          const lastAttendance = await prisma.attendance.findFirst({
               where: {
                    studentId: student.studentId,
                    createdAt: { gte: oneHourAgo },
               },
               orderBy: { createdAt: "desc" },
          });

          if (lastAttendance) {
               return {
                    success: true,
                    error: "Already recorded .",
               };
          }

          try {
               await prisma.$transaction([
                    prisma.student.update({
                         where: { id: student.id },
                         data: { status: "Checked-out" },
                    }),
                    prisma.attendance.create({
                         data: { studentId: student.id },
                    }),
               ]);
          } catch (error) {
               console.error("Error checking out student:", error);
               return { success: false, error: "Error checking out student" };
          }

          const { error } = await resend.emails.send({
               from: "onboarding@resend.dev",
               to: "wendelsabayo999@gmail.com",

               subject: "School Attendance",
               react: CheckOutEmailTemplate(student.studentFullname),
          });

          if (error) {
               console.error("Resend API Error:", error);
               return {
                    success: false,
                    error: "Error in send email to parent",
               };
          }

          return {
               success: true,
               message: "Checked-out successfully !",
               status: 201,
          };
     } catch (error: unknown) {
          console.error("Failed to check out student:", error);

          return {
               success: false,
               error:
                    error instanceof Error ?
                         error.message
                    :    "Failed to check out student",
          };
     }
}

export async function GetCheckedOutStudents() {
     const oneHoursAgo = new Date();
     oneHoursAgo.setHours(oneHoursAgo.getHours() - 1);

     const now = new Date();

     try {
          const CheckedOutStudents = await prisma.attendance.findMany({
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
                              studentFullname: true,
                              courseYear: true,
                         },
                    },
               },
          });

          return CheckedOutStudents;
     } catch (error: unknown) {
          console.error("Error in get check out students", error);
          return [];
     }
}
