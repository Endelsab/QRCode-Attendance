"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function EditStudent(id: string, formData: any) {
	try {
		const { fullname, courseYear, studentId, parentsName, email } = formData;

		const studentWithParent = await prisma.student.findUnique({
			where: { id },
			include: {
				parents: {
					include: {
						parent: true,
					},
				},
			},
		});

		if (!studentWithParent) {
			return { success: false, error: "Student not found" };
		}

		const parent = studentWithParent.parents[0]?.parent;

		if (!parent) {
			return { success: false, error: "Parent not found for this student" };
		}

		const [updatedStudent, updatedParent] = await prisma.$transaction([
			prisma.student.update({
				where: { id },
				data: { fullname, course_Year: courseYear, studentID: studentId },
			}),
			prisma.parent.update({
				where: { id: parent.id },
				data: { fullname: parentsName, email: email },
			}),
		]);

		revalidatePath("/students");

		return { success: true, updatedStudent, updatedParent };
	} catch (error) {
		console.error("Failed to update student:", error);

		return {
			success: false,
			error:
				error instanceof Error ? error.message : "Failed to update student",
		};
	}
}

export async function StudentToUpdate(id: string) {
	const student = await prisma.student.findUnique({
		where: { id },
		include: {
			parents: {
				include: {
					parent: true,
				},
			},
		},
	});
	if (!student) return { success: false, message: "Student not found" };

	return { success: true, student };
}
