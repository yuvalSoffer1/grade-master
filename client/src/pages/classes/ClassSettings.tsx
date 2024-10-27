import { useClassContext } from "../../context/ClassContext";
import { useParams } from "react-router-dom";
import ClassSettingsTable from "../../components/ui/tables/classes/ClassSettingsTable";
import { useState } from "react";
import AddGradeItem from "../../components/ui/cards/classes/AddGradeItem";
import StyledButton from "../../components/ui/buttons/StyledButton";
import EditGradeItems from "../../components/ui/cards/classes/EditGradeItems";

const ClassSettings = () => {
  const [selectedDisplay, setSelectedDisplay] = useState("");
  const { classId } = useParams();
  const { classesState } = useClassContext();
  const id = classId ? parseInt(classId) : undefined;

  const selectedClass = id
    ? classesState.classes.find((c) => c.classId === id)
    : undefined;
  return (
    <div className="flex flex-col items-center mt-8 lg:h-89dvh xl:min-h-92dvh xl:mt-[4%]">
      <div className=" flex flex-row justify-between items-center">
        <h2 className="text-2xl font-bold text-center">
          {`${selectedClass?.className}${selectedClass?.groupId}`}
        </h2>
      </div>
      {selectedDisplay === "" &&
        selectedClass?.gradeItems &&
        selectedClass.gradeItems.length > 0 && (
          <>
            <ClassSettingsTable
              gradeItems={selectedClass?.gradeItems}
              isEditable={true}
              classId={id}
            />
            <div className="flex flex-row justify-between mt-8 h-20">
              <StyledButton
                onClickButton={() => setSelectedDisplay("ADD")}
                buttonType="button"
                text="Add Grade Item"
                width="40%"
              />
              <StyledButton
                onClickButton={() => setSelectedDisplay("EDIT")}
                buttonType="button"
                text="Edit Grade Items"
                width="40%"
              />
            </div>
          </>
        )}
      {selectedDisplay === "ADD" && id && (
        <AddGradeItem
          setSelectedDisplay={() => setSelectedDisplay("")}
          classId={id}
        />
      )}
      {selectedDisplay === "EDIT" && id && (
        <EditGradeItems
          setSelectedDisplay={() => setSelectedDisplay("")}
          classId={id}
        />
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

export default ClassSettings;
