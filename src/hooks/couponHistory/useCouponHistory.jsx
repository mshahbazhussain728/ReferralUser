



// // // // import { useState, useEffect } from "react";
// // // // import { getPageFromURL } from "../../utils/utility";
// // // // import { useDispatch, useSelector } from "react-redux";
// // // // import { useLocation, useSearchParams } from "react-router-dom";
// // // // import { readCouponHistory } from "../../api/slices/couponHistory/couponHistory";
// // // // import { FiltersDefaultValues } from "../../utils/static";

// // // // export const useCouponHistory = () => {
// // // //   const dispatch = useDispatch();
// // // //   const location = useLocation();
// // // //   const { user, loading: authLoading } = useSelector((state) => state.auth);
// // // //   const { couponHistory, loading } = useSelector((state) => state.couponHistory);

// // // //   const [currentPage, setCurrentPage] = useState(getPageFromURL());
// // // //   const [searchParams, setSearchParams] = useSearchParams(location.search);
// // // //   const [filter, setFilter] = useState({ sort: FiltersDefaultValues.None });

// // // //   const sort = searchParams.get("sort");
// // // //   const order = searchParams.get("order") || "desc";
// // // //   const page = searchParams.get("page");

// // // //   useEffect(() => {
// // // //     if (authLoading) return;

// // // //     const parsedPage = parseInt(page, 10);
// // // //     const resolvedPage = !isNaN(parsedPage) ? parsedPage : 1;

// // // //     // ✅ Only update if changed to avoid re-render loop
// // // //     setCurrentPage((prev) => (prev !== resolvedPage ? resolvedPage : prev));

// // // //     const uid = user?.id; // ✅ correct path
// // // //     if (!uid) return;

// // // //     const filteredData = {
// // // //       uid,
// // // //       page: resolvedPage,
// // // //       size: 10,
// // // //       order,
// // // //     };

// // // //     if (sort && sort !== "None") {
// // // //       filteredData.sort = sort;
// // // //     }

// // // //     const fetchCouponHistory = async () => {
// // // //       try {
// // // //         await dispatch(readCouponHistory({ params: filteredData }));
// // // //       } catch (err) {
// // // //         console.error("Error fetching coupon history:", err);
// // // //       }
// // // //     };

// // // //     fetchCouponHistory();

// // // //     // ✅ FIXED: removed currentPage from deps — it's set inside this effect
// // // //     //           which was causing an infinite re-fetch loop
// // // //   }, [location.search, location.key, user, authLoading, sort, order, dispatch]);

// // // //   useEffect(() => {
// // // //     const handlePopState = () => setCurrentPage(getPageFromURL());
// // // //     window.addEventListener("popstate", handlePopState);
// // // //     return () => window.removeEventListener("popstate", handlePopState);
// // // //   }, []);

// // // //   const headings = [
// // // //     { label: "Type", value: "type" },
// // // //     { label: "Coupon", value: "coupon" },
// // // //     { label: "Redeemed Date", value: "createdAt" },
// // // //     { label: "Expiry Date", value: "expiryDate" },
// // // //     { label: "Points", value: "points" },
// // // //     { label: "Status", value: "status" },
// // // //   ];

// // // //   const itemsPerPage = 10;
// // // //   const currentPageRows = couponHistory;
// // // //   const totalCount = couponHistory?.pagination?.total || 0;
// // // //   const totalItems = totalCount;

// // // //   const handlePageChange = (newPage) => {
// // // //     setCurrentPage(newPage);
// // // //     const params = new URLSearchParams(window.location.search);
// // // //     params.set("page", newPage.toString());
// // // //     setSearchParams(params);
// // // //   };

// // // //   const hanldeSortChange = (value) => {
// // // //     const params = new URLSearchParams(window.location.search);
// // // //     if (value === "None") {
// // // //       params.delete("sort");
// // // //     } else {
// // // //       params.set("sort", value);
// // // //     }
// // // //     params.set("page", "1");
// // // //     setSearchParams(params);
// // // //     setCurrentPage(1);
// // // //     setFilter((prev) => ({ ...prev, sort: value }));
// // // //   };

// // // //   const handleOrderChange = (newOrder) => {
// // // //     const params = new URLSearchParams(window.location.search);
// // // //     params.set("order", newOrder);
// // // //     params.set("page", "1");
// // // //     setSearchParams(params);
// // // //     setCurrentPage(1);
// // // //   };

