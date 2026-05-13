// import { useCallback, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { readMyRewards } from "../api/slices/myRewards/myRewardsSlice";

// export const combineClasses = (defaultClasses, className = "") => {
//   if (!className) return defaultClasses;

//   const defaultSet = new Set(defaultClasses.split(" "));
//   const customSet = new Set(className.split(" "));

//   customSet.forEach((customClass) => {
//     if (customClass.startsWith("!!")) {
//       defaultSet.delete(customClass.slice(2));
//       customSet.delete(customClass);
//     }
//   });

//   defaultSet.forEach((defaultClass) => {
//     const baseClass = defaultClass.split("-")[0];
//     customSet.forEach((customClass) => {
//       if (customClass.startsWith(baseClass)) {
//         defaultSet.delete(defaultClass);
//       }
//     });
//   });

//   return [...defaultSet, ...customSet].join(" ");
// };

// export function formatStrings(str, replaceValues) {
//   let formattedString = str;
//   for (const [index, value] of replaceValues.entries()) {
//     formattedString = formattedString.replace(`{${index}}`, value);
//   }
//   return formattedString;
// }

// export const conditionHandlerLogin = () => {
//   const navigate = useNavigate();

//   navigate("/dashboard?status=ref-guide");
// };

// export function setErrors(setError, errors) {
//   if (!errors) return;
//   let newObj = {};

//   Object.entries(errors).forEach(([key, value]) => {
//     if (key && !value) {
//       setError(key, { message: null });
//     }
//     if (Array.isArray(value)) {
//       value.forEach((element, index) => {
//         Object.entries(element).forEach(([key1, value1]) => {
//           const newKey = key1.split(".")[1];
//           newObj = {
//             ...newObj,
//             [index]: {
//               [newKey]: { message: `${value1}` },
//             },
//           };
//         });
//       });
//       setError(key, newObj);
//     } else {
//       setError(key, {
//         message: formatStrings(
//           `${value?.split(":")[0]}`,
//           value?.split(":").slice(1)
//         ),
//       });
//     }
//   });
// }

// export function setErrorMessage(error) {
//   if (!error) return "";
//   return `${error}`;
// }

// export const getButtonClass = (condition, activeClass, inactiveClass = "") => {
//   return condition ? activeClass : inactiveClass;
// };

// export const getPageFromURL = () => {
//   const params = new URLSearchParams(window.location.search);
//   return Number(params.get("page")) || 1;
// };

// export const getRedeemStatusStyles = (status) => {
//   const statusStyles = {
//     Successful: {
//       bg: "bg-[#d9f3e1]",
//       text: "text-[#05B035]",
//     },
//     successful: {
//       bg: "bg-[#d9f3e1]",
//       text: "text-[#05B035]",
//     },
//     "In Progress": {
//       bg: "bg-[#fdf0e4]",
//       text: "text-[#F2994A]",
//     },
//     Pending: {
//       bg: "bg-[#e0ecfc]",
//       text: "text-[#2F80ED]",
//     },
//     pending: {
//       bg: "bg-[#e0ecfc]",
//       text: "text-[#2F80ED]",
//     },
//     Cancelled: {
//       bg: "bg-[#fcd9d9]",
//       text: "text-[#E80000]",
//     },
//   };

//   return (
//     statusStyles[status] || {
//       bg: "bg-[#fcd9d9]",
//       text: "text-[#E80000]",
//     }
//   );
// };

// export const getStatusStyles = (status) => {
//   const styles = {
//     Redeemed: {
//       bg: "bg-[#05B03526]",
//       text: "text-[#05B035]",
//     },
//     default: {
//       bg: "bg-[#E8000026]",
//       text: "text-[#E80000]",
//     },
//   };

//   return styles[status] || styles.default;
// };

// export const findErrorMessage = (errors, data = [], fieldName) => {
//   const keys = data.length > 0 ? data : [fieldName];

//   let currentError = errors;

//   for (const key of keys) {
//     if (currentError?.[key]) {
//       currentError = currentError[key];
//     } else {
//       return undefined;
//     }
//   }

