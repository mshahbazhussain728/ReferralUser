import React from "react";
import { BaseModal } from "./base-modal";
import { Form } from "../../form/form";
import { useMyRewards } from "../../../hooks/myRewards/useMyRewards";

export const GetCouponModal = ({ onClose }) => {
  const { fields, onSubmit, handleSubmit, errors } = useMyRewards();

  return (
    <BaseModal
      onClose={onClose}
      containerClassName="w-full max-w-[341px] md:max-w-[478px] min-h-[472px]"
    >
      <div className="py-[25px] md:pt-[30px] md:pb-10 px-[22px] md:px-[64px] ">
        <p className="text-[22px] md:text-[28px] font-semibold text-[#000719] text-center mb-[18px]">
          Choose a coupon
        </p>

        <Form
          formFields={fields}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
        />
      </div>
    </BaseModal>
  );
}


