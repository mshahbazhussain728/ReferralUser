



// // import { ModalType } from "../../types/ui";
// // import { useState, useEffect, useRef } from "react";
// // import { getPageFromURL } from "../../utils/utility";
// // import { useDispatch, useSelector } from "react-redux";
// // import { updateModalType } from "../../api/slices/globalSlice/global";
// // import { readRedeemHistory, updateRedeemHistory } from "../../api/slices/redeemHistory/redeem-history";
// // import { useLocation, useSearchParams } from "react-router-dom";
// // import { FiltersDefaultValues } from "../../utils/static";

// // export const useRedeemHistory = () => {
// //   const dispatch = useDispatch();
// //   const location = useLocation();
// //   const [currentPageRows, setCurrentPageRows] = useState([]);
// //   const [totalCount, setTotalCount] = useState(0);
// //   const [currentPage, setCurrentPage] = useState(getPageFromURL());
// //   const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
// //   const { user, loading: authLoading } = useSelector((state) => state.auth);
// //   const [searchParams, setSearchParams] = useSearchParams(location.search);
// //   const [filter, setFilter] = useState({ sort: FiltersDefaultValues.None });
// //   const { loading } = useSelector((state) => state.redeemHistory);

// //   // Ref to hold current payment details for share modal
// //   const paymentDetailsRef = useRef(null);

// //   const sort = searchParams.get("sort");
// //   const page = searchParams.get("page");

// //   const itemsPerPage = 10;

// //   useEffect(() => {
// //     const handleResize = () => setIsSmallScreen(window.innerWidth < 768);
// //     window.addEventListener("resize", handleResize);
// //     return () => window.removeEventListener("resize", handleResize);
// //   }, []);

// //   // ─── Share handler: opens SHARE_MODAL and passes payment details + screenshot ref ───
// //   const handleShare = (paymentData) => {
// //     dispatch(
// //       updateModalType({
// //         type: ModalType.SHARE_MODAL,
// //         data: {
// //           // Pass the payment info so the share modal can render the screenshot card
// //           reqSentDate: paymentData?.reqSentDate,
// //           points: paymentData?.points,
// //           reqApprovedDate: paymentData?.reqApprovedDate,
// //           paymentMethod: paymentData?.paymentMethod,
// //           paymentDate: paymentData?.paymentDate,
// //           status: paymentData?.status || "pending",
// //           statusDisplay: paymentData?.statusDisplay,
// //         },
// //       })
// //     );
// //   };

// //   const formatStatus = (status) => {
// //     if (!status) return { label: "Pending", color: "bg-yellow-100 text-yellow-800" };

// //     const statusMap = {
// //       pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800" },
// //       approved: { label: "Approved", color: "bg-green-100 text-green-800" },
// //       rejected: { label: "Rejected", color: "bg-red-100 text-red-800" },
// //       completed: { label: "Completed", color: "bg-blue-100 text-blue-800" },
// //       processing: { label: "Processing", color: "bg-purple-100 text-purple-800" },
// //       inprogress: { label: "In Progress", color: "bg-orange-100 text-orange-800" },
// //       inProgress: { label: "In Progress", color: "bg-orange-100 text-orange-800" },
// //       paid: { label: "Paid", color: "bg-green-100 text-green-800" },
// //       failed: { label: "Failed", color: "bg-red-100 text-red-800" },
// //       success: { label: "Success", color: "bg-green-100 text-green-800" },
// //       successful: { label: "Successful", color: "bg-green-100 text-green-800" },
// //     };

// //     const normalizedStatus = String(status).toLowerCase().trim();
// //     return (
// //       statusMap[normalizedStatus] ||
// //       statusMap[status] || {
// //         label: String(status).charAt(0).toUpperCase() + String(status).slice(1),
// //         color: "bg-gray-100 text-gray-800",
// //       }
// //     );
// //   };

