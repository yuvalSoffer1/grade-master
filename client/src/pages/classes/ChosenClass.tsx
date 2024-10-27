import { useParams } from "react-router-dom";
import { useClassContext } from "../../context/ClassContext";
import StudentsTable from "../../components/ui/tables/students/StudentsTable";
import { IStudentTable } from "../../models/TableModels";
import StyledButton from "../../components/ui/buttons/StyledButton";
import { useEffect, useState } from "react";
import StudentsAtClassModal from "../../components/ui/modals/StudentsAtClassModal";
import { useStudentContext } from "../../context/StudentContext";
import { IStudentResponse } from "../../models/students/StudentsResponses";
import { useStudent } from "../../hooks/useStudent";
import { useClass } from "../../hooks/useClass";
import {
  CreateAttendancePayload,
  CreateAttendancesReportPayload,
} from "../../models/class/AttendancePayloads";
import { IStudentAttendancesResponse } from "../../models/class/AttendanceResponses";
import { exportStudentsList } from "../../utils/exportToCsv";

import ExportToCsvButton from "../../components/ui/buttons/ExportToCsvButton";
import { toast } from "react-toastify";

const ChosenClass = () => {
  const { classId } = useParams();
  const { addStudentsToClass, createAttendanceReport, getAttendancesReport } =
    useClass();
  const [attendancesReport, setAttendancesReport] = useState<
    IStudentAttendancesResponse[]
  >([]);

  const { classesState } = useClassContext();
  const { studentsState } = useStudentContext();
  const { getAllStudents } = useStudent();
  const [availableStudents, setAvailableStudents] = useState<
    IStudentResponse[]
  >([]);
  const [currentDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [tableType, setTableType] = useState("");
  const id = classId ? parseInt(classId) : undefined;

  const selectedClass = classId
    ? classesState.classes.find((c) => c.classId === parseInt(classId))
    : undefined;

  const onClickAdd = () => {
    const classStudentIds =
      selectedClass?.students?.map((student) => student.studentId) || [];
    const filteredStudents = studentsState.students.filter(
      (student) => !classStudentIds.includes(student.studentId)
    );
    setAvailableStudents(filteredStudents);
    setTableType("STUDENTS");
    setIsOpen(true);
  };

  const onAddStudents = async (studentsIds: string[]) => {
    if (id) await addStudentsToClass(id, studentsIds);
    return;
  };

  const onGetReport = async () => {
    try {
      if (id) {
        const result = await getAttendancesReport(id);
        setAttendancesReport(result);
        setIsOpen(true);
        setTableType("ATT");
      } else {
        toast.error("An unexpected error occurred");
      }
    } catch (error) {
      toast.error("There are no attendance reports to show");
    }
  };

  const handleExport = () => {
    if (selectedClass?.students && selectedClass.students.length > 0) {
      exportStudentsList(
        selectedClass.students,
        `${selectedClass?.className.toLowerCase()}_${
          selectedClass?.groupId
        }_students.csv`
      );
    }
    return;
  };

  const onCreateReport = async (studentsIds: string[]) => {
    if (id && selectedClass?.students) {
      const allStudentsInClass =
        selectedClass?.students.map((student) => student.studentId) || [];
      const attendanceDtos: CreateAttendancePayload[] = allStudentsInClass.map(
        (studentId) => ({
          studentId,
          isPresent: studentsIds.includes(studentId),
        })
      );
      const newReport: CreateAttendancesReportPayload = {
        attendanceDtos,
        date: currentDate,
      };
      await createAttendanceReport(id, newReport); // Adjust this function to handle attendance report creation
    }
    return;
  };

  const getAllStudentsAsync = async () => {
    try {
      await getAllStudents();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(
    () => {
      if (studentsState.students.length === 0) {
        getAllStudentsAsync();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <div className="flex flex-col items-center lg:h-89dvh xl:min-h-92dvh">
      <div className=" flex flex-row justify-between items-center">
        <h2 className="text-2xl font-bold text-center">
          {`${selectedClass?.className}${selectedClass?.groupId}`}
        </h2>
        <StyledButton
          buttonType="button"
          text="Create Attendance Report"
          onClickButton={() => {
            setTableType("CREATE");
            setIsOpen(true);
          }}
          width="54%"
        />
      </div>
      <div className=" flex flex-row justify-between items-center mt-4">
        <h3 className="text-xl font-bold text-center">Students List</h3>
        <ExportToCsvButton onExport={handleExport} />
      </div>
      {selectedClass?.students && selectedClass.students.length > 0 ? (
        <StudentsTable
          students={selectedClass.students as IStudentTable[]}
          isEditable={true}
          classId={id}
        />
      ) : (
        <p>There are no students in the class</p>
      )}
      <div className="flex flex-row justify-between mt-8">
        <StyledButton
          buttonType="button"
          text="Add Students"
          onClickButton={onClickAdd}
          width="45%"
        />
        <StyledButton
          buttonType="button"
          text="Attendances Report"
          onClickButton={onGetReport}
          width="45%"
        />
      </div>
      {isOpen && attendancesReport !== undefined && tableType === "ATT" && (
        <StudentsAtClassModal
          title={`Attendances Report ${selectedClass?.className} ${selectedClass?.groupId}`}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={() => setIsOpen(false)}
          messageType="Reports"
          availableData={attendancesReport}
        />
      )}
      {isOpen && tableType === "STUDENTS" && (
        <StudentsAtClassModal
          title="Add Students"
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={onAddStudents}
          messageType="Students"
          availableData={availableStudents}
        />
      )}
      {isOpen && selectedClass?.students && tableType === "CREATE" && (
        <StudentsAtClassModal
          title={`Attendance Report: ${currentDate.toLocaleDateString()}`}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={onCreateReport}
          messageType="Attendance Report"
          availableData={selectedClass?.students}
        />
      )}
    </div>
  );
};

export default ChosenClass;
