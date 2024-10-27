import { IconCirclePlusFilled } from "@tabler/icons-react";
import { IStudentResponse } from "../../../../models/students/StudentsResponses";
interface IStudentsGradeTableProps {
  students: IStudentResponse[];
  onAdd: (studemt: IStudentResponse) => void;
}

const StudentsGradeTable = ({ students, onAdd }: IStudentsGradeTableProps) => {
  return (
    <div className="overflow-y-auto overflow-x-auto">
      <table className="min-w-full bg-white border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Student ID</th>
            <th className="px-4 py-2 border">First Name</th>
            <th className="px-4 py-2 border">Last Name</th>
            <th className="px-4 py-2 border">Add Grade</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.studentId}>
              <td className="px-4 py-2 text-center border">
                {student.studentId}
              </td>
              <td className="px-4 py-2 text-center border">
                {student.firstName}
              </td>
              <td className="px-4 py-2 text-center border">
                {student.lastName}
              </td>
              <td className="px-4 py-2 text-center border">
                <IconCirclePlusFilled
                  className=" cursor-pointer"
                  onClick={() => onAdd(student)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentsGradeTable;
