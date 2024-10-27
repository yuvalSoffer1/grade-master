import { IGradeItemResponse } from "../grades/GradeItemsResponses";
import { IStudentResponse } from "../students/StudentsResponses";

export interface IGetClassesResponse {
  classId: number;
  className: string;
  groupId: number;
  amountOfStudents: number;
  students: IStudentResponse[] | null;
  gradeItems: IGradeItemResponse[] | null;
}
