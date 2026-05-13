import { formatDate } from "../../../utils/function";
import { getRedeemStatusStyles } from "../../../utils/utility";

export const RedeemHistoryTableRows = ({ data, onPaymentDetails, onChat }) => {
  return (
    <div className="overflow-y-visible flex flex-col gap-y-[10px]">
      {data?.map((item, index) => {
        const { text } = getRedeemStatusStyles(item?.status);

        const statusLower = (item?.status || "").toLowerCase().trim();
        const isPending = statusLower === "pending";

        return (
          <div
            key={item?.id || item?._id || index}
            className="bg-white rounded-[5px] py-[26px] px-10 grid grid-cols-[minmax(170px,_3fr)_minmax(170px,_3fr)_minmax(170px,_3fr)_minmax(170px,_170px)] items-center"
          >
            <span className="text-base font-medium">
              {formatDate(item?.createdAt)}
            </span>

            <span className="text-base font-medium flex items-center justify-center">
              {item?.points}
            </span>

            <div className="flex items-center justify-center">
              <button
                onClick={(e) => {
                  e.stopPropagation();

                  if (isPending) return;

                  onChat?.(item);
                }}
                disabled={isPending}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors inline-block ${
                  isPending
                    ? "bg-[#BABABA] text-white cursor-not-allowed opacity-60"
                    : "bg-[#009F44] hover:bg-[#008737] text-white cursor-pointer"
                }`}
              >
                Chat
              </button>
            </div>

            <div
              className="flex items-center justify-center cursor-pointer"
              onClick={() =>
                onPaymentDetails(
                  item?.createdAt,
                  item?.points,
                  item?.approvedDate,
                  item?.paymentMethod,
                  item?.paymentDate,
                  item?.status
                )
              }
            >
              <div className="px-[7.2px] py-[5px] min-w-[77px] max-w-[77px] rounded-[3px] text-center">
                <span className={`text-xs font-medium ${text}`}>
                  {item?.status}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};