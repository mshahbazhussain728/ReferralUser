


// import { useState, useEffect } from "react";
// import { getPageFromURL } from "../../utils/utility";
// import { useLocation, useSearchParams } from "react-router-dom";
// import { getPageTitles } from "../../utils/function";
// import { useDispatch, useSelector } from "react-redux";
// import { readPremiumUsers, readReferralCounts } from "../../api/slices/premiumUser/premium-user";
// import { FiltersDefaultValues } from "../../utils/static";

// export const useYearlyUsers = () => {
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const [searchParams, setSearchParams] = useSearchParams(location.search);
//   const page = searchParams.get("page");
//   const [currentPage, setCurrentPage] = useState(page || 1);
//   const { user, loading: authLoading } = useSelector((state) => state.auth);
//   const { premiumUser, referralCounts, loading } = useSelector(
//     (state) => state.premiumUsers
//   );
//   const [filter, setFilter] = useState({ sort: FiltersDefaultValues.None });

//   const sort        = searchParams.get("sort");
//   const queryStatus = searchParams.get("status");

//   // ✅ expired and refund added
//   const isSubPage = ["trial", "subscribed", "cancelled", "expired", "refund"].includes(queryStatus);

//   // Map URL status → API status
//   // ✅ expired and refund added
//   const mappedStatus =
//     queryStatus === "subscribed" ? "active"
//     : queryStatus === "cancelled" ? "canceled"
//     : queryStatus === "trial"    ? "trial"
//     : queryStatus === "expired"  ? "expired"
//     : queryStatus === "refund"   ? "refund"
//     : undefined;

//   // ── Fetch users ──────────────────────────────────────────────────────────
//   useEffect(() => {
//     if (authLoading) return;

//     const parsedPage = parseInt(page, 10);
//     const resolvedPage = !isNaN(parsedPage) ? parsedPage : 1;
//     setCurrentPage(resolvedPage);

//     const uid = user?.id;
//     if (!uid) return;

//     const requestBody = {
//       uid,
//       type: "yearly",
//       page: resolvedPage,
//       size: 10,
//     };

//     if (mappedStatus) requestBody.status = mappedStatus;
//     if (sort) requestBody.sort = sort;

//     dispatch(readPremiumUsers({ data: requestBody })).catch((err) =>
//       console.error("Error fetching yearly premium users:", err)
//     );
//   }, [location.search, location.key, user, authLoading]);

//   // ── Fetch pre-computed counts ────────────────────────────────────────────
//   useEffect(() => {
//     if (authLoading) return;
//     const uid = user?.id;
//     if (!uid) return;
//     dispatch(readReferralCounts({ data: { uid } }));
//   }, [user, authLoading]);

//   // ── Handle browser back/forward ──────────────────────────────────────────
//   useEffect(() => {
//     const handlePopState = () => setCurrentPage(getPageFromURL());
//     window.addEventListener("popstate", handlePopState);
//     return () => window.removeEventListener("popstate", handlePopState);
//   }, []);

//   const { pageTitle, mobilePageTitle } = getPageTitles(location);

//   // ── Pick correct counts based on active sub-page ─────────────────────────
//   // ✅ expired and refund added
//   const counts =
//     queryStatus === "trial"        ? referralCounts?.yearlyTrialUsers
//     : queryStatus === "subscribed" ? referralCounts?.yearlySubscribedUsers
//     : queryStatus === "cancelled"  ? referralCounts?.yearlyCanceledUsers
//     : queryStatus === "expired"    ? referralCounts?.yearlyExpiredUsers
//     : queryStatus === "refund"     ? referralCounts?.yearlyRefundUsers
//     : referralCounts?.yearlyTotal ?? {};

//   // ── Pass raw data ────────────────────────────────────────────────────────
//   const tableRows    = premiumUser?.data              ?? [];
//   const totalCount   = premiumUser?.pagination?.total ?? 0;
//   const itemsPerPage = 10;
//   const totalItems   = totalCount;

//   // ── Summary cards ────────────────────────────────────────────────────────
//   const dummyData = [
//     { title: "Total Users", points: counts?.total     ?? 0 },
//     { title: "This Month",  points: counts?.thisMonth ?? 0 },
//     { title: "This Week",   points: counts?.thisWeek  ?? 0 },
//     { title: "Revenue",     points: counts?.revenue   ?? 0 },
//   ];

//   // ── Table headings ───────────────────────────────────────────────────────
//   const headings = [
//     { label: "User Details",    value: "name"           },
//     { label: "Installed Date",  value: "installDate"    },
//     { label: "Subscribed Date", value: "subscribedDate" },
//     { label: "Clearance Date",  value: "clearanceDate"  },
//     { label: "Plan Type",       value: "planType"       },
//     { label: "Status",          value: "status"         },
//   ];

//   const handlePageChange = (newPage) => {
//     setCurrentPage(newPage);
//     const params = new URLSearchParams(window.location.search);
//     params.set("page", newPage.toString());
//     setSearchParams(params);
//   };

//   const hanldeSortChange = (value) => {
//     const params = new URLSearchParams(window.location.search);
//     if (value === "None") {
//       params.delete("sort");
//     } else {
//       params.set("sort", value);
//     }
//     params.set("page", "1");
//     setSearchParams(params);
//     setCurrentPage(1);
//     setFilter((prev) => ({ ...prev, sort: value }));
//   };

