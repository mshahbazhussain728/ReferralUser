import { useRef, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "../../../../types/hooks";
import searchIcon from "../../../../assets/svgs/search-icon.svg";
import { ArrowIcon } from "../../../../assets/svgs/components/arrow-icon";
import { combineClasses } from "../../../../utils/utility";

export const SelectBox = ({
  id,
  options,
  value: defaultValue,
  field,
  trigger,
  svg,
  success,
  className,
  onItemChange,
  disabled,
  fieldIndex,
  isLocalCustomer,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [option, setOption] = useState(options);
  const [filteredOptions, setFilteredOptions] = useState(options);

  useEffect(() => {
    if (defaultValue) {
      field?.onChange(defaultValue);
    }
  }, [defaultValue, field]);

  useEffect(() => {
    setOption(options);
    setFilteredOptions(options);
  }, [options]);

  const search = useRef("");
  const selectBoxRef = useOutsideClick(() => setIsOpen(false));

  const selectedOptionHandler = (value) => {
    onItemChange && onItemChange(value, fieldIndex);
    setIsOpen(false);
    field?.onChange(value);
    trigger?.(field?.name);
  };

  const handleChange = (value) => {
    search.current = value;
    setFilteredOptions(
      value.trim() === ""
        ? options
        : options.filter((item) =>
            item.label.toLowerCase().includes(value.toLowerCase())
          )
    );
  };

  const selectedLabel = option.find(
    (opt) => opt.value === (field?.value || defaultValue)
  )?.label;

  const displayedOptions = isLocalCustomer
    ? [...filteredOptions].reverse()
    : filteredOptions;

  const defaultClasses = `${
    disabled ? "cursor-default" : "cursor-pointer"
  } placeholder:text-dark h-10 xMini:h-12 py-[10px] flex items-center justify-between text-left text-dark bg-white rounded-lg border border-borderColor focus:border-primary outline-none w-full ${
    success ? "pl-4 pr-10" : "pl-11 pr-4"
  }`;

  const classes = combineClasses(defaultClasses, className);

  return (
    <div id={id} ref={selectBoxRef} className="relative focus:border-primary">
      <button
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
        className={classes}
      >
        {!selectedLabel && (
          <span className="text-sm text-[#1E1E1E] font-normal truncate">
            {"Please Choose"}
          </span>
        )}
        <span className="text-sm text-[#1E1E1E] font-normal truncate">
          {selectedLabel}
        </span>
        {!disabled && <ArrowIcon isOpen={isOpen} />}
        {svg && (
          <span
            className={`mr-3 absolute left-4 ${(isOpen && "tests") || "test"}`}
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        )}
      </button>
      <AnimatePresence>
        {!disabled && isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="select_scrollbar absolute overflow-x-hidden top-[56px] max-h-[180px] h-fit overflow-scroll w-full bg-white border border-lightGray rounded-br-lg rounded-bl-lg rounded-lg z-10"
          >
            <div className="flex items-center border border-borderColor rounded-md m-2">
              <img
                src={searchIcon}
                alt="Search"
                className="ml-1 w-4 h-4 absolute"
              />
              <input
                type="text"
                value={search.current}
                onChange={(e) => handleChange(e.target.value)}
                placeholder="Search"
                className="w-full ps-6 focus:outline-primary focus:outline rounded-md p-2 placeholder:text-sm bg-[#f6f6f7]"
              />
            </div>
            {displayedOptions?.length === 0 ? (
              <p className="text-sm text-center text-[#BB060B] mb-2">
                {"No Match Data"}
              </p>
            ) : (
              displayedOptions?.map(({ value, label }) => (
                <li
                  key={value}
                  onClick={() => selectedOptionHandler(value)}
                  className="p-2 hover:bg-[#eaebec] cursor-pointer rounded-sm hoverTransetion m-2"
                >
                  {label}
                </li>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
