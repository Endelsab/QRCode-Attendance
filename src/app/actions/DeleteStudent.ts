"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function DeleteStudent(studentId: string) {
	try {
		await prisma.student.delete({
			where: { id: studentId },
		});

		revalidatePath("/students");

		return {
			success: true,
		};
	} catch (error) {
		console.error("Failed to delete student:", error);

		if (error instanceof Error && "code" in error && error.code === "P2025") {
			return { success: false, status: 404, message: "Student not found" };
		}

		return {
			success: false,
			error:
				error instanceof Error ? error.message : "Failed to delete student",
		};
	}
}
