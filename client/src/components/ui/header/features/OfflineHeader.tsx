import { Link } from "react-router-dom";

const OfflineHeader = () => {
  return (
    <>
      <Link to="/" className="hover:bg-blue-700 px-3 py-2 rounded">
        Login
      </Link>
      <Link to="/register" className="hover:bg-blue-700 px-3 py-2 rounded">
        Register
      </Link>
    </>
  );
};

export default OfflineHeader;
