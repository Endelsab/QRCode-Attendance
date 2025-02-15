"use server";

import { EmailTemplate } from "@/components/email-template";
import prisma from "@/lib/prisma";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function Attendance(studentId: string) {
     try {
          const student = await prisma.student.findUnique({
               where: {
                    studentID: studentId,
               },
               include: {
                    parents: {
                         include: {
                              parent: true,
                         },
                    },
               },
          });

          if (!student)
               return {
                    success: false,
                    message: "Student not found",
                    status: 404,
               };

          const parentEmail = student.parents[0]?.parent.email;

          if (!parentEmail)
               return {
                    success: false,
                    message: "Parent's email not found unable to notify parents",
                    status: 404,
               };

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
                    message: "already recorded within the last hour.",
                    status: 400,
               };
          }

          const { data, error } = await resend.emails.send({
               from: "onboarding@resend.dev",
               to: "wendelsabayo999@gmail.com",

               //   to:parentEmail

               subject: "School Attendance",
               react: EmailTemplate(student.fullname),
          });

          if (error) {
               console.error("Resend API Error:", error);
               return { success: false, message: error.message };
          }

          try {
               await prisma.$transaction(async (tx) => {
                    await tx.attendance.create({ data: { studentId } });
                    await tx.student.update({
                         where: { studentID: studentId },
                         data: { status: "Present" },
                    });
               });
          } catch (error) {
               console.error("Error in attedance server function:", error);
               return { success: false, error: "Error checking-in student" };
          }

          return { success: true, data };
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
