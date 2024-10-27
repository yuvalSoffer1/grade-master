import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
const cards = [
  { title: "Classes", icon: "📚", path: "/classes" },
  { title: "Students", icon: "👩‍🎓", path: "/students" },
  { title: "Grades", icon: "📊", path: "/grades" },
  { title: "Settings", icon: "⚙️", path: "/settings" },
];

const Home = () => {
  const { state } = useAuthContext();

  return (
    <div className="container mx-auto  py-8 flex flex-col items-center xl:mt-10">
      <h1 className="text-2xl text-center font-bold mb-6">{`Welcome  ${state.firstName} ${state.lastName}`}</h1>
      <div className="grid grid-cols-4 gap-4 justify-items-center mt-6 ">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white border border-gray-300  shadow-lg rounded-lg p-10 flex flex-col items-center"
          >
            <div className="text-4xl">{card.icon}</div>
            <h2 className="text-xl font-semibold mt-4">{card.title}</h2>
            <Link
              to={card.path}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Click Me
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
