import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { dotnetApi } from "../api/apiConfig";
import { axiosErrorExtractor } from "../utils/axiosErrorUtils";
import { RegisterPayload, LoginPayload } from "../models/auth/AuthPayloads";
import { useAuthContext } from "../context/AuthContext";
import { ILoginResponse } from "../models/auth/LoginResponse";

export const useAuth = () => {
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();

  const registerApi = async (userDetails: RegisterPayload) => {
    try {
      await dotnetApi.post("auth/register", userDetails);
      navigate("/");
    } catch (error: unknown) {
      const err = axiosErrorExtractor(error);

      throw new Error(err);
    }
  };

  const login = async (userCredentials: LoginPayload) => {
    try {
      const res = await dotnetApi.post("auth/login", userCredentials);
      const data: ILoginResponse = res.data;
      dispatch({ type: "LOGIN_SUCCESS", payload: data });
      navigate("/home");
    } catch (error: unknown) {
      const err = axiosErrorExtractor(error);

      throw new Error(err);
    }
  };

  const logout = () => {
    Cookies.remove("jwt_token");
    dispatch({ type: "LOGOUT" });
    localStorage.clear();
    navigate("/");
  };

  return { registerApi, login, logout };
};
