// import { Field } from "../../utils/static";

// export const GetCouponFormFields = (register, loading) => {
//   let formField = [
//     {
//       containerClass: "mb-2",
//       field: {
//         value: "monthly",
//         id: `monthly`,
//         type: Field.radio,
//         colorClasses: "bg-transparent",
//         label: "Monthly coupon",
//         name: "couponType",
//         register,
//         labelClassName: "text-[20px] font-semibold text-primary",
//         onChange: () => {},
//       },
//     },

//     {
//       containerClass: "mb-0",
//       field: {
//         type: Field.span,
//         id: "yearly",
//         containerClassName: "font-normal text-base text-[#333333]",
//         text: "You will receive a monthly coupon worth 10 points, and it can be used for one month. After that, it will expire.",
//       },
//     },

//     {
//       containerClass: "my-5 px-[25px] md:px-[52px]",
//       field: {
//         type: Field.div,
//         id: "div-field",
//         className:
//           "overflow-hidden grid grid-cols-[minmax(105px,_105px)_minmax(10px,_10px)_minmax(105px,_105px)] gap-x-[10px] items-center",
//         children: [
//           {
//             containerClass: "border-lightGray border-b",
//             field: {
//               type: Field.span,
//               id: "border",
//             },
//           },

//           {
//             field: {
//               type: Field.span,
//               text: "Or",
//               containerClassName: "text-sm text-[#393939] font-normal",
//               id: "info",
//             },
//           },

//           {
//             containerClass: "border-lightGray border-b",
//             field: {
//               type: Field.span,
//               id: "border",
//             },
//           },
//         ],
//       },
//     },

//     {
//       containerClass: "mb-2",
//       field: {
//         value: "yearly",
//         id: `yearly`,
//         type: Field.radio,
//         colorClasses: "bg-transparent",
//         label: "Yearly coupon",
//         name: "couponType",
//         register,
//         labelClassName: "text-[20px] font-semibold text-primary",
//         onChange: () => {},
//       },
//     },

//     {
//       containerClass: "mb-0",
//       field: {
//         type: Field.span,
//         id: "yearly",
//         containerClassName: "font-normal text-base text-[#333333]",
//         text: "You will receive a yearly coupon worth 100 points, and it can be used for one year. After that, it will expire.",
//       },
//     },

//     {
//       containerClass: "mb-0 flex items-center justify-center mt-[35px]",
//       field: {
//         type: Field.button,
//         id: "button",
//         text: "Continue",
//         inputType: "submit",
//         className: "rounded-lg px-4 min-w-[152px] w-fit h-[50px]",
//         loading,
//       },
//     },
//   ];

//   return formField;
// };



///

import { Field } from "../../utils/static";

export const GetCouponFormFields = (register, loading, control) => {
  let formField = [
    {
      containerClass: "mb-2",
      field: {
        type: Field.radio,
        id: "monthly",
        value: "monthly",
        name: "couponType",
        colorClasses: "bg-transparent",
        label: "Monthly coupon",
        labelClassName: "text-[20px] font-semibold text-primary",
        register,
        control, // ✅ needed for Controller on Apple/Safari
      },
    },

    {
      containerClass: "mb-0",
      field: {
        type: Field.span,
        id: "monthly-desc",
        containerClassName: "font-normal text-base text-[#333333]",
        text: "You will receive a monthly coupon worth 10 points, and it can be used for one month. After that, it will expire.",
      },
    },

    {
      containerClass: "my-5 px-[25px] md:px-[52px]",
      field: {
        type: Field.div,
        id: "div-field",
        className:
          "overflow-hidden grid grid-cols-[minmax(105px,_105px)_minmax(10px,_10px)_minmax(105px,_105px)] gap-x-[10px] items-center",
        children: [
          {
            containerClass: "border-lightGray border-b",
            field: { type: Field.span, id: "border-left" },
          },
          {
            field: {
              type: Field.span,
              text: "Or",
              containerClassName: "text-sm text-[#393939] font-normal",
              id: "info",
            },
          },
          {
            containerClass: "border-lightGray border-b",
            field: { type: Field.span, id: "border-right" },
          },
        ],
      },
    },

    {
      containerClass: "mb-2",
      field: {
        type: Field.radio,
        id: "yearly",
        value: "yearly",
        name: "couponType",
        colorClasses: "bg-transparent",
        label: "Yearly coupon",
        labelClassName: "text-[20px] font-semibold text-primary",
        register,
        control, // ✅ needed for Controller on Apple/Safari
      },
    },

    {
      containerClass: "mb-0",
      field: {
        type: Field.span,
        id: "yearly-desc",
        containerClassName: "font-normal text-base text-[#333333]",
        text: "You will receive a yearly coupon worth 100 points, and it can be used for one year. After that, it will expire.",
      },
    },

    {
      containerClass: "mb-0 flex items-center justify-center mt-[35px]",
      field: {
        type: Field.button,
        id: "button",
        text: "Continue",
        inputType: "submit",
        className: "rounded-lg px-4 min-w-[152px] w-fit h-[50px]",
        loading,
      },
    },
  ];

  return formField;
};