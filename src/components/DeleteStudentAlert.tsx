"use client";

import { useState } from "react";

import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";

type AlertType = {
	id: string;
	onOpen: boolean;
	onClose: () => void;
	fullname: string;
	onConfirm: (id: string) => void;
};

const DeleteStudentAlert = ({
	id,
	onOpen,
	onClose,
	fullname,
	onConfirm,
}: AlertType) => {
	const [loading, setLoading] = useState(false);

	const handleDelete = async () => {
		setLoading(true);
		await onConfirm(id);
		setLoading(false);
	};

	return (
		<AlertDialog open={onOpen} onOpenChange={onClose}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle className="text-red-500">
						Are you sure you want to delete?
					</AlertDialogTitle>
					<AlertDialogDescription className="text-2xl text-black font-bold">
						{fullname}
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
					<Button
						variant="destructive"
						onClick={handleDelete}
						disabled={loading}>
						{loading ? "Deleting..." : "Delete"}
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default DeleteStudentAlert;
