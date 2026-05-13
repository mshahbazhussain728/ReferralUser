

// import { Field } from "../../utils/static";

// export const RedeemRequestFormFields = (register, loading, control) => {
//   let formField = [
//     {
//       field: {
//         type: Field.div,
//         id: "div-field",
//         className: "flex items-start gap-x-3 w-full flex-nowrap",
//         children: [
//           {
//             containerClass: "mb-0 flex-1 min-w-0",
//             field: {
//               type: Field.input,
//               id: "points",
//               name: "points",
//               inputType: "number",
//               placeholder: "Enter points you want to redeem",
//               className: "w-full pl-[18px]",
//               register,
//               hideError: true, // Add this prop to hide inline errors if your Field component supports it
//             },
//           },

//           {
//             containerClass: "mb-0 flex-shrink-0 self-start",
//             field: {
//               type: Field.button,
//               id: "button",
//               text: "Send Request",
//               inputType: "submit",
//               className:
//                 "rounded-[4.8px] w-[140px] !h-10 xMini:!h-[48px] hover:bg-none whitespace-nowrap",
//               loading,
//             },
//           },
//         ],
//       },
//     },
//   ];

//   return formField;
// };




import { Field } from "../../utils/static";

export const RedeemRequestFormFields = (register, loading, control) => {
  let formField = [
    {
      field: {
        type: Field.div,
        id: "div-field",
        className: "flex items-start gap-x-3 w-full flex-nowrap",
        children: [
          {
            containerClass: "mb-0 flex-1 min-w-0",
            field: {
              type: Field.input,
              id: "points",
              name: "points",
              inputType: "number",
              placeholder: "Enter points you want to redeem",
              // className: "w-full pl-[18px]",
              className: "w-full pl-[18px] text-base",
              register,
            },
          },

          {
            containerClass: "mb-0 flex-shrink-0",
            field: {
              type: Field.button,
              id: "button",
              text: "Send Request",
              inputType: "submit",
              className:
                "rounded-[4.8px] w-[140px] !h-10 xMini:!h-[48px] hover:bg-none whitespace-nowrap",
              loading,
            },
          },
        ],
      },
    },
  ];

  return formField;
};
