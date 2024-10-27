import { dotnetApi } from "../api/apiConfig";
import { useClassContext } from "../context/ClassContext";
import { CreateAttendancesReportPayload } from "../models/class/AttendancePayloads";
import { IStudentAttendancesResponse } from "../models/class/AttendanceResponses";
import { CreateClassPayload } from "../models/class/ClassPayloads";
import { IGetClassesResponse } from "../models/class/ClassResponses";
import { IFinalGradeResponse } from "../models/grades/FinalGradesResponses";
import {
  CreateGradeItemPayload,
  UpdateGradeItemsPayload,
} from "../models/grades/GradeItemsPayloads";
import { IGradeItemResponse } from "../models/grades/GradeItemsResponses";
import { IStudentResponse } from "../models/students/StudentsResponses";
import { axiosErrorExtractor } from "../utils/axiosErrorUtils";

export const useClass = () => {
  const { classDispatch } = useClassContext();

  const getAllClasses = async () => {
    try {
      const res = await dotnetApi.get("classes/my-classes");
      const data: IGetClassesResponse[] = res.data;
      classDispatch({ type: "GET_ALL_SUCCESS", payload: data });
    } catch (error: unknown) {
      const err = axiosErrorExtractor(error);

      throw new Error(err);
    }
  };
  const createClass = async (classDetails: CreateClassPayload) => {
    try {
      const res = await dotnetApi.post("classes/add", classDetails);
      const newClass: IGetClassesResponse = res.data;
      classDispatch({ type: "CREATE_SUCCESS", payload: newClass });
    } catch (error: unknown) {
      const err = axiosErrorExtractor(error);

      throw new Error(err);
    }
  };

  const getStudentsByClassId = async (classId: number) => {
    try {
      const res = await dotnetApi.get(`classes/${classId}/class-students`);
      const studentsOfClass: IStudentResponse[] = res.data;
      return studentsOfClass;
    } catch (error: unknown) {
      const err = axiosErrorExtractor(error);

      throw new Error(err);
    }
  };
  const addStudentsToClass = async (classId: number, studentsIds: string[]) => {
    try {
      const res = await dotnetApi.put(`classes/${classId}/students/add`, {
        studentsIds,
      });
      const studentsOfClass: IStudentResponse[] = res.data;
      classDispatch({
        type: "ADD_STUDENTS_SUCCESS",
        payload: { classId: classId, students: studentsOfClass },
      });
    } catch (error: unknown) {
      const err = axiosErrorExtractor(error);

      throw new Error(err);
    }
  };

  const removeStudentFromClass = async (classId: number, studentId: string) => {
    try {
      await dotnetApi.delete(`classes/${classId}/students/remove`, {
        data: {
          studentId: studentId,
        },
      });

      classDispatch({
        type: "REMOVE_STUDENT_SUCCESS",
        payload: { classId: classId, studentId: studentId },
      });
    } catch (error: unknown) {
      const err = axiosErrorExtractor(error);

      throw new Error(err);
    }
  };

  const createAttendanceReport = async (
    classId: number,
    studentsAttendances: CreateAttendancesReportPayload
  ) => {
    try {
      await dotnetApi.post(
        `classes/${classId}/attendances`,
        studentsAttendances
      );
    } catch (error: unknown) {
      const err = axiosErrorExtractor(error);

      throw new Error(err);
    }
  };

  const deleteClass = async (classId: number) => {
    try {
      await dotnetApi.delete(`classes/${classId}`);

      classDispatch({
        type: "DELETE_SUCCESS",
        payload: { classId: classId },
      });
    } catch (error: unknown) {
      const err = axiosErrorExtractor(error);

      throw new Error(err);
    }
  };

  const getAttendancesReport = async (classId: number) => {
    try {
      const res = await dotnetApi.get(`classes/${classId}/attendances-report`);
      const report: IStudentAttendancesResponse[] = res.data;
      return report;
    } catch (error: unknown) {
      const err = axiosErrorExtractor(error);

      throw new Error(err);
    }
  };

  const createGradeItem = async (
    classId: number,
    gradeItem: CreateGradeItemPayload
  ) => {
    try {
      const res = await dotnetApi.post(
        `classes/${classId}/grade-items`,
        gradeItem
      );
      const data: IGradeItemResponse = res.data;
      classDispatch({
        type: "ADD_GRADE_ITEM_SUCCESS",
        payload: { classId, gradeItem: data },
      });
    } catch (error: unknown) {
      const err = axiosErrorExtractor(error);

      throw new Error(err);
    }
  };
  const updateGradeItems = async (
    classId: number,
    gradeItems: UpdateGradeItemsPayload
  ) => {
    try {
      await dotnetApi.put(`classes/${classId}/grade-items`, gradeItems);
      const updatedGradeItems: IGradeItemResponse[] =
        gradeItems.gradeItemDtos.map((gradeItem) => ({
          gradeItemId: gradeItem.gradeItemId,
          name: "",
          weight: gradeItem.weight,
        }));

      // Dispatch the action with the converted data
      classDispatch({
        type: "UPDATE_GRADE_ITEMS_SUCCESS",
        payload: { classId, gradeItems: updatedGradeItems },
      });
    } catch (error: unknown) {
      const err = axiosErrorExtractor(error);

      throw new Error(err);
    }
  };
  const deleteGradeItem = async (gradeItemId: number, classId: number) => {
    try {
      await dotnetApi.delete(`classes/grade-items/${gradeItemId}`);
      classDispatch({
        type: "REMOVE_GRADE_ITEM_SUCCESS",
        payload: { classId, gradeItemId },
      });
    } catch (error: unknown) {
      const err = axiosErrorExtractor(error);

      throw new Error(err);
    }
  };

  const getFinalGradesReport = async (classId: number) => {
    try {
      const res = await dotnetApi.get(`classes/${classId}/final-grades`);
      const data: IFinalGradeResponse = res.data;
      return data;
    } catch (error: unknown) {
      const err = axiosErrorExtractor(error);

      throw new Error(err);
    }
  };
  const deleteFinalGradesReport = async (classId: number) => {
    try {
      await dotnetApi.delete(`classes/${classId}/final-grades`);

      return;
    } catch (error: unknown) {
      const err = axiosErrorExtractor(error);

      throw new Error(err);
    }
  };
  const getCurrentGradesReport = async (classId: number) => {
    try {
      const res = await dotnetApi.get(`classes/${classId}/grades`);
      const data: IFinalGradeResponse = res.data;
      return data;
    } catch (error: unknown) {
      const err = axiosErrorExtractor(error);

      throw new Error(err);
    }
  };
  return {
    getAllClasses,
    createClass,
    getStudentsByClassId,
    addStudentsToClass,
    removeStudentFromClass,
    createAttendanceReport,
    deleteClass,
    getAttendancesReport,
    createGradeItem,
    deleteGradeItem,
    updateGradeItems,
    getFinalGradesReport,
    getCurrentGradesReport,
    deleteFinalGradesReport,
  };
};
