import Papa from "papaparse";
import { IStudentResponse } from "../models/students/StudentsResponses";
import { IStudentAttendancesResponse } from "../models/class/AttendanceResponses";
import { formatDate } from "./dateUtils";
import { IFinalGradeResponse } from "../models/grades/FinalGradesResponses";

export const exportStudentsList = (
  data: IStudentResponse[],
  filename: string
) => {
  if (data.length === 0) return;
  const headers = [
    "Student ID",
    "First Name",
    "Last Name",
    "Phone Number",
  ].reverse();
  const formattedData = formattedDataStudent(data);

  const csvData = formattedData.map((student) => {
    return [
      student.studentId,
      student.firstName,
      student.lastName,
      student.phoneNumber,
    ].reverse();
  });
  csvData.unshift(headers);

  const csvString = Papa.unparse(csvData);
  fileDownloader(csvString, filename);
};

export const exportAttendacesReport = (
  report: IStudentAttendancesResponse[],
  filename: string
) => {
  if (report.length === 0) return;
  const headers = [
    "Student ID",
    "First Name",
    "Last Name",
    ...Object.keys(report[0].attendanceDates).map((date) => formatDate(date)),
    "Total Attendances",
    "Total Lectures",
  ].reverse();

  // Prepare the CSV data
  const csvData = report.map((student) => {
    return [
      student.studentId,
      student.firstName,
      student.lastName,
      ...Object.values(student.attendanceDates),
      student.totalAttendances,
      student.totalLectures,
    ].reverse();
  });
  csvData.unshift(headers);
  const csvString = Papa.unparse(csvData);
  fileDownloader(csvString, filename);
};

const formattedDataStudent = (data: IStudentResponse[]) => {
  return data.map((student) => ({
    ...student,
    phoneNumber: `'${student.phoneNumber}'`,
  }));
};

export const exportFinalGradesReport = (
  data: IFinalGradeResponse,
  filename: string
) => {
  if (data.students.length === 0) return;
  const csvData = [];
  const headers = [
    "Student ID",
    "Student Name",
    ...data.students[0].grades.map(
      (grade) => `${grade.name} (${grade.weight * 100}%)`
    ),
    "Final Grade",
  ].reverse();
  csvData.push(headers);

  // Loop through each student and add their data
  data.students.forEach((student) => {
    const row = [
      student.studentId,
      student.studentName,
      ...student.grades.map((grade) => grade.score),
      student.finalGrade,
    ].reverse();
    csvData.push(row);
  });

  // Add class average as the last row
  const classAverageRow = [
    "", // Empty for Student ID
    "Class Average",
    ...new Array(data.students[0].grades.length).fill(""), // Empty cells for grades
    data.classAverage,
  ].reverse();
  csvData.push(classAverageRow);

  // Convert to CSV string
  const csvString = Papa.unparse(csvData);
  fileDownloader(csvString, filename);
};

const fileDownloader = (csvData: string, fileName: string) => {
  const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute("download", fileName);
  link.style.visibility = "hidden";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
