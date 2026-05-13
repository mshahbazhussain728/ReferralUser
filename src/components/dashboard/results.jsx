

// import { UsersIcon } from "../../assets/svgs/components/users-icon";
// import { DashboardCard } from "../../base-component/ui/dashboard-card";
// import { PointIcon } from "../../assets/svgs/components/point-icon";
// import { RedeeemHistoryIcon } from "../../assets/svgs/components/redeem-history-icon";
// import { MonthlyPremIcon } from "../../assets/svgs/components/monthly-prem-icon";
// import { YearlyPremIcon } from "../../assets/svgs/components/yearly-prem-icon";

// export const Results = ({ data }) => {
//   const points         = data?.points        ?? {};
//    const freeUsers      = data?.freeUsers     ?? 0;
//   const monthlyPremium = data?.monthlyPremium ?? 0;
//   const yearlyPremium  = data?.yearlyPremium  ?? 0;

//   const activePoints   = points?.active      ?? 0;
//   const redeemedPoints = points?.redeemed    ?? 0;
//   const totalPoints    = points?.total       ?? 0;

//   const cardData = [
//     {
//       points:  totalPoints,
//       title:   "Total Points Earned",
//       icon:    <PointIcon iconClassName="#1392A4" />,
//       bgColor: "#17A2B7",
//       link:    "/my-rewards",
//     },
//     {
//       points:  redeemedPoints,
//       title:   "Total Points Redeemed",
//       icon:    <PointIcon iconClassName="#F3B700" />,
//       bgColor: "#F3B700",
//       link:    "/my-rewards",
//     },
//     {
//       points:  activePoints,
//       title:   "Balance",
//       icon:    <RedeeemHistoryIcon iconClassName="#048345" />,
//       bgColor: "#0F9D58",
//       link:    "/my-rewards",
//     },
//     {
//       points:  freeUsers,
//       title:   "Free Users",
//       icon:    <UsersIcon iconClassName="#055860" />,
//       bgColor: "#055860",
//       link:    "/free-users",
//     },
//     {
//       points:  monthlyPremium,
//       title:   "Monthly Premium Users",
//       icon:    <MonthlyPremIcon iconClassName="#F31A1A" />,
//       bgColor: "#F31A1A",
//       link:    "/monthly-premium-users?status=subscribed",

//     },
//     {
//       points:  yearlyPremium,
//       title:   "Yearly Premium Users",
//       icon:    <YearlyPremIcon iconClassName="#9AA000" />,
//       bgColor: "#9AA000",
//       link:    "/yearly-premium-users?status=subscribed",

//     },
//   ];

//   return (
//     <div className="md:border border-[#E0E0E0] rounded-[14px] bg-white h-full pt-[18px] md:pt-10 md:px-[27px]">
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-[15px] md:gap-[31px] md:pb-[474px] items-stretch">
//         {cardData?.map((item, index) => (
//           <div key={index} className="h-full">
//             <DashboardCard
//               bgColor={item.bgColor}
//               icon={item.icon}
//               link={item.link}
//               points={item.points}
//               title={item.title}
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };



// // //free users 




// import { useSelector, useDispatch } from "react-redux";
// import { useEffect } from "react";
// import { readFreeUserListing } from "../../api/slices/freeUserSlice/freeUser";
// import { UsersIcon } from "../../assets/svgs/components/users-icon";
// import { DashboardCard } from "../../base-component/ui/dashboard-card";
// import { PointIcon } from "../../assets/svgs/components/point-icon";
// import { RedeeemHistoryIcon } from "../../assets/svgs/components/redeem-history-icon";
// import { MonthlyPremIcon } from "../../assets/svgs/components/monthly-prem-icon";
// import { YearlyPremIcon } from "../../assets/svgs/components/yearly-prem-icon";

// export const Results = ({ data }) => {
//   const dispatch     = useDispatch();
//   const user         = useSelector((state) => state?.auth?.user);
//   const authLoading  = useSelector((state) => state?.auth?.loading);
//   const freeUserStats = useSelector((state) => state?.freeUser?.freeUser?.stats);

//   // ✅ Fetch free user stats on mount if not already loaded
//   useEffect(() => {
//     if (authLoading || !user?.id) return;
//     if (freeUserStats?.totalUsers !== undefined && freeUserStats?.totalUsers !== 0) return; // already loaded

//     dispatch(readFreeUserListing({
//       params: { uid: user.id, page: 1, size: 10 },
//     }));
//   }, [user, authLoading]);

//   const points         = data?.points        ?? {};
//   const freeUsers      = freeUserStats?.totalUsers ?? data?.freeUsers ?? 0;
//   const monthlyPremium = data?.monthlyPremium ?? 0;
//   const yearlyPremium  = data?.yearlyPremium  ?? 0;

//   const activePoints   = points?.active      ?? 0;
//   const redeemedPoints = points?.redeemed    ?? 0;
//   const totalPoints    = points?.total       ?? 0;

