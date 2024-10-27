import { useAuth } from "../../../../hooks/useAuth";
import { Link } from "react-router-dom";

const OnlineHeader = () => {
  const { logout } = useAuth();
  return (
    <>
      <Link to="/classes" className="hover:bg-blue-700 px-3 py-2 rounded">
        Classes
      </Link>
      <Link to="/students" className="hover:bg-blue-700 px-3 py-2 rounded">
        Students
      </Link>
      <Link to="/grades" className="hover:bg-blue-700 px-3 py-2 rounded">
        Grades
      </Link>
      <Link to="/settings" className="hover:bg-blue-700 px-3 py-2 rounded">
        Settings
      </Link>
      <button
        onClick={logout}
        className="bg-red-500 hover:bg-red-700 px-3 py-2 rounded"
      >
        Logout
      </button>
    </>
  );
};

export default OnlineHeader;
