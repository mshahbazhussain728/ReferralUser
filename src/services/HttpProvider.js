


// import axios from "axios";
// import { logout } from "../utils/auth";
// import { toast } from "react-toastify";
// import Cookies from "js-cookie";

// const RAW_DOMAIN = import.meta.env.VITE_API_DOMAIN || "https://apis.famocare.com";
// export const BASEURL = `${RAW_DOMAIN.replace(/\/$/, "")}/api/referralsystem`;

// // ── Silent Messages ───────────────────────────────────────────────────────────
// // const SILENT_MESSAGES = [
// //   "invalid coupon type",
// //   "must be",
// //   "invalid sort field",
// //   "allowed values",
// //   "user id is required",
// // ];

// const SILENT_MESSAGES = [
//   "invalid coupon type",
//   "must be",
//   "invalid sort field",
//   "allowed values",
//   "user id is required",
//   "points record not found",  // ← Add this so it doesn't toast as generic error
// ];



// // ── Silent URLs ───────────────────────────────────────────────────────────────
// const SILENT_URLS = [
//   "referrals/apps/links",
//   "auth/upload-profile-picture",
// ];

// const isSilentError = (message) => {
//   if (!message) return false;
//   return SILENT_MESSAGES.some((m) => message.toLowerCase().includes(m));
// };

// const isSilentUrl = (url) => {
//   if (!url) return false;
//   return SILENT_URLS.some((u) => url.includes(u));
// };

// // ── Request Headers ───────────────────────────────────────────────────────────
// export async function getApiRequestHeader(data) {
//   const accessToken = Cookies.get("accessToken");
//   const baseHeaders = { Accept: "application/json" };

//   if (accessToken) {
//     baseHeaders["Authorization"] = `Bearer ${accessToken}`;
//   }

//   if (data instanceof FormData) {
//     return baseHeaders;
//   }

//   return { ...baseHeaders, "Content-Type": "application/json" };
// }

// // ── Axios Instance ────────────────────────────────────────────────────────────
// const instance = axios.create({
//   baseURL: BASEURL,
//   timeout: 60000,
//   withCredentials: false,
// });

// instance.interceptors.response.use(
//   (response) => response,
//   (error) => Promise.reject(error)
// );

// // ── Update Headers ────────────────────────────────────────────────────────────
// export async function updateHeaders(data) {
//   const header = await getApiRequestHeader(data);
//   instance.defaults.headers = header;
// }

// // ── Shared Error Handlers ─────────────────────────────────────────────────────
// function handleErrorToast(url, status, message) {
//   if (isSilentUrl(url)) return;
//   if (status === 400 || status === 404) return;
//   if (!isSilentError(message)) {
//     toast.error(message || "Something went wrong. Please try again.");
//   }
// }

// function handleAuthError(error) {
//   if (error?.response?.data?.code === 401) {
//     logout();
//     window.location.href = "/";
//   }
// }

// // ── Core Request ──────────────────────────────────────────────────────────────
// export async function request({ method, url, data, headers }) {
//   if (headers === undefined) {
//     await updateHeaders(data);
//   }

//   try {
//     const response = await instance[method](url, data);
//     return response;
//   } catch (error) {
//     const message = error?.response?.data?.message;
//     const status  = error?.response?.status;

//     handleErrorToast(url, status, message);
//     handleAuthError(error);

//     throw error;
//   }
// }

// // ── Delete with Body ──────────────────────────────────────────────────────────
// export async function deleteRequestWithBody({ method, url, data, headers }) {
//   if (headers === undefined) {
//     await updateHeaders();
//   }

//   try {
//     const response = await instance[method](url, data);
//     return response;
//   } catch (error) {
//     const message = error?.response?.data?.message;
//     const status  = error?.response?.status;

//     handleErrorToast(url, status, message);
//     handleAuthError(error);

//     throw error.response;
//   }
// }

// // ── New Request ───────────────────────────────────────────────────────────────
// export async function newRequest({ method, url, data, headers }) {
//   if (headers === undefined) {
//     await updateHeaders();
//   }

