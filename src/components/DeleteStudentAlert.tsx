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
     courseYear: string;
     onConfirm: (id: string) => Promise<void>;
};

const DeleteStudentAlert = ({
     id,
     onOpen,
     onClose,
     fullname,
     courseYear,
     onConfirm,
}: AlertType) => {
     const [loading, setLoading] = useState(false);

     const handleConfirm = async () => {
          setLoading(true);

          try {
               await onConfirm(id);
          } catch (error) {
               console.log(error);
          } finally {
               setLoading(false);
          }
     };

     return (
          <AlertDialog open={onOpen} onOpenChange={onClose}>
               <AlertDialogContent>
                    <AlertDialogHeader>
                         <AlertDialogTitle className="text-sm text-red-600">
                              Are you sure you want to delete?
                         </AlertDialogTitle>
                         <AlertDialogDescription className="text-2xl text-black dark:text-white font-bold">
                              {fullname} {courseYear}
                         </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                         <AlertDialogCancel onClick={onClose}>
                              Cancel
                         </AlertDialogCancel>
                         <Button onClick={handleConfirm} disabled={loading}>
                              {loading ? "Deleting..." : "Delete"}
                         </Button>
                    </AlertDialogFooter>
               </AlertDialogContent>
          </AlertDialog>
     );
};

export default DeleteStudentAlert;
