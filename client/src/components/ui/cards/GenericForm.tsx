import { useForm, SubmitHandler, FieldValues, Path } from "react-hook-form";
import StyledButton from "../buttons/StyledButton";

interface InputField {
  name: string;
  type: string;
  placeholder?: string;
  validation: object;
}

interface GenericFormProps<T extends FieldValues> {
  fields: InputField[];
  onSubmit: SubmitHandler<T>;
  buttonText: string;
}

const GenericForm = <T extends FieldValues>({
  fields,
  onSubmit,
  buttonText,
}: GenericFormProps<T>) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<T>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field, index) => (
        <div key={index} className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            htmlFor={field.name}
          >
            {field.name.charAt(0).toUpperCase() + field.name.slice(1)}
          </label>
          <input
            id={field.name}
            type={field.type}
            placeholder={field.placeholder}
            {...register(field.name as Path<T>, field.validation)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors[field.name] && (
            <span className="text-red-600">
              {errors[field.name]?.message as string}
            </span>
          )}
        </div>
      ))}
      <StyledButton buttonType="submit" text={buttonText} width="100%" />
    </form>
  );
};

export default GenericForm;
