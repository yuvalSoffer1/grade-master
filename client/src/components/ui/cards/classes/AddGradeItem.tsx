import { useClass } from "../../../../hooks/useClass";
import { CreateGradeItemPayload } from "../../../../models/grades/GradeItemsPayloads";
import { DisplayType, useDisplay } from "../../../../hooks/useDisplay";
import { SubmitHandler } from "react-hook-form";
import { useClassContext } from "../../../../context/ClassContext";
import { toast } from "react-toastify";
import GenericForm from "../GenericForm";
import { addGradeItemValidationRules } from "../../../../utils/validationRules";
interface IAddGradeItemCardProps {
  setSelectedDisplay: (value: string) => void;
  classId: number;
}

const AddGradeItem = ({
  setSelectedDisplay,
  classId,
}: IAddGradeItemCardProps) => {
  const { createGradeItem } = useClass();
  const { classesState } = useClassContext();
  const { classes } = classesState;
  const { displayManager } = useDisplay();

  const onSubmit: SubmitHandler<CreateGradeItemPayload> = async (data) => {
    displayManager(DisplayType.START_LOADING);
    try {
      const targetClass = classes?.find((c) => c.classId === classId);
      const gradeItemExists = targetClass?.gradeItems?.some(
        (gi) => gi.name.toUpperCase() === data.name.toUpperCase()
      );

      if (gradeItemExists) {
        toast.error(
          "A grade item with the same name already exists in this class."
        );
        return;
      }
      const totalWeight =
        targetClass?.gradeItems?.reduce((sum, gi) => sum + gi.weight, 0) ?? 0;
      const weightInDecimal = data.weight / 100;

      if (totalWeight + weightInDecimal > 1) {
        toast.error(
          "The total weight of grade items for this class exceeds 100 precents."
        );
        return;
      }
      await createGradeItem(classId, data);
      toast.success("Grade Item was added to the class");
      setSelectedDisplay("");
    } catch (error) {
      toast.error("Grade Item wasn't added!");
    } finally {
      displayManager(DisplayType.STOP_LOADING);
    }
  };

  const fields = [
    {
      name: "name",
      type: "text",
      placeholder: "Grade Item Name",
      validation: addGradeItemValidationRules.name,
    },
    {
      name: "weight",
      type: "number",
      placeholder: "Weight in Precents",
      validation: addGradeItemValidationRules.weight,
    },
  ];

  return (
    <div className="flex items-center justify-center text-left w-2/3 ">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md border border-gray-400 ">
        <h2 className="text-2xl font-bold mb-3 text-center">Add grade item</h2>
        <GenericForm fields={fields} onSubmit={onSubmit} buttonText="Add" />
      </div>
    </div>
  );
};

export default AddGradeItem;