//   try {
//     const response = await instance[method](url, data);
//     const statusCode =
//       response?.status?.toString() ?? response?.data?.status?.toString();

//     if (!statusCode?.startsWith("2")) {
//       throw { response };
//     }

//     return response.data;
//   } catch (error) {
//     const message = error?.response?.data?.message;
//     const status  = error?.response?.status;

//     handleErrorToast(url, status, message);
//     handleAuthError(error);

//     throw error.response;
//   }
// }

// // ── GET ───────────────────────────────────────────────────────────────────────
// export async function get(url, params = {}, featureAndAction, config = {}) {
//   const { filter, ...otherParams } = params;
//   let queryParams = {};

//   if (config.detail) {
//     url = `${url}/${filter}`;
//     return request({
//       method: "get",
//       url,
//       data: { featureAndAction },
//       ...config,
//     });
//   }

//   if (filter && !url.includes("filter")) {
//     queryParams.filter = JSON.stringify(filter);
//   }

//   for (const key in otherParams) {
//     if (otherParams[key] !== undefined && otherParams[key] !== null) {
//       if (!url.includes(key)) {
//         queryParams[key] = otherParams[key];
//       }
//     }
//   }

//   const queryString = new URLSearchParams(queryParams).toString();
//   const fullUrl = queryString ? `${url}?${queryString}` : url;

//   return request({
//     method: "get",
//     url: fullUrl,
//     data: { featureAndAction },
//     ...config,
//   });
// }

// // ── DELETE ────────────────────────────────────────────────────────────────────
// export async function del(url, params, config) {
//   return request({ method: "delete", url, data: { params }, ...config });
// }

// export async function delWithReqBody(url, data, config) {
//   return deleteRequestWithBody({
//     method: "delete",
//     url,
//     data: { data },
//     ...config,
//   });
// }

// // ── POST ──────────────────────────────────────────────────────────────────────
// export async function post(url, data, featureAndAction, config, file) {
//   return request({ method: "post", url, data, ...config, file });
// }

// // ── PUT ───────────────────────────────────────────────────────────────────────
// export async function put(url, data, config) {
//   return newRequest({ method: "put", url, data, ...config });
// }

// // ── PATCH ─────────────────────────────────────────────────────────────────────
// export async function patch(url, data, config) {
//   return newRequest({ method: "patch", url, data, ...config });
// }

// // ── Independent Request ───────────────────────────────────────────────────────
// export const independentRequest = async (url, method, data) => {
//   try {
//     const response = await axios[method](url, data);
//     return response;
//   } catch (error) {
//     throw error.response;
//   }
// };


///



// import axios from "axios";
// import { logout } from "../utils/auth";
// import { toast } from "react-toastify";
// import Cookies from "js-cookie";

// const RAW_DOMAIN = import.meta.env.VITE_API_DOMAIN || "https://apis.famocare.com";
// export const BASEURL = `${RAW_DOMAIN.replace(/\/$/, "")}/api/referralsystem`;

// // ── Silent Messages ───────────────────────────────────────────────────────────
// const SILENT_MESSAGES = [
//   "invalid coupon type",
//   "must be",
//   "invalid sort field",
//   "allowed values",
//   "user id is required",
//   "points record not found",
// ];

// // ── Silent URLs ───────────────────────────────────────────────────────────────
// const SILENT_URLS = [
//   "referrals/apps/links",
//   "auth/upload-profile-picture",
//   "referrals/coupon/add",
// ];

// const isSilentError = (message) => {
//   if (!message) return false;
//   return SILENT_MESSAGES.some((m) => message.toLowerCase().includes(m));
// };

// const isSilentUrl = (url) => {
//   if (!url) return false;
//   return SILENT_URLS.some((u) => url.includes(u));
// };

// // ── Request Headers ───────────────────────────────────────────────────────────
// export async function getApiRequestHeader(data) {
//   const accessToken = Cookies.get("accessToken");
//   const baseHeaders = { Accept: "application/json" };

