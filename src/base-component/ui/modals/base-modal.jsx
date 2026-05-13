import React from "react";
import { Backdrop } from "../backdrop/backdrop";
import { motion } from "framer-motion";
import { combineClasses } from "../../../utils/utility";

export const BaseModal = ({
  children,
  onClose,
  containerClassName,
  customOpacity,
}) => {
  const defaultContainerClasses =
    "rounded-[21px] bg-[#FAFBFD] w-[964px] max-w-[964px] min-h-[615px] max-h-[615px]";
  const containerClasses = combineClasses(
    defaultContainerClasses,
    containerClassName
  );

  return (
    <Backdrop onClose={onClose} customOpacity={customOpacity}>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.3 }}
        className={containerClasses}
      >
        {children}
      </motion.div>
    </Backdrop>
  );
};
