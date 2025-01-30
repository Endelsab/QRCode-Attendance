import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { EmailTemplate } from "@/components/email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
	try {
		// Parse the request body to extract StudentId
		const { studentId } = await req.json();

		if (!studentId) {
			console.log(studentId);
			return NextResponse.json({ error: "no student id" }, { status: 400 });
		}

		// Query parent details using StudentId
		const student = await prisma.student.findUnique({
			where: {
				studentID: studentId,
			},
			select: {
				fullname: true,
				parents: {
					select: {
						email: true,
					},
				},
			},
		});

		if (!student) {
			return NextResponse.json({ error: "student not found" }, { status: 404 });
		}

		// Send email using Resend API
		const { data, error } = await resend.emails.send({
			from: "onboarding@resend.dev",
			to: "wendelsabayo999@gmail.com",
			// to: student.parents[0]?.email,
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

		return NextResponse.json(
			{ message: "email sent successfully", data },
			{ status: 201 },
		);
	} catch (error: any) {
		console.error("Unexpected Error:", error);
		return NextResponse.json(
			{ error: "Failed to process request" },
			{ status: 500 },
		);
	}
}