// // // //   return {
// // // //     currentPageRows,
// // // //     totalItems,
// // // //     totalCount,
// // // //     loading,
// // // //     itemsPerPage,
// // // //     handlePageChange,
// // // //     currentPage,
// // // //     headings,
// // // //     sort,
// // // //     order,
// // // //     filter,
// // // //     hanldeSortChange,
// // // //     handleOrderChange,
// // // //   };
// // // // };



// // // // import { useState, useEffect } from "react";
// // // // import { getPageFromURL } from "../../utils/utility";
// // // // import { useDispatch, useSelector } from "react-redux";
// // // // import { useLocation, useSearchParams } from "react-router-dom";
// // // // import { readCouponHistory } from "../../api/slices/couponHistory/couponHistory";
// // // // import { FiltersDefaultValues } from "../../utils/static";

// // // // export const useCouponHistory = () => {
// // // //   const dispatch = useDispatch();
// // // //   const location = useLocation();
// // // //   const { user, loading: authLoading } = useSelector((state) => state.auth);
// // // //   const { couponHistory, loading } = useSelector((state) => state.couponHistory);

// // // //   const [currentPage, setCurrentPage] = useState(getPageFromURL());
// // // //   const [searchParams, setSearchParams] = useSearchParams(location.search);
// // // //   const [filter, setFilter] = useState({ sort: FiltersDefaultValues.None });

// // // //   const sort = searchParams.get("sort");
// // // //   const order = searchParams.get("order") || "desc";
// // // //   const page = searchParams.get("page");

// // // //   useEffect(() => {
// // // //     if (authLoading) return;

// // // //     const parsedPage = parseInt(page, 10);
// // // //     const resolvedPage = !isNaN(parsedPage) ? parsedPage : 1;

// // // //     setCurrentPage((prev) => (prev !== resolvedPage ? resolvedPage : prev));

// // // //     const uid = user?.id;
// // // //     if (!uid) return;

// // // //     const filteredData = {
// // // //       uid,
// // // //       page: resolvedPage,
// // // //       size: 10,
// // // //       order,
// // // //     };

// // // //     if (sort && sort !== "None") {
// // // //       filteredData.sort = sort;
// // // //     }

// // // //     const fetchCouponHistory = async () => {
// // // //       try {
// // // //         await dispatch(readCouponHistory({ params: filteredData }));
// // // //       } catch (err) {
// // // //         console.error("Error fetching coupon history:", err);
// // // //       }
// // // //     };

// // // //     fetchCouponHistory();
// // // //   }, [location.search, location.key, user, authLoading, sort, order, dispatch]);

// // // //   useEffect(() => {
// // // //     const handlePopState = () => setCurrentPage(getPageFromURL());
// // // //     window.addEventListener("popstate", handlePopState);
// // // //     return () => window.removeEventListener("popstate", handlePopState);
// // // //   }, []);

// // // //   const headings = [
// // // //     { label: "Type", value: "type" },
// // // //     { label: "Coupon", value: "coupon" },
// // // //     { label: "Redeemed Date", value: "createdAt" },
// // // //     { label: "Expiry Date", value: "expiryDate" },
// // // //     { label: "Points", value: "points" },
// // // //     { label: "Status", value: "status" },
// // // //   ];

// // // //   const itemsPerPage = 10;

// // // //   // ✅ THE FIX: extract the array from couponHistory object
// // // //   const currentPageRows = Array.isArray(couponHistory?.data) ? couponHistory.data : [];
// // // //   const totalCount = couponHistory?.pagination?.total || 0;
// // // //   const totalItems = totalCount;

// // // //   const handlePageChange = (newPage) => {
// // // //     setCurrentPage(newPage);
// // // //     const params = new URLSearchParams(window.location.search);
// // // //     params.set("page", newPage.toString());
// // // //     setSearchParams(params);
// // // //   };

// // // //   const hanldeSortChange = (value) => {
// // // //     const params = new URLSearchParams(window.location.search);
// // // //     if (value === "None") {
// // // //       params.delete("sort");
// // // //     } else {
// // // //       params.set("sort", value);
// // // //     }
// // // //     params.set("page", "1");
// // // //     setSearchParams(params);
// // // //     setCurrentPage(1);
// // // //     setFilter((prev) => ({ ...prev, sort: value }));
// // // //   };

// // // //   const handleOrderChange = (newOrder) => {
// // // //     const params = new URLSearchParams(window.location.search);
// // // //     params.set("order", newOrder);
// // // //     params.set("page", "1");
// // // //     setSearchParams(params);
// // // //     setCurrentPage(1);
// // // //   };

