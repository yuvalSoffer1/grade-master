import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "../context/AuthContext";
import { StudentProvider } from "../context/StudentContext";
import { DisplayProvider } from "../context/DisplayContext";
import { ClassProvider } from "../context/ClassContext";

interface IAppProvidersProps {
  children: JSX.Element;
}

export const AppProviders = ({ children }: IAppProvidersProps) => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <StudentProvider>
          <ClassProvider>
            <DisplayProvider>
              {children}
              <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
            </DisplayProvider>
          </ClassProvider>
        </StudentProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};
