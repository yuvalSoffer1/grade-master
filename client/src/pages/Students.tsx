import { useEffect, useRef, useState } from "react";
import { useStudent } from "../hooks/useStudent";
import StudentsTable from "../components/ui/tables/students/StudentsTable";
import AddStudentCard from "../components/ui/cards/students/AddStudentCard";
import AddStudentsFromCsv from "../components/ui/csvs/AddStudentsFromCsv";
import { useStudentContext } from "../context/StudentContext";
import StyledButton from "../components/ui/buttons/StyledButton";
import { IStudentTable } from "../models/TableModels";
import { exportStudentsList } from "../utils/exportToCsv";
import ExportToCsvButton from "../components/ui/buttons/ExportToCsvButton";

const Students = () => {
  const { getAllStudents } = useStudent();
  const isEffectRan = useRef(false);
  const [selectedDisplay, setSelectedDisplay] = useState("");
  const { studentsState } = useStudentContext();
  const { students } = studentsState;

  const getAllStudentsAsync = async () => {
    try {
      await getAllStudents();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(
    () => {
      if (!isEffectRan.current) {
        getAllStudentsAsync();
      }
      return () => {
        isEffectRan.current = true;
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <div className=" flex flex-col items-center text-center mt-8 xl:mt-[4%]">
      <h2 className="text-2xl font-bold mb-3 text-center">Students</h2>
      {selectedDisplay === "" && (
        <>
          <ExportToCsvButton
            onExport={() => exportStudentsList(students, "students.csv")}
          />
          <StudentsTable
            students={students as IStudentTable[]}
            isEditable={true}
          />
          <StyledButton
            buttonType="button"
            text="Add Students"
            onClickButton={() => setSelectedDisplay("Add")}
            width="16.67%"
          />
        </>
      )}
      {selectedDisplay === "Add" && (
        <>
          <StyledButton
            buttonType="button"
            text="Add Students Manually"
            onClickButton={() => setSelectedDisplay("Manually")}
            width="16.67%"
          />
          <StyledButton
            buttonType="button"
            text="Import Students From CSV"
            onClickButton={() => setSelectedDisplay("CSV")}
            width="16.67%"
          />
        </>
      )}
      {selectedDisplay === "Manually" && (
        <AddStudentCard setSelectedDisplay={setSelectedDisplay} />
      )}
      {selectedDisplay === "CSV" && (
        <AddStudentsFromCsv setSelectedDisplay={setSelectedDisplay} />
      )}
      {selectedDisplay !== "" && (
        <StyledButton
          buttonType="button"
          text="Return"
          onClickButton={() => setSelectedDisplay("")}
          width="25%"
          extraColor="red"
        />
      )}
    </div>
  );
};

export default Students;
