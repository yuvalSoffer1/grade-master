import React, { createContext, useReducer, useContext, Dispatch } from "react";
import { IStudentResponse } from "../models/students/StudentsResponses";

type StudentAction =
  | { type: "GET_ALL_SUCCESS"; payload: IStudentResponse[] }
  | { type: "CREATE_SUCCESS"; payload: IStudentResponse }
  | { type: "CREATE_FROM_CSV_SUCCESS"; payload: IStudentResponse[] }
  | { type: "DELETE_SUCCESS"; payload: { studentId: string } };

interface StudentState {
  students: IStudentResponse[] | [];
}

const initialState: StudentState = {
  students: [],
};

const StudentContext = createContext<
  | {
      studentsState: StudentState;
      studentDispatch: Dispatch<StudentAction>;
    }
  | undefined
>(undefined);

const studentReducer = (
  state: StudentState,
  action: StudentAction
): StudentState => {
  switch (action.type) {
    case "GET_ALL_SUCCESS":
      return {
        students: action.payload,
      };
    case "CREATE_SUCCESS": {
      const newStudent = action.payload;
      return {
        students: state.students
          ? [...state.students, newStudent]
          : [newStudent],
      };
    }
    case "CREATE_FROM_CSV_SUCCESS": {
      const newStudents = action.payload;
      return {
        students: state.students
          ? [...state.students, ...newStudents]
          : newStudents,
      };
    }

    case "DELETE_SUCCESS":
      return {
        students: state.students
          ? state.students.filter(
              (student) => student.studentId !== action.payload.studentId
            )
          : [],
      };

    default:
      return state;
  }
};

export const StudentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [studentsState, studentDispatch] = useReducer(
    studentReducer,
    initialState
  );

  return (
    <StudentContext.Provider value={{ studentsState, studentDispatch }}>
      {children}
    </StudentContext.Provider>
  );
};

export const useStudentContext = () => {
  const context = useContext(StudentContext);

  if (context === undefined) {
    throw new Error("useStudentContext must be used within a StudentProvider");
  }

  return context;
};