// //   const formatDate = (date) => {
// //     if (!date) return "N/A";
// //     try {
// //       return new Date(date).toLocaleDateString("en-US", {
// //         year: "numeric",
// //         month: "short",
// //         day: "numeric",
// //       });
// //     } catch (error) {
// //       return "N/A";
// //     }
// //   };

// //   const formatPoints = (points) => {
// //     if (!points && points !== 0) return "0";
// //     return Number(points).toLocaleString();
// //   };

// //   useEffect(() => {
// //     if (authLoading) return;

// //     const parsedPage = parseInt(page, 10);
// //     const resolvedPage = !isNaN(parsedPage) ? parsedPage : 1;
// //     setCurrentPage((prev) => (prev !== resolvedPage ? resolvedPage : prev));

// //     const uid = user?.id;
// //     if (!uid) return;

// //     const filteredData = {
// //       uid,
// //       page: resolvedPage,
// //       size: itemsPerPage,
// //       sort:
// //         sort && sort !== "None" && sort !== "createdAt" ? sort : "createdAt",
// //       order: "desc",
// //     };

// //     const fetchRedeemHistory = async () => {
// //       try {
// //         const response = await dispatch(readRedeemHistory({ params: filteredData }));

// //         if (response?.payload) {
// //           const data = response.payload;

// //           const apiTotal =
// //             data?.pagination?.total ||
// //             data?.pagination?.totalItems ||
// //             data?.pagination?.count ||
// //             data?.total ||
// //             data?.totalCount ||
// //             data?.count ||
// //             data?.meta?.total ||
// //             data?.meta?.totalCount ||
// //             0;

// //           setTotalCount(apiTotal);

// //           const transformedData = (data?.data || []).map((item) => ({
// //             ...item,
// //             status: item.status || item.paymentStatus || "pending",
// //             formattedDate: formatDate(item.approvedDate || item.createdAt),
// //             formattedPoints: formatPoints(item.points),
// //             statusDisplay: formatStatus(item.status || item.paymentStatus || "pending"),
// //           }));

// //           setCurrentPageRows(transformedData);
// //         }
// //       } catch (err) {
// //         console.error("Error fetching redeem history:", err);
// //       }
// //     };

// //     fetchRedeemHistory();
// //   }, [location.search, location.key, user, authLoading, sort, dispatch]);

// //   useEffect(() => {
// //     const handlePopState = () => setCurrentPage(getPageFromURL());
// //     window.addEventListener("popstate", handlePopState);
// //     return () => window.removeEventListener("popstate", handlePopState);
// //   }, []);

// //   const handleUpdateStatus = async (id, status) => {
// //     try {
// //       const response = await dispatch(
// //         updateRedeemHistory({
// //           data: { id, status },
// //         })
// //       );

// //       if (response?.payload?.success) {
// //         setCurrentPageRows((prev) =>
// //           prev.map((row) =>
// //             row.id === id
// //               ? { ...row, status, statusDisplay: formatStatus(status) }
// //               : row
// //           )
// //         );
// //         return response.payload.data;
// //       } else {
// //         console.error("Update failed:", response?.payload?.message);
// //         return null;
// //       }
// //     } catch (err) {
// //       console.error("Error updating redeem status:", err);
// //       return null;
// //     }
// //   };

// //   const headings = [
// //     { label: "Created Date", value: "createdAt" },
// //     { label: "Points", value: "points" },
// //     { label: "Chat", value: "chat" },
// //     { label: "Status", value: "status" },
// //   ];

// //   const totalItems = totalCount;
// //   const totalPages = totalCount > 0 ? Math.ceil(totalCount / itemsPerPage) : 0;

// //   const handlePageChange = (newPage) => {
// //     if (newPage < 1 || newPage > totalPages) return;
// //     setCurrentPage(newPage);
// //     const params = new URLSearchParams(window.location.search);
// //     params.set("page", newPage.toString());
// //     setSearchParams(params);
// //     setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
// //   };