//   const cardData = [
//     {
//       points:  totalPoints,
//       title:   "Total Earned Points",
//       icon:    <PointIcon iconClassName="#1392A4" />,
//       bgColor: "#17A2B7",
//       link:    "/my-rewards",
//     },
//     {
//       points:  redeemedPoints,
//       title:   "Total Redeemed Points",
//       icon:    <PointIcon iconClassName="#F3B700" />,
//       bgColor: "#F3B700",
//       link:    "/my-rewards",
//     },
//     {
//       points:  activePoints,
//       title:   "Total Wallet Balance",
//       icon:    <RedeeemHistoryIcon iconClassName="#048345" />,
//       bgColor: "#0F9D58",
//       link:    "/my-rewards",
//     },
//     {
//       points:  freeUsers,
//       title:   "Free Users",
//       icon:    <UsersIcon iconClassName="#055860" />,
//       bgColor: "#055860",
//       link:    "/free-users",
//     },
//     {
//       points:  monthlyPremium,
//       title:   "Monthly Premium Users",
//       icon:    <MonthlyPremIcon iconClassName="#F31A1A" />,
//       bgColor: "#F31A1A",
//       link:    "/monthly-premium-users?status=subscribed",
//     },
//     {
//       points:  yearlyPremium,
//       title:   "Yearly Premium Users",
//       icon:    <YearlyPremIcon iconClassName="#9AA000" />,
//       bgColor: "#9AA000",
//       link:    "/yearly-premium-users?status=subscribed",
//     },
//   ];

//   return (
//     <div className="md:border border-[#E0E0E0] rounded-[14px] bg-white h-full pt-[18px] md:pt-10 md:px-[27px]">
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-[15px] md:gap-[31px] md:pb-[474px] whitespace-normal">
//         {cardData?.map((item, index) => (
//           <div key={index} className="h-full">
//             <DashboardCard
//               bgColor={item.bgColor}
//               icon={item.icon}
//               link={item.link}
//               points={item.points}
//               title={item.title}
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };


/////



import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { readFreeUserListing } from "../../api/slices/freeUserSlice/freeUser";
import { UsersIcon } from "../../assets/svgs/components/users-icon";
import { DashboardCard } from "../../base-component/ui/dashboard-card";
import { PointIcon } from "../../assets/svgs/components/point-icon";
import { RedeeemHistoryIcon } from "../../assets/svgs/components/redeem-history-icon";
import { MonthlyPremIcon } from "../../assets/svgs/components/monthly-prem-icon";
import { YearlyPremIcon } from "../../assets/svgs/components/yearly-prem-icon";

export const Results = ({ data }) => {
  const dispatch      = useDispatch();
  const user          = useSelector((state) => state?.auth?.user);
  const authLoading   = useSelector((state) => state?.auth?.loading);
  const freeUserStats = useSelector((state) => state?.freeUser?.freeUser?.stats);

  useEffect(() => {
    if (authLoading || !user?.id) return;
    if (freeUserStats?.totalUsers !== undefined && freeUserStats?.totalUsers !== 0) return;

    dispatch(readFreeUserListing({
      params: { uid: user.id, page: 1, size: 10 },
    }));
  }, [user, authLoading]);

  const points         = data?.points        ?? {};
  const freeUsers      = freeUserStats?.totalUsers ?? data?.freeUsers ?? 0;
  const monthlyPremium = data?.monthlyPremium ?? 0;
  const yearlyPremium  = data?.yearlyPremium  ?? 0;

  const activePoints   = points?.active      ?? 0;
  const redeemedPoints = points?.redeemed    ?? 0;
  const totalPoints    = points?.total       ?? 0;

  const cardData = [
    {
      points:  totalPoints,
      title:   "Total Earned Points",
      icon:    <PointIcon iconClassName="#1392A4" />,
      bgColor: "#17A2B7",
      link:    "/my-rewards",
    },
    {
      points:  redeemedPoints,
      title:   "Total Redeemed Points",
      icon:    <PointIcon iconClassName="#F3B700" />,
      bgColor: "#F3B700",
      link:    "/my-rewards",
    },
    {
      points:  activePoints,
      title:   "Total Wallet Balance",
      icon:    <RedeeemHistoryIcon iconClassName="#048345" />,
      bgColor: "#0F9D58",
      link:    "/my-rewards",
    },
    {
      points:  freeUsers,
      title:   "Free Users",
      icon:    <UsersIcon iconClassName="#055860" />,
      bgColor: "#055860",
      link:    "/free-users",
    },
    {
      points:  monthlyPremium,
      title:   "Monthly Premium Users",
      icon:    <MonthlyPremIcon iconClassName="#F31A1A" />,
      bgColor: "#F31A1A",
      link:    "/monthly-premium-users?status=subscribed",
    },
    {
      points:  yearlyPremium,
      title:   "Yearly Premium Users",
      icon:    <YearlyPremIcon iconClassName="#9AA000" />,
      bgColor: "#9AA000",
      link:    "/yearly-premium-users?status=subscribed",
    },
  ];

  return (
    <div className="md:border border-[#E0E0E0] rounded-[14px] bg-white h-full pt-[18px] md:pt-10 md:px-[27px]">
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[15px] md:gap-[31px] pb-6 md:pb-10"
        style={{ gridAutoRows: "1fr" }}
      >
        {cardData?.map((item, index) => (
          <div key={index} className="flex flex-col">
            <DashboardCard
              bgColor={item.bgColor}
              icon={item.icon}
              link={item.link}
              points={item.points}
              title={item.title}
            />
          </div>
        ))}
      </div>
    </div>
  );
};