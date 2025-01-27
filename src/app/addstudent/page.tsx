"use client";

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
import { useState } from "react";

import QRCode from "react-qr-code";
import { addStudent } from "../actions/addStudent";
import toast from "react-hot-toast";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AddStudent = () => {
	const [fullname, setFullname] = useState("");
	const [course_Year, setCourseYear] = useState("");
	const [studentId, setStudentId] = useState("");
	const [parentsName, setParents] = useState("");
	const [email, setEmail] = useState("");
	const [submitting, setSubmitting] = useState(false);
	const [showQRCode, setShowQRCode] = useState(false);

	const router = useRouter();

	const handleSubmit = async () => {
		setSubmitting(true);
		try {
			const result = await addStudent({
				fullname,
				course_Year,
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
		<div className="min-h-screen flex flex-col gap-2 justify-center items-center">
			<Card className="w-[350px]">
				<CardHeader>
					<CardTitle className="text-4xl">Add new student</CardTitle>
					<CardDescription>
						generate new qr code for new student
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form>
						<div className="grid w-full items-center gap-4">
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="name">Fullname</Label>
								<Input
									required={true}
									id="name"
									value={fullname}
									onChange={(e) => setFullname(e.target.value)}
								/>
							</div>
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="course/year">course/year</Label>
								<Input
									required={true}
									id="course/year"
									value={course_Year}
									onChange={(e) => setCourseYear(e.target.value)}
								/>
							</div>
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="Student ID">Student ID</Label>
								<Input
									required={true}
									id="Student ID"
									value={studentId}
									onChange={(e) => setStudentId(e.target.value)}
								/>
							</div>
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="Parents">Parents</Label>
								<Input
									required={true}
									id="Parents"
									value={parentsName}
									onChange={(e) => setParents(e.target.value)}
								/>
							</div>
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="Parent's email">Parent's email address</Label>
								<Input
									required={true}
									id="Parent's email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
						</div>
					</form>
				</CardContent>
				<CardFooter className="flex justify-between">
					<Link href={"/"}>
						<Button variant="outline">Cancel</Button>
					</Link>
					<Button onClick={() => setShowQRCode(!showQRCode)}>QR Code</Button>

					{submitting ? (
						<Loader2Icon className="size-4 mr-2 animate-spin" />
					) : (
						<Button onClick={handleSubmit}>Save</Button>
					)}
				</CardFooter>
			</Card>
			<div className=" flex flex-col justify-center items-center">
				{showQRCode && (
					<div className="flex flex-col justify-center items-center">
						<div style={{ background: "white", padding: "16px" }}>
							<QRCode value={studentId} />
						</div>
						<p className="text-bold ">{fullname}</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default AddStudent;
