import React, { memo } from "react";
import { combineClasses } from "../../utils/utility";
import { getTypedFieldComponent, isFieldType } from "./helps";

export const Form = memo(
  ({ formFields, handleSubmit, onSubmit, errors, className }) => {
    const renderField = (fieldData, error, errors) => {
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

    return (
      <form className={className} onSubmit={handleSubmit(onSubmit)}>
        {formFields?.map((fieldData, index) => {
          const fieldName = fieldData?.field?.name;
          const error =
            errors && fieldName ? errors[fieldName]?.message : undefined;

          const containerClasses = combineClasses(
            "flex flex-col",
            fieldData?.containerClass
          );
          const labelClasses = combineClasses(
            "text-dark font-medium mb-3 text-sm",
            fieldData?.label?.className
          );

          return (
            <div key={index} className={containerClasses}>
              {fieldData.label && (
                <label
                  htmlFor={fieldData.label.htmlFor}
                  className={labelClasses}
                >
                  {fieldData?.label?.text}
                </label>
              )}
              {renderField(fieldData, error, errors)}
            </div>
          );
        })}
      </form>
    );
  }
);




