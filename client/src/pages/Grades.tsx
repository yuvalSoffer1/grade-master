import { useEffect, useRef } from "react";
import { useClass } from "../hooks/useClass";
import { useClassContext } from "../context/ClassContext";
import ClassesTable from "../components/ui/tables/classes/ClassesTable";

const Grades = () => {
  const { getAllClasses } = useClass();
  const isEffectRan = useRef(false);
  const { classesState } = useClassContext();
  const { classes } = classesState;

  const getAllClassesAsync = async () => {
    try {
      await getAllClasses();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(
    () => {
      if (!isEffectRan.current) {
        getAllClassesAsync();
      }
      return () => {
        isEffectRan.current = true;
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <div className=" flex flex-col items-center text-center mt-8 xl:mt-[4%]">
      <h2 className="text-2xl font-bold mb-3 text-center">Grades</h2>

      <h3 className="text-xl mb-3 text-center">My Classes</h3>
      <ClassesTable classes={classes} isEditable={false} toNavigate="grades" />
    </div>
  );
};

export default Grades;
