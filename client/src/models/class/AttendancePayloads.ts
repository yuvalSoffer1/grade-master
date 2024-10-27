export type CreateAttendancePayload = {
  studentId: string;
  isPresent: boolean;
};

export type CreateAttendancesReportPayload = {
  attendanceDtos: CreateAttendancePayload[];
  date: Date;
};
