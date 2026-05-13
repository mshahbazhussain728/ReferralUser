// import rewIcon from "../../assets/svgs/rew-img.svg";
// import { IconButton } from "../../base-component/ui/button/icon-button";
// import { RewardBalanceIcon } from "../../assets/svgs/components/reward-balance-icon";
// import { formatPoints } from "../../utils/utility";

// export const RewardsCard = ({ cardAction, data }) => {
//   return (
//     <div className="bg-primary md:rounded-lg flex justify-between items-end pl-[30px] pr-[18px] pt-10 pb-[15px] md:py-[44px] md:pl-[56px] md:pr-[23px]">
//       <div className="flex flex-col">
//         <div className="flex items-baseline gap-x-2">
//           <span className="font-semibold text-[36px] md:text-[72px] text-white">
//             {formatPoints(data?.total)}
//           </span>
//           <span className="font-medium text-[15px] md:text-[28px] text-white">
//             Points
//           </span>
//         </div>
//         <div className="flex items-center gap-x-[10px]">
//           <RewardBalanceIcon iconClassName="#fff" size={24} />
//           <span className="font-medium text-sm md:text-[28px] text-white">
//             Rewards balance
//           </span>
//         </div>
//       </div>
//       <div className="relative">
//         <img
//           src={rewIcon}
//           alt="icon"
//           className="pr-[35px] w-[136px] h-[120px] md:w-fit md:h-fit md:pr-[71px]"
//         />
//         <div className="flex flex-col gap-y-[10px] md:gap-y-4 absolute bottom-0 right-[15px] md:right-0">
//           {cardAction?.map((item, index) => (
//             <IconButton
//               icon={item.icon}
//               key={index}
//               onClick={item.onClick}
//               text={item.text}
//               containerClassName="w-[160px] md:w-[210px]"
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };




import rewIcon from "../../assets/svgs/rew-img.svg";
import { IconButton } from "../../base-component/ui/button/icon-button";
import { RewardBalanceIcon } from "../../assets/svgs/components/reward-balance-icon";
import { formatPoints } from "../../utils/utility";

export const RewardsCard = ({ cardAction, data }) => {
  return (
    <div className="bg-primary md:rounded-lg flex justify-between items-end pl-[30px] pr-[18px] pt-10 pb-[15px] md:py-[44px] md:pl-[56px] md:pr-[23px]">
      <div className="flex flex-col">
        <div className="flex items-baseline gap-x-2">
          <span className="font-semibold text-[36px] md:text-[72px] text-white ml-[-24px]">
            {/* ✅ Changed data?.total to data?.active (same as Total Points Rewarded) */}
            {formatPoints(data?.active)}
          </span>
          <span className="font-medium text-[15px] md:text-[28px] text-white ml-[-5px]">
            Points
          </span>
        </div>
        <div className="flex items-center gap-x-[5px] ml-[-24px]">
          <RewardBalanceIcon iconClassName="#fff" size={24} />

          <span className="font-medium text-sm md:text-[28px] text-white">
            Rewards balance
          </span>
        </div>
      </div>
      <div className="relative">
        <img
          src={rewIcon}
          alt="icon"
          className="pr-[35px] w-[136px] h-[120px] md:w-fit md:h-fit md:pr-[71px]"
        />
        <div className="flex flex-col gap-y-[10px] md:gap-y-4 absolute bottom-0 right-[15px] md:right-0">
          {cardAction?.map((item, index) => (
            <IconButton
              icon={item.icon}
              key={index}
              onClick={item.onClick}
              text={item.text}
              containerClassName="w-[160px] md:w-[210px]"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

