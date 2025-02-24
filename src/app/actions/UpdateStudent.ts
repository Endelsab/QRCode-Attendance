"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface StudentUpdateData {
     studentFullname: string;
     courseYear: string;
     studentId: string;
     parentFullname: string;
     parentEmail: string;
}

export async function EditStudent(id: string, formData: StudentUpdateData) {
     try {
          const {
               studentFullname,
               courseYear,
               studentId,
               parentFullname,
               parentEmail,
          } = formData;

          if (
               !studentFullname ||
               !courseYear ||
               !studentId ||
               !parentFullname ||
               !parentEmail
          ) {
               return {
                    success: false,
                    message: "All fields are required.",
                    status: 400,
               };
          }

          if (studentId.length < 8) {
               return {
                    success: false,
                    message: "Student ID must be at least 8 characters long.",
                    status: 400,
               };
          }

          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(parentEmail)) {
               return {
                    success: false,
                    message: "Invalid email format.",
                    status: 400,
               };
          }

          const studentWithParent = await prisma.student.findUnique({
               where: { id },

               include: {
                    parent: true,
               },
          });

          if (!studentWithParent) {
               return { success: false, error: "Student not found" };
          }

          const parent = studentWithParent.parent;

          if (!parent) {
               return {
                    success: false,
                    error: "Parent not found for this student",
               };
          }

          try {
               await prisma.$transaction([
                    prisma.student.update({
                         where: { id: studentWithParent.id },
                         data: {
                              studentFullname,
                              courseYear,
                              studentId,
                         },
                    }),
                    prisma.parent.update({
                         where: { studentId: studentWithParent.id },
                         data: { parentFullname, parentEmail },
                    }),
               ]);
          } catch (error) {
               console.log("Error in updating student information", error);
               return { success: false, error: error };
          }

          revalidatePath("/students");

          return { success: true, status: 200 };
     } catch (error: unknown) {
          console.error("Failed to update student:", error);

          return {
               success: false,
               error:
                    error instanceof Error ?
                         error.message
                    :    "Failed to update student",
          };
     }
}

export async function StudentToUpdate(id: string) {
     try {
          const student = await prisma.student.findUnique({
               where: { id },

               include: {
                    parent: true,
               },
          });

          if (!student) return { success: false, message: "Student not found" };

          return { success: true, student };
     } catch (error) {
          console.error("Error fetching student:", error);
          return { success: false, message: "Error retrieving student data" };
     }
}