//   return {
//     dummyData,
//     tableRows,
//     totalItems,
//     totalCount,
//     loading,
//     itemsPerPage,
//     handlePageChange,
//     currentPage,
//     headings,
//     pageTitle,
//     mobilePageTitle,
//     hanldeSortChange,
//     sort,
//     filter,
//     isSubPage,
//   };
// };


///Updates


import { useState, useEffect } from "react";
import { getPageFromURL } from "../../utils/utility";
import { useLocation, useSearchParams } from "react-router-dom";
import { getPageTitles } from "../../utils/function";
import { useDispatch, useSelector } from "react-redux";
import { readPremiumUsers, readReferralCounts } from "../../api/slices/premiumUser/premium-user";
import { FiltersDefaultValues } from "../../utils/static";

export const useYearlyUsers = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams(location.search);
  const page = searchParams.get("page");
  const [currentPage, setCurrentPage] = useState(page || 1);
  const { user, loading: authLoading } = useSelector((state) => state.auth);
  const { premiumUser, referralCounts, loading } = useSelector(
    (state) => state.premiumUsers
  );
  const [filter, setFilter] = useState({ sort: FiltersDefaultValues.None });

  const sort        = searchParams.get("sort");
  const queryStatus = searchParams.get("status");

  const isSubPage = ["trial", "subscribed", "cancelled", "expired", "refund"].includes(queryStatus);

  // Map URL status → API status
  const mappedStatus =
    queryStatus === "subscribed" ? "active"
    : queryStatus === "cancelled" ? "canceled"
    : queryStatus === "trial"    ? "trial"
    : queryStatus === "expired"  ? "expired"
    : queryStatus === "refund"   ? "refunded"   // ✅ fixed: was "refund"
    : undefined;

  // ── Fetch users ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (authLoading) return;

    const parsedPage = parseInt(page, 10);
    const resolvedPage = !isNaN(parsedPage) ? parsedPage : 1;
    setCurrentPage(resolvedPage);

    const uid = user?.id;
    if (!uid) return;

    const requestBody = {
      uid,
      type: "yearly",
      page: resolvedPage,
      size: 10,
    };

    if (mappedStatus) requestBody.status = mappedStatus;
    if (sort) requestBody.sort = sort;

    dispatch(readPremiumUsers({ data: requestBody })).catch((err) =>
      console.error("Error fetching yearly premium users:", err)
    );
  }, [location.search, location.key, user, authLoading]);

  // ── Fetch pre-computed counts ────────────────────────────────────────────
  useEffect(() => {
    if (authLoading) return;
    const uid = user?.id;
    if (!uid) return;
    dispatch(readReferralCounts({ data: { uid } }));
  }, [user, authLoading]);

  // ── Handle browser back/forward ──────────────────────────────────────────
  useEffect(() => {
    const handlePopState = () => setCurrentPage(getPageFromURL());
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const { pageTitle, mobilePageTitle } = getPageTitles(location);

  // ── Pick correct counts based on active sub-page ─────────────────────────
  const counts =
    queryStatus === "trial"        ? referralCounts?.yearlyTrialUsers
    : queryStatus === "subscribed" ? referralCounts?.yearlySubscribedUsers
    : queryStatus === "cancelled"  ? referralCounts?.yearlyCanceledUsers
    : queryStatus === "expired"    ? referralCounts?.yearlyExpiredUsers
    : queryStatus === "refund"     ? referralCounts?.yearlyRefundedUsers   // ✅ fixed: was yearlyRefundUsers
    : referralCounts?.yearlyTotal ?? {};

  // ── Pass raw data ────────────────────────────────────────────────────────
  const tableRows    = premiumUser?.data              ?? [];
  const totalCount   = premiumUser?.pagination?.total ?? 0;
  const itemsPerPage = 10;
  const totalItems   = totalCount;

  // ── Summary cards ────────────────────────────────────────────────────────
  const dummyData = [
    { title: "Total Users", points: counts?.total     ?? 0 },
    { title: "This Month",  points: counts?.thisMonth ?? 0 },
    { title: "This Week",   points: counts?.thisWeek  ?? 0 },
    { title: "Revenue",     points: counts?.revenue   ?? 0 },
  ];

  // ── Table headings ───────────────────────────────────────────────────────
  const headings = [
    { label: "User Details",    value: "name"           },
    { label: "Installed Date",  value: "installDate"    },
    { label: "Subscribed Date", value: "subscribedDate" },
    { label: "Clearance Date",  value: "clearanceDate"  },
    { label: "Plan Type",       value: "planType"       },
    { label: "Status",          value: "status"         },
  ];

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    const params = new URLSearchParams(window.location.search);
    params.set("page", newPage.toString());
    setSearchParams(params);
  };

  const hanldeSortChange = (value) => {
    const params = new URLSearchParams(window.location.search);
    if (value === "None") {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }
    params.set("page", "1");
    setSearchParams(params);
    setCurrentPage(1);
    setFilter((prev) => ({ ...prev, sort: value }));
  };

  return {
    dummyData,
    tableRows,
    totalItems,
    totalCount,
    loading,
    itemsPerPage,
    handlePageChange,
    currentPage,
    headings,
    pageTitle,
    mobilePageTitle,
    hanldeSortChange,
    sort,
    filter,
    isSubPage,
  };
};