//   if (accessToken) {
//     baseHeaders["Authorization"] = `Bearer ${accessToken}`;
//   }

//   if (data instanceof FormData) {
//     return baseHeaders;
//   }

//   return { ...baseHeaders, "Content-Type": "application/json" };
// }

// // ── Axios Instance ────────────────────────────────────────────────────────────
// const instance = axios.create({
//   baseURL: BASEURL,
//   timeout: 60000,
//   withCredentials: false,
// });

// instance.interceptors.response.use(
//   (response) => response,
//   (error) => Promise.reject(error)
// );

// // ── Update Headers ────────────────────────────────────────────────────────────
// export async function updateHeaders(data) {
//   const header = await getApiRequestHeader(data);
//   instance.defaults.headers = header;
// }

// // ── Shared Error Handlers ─────────────────────────────────────────────────────
// function handleErrorToast(url, status, message) {
//   if (isSilentUrl(url)) return;
//   if (status === 400 || status === 404) return;
//   if (!isSilentError(message)) {
//     toast.error(message || "Something went wrong. Please try again.");
//   }
// }

// function handleAuthError(error) {
//   if (error?.response?.data?.code === 401) {
//     logout();
//     window.location.href = "/";
//   }
// }

// // ── Core Request ──────────────────────────────────────────────────────────────
// export async function request({ method, url, data, headers }) {
//   if (headers === undefined) {
//     await updateHeaders(data);
//   }

//   try {
//     const response = await instance[method](url, data);
//     return response;
//   } catch (error) {
//     const message = error?.response?.data?.message;
//     const status  = error?.response?.status;

//     // ✅ This is where it lives
//     if (url?.includes("referrals/coupon/add") && status === 404) {
//       toast.warn("Insufficient active points to create the coupon.", { icon: false });
//       throw error;
//     }

//     handleErrorToast(url, status, message);
//     handleAuthError(error);

//     throw error;
//   }
// }




// // ── Delete with Body ──────────────────────────────────────────────────────────
// export async function deleteRequestWithBody({ method, url, data, headers }) {
//   if (headers === undefined) {
//     await updateHeaders();
//   }

//   try {
//     const response = await instance[method](url, data);
//     return response;
//   } catch (error) {
//     const message = error?.response?.data?.message;
//     const status  = error?.response?.status;

//     handleErrorToast(url, status, message);
//     handleAuthError(error);

//     throw error.response;
//   }
// }

// // ── New Request ───────────────────────────────────────────────────────────────
// export async function newRequest({ method, url, data, headers }) {
//   if (headers === undefined) {
//     await updateHeaders();
//   }

//   try {
//     const response = await instance[method](url, data);
//     const statusCode =
//       response?.status?.toString() ?? response?.data?.status?.toString();

//     if (!statusCode?.startsWith("2")) {
//       throw { response };
//     }

//     return response.data;
//   } catch (error) {
//     const message = error?.response?.data?.message;
//     const status  = error?.response?.status;

//     handleErrorToast(url, status, message);
//     handleAuthError(error);

//     throw error.response;
//   }
// }

// // ── GET ───────────────────────────────────────────────────────────────────────
// export async function get(url, params = {}, featureAndAction, config = {}) {
//   const { filter, ...otherParams } = params;
//   let queryParams = {};

//   if (config.detail) {
//     url = `${url}/${filter}`;
//     return request({
//       method: "get",
//       url,
//       data: { featureAndAction },
//       ...config,
//     });
//   }

//   if (filter && !url.includes("filter")) {
//     queryParams.filter = JSON.stringify(filter);
//   }

//   for (const key in otherParams) {
//     if (otherParams[key] !== undefined && otherParams[key] !== null) {
//       if (!url.includes(key)) {
//         queryParams[key] = otherParams[key];
//       }
//     }
//   }

//   const queryString = new URLSearchParams(queryParams).toString();
//   const fullUrl = queryString ? `${url}?${queryString}` : url;

//   return request({
//     method: "get",
//     url: fullUrl,
//     data: { featureAndAction },
//     ...config,
//   });
// }

