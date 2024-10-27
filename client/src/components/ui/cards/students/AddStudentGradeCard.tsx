import { useEffect, useState } from "react";
import { IStudentResponse } from "../../../../models/students/StudentsResponses";
import { addStudentGradeValidationRules } from "../../../../utils/validationRules";

import { CreateGradePayload } from "../../../../models/grades/GradesPayloads";
import { SubmitHandler, useForm } from "react-hook-form";
import { useClassContext } from "../../../../context/ClassContext";
import { IGradeItemResponse } from "../../../../models/grades/GradeItemsResponses";
import StyledButton from "../../buttons/StyledButton";
import { DisplayType, useDisplay } from "../../../../hooks/useDisplay";
import { useStudent } from "../../../../hooks/useStudent";
import { toast } from "react-toastify";

interface IAddStudentGradeCardProps {
  selectedStudent: IStudentResponse;
  classId: number;
}

const AddStudentGradeCard = ({
  selectedStudent,
  classId,
}: IAddStudentGradeCardProps) => {
  const { classesState } = useClassContext();
  const { classes } = classesState;
  const { addGradeToStudent } = useStudent();
  const [gradeItems, setGradeItems] = useState<IGradeItemResponse[]>([]);
  const { displayManager } = useDisplay();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<CreateGradePayload>();
  const onSubmit: SubmitHandler<CreateGradePayload> = async (data) => {
    displayManager(DisplayType.START_LOADING);
    try {
      await addGradeToStudent(data);
      toast.success("Grade was added");
    } catch (error) {
      toast.error("Grade wasn't added");
    } finally {
      displayManager(DisplayType.STOP_LOADING);
    }
  };

  useEffect(() => {
    const targetClass = classes?.find((c) => c.classId === classId);
    if (targetClass) {
      const items =
        targetClass.gradeItems?.map((gi) => ({
          gradeItemId: gi.gradeItemId,
          name: gi.name,
          weight: gi.weight * 100,
        })) || [];
      setGradeItems(items);
    }
  }, [classId, classes]);

  return (
    <div className="flex items-center justify-center text-left w-2/3 ">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md border border-gray-400 ">
        <h2 className="text-2xl font-bold mb-3 text-center">Add Grade</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Student ID
          </label>
          <input
            type="input"
            {...register("studentId", addStudentGradeValidationRules.studentId)}
            readOnly={true}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedStudent.studentId}
          />
          {errors.studentId && (
            <span className="text-red-600">
              {errors.studentId.message as string}
            </span>
          )}
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>

          <input
            type="input"
            readOnly={true}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedStudent.firstName + " " + selectedStudent.lastName}
          />
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Grade Item
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register(
              "gradeItemId",
              addStudentGradeValidationRules.gradeItemId
            )}
          >
            <option value="">Choose Grade Item</option>
            {gradeItems.map((gi) => (
              <option key={gi.gradeItemId} value={gi.gradeItemId}>
                {gi.name}
              </option>
            ))}
          </select>
          {errors.gradeItemId && (
            <span className="text-red-600">
              {errors.gradeItemId.message as string}
            </span>
          )}
          <label className="block text-sm font-medium text-gray-700">
            Score
          </label>
          <input
            type="number"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("score", addStudentGradeValidationRules.score)}
          />
          {errors.score && (
            <span className="text-red-600">
              {errors.score.message as string}
            </span>
          )}
          <StyledButton buttonType="submit" text="Submit Grade" width="100%" />
        </form>
      </div>
    </div>
  );
};

export default AddStudentGradeCard;
