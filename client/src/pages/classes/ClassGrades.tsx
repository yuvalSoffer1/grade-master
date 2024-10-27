import { useEffect, useState } from "react";

import { useClassContext } from "../../context/ClassContext";
import { useStudent } from "../../hooks/useStudent";
import { useStudentContext } from "../../context/StudentContext";
import { useParams } from "react-router-dom";

import StudentsGradeTable from "../../components/ui/tables/students/StudentsGradeTable";
import { IStudentResponse } from "../../models/students/StudentsResponses";
import AddStudentGradeCard from "../../components/ui/cards/students/AddStudentGradeCard";
import AddGradesFromCsv from "../../components/ui/csvs/AddGradesFromCsv";
import StyledButton from "../../components/ui/buttons/StyledButton";
import { useClass } from "../../hooks/useClass";
import { IFinalGradeResponse } from "../../models/grades/FinalGradesResponses";
import FinalGradesTable from "../../components/ui/tables/grades/FinalGradesTable";
import { toast } from "react-toastify";

const ClassGrades = () => {
  const { classId } = useParams();

  const { classesState } = useClassContext();
  const { studentsState } = useStudentContext();
  const { getAllStudents } = useStudent();
  const { getFinalGradesReport, getCurrentGradesReport } = useClass();

  const [selectedDisplay, setSelectedDisplay] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<IStudentResponse>();
  const [finalGradesReport, setFinalGradesReport] =
    useState<IFinalGradeResponse>();

  const id = classId ? parseInt(classId) : undefined;

  const selectedClass = classId
    ? classesState.classes.find((c) => c.classId === parseInt(classId))
    : undefined;

  const onClickAdd = (student: IStudentResponse) => {
    setSelectedStudent(student);
    setSelectedDisplay("ADD");
  };

  const getAllStudentsAsync = async () => {
    try {
      await getAllStudents();
    } catch (error) {
      console.log(error);
    }
  };

  const getFinalGrades = async () => {
    const totalWeight = classesState.classes
      .filter((cls) => cls.classId === id)
      .flatMap((cls) => cls.gradeItems || [])
      .reduce((total, item) => total + (item.weight || 0), 0);

    try {
      if (totalWeight !== 1) {
        toast.error("The total weight of grade items must be exactly 100.");
        return;
      }
      if (typeof id === "number") {
        const report = await getFinalGradesReport(id);
        setFinalGradesReport(report);
        setSelectedDisplay("REPORT");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      toast.error(errorMessage);
    }
  };
  const getCurrentGrades = async () => {
    try {
      if (typeof id === "number") {
        const report = await getCurrentGradesReport(id);
        setFinalGradesReport(report);
        setSelectedDisplay("REPORT");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    if (studentsState.students.length === 0) {
      getAllStudentsAsync();
    }
  }, []);

  return (
    <div className="flex flex-col items-center mt-8 lg:h-89dvh xl:min-h-92dvh">
      <div className=" flex flex-row justify-between items-center">
        <h2 className="text-2xl font-bold text-center">
          {`${selectedClass?.className}${selectedClass?.groupId}`}{" "}
        </h2>
      </div>

      {selectedDisplay === "" &&
        selectedClass?.students &&
        selectedClass.students.length > 0 && (
          <>
            <div className=" flex flex-row justify-between items-center mt-4">
              <h3 className="text-xl font-bold text-center">Students List</h3>
            </div>
            <StudentsGradeTable
              students={selectedClass.students}
              onAdd={onClickAdd}
            />
            <div className="flex flex-row justify-between h-20 mt-8">
              {" "}
              <StyledButton
                buttonType="button"
                text="Import Csv"
                onClickButton={() => setSelectedDisplay("CSV")}
                width="30%"
              />
              <StyledButton
                buttonType="button"
                text="Get Final Grades Report"
                onClickButton={getFinalGrades}
                extraColor="green"
                width="30%"
              />
              <StyledButton
                buttonType="button"
                text="Get Current Grades Report"
                onClickButton={getCurrentGrades}
                extraColor="green"
                width="30%"
              />
            </div>
          </>
        )}
      {selectedDisplay === "REPORT" && finalGradesReport && id && (
        <FinalGradesTable
          data={finalGradesReport}
          classId={id}
          setSelectedDisplay={setSelectedDisplay}
        />
      )}
      {selectedDisplay === "ADD" && selectedStudent && id && (
        <AddStudentGradeCard selectedStudent={selectedStudent} classId={id} />
      )}
      {selectedDisplay === "CSV" && id && (
        <AddGradesFromCsv setSelectedDisplay={() => setSelectedDisplay("")} />
      )}
      {selectedDisplay !== "" && (
        <StyledButton
          buttonType="button"
          text="Return"
          onClickButton={() => setSelectedDisplay("")}
          width="16.67%"
          extraColor="red"
        />
      )}
    </div>
  );
};

export default ClassGrades;
