import React from "react";
import { RenderFields } from "./render-fields";

export const useFormFields = ({
  formFields,
  errors,
  handleSubmit,
  onSubmit,
}) => {
  const fields = formFields.reduce((acc, fieldData) => {
    const fieldId = fieldData?.field?.id;
    acc[fieldId] = <RenderFields {...fieldData} errors={errors} />;
    return acc;
  }, {});

  const FormComponent = ({ children, className }) => (
    <form onSubmit={handleSubmit(onSubmit)} className={className}>
      {children}
    </form>
  );

  return {
    fields,
    Form: FormComponent,
  };
};
