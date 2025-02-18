import {
     AlertDialog,
     AlertDialogContent,
     AlertDialogHeader,
     AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import AddStudent from "./AddStudent";

type AddDialogProps = {
     isOpen: boolean;
     onClose: () => void;
};

function AddStudentCard({ isOpen, onClose }: AddDialogProps) {
     return (
          <AlertDialog open={isOpen} onOpenChange={onClose}>
               <AlertDialogContent className=" border-none bg-transparent  ">
                    <AlertDialogHeader>
                         <AlertDialogTitle>Add New Student</AlertDialogTitle>
                    </AlertDialogHeader>

                    <AddStudent onClose={onClose} />
               </AlertDialogContent>
          </AlertDialog>
     );
}
export default AddStudentCard;
