import GenericTable from "../GenericTable";
import { IGetClassesResponse } from "../../../../models/class/ClassResponses";
import { useNavigate } from "react-router-dom";
import { useClass } from "../../../../hooks/useClass";

const ClassesTable = ({
  classes,
  isEditable,
  toNavigate,
}: {
  classes: IGetClassesResponse[];
  isEditable: boolean;
  toNavigate: string;
}) => {
  const columns: { header: string; accessor: keyof IGetClassesResponse }[] = [
    { header: "Class Name", accessor: "className" },
    { header: "Group Id", accessor: "groupId" },
    { header: "Amount of Students", accessor: "amountOfStudents" },
  ];

  const { deleteClass } = useClass();

  const navigate = useNavigate();

  const handleDeleteClass = async (id: string | number) => {
    if (typeof id === "number") {
      await deleteClass(id);
    } else {
      console.error("Expected number ID, but got string");
    }
  };
  const navigateHandler = (classId: number) => {
    navigate(`/${toNavigate}/${classId}`);
  };

  return (
    <GenericTable<IGetClassesResponse>
      data={classes}
      columns={columns}
      isEditable={isEditable}
      actionHandler={navigateHandler}
      deleteHandler={handleDeleteClass}
      idAccessor="classId"
      itemName="Class"
    />
  );
};
export default ClassesTable;
