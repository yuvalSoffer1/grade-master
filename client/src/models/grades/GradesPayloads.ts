export type CreateGradePayload = {
  studentId: string;
  gradeItemId: number;
  score: number;
};

export interface ICreateGradesPayload {
  gradeItemId: number;
  score: number;
}
export type Grades = Record<string, ICreateGradesPayload[]>;

export type GradesPayload = {
  grades: Grades;
};
