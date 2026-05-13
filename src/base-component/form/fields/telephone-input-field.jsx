import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { combineClasses } from "../../../utils/utility";
import { Controller } from "react-hook-form";
import { CallIcon } from "../../../assets/svgs/components/call-icon";
import { useRef, useEffect, useState } from "react";

export const TelephoneInputField = ({
  country = "us",
  name,
  control,
  value,
  disabled,
  className,
}) => {
  const wrapperRef = useRef(null);
  const wasJustFocused = useRef(false);
  const [selectedCountry, setSelectedCountry] = useState(country);

  const classes = combineClasses(
    "!w-full !h-[48px] !pl-[50px] !pr-[50px] !border-0 !rounded-[5px] !text-gray-500 !text-[16px]",
    className
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      if (wrapperRef.current) {
        const input = wrapperRef.current.querySelector("input[type='tel']");
        if (input) input.focus();
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [selectedCountry]);

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={value}
      render={({ field: { onChange } }) => (
        <div className="relative w-full" ref={wrapperRef}>
          <PhoneInput
            country={country}
            onChange={(value, countryData) => {
              setSelectedCountry(countryData?.countryCode);
              const numberWithPlus = "+" + value;
              onChange(numberWithPlus);
            }}
            countryCodeEditable={false}
            enableAreaCodeStretch={false}
            inputProps={{
              name,
              onFocus: () => {
                wasJustFocused.current = true;
                setTimeout(() => {
                  wasJustFocused.current = false;
                }, 100);
              },
              onSelect: (e) => {
                if (!wasJustFocused.current) {
                  e.target.setSelectionRange(
                    e.target.value.length,
                    e.target.value.length
                  );
                }
              },
              onMouseDown: (e) => {
                if (e.detail > 1) e.preventDefault();
              },
            }}
            placeholder="+1 - _ _ __"
            value={value}
            containerClass="!border !rounded-[5px] !border-[#cccccc] focus-within:!border-primary"
            inputClass={`${classes}`}
            buttonClass="custom-flag-dropdown"
            disabled={disabled}
            inputStyle={{
              userSelect: "none",
              WebkitUserSelect: "none",
              MozUserSelect: "none",
              msUserSelect: "none",
            }}
          />
          <CallIcon iconClassName="absolute top-1/4 right-[18px]" />
        </div>
      )}
    />
  );
};
