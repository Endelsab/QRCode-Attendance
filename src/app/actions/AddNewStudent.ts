"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type StudentData = {
	fullname: string;
	course_Year: string;
	studentId: string;
	parentsName: string;
	email: string;
};

async function AddNewStudent({
	fullname,
	course_Year,
	studentId,
	parentsName,
	email,
}: StudentData) {
	try {
		const newStudent = await prisma.student.create({
			data: {
				fullname,
				course_Year,
				studentID: studentId, // Ensure this matches the Prisma schema
				parents: {
					create: {
						fullname: parentsName,
						email,
					},
				},
			},
			include: {
				parents: true, // Include parents data in response
			},
		});

		// ✅ Revalidate Cache (ensure UI updates)
		revalidatePath("/");

		return { success: true, data: newStudent };
	} catch (error) {
		console.error("Failed to add new student:", error);

		return {
			success: false,
			error:
				error instanceof Error ? error.message : "Failed to add new student",
		};
	}
}
export default AddNewStudent;