// //   // ─── Payment Details Modal: passes current data + onShare callback ───
// //   const handlePaymentDetails = (
// //     reqSentDate,
// //     points,
// //     reqApprovedDate,
// //     paymentMethod,
// //     paymentDate,
// //     status
// //   ) => {
// //     const statusDisplay = formatStatus(status);

// //     // Store in ref so share modal can access it
// //     paymentDetailsRef.current = {
// //       reqSentDate,
// //       points,
// //       reqApprovedDate,
// //       paymentMethod,
// //       paymentDate,
// //       status: status || "pending",
// //       statusDisplay,
// //     };

// //     dispatch(
// //       updateModalType({
// //         type: ModalType.PAYMENT_DETAILS,
// //         data: {
// //           reqSentDate,
// //           points,
// //           reqApprovedDate,
// //           paymentMethod,
// //           paymentDate,
// //           status: status || "pending",
// //           statusDisplay,
// //           // onShare now passes current payment data to the share modal
// //           onShare: () => handleShare(paymentDetailsRef.current),
// //         },
// //       })
// //     );
// //   };

// //   const handleSortChange = (value) => {
// //     const params = new URLSearchParams(window.location.search);
// //     if (value === "None" || value === "createdAt") {
// //       params.delete("sort");
// //     } else {
// //       params.set("sort", value);
// //     }
// //     params.set("page", "1");
// //     setSearchParams(params);
// //     setCurrentPage(1);
// //     setFilter((prev) => ({ ...prev, sort: value }));
// //   };

// //   const getVisiblePageNumbers = () => {
// //     const maxVisiblePages = isSmallScreen ? 3 : 5;
// //     const pages = [];
// //     let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
// //     let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
// //     if (endPage - startPage + 1 < maxVisiblePages) {
// //       startPage = Math.max(1, endPage - maxVisiblePages + 1);
// //     }
// //     for (let i = startPage; i <= endPage; i++) pages.push(i);
// //     return pages;
// //   };

// //   return {
// //     currentPageRows,
// //     redeemHistory: currentPageRows,
// //     totalItems,
// //     totalCount,
// //     loading,
// //     itemsPerPage,
// //     handlePageChange,
// //     currentPage,
// //     headings,
// //     sort,
// //     filter,
// //     handlePaymentDetails,
// //     handleSortChange,
// //     handleUpdateStatus,
// //     isSmallScreen,
// //     totalPages,
// //     getVisiblePageNumbers,
// //     formatStatus,
// //     formatDate,
// //     formatPoints,
// //   };
// // };



// import { ModalType } from "../../types/ui";
// import { useState, useEffect, useRef } from "react";
// import { getPageFromURL } from "../../utils/utility";
// import { useDispatch, useSelector } from "react-redux";
// import { updateModalType } from "../../api/slices/globalSlice/global";
// import { readRedeemHistory, updateRedeemHistory } from "../../api/slices/redeemHistory/redeem-history";
// import { useLocation, useSearchParams } from "react-router-dom";
// import { FiltersDefaultValues } from "../../utils/static";

// export const useRedeemHistory = () => {
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const [currentPageRows, setCurrentPageRows] = useState([]);
//   const [totalCount, setTotalCount] = useState(0);
//   const [currentPage, setCurrentPage] = useState(getPageFromURL());
//   const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
//   const { user, loading: authLoading } = useSelector((state) => state.auth);
//   const [searchParams, setSearchParams] = useSearchParams(location.search);
//   const [filter, setFilter] = useState({ sort: FiltersDefaultValues.None });
//   const { loading } = useSelector((state) => state.redeemHistory);

//   const paymentDetailsRef = useRef(null);
//   const imageBlobRef = useRef(null); // ← store blob outside Redux

//   const sort = searchParams.get("sort");
//   const page = searchParams.get("page");
//   const itemsPerPage = 10;

