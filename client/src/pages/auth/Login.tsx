import { SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { loginValidationRules } from "../../utils/validationRules";
import GenericForm from "../../components/ui/cards/GenericForm";
import { LoginPayload } from "../../models/auth/AuthPayloads";
import { useDisplay, DisplayType } from "../../hooks/useDisplay";

const Login = () => {
  const { login } = useAuth();
  const { displayManager } = useDisplay();

  const onSubmit: SubmitHandler<LoginPayload> = async (data) => {
    displayManager(DisplayType.START_LOADING);
    try {
      await login(data);
      toast.success("Logined Successfully");
    } catch (error) {
      toast.error("Incorrect Email or Password!");
    } finally {
      displayManager(DisplayType.STOP_LOADING);
    }
  };

  const fields = [
    {
      name: "email",
      type: "email",
      placeholder: "user@email.com",
      validation: loginValidationRules.email,
    },
    {
      name: "password",
      type: "password",
      placeholder: "your password",
      validation: loginValidationRules.password,
    },
  ];

  return (
    <div className="flex items-center justify-center lg:h-89dvh xl:min-h-92dvh">
      <div className="w-full max-w-md bg-white p-8 border border-gray-300 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <GenericForm fields={fields} onSubmit={onSubmit} buttonText="Login" />
        <p className="text-center pt-2">
          Not registered yet?
          <Link to="/register" className="ml-1 text-blue-700">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