// // ── DELETE ────────────────────────────────────────────────────────────────────
// export async function del(url, params, config) {
//   return request({ method: "delete", url, data: { params }, ...config });
// }

// export async function delWithReqBody(url, data, config) {
//   return deleteRequestWithBody({
//     method: "delete",
//     url,
//     data: { data },
//     ...config,
//   });
// }

// // ── POST ──────────────────────────────────────────────────────────────────────
// export async function post(url, data, featureAndAction, config, file) {
//   return request({ method: "post", url, data, ...config, file });
// }

// // ── PUT ───────────────────────────────────────────────────────────────────────
// export async function put(url, data, config) {
//   return newRequest({ method: "put", url, data, ...config });
// }

// // ── PATCH ─────────────────────────────────────────────────────────────────────
// export async function patch(url, data, config) {
//   return newRequest({ method: "patch", url, data, ...config });
// }

// // ── Independent Request ───────────────────────────────────────────────────────
// export const independentRequest = async (url, method, data) => {
//   try {
//     const response = await axios[method](url, data);
//     return response;
//   } catch (error) {
//     throw error.response;
//   }
// };



/////updated


import axios from "axios";
import { logout } from "../utils/auth";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const RAW_DOMAIN = import.meta.env.VITE_API_DOMAIN || "https://apis.famocare.com";
export const BASEURL = `${RAW_DOMAIN.replace(/\/$/, "")}/api/referralsystem`;

// ── Silent Messages ───────────────────────────────────────────────────────────
const SILENT_MESSAGES = [
  "invalid coupon type",
  "must be",
  "invalid sort field",
  "allowed values",
  "user id is required",
  "points record not found",
];

// ── Silent URLs ───────────────────────────────────────────────────────────────
// ⚠️ Removed "referrals/coupon/add" from here — we need custom error handling for it
const SILENT_URLS = [
  "referrals/apps/links",
  "auth/upload-profile-picture",
];

const isSilentError = (message) => {
  if (!message) return false;
  return SILENT_MESSAGES.some((m) => message.toLowerCase().includes(m));
};

const isSilentUrl = (url) => {
  if (!url) return false;
  return SILENT_URLS.some((u) => url.includes(u));
};

// ── Helper: detect coupon add URL ─────────────────────────────────────────────
const isCouponAddUrl = (url) =>
  typeof url === "string" && url.includes("referrals/coupon/add");

// ── Request Headers ───────────────────────────────────────────────────────────
export async function getApiRequestHeader(data) {
  const accessToken = Cookies.get("accessToken");
  const baseHeaders = { Accept: "application/json" };

  if (accessToken) {
    baseHeaders["Authorization"] = `Bearer ${accessToken}`;
  }

  if (data instanceof FormData) {
    return baseHeaders;
  }

  return { ...baseHeaders, "Content-Type": "application/json" };
}

// ── Axios Instance ────────────────────────────────────────────────────────────
const instance = axios.create({
  baseURL: BASEURL,
  timeout: 60000,
  withCredentials: false,
});

instance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

// ── Update Headers ────────────────────────────────────────────────────────────
export async function updateHeaders(data) {
  const header = await getApiRequestHeader(data);
  instance.defaults.headers = header;
}

// ── Shared Error Handlers ─────────────────────────────────────────────────────
function handleErrorToast(url, status, message) {
  if (isSilentUrl(url)) return;
  if (status === 400 || status === 404) return;
  if (!isSilentError(message)) {
    toast.error(message || "Something went wrong. Please try again.");
  }
}

function handleAuthError(error) {
  if (error?.response?.data?.code === 401) {
    logout();
    window.location.href = "/";
  }
}

