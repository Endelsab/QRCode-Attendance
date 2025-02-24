"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function DeleteStudent(id: string) {
     try {
          const student = await prisma.student.delete({
               where: { id },
          });

          if (!student) {
               return {
                    success: false,
                    status: 404,
                    message: "Student not found || Cannot delete student",
               };
          }

          revalidatePath("/students");

          return { success: true, status: 200 };
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
