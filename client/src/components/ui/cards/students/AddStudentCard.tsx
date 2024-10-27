import { toast } from "react-toastify";
import { useStudent } from "../../../../hooks/useStudent";
import { addStudentValidationRules } from "../../../../utils/validationRules";
import GenericForm from "../../../../components/ui/cards/GenericForm";
import { CreateStudentPayload } from "../../../../models/students/StudentsPayloads";
import { useDisplay, DisplayType } from "../../../../hooks/useDisplay";

interface IAddStudentCardProps {
  setSelectedDisplay: (value: string) => void;
}

const AddStudentCard = ({ setSelectedDisplay }: IAddStudentCardProps) => {
  const { createStudent } = useStudent();

  const { displayManager } = useDisplay();

  const onSubmit = async (data: CreateStudentPayload) => {
    displayManager(DisplayType.START_LOADING);
    try {
      await createStudent(data);
      toast.success("Student was created");
      setSelectedDisplay("");
    } catch (error) {
      toast.error("Student wasn't created!");
    } finally {
      displayManager(DisplayType.STOP_LOADING);
    }
  };

  const fields = [
    {
      name: "studentId",
      type: "text",
      placeholder: "123456",
      validation: addStudentValidationRules.studentId,
    },
    {
      name: "firstName",
      type: "text",
      placeholder: "First Name",
      validation: addStudentValidationRules.firstName,
    },
    {
      name: "lastName",
      type: "text",
      placeholder: "Last Name",
      validation: addStudentValidationRules.lastName,
    },
    {
      name: "prefixPhoneNumber",
      type: "text",
      placeholder: "052",
      validation: addStudentValidationRules.prefixPhoneNumber,
    },
    {
      name: "phoneNumber",
      type: "text",
      placeholder: "3456789",
      validation: addStudentValidationRules.phoneNumber,
    },
  ];

  return (
    <div className="flex items-center justify-center text-left w-2/3 ">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md border border-gray-400 ">
        <h2 className="text-2xl font-bold mb-3 text-center">Add Student</h2>
        <GenericForm fields={fields} onSubmit={onSubmit} buttonText="Add" />
      </div>
    </div>
  );
};

export default AddStudentCard;
