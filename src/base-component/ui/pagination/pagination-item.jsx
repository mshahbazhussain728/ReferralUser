import React from "react";
import { combineClasses } from "../../../utils/utility";

export const PaginationItem = React.memo(
  ({ handlePageClick, icon, className, disabled }) => {
    const defaultClasses =
      "w-10 h-10 rounded-full text-gray font-semibold bg-white mb-7 border border-[#E0E0E0]";
    const buttonClasses = combineClasses(defaultClasses, className);

    return (
      <button
        onClick={handlePageClick}
        className={buttonClasses}
        disabled={disabled}
      >
        {icon}
      </button>
    );
  }
);
