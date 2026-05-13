export const SwitchButton = ({ text, isActive, onClick }) => {
  return (
    <span
      className={`cursor-pointer text-base font-medium pb-2 border-b-2  ${
        isActive
          ? "text-black border-b-[#055860]"
          : "text-[#BDBDBD] border-b-transparent"
      }`}
      onClick={onClick}
    >
      {text}
    </span>
  );
};
