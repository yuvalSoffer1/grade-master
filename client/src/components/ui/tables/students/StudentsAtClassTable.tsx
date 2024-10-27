import { IconCirclePlusFilled, IconCircleXFilled } from "@tabler/icons-react";
import { IStudentResponse } from "../../../../models/students/StudentsResponses";

interface IStudentsAtClassTableProps {
  students: IStudentResponse[];
  chosenStudentsIds: string[];
  onSelect: (studentId: string) => void;
}

const StudentsAtClass = ({
  students,
  chosenStudentsIds,
  onSelect,
}: IStudentsAtClassTableProps) => {
  return (
    <div className="overflow-y-auto">
      <table className="min-w-full bg-white border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Student ID</th>
            <th className="px-4 py-2 border">First Name</th>
            <th className="px-4 py-2 border">Last Name</th>
            <th className="px-4 py-2 border">Add</th>
          </tr>
        </thead>
        <tbody>
          {students
            .sort((a, b) => Number(a.studentId) - Number(b.studentId))
            .map((student) => (
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
                <td className="px-4 py-2 text-center border flex justify-center items-center">
                  {chosenStudentsIds.includes(student.studentId) ? (
                    <IconCircleXFilled
                      className="cursor-pointer text-red-500"
                      onClick={() => onSelect(student.studentId)}
                    />
                  ) : (
                    <IconCirclePlusFilled
                      className="cursor-pointer text-green-700"
                      onClick={() => onSelect(student.studentId)}
                    />
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentsAtClass;
