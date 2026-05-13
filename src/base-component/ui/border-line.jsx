import { combineClasses } from "../../utils/utility";

export const BorderLine = ({ containerClassName }) => {
  const containerClasses = combineClasses(
    "bg-[#caacd5] w-[2.4px] h-full absolute -left-[35px] top-8",
    containerClassName
  );
  return <div className={containerClasses} />;
};
