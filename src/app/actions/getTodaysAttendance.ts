"use server";

import prisma from "@/lib/prisma";

export async function GetTodaysAttendance() {
	// const startOfDay = new Date();
	// startOfDay.setHours(7, 0, 0, 0);

	// const endOfDay = new Date();
	// endOfDay.setHours(8, 0, 0, 0);
	try {
		const presentToday = await prisma.attendance.findMany({
			//where: {
			//createdAt: {
			//	gte: startOfDay,
			//	lte: endOfDay,
			//},
			//},
			distinct: ["studentId"], // Ensures only one record per student
			orderBy: {
				createdAt: "desc",
			},
			include: {
				student: {
					select: {
						id: true,
						fullname: true,
						course_Year: true,
					},
				},
			},
		});

		return presentToday;
	} catch (error) {
		console.error("Error in getPosts", error);
		return [];
	}
}
