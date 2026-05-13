// import { RewardBalanceIcon } from "../../assets/svgs/components/reward-balance-icon";
// import { BaseButton } from "../../base-component/ui/button/base-button";
// import { LinkButton } from "../../base-component/ui/button/link-icon";

// export const SendRequestField = ({ onSendRedeemRequest }) => {
//   return (
//     <div className="flex items-center gap-x-3">
//       <input
//         type="text"
//         placeholder="Enter points you want to redeem"
//         className="py-[10px] px-3 border border-[#BDBDBD] rounded-[5px] w-full text-xs font-medium outline-none focus:border-primary"
//       />
//       <div className="hidden md:block">
//         <LinkButton
//           icon={RewardBalanceIcon}
//           text="Send Request"
//           containerClassName="gap-x-[5px] px-[10px] h-[36px]"
//           size={20}
//           onClick={onSendRedeemRequest}
//         />
//       </div>

//       <BaseButton
//         text="Send Request"
//         onClick={onSendRedeemRequest}
//         containerClassName="p-[10px] text-[10px] text-white w-[150px] md:hidden"
//       />
//     </div>
//   );
// };

import { RewardBalanceIcon } from "../../assets/svgs/components/reward-balance-icon";
import { BaseButton } from "../../base-component/ui/button/base-button";
import { LinkButton } from "../../base-component/ui/button/link-icon";

export const SendRequestField = ({ onSendRedeemRequest }) => {
  return (
    <div className="w-full overflow-x-auto">
      <div className="flex items-start gap-3 min-w-[350px]">
        
        {/* Input Container with relative positioning */}
        <div className="flex-1 min-w-0 relative">
          <input
            type="text"
            placeholder="Enter points you want to redeem"
            className="w-full py-[10px] px-3 border border-[#BDBDBD] rounded-[5px] text-xs font-medium outline-none focus:border-primary"
          />
        </div>

        {/* Desktop Button - Fixed position */}
        <div className="hidden md:flex shrink-0 self-start">
          <LinkButton
            icon={RewardBalanceIcon}
            text="Send Request"
            containerClassName="gap-x-[5px] px-[12px] h-[36px] whitespace-nowrap"
            size={20}
            onClick={onSendRedeemRequest}
          />
        </div>

        {/* Mobile Button - Fixed position */}
        <div className="flex md:hidden shrink-0 self-start">
          <BaseButton
            text="Send"
            onClick={onSendRedeemRequest}
            containerClassName="px-4 h-[36px] text-white whitespace-nowrap"
          />
        </div>
      </div>
    </div>
  );
};