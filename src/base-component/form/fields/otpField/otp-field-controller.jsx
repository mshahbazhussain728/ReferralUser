import React from "react";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import { CustomOtpField } from "./custom-otp-field";

export const OtpControllerField = ({
  control,
  id,
  name,
  className,
  disabled,
  length = 6,
  onComplete,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <CustomOtpField
          key={field.value}
          id={id}
          field={field}
          className={className}
          disabled={disabled}
          length={length}
          onComplete={onComplete}
        />
      )}
    />
  );
};

OtpControllerField.propTypes = {
  control: PropTypes.any.isRequired,
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  length: PropTypes.number,
  onComplete: PropTypes.func,
};
