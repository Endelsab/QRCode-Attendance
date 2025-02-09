import StudentsTable from "@/components/StudentsTable";
import GetAllStudents from "../actions/GetAllStudents";

async function Students() {
	const students = await GetAllStudents();
	return (
		<div className="p-2">
			<StudentsTable students={students} />
		</div>
	);
}

export default Students;
