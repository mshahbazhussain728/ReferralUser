import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { Form } from "../base-component/form/form";
import { Field } from "../utils/static";
import { setUser } from "../api/slices/authSlice/auth";

const RAW_DOMAIN = import.meta.env.VITE_API_DOMAIN || "https://apis.famocare.com";
const BASE_URL   = `${RAW_DOMAIN.replace(/\/$/, "")}/api/referralsystem`;

const COOKIE_OPTIONS = {
  expires:  7,
  sameSite: "Lax",
  secure:   true,
  path:     "/",
};

const getAuthToken = (locationState = {}) => {
  if (locationState?.accessToken) return locationState.accessToken;
  if (locationState?.user?.accessToken) return locationState.user.accessToken;

  const fromCookie = Cookies.get("accessToken");
  if (fromCookie) return fromCookie;

  try {
    const referralRaw = Cookies.get("referralUser");
    if (referralRaw) {
      const parsed = JSON.parse(referralRaw);
      if (parsed?.accessToken) return parsed.accessToken;
      if (parsed?.token)       return parsed.token;
    }
  } catch (_) {}

  try {
    const localRaw = localStorage.getItem("user");
    if (localRaw) {
      const parsed = JSON.parse(localRaw);
      if (parsed?.accessToken) return parsed.accessToken;
      if (parsed?.token)       return parsed.token;
    }
  } catch (_) {}

  const fromStorage = localStorage.getItem("accessToken");
  if (fromStorage) return fromStorage;

  return null;
};

const compressImage = (file, maxWidth = 400, quality = 0.7) =>
  new Promise((resolve) => {
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
          (blob) =>
            resolve(
              new File([blob], file.name, {
                type:         "image/jpeg",
                lastModified: Date.now(),
              })
            ),
          "image/jpeg",
          quality
        );
      };
    };
  });

const uploadProfilePicture = async (imageFile, name, token) => {
  if (!imageFile) return null;

  if (!token) {
    throw new Error(
      // "Authentication token not found. Please log out and sign in again."
      "something went wrong. please try again"
    );
  }

  const compressed = await compressImage(imageFile, 400, 0.7);
  const formData   = new FormData();
  formData.append("profilePic", compressed);
  if (name?.trim()) formData.append("name", name.trim());

  const res = await fetch(`${BASE_URL}/auth/upload-profile-picture`, {
    method:  "POST",
    headers: { Authorization: `Bearer ${token}` },
    body:    formData,
  });

  if (res.status === 401) {
    throw new Error("Your session has expired. Please log out and sign in again.");
  }

  if (!res.ok) {
    const errorJson = await res.json().catch(() => ({}));
    throw new Error(errorJson.message || `Upload failed with status ${res.status}`);
  }

  const json = await res.json();
  if (json.success) {
    return {
      imageUrl: json.data?.imageUrl ?? json.imageUrl ?? null,
      name:     json.data?.name     ?? json.name     ?? null,
    };
  }

  throw new Error(json.message || "Image upload failed");
};

// Downloads Apple's temporary image and re-uploads to your server for a permanent URL
const fetchAndUploadAppleImage = async (appleImageUrl, name, token) => {
  try {
    const response = await fetch(appleImageUrl);
    if (!response.ok) return null;

    const blob = await response.blob();
    const file = new File([blob], "apple-profile.jpg", {
      type:         "image/jpeg",
      lastModified: Date.now(),
    });

    const result = await uploadProfilePicture(file, name, token);
    return result?.imageUrl ?? null;
  } catch (_) {
    return null;
  }
};

const isAppleTemporaryImage = (url) => {
  if (!url) return false;
  return (
    url.includes("appleid.apple.com") ||
    url.includes("apple.com") ||
    url.includes("icloud.com") ||
    // Apple CDN signed URLs typically contain these patterns
    url.includes("is1-ssl.mzstatic.com") ||
    url.includes("is2-ssl.mzstatic.com") ||
    url.includes("is3-ssl.mzstatic.com") ||
    url.includes("is4-ssl.mzstatic.com") ||
    url.includes("is5-ssl.mzstatic.com")
  );
};

