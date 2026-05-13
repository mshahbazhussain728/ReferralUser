import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import searchIcon from "../../../assets/svgs/search-icon.svg";
import { FilterSortIcon } from "../../../assets/svgs/components/filter-sort-icon";
import { useOutsideClick } from "../../../types/hooks";

export default function SelectField({
  label,
  options,
  handleChange,
  value,
  dropDownIconClassName,
  containerClassName,
  isSearch,
  labelClassName,
  dropdownClassName,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState(value || "");

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const hanldeClose = () => {
    setIsOpen(false);
  };

  const ref = useOutsideClick(hanldeClose);

  const handleItemSelected = (label, selectedValue) => {
    setSelectedLabel(label);
    handleChange(selectedValue);
    setIsOpen(false);
  };

  useEffect(() => {
    const newLabel = options?.find((item) => item?.value === value);

    setSelectedLabel(newLabel?.label || "Sort by");
  }, [value, options]);

  return (
    <div
      className={`relative flex items-center justify-end ${containerClassName}`}
      ref={ref}
    >
      <div
        onClick={handleToggle}
        className="flex items-center gap-x-2 cursor-pointer"
      >
        <span className="text-base font-semibold text-primary">Sort by</span>
        <FilterSortIcon
          isOpen={isOpen}
          className={`${dropDownIconClassName}`}
        />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`bg-white min-w-[200px] flex-col absolute top-[35px] rounded-b-lg rounded-tl-lg right-0 p-2 shadow-lg z-10 follow-up-container ${dropdownClassName}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {isSearch && (
              <div className="flex items-center border border-lightGray rounded-md w-full bg-[#f6f6f7]">
                <img
                  src={searchIcon}
                  alt="Search Icon"
                  className="ml-1 w-4 h-4 absolute"
                  width={24}
                  height={8}
                />
                <input
                  placeholder="Search"
                  className="w-full ps-6 focus:outline-primary focus:outline rounded-md p-1 placeholder:text-sm bg-[#f6f6f7]"
                />
              </div>
            )}
            <div
              className="mt-2 overflow-x-hidden overflow-y-auto"
              id="dropdownSearchBar"
            >
              <div className="flex-col space-y-2">
                {options?.map(({ label, value }, idx) => {
                  const isSelected = selectedLabel === label;

                  return (
                    <div
                      className={`flex justify-center px-2 py-1 cursor-pointer mr-1 hoverTransetion rounded-md ${
                        isSelected
                          ? "bg-primary text-white hover:bg-buttonHover"
                          : "bg-white hover:bg-[#eaebec]"
                      }`}
                      key={idx}
                      onClick={() => handleItemSelected(label, value)}
                    >
                      <span>{label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}