//   return currentError?.message || undefined;
// };

// export const scrollToTop = () => {
//   window.scrollTo({ top: 0, behavior: "smooth" });
// };

// export function returnStep(
//   data,
//   setError,
//   translate,
//   currentFormStage,
//   nextFormHandler
// ) {
//   const navigate = useNavigate();

//   if (currentFormStage === DetailScreensStages.CompanyDetails) {
//     return updateProfileStep1({
//       data,
//       navigate,
//       setError,
//       translate,
//       currentFormStage,
//       nextFormHandler,
//     });
//   }
//   if (currentFormStage === DetailScreensStages.LocationDetails) {
//     return updateProfileStep2({
//       data,
//       navigate,
//       setError,
//       translate,
//       currentFormStage,
//       nextFormHandler,
//     });
//   }
//   if (currentFormStage === DetailScreensStages.BankDetails) {
//     return updateProfileStep3({
//       data,
//       navigate,
//       setError,
//       translate,
//       currentFormStage,
//       nextFormHandler,
//     });
//   }

//   return updateProfileStep1({
//     data,
//     navigate,
//     setError,
//     translate,
//     currentFormStage,
//     nextFormHandler,
//   });
// }

// export const useClipboardCopy = () => {
//   const inputRef = useRef(null);
//   const [isCopied, setIsCopied] = useState(false);

//   const handleCopy = useCallback(async () => {
//     if (inputRef.current) {
//       let textToCopy = "";

//       if (inputRef.current instanceof HTMLInputElement) {
//         textToCopy = inputRef.current.value;
//       } else {
//         textToCopy = inputRef.current.textContent || "";
//       }

//       try {
//         await navigator.clipboard.writeText(textToCopy);
//         setIsCopied(true);
//       } catch (err) {
//         setIsCopied(false);
//       }
//     }
//   }, []);

//   return { inputRef, handleCopy, isCopied };
// };

// export const formatPoints = (points) => {
//   const num = Number(points);
//   if (isNaN(num)) return "0";

//   if (num >= 1000000) {
//     return (num / 1000000).toFixed(2) + "M";
//   } else if (num >= 1000) {
//     return (num / 1000).toFixed(2) + "k";
//   }
//   return num.toString();
// };

// export const fetchMyRewardsUtil = async ({
//   dispatch,
//   user,
//   authLoading,
//   setMyRewards,
// }) => {
//   if (authLoading) return;

//   const uid = user?.user?.id;
//   if (!uid) return;

//   const formData = new FormData();
//   formData.append("uid", uid);

//   try {
//     const response = await dispatch(readMyRewards({ data: formData }));

//     if (response?.payload?.data) {
//       setMyRewards(response?.payload?.data);
//     }
//   } catch (err) {
//     console.error("Error fetching my rewards:", err);
//   }
// };


// import { useCallback, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { readMyRewards } from "../api/slices/myRewards/myRewardsSlice";

// export const combineClasses = (defaultClasses, className = "") => {
//   if (!className) return defaultClasses;

//   const defaultSet = new Set(defaultClasses.split(" "));
//   const customSet = new Set(className.split(" "));

//   customSet.forEach((customClass) => {
//     if (customClass.startsWith("!!")) {
//       defaultSet.delete(customClass.slice(2));
//       customSet.delete(customClass);
//     }
//   });

//   defaultSet.forEach((defaultClass) => {
//     const baseClass = defaultClass.split("-")[0];
//     customSet.forEach((customClass) => {
//       if (customClass.startsWith(baseClass)) {
//         defaultSet.delete(defaultClass);
//       }
//     });
//   });

//   return [...defaultSet, ...customSet].join(" ");
// };

// export function formatStrings(str, replaceValues) {
//   let formattedString = str;
//   for (const [index, value] of replaceValues.entries()) {
//     formattedString = formattedString.replace(`{${index}}`, value);
//   }
//   return formattedString;
// }

// export const conditionHandlerLogin = () => {
//   const navigate = useNavigate();

//   navigate("/dashboard?status=ref-guide");
// };

