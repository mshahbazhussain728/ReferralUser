import { useState } from "react";
import eyeOpenIcon from "../../../assets/svgs/eye-open-icon.svg";
import eyeCloseIcon from "../../../assets/svgs/eye-close-icon.svg";

export const PasswordField = ({
  id,
  type = "password",
  value,
  name,
  register,
  placeholder,
  disabled,
  isButton,
  onClick,
  className,
  svg,
  alt,
}) => {
  const [showPass, setShowPass] = useState(false);
  const [inputFocus, setInputFocus] = useState(false);

  const defaultClasses = `w-full border border-borderColor rounded-lg py-[10px] text-sm focus:border-primary outline-none ${
    type === "password" ? "pl-10 pr-4" : "px-4"
  }`;

  return (
    <div className="relative flex items-center">
      <span
        className={`mr-3 absolute top-4 left-4 ${
          inputFocus ? "tests" : "test"
        }`}
        dangerouslySetInnerHTML={{ __html: svg }}
      />

      <input
        onFocus={() => setInputFocus(true)}
        onBlurCapture={() => setInputFocus(false)}
        id={id}
        type={showPass ? "text" : type}
        defaultValue={value}
        {...(register ? register(name) : {})}
        placeholder={placeholder}
        disabled={disabled}
        className={`${defaultClasses} ${className} !pr-[41px]`}
      />

      {isButton ? (
        <span
          onClick={() => {
            if (onClick) onClick();
          }}
          className="absolute right-2 z-40 bg-primary rounded-lg px-[23px] py-[6px] text-white cursor-pointer"
        >
          Change
        </span>
      ) : (
        <img
          className={`absolute right-[16px] cursor-pointer ${
            inputFocus ? "tests" : "test"
          }`}
          src={showPass ? eyeOpenIcon : eyeCloseIcon}
          alt={alt}
          width={20}
          height={20}
          onClick={() => setShowPass(!showPass)}
        />
      )}
    </div>
  );
};
