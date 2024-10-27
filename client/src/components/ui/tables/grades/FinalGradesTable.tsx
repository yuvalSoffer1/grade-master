import { IFinalGradeResponse } from "../../../../models/grades/FinalGradesResponses";
import ExportToCsvButton from "../../buttons/ExportToCsvButton";
import { exportFinalGradesReport } from "../../../../utils/exportToCsv";
import { useClass } from "../../../../hooks/useClass";
import { DisplayType, useDisplay } from "../../../../hooks/useDisplay";
import DeleteModal from "../../modals/DeleteModal";
import { useDisplayContext } from "../../../../context/DisplayContext";
import { toast } from "react-toastify";
import { IconTrashFilled } from "@tabler/icons-react";

interface IFinalGradeTableProps {
  data: IFinalGradeResponse;
  classId: number;
  setSelectedDisplay: (value: string) => void;
}

const FinalGradesTable = ({
  data,
  classId,
  setSelectedDisplay,
}: IFinalGradeTableProps) => {
  const { deleteFinalGradesReport } = useClass();
  const { displayManager } = useDisplay();
  const { displayState } = useDisplayContext();
  const onDeleteReport = async () => {
    try {
      await deleteFinalGradesReport(classId);
      toast.success("Final Grades Report was deleted successfully!");
      setSelectedDisplay("");
      displayManager(DisplayType.CLOSE_MODAL);
    } catch (error) {
      toast.error("Failed to delete, try again later!");
    }
  };
  return (
    <div className="overflow-y-auto overflow-x-auto">
      <div className="flex flex-row text-center mt-8 mb-4 justify-center items-center">
        <h3 className="text-xl ">FINAL GRADES</h3>
        <ExportToCsvButton
          onExport={() =>
            exportFinalGradesReport(data, `${data.className}-grades-report.csv`)
          }
        />
        {data.classAverage >= 0 && (
          <IconTrashFilled
            className="cursor-pointer text-red-500"
            onClick={() => displayManager(DisplayType.SHOW_MODAL)}
          />
        )}
      </div>

      <table className="min-w-full bg-white border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Student ID</th>
            <th className="px-4 py-2 border">Student Name</th>
            {data.students[0].grades.map((grade) => (
              <th key={grade.name} className="px-4 py-2 border">
                {grade.name} ({grade.weight * 100}%)
              </th>
            ))}
            <th className="px-4 py-2 border">Final Grade</th>
          </tr>
        </thead>
        <tbody>
          {data.students.map((student) => (
            <tr key={student.studentId}>
              <td className="px-4 py-2 text-center border">
                {student.studentId}
              </td>
              <td className="px-4 py-2 text-center border">
                {student.studentName}
              </td>
              {student.grades.map((grade) => (
                <td key={grade.name} className="px-4 py-2 text-center border">
                  {grade.score}
                </td>
              ))}
              <td className="px-4 py-2 text-center border">
                {student.finalGrade}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {data.classAverage >= 0 && (
        <div className="mt-4 text-center">
          <span className="font-semibold">Class Average:</span>{" "}
          {data.classAverage}
        </div>
      )}
      {displayState.showModal && (
        <DeleteModal
          onConfirm={onDeleteReport}
          onClose={() => displayManager(DisplayType.CLOSE_MODAL)}
          itemName={"Final Grades Report"}
        />
      )}
    </div>
  );
};

export default FinalGradesTable;