// ── Core Request ──────────────────────────────────────────────────────────────
export async function request({ method, url, data, headers }) {
  if (headers === undefined) {
    await updateHeaders(data);
  }

  try {
    const response = await instance[method](url, data);
    return response;
  } catch (error) {
    // Safely extract status and message from wherever axios puts them
    const status  = error?.response?.status  ?? error?.status;
    const message = error?.response?.data?.message ?? error?.message;

    // ── Coupon Add: insufficient points ──────────────────────────────────────
    // Must be checked FIRST, before any silent-URL suppression,
    // because the old code had this URL in SILENT_URLS which blocked the toast.
    if (isCouponAddUrl(url)) {
      if (status === 404 || status === 400) {
        // Show the user-friendly warning regardless of the exact status code.
        // Some backends return 400 for business-rule failures, so we cover both.
        toast.warn("Insufficient active points to create the coupon.", {
          icon: false,
          toastId: "coupon-insufficient-points", // prevents duplicate toasts
        });
      } else {
        // For any other error on this URL, fall through to generic handler
        handleErrorToast(url, status, message);
      }

      handleAuthError(error);
      throw error;
    }

    // ── All other URLs ────────────────────────────────────────────────────────
    handleErrorToast(url, status, message);
    handleAuthError(error);

    throw error;
  }
}

// ── Delete with Body ──────────────────────────────────────────────────────────
export async function deleteRequestWithBody({ method, url, data, headers }) {
  if (headers === undefined) {
    await updateHeaders();
  }

  try {
    const response = await instance[method](url, data);
    return response;
  } catch (error) {
    const message = error?.response?.data?.message;
    const status  = error?.response?.status;

    handleErrorToast(url, status, message);
    handleAuthError(error);

    throw error.response;
  }
}

// ── New Request ───────────────────────────────────────────────────────────────
export async function newRequest({ method, url, data, headers }) {
  if (headers === undefined) {
    await updateHeaders();
  }

  try {
    const response = await instance[method](url, data);
    const statusCode =
      response?.status?.toString() ?? response?.data?.status?.toString();

    if (!statusCode?.startsWith("2")) {
      throw { response };
    }

    return response.data;
  } catch (error) {
    const message = error?.response?.data?.message;
    const status  = error?.response?.status;

    handleErrorToast(url, status, message);
    handleAuthError(error);

    throw error.response;
  }
}

// ── GET ───────────────────────────────────────────────────────────────────────
export async function get(url, params = {}, featureAndAction, config = {}) {
  const { filter, ...otherParams } = params;
  let queryParams = {};

  if (config.detail) {
    url = `${url}/${filter}`;
    return request({
      method: "get",
      url,
      data: { featureAndAction },
      ...config,
    });
  }

  if (filter && !url.includes("filter")) {
    queryParams.filter = JSON.stringify(filter);
  }

  for (const key in otherParams) {
    if (otherParams[key] !== undefined && otherParams[key] !== null) {
      if (!url.includes(key)) {
        queryParams[key] = otherParams[key];
      }
    }
  }

  const queryString = new URLSearchParams(queryParams).toString();
  const fullUrl = queryString ? `${url}?${queryString}` : url;

  return request({
    method: "get",
    url: fullUrl,
    data: { featureAndAction },
    ...config,
  });
}

// ── DELETE ────────────────────────────────────────────────────────────────────
export async function del(url, params, config) {
  return request({ method: "delete", url, data: { params }, ...config });
}

export async function delWithReqBody(url, data, config) {
  return deleteRequestWithBody({
    method: "delete",
    url,
    data: { data },
    ...config,
  });
}

// ── POST ──────────────────────────────────────────────────────────────────────
export async function post(url, data, featureAndAction, config, file) {
  return request({ method: "post", url, data, ...config, file });
}

// ── PUT ───────────────────────────────────────────────────────────────────────
export async function put(url, data, config) {
  return newRequest({ method: "put", url, data, ...config });
}

// ── PATCH ─────────────────────────────────────────────────────────────────────
export async function patch(url, data, config) {
  return newRequest({ method: "patch", url, data, ...config });
}

// ── Independent Request ───────────────────────────────────────────────────────
export const independentRequest = async (url, method, data) => {
  try {
    const response = await axios[method](url, data);
    return response;
  } catch (error) {
    throw error.response;
  }
};