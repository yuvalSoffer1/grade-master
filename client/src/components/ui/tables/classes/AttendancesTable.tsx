import { IStudentAttendancesResponse } from "../../../../models/class/AttendanceResponses";
import { formatDate } from "../../../../utils/dateUtils";
import ExportToCsvButton from "../../buttons/ExportToCsvButton";
import { exportAttendacesReport } from "../../../../utils/exportToCsv";

interface IAttendancesTableProps {
  report: IStudentAttendancesResponse[];
  fileName: string;
}

const AttendancesTable = ({ report, fileName }: IAttendancesTableProps) => {
  return (
    <div className="overflow-y-auto overflow-x-auto">
      <div className="flex justify-center">
        <ExportToCsvButton
          onExport={() => exportAttendacesReport(report, fileName)}
        />
      </div>
      <table className="min-w-full bg-white border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Student ID</th>
            <th className="px-4 py-2 border">First Name</th>
            <th className="px-4 py-2 border">Last Name</th>
            {Object.entries(report[0].attendanceDates).map(([date]) => (
              <th key={date} className="px-4 py-2 border">
                {formatDate(date)}
              </th>
            ))}
            <th className="px-4 py-2 border">Total Attendances</th>
            <th className="px-4 py-2 border">Total Lectures</th>
          </tr>
        </thead>
        <tbody>
          {report.map((student) => (
            <tr key={student.studentId}>
              <td className="px-4 py-2 text-center border">
                {student.studentId}
              </td>
              <td className="px-4 py-2 text-center border">
                {student.firstName}
              </td>
              <td className="px-4 py-2 text-center border">
                {student.lastName}
              </td>
              {Object.entries(student.attendanceDates).map(([date, value]) => (
                <td key={date} className="px-4 py-2 text-center border">
                  {value}
                </td>
              ))}
              <td className="px-4 py-2 text-center border">
                {student.totalAttendances}
              </td>
              <td className="px-4 py-2 text-center border">
                {student.totalLectures}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendancesTable;
