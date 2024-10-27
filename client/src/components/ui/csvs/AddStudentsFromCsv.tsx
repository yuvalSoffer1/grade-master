import React, { useState } from "react";
import Papa from "papaparse";
import StudentsTable from "../tables/students/StudentsTable";
import StyledButton from "../buttons/StyledButton";
import { IStudentTable } from "../../../models/TableModels";
import { CreateStudentPayload } from "../../../models/students/StudentsPayloads";
import { useStudent } from "../../../hooks/useStudent";
import { toast } from "react-toastify";

interface IAddStudentsFromCsvProps {
  setSelectedDisplay: (value: string) => void;
}

const AddStudentsFromCsv = ({
  setSelectedDisplay,
}: IAddStudentsFromCsvProps) => {
  const [studentsFromCsv, setStudentsFromCsv] = useState<IStudentTable[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const { createStudentsFromCsv } = useStudent();

  const onSubmit = async () => {
    if (errors.length) {
      toast.error("Data is invalid!");
      return;
    }
    try {
      const studentsToCreate: CreateStudentPayload[] =
        studentsFromCsv as CreateStudentPayload[];
      await createStudentsFromCsv(studentsToCreate);
      toast.success("Students were created");
      setSelectedDisplay("");
    } catch (error) {
      toast.error("Students already exist!");
    }
  };

  type ValidationRule = {
    required?: string;
    pattern?: {
      value: RegExp;
      message: string;
    };
  };

  type ValidationRules = {
    [key in keyof IStudentTable]: ValidationRule;
  };

  const validationRules: ValidationRules = {
    studentId: {
      required: "Student ID is required",
      pattern: {
        value: /^[0-9]{6}$/,
        message: "Student ID must be a numeric string of 6 digits",
      },
    },
    firstName: {
      required: "First Name is required",
    },
    lastName: {
      required: "Last Name is required",
    },
    prefixPhoneNumber: {
      pattern: {
        value: /^0\d{1,2}$/,
        message:
          "Prefix must be numeric, start with 0, and be 2 to 3 digits long",
      },
    },
    phoneNumber: {
      pattern: {
        value: /^\d{7}$/,
        message: "Phone number must be exactly 7 digits",
      },
    },
  };
  const validateStudent = (student: IStudentTable) => {
    const validationErrors: string[] = [];

    for (const key in validationRules) {
      if (Object.prototype.hasOwnProperty.call(validationRules, key)) {
        const rule = validationRules[key as keyof IStudentTable];
        const value = student[key as keyof IStudentTable];

        if (rule.required && !value) {
          validationErrors.push(rule.required);
        } else if (rule.pattern && !rule.pattern.value.test(value as string)) {
          validationErrors.push(rule.pattern.message);
        }
      }
    }

    return validationErrors;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        dynamicTyping: false,
        complete: (results) => {
          const validData = results.data.filter((item: any) => {
            // Check if the row is not empty and has required fields
            return (
              item.studentId?.trim() ||
              item.firstName?.trim() ||
              item.lastName?.trim()
            );
          });

          const data = validData.map((item: any) => ({
            studentId: item.studentId,
            firstName: item.firstName,
            lastName: item.lastName,
            prefixPhoneNumber: item.prefixPhoneNumber || "",
            phoneNumber: +item.phoneNumber || "",
          })) as IStudentTable[];
          setStudentsFromCsv(data);
          // Validate data
          const errors: string[] = [];

          data.forEach((student) => {
            const studentErrors = validateStudent(student);
            if (studentErrors.length > 0) {
              errors.push(...studentErrors);
            }
          });

          setErrors(errors);
        },
      });
    }
  };

  return (
    <div className="flex flex-col items-center text-center">
      <h2 className="text-2xl font-bold mb-6 text-center">Students From Csv</h2>
      <input
        type="file"
        accept=".csv, .xlsx, .xls"
        onChange={handleFileChange}
      />
      {errors.length > 0 && (
        <div className="text-red-500">
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      <StudentsTable students={studentsFromCsv} isEditable={false} />
      <StyledButton
        buttonType="button"
        text="Submit"
        onClickButton={onSubmit}
        width="33.34%"
      />
    </div>
  );
};

export default AddStudentsFromCsv;
