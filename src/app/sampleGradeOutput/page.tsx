"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const Page = () => {
     const [quiz, setQuiz] = useState(0);
     const [pT, setPt] = useState(0);
     const [exam, setExam] = useState(0);

     const grade = Math.ceil(quiz * 0.25 + pT * 0.45 + exam * 0.3);

     const gpa =
          grade > 100 ? "Masyado ka nang malakas"
          : grade >= 90 ? "1"
          : grade >= 76 ? "2"
          : grade == 75 ? "3"
          : "Bawi next life";

     return (
          <div className="min-h-screen flex justify-center items-center">
               <div className="border flex flex-col gap-10 border-gray-400 p-4 shadow-lg rounded-md">
                    <div className="flex flex-col gap-10 justify-center items-center">
                         <h1 className="text-green-500 text-2xl">
                              Sample grade computations
                         </h1>
                         <div className="flex gap-6">
                              <p>Quiz - 25%</p>
                              <p>Performance Task - 45%</p>
                              <p>Exam - 30%</p>
                         </div>
                    </div>

                    <div className="flex gap-20">
                         <div className="flex gap-2 flex-col w-20">
                              <Label htmlFor="quiz">Quiz</Label>
                              <Input
                                   id="quiz"
                                   value={quiz}
                                   onChange={(e) =>
                                        setQuiz(Number(e.target.value))
                                   }
                              />
                              <Label htmlFor="PT">PT</Label>
                              <Input
                                   id="PT"
                                   value={pT}
                                   onChange={(e) =>
                                        setPt(Number(e.target.value))
                                   }
                              />
                              <Label htmlFor="Exam">Exam</Label>
                              <Input
                                   id="Exam"
                                   value={exam}
                                   onChange={(e) =>
                                        setExam(Number(e.target.value))
                                   }
                              />
                         </div>
                         <div className="mt-4">
                              <p>Grade : {grade}</p>
                              <p className="text-sm">
                                   GPA : {grade ? gpa : ""}
                              </p>
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default Page;