// // // //   return {
// // // //     currentPageRows,  // ✅ Now always a plain array []
// // // //     totalItems,
// // // //     totalCount,
// // // //     loading,
// // // //     itemsPerPage,
// // // //     handlePageChange,
// // // //     currentPage,
// // // //     headings,
// // // //     sort,
// // // //     order,
// // // //     filter,
// // // //     hanldeSortChange,
// // // //     handleOrderChange,
// // // //   };
// // // // };






import { useState, useEffect } from "react";
import { getPageFromURL } from "../../utils/utility";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import { readCouponHistory } from "../../api/slices/couponHistory/couponHistory";
import { FiltersDefaultValues } from "../../utils/static";

export const useCouponHistory = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { user, loading: authLoading } = useSelector((state) => state.auth);
  const { couponHistory, loading } = useSelector((state) => state.couponHistory);

  const [currentPage, setCurrentPage] = useState(getPageFromURL());
  const [searchParams, setSearchParams] = useSearchParams(location.search);
  const [filter, setFilter] = useState({ sort: FiltersDefaultValues.None });

  const sort = searchParams.get("sort");
  const order = searchParams.get("order") || "desc";
  const page = searchParams.get("page");

  useEffect(() => {
    if (authLoading) return;

    const parsedPage = parseInt(page, 10);
    const resolvedPage = !isNaN(parsedPage) ? parsedPage : 1;

    setCurrentPage((prev) => (prev !== resolvedPage ? resolvedPage : prev));

    const uid = user?.id;
    if (!uid) return;

    const filteredData = {
      uid,
      page: resolvedPage,
      size: 10,
      order,
    };

    if (sort && sort !== "None") {
      filteredData.sort = sort;
    }

    const fetchCouponHistory = async () => {
      try {
        await dispatch(readCouponHistory({ params: filteredData }));
      } catch (err) {
        console.error("Error fetching coupon history:", err);
      }
    };

    fetchCouponHistory();
  }, [location.search, location.key, user, authLoading, sort, order, dispatch]);

  useEffect(() => {
    const handlePopState = () => setCurrentPage(getPageFromURL());
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const headings = [
    { label: "Type", value: "type" },
    { label: "Coupon", value: "coupon" },
    { label: "Redeemed Date", value: "createdAt" },
    { label: "Expiry Date", value: "expiryDate" },
    { label: "Points", value: "points" },
    { label: "Status", value: "status" },
  ];

  const itemsPerPage = 10;

  const currentPageRows = Array.isArray(couponHistory?.data) ? couponHistory.data : [];
  const totalCount = couponHistory?.pagination?.total || 0;
  const totalItems = totalCount;

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

  const handleOrderChange = (newOrder) => {
    const params = new URLSearchParams(window.location.search);
    params.set("order", newOrder);
    params.set("page", "1");
    setSearchParams(params);
    setCurrentPage(1);
  };

  /**
   * Normalizes the status string from the API into a consistent lowercase value.
   * Fixes the mobile bug where status was always displaying as "active"
   * due to inconsistent casing or field mapping from the API response.
   *
   * Usage in your component:
   *   const statusLabel = getStatusLabel(row.status);
   *   const statusClass = getStatusClass(row.status);
   */
  const getStatusLabel = (status) => {
    if (!status) return "Unknown";
    const normalized = String(status).toLowerCase().trim();
    switch (normalized) {
      case "active":
        return "Active";
      case "expired":
        return "Expired";
      case "used":
        return "Used";
      case "pending":
        return "Pending";
      default:
        return status; // fallback to raw value
    }
  };

  const getStatusClass = (status) => {
    const normalized = String(status || "").toLowerCase().trim();
    switch (normalized) {
      case "active":
        return "text-green-600 bg-green-100";
      case "expired":
        return "text-red-600 bg-red-100";
      case "used":
        return "text-gray-600 bg-gray-100";
      case "pending":
        return "text-yellow-600 bg-yellow-100";
      default:
        return "text-gray-500 bg-gray-50";
    }
  };

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return {
    currentPageRows,
    totalItems,
    totalCount,
    loading,
    itemsPerPage,
    handlePageChange,
    currentPage,
    headings,
    sort,
    order,
    filter,
    hanldeSortChange,
    handleOrderChange,
    // ✅ New helpers for correct status display (fixes mobile "always active" bug)
    getStatusLabel,
    getStatusClass,
    // ✅ totalPages exposed for mobile pagination
    totalPages,
  };
};