//   useEffect(() => {
//     const handleResize = () => setIsSmallScreen(window.innerWidth < 768);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const formatStatus = (status) => {
//     if (!status) return { label: "Pending", color: "bg-yellow-100 text-yellow-800" };
//     const statusMap = {
//       pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800" },
//       approved: { label: "Approved", color: "bg-green-100 text-green-800" },
//       rejected: { label: "Rejected", color: "bg-red-100 text-red-800" },
//       completed: { label: "Completed", color: "bg-blue-100 text-blue-800" },
//       processing: { label: "Processing", color: "bg-purple-100 text-purple-800" },
//       inprogress: { label: "In Progress", color: "bg-orange-100 text-orange-800" },
//       inProgress: { label: "In Progress", color: "bg-orange-100 text-orange-800" },
//       paid: { label: "Paid", color: "bg-green-100 text-green-800" },
//       failed: { label: "Failed", color: "bg-red-100 text-red-800" },
//       success: { label: "Success", color: "bg-green-100 text-green-800" },
//       successful: { label: "Successful", color: "bg-green-100 text-green-800" },
//     };
//     const normalizedStatus = String(status).toLowerCase().trim();
//     return (
//       statusMap[normalizedStatus] ||
//       statusMap[status] || {
//         label: String(status).charAt(0).toUpperCase() + String(status).slice(1),
//         color: "bg-gray-100 text-gray-800",
//       }
//     );
//   };

//   const formatDate = (date) => {
//     if (!date) return "N/A";
//     try {
//       return new Date(date).toLocaleDateString("en-US", {
//         year: "numeric",
//         month: "short",
//         day: "numeric",
//       });
//     } catch (error) {
//       return "N/A";
//     }
//   };

//   const formatPoints = (points) => {
//     if (!points && points !== 0) return "0";
//     return Number(points).toLocaleString();
//   };

//   useEffect(() => {
//     if (authLoading) return;
//     const parsedPage = parseInt(page, 10);
//     const resolvedPage = !isNaN(parsedPage) ? parsedPage : 1;
//     setCurrentPage((prev) => (prev !== resolvedPage ? resolvedPage : prev));
//     const uid = user?.id;
//     if (!uid) return;

//     const filteredData = {
//       uid,
//       page: resolvedPage,
//       size: itemsPerPage,
//       sort: sort && sort !== "None" && sort !== "createdAt" ? sort : "createdAt",
//       order: "desc",
//     };

//     const fetchRedeemHistory = async () => {
//       try {
//         const response = await dispatch(readRedeemHistory({ params: filteredData }));
//         if (response?.payload) {
//           const data = response.payload;
//           const apiTotal =
//             data?.pagination?.total ||
//             data?.pagination?.totalItems ||
//             data?.pagination?.count ||
//             data?.total ||
//             data?.totalCount ||
//             data?.count ||
//             data?.meta?.total ||
//             data?.meta?.totalCount ||
//             0;
//           setTotalCount(apiTotal);
//           const transformedData = (data?.data || []).map((item) => ({
//             ...item,
//             status: item.status || item.paymentStatus || "pending",
//             formattedDate: formatDate(item.approvedDate || item.createdAt),
//             formattedPoints: formatPoints(item.points),
//             statusDisplay: formatStatus(item.status || item.paymentStatus || "pending"),
//           }));
//           setCurrentPageRows(transformedData);
//         }
//       } catch (err) {
//         console.error("Error fetching redeem history:", err);
//       }
//     };

//     fetchRedeemHistory();
//   }, [location.search, location.key, user, authLoading, sort, dispatch]);

//   useEffect(() => {
//     const handlePopState = () => setCurrentPage(getPageFromURL());
//     window.addEventListener("popstate", handlePopState);
//     return () => window.removeEventListener("popstate", handlePopState);
//   }, []);

