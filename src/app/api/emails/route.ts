"use server";

import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { EmailTemplate } from "@/components/email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
	try {
		const { studentId } = await req.json();

		if (!studentId) {
			console.log("Missing student ID in request.");
			return NextResponse.json(
				{ error: "no student id provided" },
				{ status: 400 },
			);
		}

		const student = await prisma.student.findUnique({
			where: {
				studentID: studentId,
			},
			include: {
				parents: {
					include: {
						parent: true,
					},
				},
			},
		});

		if (!student) {
			return NextResponse.json({ error: "student not found" }, { status: 404 });
		}

		const { data, error } = await resend.emails.send({
			from: "onboarding@resend.dev",
			to: "wendelsabayo999@gmail.com",

			// to: student?.parents[0]?.parent?.email,

			subject: "School Attendance",
			react: EmailTemplate(student.fullname),
		});

		if (error) {
			console.error("Resend API Error:", error);
			return NextResponse.json(
				{ error: "Failed to send email" },
				{ status: 500 },
			);
		}
		console.log(data);

		try {
			await prisma.$transaction(async (tx) => {
				await tx.attendance.create({ data: { studentId } });
				await tx.student.update({
					where: { studentID: studentId },
					data: { status: "Present" },
				});
			});

			console.log("Transaction successful");
		} catch (error) {
			console.error("Error updating attendance:", error);
			return NextResponse.json(
				{ error: "Failed to update attendance" },
				{ status: 500 },
			);
		}

		return NextResponse.json(
			{ message: "email sent successfully" },
			{ status: 201 },
		);
	} catch (error) {
		console.error("Unexpected Error:", error);
		return NextResponse.json(
			{ error: "Failed to process request" },
			{ status: 500 },
		);
	}
}
