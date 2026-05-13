




// import { useEmptyStates } from "../../utils/hooks";
// import { CouponHistoryTableRows } from "./table/table-rows";
// import { CouponHistoryTableHeadings } from "./table/table-heading";
// import { Pagination } from "../../base-component/ui/pagination/pagination";
// import { useCouponHistory } from "../../hooks/couponHistory/useCouponHistory";
// import SelectField from "../../base-component/ui/fields/select-fields";
// import { CouponDetailsCard } from "../../base-component/ui/coupon-details-card";
// import { NoDataEmptyState } from "../../base-component/ui/loadingEffect/no-data-state";
// import { CustomLoader } from "../../base-component/ui/loadingEffect/custom-loader";

// export const CouponHistory = () => {
//   const {
//     totalItems,
//     loading,
//     itemsPerPage,
//     currentPage,
//     headings,
//     currentPageRows,
//     handlePageChange,
//     hanldeSortChange,
//     sort,
//     totalCount,
//   } = useCouponHistory();

//   // Desktop table uses useEmptyStates — unchanged
//   const CurrentComponent = useEmptyStates(
//     <CouponHistoryTableRows data={currentPageRows} />,
//     totalCount !== 0,
//     loading
//   );

//   return (
//     <>
//       {/* ─── Desktop Table (md and above) ─────────────────────────── */}
//       <div className="hidden md:block">
//         <CouponHistoryTableHeadings
//           headings={headings}
//           handleSort={hanldeSortChange}
//           sortValue={sort}
//           isRedeem={true}
//         />
//         {CurrentComponent}
//       </div>

//       {/* ─── Mobile Header + Sort (below md) ──────────────────────── */}
//       <div className="flex items-center justify-between mt-[15px] mb-3 md:hidden">
//         <p className="text-[20px] font-semibold">Redeemed Listing</p>
//         <SelectField
//           handleChange={(value) => hanldeSortChange(value)}
//           value={sort || "None"}
//           options={[
//             { label: "Type", value: "type" },
//             { label: "Coupons", value: "coupon" },
//             { label: "Redeemed Date", value: "createdAt" },
//             { label: "Status", value: "status" },
//           ]}
//         />
//       </div>

//       {/* ─── Mobile Content (below md) ────────────────────────────── */}
//       {loading ? (
//         <div className="flex justify-center items-center md:hidden">
//           <CustomLoader />
//         </div>
//       ) : currentPageRows.length > 0 ? (
//         <div className="md:hidden mb-10">
//           {/* Pass each row individually so CouponDetailsCard
//               reads the correct status per card, not a shared/stale value */}
//           {currentPageRows.map((row, idx) => (
//             <CouponDetailsCard key={row.id ?? idx} data={[row]} />
//           ))}
//         </div>
//       ) : (
//         <div className="md:hidden mt-10">
//           <NoDataEmptyState
//             imgClassName="w-14 h-14"
//             textClassName="text-lg"
//             className="py-5 px-3 w-full"
//           />
//         </div>
//       )}

//       {/* ─── Pagination ────────────────────────────────────────────── */}
//       {/* FIX: was `hidden md:block` — only showed on desktop.
//           Now shows on mobile (block) AND desktop, hidden only during loading */}
//       {!loading && totalItems > 0 && (
//         <div>
//           {/* Mobile pagination (sm/md only) */}
//           <div className="md:hidden">
//             <Pagination
//               totalItems={totalItems}
//               itemsPerPage={itemsPerPage}
//               onPageChange={handlePageChange}
//               currentPage={currentPage}
//             />
//           </div>

//           {/* Desktop pagination (md and above) */}
//           <div className="hidden md:block">
//             <Pagination
//               totalItems={totalItems}
//               itemsPerPage={itemsPerPage}
//               onPageChange={handlePageChange}
//               currentPage={currentPage}
//             />
//           </div>
//         </div>
//       )}
//     </>
//   );
// };







///////




import { useEmptyStates } from "../../utils/hooks";
import { CouponHistoryTableRows } from "./table/table-rows";
import { CouponHistoryTableHeadings } from "./table/table-heading";
import { Pagination } from "../../base-component/ui/pagination/pagination";
import { useCouponHistory } from "../../hooks/couponHistory/useCouponHistory";
import SelectField from "../../base-component/ui/fields/select-fields";
import { CouponDetailsCard } from "../../base-component/ui/coupon-details-card";
import { NoDataEmptyState } from "../../base-component/ui/loadingEffect/no-data-state";
import { CustomLoader } from "../../base-component/ui/loadingEffect/custom-loader";

export const CouponHistory = () => {
  const {
    totalItems,
    loading,
    itemsPerPage,
    currentPage,
    headings,
    currentPageRows,
    handlePageChange,
    hanldeSortChange,
    sort,
    totalCount,
    totalPages,
  } = useCouponHistory();

  // ✅ Strict last page check — only true when totalPages is known and currentPage matches
  const isLastPage = totalPages > 0 && currentPage === totalPages;

  // Desktop table uses useEmptyStates — unchanged
  const CurrentComponent = useEmptyStates(
    <CouponHistoryTableRows data={currentPageRows} />,
    totalCount !== 0,
    loading
  );

  return (
    <>
      {/* ─── Desktop Table (md and above) ─────────────────────────── */}
      <div className="hidden md:block">
        <CouponHistoryTableHeadings
          headings={headings}
          handleSort={hanldeSortChange}
          sortValue={sort}
          isRedeem={true}
        />
        {CurrentComponent}
      </div>

      {/* ─── Mobile Header + Sort (below md) ──────────────────────── */}
      <div className="flex items-center justify-between mt-[15px] mb-3 md:hidden">
        <p className="text-[20px] font-semibold">Coupon Listing</p>
        <SelectField
          handleChange={(value) => hanldeSortChange(value)}
          value={sort || "None"}
          options={[
            { label: "Type", value: "type" },
            { label: "Coupons", value: "coupon" },
            { label: "Redeemed Date", value: "createdAt" },
            { label: "Status", value: "status" },
          ]}
        />
      </div>

      {/* ─── Mobile Content (below md) ────────────────────────────── */}
      {loading ? (
        <div className="flex justify-center items-center md:hidden">
          <CustomLoader />
        </div>
      ) : currentPageRows.length > 0 ? (
        <div className="md:hidden mb-10">
          {currentPageRows.map((row, idx) => (
            <CouponDetailsCard key={row.id ?? idx} data={[row]} />
          ))}

          {/* ✅ Only show on the last page, after all cards */}
          {isLastPage && (
            <p className="text-center text-gray-500 text-sm mt-3">
              No more data available
            </p>
          )}
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

      {/* ─── Pagination ────────────────────────────────────────────── */}
      {!loading && totalItems > 0 && (
        <div>
          {/* Mobile pagination */}
          <div className="md:hidden">
            <Pagination
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
              currentPage={currentPage}
            />
          </div>

          {/* Desktop pagination */}
          <div className="hidden md:block">
            <Pagination
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
              currentPage={currentPage}
            />
          </div>
        </div>
      )}
    </>
  );
};