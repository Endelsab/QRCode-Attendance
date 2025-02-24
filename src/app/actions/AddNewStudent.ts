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
               where: { studentId },
          });

          if (existingStudent) {
               return {
                    success: false,
                    message: "Student Id already exists.",
                    status: 409,
               };
          }

          await prisma.student.create({
               data: {
                    studentFullname,
                    courseYear,
                    studentId,
                    parent: {
                         create: { parentFullname, parentEmail },
                    },
               },
          });

          revalidatePath("/students");

          return {
               success: true,
               message: "Student added successfully !",
               status: 201,
          };
     } catch (error) {
          console.error("Database Error:", error);

          return {
               success: false,
               message: "Unable to add new student",

               status: 500,
          };
     }
}
