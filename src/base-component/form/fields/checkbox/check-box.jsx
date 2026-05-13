import { useState } from "react";
import styles from "./checkbox.module.css";

export const CheckBox = ({
  id,
  name,
  onChange,
  checked,
  className,
  containerClassName,
  textClassName,
  label,
  description,
}) => {
  const [isChecked, setIsChecked] = useState(checked || false);

  const handleChange = (e) => {
    setIsChecked(e.target.checked);
    if (onChange) {
      onChange(e.target.checked);
    }
  };

  return (
    <div
      className={`flex items-center gap-x-[12px] ${containerClassName || ""}`}
    >
      <div className="flex items-center">
        <input
          id={id}
          type="checkbox"
          name={name}
          checked={isChecked}
          onChange={handleChange}
          className={`${styles.hiddenCheckbox} checkbox-gradient`}
        />
        <label htmlFor={id} className={`${styles.checkboxLabel}`}></label>
        {label && (
          <label htmlFor={id} className="ml-2 cursor-pointer text-sm">
            {label}
          </label>
        )}
      </div>
      {description && (
        <span className={`${textClassName || ""} text-sm`}>{description}</span>
      )}
    </div>
  );
};
