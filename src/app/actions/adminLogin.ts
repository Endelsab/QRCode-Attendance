"use server";

import {
	defaultSession,
	SessionData,
	sessionOptions,
} from "@/lib/iron.session";
import { getIronSession } from "iron-session";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "../lib/prisma";
import { NextResponse } from "next/server";

export const getSession = async () => {
	const session = await getIronSession<SessionData>(
		await cookies(),
		sessionOptions,
	);

	if (!session.isLoggedIn) {
		session.isLoggedIn = defaultSession.isLoggedIn;
		session.username = defaultSession.username;
	}

	return session;
};

export const adminLogin = async (email: string, username: string) => {
	try {
		const session = await getSession();

		const admin = await prisma.admin.findUnique({
			where: { email: email },
		});

		if (!admin) {
			return NextResponse.json({ error: "student not found" }, { status: 404 });
		}

		session.username = email;

		session.isLoggedIn = true;

		await session.save();
		redirect("/");
	} catch (error) {
		console.error("Error admin login:", error);
		return {
			success: false,
			error: error instanceof Error ? error.message : "Unknown error",
		};
	}
};
