"use server";

import prisma from "@/lib/prisma";

async function GetAllStudents() {
     try {
          const students = await prisma.student.findMany({
               orderBy: {
                    studentFullname: "asc",
               },
          });

          return students;
     } catch (error) {
          console.error("Error fetching students:", error);
          return [];
     }
}

export default GetAllStudents;
