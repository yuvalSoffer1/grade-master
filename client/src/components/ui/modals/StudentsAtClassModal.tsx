import { useState } from "react";

import StudentsAtClass from "../tables/students/StudentsAtClassTable";
import { IStudentResponse } from "../../../models/students/StudentsResponses";

import { useDisplay, DisplayType } from "../../../hooks/useDisplay";
import { toast } from "react-toastify";
import { IStudentAttendancesResponse } from "../../../models/class/AttendanceResponses";
import AttendancesTable from "../tables/classes/AttendancesTable";

interface IStudentsAtClassModalProps {
  title: string;
  isOpen: boolean;
  availableData: IStudentResponse[] | IStudentAttendancesResponse[];
  messageType: string;
  onClose: () => void;
  onConfirm: (ids: string[]) => void;
}

const StudentsAtClassModal = ({
  title,
  isOpen,
  onClose,
  onConfirm,
  availableData,
  messageType,
}: IStudentsAtClassModalProps) => {
  const { displayManager } = useDisplay();

  const [chosenStudentsIds, setChosenStudentsIds] = useState<string[]>([]);

  const onSelect = (studentId: string) => {
    setChosenStudentsIds((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  const isStudentResponse = (data: any): data is IStudentResponse => {
    return data !== undefined && "phoneNumber" in data;
  };

  const isAttendances = (data: any): data is IStudentAttendancesResponse => {
    return data !== undefined && "totalAttendances" in data;
  };

  const handleConfirm = async () => {
    displayManager(DisplayType.START_LOADING);
    try {
      await onConfirm(chosenStudentsIds);
      toast.success(`${messageType} were added!`);
      onClose();
    } catch (error) {
      console.log(error);
      toast.error(`${messageType} weren't added!`);
    } finally {
      displayManager(DisplayType.STOP_LOADING);
    }
  };

  return isOpen ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-11/12 p-6">
        <h2 className="text-lg text-center font-semibold mb-4">{title}</h2>
        {isStudentResponse(availableData[0]) && (
          <StudentsAtClass
            students={availableData as IStudentResponse[]}
            chosenStudentsIds={chosenStudentsIds}
            onSelect={onSelect}
          />
        )}
        {isAttendances(availableData[0]) && (
          <div className="flex flex-col items-center">
            <AttendancesTable
              report={availableData as IStudentAttendancesResponse[]}
              fileName={title.replace(" ", "_").toLowerCase()}
            />
          </div>
        )}
        <div className="flex justify-center mt-5">
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          {isStudentResponse(availableData[0]) && (
            <button
              className="bg-green-600 text-white px-4 py-2 rounded"
              onClick={handleConfirm}
            >
              Confirm
            </button>
          )}
        </div>
      </div>
    </div>
  ) : null;
};

export default StudentsAtClassModal;
