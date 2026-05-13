// // // // // import { BaseButton } from "../../base-component/ui/button/base-button";
// // // // // import appStoreIcon from "../../assets/pngs/app-store-icon.png";

// // // // // export const IosLinks = ({ iosHandler }) => {
// // // // //   const [handleRefLinkModal, handleRefDiscountCodeModal, handleQRCodeModal] =
// // // // //     iosHandler;

// // // // //   const linksData = [
// // // // //     {
// // // // //       text: "Show Referral link",
// // // // //       onClick: () => handleRefLinkModal("ios"),
// // // // //     },
// // // // //     {
// // // // //       text: "Show Discount code",
// // // // //       onClick: () => handleRefDiscountCodeModal("ios"),
// // // // //     },
// // // // //     {
// // // // //       text: "Show QR code",
// // // // //       onClick: () => handleQRCodeModal("ios"),
// // // // //     },
// // // // //   ];

// // // // //   return (
// // // // //     <div className="flex flex-col gap-y-4 pb-6 border-b border-b-[#E0E0E0] md:border-b-0">
// // // // //       <div className="flex flex-col gap-y-1 items-center">
// // // // //         <img src={appStoreIcon} alt="icon" className="h-[43px] w-[43px]" />
// // // // //         <span className="text-base font-bold text-[#055860]">iOS Appstore</span>
// // // // //       </div>

// // // // //       <div className="flex flex-col items-center gap-y-4">
// // // // //         {linksData?.map(({ text, onClick }, index) => (
// // // // //           <BaseButton
// // // // //             text={text}
// // // // //             onClick={onClick}
// // // // //             key={index}
// // // // //             containerClassName="w-[200px]"
// // // // //           />
// // // // //         ))}
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };





import { BaseButton } from "../../base-component/ui/button/base-button";
import appStoreIcon from "../../assets/pngs/app-store-icon.png";

export const IosLinks = ({ iosHandler }) => {
  const [handleRefLinkModal, handleRefDiscountCodeModal, handleQRCodeModal] =
    iosHandler;

  const linksData = [
    { text: "Show Referral link",   onClick: () => handleRefLinkModal("ios")         },
    // { text: "Show Discount code",   onClick: () => handleRefDiscountCodeModal("ios") },
    { text: "Show QR code",         onClick: () => handleQRCodeModal("ios")          },
  ];

  return (
    <div className="flex flex-col gap-y-4 pb-6 border-b border-b-[#E0E0E0] md:border-b-0">
      <div className="flex flex-col gap-y-1 items-center">
        <img src={appStoreIcon} alt="icon" className="h-[43px] w-[43px]" />
        <span className="text-base font-bold text-[#691188]">iOS Appstore</span>
      </div>
      <div className="flex flex-col items-center gap-y-4">
        {linksData?.map(({ text, onClick }, index) => (
          <BaseButton text={text} onClick={onClick} key={index} containerClassName="w-[200px]" />
        ))}
      </div>
    </div>
  );
};


