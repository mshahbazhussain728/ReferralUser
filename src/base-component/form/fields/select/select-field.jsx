import { SelectBox } from "./custom-select";
import { Controller } from "react-hook-form";

export const SelectField = ({
  id,
  options,
  value: defaultValue,
  svg,
  name,
  control,
  trigger,
  onItemChange,
  className,
  disabled,
  fieldIndex,
  isLocalCustomer,
  onSearchCustomer,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <SelectBox
          id={id}
          svg={svg}
          onItemChange={onItemChange}
          options={options}
          value={defaultValue || ""}
          field={field}
          trigger={trigger}
          className={className}
          disabled={disabled}
          key={id}
          fieldIndex={fieldIndex}
          isLocalCustomer={isLocalCustomer}
          onSearchCustomer={onSearchCustomer}
        />
      )}
    />
  );
};
