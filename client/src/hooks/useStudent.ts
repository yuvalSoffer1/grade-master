import { dotnetApi } from "../api/apiConfig";
import { useStudentContext } from "../context/StudentContext";
import {
  CreateGradePayload,
  GradesPayload,
} from "../models/grades/GradesPayloads";
import { CreateStudentPayload } from "../models/students/StudentsPayloads";
import { IStudentResponse } from "../models/students/StudentsResponses";
import { axiosErrorExtractor } from "../utils/axiosErrorUtils";

export const useStudent = () => {
  const { studentDispatch } = useStudentContext();

  const getAllStudents = async () => {
    try {
      const res = await dotnetApi.get("students");
      const data: IStudentResponse[] = res.data;
      studentDispatch({ type: "GET_ALL_SUCCESS", payload: data });
    } catch (error: unknown) {
      const err = axiosErrorExtractor(error);

      throw new Error(err);
    }
  };
  const createStudent = async (studentDetails: CreateStudentPayload) => {
    try {
      const res = await dotnetApi.post("students/create", studentDetails);
      const newStudent: IStudentResponse = res.data;
      studentDispatch({ type: "CREATE_SUCCESS", payload: newStudent });
    } catch (error: unknown) {
      const err = axiosErrorExtractor(error);

      throw new Error(err);
    }
  };
  const createStudentsFromCsv = async (
    studentsDetails: CreateStudentPayload[]
  ) => {
    try {
      const res = await dotnetApi.post("students/create-csv", studentsDetails);
      const newStudents: IStudentResponse[] = res.data;
      studentDispatch({
        type: "CREATE_FROM_CSV_SUCCESS",
        payload: newStudents,
      });
    } catch (error: unknown) {
      const err = axiosErrorExtractor(error);

      throw new Error(err);
    }
  };
  const deleteStudent = async (studentId: string) => {
    try {
      await dotnetApi.delete(`students/${studentId}`);

      studentDispatch({
        type: "DELETE_SUCCESS",
        payload: { studentId: studentId },
      });
    } catch (error: unknown) {
      const err = axiosErrorExtractor(error);

      throw new Error(err);
    }
  };

  const addGradeToStudent = async (grade: CreateGradePayload) => {
    try {
      await dotnetApi.post(`students/${grade.studentId}/grades`, grade);
      return;
    } catch (error: unknown) {
      const err = axiosErrorExtractor(error);

      throw new Error(err);
    }
  };

  const addMultipleGradesToStudent = async (grades: GradesPayload) => {
    try {
      await dotnetApi.post("students/grades", grades);
      return;
    } catch (error: unknown) {
      const err = axiosErrorExtractor(error);

      throw new Error(err);
    }
  };
  return {
    getAllStudents,
    createStudent,
    createStudentsFromCsv,
    deleteStudent,
    addGradeToStudent,
    addMultipleGradesToStudent,
  };
};
