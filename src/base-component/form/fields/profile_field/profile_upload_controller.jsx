
import React from "react";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import { ProfileUpload } from "./custom-drag-and-drop-profile-field";

export const ProfileControllerField = ({
  control,
  id,
  name,
  className,
  iconClasses,
  disabled,
  isMailSetting,
  isMailField,
  previewUrl, // ← FIX: accept it here
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <ProfileUpload
          id={id}
          field={field}
          className={className}
          iconClasses={iconClasses}
          disabled={disabled}
          isMailSetting={isMailSetting}
          isMailField={isMailField}
          previewUrl={previewUrl} // ← FIX: forward it to ProfileUpload
        />
      )}
    />
  );
};

ProfileControllerField.propTypes = {
  control: PropTypes.any,
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  iconClasses: PropTypes.string,
  disabled: PropTypes.bool,
  isMailSetting: PropTypes.bool,
  isMailField: PropTypes.bool,
  previewUrl: PropTypes.string,
};


// import React from "react";
// import PropTypes from "prop-types";
// import { Controller } from "react-hook-form";
// import { ProfileUpload } from "./custom-drag-and-drop-profile-field";

// export const ProfileControllerField = ({
//   control,
//   id,
//   name,
//   className,
//   iconClasses,
//   disabled,
//   isMailSetting,
//   isMailField,
// }) => {
//   return (
//     <Controller
//       name={name}
//       control={control}
//       render={({ field, fieldState: { error } }) => (
//         <ProfileUpload
//           id={id}
//           field={field}
//           className={className}
//           iconClasses={iconClasses}
//           disabled={disabled}
//           isMailSetting={isMailSetting}
//           isMailField={isMailField}
//         />
//       )}
//     />
//   );
// };

// // Prop validation
// ProfileControllerField.propTypes = {
//   control: PropTypes.any,
//   id: PropTypes.string,
//   name: PropTypes.string.isRequired,
//   className: PropTypes.string,
//   iconClasses: PropTypes.string,
//   disabled: PropTypes.bool,
//   isMailSetting: PropTypes.bool,
//   isMailField: PropTypes.bool,
// };
