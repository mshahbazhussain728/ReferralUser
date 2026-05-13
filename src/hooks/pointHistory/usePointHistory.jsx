




// import { useState, useEffect } from "react";
// import { getPageFromURL } from "../../utils/utility";
// import { readPointsHistory } from "../../api/slices/pointHistory/point-history";
// import { useDispatch, useSelector } from "react-redux";
// import { useLocation, useSearchParams } from "react-router-dom";
// import { FiltersDefaultValues } from "../../utils/static";

// export const usePointHistory = () => {
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const { user, loading: authLoading } = useSelector((state) => state.auth);
//   const [currentPageRows, setCurrentPageRows] = useState({
//     data: [],
//     pagination: { totalRecords: 0, currentPage: 1, perPage: 20, totalPages: 0 },
//   });
//   const [searchParams, setSearchParams] = useSearchParams(location.search);
//   const [currentPage, setCurrentPage] = useState(getPageFromURL());
//   const { pointsHistory, loading } = useSelector(
//     (state) => state.pointsHistory
//   );

//   const [filter, setFilter] = useState({
//     sort: FiltersDefaultValues.None,
//   });

//   const page = searchParams.get("page");
//   const sort = searchParams.get("sort");

//   useEffect(() => {
//     if (authLoading) return;
//     const parsedPage = parseInt(page, 10);

//     let resetPage = null;
//     if (!isNaN(parsedPage)) {
//       setCurrentPage(parsedPage);
//     } else {
//       resetPage = 1;
//       setCurrentPage(1);
//     }

//     const pointsHistoryRecords = async () => {
//       const uid = user?.user?.id;
//       console.log("🔍 usePointHistory - User ID:", uid);
      
//       if (!uid) {
//         console.warn("⚠️ No user ID found");
//         return;
//       }

//       const filteredData = {
//         uid: uid,
//         page: (Number(parsedPage) || resetPage) ?? currentPage,
//         size: 20,
//         sortBy: sort || "installedDate",
//         order: "desc",
//       };

//       console.log("📤 Dispatching readPointsHistory with params:", filteredData);

//       try {
//         const response = await dispatch(
//           readPointsHistory({ params: filteredData })
//         );
        
//         console.log("📥 Response from dispatch:", response);
        
//         if (response?.payload) {
//           const data = response.payload;
//           console.log("✅ Got payload:", data);
          
//           setCurrentPageRows({
//             data: data?.data || [],
//             pagination: data?.pagination || {
//               totalRecords: 0,
//               currentPage: 1,
//               perPage: 20,
//               totalPages: 0,
//             },
//           });
//         }
//       } catch (err) {
//         console.error("❌ Error fetching points history:", err);
//       }
//     };

//     pointsHistoryRecords();
//   }, [location.search, location.key, user, authLoading, sort, dispatch, currentPage]);

//   useEffect(() => {
//     const handlePopState = () => {
//       setCurrentPage(getPageFromURL());
//     };
//     window.addEventListener("popstate", handlePopState);
//     return () => window.removeEventListener("popstate", handlePopState);
//   }, []);

//   const itemsPerPage = 20;
//   const totalCount = currentPageRows?.pagination?.totalRecords || 0;
//   const totalItems = totalCount;

//   const headings = [
//     { label: "User details", value: "name" },
//     { label: "Installed", value: "installedDate" },
//     { label: "Subscribed", value: "subscribedDate" },
//     { label: "Points", value: "points" },
//   ];

//   const handlePageChange = (page) => {
//     setCurrentPage(page);

//     const params = new URLSearchParams(window.location.search);
//     params.set("page", page.toString());
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

//     setFilter((prev) => {
//       const updatedFilter = { ...prev, sort: value };
//       return updatedFilter;
//     });
//   };

//   console.log("📊 currentPageRows:", currentPageRows);
//   console.log("📊 currentPageRows.data:", currentPageRows?.data);
//   console.log("📊 totalCount:", totalCount);
//   console.log("📊 loading:", loading);

//   return {
//     currentPageRows,
//     totalItems,
//     totalCount,
//     loading,
//     itemsPerPage,
//     handlePageChange,
//     currentPage,
//     headings,
//     pointsHistory,
//     hanldeSortChange,
//     sort,
//     filter,
//   };
// };






import { useState, useEffect } from "react";
import { getPageFromURL } from "../../utils/utility";
import { readPointsHistory } from "../../api/slices/pointHistory/point-history";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import { FiltersDefaultValues } from "../../utils/static";

export const usePointHistory = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  // ✅ user is now always populated from cookie on app start (fixed in authSlice)
  const { user, loading: authLoading } = useSelector((state) => state.auth);

  const [currentPageRows, setCurrentPageRows] = useState({
    data: [],
    pagination: { totalRecords: 0, currentPage: 1, perPage: 20, totalPages: 0 },
  });

  const [searchParams, setSearchParams] = useSearchParams(location.search);
  const [currentPage, setCurrentPage] = useState(getPageFromURL());

  const { pointsHistory, loading } = useSelector(
    (state) => state.pointsHistory
  );

  const [filter, setFilter] = useState({
    sort: FiltersDefaultValues.None,
  });

  const page = searchParams.get("page");
  const sort = searchParams.get("sort");

  useEffect(() => {
    if (authLoading) return;

    const parsedPage = parseInt(page, 10);
    const resolvedPage = !isNaN(parsedPage) ? parsedPage : 1;

    setCurrentPage((prev) => (prev !== resolvedPage ? resolvedPage : prev));

    // ✅ FIXED: user.id works now because authSlice rehydrates from cookie
    const uid = user?.id;

    if (!uid) {
      console.warn("⚠️ No user ID found. user object:", user);
      return;
    }

    const filteredData = {
      uid: uid,
      page: resolvedPage,
      size: 20,
      sortBy: sort || "installedDate",
      order: "desc",
    };

    const fetchPointsHistory = async () => {
      try {
        const response = await dispatch(
          readPointsHistory({ params: filteredData })
        );

        if (response?.payload) {
          const data = response.payload;
          setCurrentPageRows({
            data: data?.data || [],
            pagination: data?.pagination || {
              totalRecords: 0,
              currentPage: 1,
              perPage: 20,
              totalPages: 0,
            },
          });
        } else {
          setCurrentPageRows({
            data: [],
            pagination: {
              totalRecords: 0,
              currentPage: 1,
              perPage: 20,
              totalPages: 0,
            },
          });
        }
      } catch (err) {
        console.error("❌ Error fetching points history:", err);
      }
    };

    fetchPointsHistory();

    // ✅ FIXED: currentPage removed from deps to prevent infinite loop
  }, [location.search, location.key, user, authLoading, sort, dispatch]);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(getPageFromURL());
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const itemsPerPage = 20;
  const totalCount = currentPageRows?.pagination?.totalRecords || 0;
  const totalItems = totalCount;

  const headings = [
    { label: "User details", value: "name" },
    { label: "Installed", value: "installedDate" },
    { label: "Subscribed", value: "subscribedDate" },
    { label: "Points", value: "points" },
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
    currentPageRows,
    totalItems,
    totalCount,
    loading,
    itemsPerPage,
    handlePageChange,
    currentPage,
    headings,
    pointsHistory,
    hanldeSortChange,
    sort,
    filter,
  };
};