// // import { CountDetailCard } from "../../base-component/ui/count-detail-card";

// // export const DetailCards = ({ dummyData }) => {
// //   return (
// //     <div className="grid grid-cols-2 xMaxSize:grid-cols-4 gap-[28px] mt-[15px] md:mt-0 md:mb-[28px]">
// //       {dummyData?.map((item, index) => {
// //         return (
// //           <CountDetailCard
// //             points={item.points}
// //             title={item.title}
// //             key={index}
// //           />
// //         );
// //       })}
// //     </div>
// //   );
// // };




import { CountDetailCard } from "../../base-component/ui/count-detail-card";

export const DetailCards = ({ dummyData }) => {
  // Handle empty data
  if (!dummyData || dummyData.length === 0) {
    return (
      <div className="grid grid-cols-2 xMaxSize:grid-cols-4 gap-[28px] mt-[15px] md:mt-0 md:mb-[28px]">
        <div className="col-span-full text-center text-gray-500 py-8">
          No data available
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 xMaxSize:grid-cols-4 gap-[28px] mt-[15px] md:mt-0 md:mb-[28px]">
      {dummyData.map((item, index) => (
        <CountDetailCard
          key={`detail-card-${item.title}-${index}`}
          points={item.points}
          title={item.title}
          icon={item.icon}
          color={item.color}
          trend={item.trend}
        />
      ))}
    </div>
  );
};