//   const handleUpdateStatus = async (id, status) => {
//     try {
//       const response = await dispatch(
//         updateRedeemHistory({ data: { id, status } })
//       );
//       if (response?.payload?.success) {
//         setCurrentPageRows((prev) =>
//           prev.map((row) =>
//             row.id === id
//               ? { ...row, status, statusDisplay: formatStatus(status) }
//               : row
//           )
//         );
//         return response.payload.data;
//       } else {
//         console.error("Update failed:", response?.payload?.message);
//         return null;
//       }
//     } catch (err) {
//       console.error("Error updating redeem status:", err);
//       return null;
//     }
//   };

//   // ─── Called from PaymentDetailsModal with the captured PNG blob ───────────
//   const handleShareWithBlob = (blob) => {
//     imageBlobRef.current = blob; // save blob in ref (not Redux — blobs aren't serializable)

//     const paymentData = paymentDetailsRef.current;

//     dispatch(
//       updateModalType({
//         type: ModalType.SHARE_MODAL,
//         data: {
//           reqSentDate: paymentData?.reqSentDate,
//           points: paymentData?.points,
//           reqApprovedDate: paymentData?.reqApprovedDate,
//           paymentMethod: paymentData?.paymentMethod,
//           paymentDate: paymentData?.paymentDate,
//           status: paymentData?.status || "pending",
//           statusDisplay: paymentData?.statusDisplay,
//           imageBlob: imageBlobRef.current, // ← blob passed directly into modal data
//         },
//       })
//     );
//   };

//   // ─── Opens Payment Details Modal ─────────────────────────────────────────
//   const handlePaymentDetails = (
//     reqSentDate,
//     points,
//     reqApprovedDate,
//     paymentMethod,
//     paymentDate,
//     status
//   ) => {
//     const statusDisplay = formatStatus(status);

//     // Store current payment data in ref for use when share is triggered
//     paymentDetailsRef.current = {
//       reqSentDate,
//       points,
//       reqApprovedDate,
//       paymentMethod,
//       paymentDate,
//       status: status || "pending",
//       statusDisplay,
//     };

//     dispatch(
//       updateModalType({
//         type: ModalType.PAYMENT_DETAILS,
//         data: {
//           reqSentDate,
//           points,
//           reqApprovedDate,
//           paymentMethod,
//           paymentDate,
//           status: status || "pending",
//           statusDisplay,
//           onShare: handleShareWithBlob, // ← receives the blob from PaymentDetailsModal
//         },
//       })
//     );
//   };

//   const handleSortChange = (value) => {
//     const params = new URLSearchParams(window.location.search);
//     if (value === "None" || value === "createdAt") {
//       params.delete("sort");
//     } else {
//       params.set("sort", value);
//     }
//     params.set("page", "1");
//     setSearchParams(params);
//     setCurrentPage(1);
//     setFilter((prev) => ({ ...prev, sort: value }));
//   };

//   const headings = [
//     { label: "Created Date", value: "createdAt" },
//     { label: "Points", value: "points" },
//     { label: "Chat", value: "chat" },
//     { label: "Status", value: "status" },
//   ];

//   const totalItems = totalCount;
//   const totalPages = totalCount > 0 ? Math.ceil(totalCount / itemsPerPage) : 0;

//   const handlePageChange = (newPage) => {
//     if (newPage < 1 || newPage > totalPages) return;
//     setCurrentPage(newPage);
//     const params = new URLSearchParams(window.location.search);
//     params.set("page", newPage.toString());
//     setSearchParams(params);
//     setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
//   };

//   const getVisiblePageNumbers = () => {
//     const maxVisiblePages = isSmallScreen ? 3 : 5;
//     const pages = [];
//     let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
//     let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
//     if (endPage - startPage + 1 < maxVisiblePages) {
//       startPage = Math.max(1, endPage - maxVisiblePages + 1);
//     }
//     for (let i = startPage; i <= endPage; i++) pages.push(i);
//     return pages;
//   };

