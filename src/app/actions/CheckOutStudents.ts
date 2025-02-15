"use server";

import { CheckOutEmailTemplate } from "@/components/CheckOutEmailTemplate";
import prisma from "@/lib/prisma";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function CheckOutStudents(id: string) {
     try {
          const student = await prisma.student.findUnique({
               where: {
                    studentID: id,
               },
               include: {
                    parents: {
                         include: {
                              parent: true,
                         },
                    },
               },
          });

          if (!student) {
               return { error: "student not found", status: 404 };
          }

          const parentEmail = student.parents[0]?.parent.email;

          if (!parentEmail)
               return { success: false, error: "No parent's email provided" };

          const oneHourAgo = new Date();
          oneHourAgo.setHours(oneHourAgo.getHours() - 1);

          const lastAttendance = await prisma.attendance.findFirst({
               where: { studentId: student.studentID },
               orderBy: { createdAt: "desc" },
          });

          if (
               lastAttendance &&
               new Date(lastAttendance.createdAt) > oneHourAgo
          ) {
               return {
                    success: false,
                    message: "Check-out already recorded within the last hour.",
                    status: 400,
               };
          }

          const { data, error } = await resend.emails.send({
               from: "onboarding@resend.dev",
               to: "wendelsabayo999@gmail.com",

               subject: "School Attendance",
               react: CheckOutEmailTemplate(student.fullname),
          });

          if (error) {
               console.error("Resend API Error:", error);
               return {
                    success: false,
                    error: "Error in send email to parent",
               };
          }

          try {
               await prisma.$transaction([
                    prisma.student.update({
                         where: { id: student.id },
                         data: { status: "Absent" },
                    }),
                    prisma.attendance.create({
                         data: { studentId: student.studentID },
                    }),
               ]);
          } catch (error) {
               console.error("Error checking out student:", error);
               return { success: false, error: "Error checking out student" };
          }
          return {
               success: true,
               message: "Checked-out successfully !",
               status: 201,
               data,
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
     const fiveMinutesAgo = new Date();
     fiveMinutesAgo.setMinutes(fiveMinutesAgo.getMinutes() - 5);

     const now = new Date();

     try {
          const CheckedOutStudents = await prisma.attendance.findMany({
               where: {
                    createdAt: {
                         gte: fiveMinutesAgo,
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

          return CheckedOutStudents;
     } catch (error: unknown) {
          console.error("Error in get check out students", error);
          return [];
     }
}
