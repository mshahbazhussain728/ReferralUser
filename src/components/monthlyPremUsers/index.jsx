




// // import { useEmptyStates } from "../../utils/hooks";
// // import { MonthlyPremUsersTableRows } from "./table/table-rows";
// // import { Pagination } from "../../base-component/ui/pagination/pagination";
// // import { MonthlyPremUserTableHeadings } from "./table/table-heading";
// // import { useMonthlyUses } from "../../hooks/monthly-users/useMonthlyUsers";
// // import { DetailCards } from "../freeUser/detail-card";
// // import { RecordCard } from "../../base-component/ui/record-card";
// // import { NoDataEmptyState } from "../../base-component/ui/loadingEffect/no-data-state";
// // import SelectField from "../../base-component/ui/fields/select-fields";
// // import { CustomLoader } from "../../base-component/ui/loadingEffect/custom-loader";

// // export const MonthlyPremUsers = () => {
// //   const {
// //     dummyData,
// //     totalCount,
// //     totalItems,
// //     loading,
// //     itemsPerPage,
// //     currentPage,
// //     headings,
// //     pageTitle,
// //     sort,
// //     mobilePageTitle,
// //     tableRows,
// //     handlePageChange,
// //     hanldeSortChange,
// //     isSubPage,
// //   } = useMonthlyUses();

// //   const CurrentComponent = useEmptyStates(
// //     <MonthlyPremUsersTableRows data={tableRows} isSubPage={isSubPage} />,
// //     totalCount !== 0,
// //     loading
// //   );

// //   return (
// //     <>
// //       <DetailCards dummyData={dummyData} />

// //       <div className="hidden md:block">
// //         <MonthlyPremUserTableHeadings
// //           headings={headings}
// //           handleSort={hanldeSortChange}
// //           sortValue={sort}
// //           isSubPage={isSubPage}
// //         />
// //         {CurrentComponent}
// //       </div>

// //       <div className="flex items-center justify-between mt-[15px] mb-3 md:hidden">
// //         <p className="text-[20px] font-semibold min-w-fit">{mobilePageTitle}</p>
// //         <SelectField
// //           handleChange={(value) => hanldeSortChange(value)}
// //           value={sort || "None"}
// //           options={
// //             isSubPage
// //               ? [
// //                   { label: "Name",       value: "name"          },
// //                   { label: "Installed",  value: "installedDate" },
// //                   { label: "Subscribed", value: "startDate"     },
// //                   { label: "Plan Type",  value: "planType"      },
// //                   { label: "Status",     value: "status"        },
// //                 ]
// //               : [
// //                   { label: "Name",   value: "name"      },
// //                   { label: "Joined", value: "createdAt" },
// //                   { label: "Status", value: "status"    },
// //                 ]
// //           }
// //           containerClassName="w-[350px]"
// //         />
// //       </div>

// //       {loading ? (
// //         <div className="flex justify-center items-center md:hidden">
// //           <CustomLoader />
// //         </div>
// //       ) : tableRows?.length > 0 ? (
// //         <div className="md:hidden mb-10">
// //           <RecordCard data={tableRows} pageTitle={pageTitle} />
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

// //       {!loading && tableRows?.length > 0 && (
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
import { MonthlyPremUsersTableRows } from "./table/table-rows";
import { Pagination } from "../../base-component/ui/pagination/pagination";
import { MonthlyPremUserTableHeadings } from "./table/table-heading";
import { useMonthlyUses } from "../../hooks/monthly-users/useMonthlyUsers";
import { DetailCards } from "../freeUser/detail-card";
import { RecordCard } from "../../base-component/ui/record-card";
import { NoDataEmptyState } from "../../base-component/ui/loadingEffect/no-data-state";
import SelectField from "../../base-component/ui/fields/select-fields";
import { CustomLoader } from "../../base-component/ui/loadingEffect/custom-loader";

export const MonthlyPremUsers = () => {
  const {
    dummyData,
    totalCount,
    totalItems,
    loading,
    itemsPerPage,
    currentPage,
    headings,
    pageTitle,
    sort,
    mobilePageTitle,
    tableRows,
    handlePageChange,
    hanldeSortChange,
    isSubPage,
  } = useMonthlyUses();

  const CurrentComponent = useEmptyStates(
    <MonthlyPremUsersTableRows data={tableRows} isSubPage={isSubPage} />,
    totalCount !== 0,
    loading
  );

  return (
    <>
      <DetailCards dummyData={dummyData} />

      {/* ── Desktop Table ── */}
      <div className="hidden md:block">
        <MonthlyPremUserTableHeadings
          headings={headings}
          handleSort={hanldeSortChange}
          sortValue={sort}
          isSubPage={isSubPage}
        />
        {CurrentComponent}
      </div>

      {/* ── Mobile Header + Sort ── */}
      <div className="flex items-center justify-between mt-[15px] mb-3 md:hidden">
        <p className="text-[20px] font-semibold min-w-fit">{mobilePageTitle}</p>
        <SelectField
          handleChange={(value) => hanldeSortChange(value)}
          value={sort || "None"}
          options={
            isSubPage
              ? [
                  { label: "Name",       value: "name"          },
                  { label: "Installed",  value: "installedDate" },
                  { label: "Subscribed", value: "startDate"     },
                  { label: "Plan Type",  value: "planType"      },
                  { label: "Status",     value: "status"        },
                ]
              : [
                  { label: "Name",   value: "name"      },
                  { label: "Joined", value: "createdAt" },
                  { label: "Status", value: "status"    },
                ]
          }
          containerClassName="w-[350px]"
        />



      </div>

      {/* ── Mobile Content ── */}
      {loading ? (
        <div className="flex justify-center items-center md:hidden">
          <CustomLoader />
        </div>
      ) : tableRows?.length > 0 ? (
        <>
          <div className="md:hidden mb-10">
            <RecordCard data={tableRows} pageTitle={pageTitle} />
          </div>

          {/* Mobile Pagination */}
          <div className="md:hidden">
            <Pagination
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
              currentPage={currentPage}
            />
          </div>
        </>
      ) : (
        <div className="md:hidden mt-10">
          <NoDataEmptyState
            imgClassName="w-14 h-14"
            textClassName="text-lg"
            className="py-5 px-3 w-full"
          />
        </div>
      )}

      {/* ── Desktop Pagination ── */}
      {!loading && tableRows?.length > 0 && (
        <div className="hidden md:block">
          <Pagination
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            currentPage={currentPage}
          />
        </div>
      )}
    </>
  );
};


