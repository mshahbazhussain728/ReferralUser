import PropTypes from "prop-types";
import { combineClasses } from "../../utils/utility";
import { renderField } from "./helps";

export const RenderFields = ({ field, containerClass, label, errors }) => {
  const fieldName = field?.name;
  const error = errors && fieldName ? errors[fieldName]?.message : undefined;

  const containerClasses = combineClasses(
    "flex flex-col mb-[10px]",
    containerClass
  );
  const labelClasses = combineClasses(
    "text-dark font-medium mb-[10px]",
    label?.className
  );

  return (
    <div className={containerClasses}>
      {label && (
        <label htmlFor={label.htmlFor} className={labelClasses}>
          {label?.text}
        </label>
      )}
      {renderField({ field, containerClass, label }, error, errors)}
    </div>
  );
};

RenderFields.propTypes = {
  field: PropTypes.object.isRequired,
  containerClass: PropTypes.string,
  label: PropTypes.shape({
    htmlFor: PropTypes.string,
    text: PropTypes.string,
    className: PropTypes.string,
  }),
  errors: PropTypes.object,
};
