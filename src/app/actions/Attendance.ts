"use server";

import { EmailTemplate } from "@/components/email-template";
import prisma from "@/lib/prisma";
import { Resend } from "resend";
import { format } from "date-fns";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function Attendance(studentId: string) {
     try {
          const student = await prisma.student.findUnique({
               where: { studentId },
               include: { parent: true },
          });

          if (!student) {
               return { success: false, error: "Student not found" };
          }

          const parent = student.parent[0];

          if (!parent || !parent.parentEmail) {
               return { success: false, error: "Parent's email not found." };
          }

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
                    error: "Attendance already recorded within the last hour.",
               };
          }

          try {
               await prisma.$transaction([
                    prisma.attendance.create({
                         data: { studentId: student.id },
                    }),
                    prisma.student.update({
                         where: { studentId },
                         data: { status: "Present" },
                    }),
               ]);
          } catch (error: unknown) {
               console.log("error in checking in student :", error);
               return { success: false, error: "Already present" };
          }

          const formattedDate = format(now, "MMMM dd, yyyy hh:mm a");

          const { error } = await resend.emails.send({
               from: "onboarding@resend.dev",
               to: "wendelsabayo999@gmail.com",
               subject: "School Attendance",
               react: EmailTemplate(student.studentFullname, formattedDate),
          });
          if (error) {
               console.log(error.message);
               return { success: false, error: error.message };
          }

          return { success: true, status: 201 };
     } catch (error) {
          console.error("Error in Attendance function:", error);
          return {
               success: false,
               error:
                    error instanceof Error ?
                         error.message
                    :    "Failed to check in student",
          };
     }
}