const SetUpProfile = () => {
  const location   = useLocation();
  const navigate   = useNavigate();
  const dispatch   = useDispatch();
  const appleState = location.state || {};

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name:     appleState.name || appleState.user?.name || "",
      imageUrl: null,
    },
  });

  const [loading,     setLoading]     = React.useState(false);
  const [uploadError, setUploadError] = React.useState("");
  const [imageError,  setImageError]  = React.useState("");

  const formFields = React.useMemo(
    () => [
      {
        containerClass: "flex justify-center items-center mb-[18px]",
        field: {
          type:        Field.profileUploadField,
          className:   "!h-[165px] !w-[165px] !rounded-full border border-primary",
          id:          "imageUrl",
          name:        "imageUrl",
          accept:      "image/png, image/jpeg, image/jpg, image/webp",
          control,
          iconClasses: "bottom-0 right-0",
        },
      },
      {
        field: {
          type:               Field.span,
          text:               "Upload Profile Image",
          containerClassName: "text-sm md:text-[22px] text-dark font-medium text-center",
          id:                 "info",
        },
      },
      {
        containerClass: "my-[22px]",
        field: {
          type:           Field.input,
          id:             "name",
          name:           "name",
          inputType:      "text",
          placeholder:    "Enter Your Name",
          className:      "w-full pl-[18px] text-base",
          autoComplete:   "name",
          autoCorrect:    "off",
          autoCapitalize: "words",
          spellCheck:     false,
          readOnly:       false,
          inputMode:      "text",
          register,
          rules: { required: "Name is required" },
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const onSubmit = async (data) => {
    setLoading(true);
    setUploadError("");
    setImageError("");

    const imageFile =
      data.imageUrl instanceof File
        ? data.imageUrl
        : Array.isArray(data.imageUrl) && data.imageUrl[0] instanceof File
        ? data.imageUrl[0]
        : null;

    const hasExistingImage = appleState.imageUrl || appleState.user?.imageUrl || null;
    const nameValue        = data.name?.trim();

    let hasError = false;

    if (!nameValue) {
      setUploadError("Name is required");
      hasError = true;
    }

    if (!imageFile && !hasExistingImage) {
      setImageError("Profile picture is required");
      hasError = true;
    }

    if (hasError) {
      setLoading(false);
      return;
    }

    try {
      const token = getAuthToken(appleState);

      if (!token) {
        throw new Error(
          "Authentication token not found. Please log out and sign in again."
        );
      }

      let imageUrl = null;

      if (typeof data.imageUrl === "string" && data.imageUrl.startsWith("http")) {
        // Already a permanent URL string — use as-is
        imageUrl = data.imageUrl;
      } else if (imageFile) {
        // New image selected — upload image + name together
        let uploadResult = null;
        try {
          uploadResult = await uploadProfilePicture(imageFile, data.name, token);
        } catch (uploadErr) {
          if (
            uploadErr.message?.includes("session has expired") ||
            uploadErr.message?.includes("Authentication token")
          ) {
            throw uploadErr;
          }
          // Slow network or upload failure — continue silently
        }
        imageUrl = uploadResult?.imageUrl ?? null;
      } else {
        // No new image selected
        const appleImage = hasExistingImage;

        if (isAppleTemporaryImage(appleImage)) {
          // Re-upload Apple's temporary image to your own server for a permanent URL
          const reuploaded = await fetchAndUploadAppleImage(appleImage, data.name, token);
          imageUrl = reuploaded ?? appleImage;
        } else if (appleImage && appleImage.startsWith("https://apis.famocare.com")) {
          // Already a permanent URL on your server — just update name
          imageUrl = appleImage;

          try {
            const nameOnlyForm = new FormData();
            nameOnlyForm.append("name", data.name.trim());

            const res = await fetch(`${BASE_URL}/auth/upload-profile-picture`, {
              method:  "POST",
              headers: { Authorization: `Bearer ${token}` },
              body:    nameOnlyForm,
            });

            if (res.status === 401) {
              throw new Error("Your session has expired. Please log out and sign in again.");
            }

            if (res.ok) {
              const json = await res.json().catch(() => ({}));
              if (json.success) {
                imageUrl = json.data?.imageUrl ?? json.imageUrl ?? imageUrl;
              }
            }
          } catch (nameErr) {
            if (
              nameErr.message?.includes("session has expired") ||
              nameErr.message?.includes("Authentication token")
            ) {
              throw nameErr;
            }
            // Name update failed silently — local state will still update
          }
        } else {
          imageUrl = appleImage;
        }
      }

      // Build existing user from all possible sources
      let existingUser = {};

      try {
        const fromCookie = Cookies.get("referralUser");
        if (fromCookie) existingUser = JSON.parse(fromCookie);
      } catch (_) {}

      try {
        const fromLocal = localStorage.getItem("user");
        if (fromLocal) {
          const parsed = JSON.parse(fromLocal);
          existingUser = { ...existingUser, ...parsed };
        }
      } catch (_) {}

      if (appleState.user) {
        existingUser = { ...appleState.user, ...existingUser };
      }

      // Merge all fields to build a complete, permanent user object
      const updatedUser = {
        ...existingUser,
        id:                 existingUser.id                 || appleState.id                 || appleState.user?.id                 || null,
        name:               data.name?.trim()               || existingUser.name              || "",
        imageUrl:           imageUrl                        || existingUser.imageUrl           || null,
        country:            existingUser.country            || appleState.country             || appleState.user?.country             || "N/A",
        balance:            existingUser.balance            || appleState.balance             || appleState.user?.balance             || "0.00",
        totalReferredUsers: existingUser.totalReferredUsers ?? appleState.totalReferredUsers  ?? appleState.user?.totalReferredUsers  ?? 0,
        createdAt:          existingUser.createdAt          || appleState.createdAt           || appleState.user?.createdAt           || null,
      };

      // Persist everywhere consistently
      localStorage.setItem("user", JSON.stringify(updatedUser));
      Cookies.set("referralUser", JSON.stringify(updatedUser), COOKIE_OPTIONS);
      Cookies.set("accessToken", token, { ...COOKIE_OPTIONS, expires: 1 });

      dispatch(setUser(updatedUser));
      navigate("/dashboard?status=ref-guide", { replace: true });

    } catch (error) {
      const msg = error.message || "Something went wrong. Please try again.";

      if (msg === "Profile picture is required") {
        setImageError(msg);
      } else if (msg === "Name is required") {
        setUploadError(msg);
      } else {
        setUploadError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#ECECEC] overflow-y-auto">
      <div className="flex min-h-full items-center justify-center px-4 py-8">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold text-center mb-6 text-[#055860]">
            Set Up Your Profile
          </h1>

          <Form
            formFields={formFields}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            errors={errors}
          />

          {imageError && (
            <p className="text-red-500 text-sm mt-1 text-center">{imageError}</p>
          )}

          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}

          {uploadError && (
            <p className="text-red-500 text-sm mt-3 text-center">{uploadError}</p>
          )}

          <button
            type="button"
            disabled={loading}
            onClick={handleSubmit(onSubmit)}
            className="mt-[50px] rounded-xl w-full h-[50px] bg-primary text-white flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                <span>Please wait...</span>
              </>
            ) : (
              <span>Set up Profile</span>
            )}
          </button>

        </div>
      </div>
    </div>
  );
};

export default SetUpProfile;





// import React from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import Cookies from "js-cookie";
// import { Form } from "../base-component/form/form";
// import { Field } from "../utils/static";
// import { setUser } from "../api/slices/authSlice/auth";

// const RAW_DOMAIN = import.meta.env.VITE_API_DOMAIN || "https://apis.famocare.com";
// const BASE_URL = `${RAW_DOMAIN.replace(/\/$/, "")}/api/referralsystem`;

// export const SignUpFormFields = (register, loading, control) => [
//   {
//     containerClass: "flex justify-center items-center mb-[18px]",
//     field: {
//       type: Field.profileUploadField,
//       className: "!h-[165px] !w-[165px] !rounded-full border border-primary",
//       id: "imageUrl",
//       name: "imageUrl",
//       accept: "image/png, image/jpeg, image/jpg, image/webp",
//       control,
//     },
//   },
//   {
//     field: {
//       type: Field.span,
//       text: "Upload Profile Image",
//       containerClassName: "text-sm md:text-[22px] text-dark font-medium text-center",
//       id: "info",
//     },
//   },
//   {
//     containerClass: "my-[22px]",
//     field: {
//       type: Field.input,
//       id: "name",
//       name: "name",
//       inputType: "text",
//       placeholder: "Enter Your Name",
//       className: "w-full pl-[18px]",
//       register,
//       rules: { required: "Name is required" },
//     },
//   },
// ];

// const getAuthToken = () =>
//   Cookies.get("accessToken") || localStorage.getItem("accessToken") || null;

// // ✅ Compress before upload
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
//         canvas.getContext("2d").drawImage(img, 0, 0, width, height);
//         canvas.toBlob(
//           (blob) => resolve(new File([blob], file.name, { type: "image/jpeg", lastModified: Date.now() })),
//           "image/jpeg",
//           quality
//         );
//       };
//     };
//   });
// };

// // ✅ Single upload — sends image + name together
// const uploadProfilePicture = async (imageFile, name) => {
//   if (!imageFile) return null;
//   const token = getAuthToken();
//   if (!token) throw new Error("Authentication token not found. Please log in again.");

//   // ✅ Compress before uploading — fixes file too large
//   const compressed = await compressImage(imageFile, 400, 0.7);

//   const formData = new FormData();
//   formData.append("profilePic", compressed);
//   if (name && name.trim() !== "") {
//     formData.append("name", name.trim());
//   }

//   const res = await fetch(`${BASE_URL}/auth/upload-profile-picture`, {
//     method: "POST",
//     headers: { Authorization: `Bearer ${token}` },
//     body: formData,
//   });

//   if (!res.ok) {
//     const errorJson = await res.json().catch(() => ({}));
//     throw new Error(errorJson.message || `Upload failed with status ${res.status}`);
//   }

//   const json = await res.json();
//   if (json.success) {
//     return {
//       imageUrl: json.data?.imageUrl || json.imageUrl || null,
//       name:     json.data?.name     || json.name     || null,
//     };
//   }
//   throw new Error(json.message || "Image upload failed");
// };

// const SetUpProfile = () => {
//   const location   = useLocation();
//   const navigate   = useNavigate();
//   const dispatch   = useDispatch();
//   const appleState = location.state || {};

//   const { register, handleSubmit, control, formState: { errors } } = useForm({
//     defaultValues: {
//       name:     appleState.name || "",
//       imageUrl: null,
//     },
//   });

//   const [loading,     setLoading]     = React.useState(false);
//   const [uploadError, setUploadError] = React.useState("");

//   const onSubmit = async (data) => {
//     setLoading(true);
//     setUploadError("");

//     try {
//       let imageUrl = null;

//       if (typeof data.imageUrl === "string" && data.imageUrl.startsWith("http")) {
//         // Already a URL
//         imageUrl = data.imageUrl;
//       } else {
//         const imageFile =
//           data.imageUrl instanceof File ? data.imageUrl :
//           Array.isArray(data.imageUrl) && data.imageUrl[0] instanceof File
//             ? data.imageUrl[0]
//             : null;

//         if (imageFile) {
//           // ✅ Compress + upload once — name sent together
//           const result = await uploadProfilePicture(imageFile, data.name);
//           imageUrl = result?.imageUrl || null;
//         } else {
//           imageUrl = appleState.imageUrl || null;
//         }
//       }

//       let existingUser = {};
//       try {
//         const fromLocal = localStorage.getItem("user");
//         if (fromLocal) existingUser = JSON.parse(fromLocal);
//       } catch (e) {}

//       if (!existingUser?.email) {
//         try {
//           const fromCookie = Cookies.get("referralUser");
//           if (fromCookie) existingUser = JSON.parse(fromCookie);
//         } catch (e) {}
//       }

//       const updatedUser = {
//         ...existingUser,
//         name:     data.name?.trim() || existingUser.name     || "",
//         imageUrl: imageUrl          || existingUser.imageUrl || null,
//       };

//       localStorage.setItem("user", JSON.stringify(updatedUser));
//       Cookies.set("referralUser", JSON.stringify(updatedUser), {
//         expires:  7,
//         sameSite: "Lax",
//         secure:   true,
//         path:     "/",
//       });

//       dispatch(setUser(updatedUser));

//       if (!Cookies.get("accessToken")) {
//         Cookies.set("accessToken",  `temp_${Date.now()}`,         { expires: 1 });
//         Cookies.set("refreshToken", `temp_refresh_${Date.now()}`, { expires: 7 });
//       }

//       // ✅ Navigate after everything saved
//       navigate("/dashboard?status=ref-guide", { replace: true });

//     } catch (error) {
//       setUploadError(error.message || "Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formFields = SignUpFormFields(register, loading, control);

//   return (
//     <div className="min-h-screen bg-[#ECECEC] flex items-center justify-center px-4 py-8">
//       <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
//         <h1 className="text-2xl font-bold text-center mb-6 text-[#055860]">
//           Set Up Your Profile
//         </h1>

//         <Form
//           formFields={formFields}
//           handleSubmit={handleSubmit}
//           onSubmit={onSubmit}
//           errors={errors}
//         />

//         <button
//           type="button"
//           disabled={loading}
//           onClick={handleSubmit(onSubmit)}
//           className="mt-[50px] rounded-xl w-full h-[50px] bg-primary text-white flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
//         >
//           {loading ? (
//             <>
//               <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
//               <span>Please wait...</span>
//             </>
//           ) : (
//             <span>Set up Profile</span>
//           )}
//         </button>

//         {errors.name && (
//           <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
//         )}
//         {uploadError && (
//           <p className="text-red-500 text-sm mt-3 text-center">{uploadError}</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SetUpProfile;