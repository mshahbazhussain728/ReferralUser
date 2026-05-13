import { countries, Field } from "../../../utils/static";

export const SignUpFormFields = (register, loading, control) => {
  let formField = [
    {
      containerClass: "flex justify-center items-center mb-[18px]",
      field: {
        type: Field.profileUploadField,
        className: "!h-[165px] !w-[165px] !rounded-full border border-primary",
        id: "imageUrl",
        name: "imageUrl",
        control,
      },
    },

    {
      field: {
        type: Field.span,
        text: `Upload Profile Image`,
        containerClassName:
          "text-sm md:text-[22px] text-dark font-medium text-center",
        id: "info",
      },
    },

    {
      containerClass: "my-[22px]",
      field: {
        type: Field.input,
        id: "name",
        name: "name",
        inputType: "text",
        placeholder: "Enter Your Name",
        className: "w-full pl-[18px]",
        register,
      },
    },

    {
      field: {
        className: "pl-4 !border-[#BFBFBF]",
        type: Field.select,
        id: `country`,
        name: `country`,
        options:
          countries?.map((item) => ({
            label: item?.label,
            value: item?.value,
          })) || [],

        control,
      },
    },

    {
      containerClass: "mb-0 mt-[50px]",
      field: {
        type: Field.button,
        id: "button",
        text: "Set up Profile",
        inputType: "submit",
        className: "rounded-xl w-full h-[50px] hover:bg-none",
        loading,
      },
    },
  ];

  return formField;
};