//   return {
//     currentPageRows,
//     redeemHistory: currentPageRows,
//     totalItems,
//     totalCount,
//     loading,
//     itemsPerPage,
//     handlePageChange,
//     currentPage,
//     headings,
//     sort,
//     filter,
//     handlePaymentDetails,
//     handleSortChange,
//     handleUpdateStatus,
//     isSmallScreen,
//     totalPages,
//     getVisiblePageNumbers,
//     formatStatus,
//     formatDate,
//     formatPoints,
//   };
// };

///




import { ModalType } from "../../types/ui";
import { useState, useEffect, useRef } from "react";
import { getPageFromURL } from "../../utils/utility";
import { useDispatch, useSelector } from "react-redux";
import { updateModalType } from "../../api/slices/globalSlice/global";
import { readRedeemHistory, updateRedeemHistory } from "../../api/slices/redeemHistory/redeem-history";
import { useLocation, useSearchParams } from "react-router-dom";
import { FiltersDefaultValues } from "../../utils/static";

export const useRedeemHistory = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [currentPageRows, setCurrentPageRows] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(getPageFromURL());
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
  const { user, loading: authLoading } = useSelector((state) => state.auth);
  const [searchParams, setSearchParams] = useSearchParams(location.search);
  const [filter, setFilter] = useState({ sort: FiltersDefaultValues.None });
  const { loading } = useSelector((state) => state.redeemHistory);

  const paymentDetailsRef = useRef(null);
  const imageBlobRef = useRef(null); // ← store blob outside Redux

  const sort = searchParams.get("sort");
  const page = searchParams.get("page");
  const itemsPerPage = 10;

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const formatStatus = (status) => {
    if (!status) return { label: "Pending", color: "bg-yellow-100 text-yellow-800" };
    const statusMap = {
      pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800" },
      approved: { label: "Approved", color: "bg-green-100 text-green-800" },
      rejected: { label: "Rejected", color: "bg-red-100 text-red-800" },
      completed: { label: "Completed", color: "bg-blue-100 text-blue-800" },
      processing: { label: "Processing", color: "bg-purple-100 text-purple-800" },
      inprogress: { label: "In Progress", color: "bg-orange-100 text-orange-800" },
      inProgress: { label: "In Progress", color: "bg-orange-100 text-orange-800" },
      paid: { label: "Paid", color: "bg-green-100 text-green-800" },
      failed: { label: "Failed", color: "bg-red-100 text-red-800" },
      success: { label: "Success", color: "bg-green-100 text-green-800" },
      successful: { label: "Successful", color: "bg-green-100 text-green-800" },
    };
    const normalizedStatus = String(status).toLowerCase().trim();
    return (
      statusMap[normalizedStatus] ||
      statusMap[status] || {
        label: String(status).charAt(0).toUpperCase() + String(status).slice(1),
        color: "bg-gray-100 text-gray-800",
      }
    );
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    try {
      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (error) {
      return "N/A";
    }
  };

  const formatPoints = (points) => {
    if (!points && points !== 0) return "0";
    return Number(points).toLocaleString();
  };

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
      size: itemsPerPage,
      sort: sort && sort !== "None" && sort !== "createdAt" ? sort : "createdAt",
      order: "desc",
    };

    const fetchRedeemHistory = async () => {
      try {
        const response = await dispatch(readRedeemHistory({ params: filteredData }));
        if (response?.payload) {
          const data = response.payload;
          const apiTotal =
            data?.pagination?.total ||
            data?.pagination?.totalItems ||
            data?.pagination?.count ||
            data?.total ||
            data?.totalCount ||
            data?.count ||
            data?.meta?.total ||
            data?.meta?.totalCount ||
            0;
          setTotalCount(apiTotal);
          const transformedData = (data?.data || []).map((item) => ({
            ...item,
            status: item.status || item.paymentStatus || "pending",
            formattedDate: formatDate(item.approvedDate || item.createdAt),
            formattedPoints: formatPoints(item.points),
            statusDisplay: formatStatus(item.status || item.paymentStatus || "pending"),
          }));
          setCurrentPageRows(transformedData);
        }
      } catch (err) {
        console.error("Error fetching redeem history:", err);
      }
    };

    fetchRedeemHistory();
  }, [location.search, location.key, user, authLoading, sort, dispatch]);

  useEffect(() => {
    const handlePopState = () => setCurrentPage(getPageFromURL());
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      const response = await dispatch(
        updateRedeemHistory({ data: { id, status } })
      );
      if (response?.payload?.success) {
        setCurrentPageRows((prev) =>
          prev.map((row) =>
            row.id === id
              ? { ...row, status, statusDisplay: formatStatus(status) }
              : row
          )
        );
        return response.payload.data;
      } else {
        console.error("Update failed:", response?.payload?.message);
        return null;
      }
    } catch (err) {
      console.error("Error updating redeem status:", err);
      return null;
    }
  };

  // ─── Called from PaymentDetailsModal with the captured PNG blob ───────────
  const handleShareWithBlob = (blob) => {
    imageBlobRef.current = blob; // save blob in ref (not Redux — blobs aren't serializable)

    const paymentData = paymentDetailsRef.current;

    dispatch(
      updateModalType({
        type: ModalType.SHARE_MODAL,
        data: {
          reqSentDate: paymentData?.reqSentDate,
          points: paymentData?.points,
          reqApprovedDate: paymentData?.reqApprovedDate,
          paymentMethod: paymentData?.paymentMethod,
          paymentDate: paymentData?.paymentDate,
          status: paymentData?.status || "pending",
          statusDisplay: paymentData?.statusDisplay,
          imageBlob: imageBlobRef.current, // ← blob passed directly into modal data
        },
      })
    );
  };

  // ─── Opens Payment Details Modal ─────────────────────────────────────────
  const handlePaymentDetails = (
    reqSentDate,
    points,
    reqApprovedDate,
    paymentMethod,
    paymentDate,
    status
  ) => {
    const statusDisplay = formatStatus(status);

    // Store current payment data in ref for use when share is triggered
    paymentDetailsRef.current = {
      reqSentDate,
      points,
      reqApprovedDate,
      paymentMethod,
      paymentDate,
      status: status || "pending",
      statusDisplay,
    };

    dispatch(
      updateModalType({
        type: ModalType.PAYMENT_DETAILS,
        data: {
          reqSentDate,
          points,
          reqApprovedDate,
          paymentMethod,
          paymentDate,
          status: status || "pending",
          statusDisplay,
          onShare: handleShareWithBlob, // ← receives the blob from PaymentDetailsModal
        },
      })
    );
  };

  const handleSortChange = (value) => {
    const params = new URLSearchParams(window.location.search);
    if (value === "None" || value === "createdAt") {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }
    params.set("page", "1");
    setSearchParams(params);
    setCurrentPage(1);
    setFilter((prev) => ({ ...prev, sort: value }));
  };

  const headings = [
    { label: "Created Date", value: "createdAt" },
    { label: "Points", value: "points" },
    { label: "Chat", value: "chat" },
    { label: "Status", value: "status" },
  ];

  const totalItems = totalCount;
  const totalPages = totalCount > 0 ? Math.ceil(totalCount / itemsPerPage) : 0;

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    const params = new URLSearchParams(window.location.search);
    params.set("page", newPage.toString());
    setSearchParams(params);
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
  };

  const getVisiblePageNumbers = () => {
    const maxVisiblePages = isSmallScreen ? 3 : 5;
    const pages = [];
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    for (let i = startPage; i <= endPage; i++) pages.push(i);
    return pages;
  };

  return {
    currentPageRows,
    redeemHistory: currentPageRows,
    totalItems,
    totalCount,
    loading,
    itemsPerPage,
    handlePageChange,
    currentPage,
    headings,
    sort,
    filter,
    handlePaymentDetails,
    handleSortChange,
    handleUpdateStatus,
    isSmallScreen,
    totalPages,
    getVisiblePageNumbers,
    formatStatus,
    formatDate,
    formatPoints,
  };
};