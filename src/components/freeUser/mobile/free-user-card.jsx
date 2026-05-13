import { formatDate } from "../../../utils/function";

export const FreeUserCard = ({ data }) => {
  return (
    <div className="flex flex-col gap-y-3">
      {data?.map((item, index) => {
        return (
          <div
            key={index}
            className="pl-[15px] py-[15px] rounded-[12px] bg-white shadow-md flex gap-x-2"
          >
            <img
              src={item?.image}
              alt="profile"
              className="rounded-[5px] min-w-[59px] min-h-[63px] max-w-[59px] max-h-[63px] object-cover"
            />
            <div className="flex flex-col gap-y-[5px]">
              <p className="text-base font-semibold">{item?.name}</p>
              <div className="flex items-center gap-x-1">
                <span className="text-xs text-[#848484] font-medium">
                  Status
                </span>
                <span className="text-xs text-primary font-medium">
                  {/* {item?.status} */}
                  Free
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-xs text-[#848484] font-medium min-w-[70px]">
                  Installed on:
                </span>
                <span className="text-xs text-black font-medium">
                  {formatDate(item?.installedDate)}
                </span>
              </div>
            </div>
          </div>
        );
      })}

      {data?.length > 0 && (
        <p className="text-center text-gray-500 text-sm mt-3">
          No more data available
        </p>
      )}
    </div>
  );
};


