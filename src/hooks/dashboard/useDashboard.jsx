


// import { useDispatch, useSelector } from "react-redux";
// import { ModalType } from "../../types/ui";
// import { updateModalType } from "../../api/slices/globalSlice/global";
// import { useEffect, useState } from "react";
// import {
//   readDashboardLinks,
//   readDashboardResults,
// } from "../../api/slices/dashboard/dashboardSlice";
// import { useLocation } from "react-router-dom";

// // Global callback store — keeps functions OUT of Redux
// const modalCallbacks = {};
// export const getModalCallback = (key) => modalCallbacks[key];
// export const setModalCallback = (key, fn) => {
//   modalCallbacks[key] = fn;
// };

// export const useDashboard = () => {
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const [links, setLinks] = useState(null);
//   const [results, setResults] = useState(null);
//   const { loading } = useSelector((state) => state.dashboard);
//   const { user, loading: authLoading } = useSelector((state) => state.auth);

//   const queryParams = new URLSearchParams(location.search);
//   const status = queryParams.get("status");

//   // Primary source: user object from login response
//   // Fallback source: fetched links state
//   const androidReferralLink =
//     user?.androidAppReferralLink ||
//     links?.androidAppReferralLink ||
//     "";

//   const iosReferralLink =
//     user?.iosAppReferralLink ||
//     links?.iosAppReferralLink ||
//     "";

//   const handleShare = (deviceType) => {
//     dispatch(
//       updateModalType({
//         type: ModalType.SHARE_MODAL,
//         data: {
//           deviceType,
//           androidAppReferralLink: androidReferralLink,
//           iosAppReferralLink: iosReferralLink,
//         },
//       })
//     );
//   };

//   const handleRefLinkModal = (deviceType) => {
//     setModalCallback("onShare", () => handleShare(deviceType));
//     dispatch(
//       updateModalType({
//         type: ModalType.REFERRAL_LINK_MODAL,
//         data: {
//           deviceType,
//           androidAppReferralLink: androidReferralLink,
//           iosAppReferralLink: iosReferralLink,
//         },
//       })
//     );
//   };

//   const handleQRCodeModal = (deviceType) => {
//     setModalCallback("onShare", () => handleShare(deviceType));
//     dispatch(
//       updateModalType({
//         type: ModalType.REFERRAL_QR_CODE_MODAL,
//         data: {
//           deviceType,
//           androidAppReferralLink: androidReferralLink,
//           iosAppReferralLink: iosReferralLink,
//         },
//       })
//     );
//   };

//   const handleRefDiscountCodeModal = (deviceType) => {
//     setModalCallback("onShare", () => handleShare(deviceType));
//     dispatch(
//       updateModalType({
//         type: ModalType.REFERRAL_DISCOUNT_CODE_MODAL,
//         data: {
//           deviceType,
//           androidAppReferralLink: androidReferralLink,
//           iosAppReferralLink: iosReferralLink,
//         },
//       })
//     );
//   };

//   // ── Fetch dashboard counts ────────────────────────────────────────────────
//   useEffect(() => {
//     if (authLoading) return;

//     const fetchDashboardResults = async () => {
//       const uid = user?.id;
//       if (!uid) return;
//       try {
//         const response = await dispatch(
//           readDashboardResults({ data: { uid } })
//         );
//         if (response?.payload?.counts) {
//           setResults({ ...response?.payload?.counts });
//         }
//       } catch (err) {
//         console.error("Error fetching dashboard results:", err);
//       }
//     };

//     if (status === "results") {
//       fetchDashboardResults();
//     }
//   }, [dispatch, user, authLoading, status]);

//   // ── Fetch app links — always fetch when user is ready ────────────────────
//   // This ensures new users (whose links may not be in the login response yet)
//   // always get their referral links loaded.
//   useEffect(() => {
//     if (authLoading) return;

//     // If links are already in the user object, skip the extra fetch
//     if (user?.androidAppReferralLink && user?.iosAppReferralLink) return;

//     const fetchDashboardLinks = async () => {
//       try {
//         const response = await dispatch(readDashboardLinks({}));
//         if (response?.payload?.data) {
//           setLinks(response?.payload?.data);
//         }
//       } catch (err) {
//         console.error("Error fetching dashboard links:", err);
//       }
//     };

