"use client";

import { useEffect, useState } from "react";
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
import { EditStudent } from "@/app/actions/UpdateStudent";

type Student = {
     fullname: string;
     courseYear: string;
     studentId: string;
     parentsName: string;
     email: string;
};

type UpdateStudentProps = {
     id: string;
     onClose: () => void;
     student: Student | null;
};

function UpdateStudent({ onClose, id, student }: UpdateStudentProps) {
     const [formData, setFormData] = useState<Student>({
          fullname: "",
          courseYear: "",
          studentId: "",
          parentsName: "",
          email: "",
     });

     const [submitting, setSubmitting] = useState(false);
     const [showQRCode, setShowQRCode] = useState(false);

     useEffect(() => {
          if (student) {
               setFormData(student);
          }
     }, [student]);

     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const { name, value } = e.target;
          setFormData((prev) => ({
               ...prev,
               [name]: value,
          }));
     };

     const handleSubmit = async () => {
          setSubmitting(true);
          try {
               const result = await EditStudent(id, formData);

               if (result.success) {
                    toast.success("Student updated successfully!");
                    onClose();
               } else {
                    toast.error(result.error || "Failed to update student");
               }
          } catch (error) {
               console.error("Error updating student:", error);
               toast.error("An unexpected error occurred.");
          } finally {
               setSubmitting(false);
          }
     };

     return (
          <div className="min-h-screen flex bg-gray gap-4 justify-center items-center">
               <Card className="w-[650px]">
                    <CardHeader>
                         <CardTitle className="text-2xl">
                              Update Student
                         </CardTitle>
                         <CardDescription>
                              Modify student details and update QR Code
                         </CardDescription>
                    </CardHeader>
                    <div className="flex flex-row">
                         <CardContent>
                              <form onSubmit={(e) => e.preventDefault()}>
                                   <div className="grid w-full gap-4">
                                        {[
                                             {
                                                  label: "Fullname",
                                                  name: "fullname",
                                                  type: "text",
                                             },
                                             {
                                                  label: "Course/Year",
                                                  name: "courseYear",
                                                  type: "text",
                                             },
                                             {
                                                  label: "Student ID",
                                                  name: "studentId",
                                                  type: "text",
                                             },
                                             {
                                                  label: "Parent's Name",
                                                  name: "parentsName",
                                                  type: "text",
                                             },
                                             {
                                                  label: "Parent's Email",
                                                  name: "email",
                                                  type: "email",
                                             },
                                        ].map(({ label, name, type }) => (
                                             <div
                                                  key={name}
                                                  className="flex flex-col space-y-1.5"
                                             >
                                                  <Label htmlFor={name}>
                                                       {label}
                                                  </Label>
                                                  <Input
                                                       type={type}
                                                       name={name}
                                                       required
                                                       id={name}
                                                       value={
                                                            formData[
                                                                 name as keyof Student
                                                            ] || ""
                                                       }
                                                       onChange={handleChange}
                                                  />
                                             </div>
                                        ))}
                                   </div>
                              </form>
                         </CardContent>

                         <div>
                              <div className="flex flex-col h-[270px] justify-center items-center mt-4">
                                   <div
                                        className={
                                             showQRCode ?
                                                  "border dark:bg-white shadow-lg p-4 rounded-md"
                                             :    ""
                                        }
                                   >
                                        {showQRCode && (
                                             <QRCode
                                                  value={formData.studentId}
                                             />
                                        )}
                                   </div>
                              </div>

                              <CardFooter className="flex gap-6 mt-5 justify-between">
                                   <Button onClick={onClose}>Cancel</Button>
                                   <Button
                                        variant={"outline"}
                                        onClick={() =>
                                             setShowQRCode(!showQRCode)
                                        }
                                   >
                                        Generate QR Code
                                   </Button>
                                   <Button
                                        className="text-white"
                                        variant={"secondary"}
                                        onClick={handleSubmit}
                                        disabled={submitting}
                                   >
                                        {submitting ?
                                             <Loader2Icon className="size-4 animate-spin" />
                                        :    <PlusIcon />}
                                        Update
                                   </Button>
                              </CardFooter>
                         </div>
                    </div>
               </Card>
          </div>
     );
}

export default UpdateStudent;
