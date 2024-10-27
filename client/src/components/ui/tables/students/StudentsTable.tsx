import { IStudentTable } from "../../../../models/TableModels";
import { useStudent } from "../../../../hooks/useStudent";
import GenericTable from "../GenericTable";
import { useClass } from "../../../../hooks/useClass";

const StudentsTable = ({
  students,
  isEditable,
  classId,
}: {
  students: IStudentTable[];
  isEditable: boolean;
  classId?: number;
}) => {
  const { deleteStudent } = useStudent();
  const { removeStudentFromClass } = useClass();

  const columns: { header: string; accessor: keyof IStudentTable }[] = [
    { header: "Student ID", accessor: "studentId" },
    { header: "First Name", accessor: "firstName" },
    { header: "Last Name", accessor: "lastName" },
    { header: "Phone Number", accessor: "phoneNumber" },
  ];

  const handleDeleteStudent = async (id: string | number) => {
    if (typeof id === "string") {
      await deleteStudent(id);
    } else {
      console.error("Expected string ID, but got number");
    }
  };

  const handleRemoveStudentFromClass = async (id: string | number) => {
    if (typeof id === "string") {
      if (classId) await removeStudentFromClass(classId, id);
      else {
        console.error("Expected Class ID, but got nothing");
      }
    } else {
      console.error("Expected string ID, but got number");
    }
  };

  return (
    <GenericTable<IStudentTable>
      data={students}
      columns={columns}
      isEditable={isEditable}
      deleteHandler={
        classId ? handleRemoveStudentFromClass : handleDeleteStudent
      }
      idAccessor="studentId"
      itemName={classId ? "Student From this class " : "Student"}
    />
  );
};

export default StudentsTable;
