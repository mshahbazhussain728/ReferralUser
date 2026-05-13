
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { useEmptyStates } from "../../utils/hooks";
import { RedeemHistoryTableRows } from "./table/table-rows";           // ← Original
import { ReedeemHistoryTableHeadings } from "./table/table-heading"; // ← Original
import { Pagination } from "../../base-component/ui/pagination/pagination";
import { useRedeemHistory } from "../../hooks/redeemHistory/useRedeemHistory";
import SelectField from "../../base-component/ui/fields/select-fields";
import { RedeemMobileCard } from "../../base-component/ui/redeem-mobile-card";
import { NoDataEmptyState } from "../../base-component/ui/loadingEffect/no-data-state";
import { CustomLoader } from "../../base-component/ui/loadingEffect/custom-loader";

export const RedeemHistory = () => {
  const navigate = useNavigate();

  const {
    totalCount,
    totalItems,
    loading,
    itemsPerPage,
    currentPage,
    headings,
    redeemHistory,
    handlePageChange,
    handlePaymentDetails,
    handleSortChange,
    sort,
    totalPages,
  } = useRedeemHistory();

  // ==================== SOCKET / CHAT IMPLEMENTATION ====================
  const handleChat = useCallback(
  (item) => {
    const statusLower = (item?.status || "").toLowerCase().trim();

    if (statusLower === "pending") {
      return;
    }

    if (!item?.manager) {
      console.error("Manager data is missing!");
      return;
    }

    const manager = item.manager;

    navigate("/payment-request-chat", {
      state: {
        managerData: {
          id: manager.id,
          name: manager.name,
          imageUrl: manager.imageUrl,
        },
        receiverId: manager.id,
        managerId: manager.id?.toString() || "",
        redeemId: item.id,
        status: item.status,
      },
    });
  },
  [navigate]
);

  const stableHandlePaymentDetails = useCallback(
    (...args) => handlePaymentDetails(...args),
    [handlePaymentDetails]
  );
  // =====================================================================

  const CurrentComponent = useEmptyStates(
    <RedeemHistoryTableRows
      data={redeemHistory}
      onPaymentDetails={stableHandlePaymentDetails}
      onChat={handleChat}           // ← Socket/Chat handler passed here
    />,
    totalCount !== 0,
    loading
  );

  return (
    <>
      {/* ── DESKTOP VIEW ── */}
      <div className="hidden md:block">
        <ReedeemHistoryTableHeadings
          headings={headings}
          handleSort={handleSortChange}
          sortValue={sort}
          isRedeem={true}
        />
        {CurrentComponent}
      </div>

      {/* ── MOBILE HEADER WITH SORT ── */}
      <div className="flex items-center justify-between mt-[15px] mb-3 md:hidden">
        <p className="text-[20px] font-semibold">Redeemed Listing</p>
        <SelectField
          handleChange={handleSortChange}
          value={sort || "createdAt"}
          options={[
            { label: "Points", value: "points" },
            { label: "Status", value: "status" },
            { label: "Chat", value: "chat" },
            { label: "Created Date", value: "createdAt" },
            { label: "Approved Date", value: "approvedDate" },
          ]}
        />
      </div>

      {/* ── MOBILE CONTENT ── */}
      {loading ? (
        <div className="flex justify-center items-center md:hidden">
          <CustomLoader />
        </div>
      ) : redeemHistory?.length > 0 ? (
        <div className="md:hidden mb-6">
          <RedeemMobileCard
            data={redeemHistory}
            onClick={handlePaymentDetails}
            onChat={handleChat}           // ← Socket/Chat handler for mobile too
            currentPage={currentPage}
            totalPages={totalPages}
          />
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

      {/* ── PAGINATION ── */}
      {!loading && totalItems > 0 && (
        <Pagination
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      )}
    </>
  );
};

export default RedeemHistory;