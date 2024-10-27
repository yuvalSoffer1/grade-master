import { IGradeItemResponse } from "../../../../models/grades/GradeItemsResponses";
import GenericTable from "../GenericTable";
import { useClass } from "../../../../hooks/useClass";

const ClassSettingsTable = ({
  gradeItems,
  isEditable,
  classId,
}: {
  gradeItems: IGradeItemResponse[];
  isEditable: boolean;
  classId?: number;
}) => {
  const { deleteGradeItem } = useClass();
  const columns: { header: string; accessor: keyof IGradeItemResponse }[] = [
    { header: "Name", accessor: "name" },
    { header: "Weight", accessor: "weight" },
  ];

  const handleDeleteGradeItem = async (gradeItemId: string | number) => {
    if (typeof gradeItemId === "number" && classId) {
      await deleteGradeItem(gradeItemId, classId);
    } else {
      console.error("Expected number ID, but got string");
    }
  };

  return (
    <GenericTable<IGradeItemResponse>
      data={gradeItems}
      columns={columns}
      isEditable={isEditable}
      deleteHandler={handleDeleteGradeItem}
      idAccessor="gradeItemId"
      itemName={"Grade Item"}
    />
  );
};

export default ClassSettingsTable;
