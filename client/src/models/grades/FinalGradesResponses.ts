interface IGradeResponse {
  name: string;
  weight: number;
  score: number;
}

interface IStudentFinalGradeResponse {
  studentId: string;
  studentName: string;
  grades: IGradeResponse[];
  finalGrade: number;
}

export interface IFinalGradeResponse {
  className: string;
  students: IStudentFinalGradeResponse[];
  classAverage: number;
}
