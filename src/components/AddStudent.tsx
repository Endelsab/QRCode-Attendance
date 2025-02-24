"use client";

import { Loader2, PlusIcon } from "lucide-react";
import { useState } from "react";
import QRCode from "react-qr-code";

import { AddNewStudent } from "@/app/actions/AddNewStudent";
import { Button } from "@/components/ui/button";
import {
     Card,
     CardContent,
     CardDescription,
     CardHeader,
     CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";

type OnCloseType = {
     onClose: () => void;
};

const AddStudent = ({ onClose }: OnCloseType) => {
     const [submitting, setSubmitting] = useState(false);

     const [formData, setFormData] = useState({
          studentFullname: "",
          courseYear: "",
          studentId: "",
          parentFullname: "",
          parentEmail: "",
     });

     const [errors, setErrors] = useState({
          studentFullname: "",
          courseYear: "",
          studentId: "",
          parentFullname: "",
          parentEmail: "",
     });

     const [studentID, setStudentID] = useState("");
     const [showQRCode, setShowQRCode] = useState(false);

     const validateField = (name: string, value: string) => {
          let error = "";

          if (!value.trim()) {
               error = "This field is required.";
          }

          if (name === "studentFullname" && value.length < 2) {
               error = "Fullname must be at least 2 characters long.";
          }

          if (name === "courseYear" && value.length < 4) {
               error = "Course and year must be at least 4 characters long.";
          }

          if (name === "studentId" && value.length < 8) {
               error = "Student ID must be at least 8 characters long.";
          }

          if (name === "parentFullname" && value.length < 2) {
               error = "Parent fullname must be at least 2 characters long.";
          }

          if (
               name === "parentEmail" &&
               value &&
               !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ) {
               error = "Invalid email format.";
          }

          setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
     };

     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const { name, value } = e.target;
          setFormData((prev) => ({ ...prev, [name]: value }));
          validateField(name, value);

          if (name === "studentId") {
               setStudentID(value);
          }
     };

     const handleSubmit = async () => {
          setSubmitting(true);

          try {
               const result = await AddNewStudent(formData);

               if (result.success) {
                    toast.success(result.message || "Added successfully !");
                    onClose();
               } else {
                    toast.error(result.message);
               }
          } catch (error) {
               console.log("Error in adding new student :", error);
               toast.error("An unexpected error occurred.");
          } finally {
               setSubmitting(false);
          }
     };

     return (
          <div className="min-h-screen flex bg-gray gap-4 justify-center items-center">
               <Card className="w-[700px]">
                    <CardHeader className="flex items-center justify-center">
                         <CardTitle className="text-2xl">
                              Add New Student
                         </CardTitle>
                         <CardDescription>
                              Generate a QR code for the new student
                         </CardDescription>
                    </CardHeader>
                    <CardContent>
                         <div className="flex gap-6">
                              <div>
                                   <form
                                        onSubmit={(e) => e.preventDefault()}
                                        className="space-y-4"
                                   >
                                        {/** Full Name */}
                                        <div className="flex w-85 flex-col space-y-1.5">
                                             <Label
                                                  className="text-neutral-500"
                                                  htmlFor="studentFullname"
                                             >
                                                  Full Name
                                             </Label>
                                             <Input
                                                  type="text"
                                                  name="studentFullname"
                                                  value={
                                                       formData.studentFullname
                                                  }
                                                  onChange={handleChange}
                                                  className={` border p-2 ${errors.studentFullname ? "border-red-500" : "border-gray-800"}`}
                                             />
                                             {errors.studentFullname && (
                                                  <p className="text-sm text-red-500">
                                                       {errors.studentFullname}
                                                  </p>
                                             )}
                                        </div>

                                        {/** Course & Year */}
                                        <div className="flex w-85 flex-col space-y-1.5">
                                             <Label
                                                  className="text-neutral-500"
                                                  htmlFor="courseYear"
                                             >
                                                  Course & Year
                                             </Label>
                                             <Input
                                                  type="text"
                                                  name="courseYear"
                                                  value={formData.courseYear}
                                                  onChange={handleChange}
                                                  className={`border p-2 ${errors.courseYear ? "border-red-500" : "border-gray-800"}`}
                                             />
                                             {errors.courseYear && (
                                                  <p className="text-sm text-red-500">
                                                       {errors.courseYear}
                                                  </p>
                                             )}
                                        </div>

                                        {/** Student ID */}
                                        <div className="flex w-85 flex-col space-y-1.5">
                                             <Label
                                                  className="text-neutral-500"
                                                  htmlFor="studentId"
                                             >
                                                  Student ID
                                             </Label>
                                             <Input
                                                  type="text"
                                                  name="studentId"
                                                  value={formData.studentId}
                                                  onChange={handleChange}
                                                  className={`border p-2 ${errors.studentId ? "border-red-500" : "border-gray-800"}`}
                                             />
                                             {errors.studentId && (
                                                  <p className="text-sm text-red-500">
                                                       {errors.studentId}
                                                  </p>
                                             )}
                                        </div>

                                        {/** Parent Full Name */}
                                        <div className="flex w-85 flex-col space-y-1.5">
                                             <Label
                                                  className="text-neutral-500"
                                                  htmlFor="parentFullname"
                                             >
                                                  Parent Full Name
                                             </Label>
                                             <Input
                                                  type="text"
                                                  name="parentFullname"
                                                  value={
                                                       formData.parentFullname
                                                  }
                                                  onChange={handleChange}
                                                  className={`border p-2 ${errors.parentFullname ? "border-red-500" : "border-gray-800"}`}
                                             />
                                             {errors.parentFullname && (
                                                  <p className="text-sm text-red-500">
                                                       {errors.parentFullname}
                                                  </p>
                                             )}
                                        </div>

                                        {/** Parent Email */}
                                        <div className="flex w-85 flex-col space-y-1.5">
                                             <Label
                                                  className="text-neutral-500"
                                                  htmlFor="parentEmail"
                                             >
                                                  Parent Email
                                             </Label>
                                             <Input
                                                  type="email"
                                                  name="parentEmail"
                                                  value={formData.parentEmail}
                                                  onChange={handleChange}
                                                  className={`border p-2 ${errors.parentEmail ? "border-red-500" : "border-gray-800"}`}
                                             />
                                             {errors.parentEmail && (
                                                  <p className="text-sm text-red-500">
                                                       {errors.parentEmail}
                                                  </p>
                                             )}
                                        </div>

                                        {/** Buttons */}
                                        <div className="flex flex-row gap-4 justify-between">
                                             <Button
                                                  type="button"
                                                  onClick={onClose}
                                             >
                                                  Cancel
                                             </Button>
                                             <Button
                                                  variant="outline"
                                                  type="button"
                                                  onClick={() =>
                                                       setShowQRCode(
                                                            !showQRCode
                                                       )
                                                  }
                                                  disabled={
                                                       submitting ||
                                                       Object.values(
                                                            errors
                                                       ).some((err) => err) ||
                                                       Object.values(
                                                            formData
                                                       ).some(
                                                            (val) =>
                                                                 val.trim() ===
                                                                 ""
                                                       )
                                                  }
                                             >
                                                  Generate QR Code
                                             </Button>
                                             <Button
                                                  variant="secondary"
                                                  className="text-white "
                                                  onClick={handleSubmit}
                                                  disabled={
                                                       submitting ||
                                                       Object.values(
                                                            errors
                                                       ).some((err) => err) ||
                                                       Object.values(
                                                            formData
                                                       ).some(
                                                            (val) =>
                                                                 val.trim() ===
                                                                 ""
                                                       )
                                                  }
                                             >
                                                  {submitting ?
                                                       <>
                                                            <Loader2 className="animate-spin" />
                                                       </>
                                                  :    <>
                                                            <PlusIcon />
                                                            Add
                                                       </>
                                                  }
                                             </Button>
                                        </div>
                                   </form>
                              </div>

                              {/** QR Code Section */}
                              <div>
                                   {showQRCode && (
                                        <div className="flex flex-col items-center mt-4">
                                             {studentID ?
                                                  <div className="border dark:bg-white shadow-lg p-4 rounded-md">
                                                       <QRCode
                                                            value={
                                                                 studentID ||
                                                                 "default"
                                                            }
                                                       />
                                                  </div>
                                             :    <p className="mt-36 text-md font-sans">
                                                       Please provide all fields
                                                       first!
                                                  </p>
                                             }
                                        </div>
                                   )}
                              </div>
                         </div>
                    </CardContent>
               </Card>
          </div>
     );
};

export default AddStudent;
