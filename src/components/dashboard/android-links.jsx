







// import { BaseButton } from "../../base-component/ui/button/base-button";
// import playStoreIcon from "../../assets/pngs/play-store-icon.png";

// export const AndriodLinks = ({ iosHandler }) => {
//   const [handleRefLinkModal, handleRefDiscountCodeModal, handleQRCodeModal] =
//     iosHandler;

//   const linksData = [
//     { text: "Show Referral link",   onClick: () => handleRefLinkModal("android")         },
//     // { text: "Show Discount code",   onClick: () => handleRefDiscountCodeModal("android") },
//     { text: "Show QR code",         onClick: () => handleQRCodeModal("android")          },
//   ];

//   return (
//     <div className="flex flex-col gap-y-4">
//       <div className="flex flex-col gap-y-1 items-center">
//         <img src={playStoreIcon} alt="icon" className="h-[43px] w-[43px]" />
//         <span className="text-base font-bold text-[#055860]">Android Playstore</span>
//       </div>
//       <div className="flex flex-col items-center gap-y-4">
//         {linksData?.map(({ text, onClick }, index) => (
//           <BaseButton text={text} onClick={onClick} key={index} containerClassName="w-[200px]" />
//         ))}
//       </div>
//     </div>
//   );
// };



// ///


import { BaseButton } from "../../base-component/ui/button/base-button";
import playStoreIcon from "../../assets/pngs/play-store-icon.png";

export const AndriodLinks = ({ iosHandler }) => {
  const [handleRefLinkModal, handleRefDiscountCodeModal, handleQRCodeModal] =
    iosHandler;

  const linksData = [
    { text: "Show Referral link", onClick: () => handleRefLinkModal("android") },
    // { text: "Show Discount code", onClick: () => handleRefDiscountCodeModal("android") },
    { text: "Show QR code",       onClick: () => handleQRCodeModal("android")  },
  ];

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-col gap-y-1 items-center">
        <img src={playStoreIcon} alt="icon" className="h-[40px] w-[40px]" />
        <span className="text-base font-bold text-[#691188]">Android Playstore</span>
         
      </div>
      <div className="flex flex-col items-center gap-y-4">
        {linksData?.map(({ text, onClick }, index) => (
          <BaseButton text={text} onClick={onClick} key={index} containerClassName="w-[200px]" />
        ))}
      </div>
    </div>
  );
};