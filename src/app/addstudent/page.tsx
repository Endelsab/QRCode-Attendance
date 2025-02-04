"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import QRCode from "react-qr-code";
import { Loader2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AddNewStudent from "../actions/AddNewStudent";

const AddStudent = () => {
	const [fullname, setFullname] = useState("");
	const [courseYear, setCourseYear] = useState("");
	const [studentId, setStudentId] = useState("");
	const [parentsName, setParents] = useState("");
	const [email, setEmail] = useState("");
	const [submitting, setSubmitting] = useState(false);
	const [showQRCode, setShowQRCode] = useState(false);

	const router = useRouter();

	const handleSubmit = async () => {
		if (!fullname || !courseYear || !studentId || !parentsName || !email) {
			toast.error("All fields are required!");
			return;
		}

		setSubmitting(true);
		try {
			const result = await AddNewStudent({
				fullname,
				course_Year: courseYear,
				studentId,
				parentsName,
				email,
			});

			if (result.success) {
				toast.success("Student added successfully!");
				router.push("/");
			} else {
				toast.error(result.error || "Failed to add student");
			}
		} catch (error) {
			console.error("Error adding student:", error);
			toast.error("An unexpected error occurred.");
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div className="min-h-screen flex  gap-4 justify-center items-center">
			<Card className="w-[350px]">
				<CardHeader>
					<CardTitle className="text-2xl">Add New Student</CardTitle>
					<CardDescription>
						Generate a QR code for the new student
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={(e) => e.preventDefault()}>
						<div className="grid w-full gap-4">
							{[
								{ label: "Fullname", value: fullname, setValue: setFullname },
								{
									label: "Course/Year",
									value: courseYear,
									setValue: setCourseYear,
								},
								{
									label: "Student ID",
									value: studentId,
									setValue: setStudentId,
								},
								{
									label: "Parent's Name",
									value: parentsName,
									setValue: setParents,
								},
								{ label: "Parent's Email", value: email, setValue: setEmail },
							].map(({ label, value, setValue }) => (
								<div key={label} className="flex flex-col space-y-1.5">
									<Label htmlFor={label}>{label}</Label>
									<Input
										required
										id={label}
										value={value}
										onChange={(e) => setValue(e.target.value)}
									/>
								</div>
							))}
						</div>
					</form>
				</CardContent>
				<CardFooter className="flex justify-between">
					<Link href="/">
						<Button variant="outline">Cancel</Button>
					</Link>

					<Button
						onClick={() => {
							if (studentId) setShowQRCode(!showQRCode);
							else toast.error("Please enter Student ID first!");
						}}>
						QR Code
					</Button>

					<Button onClick={handleSubmit} disabled={submitting}>
						{submitting ? (
							<Loader2Icon className="size-4 animate-spin" />
						) : (
							"Save"
						)}
					</Button>
				</CardFooter>
			</Card>

			{showQRCode && studentId && (
				<div className="flex flex-col justify-center items-center mt-4">
					<div className="bg-white p-4 rounded-lg shadow">
						<QRCode value={studentId} />
					</div>
					<p className="font-bold mt-2">{fullname}</p>
				</div>
			)}
		</div>
	);
};

export default AddStudent;
