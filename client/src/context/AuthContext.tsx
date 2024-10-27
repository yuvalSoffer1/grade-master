import React, { createContext, useReducer, useContext, Dispatch } from "react";
import { ILoginResponse } from "../models/auth/LoginResponse";
const currentUserJson = localStorage.getItem("currentUser");
const currentUser: ILoginResponse | null = currentUserJson
  ? JSON.parse(currentUserJson)
  : null;

type AuthAction =
  | { type: "LOGIN_SUCCESS"; payload: ILoginResponse }
  | { type: "LOGOUT" };

interface AuthState {
  firstName: string;
  lastName: string;
}

const initialState: AuthState = {
  firstName: currentUser ? currentUser.firstName : "",
  lastName: currentUser ? currentUser.lastName : "",
};

const AuthContext = createContext<
  | {
      state: AuthState;
      dispatch: Dispatch<AuthAction>;
    }
  | undefined
>(undefined);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
      return {
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
      };

    case "LOGOUT":
      return {
        firstName: "",
        lastName: "",
      };

    default:
      return state;
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }

  return context;
};