//     fetchDashboardLinks();
//   }, [dispatch, user, authLoading]);

//   return {
//     handleRefLinkModal,
//     handleQRCodeModal,
//     handleRefDiscountCodeModal,
//     results,
//     links,
//     loading,
//   };
// };



////updated


import { useDispatch, useSelector } from "react-redux";
import { ModalType } from "../../types/ui";
import { updateModalType } from "../../api/slices/globalSlice/global";
import { useEffect, useState } from "react";
import {
  readDashboardLinks,
  readDashboardResults,
} from "../../api/slices/dashboard/dashboardSlice";
import { useLocation } from "react-router-dom";

const modalCallbacks = {};
export const getModalCallback = (key) => modalCallbacks[key];
export const setModalCallback = (key, fn) => {
  modalCallbacks[key] = fn;
};

export const useDashboard = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [links, setLinks] = useState(null);
  const [results, setResults] = useState(null);
  const { loading } = useSelector((state) => state.dashboard);
  const { user, loading: authLoading } = useSelector((state) => state.auth);

  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get("status");

  const androidReferralLink =
    user?.androidAppReferralLink ||
    links?.androidAppReferralLink ||
    "";

  const iosReferralLink =
    user?.iosAppReferralLink ||
    links?.iosAppReferralLink ||
    "";

  const handleShare = (deviceType) => {
    dispatch(
      updateModalType({
        type: ModalType.SHARE_MODAL,
        data: {
          deviceType,
          androidAppReferralLink: androidReferralLink,
          iosAppReferralLink: iosReferralLink,
        },
      })
    );
  };

  const handleRefLinkModal = (deviceType) => {
    setModalCallback("onShare", () => handleShare(deviceType));
    dispatch(
      updateModalType({
        type: ModalType.REFERRAL_LINK_MODAL,
        data: {
          deviceType,
          androidAppReferralLink: androidReferralLink,
          iosAppReferralLink: iosReferralLink,
        },
      })
    );
  };

  const handleQRCodeModal = (deviceType) => {
    setModalCallback("onShare", () => handleShare(deviceType));
    dispatch(
      updateModalType({
        type: ModalType.REFERRAL_QR_CODE_MODAL,
        data: {
          deviceType,
          androidAppReferralLink: androidReferralLink,
          iosAppReferralLink: iosReferralLink,
        },
      })
    );
  };

  const handleRefDiscountCodeModal = (deviceType) => {
    setModalCallback("onShare", () => handleShare(deviceType));
    dispatch(
      updateModalType({
        type: ModalType.REFERRAL_DISCOUNT_CODE_MODAL,
        data: {
          deviceType,
          androidAppReferralLink: androidReferralLink,
          iosAppReferralLink: iosReferralLink,
        },
      })
    );
  };

  // ── Fetch dashboard counts ────────────────────────────────────────────────
  useEffect(() => {
    if (authLoading) return;

    const fetchDashboardResults = async () => {
      const uid = user?.id;
      // ✅ Don't fetch if no valid user ID
      if (!uid) return;

      try {
        const response = await dispatch(
          readDashboardResults({ data: { uid } })
        );
        if (response?.payload?.counts) {
          setResults({ ...response?.payload?.counts });
        }
      } catch (err) {}
    };

    if (status === "results") {
      fetchDashboardResults();
    }
  }, [dispatch, user, authLoading, status]);

  // ── Fetch app links ───────────────────────────────────────────────────────
  useEffect(() => {
    if (authLoading) return;

    // ✅ Don't fetch if no valid user ID — this causes the 400
    const uid = user?.id;
    if (!uid) return;

    // ✅ Skip if links already in user object
    if (user?.androidAppReferralLink && user?.iosAppReferralLink) return;

    const fetchDashboardLinks = async () => {
      try {
        const response = await dispatch(readDashboardLinks({}));
        if (response?.payload?.data) {
          setLinks(response?.payload?.data);
        }
      } catch (err) {}
    };

    fetchDashboardLinks();
  }, [dispatch, user, authLoading]);

  return {
    handleRefLinkModal,
    handleQRCodeModal,
    handleRefDiscountCodeModal,
    results,
    links,
    loading,
  };
};