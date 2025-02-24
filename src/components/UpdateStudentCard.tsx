"use client";

import { useEffect, useState } from "react";
import {
     AlertDialog,
     AlertDialogContent,
     AlertDialogHeader,
     AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import UpdateStudent from "./UpdateStudent";
import { StudentToUpdate } from "@/app/actions/UpdateStudent";
import { Skeleton } from "./ui/skeleton";

type EditDialogProps = {
     id: string;
     isOpen: boolean;
     onClose: () => void;
};

type Student = {
     studentFullname: string;
     courseYear: string;
     studentId: string;
     parentFullname: string;
     parentEmail: string;
};

function UpdateStudentCard({ isOpen, onClose, id }: EditDialogProps) {
     const [student, setStudent] = useState<Student | null>(null);
     const [loading, setLoading] = useState(true);

     useEffect(() => {
          const fetchStudent = async () => {
               setLoading(true);
               try {
                    const studentData = await StudentToUpdate(id);

                    if (studentData.success !== false) {
                         const mappedStudent = {
                              studentFullname:
                                   studentData.student?.studentFullname || "",
                              courseYear: studentData.student?.courseYear || "",
                              studentId: studentData.student?.studentId || "",
                              parentFullname:
                                   studentData.student?.parent[0]
                                        ?.parentFullname || "",
                              parentEmail:
                                   studentData.student?.parent[0]
                                        ?.parentEmail || "",
                         };
                         setStudent(mappedStudent);
                    } else {
                         setStudent(null);
                    }
               } catch (error) {
                    console.error("error in fetching student to update", error);
               } finally {
                    setLoading(false);
               }
          };

          if (isOpen) {
               fetchStudent();
          }
     }, [id, isOpen]);

     return (
          <AlertDialog open={isOpen} onOpenChange={onClose}>
               <AlertDialogContent className="border-none bg-transparent">
                    <AlertDialogHeader>
                         <AlertDialogTitle>
                              <p className=" hidden">Update student</p>
                         </AlertDialogTitle>
                    </AlertDialogHeader>

                    {loading ?
                         <div className="flex bg-gray-500 p-6 rounded-md justify-center items-center flex-col space-y-3">
                              <Skeleton className="h-[100px] w-[100px] rounded-full " />
                              <div className="space-y-2">
                                   <Skeleton className="h-40 w-[250px]" />
                                   <Skeleton className="h-40 w-[250px]" />
                              </div>
                         </div>
                    :    <UpdateStudent
                              id={id}
                              onClose={onClose}
                              student={student}
                         />
                    }
               </AlertDialogContent>
          </AlertDialog>
     );
}

export default UpdateStudentCard;
