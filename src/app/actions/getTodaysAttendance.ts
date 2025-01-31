"use server";

import prisma from "@/lib/prisma";

export async function getTodaysAttendance() {
	const startOfDay = new Date();
	startOfDay.setHours(7, 0, 0, 0);

	const endOfDay = new Date();
	endOfDay.setHours(8, 0, 0, 0);

	const presentToday = await prisma.attendance.findMany({
		//where: {
		//createdAt: {
		//	gte: startOfDay,
		//	lte: endOfDay,
		//},
		//},
		orderBy: {
			createdAt: "desc",
		},
		include: {
			student: true,
		},
	});

	return presentToday;
}
