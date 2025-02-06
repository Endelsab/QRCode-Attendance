"use server";

import prisma from "@/lib/prisma";

export async function GetTodaysAttendance() {
	// const startOfDay = new Date();
	// startOfDay.setHours(7, 0, 0, 0);

	// const endOfDay = new Date();
	// endOfDay.setHours(8, 0, 0, 0);
	// try {
	// 	const presentToday = await prisma.attendance.findMany({
	// 		//where: {
	// 		//createdAt: {
	// 		//	gte: startOfDay,
	// 		//	lte: endOfDay,
	// 		//},
	// 		//},
	// 		orderBy: {
	// 			createdAt: "desc",
	// 		},
	// 		include: {
	// 			student: {
	// 				select: {
	// 					id: true,
	// 					fullname: true,
	// 					course_Year: true,
	// 				},
	// 			},
	// 		},
	// 	});

	// 	return presentToday;
	// } catch (error) {
	// 	console.log("Error in getPosts", error);
	// 	return [];
	// }
	await new Promise((resolve) => setTimeout(resolve, 1000));
	return prisma.attendance.findMany({
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
}
