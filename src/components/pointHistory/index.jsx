






// // import { useEmptyStates } from "../../utils/hooks";
// // import { PointHistoryTableRows } from "./table/table-rows";
// // import { PointHistoryTableHeadings } from "./table/table-heading";
// // import { Pagination } from "../../base-component/ui/pagination/pagination";
// // import { usePointHistory } from "../../hooks/pointHistory/usePointHistory";
// // import SelectField from "../../base-component/ui/fields/select-fields";
// // import { RecordCard } from "../../base-component/ui/record-card";
// // import { NoDataEmptyState } from "../../base-component/ui/loadingEffect/no-data-state";
// // import { CustomLoader } from "../../base-component/ui/loadingEffect/custom-loader";

// // export const PointHistory = () => {
// //   const {
// //     totalItems,
// //     loading,
// //     itemsPerPage,
// //     currentPage,
// //     headings,
// //     pointsHistory,
// //     currentPageRows,
// //     handlePageChange,
// //     hanldeSortChange,
// //     sort,
// //     totalCount,
// //   } = usePointHistory();

// //   // ✅ FIX: Pass loading so table shows loader or empty state correctly
// //   const CurrentComponent = useEmptyStates(
// //     <PointHistoryTableRows data={currentPageRows?.data} />,
// //     totalCount !== 0,
// //     loading
// //   );

// //   const sortOptions = [
// //     { label: "Name", value: "name" },
// //     { label: "Earned Points", value: "points" },
// //     { label: "Install Date", value: "installedDate" },
// //     { label: "Subscribed Date", value: "subscribedDate" },
// //   ];

// //   return (
// //     <>
// //       {/* ── Desktop Table ── */}
// //       <div className="hidden md:block">
// //         <PointHistoryTableHeadings
// //           headings={headings}
// //           handleSort={hanldeSortChange}
// //           sortValue={sort}
// //         />
// //         {CurrentComponent}
// //       </div>

// //       {/* ── Mobile Header + Sort ── */}
// //       <div className="flex items-center justify-between mt-[15px] mb-3 md:hidden">
// //         <p className="text-[20px] font-semibold">Users Listing</p>
// //         <SelectField
// //           handleChange={(value) => hanldeSortChange(value)}
// //           value={sort || "None"}
// //           options={sortOptions}
// //         />
// //       </div>

// //       {/* ── Mobile Cards ── */}
// //       {loading ? (
// //         <div className="flex justify-center items-center md:hidden">
// //           <CustomLoader />
// //         </div>
// //       ) : currentPageRows?.data?.length > 0 ? (
// //         <div className="md:hidden mb-10">
// //           {/* ✅ FIX: use currentPageRows.data instead of pointsHistory
// //               so mobile cards stay in sync with the paginated data */}
// //           <RecordCard data={currentPageRows?.data} isPointHistory={true} />
// //         </div>
// //       ) : (
// //         <div className="md:hidden mt-10">
// //           <NoDataEmptyState
// //             imgClassName="w-14 h-14"
// //             textClassName="text-lg"
// //             className="py-5 px-3 w-full"
// //           />
// //         </div>
// //       )}

// //       {/* ── Pagination (Desktop) ── */}
// //       {!loading && totalCount > 0 && (
// //         <div className="hidden md:block">
// //           <Pagination
// //             totalItems={totalItems}
// //             itemsPerPage={itemsPerPage}
// //             onPageChange={handlePageChange}
// //             currentPage={currentPage}
// //           />
// //         </div>
// //       )}
// //     </>
// //   );
// // };





import { useEmptyStates } from "../../utils/hooks";
import { PointHistoryTableRows } from "./table/table-rows";
import { PointHistoryTableHeadings } from "./table/table-heading";
import { Pagination } from "../../base-component/ui/pagination/pagination";
import { usePointHistory } from "../../hooks/pointHistory/usePointHistory";
import SelectField from "../../base-component/ui/fields/select-fields";
import { RecordCard } from "../../base-component/ui/record-card";
import { NoDataEmptyState } from "../../base-component/ui/loadingEffect/no-data-state";
import { CustomLoader } from "../../base-component/ui/loadingEffect/custom-loader";

export const PointHistory = () => {
  const {
    totalItems,
    loading,
    itemsPerPage,
    currentPage,
    headings,
    pointsHistory,
    currentPageRows,
    handlePageChange,
    hanldeSortChange,
    sort,
    totalCount,
  } = usePointHistory();

  const CurrentComponent = useEmptyStates(
    <PointHistoryTableRows data={currentPageRows?.data} />,
    totalCount !== 0,
    loading
  );

  const sortOptions = [
    { label: "Name", value: "name" },
    { label: "Earned Points", value: "points" },
    { label: "Install Date", value: "installedDate" },
    { label: "Subscribed Date", value: "subscribedDate" },
  ];

  return (
    <>
      {/* ── Desktop Table ── */}
      <div className="hidden md:block">
        <PointHistoryTableHeadings
          headings={headings}
          handleSort={hanldeSortChange}
          sortValue={sort}
        />
        {CurrentComponent}
      </div>

      {/* ── Mobile Header + Sort ── */}
      <div className="flex items-center justify-between mt-[15px] mb-3 md:hidden">
        <p className="text-[20px] font-semibold">Points Listing</p>
        <SelectField
          handleChange={(value) => hanldeSortChange(value)}
          value={sort || "None"}
          options={sortOptions}
        />
      </div>

      {/* ── Mobile Cards ── */}
      {loading ? (
        <div className="flex justify-center items-center md:hidden">
          <CustomLoader />
        </div>
      ) : currentPageRows?.data?.length > 0 ? (
        <div className="md:hidden mb-10">
          <RecordCard data={currentPageRows?.data} isPointHistory={true} />
        </div>
      ) : (
        <div className="md:hidden mt-10">
          <NoDataEmptyState
            imgClassName="w-14 h-14"
            textClassName="text-lg"
            className="py-5 px-3 w-full"
          />
        </div>
      )}

      {/* ── Pagination ── */}
      {!loading && totalCount > 0 && (
        <>
          {/* Mobile pagination (below md) */}
          <div className="md:hidden">
            <Pagination
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
              currentPage={currentPage}
            />
          </div>

          {/* Desktop pagination (md and above) */}
          <div className="hidden md:block">
            <Pagination
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
              currentPage={currentPage}
            />
          </div>
        </>
      )}
    </>
  );
};



