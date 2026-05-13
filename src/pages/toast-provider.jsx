import React, { createContext, useContext, useState } from "react";
import Toast from "../base-component/ui/loadingEffect/custom-toast";

const ToastContext = createContext(undefined);

const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  const showError = (message) => {
    setToast({ type: "error", message });
  };

  const handleClose = () => {
    setToast(null);
  };

  globalThis.showError = showError;

  return (
    <ToastContext.Provider value={{ showError }}>
      {children}
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={handleClose}
        />
      )}
    </ToastContext.Provider>
  );
};

export default ToastProvider;

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
