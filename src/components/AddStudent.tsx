"use client";

import { useState } from "react";

import toast from "react-hot-toast";
import QRCode from "react-qr-code";
import { Loader2Icon, PlusIcon } from "lucide-react";

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
import AddNewStudent from "@/app/actions/AddNewStudent";

type OnCloseType = {
	onClose: () => void;
};

const AddStudent = ({ onClose }: OnCloseType) => {
	
	const [fullname, setFullname] = useState("");
	const [courseYear, setCourseYear] = useState("");
	const [studentId, setStudentId] = useState("");
	const [parentsName, setParents] = useState("");
	const [email, setEmail] = useState("");
	const [submitting, setSubmitting] = useState(false);
	const [showQRCode, setShowQRCode] = useState(false);

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
				onClose();
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
		<div className="min-h-screen flex bg-gray  gap-4 justify-center items-center">
			<Card className="w-[650px]">
				<CardHeader>
					<CardTitle className="text-2xl">Add New Student</CardTitle>
					<CardDescription>
						Generate a QR code for the new student
					</CardDescription>
				</CardHeader>
				<div className="flex flex-row">
					<CardContent>
						<form onSubmit={(e) => e.preventDefault()}>
							<div className="grid w-full gap-4">
								{[
									{
										label: "Fullname",
										value: fullname,
										setValue: setFullname,
										type: "text",
									},
									{
										label: "Course/Year",
										value: courseYear,
										setValue: setCourseYear,
										type: "text",
									},
									{
										label: "Student ID",
										value: studentId,
										setValue: setStudentId,
										type: "text",
									},
									{
										label: "Parent's Name",
										value: parentsName,
										setValue: setParents,
										type: "text",
									},
									{
										label: "Parent's Email",
										value: email,
										setValue: setEmail,
										type: "email",
									},
								].map(({ label, value, setValue, type }) => (
									<div key={label} className="flex flex-col space-y-1.5">
										<Label htmlFor={label}>{label}</Label>
										<Input
											type={type}
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

					<div>
						<div className="flex flex-col h-[280px] justify-center items-center mt-4">
							<div className="  p-4 rounded-lg   ">
								{showQRCode && <QRCode value={studentId} />}
							</div>
						</div>

						<CardFooter className="flex gap-6 mt-4 justify-between">
							<Button onClick={onClose} variant="destructive">
								Cancel
							</Button>
							<Button onClick={() => setShowQRCode(!showQRCode)}>
								Generate QR Code
							</Button>

							<Button onClick={handleSubmit} disabled={submitting}>
								{submitting ? (
									<Loader2Icon className="size-4 animate-spin" />
								) : (
									<>
										<PlusIcon />
										Add
									</>
								)}
							</Button>
						</CardFooter>
					</div>
				</div>
			</Card>
		</div>
	);
};

export default AddStudent;
