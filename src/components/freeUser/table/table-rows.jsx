// // import profile from "../../../assets/pngs/profile.jpg";
// // import { formatDate } from "../../../utils/function";

// // export const FreeUsersTableRows = ({ data }) => {
// //   return (
// //     <div className={`overflow-y-visible flex flex-col gap-y-[10px]`}>
// //       {data?.map((item, index) => (
// //         <div
// //           key={index}
// //           className="bg-white hover:bg-tableHoverColor rounded-[5px] py-[10px] px-[15px] grid grid-cols-[minmax(200px,_4fr)_minmax(170px,_3fr)_minmax(100px,_100px)] items-center"
// //         >
// //           <div className="flex items-center gap-x-[18px]">
// //             <img
// //               src={item?.image || profile}
// //               alt="profile"
// //               className="min-w-[50px] min-h-[50px] max-w-[50px] max-h-[50px] rounded-full object-cover"
// //             />
// //             <span className="text-base font-medium">{item?.name}</span>
// //           </div>

// //           <span className="text-base font-medium">
// //             {formatDate(item?.installedDate)}
// //           </span>
// //           <span className="text-base font-medium">Free</span>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // };




// // import profile from "../../../assets/pngs/profile.jpg";
// // import { formatDate } from "../../../utils/function";

// // export const FreeUsersTableRows = ({ data }) => {
// //   return (
// //     <div className={`overflow-y-visible flex flex-col gap-y-[10px]`}>
// //       {data && data.length > 0 ? (
// //         data.map((item, index) => (
// //           <div
// //             key={item?.id || index}
// //             className="bg-white hover:bg-tableHoverColor rounded-[5px] py-[10px] px-[15px] grid grid-cols-5 gap-x-4 items-center"
// //           >
// //             {/* Column 1: Name with Image */}
// //             <div className="flex items-center gap-x-[18px] min-w-0">
// //               <img
// //                 src={item?.image || profile}
// //                 alt="profile"
// //                 className="min-w-[50px] min-h-[50px] max-w-[50px] max-h-[50px] rounded-full object-cover"
// //               />
// //               <span className="text-base font-medium truncate">{item?.name}</span>
// //             </div>

// //             {/* Column 2: Phone */}
// //             <div className="flex items-center min-w-0 ml-[20px]">
// //               <span className="text-base font-medium truncate">
// //                 {item?.phoneCode} {item?.phoneNo}
// //               </span>
// //             </div>

// //             {/* Column 3: Installed Date */}
// //             <div className="flex items-center ml-[14px] whitespace-nowrap">
// //               <span className="text-base font-medium">
// //                 {formatDate(item?.installedDate)}
// //               </span>
// //             </div>

// //             {/* Column 4: Balance */}
// //             <div className="flex items-center ml-[80px]">
// //               <span className="text-base font-medium">{item?.balance || "0"}</span>
// //             </div>

// //             {/* Column 5: Status/Type */}
// //             <div className="flex items-center ml-[60px]">
// //               <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
// //                 {item?.type || "N/A"}
// //               </span>
// //             </div>
// //           </div>
// //         ))
// //       ) : (
// //         <div className="text-center py-8 text-gray-500">
// //           No users found
// //         </div>
// //       )}
// //     </div>
// //   );
// // };





import profile from "../../../assets/pngs/profile.jpg";
import { formatDate } from "../../../utils/function";

// Check if image URL is valid (must start with http/https)
const getImage = (img) => {
  if (!img) return profile;
  if (img.startsWith("http://") || img.startsWith("https://")) return img;
  return profile;
};

export const FreeUsersTableRows = ({ data }) => {
  return (
    <div className="overflow-y-visible flex flex-col gap-y-[10px]">
      {data && data.length > 0 ? (
        data.map((item, index) => (
          <div
            key={item?.id || index}
            className="bg-white hover:bg-tableHoverColor rounded-[5px] py-[10px] px-[15px] grid grid-cols-4 gap-x-4 items-center"
          >
            {/* Column 1: Name with Image */}
            <div className="flex items-center gap-x-[18px] min-w-0">
              <img
                src={getImage(item?.image)}
                alt="profile"
                className="min-w-[50px] min-h-[50px] max-w-[50px] max-h-[50px] rounded-full object-cover"
              />
              <span className="text-base font-medium truncate">
                {item?.name || "N/A"}
              </span>
            </div>

            {/* Column 2: Email */}
            <div className="flex items-center justify-center min-w-0">
              <span className="text-base font-medium truncate">
                {item?.email || "N/A"}
              </span>
            </div>

            {/* Column 3: Installed Date */}
            <div className="flex items-center justify-center whitespace-nowrap">
              <span className="text-base font-medium">
                {formatDate(item?.installedDate || item?.createdAt)}
              </span>
            </div>

            {/* Column 4: Status */}
            <div className="flex items-center justify-center">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                {item?.userType || item?.status || "Free"}
              </span>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-8 text-gray-500">No users found</div>
      )}
    </div>
  );
};


