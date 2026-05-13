

// // import { useState, useEffect } from "react";
// // import { getPageFromURL } from "../../utils/utility";
// // import { useDispatch, useSelector } from "react-redux";
// // import { readFreeUserListing, readFreeUserCounts } from "../../api/slices/freeUserSlice/freeUser";
// // import { useLocation, useSearchParams } from "react-router-dom";
// // import { FiltersDefaultValues } from "../../utils/static";

// // export const useFreeUser = () => {
// //   const dispatch = useDispatch();
// //   const location = useLocation();
// //   const { user, loading: authLoading } = useSelector((state) => state.auth);
// //   const [currentPage, setCurrentPage] = useState(getPageFromURL());
// //   const [error, setError] = useState(null);

// //   const freeUserState = useSelector((state) => state?.freeUser);

// //   const [searchParams, setSearchParams] = useSearchParams(location.search);
// //   const [filter, setFilter] = useState({ sort: FiltersDefaultValues.None });

// //   const page = searchParams.get("page");
// //   const sort = searchParams.get("sort");

// //   const freeUser   = freeUserState?.freeUser   || {};
// //   const stats      = freeUser?.stats           || {};
// //   const loading    = freeUserState?.loading    || false;

// //   // Table rows from API 2 (POST /referrals/users/free/all)
// //   // Response: { count, data: [{ id, name, email, createdAt, status }] }
// //   const tableRows  = freeUserState?.allFreeUsers?.data       ?? [];
// //   const totalCount = freeUserState?.allFreeUsers?.count      ?? 0;
// //   const itemsPerPage = 10;
// //   const totalPages   = Math.ceil(totalCount / itemsPerPage) || 1;

// //   const headings = [
// //     { label: "User Details", value: "name"      },
// //     { label: "Email",        value: "email"     },
// //     { label: "Joined",       value: "createdAt" },
// //     { label: "Status",       value: "status"    },
// //   ];

// //   // Dashboard cards:
// //   // Total Users → from API 2 count (matches table)
// //   // This Month, This Week, Revenue → from API 1 stats
// //   const dummyData = [
// //     { title: "Total Users", points: totalCount            ?? 0 },
// //     { title: "This Month",  points: stats?.thisMonthUsers ?? 0 },
// //     { title: "This Week",   points: stats?.thisWeekUsers  ?? 0 },
// //     { title: "Revenue",     points: stats?.revenue        ?? 0 },
// //   ];

// //   // ── API 2: POST /referrals/users/free/all ─────────────────────────────────
// //   useEffect(() => {
// //     if (authLoading || !user) return;

// //     const parsedPage = parseInt(page, 10);
// //     let resetPage = null;

// //     if (!isNaN(parsedPage)) {
// //       setCurrentPage(parsedPage);
// //     } else {
// //       resetPage = 1;
// //       setCurrentPage(1);
// //     }

// //     const fetchFreeUsers = async () => {
// //       const uid = user?.id;
// //       if (!uid) {
// //         setError("User information not available");
// //         return;
// //       }

// //       const requestBody = {
// //         uid,
// //         page: Number(parsedPage) || resetPage || currentPage,
// //         size: itemsPerPage,
// //       };

// //       if (sort && sort !== "None") requestBody.sort = sort;

// //       try {
// //         setError(null);
// //         const response = await dispatch(readFreeUserListing({ data: requestBody }));
// //         if (response?.error) {
// //           setError(response.error.message || "Failed to fetch users");
// //         }
// //       } catch (err) {
// //         setError(err.message);
// //       }
// //     };

// //     fetchFreeUsers();
// //   }, [location.search, location.key, user, authLoading, sort]);

// //   // ── API 1: GET /referrals/users/free ─────────────────────────────────────
// //   // Used only for stats (thisMonth, thisWeek, revenue)
// //   useEffect(() => {
// //     if (authLoading || !user) return;
// //     const uid = user?.id;
// //     if (!uid) return;
// //     dispatch(readFreeUserCounts({ params: { uid, page: 1, size: 10 } }));
// //   }, [user, authLoading]);

// //   useEffect(() => {
// //     const handlePopState = () => setCurrentPage(getPageFromURL());
// //     window.addEventListener("popstate", handlePopState);
// //     return () => window.removeEventListener("popstate", handlePopState);
// //   }, []);

