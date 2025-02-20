"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type formData = {
     studentFullname: string;
     courseYear: string;
     studentId: string;
     parentFullname: string;
     parentEmail: string;
};

export async function AddNewStudent({
     studentFullname,
     courseYear,
     studentId,
     parentFullname,
     parentEmail,
}: formData) {
     await new Promise((resolve) => setTimeout(resolve, 1000));

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

     try {
          const existingStudent = await prisma.student.findUnique({
               where: { studentID: studentId },
          });

          if (existingStudent) {
               return {
                    success: false,
                    message: "Student ID already exists.",
                    status: 409,
               };
          }

          await prisma.student.create({
               data: {
                    fullname: studentFullname,
                    course_Year: courseYear,
                    studentID: studentId,

                    parents: {
                         create: {
                              parent: {
                                   create: {
                                        fullname: parentFullname,
                                        email: parentEmail,
                                   },
                              },
                         },
                    },
               },
          });

          revalidatePath("/students");

          return {
               success: true,
               message: "Student added successfully !",
               status: 201,
          };
     } catch (error: any) {
          console.error("Database Error:", error);

          return {
               success: false,
               message:
                    error.code === "P2002" ?
                         "Student ID already exists."
                    :    "Something went wrong. Please try again.",
               status: 500,
          };
     }
}
