"use client";

import { useState, useOptimistic, startTransition } from "react";
import { DeleteStudent } from "@/app/actions/DeleteStudent";
import {
     Table,
     TableBody,
     TableCell,
     TableFooter,
     TableHead,
     TableHeader,
     TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import {
     Trash2,
     Edit,
     ChevronLeft,
     ChevronRight,
     SearchIcon,
     PlusIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import AddStudentCard from "./AddStudentCard";
import DeleteStudentAlert from "./DeleteStudentAlert";
import toast from "react-hot-toast";
import UpdateStudentCard from "./UpdateStudentCard";

const ITEMS_PER_PAGE = 10;

type Student = {
     id: string;
     fullname: string;
     course_Year: string;
     status: string;
};

function StudentsTable({ students }: { students: Student[] }) {
     const [optimisticStudents, setOptimisticStudents] =
          useOptimistic<Student[]>(students);

     const [currentPage, setCurrentPage] = useState(1);
     const totalPages = Math.ceil(optimisticStudents.length / ITEMS_PER_PAGE);

     const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
     const endIndex = startIndex + ITEMS_PER_PAGE;
     const studentsToShow = optimisticStudents.slice(startIndex, endIndex);

     const nextPage = () => {
          if (currentPage < totalPages) setCurrentPage(currentPage + 1);
     };

     const prevPage = () => {
          if (currentPage > 1) setCurrentPage(currentPage - 1);
     };

     const [isDialogOpen, setIsDialogOpen] = useState(false);
     const [deleteStudentId, setDeleteStudentId] = useState<string | null>(
          null
     );
     const [deleteStudentFullname, setDeleteStudentFullname] =
          useState<string>("");

     const [deleteStudentCourseYear, setDeleteStudentCourseYear] =
          useState<string>("");

     const openDialog = () => setIsDialogOpen(true);
     const closeDialog = () => setIsDialogOpen(false);

     const openDeleteDialog = (
          id: string,
          fullname: string,
          courseYear: string
     ) => {
          setDeleteStudentId(id);
          setDeleteStudentFullname(fullname);
          setDeleteStudentCourseYear(courseYear);
     };

     const closeDeleteDialog = () => {
          setDeleteStudentId(null);
     };

     const handleDelete = async (id: string) => {
          startTransition(() => {
               setOptimisticStudents((prevStudents: Student[]) =>
                    prevStudents.filter((student) => student.id !== id)
               );
          });
          try {
               const result = await DeleteStudent(id);
               if (!result.success) {
                    throw new Error("Failed to delete student");
               }

               toast.success("Student deleted successfully");
          } catch (error) {
               console.error("Delete failed:", error);
               toast.error("Error deleting student. Please try again.");

               startTransition(() => {
                    setOptimisticStudents(students);
               });
          } finally {
               closeDeleteDialog();
          }
     };

     const [updateStudentId, setUpdateStudentId] = useState<string>("");

     const openEditDialog = (id: string) => {
          setUpdateStudentId(id);
     };

     const closeUpdateDialog = () => {
          setUpdateStudentId("");
     };

     return (
          <Card className="w-full">
               <CardHeader>
                    <div className="flex justify-between mr-3">
                         <CardTitle className="text-lg font-semibold">
                              A List of Students
                         </CardTitle>
                         <div className="flex justify-between gap-4">
                              <Button
                                   className="text-white"
                                   variant={"secondary"}
                                   onClick={openDialog}
                              >
                                   <PlusIcon /> Add new student
                              </Button>
                              <div className="flex gap-2">
                                   <Input
                                        type="text"
                                        placeholder="Search student"
                                   />
                                   <Button variant={"outline"}>
                                        <SearchIcon size={"icon"} />
                                   </Button>
                              </div>
                         </div>
                    </div>
               </CardHeader>
               <CardContent className="overflow-x-auto">
                    <Table className="table-fixed w-full">
                         <TableHeader>
                              <TableRow>
                                   <TableHead className="w-[50px]">#</TableHead>
                                   <TableHead className="w-[300px]">
                                        Fullname
                                   </TableHead>
                                   <TableHead className="w-[200px]">
                                        Course/Year
                                   </TableHead>
                                   <TableHead className="w-[150px]">
                                        Status
                                   </TableHead>
                                   <TableHead className="w-[120px]">
                                        Action
                                   </TableHead>
                              </TableRow>
                         </TableHeader>
                         <TableBody>
                              {studentsToShow.map((student, index) => (
                                   <TableRow key={student.id}>
                                        <TableCell>
                                             {startIndex + index + 1}
                                        </TableCell>
                                        <TableCell>
                                             {student.fullname}
                                        </TableCell>
                                        <TableCell>
                                             {student.course_Year}
                                        </TableCell>
                                        <TableCell
                                             className={` ${
                                                  student.status === "Absent" ?
                                                       " text-red-500"
                                                  :    " text-green-500"
                                             }`}
                                        >
                                             {student.status}
                                        </TableCell>
                                        <TableCell className="text-right flex gap-2 justify-end">
                                             <Button
                                                  variant={"outline"}
                                                  onClick={() =>
                                                       openEditDialog(
                                                            student.id
                                                       )
                                                  }
                                             >
                                                  <Edit className="w-4 h-4 mr-1" />{" "}
                                                  Edit
                                             </Button>

                                             <Button
                                                  onClick={() =>
                                                       openDeleteDialog(
                                                            student.id,
                                                            student.fullname,
                                                            student.course_Year
                                                       )
                                                  }
                                             >
                                                  <Trash2 className="w-4 h-4 mr-1" />
                                             </Button>
                                        </TableCell>
                                   </TableRow>
                              ))}
                         </TableBody>
                         <TableFooter className="bg-transparent ">
                              <TableRow>
                                   <TableCell
                                        colSpan={4}
                                        className="text-center "
                                   >
                                        <div className="flex  justify-start items-center gap-4 mt-2">
                                             <Button
                                                  variant="outline"
                                                  onClick={prevPage}
                                                  disabled={currentPage === 1}
                                             >
                                                  <ChevronLeft className="w-4 h-4 cursor-pointer" />
                                             </Button>
                                             <span className="text-sm">
                                                  Page {currentPage} of{" "}
                                                  {totalPages}
                                             </span>
                                             <Button
                                                  variant="outline"
                                                  onClick={nextPage}
                                                  disabled={
                                                       currentPage ===
                                                       totalPages
                                                  }
                                             >
                                                  <ChevronRight className="w-4 h-4 cursor-pointer" />
                                             </Button>
                                        </div>
                                   </TableCell>
                              </TableRow>
                         </TableFooter>
                    </Table>
               </CardContent>

               <AddStudentCard isOpen={isDialogOpen} onClose={closeDialog} />

               <UpdateStudentCard
                    id={updateStudentId}
                    isOpen={updateStudentId !== ""}
                    onClose={closeUpdateDialog}
               />

               {deleteStudentId && (
                    <DeleteStudentAlert
                         id={deleteStudentId}
                         onOpen={!!deleteStudentId}
                         onClose={closeDeleteDialog}
                         fullname={deleteStudentFullname}
                         courseYear={deleteStudentCourseYear}
                         onConfirm={handleDelete}
                    />
               )}
          </Card>
     );
}

export default StudentsTable;
