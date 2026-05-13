import { CustomLoader } from "../../base-component/ui/loadingEffect/custom-loader";
import { useMyRewards } from "../../hooks/myRewards/useMyRewards";
import { RewardsCard } from "./rewards-card";
import { RewardsPoints } from "./rewards-points";

export const MyRewards = () => {
  const { rewardsActions, myRewards, loading } = useMyRewards();
  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center">
          <CustomLoader />
        </div>
      ) : (
        <div className="md:bg-white md:p-[50px] md:border border-[#E0E0E0] rounded-lg h-full -mx-[18px] md:mb-[50px] md:pb-[254px] md:mx-0">
          <RewardsCard cardAction={rewardsActions} data={myRewards?.reward} />
          <RewardsPoints data={myRewards?.reward} />
        </div>
      )}
    </>
  );
};


