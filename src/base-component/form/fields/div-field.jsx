import PropTypes from "prop-types";
import { combineClasses, findErrorMessage } from "../../../utils/utility";
import { getTypedFieldComponent } from "../helps";

export const DivField = ({ children = [], className = "", errors = {} }) => {
  const classes = combineClasses("", className);

  return (
    <div className={classes}>
      {Array.isArray(children) &&
        children.map((childField, index) => {
          const fieldName = childField?.field?.name || "";
          const data = fieldName.includes(".") ? fieldName.split(".") : [];
          const error = findErrorMessage(errors, data, fieldName);

          const { label, field, containerClass } = childField;
          const renderedField =
            field?.type &&
            getTypedFieldComponent(field.type, field, error, errors);

          const childClasses = combineClasses("flex flex-col", containerClass);
          const labelClasses = combineClasses(
            "text-dark font-medium mb-[10px]",
            label?.className
          );

          return (
            <div key={index} className={childClasses}>
              {label && (
                <label
                  htmlFor={label.htmlFor}
                  className={`truncate ${labelClasses}`}
                >
                  {label.text}
                </label>
              )}
              {renderedField}
            </div>
          );
        })}
    </div>
  );
};

DivField.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object),
  className: PropTypes.string,
  errors: PropTypes.object,
};
