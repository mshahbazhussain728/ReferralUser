import { Field } from "../../../utils/static";

export const LoginContactFormFields = (register, loading, control) => {
  let formField = [
    {
      containerClass: "mb-2",
      field: {
        type: Field.phone,
        id: "phoneNo",
        name: "phoneNo",
        control,
        className: "!px-4 h-[42px]",
      },
    },

    {
      containerClass: "mb-0 mt-10",
      field: {
        type: Field.button,
        id: "button",
        text: "Send Code",
        inputType: "submit",
        className: "rounded-[12px] w-full h-[50px] hover:bg-none",
        loading,
      },
    },
  ];

  return formField;
};

export const PhoneVarificationFormFields = (
  register,
  loading,
  control,
  onBack
) => {
  let formField = [
    {
      containerClass: "mb-[35px]",
      field: {
        type: Field.otpField,
        id: "otp",
        name: "otp",
        control,
      },
    },
    {
      field: {
        type: Field.span,
        text: "Did not receive a code?",
        containerClassName:
          "text-sm md:text-[22px] text-dark font-medium text-center hidden md:block",
        id: "info",
      },
    },

    {
      containerClass:
        "mb-0 mt-[35px] hidden md:flex items-center justify-center",
      field: {
        type: Field.button,
        id: "button",
        text: "RESEND",
        inputType: "button",
        onClick: onBack,
        className: "bg-none w-fit hover:bg-none text-primary",
        loading,
      },
    },

    {
      containerClass: "mb-0 mt-10",
      field: {
        type: Field.button,
        id: "button",
        text: "Verify Code",
        inputType: "submit",
        className: "rounded-xl w-full h-[50px] hover:bg-none",
        loading,
      },
    },

    {
      field: {
        type: Field.span,
        text: "Could not receive a verification code yet?",
        containerClassName:
          "text-sm md:text-[22px] text-dark font-medium text-center mt-[45px] md:hidden",
        id: "info",
      },
    },
    {
      field: {
        type: Field.span,
        text: "Resend code after 57s",
        containerClassName:
          "text-sm md:text-[22px] text-dark font-medium text-center mt-3 md:hidden",
        id: "info",
      },
    },
  ];

  return formField;
};
