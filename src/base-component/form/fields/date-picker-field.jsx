import { useState } from "react";
import { combineClasses } from "../../../utils/utility";
import { formatDateString } from "../../../utils/function";
import { WatchIcon } from "../../../assets/svgs/components/watch-icon";

export const DatePicker = ({
  id,
  name,
  register,
  value,
  className,
  remove,
  svg,
  success,
  onRemove,
  dateType,
  min,
  max,
  disable,
}) => {
  const [inputFocus, setInputFocus] = useState(false);
  const defaultClasses = `w-full rounded-lg max-h-12 ${
    success ? "pl-4 pr-10" : "pl-11 pr-4"
  } py-[10px] outline-none text-dark text-sm focus:border-primary`;

  const classes = combineClasses(defaultClasses, className);

  return (
    <div className="relative w-full flex items-center">
      {remove && (
        <div
          className="cursor-pointer -top-[28px] md:-top-8 absolute right-2 bg-red px-1 text-sm md:px-3 py-[2px] md:py-1 mt-1 text-white rounded-t-md"
          onClick={onRemove}
        >
          {remove}
        </div>
      )}

      {svg && (
        <span
          className={`mr-3 absolute left-4 z-50 ${
            inputFocus ? "tests" : "test"
          }`}
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      )}

      <div className="w-full relative">
        <div className="flex border border-borderColor rounded-lg items-center">
          <input
            type={dateType}
            defaultValue={value ? formatDateString(value) : ""}
            id={id}
            onBlur={() => setInputFocus(false)}
            onFocus={() => setInputFocus(true)}
            {...(register ? register(name) : {})}
            min={min}
            max={max}
            disabled={disable}
            className={`${classes} relative`}
          />
          {dateType === "time" ? (
            <div
              className="absolute right-4 cursor-pointer"
              onClick={() => document.getElementById(id)?.focus()}
            >
              <WatchIcon />
            </div>
          ) : (
            <div
              className={`absolute right-4 ${
                disable ? "cursor-default" : "cursor-pointer"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M12.8516 2.12109H11.3516V1.37109C11.3516 1.17218 11.2725 0.981416 11.1319 0.840764C10.9912 0.700111 10.8005 0.621094 10.6016 0.621094C10.4026 0.621094 10.2119 0.700111 10.0712 0.840764C9.93058 0.981416 9.85156 1.17218 9.85156 1.37109V2.12109H5.35156V1.37109C5.35156 1.17218 5.27254 0.981416 5.13189 0.840764C4.99124 0.700111 4.80047 0.621094 4.60156 0.621094C4.40265 0.621094 4.21188 0.700111 4.07123 0.840764C3.93058 0.981416 3.85156 1.17218 3.85156 1.37109V2.12109H2.35156C1.75483 2.12109 1.18253 2.35815 0.760572 2.7801C0.338615 3.20206 0.101563 3.77436 0.101562 4.37109V13.3711C0.101563 13.9678 0.338615 14.5401 0.760572 14.9621C1.18253 15.384 1.75483 15.6211 2.35156 15.6211H12.8516C13.4483 15.6211 14.0206 15.384 14.4426 14.9621C14.8645 14.5401 15.1016 13.9678 15.1016 13.3711V4.37109C15.1016 3.77436 14.8645 3.20206 14.4426 2.7801C14.0206 2.35815 13.4483 2.12109 12.8516 2.12109ZM13.6016 13.3711C13.6016 13.57 13.5225 13.7608 13.3819 13.9014C13.2412 14.0421 13.0505 14.1211 12.8516 14.1211H2.35156C2.15265 14.1211 1.96188 14.0421 1.82123 13.9014C1.68058 13.7608 1.60156 13.57 1.60156 13.3711V8.12109H13.6016V13.3711Z"
                  fill="#4A13E7"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
