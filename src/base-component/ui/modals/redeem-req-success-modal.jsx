import React from "react";
import { BaseModal } from "./base-modal";
import checkIcon from "../../../assets/svgs/check-icon.svg";
import { BaseButton } from "../button/base-button";

export const RedeemRequestSuccessModal = ({ onClose }) => {
  return (
    <BaseModal
      onClose={onClose}
      containerClassName="w-full max-w-[341px] md:max-w-[451px] min-h-fit"
    >
      <div className="pt-[28px] pb-6 md:py-[32px] px-[18px] md:px-[43px] flex flex-col items-center">
        <img src={checkIcon} alt="icon" />
        <p className="text-primary text-[22px] md:text-2xl font-bold mt-[15px]">
          Redeemed Successfully
        </p>

        <p className="font-medium text-[#333333] text-[15px] mb-[13px] mt-2 text-center">
          Your request has been sent to the admin successfully. You will be
          notified very soon with a response.
        </p>

        <BaseButton
          containerClassName="rounded-[10px] font-semibold text-lg text-white px-[57px] py-3"
          text="Done"
          onClick={onClose}
        />
      </div>
    </BaseModal>
  );
};
