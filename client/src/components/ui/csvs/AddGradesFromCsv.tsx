import React, { useState } from "react";
import { toast } from "react-toastify";
import Papa from "papaparse";
import { IGradesTable } from "../../../models/TableModels";
import GradesTable from "../tables/grades/GradesTable";
import StyledButton from "../buttons/StyledButton";
import { useStudent } from "../../../hooks/useStudent";
import { useClassContext } from "../../../context/ClassContext";
import {
  Grades,
  GradesPayload,
  ICreateGradesPayload,
} from "../../../models/grades/GradesPayloads";

interface IAddGradesFromCsvProps {
  setSelectedDisplay: () => void;
}

const AddGradesFromCsv = ({ setSelectedDisplay }: IAddGradesFromCsvProps) => {
  const [errors, setErrors] = useState<string[]>([]);
  const [gradesFromCsv, setGradesFromCsv] = useState<
    IGradesTable<{ [key: string]: number }>[] | null
  >(null);
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  const { addMultipleGradesToStudent } = useStudent();
  const { classesState } = useClassContext();

  const onSubmit = async () => {
    const gradeItemMapping = classesState.classes
      .flatMap((cls) => cls.gradeItems || [])
      .reduce((map, item) => {
        map[item.name] = item.gradeItemId;
        return map;
      }, {} as Record<string, number>);

    try {
      if (!gradesFromCsv) {
        toast.error("No grades data to submit.");
        return;
      }
      if (!checked) {
        toast.error("Checkbox isn't checked!");
        return;
      }

      const gradesPayload: Grades = gradesFromCsv.reduce((acc, student) => {
        const studentGrades: ICreateGradesPayload[] = Object.entries(
          student.gradeItemNames
        )
          .map(([name, score]) => {
            const gradeItemId = gradeItemMapping[name.toUpperCase()];
            if (gradeItemId === undefined) {
              toast.error(`GradeItemId for "${name}" not found in mapping`);
            }
            return {
              gradeItemId,
              score,
            };
          })
          .filter((grade) => grade.gradeItemId !== undefined);

        acc[student.studentId] = studentGrades;
        return acc;
      }, {} as Grades);
      const payload: GradesPayload = {
        grades: gradesPayload,
      };

      await addMultipleGradesToStudent(payload);

      toast.success("Grades were successfully submitted.");
      setSelectedDisplay();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      toast.error(errorMessage);
    }
  };

  const validationRules = {
    studentId: {
      required: "Student ID is required",
      pattern: {
        value: /^[0-9]{6}$/,
        message: "Student ID must be a numeric string of 6 digits",
      },
    },
  };

  const validateStudent = (grades: IGradesTable<{ [key: string]: number }>) => {
    const validationErrors: string[] = [];

    for (const key in validationRules) {
      if (Object.prototype.hasOwnProperty.call(validationRules, key)) {
        const rule =
          validationRules[
            key as keyof Omit<IGradesTable<any>, "gradeItemNames">
          ];
        const value =
          grades[key as keyof Omit<IGradesTable<any>, "gradeItemNames">];

        if (rule.required && !value) {
          validationErrors.push(rule.required);
        } else if (rule.pattern && !rule.pattern.value.test(value as string)) {
          validationErrors.push(rule.pattern.message);
        }
      }
    }

    // Validate grade items
    for (const gradeItemName in grades.gradeItemNames) {
      if (
        Object.prototype.hasOwnProperty.call(
          grades.gradeItemNames,
          gradeItemName
        )
      ) {
        const score = grades.gradeItemNames[gradeItemName];
        if (typeof score !== "number" || isNaN(score)) {
          validationErrors.push(`Score for ${gradeItemName} must be a number`);
        } else if (!(score >= 0 && score <= 100)) {
          validationErrors.push(
            `Score for ${gradeItemName} must be between 0 and 100`
          );
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
            return item.studentId?.trim();
          });

          const data = validData.map((item: any) => {
            const { studentId, ...gradeItemNames } = item;
            const numericGradeItemNames = Object.fromEntries(
              Object.entries(gradeItemNames).map(([key, value]) => [
                key,
                Number(value),
              ])
            );
            return {
              studentId,
              gradeItemNames: numericGradeItemNames,
            };
          }) as IGradesTable<{ [key: string]: number }>[];

          const errors: string[] = [];
          data.forEach((student) => {
            const studentErrors = validateStudent(student);
            if (studentErrors.length > 0) {
              errors.push(...studentErrors);
            }
          });

          if (errors.length > 0) {
            setErrors(errors);
          } else {
            setErrors([]);
            setGradesFromCsv(data);
          }
        },
      });
    }
  };

  return (
    <div className="flex flex-col items-center text-center">
      <h2 className="text-2xl font-bold mb-6 text-center">Grades From Csv</h2>
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
      {gradesFromCsv && gradesFromCsv?.length > 0 && (
        <>
          <GradesTable data={gradesFromCsv} />
          {!errors.length && (
            <>
              <div className="flex items-center mt-4">
                <input
                  id="checkbox"
                  type="checkbox"
                  checked={checked}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="checkbox"
                  className="ml-2 text-sm font-medium text-gray-900"
                >
                  In case of duplicates the csv will override the current
                  grades!
                </label>
              </div>
              <StyledButton
                buttonType="button"
                text="Submit"
                width="30%"
                onClickButton={onSubmit}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default AddGradesFromCsv;