// export function setErrors(setError, errors) {
//   if (!errors) return;
//   let newObj = {};

//   Object.entries(errors).forEach(([key, value]) => {
//     if (key && !value) {
//       setError(key, { message: null });
//     }
//     if (Array.isArray(value)) {
//       value.forEach((element, index) => {
//         Object.entries(element).forEach(([key1, value1]) => {
//           const newKey = key1.split(".")[1];
//           newObj = {
//             ...newObj,
//             [index]: {
//               [newKey]: { message: `${value1}` },
//             },
//           };
//         });
//       });
//       setError(key, newObj);
//     } else {
//       setError(key, {
//         message: formatStrings(
//           `${value?.split(":")[0]}`,
//           value?.split(":").slice(1)
//         ),
//       });
//     }
//   });
// }

// export function setErrorMessage(error) {
//   if (!error) return "";
//   return `${error}`;
// }

// export const getButtonClass = (condition, activeClass, inactiveClass = "") => {
//   return condition ? activeClass : inactiveClass;
// };

// export const getPageFromURL = () => {
//   const params = new URLSearchParams(window.location.search);
//   return Number(params.get("page")) || 1;
// };

// export const getRedeemStatusStyles = (status) => {
//   const statusStyles = {
//     Successful: {
//       bg: "bg-[#d9f3e1]",
//       text: "text-[#05B035]",
//     },
//     successful: {
//       bg: "bg-[#d9f3e1]",
//       text: "text-[#05B035]",
//     },
//     "In Progress": {
//       bg: "bg-[#fdf0e4]",
//       text: "text-[#F2994A]",
//     },
//     Pending: {
//       bg: "bg-[#e0ecfc]",
//       text: "text-[#2F80ED]",
//     },
//     pending: {
//       bg: "bg-[#e0ecfc]",
//       text: "text-[#2F80ED]",
//     },
//     Cancelled: {
//       bg: "bg-[#fcd9d9]",
//       text: "text-[#E80000]",
//     },
//   };

//   return (
//     statusStyles[status] || {
//       bg: "bg-[#fcd9d9]",
//       text: "text-[#E80000]",
//     }
//   );
// };

// export const getStatusStyles = (status) => {
//   const normalizedStatus = status?.toLowerCase();
  
//   const styles = {
//     redeemed: {
//       bg: "bg-[#05B03526]",
//       text: "text-[#05B035]",
//     },
//     expired: {
//       bg: "bg-[#E8000026]",
//       text: "text-[#E80000]",
//     },
//     active: {
//       bg: "bg-[#2F80ED26]",
//       text: "text-[#2F80ED]",
//     },
//     pending: {
//       bg: "bg-[#F2994A26]",
//       text: "text-[#F2994A]",
//     },
//     default: {
//       bg: "bg-[#E8000026]",
//       text: "text-[#E80000]",
//     },
//   };

//   return styles[normalizedStatus] || styles.default;
// };

// export const findErrorMessage = (errors, data = [], fieldName) => {
//   const keys = data.length > 0 ? data : [fieldName];

//   let currentError = errors;

//   for (const key of keys) {
//     if (currentError?.[key]) {
//       currentError = currentError[key];
//     } else {
//       return undefined;
//     }
//   }

//   return currentError?.message || undefined;
// };

// export const scrollToTop = () => {
//   window.scrollTo({ top: 0, behavior: "smooth" });
// };

// export function returnStep(
//   data,
//   setError,
//   translate,
//   currentFormStage,
//   nextFormHandler
// ) {
//   const navigate = useNavigate();

//   if (currentFormStage === DetailScreensStages.CompanyDetails) {
//     return updateProfileStep1({
//       data,
//       navigate,
//       setError,
//       translate,
//       currentFormStage,
//       nextFormHandler,
//     });
//   }
//   if (currentFormStage === DetailScreensStages.LocationDetails) {
//     return updateProfileStep2({
//       data,
//       navigate,
//       setError,
//       translate,
//       currentFormStage,
//       nextFormHandler,
//     });
//   }
//   if (currentFormStage === DetailScreensStages.BankDetails) {
//     return updateProfileStep3({
//       data,
//       navigate,
//       setError,
//       translate,
//       currentFormStage,
//       nextFormHandler,
//     });
//   }

