import { useEffect, useRef, useState } from "react";

import ClassesTable from "../../components/ui/tables/classes/ClassesTable";

import StyledButton from "../../components/ui/buttons/StyledButton";

import { useClass } from "../../hooks/useClass";
import { useClassContext } from "../../context/ClassContext";
import AddClassCard from "../../components/ui/cards/classes/AddClassCard";

const Classes = () => {
  const { getAllClasses } = useClass();
  const isEffectRan = useRef(false);
  const [selectedDisplay, setSelectedDisplay] = useState("");
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
      <h2 className="text-2xl font-bold mb-3 text-center">Classes</h2>
      {selectedDisplay === "" && (
        <>
          <h3 className="text-xl mb-3 text-center">My Classes</h3>
          <ClassesTable
            classes={classes}
            isEditable={true}
            toNavigate="classes"
          />
          <StyledButton
            buttonType="button"
            text="Add Classes"
            onClickButton={() => setSelectedDisplay("Add")}
            width="16.67%"
          />
        </>
      )}
      {selectedDisplay === "Add" && (
        <AddClassCard setSelectedDisplay={setSelectedDisplay} />
      )}

      {selectedDisplay !== "" && (
        <StyledButton
          buttonType="button"
          text="Return"
          onClickButton={() => setSelectedDisplay("")}
          width="25%"
          extraColor="red"
        />
      )}
    </div>
  );
};

export default Classes;
