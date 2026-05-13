// // import { useState } from "react";
// // import { CopiedIcon } from "../../assets/svgs/components/copied-icon";
// // import { ShareIcon } from "../../assets/svgs/components/share-icon";

// // export const CopiedTextField = ({ couponCode, text, onShare }) => {
// //   const [isCopied, setIsCopied] = useState(false);

// //   const handleCopy = async () => {
// //     try {
// //       await navigator.clipboard.writeText(couponCode);
// //       setIsCopied(true);

// //       setTimeout(() => setIsCopied(false), 2000);
// //     } catch (err) {
// //       console.error("Failed to copy:", err);
// //     }
// //   };

// //   return (
// //     <div className="hidden md:flex items-center gap-x-[15px] border-[1.5px] border-primary rounded-[10px] py-2 md:py-[14px] px-4 md:px-[18px]">
// //       <p className="text-lg font-semibold text-primary">
// //         {text}: {couponCode}
// //       </p>
// //       <div className="flex items-center gap-x-3">
// //         <ShareIcon iconClassName="#691188" onClick={onShare} />
// //         <div onClick={handleCopy} className="cursor-pointer">
// //           <CopiedIcon iconClassName={isCopied ? "#691188" : "#c4c4c4"} />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };




// import { useState } from "react";
// import { CopiedIcon } from "../../assets/svgs/components/copied-icon";
// import { ShareIcon } from "../../assets/svgs/components/share-icon";

// export const CopiedTextField = ({ couponCode, text, onShare }) => {
//   const [isCopied, setIsCopied] = useState(false);

//   const handleCopy = async () => {
//     try {
//       await navigator.clipboard.writeText(couponCode);
//       setIsCopied(true);
//       setTimeout(() => setIsCopied(false), 2000);
//     } catch (err) {
//       console.error("Failed to copy:", err);
//     }
//   };

//   return (
//     <div className="flex items-center gap-x-[15px] border-[1.5px] border-primary rounded-[10px] py-2 md:py-[14px] px-4 md:px-[18px]">
//       <p className="text-lg font-semibold text-primary">
//         {text}: {couponCode}
//       </p>
//       <div className="flex items-center gap-x-3">
//         <ShareIcon iconClassName="#691188" onClick={onShare} />
//         <div onClick={handleCopy} className="cursor-pointer">
//           <CopiedIcon iconClassName={isCopied ? "#691188" : "#c4c4c4"} />
//         </div>
//       </div>
//     </div>
//   );
// };



import { useState } from "react";
import { CopiedIcon } from "../../assets/svgs/components/copied-icon";
import { ShareIcon } from "../../assets/svgs/components/share-icon";

export const CopiedTextField = ({ couponCode, text, onShare }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(couponCode);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="flex items-center gap-x-[15px] border-[1.5px] border-primary rounded-[10px] py-2 md:py-[14px] px-4 md:px-[18px]">
      <p className="text-sm md:text-lg font-semibold text-primary whitespace-nowrap">
        {text}: {couponCode}
      </p>
      {/* <div className="flex items-center gap-x-3">
        <ShareIcon iconClassName="#691188" onClick={onShare} />
        <div onClick={handleCopy} className="cursor-pointer">
          <CopiedIcon iconClassName={isCopied ? "#691188" : "#c4c4c4"} />
        </div> */}

<div className="flex items-center gap-x-3">
  <div onClick={onShare} className="cursor-pointer">
    <ShareIcon iconClassName="#691188" />
  </div>
  <div onClick={handleCopy} className="cursor-pointer">
    <CopiedIcon iconClassName={isCopied ? "#691188" : "#c4c4c4"} />
  </div>
</div>

      </div>
    // </div>
  );
};