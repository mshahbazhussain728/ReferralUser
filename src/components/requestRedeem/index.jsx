// // import { Form } from "../../base-component/form/form";
// // import { WarningIcon } from "../../assets/svgs/components/warning-icon";
// // import { useRedeemRequest } from "../../hooks/redeemRequest/useRedeemRequest";
// // import { RewardBalanceIcon } from "../../assets/svgs/components/reward-balance-icon";
// // import { CustomLoader } from "../../base-component/ui/loadingEffect/custom-loader";

// // export const RequestRedeem = () => {
// //   const {
// //     errors,
// //     fields,
// //     handleSubmit,
// //     onSubmit,
// //     myRewards,
// //     myRewardsLoading,
// //   } = useRedeemRequest();

// //   return (
// //     <>
// //       {myRewardsLoading ? (
// //         <div className="flex justify-center items-center">
// //           <CustomLoader />
// //         </div>
// //       ) : (
// //         <div className="flex items-center justify-center md:p-10 maxSize:py-[139px] maxSize:px-[185px]">
// //           <div className="pt-3 md:pt-[60px] md:pb-[126px] md:px-10 maxSize:px-[135px] md:bg-white md:border md:border-[#E0E0E0] rounded-lg h-screen">
// //             <p className="text-[20px] font-semibold mb-3">
// //               Redeem Reward Points
// //             </p>
// //             <div className="flex items-center justify-center rounded-lg bg-gradient-to-r from-[#691188] to-[#490063] py-[34px] md:py-[37px] md:px-[125px]">
// //               <div className="flex flex-col gap-y-3">
// //                 <div className="flex items-center gap-x-2 md:gap-x-[10px]">
// //                   <RewardBalanceIcon iconClassName="#fff" size={30} />
// //                   <span className="text-[36px] md:text-[38.4px] font-semibold text-white">
// //                     {myRewards?.reward?.active !== undefined &&
// //                     myRewards?.reward?.active !== null
// //                       ? myRewards?.reward?.active
// //                       : "--"}
// //                   </span>
// //                 </div>
// //                 <span className="text-base font-semibold text-white text-center">
// //                   Your total points
// //                 </span>
// //               </div>
// //             </div>

// //             <p className="text-[#333333] font-medium text-sm md:text-[15px] my-3 md:mt-[18px] md:mb-[14px]">
// //               You can redeem your points by sending a request to the admin and
// //               the admin will connect you for the payment withdrawal method.
// //             </p>

// //             <p className="text-base font-semibold text-primary">
// //               1 Point = 1 USD
// //             </p>

// //             <div className="mt-3 mb-[18px] border border-warning py-[9px] px-[11px] rounded-[4px] flex items-center gap-x-[6px] w-fit">
// //               <WarningIcon />
// //               <span className="font-medium text-xs text-warning">
// //                 Minimum redeem points is 100
// //               </span>
// //             </div>

// //             <Form
// //               formFields={fields}
// //               handleSubmit={handleSubmit}
// //               onSubmit={onSubmit}
// //               errors={errors}
// //             />
// //           </div>
// //         </div>
// //       )}
// //     </>
// //   );
// // };



import { Form } from "../../base-component/form/form";
import { WarningIcon } from "../../assets/svgs/components/warning-icon";
import { useRedeemRequest } from "../../hooks/redeemRequest/useRedeemRequest";
import { RewardBalanceIcon } from "../../assets/svgs/components/reward-balance-icon";
import { CustomLoader } from "../../base-component/ui/loadingEffect/custom-loader";

export const RequestRedeem = () => {
  const {
    errors,
    fields,
    handleSubmit,
    onSubmit,
    myRewards,
    myRewardsLoading,
  } = useRedeemRequest();

  return (
    <>
      {myRewardsLoading ? (
        <div className="flex justify-center items-center">
          <CustomLoader />
        </div>
      ) : (
        <div className="w-full px-4 py-6 md:px-10 md:py-10">
          <div className="w-full max-w-[680px] mx-auto pt-3 md:pt-[40px] md:pb-[60px] md:px-10 md:bg-white md:border md:border-[#E0E0E0] rounded-lg">
            
            <p className="text-[20px] font-semibold mb-3">
              Redeem Reward Points
            </p>

            {/* ── Points Card: full width, fixed height, no px blowout ── */}
            <div className="w-full flex items-center justify-center rounded-lg bg-gradient-to-r from-[#691188] to-[#490063] py-9 px-6">
              <div className="flex flex-col gap-y-3">
                <div className="flex items-center justify-center gap-x-3">
                  <RewardBalanceIcon iconClassName="#fff" size={28} />
                  <span className="text-[32px] font-semibold text-white leading-none">
                    {myRewards?.reward?.active !== undefined &&
                    myRewards?.reward?.active !== null
                      ? myRewards?.reward?.active
                      : "--"}
                  </span>
                </div>
                <span className="text-sm font-semibold text-white text-center">
                  Your total points
                </span>
              </div>
            </div>

            <p className="text-[#333333] font-medium text-sm mt-4 mb-3 leading-relaxed">
              You can redeem your points by sending a request to the admin and
              the admin will connect you for the payment withdrawal method.
            </p>

            <p className="text-base font-semibold text-primary mb-3">
              1 Point = 1 USD
            </p>

            <div className="mb-4 border border-warning py-2 px-3 rounded-[4px] flex items-center gap-x-[6px] w-fit">
              <WarningIcon />
              <span className="font-medium text-xs text-warning">
                Minimum redeem points is 100
              </span>
            </div>

            <Form
              formFields={fields}
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              errors={errors}
            />
          </div>
        </div>
      )}
    </>
  );
};

