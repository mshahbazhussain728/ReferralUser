import { combineClasses } from "../../../utils/utility";
import Loader from "../loadingEffect/loader";

export const BaseButton = ({ text, onClick, containerClassName, loading }) => {
  const containerClasses = combineClasses(
    "py-3 px-5 bg-primary rounded-[4.8px] text-white text-base font-medium hover:bg-white border border-primary hover:text-primary transition-all w-fit h-fit",
    containerClassName
  );
  const classes = combineClasses(
    "py-3 px-5 bg-primary rounded-[4.8px] text-white text-base font-medium hover:bg-buttonHover border border-primary hover:text-primary transition-all w-fit h-fit",
    containerClassName
  );

  return loading ? (
    <button className={`${classes} flex justify-center`}>
      <Loader height="50" width="50" radius="9" color={"#fff"} />
    </button>
  ) : (
    <button onClick={onClick} className={containerClasses}>
      {text}
    </button>
  );
};
