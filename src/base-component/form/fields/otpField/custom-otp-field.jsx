import React, { useState, useRef, useEffect } from "react";

export const CustomOtpField = ({
  length = 6,
  onComplete,
  field,
  id,
  className,
  disabled,
}) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef(new Array(length).fill(null));

  useEffect(() => {
    if (field.value) {
      const otpArray = field.value.split("").slice(0, length); 
      const newOtp = new Array(length)?.fill("");
      otpArray?.forEach((digit, index) => {
        newOtp[index] = digit; 
      });
      setOtp(newOtp);
    } else {
      setOtp(new Array(length).fill("")); 
    }
  }, [field.value, length]);

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    field.onChange(newOtp.join(""));

    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newOtp.every((digit) => digit !== "")) {
      onComplete?.(newOtp.join(""));
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className={`flex justify-between md:gap-x-[15px] ${className}`}>
      {otp?.map((digit, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          maxLength="1"
          value={digit}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          className="w-[48px] h-[54px] md:w-[76px] md:h-[76px] border border-borderColor text-center text-xl rounded-md focus:border-primary outline-none"
          disabled={disabled}
        />
      ))}
    </div>
  );
};
