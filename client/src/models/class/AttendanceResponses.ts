interface IAttendanceDates {
  [date: string]: string;
}
export interface IStudentAttendancesResponse {
  studentId: string;
  firstName: string;
  lastName: string;
  attendanceDates: IAttendanceDates;
  totalAttendances: number;
  totalLectures: number;
}
