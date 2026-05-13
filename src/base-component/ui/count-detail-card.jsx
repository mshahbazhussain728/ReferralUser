import { RevenueIcon } from "../../assets/svgs/components/revenue-icon";
import { UsersIcon } from "../../assets/svgs/components/users-icon";

export const CountDetailCard = ({ title, points }) => {
  return (
    <div className="bg-white rounded-3 px-[10px] py-3 xMini:p-5">
      <div className="flex items-start gap-x-3">
        <div className="bg-[#691188] min-w-[39px] min-h-[39px] md:min-w-[71px] md:min-h-[71px] rounded-full flex items-center justify-center">
          {title === "Revenue" ? (
            <RevenueIcon iconClassName="w-[19px] h-[19px] md:w-[30px] md:h-[30px]" />
          ) : (
            <UsersIcon iconClassName="#fff" />
          )}
        </div>

        <div className="flex flex-col items-start gap-y-1">
          <span className="text-xs md:text-lg font-semibold text-[#A3AED0]">
            {title}
          </span>
          <span className="text-sm md:text-[22px] font-semibold text-[#002639]">
            {points}
          </span>
        </div>
      </div>
    </div>
  );
};

