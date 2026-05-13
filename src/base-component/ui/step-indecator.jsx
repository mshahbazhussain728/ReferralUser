import { combineClasses } from "../../utils/utility";

export const StepIndecator = ({ heading, containerClassName }) => {
  const containerClasses = combineClasses(
    "min-h-[31.2px] min-w-[31.2px] flex items-center justify-center rounded-full bg-primary text-white w-fit",
    containerClassName
  );
  return <div className={containerClasses}>{heading}</div>;
};
