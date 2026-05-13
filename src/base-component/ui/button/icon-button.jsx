import { combineClasses } from "../../../utils/utility";

export const IconButton = ({
  text,
  onClick,
  icon: Icon,
  containerClassName,
  iconClassName = "#691188",
}) => {
  const containerClasses = combineClasses(
    "flex items-center gap-x-[5px] md:gap-x-[10px] py-2 px-3 bg-white rounded-lg text-primary w-fit text-xs md:text-lg font-semibold",
    containerClassName
  );

  return (
    <button onClick={onClick} className={containerClasses}>
      {Icon && <Icon iconClassName={iconClassName} />} {text}
    </button>
  );
};