// //   const handlePageChange = (newPage) => {
// //     if (newPage < 1 || newPage > totalPages) return;
// //     setCurrentPage(newPage);
// //     const params = new URLSearchParams(window.location.search);
// //     params.set("page", newPage.toString());
// //     setSearchParams(params);
// //   };

// //   const handleSortChange = (value) => {
// //     const params = new URLSearchParams(window.location.search);
// //     if (value === "None" || value === FiltersDefaultValues.None) {
// //       params.delete("sort");
// //     } else {
// //       params.set("sort", value);
// //     }
// //     params.set("page", "1");
// //     setSearchParams(params);
// //     setCurrentPage(1);
// //     setFilter((prev) => ({ ...prev, sort: value }));
// //   };

// //   return {
// //     dummyData,
// //     tableRows,
// //     totalItems: totalCount,
// //     totalCount,
// //     totalPages,
// //     loading,
// //     itemsPerPage,
// //     handlePageChange,
// //     currentPage,
// //     headings,
// //     handleSortChange,
// //     sort,
// //     filter,
// //     error,
// //   };
// // };






import { useState, useEffect } from "react";
import { getPageFromURL } from "../../utils/utility";
import { useDispatch, useSelector } from "react-redux";
import { readFreeUserListing } from "../../api/slices/freeUserSlice/freeUser";
import { useLocation, useSearchParams } from "react-router-dom";
import { FiltersDefaultValues } from "../../utils/static";

export const useFreeUser = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { user, loading: authLoading } = useSelector((state) => state.auth);
  const [currentPage, setCurrentPage] = useState(getPageFromURL());
  const [error, setError] = useState(null);

  const freeUserState = useSelector((state) => state?.freeUser);
  const [searchParams, setSearchParams] = useSearchParams(location.search);
  const [filter, setFilter] = useState({ sort: FiltersDefaultValues.None });

  const page = searchParams.get("page");
  const sort = searchParams.get("sort");

  const loading    = freeUserState?.loading                    || false;
  const stats      = freeUserState?.freeUser?.stats            || {};
  const tableRows  = freeUserState?.freeUser?.users            ?? [];
  const pagination = freeUserState?.freeUser?.pagination       || {};
  const totalCount = pagination?.totalRecords                  ?? 0;
  const itemsPerPage = pagination?.pageSize                    ?? 10;
  const totalPages   = pagination?.totalPages                  ?? 1;

  const headings = [
    { label: "User Details", value: "name"      },
    { label: "Email",        value: "email"     },
    { label: "Joined",       value: "createdAt" },
    { label: "Status",       value: "status"    },
  ];

  // Total Users, This Month, This Week, Revenue all from GET API stats
  const dummyData = [
    { title: "Total Users", points: stats?.totalUsers     ?? 0 },
    { title: "This Month",  points: stats?.thisMonthUsers ?? 0 },
    { title: "This Week",   points: stats?.thisWeekUsers  ?? 0 },
    { title: "Revenue",     points: stats?.revenue        ?? 0 },
  ];

  // ── GET /referrals/users/free ─────────────────────────────────────────────
  useEffect(() => {
    if (authLoading || !user) return;

    const parsedPage = parseInt(page, 10);
    let resetPage = null;

    if (!isNaN(parsedPage)) {
      setCurrentPage(parsedPage);
    } else {
      resetPage = 1;
      setCurrentPage(1);
    }

    const fetchFreeUsers = async () => {
      const uid = user?.id;
      if (!uid) {
        setError("User information not available");
        return;
      }

      const params = {
        uid,
        page: Number(parsedPage) || resetPage || currentPage,
        size: itemsPerPage,
      };

      if (sort && sort !== "None") params.sort = sort;

      try {
        setError(null);
        const response = await dispatch(readFreeUserListing({ params }));
        if (response?.error) {
          setError(response.error.message || "Failed to fetch users");
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchFreeUsers();
  }, [location.search, location.key, user, authLoading, sort]);

  useEffect(() => {
    const handlePopState = () => setCurrentPage(getPageFromURL());
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    const params = new URLSearchParams(window.location.search);
    params.set("page", newPage.toString());
    setSearchParams(params);
  };

  const handleSortChange = (value) => {
    const params = new URLSearchParams(window.location.search);
    if (value === "None" || value === FiltersDefaultValues.None) {
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
    totalItems: totalCount,
    totalCount,
    totalPages,
    loading,
    itemsPerPage,
    handlePageChange,
    currentPage,
    headings,
    handleSortChange,
    sort,
    filter,
    error,
  };
};




// ///


