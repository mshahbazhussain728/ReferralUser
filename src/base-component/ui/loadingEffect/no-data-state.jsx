import React from "react";
import { combineClasses } from "../../../utils/utility";
import emptyDataIcon from "../../../assets/pngs/empty_state_icon.png";
import { Button } from "../button/button";

export function NoDataEmptyState({
  className,
  containerClassName,
  imgClassName,
  textClassName,
  heading = "No Data Available",
  isButton,
  onButtonClick,
  buttonHeading = "Click Here",
}) {
  const defaultClasses = combineClasses(
    `py-10 px-6 bg-[#E5EFFF] rounded-3xl w-fit`,
    className
  );

  const containerClasses = combineClasses(
    "xMini:bg-white xMini:px-6",
    containerClassName
  );

  const imgClasses = combineClasses("w-fit h-fit", imgClassName);
  const textClasses = combineClasses(
    "text-[#222B45] font-normal text-2xl",
    textClassName
  );

  return (
    <div className={containerClasses}>
      <div className={defaultClasses}>
        <div className="flex flex-col gap-y-4 items-center">
          <img src={emptyDataIcon} alt="empty state" className={imgClasses} />
          <h1 className={textClasses}>{heading}</h1>

          {isButton && (
            <Button
              inputType="button"
              onClick={onButtonClick}
              className="!h-fit py-2 px-3 flex items-center text-sm font-medium xMini:font-semibold bg-primary text-white rounded-md whitespace-nowrap w-fit"
              text={buttonHeading}
              id="submit-reports"
              iconAlt="submit-reports"
            />
          )}
        </div>
      </div>
    </div>
  );
}
