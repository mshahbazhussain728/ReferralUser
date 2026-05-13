



// // import { DetailCards } from "./detail-card";
// // import { useEmptyStates } from "../../utils/hooks";
// // import { FreeUserCard } from "./mobile/free-user-card";
// // import { FreeUsersTableRows } from "./table/table-rows";
// // import { FreeUsersTableHeadings } from "./table/table-heading";
// // import { useFreeUser } from "../../hooks/free-users/userFreeUser";
// // import SelectField from "../../base-component/ui/fields/select-fields";
// // import { Pagination } from "../../base-component/ui/pagination/pagination";
// // import { NoDataEmptyState } from "../../base-component/ui/loadingEffect/no-data-state";
// // import { CustomLoader } from "../../base-component/ui/loadingEffect/custom-loader";

// // export const FreeUserListing = () => {
// //   const {
// //     dummyData,
// //     loading,
// //     itemsPerPage,
// //     currentPage,
// //     headings,
// //     currentPageRows,
// //     handlePageChange,
// //     totalCount,
// //     totalPages,
// //     sort,
// //     handleSortChange,
// //   } = useFreeUser();

// //   // Desktop view with table
// //   const CurrentComponent = useEmptyStates(
// //     <FreeUsersTableRows data={currentPageRows} />,
// //     totalCount !== 0,
// //     loading
// //   );

// //   return (
// //     <>
// //       {/* Stats Cards */}
// //       <DetailCards dummyData={dummyData} />

// //       {/* Desktop Table View */}
// //       <div className="hidden md:block">
// //         {/* Table Headings */}
// //         <FreeUsersTableHeadings
// //           headings={headings}
// //           handleSort={handleSortChange}
// //           sortValue={sort}
// //         />

// //         {/* Table Rows or Loading/Empty State */}
// //         {CurrentComponent}

// //         {/* Pagination */}
// //         {!loading && totalCount > 0 && (
// //           <div className="mt-6">
// //             <Pagination
// //               totalItems={totalCount}
// //               itemsPerPage={itemsPerPage}
// //               onPageChange={handlePageChange}
// //               currentPage={currentPage}
// //             />
// //           </div>
// //         )}
// //       </div>

// //       {/* Mobile View */}
// //       <div className="md:hidden">
// //         {/* Mobile Header with Sort */}
// //         <div className="flex items-center justify-between mt-[15px] mb-3">
// //           <p className="text-[20px] font-semibold min-w-[123px]">User Listing</p>

// //           <SelectField
// //             handleChange={(value) => handleSortChange(value)}
// //             value={sort || "None"}
// //             options={[
// //               {
// //                 label: "Name",
// //                 value: "name",
// //               },
// //               {
// //                 label: "Install Date",
// //                 value: "installedDate",
// //               },
// //             ]}
// //             containerClassName="w-[350px]"
// //           />
// //         </div>

// //         {/* Mobile Loading State */}
// //         {loading ? (
// //           <div className="flex justify-center items-center">
// //             <CustomLoader />
// //           </div>
// //         ) : currentPageRows && currentPageRows.length > 0 ? (
// //           // Mobile Card View
// //           <div className="mb-10">
// //             <FreeUserCard data={currentPageRows} />
// //           </div>
// //         ) : (
// //           // Mobile Empty State
// //           <div className="mt-10">
// //             <NoDataEmptyState
// //               imgClassName="w-14 h-14"
// //               textClassName="text-lg"
// //               className="py-5 px-3 w-full"
// //             />
// //           </div>
// //         )}

// //         {/* Mobile Pagination */}
// //         {!loading && totalCount > 0 && (
// //           <div className="mt-6 mb-10">
// //             <Pagination
// //               totalItems={totalCount}
// //               itemsPerPage={itemsPerPage}
// //               onPageChange={handlePageChange}
// //               currentPage={currentPage}
// //             />
// //           </div>
// //         )}
// //       </div>
// //     </>
// //   );
// // };







import { DetailCards } from "./detail-card";
import { useEmptyStates } from "../../utils/hooks";
import { FreeUserCard } from "./mobile/free-user-card";
import { FreeUsersTableRows } from "./table/table-rows";
import { FreeUsersTableHeadings } from "./table/table-heading";
import { useFreeUser } from "../../hooks/free-users/userFreeUser";
import SelectField from "../../base-component/ui/fields/select-fields";
import { Pagination } from "../../base-component/ui/pagination/pagination";
import { NoDataEmptyState } from "../../base-component/ui/loadingEffect/no-data-state";
import { CustomLoader } from "../../base-component/ui/loadingEffect/custom-loader";

export const FreeUserListing = () => {
  const {
    dummyData,
    loading,
    itemsPerPage,
    currentPage,
    headings,
    tableRows,        // ← updated from currentPageRows
    handlePageChange,
    totalCount,
    totalPages,
    sort,
    handleSortChange,
  } = useFreeUser();

  const CurrentComponent = useEmptyStates(
    <FreeUsersTableRows data={tableRows} />,
    totalCount !== 0,
    loading
  );

  return (
    <>
      {/* Stats Cards */}
      <DetailCards dummyData={dummyData} />

      {/* Desktop Table View */}
      <div className="hidden md:block">
        <FreeUsersTableHeadings
          headings={headings}
          handleSort={handleSortChange}
          sortValue={sort}
        />

        {CurrentComponent}

        {!loading && totalCount > 0 && (
          <div className="mt-6">
            <Pagination
              totalItems={totalCount}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
              currentPage={currentPage}
            />
          </div>
        )}
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mt-[15px] mb-3">
          <p className="text-[20px] font-semibold min-w-[123px]">User Listing</p>
          {/* <SelectField
            handleChange={(value) => handleSortChange(value)}
            value={sort || "None"}
            options={[
              { label: "Name",   value: "name"      },
              { label: "Joined", value: "createdAt" },
              { label: "Status", value: "status"    },
            ]}
            containerClassName="w-[350px]"
          /> */}

          <SelectField
  handleChange={(value) => handleSortChange(value)}
  value={sort || "None"}
  options={[
    { label: "Name",   value: "name"      },
    { label: "Email",  value: "email"     },  
    { label: "Joined", value: "createdAt" },
    { label: "Status", value: "status"    },
  ]}
  containerClassName="w-[350px]"
/>
        </div>

        {loading ? (
          <div className="flex justify-center items-center">
            <CustomLoader />
          </div>
        ) : tableRows?.length > 0 ? (
          <div className="mb-10">
            <FreeUserCard data={tableRows} />
          </div>
        ) : (
          <div className="mt-10">
            <NoDataEmptyState
              imgClassName="w-14 h-14"
              textClassName="text-lg"
              className="py-5 px-3 w-full"
            />
          </div>
        )}

        {!loading && totalCount > 0 && (
          <div className="mt-6 mb-10">
            <Pagination
              totalItems={totalCount}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
              currentPage={currentPage}
            />
          </div>
        )}
      </div>
    </>
  );
};


