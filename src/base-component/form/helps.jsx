import React from "react";
import {
  InputField,
  SelectField,
  TelephoneInputField,
  SpanField,
  CheckBox,
  PasswordField,
  DatePicker,
  ProfileControllerField,
  OtpControllerField,
} from "./fields/index";
import { Button } from "../ui/button/button";
import { DivField } from "./fields/div-field";
import { RadioButtonField } from "./fields/radioButton/radio-button-field";

const fieldComponents = {
  input: InputField,
  password: PasswordField,
  select: SelectField,
  phone: TelephoneInputField,
  date: DatePicker,
  checkbox: CheckBox,
  radio: RadioButtonField,
  span: SpanField,
  div: DivField,
  button: Button,
  profileUploadField: ProfileControllerField,
  otpField: OtpControllerField,
};

export const getTypedFieldComponent = (type, props, error, errors) => {
  const Component = fieldComponents[type];

  return Component ? (
    <>
      <Component {...props} errors={errors} />
      {error && <span className="mt-[3px] text-red-500 text-sm">{error}</span>}
    </>
  ) : null;
};

export function isFieldType(type) {
  return [
    "input",
    "password",
    "select",
    "phone",
    "date",
    "checkbox",
    "radio",
    "span",
    "div",
    "button",
    "profileUploadField",
    "otpField",
  ].includes(type);
}

export const formatCardNumber = (cardNumber, format) => {
  const cleanNumber = cardNumber.replace(/\D+/g, "");

  return format.reduce((acc, sectionLength) => {
    const start = acc.replace(/\s/g, "").length;
    const end = start + sectionLength;
    const section = cleanNumber.slice(start, end);

    return section ? `${acc} ${section}`.trim() : acc;
  }, "");
};

export const renderField = (fieldData, error, errors) => {
  if (!fieldData?.field || !isFieldType(fieldData?.field?.type)) {
    return null;
  }
  return getTypedFieldComponent(
    fieldData?.field?.type,
    fieldData?.field,
    error,
    errors
  );
};