//   return updateProfileStep1({
//     data,
//     navigate,
//     setError,
//     translate,
//     currentFormStage,
//     nextFormHandler,
//   });
// }

// export const useClipboardCopy = () => {
//   const inputRef = useRef(null);
//   const [isCopied, setIsCopied] = useState(false);

//   const handleCopy = useCallback(async () => {
//     if (inputRef.current) {
//       let textToCopy = "";

//       if (inputRef.current instanceof HTMLInputElement) {
//         textToCopy = inputRef.current.value;
//       } else {
//         textToCopy = inputRef.current.textContent || "";
//       }

//       try {
//         await navigator.clipboard.writeText(textToCopy);
//         setIsCopied(true);
//       } catch (err) {
//         setIsCopied(false);
//       }
//     }
//   }, []);

//   return { inputRef, handleCopy, isCopied };
// };

// export const formatPoints = (points) => {
//   const num = Number(points);
//   if (isNaN(num)) return "0";

//   if (num >= 1000000) {
//     return (num / 1000000).toFixed(2) + "M";
//   } else if (num >= 1000) {
//     return (num / 1000).toFixed(2) + "k";
//   }
//   return num.toString();
// };

// export const fetchMyRewardsUtil = async ({
//   dispatch,
//   user,
//   authLoading,
//   setMyRewards,
// }) => {
//   if (authLoading) return;

//   const uid = user?.user?.id;
//   if (!uid) return;

//   const formData = new FormData();
//   formData.append("uid", uid);

//   try {
//     const response = await dispatch(readMyRewards({ data: formData }));

//     if (response?.payload?.data) {
//       setMyRewards(response?.payload?.data);
//     }
//   } catch (err) {
//     console.error("Error fetching my rewards:", err);
//   }
// };









import { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { readMyRewards } from "../api/slices/myRewards/myRewardsSlice";

export const combineClasses = (defaultClasses, className = "") => {
  if (!className) return defaultClasses;

  const defaultSet = new Set(defaultClasses.split(" "));
  const customSet = new Set(className.split(" "));

  customSet.forEach((customClass) => {
    if (customClass.startsWith("!!")) {
      defaultSet.delete(customClass.slice(2));
      customSet.delete(customClass);
    }
  });

  defaultSet.forEach((defaultClass) => {
    const baseClass = defaultClass.split("-")[0];
    customSet.forEach((customClass) => {
      if (customClass.startsWith(baseClass)) {
        defaultSet.delete(defaultClass);
      }
    });
  });

  return [...defaultSet, ...customSet].join(" ");
};

export function formatStrings(str, replaceValues) {
  let formattedString = str;
  for (const [index, value] of replaceValues.entries()) {
    formattedString = formattedString.replace(`{${index}}`, value);
  }
  return formattedString;
}

export const conditionHandlerLogin = () => {
  const navigate = useNavigate();
  navigate("/dashboard?status=ref-guide");
};

export function setErrors(setError, errors) {
  if (!errors) return;
  let newObj = {};

  Object.entries(errors).forEach(([key, value]) => {
    if (key && !value) {
      setError(key, { message: null });
    }
    if (Array.isArray(value)) {
      value.forEach((element, index) => {
        Object.entries(element).forEach(([key1, value1]) => {
          const newKey = key1.split(".")[1];
          newObj = {
            ...newObj,
            [index]: {
              [newKey]: { message: `${value1}` },
            },
          };
        });
      });
      setError(key, newObj);
    } else {
      setError(key, {
        message: formatStrings(
          `${value?.split(":")[0]}`,
          value?.split(":").slice(1)
        ),
      });
    }
  });
}

export function setErrorMessage(error) {
  if (!error) return "";
  return `${error}`;
}

export const getButtonClass = (condition, activeClass, inactiveClass = "") => {
  return condition ? activeClass : inactiveClass;
};

export const getPageFromURL = () => {
  const params = new URLSearchParams(window.location.search);
  return Number(params.get("page")) || 1;
};

export const getRedeemStatusStyles = (status) => {
  const statusStyles = {
    Successful: { bg: "bg-[#d9f3e1]", text: "text-[#05B035]" },
    successful: { bg: "bg-[#d9f3e1]", text: "text-[#05B035]" },
    "In Progress": { bg: "bg-[#fdf0e4]", text: "text-[#F2994A]" },
    Pending: { bg: "bg-[#e0ecfc]", text: "text-[#2F80ED]" },
    pending: { bg: "bg-[#e0ecfc]", text: "text-[#2F80ED]" },
    Cancelled: { bg: "bg-[#fcd9d9]", text: "text-[#E80000]" },
  };

  return statusStyles[status] || { bg: "bg-[#fcd9d9]", text: "text-[#E80000]" };
};

export const getStatusStyles = (status) => {
  const normalizedStatus = status?.toLowerCase();

  const styles = {
    redeemed: { bg: "bg-[#05B03526]", text: "text-[#05B035]" },
    expired: { bg: "bg-[#E8000026]", text: "text-[#E80000]" },
    active: { bg: "bg-[#2F80ED26]", text: "text-[#2F80ED]" },
    pending: { bg: "bg-[#F2994A26]", text: "text-[#F2994A]" },
    default: { bg: "bg-[#E8000026]", text: "text-[#E80000]" },
  };

  return styles[normalizedStatus] || styles.default;
};

export const findErrorMessage = (errors, data = [], fieldName) => {
  const keys = data.length > 0 ? data : [fieldName];
  let currentError = errors;

  for (const key of keys) {
    if (currentError?.[key]) {
      currentError = currentError[key];
    } else {
      return undefined;
    }
  }

  return currentError?.message || undefined;
};

export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

export function returnStep(data, setError, translate, currentFormStage, nextFormHandler) {
  const navigate = useNavigate();

  if (currentFormStage === DetailScreensStages.CompanyDetails) {
    return updateProfileStep1({ data, navigate, setError, translate, currentFormStage, nextFormHandler });
  }
  if (currentFormStage === DetailScreensStages.LocationDetails) {
    return updateProfileStep2({ data, navigate, setError, translate, currentFormStage, nextFormHandler });
  }
  if (currentFormStage === DetailScreensStages.BankDetails) {
    return updateProfileStep3({ data, navigate, setError, translate, currentFormStage, nextFormHandler });
  }

  return updateProfileStep1({ data, navigate, setError, translate, currentFormStage, nextFormHandler });
}

export const useClipboardCopy = () => {
  const inputRef = useRef(null);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    if (inputRef.current) {
      let textToCopy = "";

      if (inputRef.current instanceof HTMLInputElement) {
        textToCopy = inputRef.current.value;
      } else {
        textToCopy = inputRef.current.textContent || "";
      }

      try {
        await navigator.clipboard.writeText(textToCopy);
        setIsCopied(true);
      } catch (err) {
        setIsCopied(false);
      }
    }
  }, []);

  return { inputRef, handleCopy, isCopied };
};

export const formatPoints = (points) => {
  const num = Number(points);
  if (isNaN(num)) return "0";

  if (num >= 1000000) return (num / 1000000).toFixed(2) + "M";
  if (num >= 1000) return (num / 1000).toFixed(2) + "k";
  return num.toString();
};

export const fetchMyRewardsUtil = async ({
  dispatch,
  user,
  authLoading,
  setMyRewards,
}) => {
  if (authLoading) return;

  // ✅ FIXED: user.id — authSlice stores state.user = payload.data (the user object directly)
  // user? .user? id
  const uid = user?.id;
  if (!uid) return;

  const formData = new FormData();
  formData.append("uid", uid);

  try {
    const response = await dispatch(readMyRewards({ data: formData }));
    if (response?.payload?.data) {
      setMyRewards(response?.payload?.data);
    }
  } catch (err) {
    console.error("Error fetching my rewards:", err);
  }
};


