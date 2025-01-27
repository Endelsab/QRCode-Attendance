"use server";

import { revalidatePath } from "next/cache";
import prisma from "../lib/prisma";

type Datainterface = {
	fullname: string;
	course_Year: string;
	studentId: string;
	parentsName: string;
	email: string;
};

export async function addStudent({
	fullname,
	course_Year,
	studentId,
	parentsName,
	email,
}: Datainterface) {
	try {
		const newStudent = await prisma.student.create({
			data: {
				fullname,
				course_Year,
				studentID: studentId,
				parents: {
					create: {
						fullname: parentsName,
						email,
					},
				},
			},
		});

		revalidatePath("/"); // purge the cache for the home page
		return { success: true, newStudent };
	} catch (error) {
		console.error("Failed to add new student:", error);

		return {
			success: false,
			error:
				error instanceof Error ? error.message : "Failed to add new student",
		};
	}
}
