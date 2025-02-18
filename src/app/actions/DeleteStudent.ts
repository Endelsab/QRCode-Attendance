"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function DeleteStudent(studentId: string) {
     try {
          const student = await prisma.student.findUnique({
               where: { id: studentId },
               include: { parents: true },
          });

          if (!student) {
               return {
                    success: false,
                    status: 404,
                    message: "Student not found",
               };
          }

          await prisma.student.delete({
               where: { id: studentId },
          });

          for (const parent of student.parents) {
               const otherStudents = await prisma.parentOnStudent.findMany({
                    where: { parentId: parent.parentId },
               });

               if (otherStudents.length === 0) {
                    await prisma.parent.delete({
                         where: { id: parent.parentId },
                    });
               }
          }

          revalidatePath("/students");

          return { success: true };
     } catch (error) {
          console.error("Failed to delete student:", error);

          if (
               error instanceof Error &&
               "code" in error &&
               error.code === "P2025"
          ) {
               return {
                    success: false,
                    status: 404,
                    message: "Student not found",
               };
          }

          return {
               success: false,
               error:
                    error instanceof Error ?
                         error.message
                    :    "Failed to delete student",
          };
     }
}
