import { SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { registerValidationRules } from "../../utils/validationRules";
import GenericForm from "../../components/ui/cards/GenericForm";
import { RegisterPayload } from "../../models/auth/AuthPayloads";
import { useDisplay, DisplayType } from "../../hooks/useDisplay";

const Register = () => {
  const { registerApi } = useAuth();
  const { displayManager } = useDisplay();

  const onSubmit: SubmitHandler<RegisterPayload> = async (data) => {
    displayManager(DisplayType.START_LOADING);
    try {
      await registerApi(data);
      toast.success("Registered Successfully");
    } catch (error) {
      toast.error("Register Failed!");
    } finally {
      displayManager(DisplayType.STOP_LOADING);
    }
  };

  const fields = [
    {
      name: "firstName",
      type: "text",
      placeholder: "First Name",
      validation: registerValidationRules.firstName,
    },
    {
      name: "lastName",
      type: "text",
      placeholder: "Last Name",
      validation: registerValidationRules.lastName,
    },
    {
      name: "email",
      type: "email",
      placeholder: "user@email.com",
      validation: registerValidationRules.email,
    },
    {
      name: "password",
      type: "password",
      placeholder: "your password",
      validation: registerValidationRules.password,
    },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md bg-white p-8 border border-gray-300 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <GenericForm<RegisterPayload>
          fields={fields}
          onSubmit={onSubmit}
          buttonText="Register"
        />
        <p className="text-center mt-4">
          Already registered?
          <Link to="/" className="ml-1 text-blue-700">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
