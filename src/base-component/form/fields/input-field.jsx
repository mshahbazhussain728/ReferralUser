

import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { combineClasses } from "../../../utils/utility";

export const InputField = ({
  id,
  inputType,
  value,
  name,
  register,
  placeholder,
  className,
  success,
  disabled,
  setValue,
  svg,
  img,
  remove,
  onRemove,
  fieldIndex,
  onChange,
  percentage,
  step,
  // ✅ iOS cursor fix props
  autoComplete,
  autoCorrect,
  autoCapitalize,
  spellCheck,
}) => {
  const [inputFocus, setInputFocus] = useState(false);

  const defaultClasses = `border border-borderColor rounded-lg w-full h-10 xMini:h-12 bg-white ${
    success ? "pl-4 pr-10" : "pl-11 pr-4"
  } pt-[10px] pb-[10px] outline-none text-dark text-base focus:border-primary`;
  // ✅ text-base (16px) prevents iOS Safari zoom-on-focus which causes cursor jump

  const classes = combineClasses(defaultClasses, className);

  useEffect(() => {
    if (setValue) {
      setValue(name, value);
    }
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
    }
  };

  useEffect(() => {
    const inputElement = document.getElementById(id);
    if (inputElement) {
      inputElement.onwheel = (e) => e.preventDefault();
    }

    return () => {
      if (inputElement) inputElement.onwheel = null;
    };
  }, [id]);

  return (
    <div className="relative w-full flex items-center">
      {svg && (
        <span
          className={`mr-3 absolute left-4 ${inputFocus ? "tests" : "test"}`}
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      )}
      {remove && (
        <div
          className="cursor-pointer -top-9 absolute right-0 bg-red px-3 py-1 mt-1 text-white rounded-t-md"
          onClick={onRemove}
        >
          {remove}
        </div>
      )}

      <input
        onFocus={() => setInputFocus(true)}
        onBlur={() => setInputFocus(false)}
        id={id}
        type={inputType}
        className={classes}
        defaultValue={value}
        {...register(name)}
        placeholder={placeholder}
        disabled={disabled}
        step={step}
        min={0}
        pattern={inputType === "number" ? "\\d+" : "*"}
        onChange={(e) => onChange && onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        // ✅ iOS Safari cursor fix — all four needed together
        autoComplete={autoComplete ?? "off"}
        autoCorrect={autoCorrect ?? "off"}
        autoCapitalize={autoCapitalize ?? "sentences"}
        spellCheck={spellCheck ?? false}
      />
      {percentage && (
        <span
          className={`mr-3 absolute left-14 ${inputFocus ? "tests" : "test"}`}
        >
          {percentage}
        </span>
      )}
    </div>
  );
};

InputField.propTypes = {
  id:             PropTypes.string.isRequired,
  inputType:      PropTypes.oneOf(["text", "email", "number", "tel"]).isRequired,
  value:          PropTypes.string,
  name:           PropTypes.string.isRequired,
  register:       PropTypes.func.isRequired,
  placeholder:    PropTypes.string,
  className:      PropTypes.string,
  success:        PropTypes.bool,
  disabled:       PropTypes.bool,
  setValue:       PropTypes.func,
  svg:            PropTypes.string,
  img:            PropTypes.bool,
  remove:         PropTypes.string,
  onRemove:       PropTypes.func,
  fieldIndex:     PropTypes.number,
  onChange:       PropTypes.func,
  percentage:     PropTypes.string,
  step:           PropTypes.string,
  // ✅ iOS cursor fix props
  autoComplete:   PropTypes.string,
  autoCorrect:    PropTypes.string,
  autoCapitalize: PropTypes.string,
  spellCheck:     PropTypes.bool,
};


// import PropTypes from "prop-types";
// import { useEffect, useState } from "react";
// import { combineClasses } from "../../../utils/utility";

// export const InputField = ({
//   id,
//   inputType,
//   value,
//   name,
//   register,
//   placeholder,
//   className,
//   success,
//   disabled,
//   setValue,
//   svg,
//   img,
//   remove,
//   onRemove,
//   fieldIndex,
//   onChange,
//   percentage,
//   step,
// }) => {
//   const [inputFocus, setInputFocus] = useState(false);

//   const defaultClasses = `border border-borderColor rounded-lg w-full h-10 xMini:h-12 bg-white ${
//     success ? "pl-4 pr-10" : "pl-11 pr-4"
//   } pt-[10px] pb-[10px] outline-none text-dark text-sm focus:border-primary`;

//   const classes = combineClasses(defaultClasses, className);

//   useEffect(() => {
//     if (setValue) {
//       setValue(name, value);
//     }
//   }, []);

//   const handleKeyDown = (e) => {
//     if (e.key === "ArrowUp" || e.key === "ArrowDown") {
//       e.preventDefault();
//     }
//   };

//   useEffect(() => {
//     const inputElement = document.getElementById(id);
//     if (inputElement) {
//       inputElement.onwheel = (e) => e.preventDefault();
//     }

//     return () => {
//       if (inputElement) inputElement.onwheel = null;
//     };
//   }, [id]);

//   return (
//     <div className="relative w-full flex items-center">
//       {svg && (
//         <span
//           className={`mr-3 absolute left-4 ${inputFocus ? "tests" : "test"}`}
//           dangerouslySetInnerHTML={{ __html: svg }}
//         />
//       )}
//       {remove && (
//         <div
//           className="cursor-pointer -top-9 absolute right-0 bg-red px-3 py-1 mt-1 text-white rounded-t-md"
//           onClick={onRemove}
//         >
//           {remove}
//         </div>
//       )}

//       <input
//         onFocus={() => setInputFocus(true)}
//         onBlur={() => setInputFocus(false)}
//         id={id}
//         type={inputType}
//         className={classes}
//         defaultValue={value}
//         {...register(name)}
//         placeholder={placeholder}
//         disabled={disabled}
//         step={step}
//         min={0}
//         pattern={inputType === "number" ? "\\d+" : "*"}
//         onChange={(e) => onChange && onChange(e.target.value)}
//         onKeyDown={handleKeyDown}
//       />
//       {percentage && (
//         <span
//           className={`mr-3 absolute left-14 ${inputFocus ? "tests" : "test"}`}
//         >
//           {percentage}
//         </span>
//       )}
//     </div>
//   );
// };

// InputField.propTypes = {
//   id: PropTypes.string.isRequired,
//   inputType: PropTypes.oneOf(["text", "email", "number", "tel"]).isRequired,
//   value: PropTypes.string,
//   name: PropTypes.string.isRequired,
//   register: PropTypes.func.isRequired,
//   placeholder: PropTypes.string,
//   className: PropTypes.string,
//   success: PropTypes.bool,
//   disabled: PropTypes.bool,
//   setValue: PropTypes.func,
//   svg: PropTypes.string,
//   img: PropTypes.bool,
//   remove: PropTypes.string,
//   onRemove: PropTypes.func,
//   fieldIndex: PropTypes.number,
//   onChange: PropTypes.func,
//   percentage: PropTypes.string,
//   step: PropTypes.string,
// };
