interface IStyledButtonProps {
  onClickButton?: () => void;
  width: string;
  text: string;
  buttonType: "submit" | "reset" | "button";
  extraColor?: string;
}

const StyledButton = ({
  onClickButton,
  width,
  text,
  buttonType,
  extraColor,
}: IStyledButtonProps) => {
  return (
    <button
      type={buttonType}
      className=" px-4 py-2 mt-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      style={{ width: width, background: extraColor }}
      onClick={onClickButton}
    >
      {text}
    </button>
  );
};

export default StyledButton;
