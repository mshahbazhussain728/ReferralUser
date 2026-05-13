import React, { useEffect } from "react";

export const ToastType = "error" | "success" | "info";

const Toast = ({ type, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  const iconClasses = {
    error: "text-red-200",
    success: "text-green-200",
    info: "text-blue-200",
  };

  return (
    <div className="toast-container fixed top-10 right-5 w-92 z-50">
      <div
        className={`toast rounded-xl shadow-lg px-4 py-3 border bg-white ${
          type === "error"
            ? "border-red"
            : type === "success"
            ? "border-green-700"
            : "border-yellow-500"
        }`}
      >
        <div>
          <div className="flex items-center justify-between space-x-2">
            <div className="flex items-center">
              <span className={`mr-5 ${iconClasses[type]}`}>
                {type === "error" && <ErrorIcon />}
                {type === "success" && <SuccessIcon />}
                {type === "info" && <InfoIcon />}
              </span>
              <p className="text-xs font-normal md:text-base md:font-medium md:tracking-wider truncate">
                {message}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ErrorIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_1994_11224)">
      <path
        d="M48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48C37.2548 48 48 37.2548 48 24Z"
        fill="#D03D4F"
        fillOpacity="0.08"
      />
      <g clipPath="url(#clip1_1994_11224)">
        <path
          d="M35.727 29.1355C35.5351 28.6546 34.9897 28.4204 34.5089 28.6123C34.028 28.8043 33.7938 29.3496 33.9858 29.8305C34.2298 30.4419 34.1498 31.1399 33.7717 31.6979C33.3934 32.2562 32.7877 32.5764 32.11 32.5764H15.8938C15.1546 32.5764 14.4981 32.1907 14.1377 31.5445C13.7767 30.8972 13.7936 30.1344 14.183 29.5039L22.2911 16.3763C22.6603 15.7786 23.2998 15.4217 24.0019 15.4217C24.704 15.4217 25.3435 15.7786 25.7127 16.3763L31.7093 26.0853C31.9814 26.5258 32.5591 26.6624 32.9995 26.3902C33.4399 26.1182 33.5765 25.5406 33.3044 25.1001L27.3077 15.3911C26.5945 14.2363 25.3587 13.5469 24.0019 13.5469C22.6451 13.5469 21.4093 14.2364 20.696 15.3911L12.5879 28.5187C11.8362 29.7358 11.8035 31.2084 12.5003 32.4577C13.1966 33.706 14.4651 34.4512 15.8938 34.4512H32.11C33.4196 34.4512 34.591 33.8309 35.3238 32.7495C36.0511 31.6762 36.2018 30.3251 35.727 29.1355Z"
          fill="#D03D4F"
        />
        <path
          d="M24.0023 30.7479C24.5201 30.7479 24.9397 30.3282 24.9397 29.8105C24.9397 29.2927 24.5201 28.873 24.0023 28.873H24.0019C23.4841 28.873 23.0647 29.2927 23.0647 29.8105C23.0647 30.3282 23.4846 30.7479 24.0023 30.7479Z"
          fill="#D03D4F"
        />
        <path
          d="M24.9393 26.5306V19.6405C24.9393 19.1228 24.5196 18.7031 24.0019 18.7031C23.4841 18.7031 23.0645 19.1228 23.0645 19.6405V26.5306C23.0645 27.0483 23.4841 27.468 24.0019 27.468C24.5196 27.468 24.9393 27.0483 24.9393 26.5306Z"
          fill="#D03D4F"
        />
      </g>
    </g>
    <defs>
      <clipPath id="clip0_1994_11224">
        <rect width="48" height="48" fill="white" />
      </clipPath>
      <clipPath id="clip1_1994_11224">
        <rect
          width="24"
          height="24"
          fill="white"
          transform="translate(12 12)"
        />
      </clipPath>
    </defs>
  </svg>
);

const SuccessIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="48" height="48" rx="24" fill="#D03D4F" fillOpacity="0.08" />
    <path
      d="M35 16.6484L27.1486 24.4999L35 32.351L32.3516 35L24.5001 27.1486L16.649 35L14 32.351L21.8514 24.4999L14 16.6484L16.649 14L24.5001 21.8514L32.3516 14L35 16.6484Z"
      fill="#D03D4F"
    />
  </svg>
);

const InfoIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="48" height="48" rx="24" fill="#D03D4F" fillOpacity="0.08" />
    <path
      d="M35 16.6484L27.1486 24.4999L35 32.351L32.3516 35L24.5001 27.1486L16.649 35L14 32.351L21.8514 24.4999L14 16.6484L16.649 14L24.5001 21.8514L32.3516 14L35 16.6484Z"
      fill="#D03D4F"
    />
  </svg>
);

export default Toast;
