import { combineClasses } from "../../../utils/utility";
import { CompanyLogoLoader } from "./custom-logo-loader";

export const CustomLoader = ({ className }) => {
  const containerClassName = combineClasses(
    "flex space-x-2 justify-center items-center bg-transparent h-[300px] mt-10",
    className
  );
  return (
    <div className={containerClassName}>
      <CompanyLogoLoader />
    </div>
  );
};
