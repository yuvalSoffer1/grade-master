import { Link } from "react-router-dom";

import OfflineHeader from "./features/OfflineHeader";
import OnlineHeader from "./features/OnlineHeader";
import { useAuthContext } from "../../../context/AuthContext";

const Header = () => {
  const { state } = useAuthContext();
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="flex justify-between items-center max-w-screen-xl mx-auto">
        <Link to="/" className="text-2xl font-bold">
          Grades Management
        </Link>

        <nav className=" space-x-4">
          {state.firstName !== "" ? <OnlineHeader /> : <OfflineHeader />}
        </nav>
      </div>
    </header>
  );
};

export default Header;
