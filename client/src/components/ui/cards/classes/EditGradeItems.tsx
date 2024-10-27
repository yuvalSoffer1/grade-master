import { useEffect, useState } from "react";
import { useClass } from "../../../../hooks/useClass";
import { useForm, SubmitHandler } from "react-hook-form";
import { useClassContext } from "../../../../context/ClassContext";
import { toast } from "react-toastify";
import { DisplayType, useDisplay } from "../../../../hooks/useDisplay";
import { UpdateGradeItemsPayload } from "../../../../models/grades/GradeItemsPayloads";
import { IGradeItemResponse } from "../../../../models/grades/GradeItemsResponses";

interface IEditGradeItemsProps {
  setSelectedDisplay: (value: string) => void;
  classId: number;
}

const EditGradeItems = ({
  setSelectedDisplay,
  classId,
}: IEditGradeItemsProps) => {
  const { updateGradeItems } = useClass();
  const { classesState } = useClassContext();
  const { classes } = classesState;
  const { displayManager } = useDisplay();
  const [gradeItems, setGradeItems] = useState<IGradeItemResponse[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UpdateGradeItemsPayload>();

  useEffect(() => {
    const targetClass = classes?.find((c) => c.classId === classId);
    if (targetClass) {
      const items =
        targetClass.gradeItems?.map((gi) => ({
          gradeItemId: gi.gradeItemId,
          name: gi.name,
          weight: gi.weight * 100, // Convert to percentage
        })) || [];
      setGradeItems(items);

      // Initialize form fields
      items.forEach((item, index) => {
        setValue(`gradeItemDtos.${index}.gradeItemId`, item.gradeItemId);
        setValue(`gradeItemDtos.${index}.weight`, item.weight);
      });
    }
  }, [classes, classId, setValue]);

  const onSubmit: SubmitHandler<UpdateGradeItemsPayload> = async (data) => {
    displayManager(DisplayType.START_LOADING);
    try {
      const totalWeight = data.gradeItemDtos.reduce(
        (sum, gi) => sum + gi.weight / 100,
        0
      );

      if (totalWeight > 1) {
        toast.error(
          "The total weight of grade items for this class exceeds 100 percent."
        );
        return;
      }

      await updateGradeItems(classId, data);
      toast.success("Grade Items were updated successfully.");
      setSelectedDisplay("");
    } catch (error) {
      toast.error("Grade Items couldn't be updated!");
    } finally {
      displayManager(DisplayType.STOP_LOADING);
    }
  };

  return (
    <div className="flex items-center justify-center text-left w-2/3">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md border border-gray-400">
        <h2 className="text-2xl font-bold mb-3 text-center">
          Edit Grade Items
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {gradeItems.map((item, index) => (
            <div key={item.gradeItemId} className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Grade Item: {item.name}
              </label>
              <input
                type="hidden"
                {...register(`gradeItemDtos.${index}.gradeItemId`)}
                value={item.gradeItemId}
              />
              <input
                type="number"
                placeholder="Weight in Percent"
                {...register(`gradeItemDtos.${index}.weight`, {
                  required: true,
                  min: 0,
                  max: 100,
                })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              />
              {errors.gradeItemDtos && errors.gradeItemDtos[index]?.weight && (
                <span className="text-red-500 text-xs">
                  Weight must be between 0 and 100
                </span>
              )}
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditGradeItems;
