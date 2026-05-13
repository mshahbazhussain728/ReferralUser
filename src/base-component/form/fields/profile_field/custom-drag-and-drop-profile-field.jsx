
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import edit_circle from "../../../../assets/svgs/edit_circle.svg";
import profileDummy from "../../../../assets/svgs/profile_dummy.svg";
import { combineClasses } from "../../../../utils/utility";
import { uploadFile } from "../../../../api/slices/globalSlice/global";

const compressImage = (file, maxWidth = 400, quality = 0.7) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width  = img.width;
        let height = img.height;
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width  = maxWidth;
        }
        canvas.width  = width;
        canvas.height = height;
        canvas.getContext("2d").drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => resolve(new File([blob], file.name, { type: "image/jpeg", lastModified: Date.now() })),
          "image/jpeg",
          quality
        );
      };
    };
  });
};

export const ProfileUpload = ({
  id,
  field,
  className,
  iconClasses,
  disabled,
  isMailSetting,
  isMailField,
}) => {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [previewImage, setPreviewImage] = useState(field?.value || profileDummy);

  const handleFileSelected = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    if (isMailField && (file.name.endsWith(".svg") || file.type === "image/webp")) {
      setErrorMessage("WebP files are not allowed. Please upload a different file format.");
      return;
    }

    setErrorMessage("");

    // Show local preview INSTANTLY
    const localPreview = URL.createObjectURL(file);
    setPreviewImage(localPreview);
    field.onChange(file);

    try {
      const compressed = await compressImage(file, 400, 0.7);
      const formData = new FormData();
      formData.append("profilePic", compressed);
      const res = await dispatch(uploadFile(formData));

      // FIX: only use payload as image URL if upload actually succeeded
      if (res?.type === "file/upload/fulfilled" && typeof res.payload === "string") {
        field.onChange(res.payload);
        setPreviewImage(res.payload);
      }
      // If upload fails, local blob preview stays — submit still works with File object
    } catch (_) {}
  };

  const defaultClasses = "relative";
  const classes = combineClasses(defaultClasses, className);
  const isSVG = typeof previewImage === "string" && previewImage.endsWith(".svg");

  return (
    <div>
      <div className="w-full">
        <div className={`${classes} flex justify-center items-center`}>
          {isSVG ? (
            <object
              data={previewImage}
              width={160}
              height={160}
              className="h-[160px] w-[160px] rounded-full object-cover"
            />
          ) : (
            <img
              src={previewImage}
              width={160}
              height={160}
              alt="Uploaded Preview"
              className="h-[160px] w-[160px] rounded-full object-cover"
            />
          )}
          <label
            className="absolute bottom-0 right-0 cursor-pointer"
            style={{ lineHeight: 0 }}
          >
            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg, image/webp"
              className="hidden"
              onChange={handleFileSelected}
              disabled={disabled}
            />
            <img src={edit_circle} alt="Edit Icon" className="cursor-pointer" />
          </label>
        </div>
      </div>
      {errorMessage && (
        <p className="text-red-500 text-sm mt-2 text-center">{errorMessage}</p>
      )}
    </div>
  );
};

// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import edit_circle from "../../../../assets/svgs/edit_circle.svg";
// import profileDummy from "../../../../assets/svgs/profile_dummy.svg";
// import { combineClasses } from "../../../../utils/utility";
// import { uploadFile } from "../../../../api/slices/globalSlice/global";

// // ── Compress image before upload ──────────────────────────────────────────────
// const compressImage = (file, maxWidth = 400, quality = 0.7) => {
//   return new Promise((resolve) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = (e) => {
//       const img = new Image();
//       img.src = e.target.result;
//       img.onload = () => {
//         const canvas = document.createElement("canvas");
//         let width  = img.width;
//         let height = img.height;

//         if (width > maxWidth) {
//           height = Math.round((height * maxWidth) / width);
//           width  = maxWidth;
//         }

//         canvas.width  = width;
//         canvas.height = height;
//         const ctx = canvas.getContext("2d");
//         ctx.drawImage(img, 0, 0, width, height);

//         canvas.toBlob(
//           (blob) => {
//             const compressedFile = new File([blob], file.name, {
//               type:         "image/jpeg",
//               lastModified: Date.now(),
//             });
//             resolve(compressedFile);
//           },
//           "image/jpeg",
//           quality
//         );
//       };
//     };
//   });
// };

// export const ProfileUpload = ({
//   id,
//   field,
//   className,
//   iconClasses,
//   disabled,
//   isMailSetting,
//   isMailField,
// }) => {
//   const dispatch = useDispatch();
//   const [errorMessage, setErrorMessage] = useState("");
//   const [previewImage, setPreviewImage] = useState(
//     field?.value || profileDummy
//   );

//   const handleFileSelected = async (e) => {
//     const file = e.target.files && e.target.files[0];
//     if (!file) return;

//     if (
//       isMailField &&
//       (file.name.endsWith(".svg") || file.type === "image/webp")
//     ) {
//       setErrorMessage(
//         "WebP files are not allowed. Please upload a different file format."
//       );
//       return;
//     }

//     setErrorMessage("");

//     // ✅ Show local preview INSTANTLY before any upload
//     const localPreview = URL.createObjectURL(file);
//     setPreviewImage(localPreview);
//     field.onChange(file);

//     try {
//       // ✅ Compress image before uploading
//       const compressed = await compressImage(file, 400, 0.7);

//       const formData = new FormData();
//       formData.append("profilePic", compressed);
//       const res = await dispatch(uploadFile(formData));

//       if (res?.payload && typeof res.payload === "string") {
//         // ✅ Update with server URL after upload — preview already shown
//         field.onChange(res.payload);
//         setPreviewImage(res.payload);
//       } else if (res?.error) {
//         setErrorMessage("Image upload failed. Please try again.");
//       }
//     } catch (error) {
//       setErrorMessage("Something went wrong during upload.");
//     }
//   };

//   const defaultClasses = "relative";
//   const classes = combineClasses(defaultClasses, className);
//   const isSVG = typeof previewImage === "string" && previewImage.endsWith(".svg");

//   return (
//     <div>
//       <div className="w-full">
//         <div className={`${classes} flex justify-center items-center`}>
//           {isSVG ? (
//             <object
//               data={previewImage}
//               width={160}
//               height={160}
//               className="h-[160px] w-[160px] rounded-full object-cover"
//             />
//           ) : (
//             <img
//               src={previewImage}
//               width={160}
//               height={160}
//               alt="Uploaded Preview"
//               className="h-[160px] w-[160px] rounded-full object-cover"
//             />
//           )}
//           <label
//             className={`absolute ${iconClasses} ${disabled ? "hidden" : ""} right-[2px] bottom-0`}
//           >
//             <input
//               type="file"
//               accept="image/png, image/jpeg, image/jpg, image/webp"
//               className="hidden"
//               onChange={handleFileSelected}
//               disabled={disabled}
//             />
//             <img src={edit_circle} alt="Edit Icon" className="cursor-pointer" />
//           </label>
//         </div>
//       </div>
//       {errorMessage && (
//         <p className="text-red-500 text-sm mt-2 text-center">{errorMessage}</p>
//       )}
//     </div>
//   );
// };