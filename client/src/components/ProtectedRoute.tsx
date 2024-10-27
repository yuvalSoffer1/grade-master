import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = Cookies.get("jwt_token");

  if (!token) {
    return <Navigate to="/" />;
  } else {
    return <>{children}</>;
  }
};

export default ProtectedRoute;
