import {
     AlertDialog,
     AlertDialogContent,
     AlertDialogHeader,
     AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import AddStudent from "./AddStudent";
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog";

type AddDialogProps = {
     isOpen: boolean;
     onClose: () => void;
};

function AddStudentCard({ isOpen, onClose }: AddDialogProps) {
     return (
          <AlertDialog open={isOpen} onOpenChange={onClose}>
               <AlertDialogContent className=" border-none bg-transparent  ">
                    <AlertDialogDescription>
                         <span className="hidden">Add student</span>
                    </AlertDialogDescription>
                    <AlertDialogHeader>
                         <AlertDialogTitle>Add New Student</AlertDialogTitle>
                    </AlertDialogHeader>

                    <AddStudent onClose={onClose} />
               </AlertDialogContent>
          </AlertDialog>
     );
}
export default AddStudentCard;
