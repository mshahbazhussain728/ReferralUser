import { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Cookies from "js-cookie";

import { getUser } from "./utils/auth";
import { isJSON } from "./utils/function";
import { scrollToTop } from "./utils/utility";
import { setUser } from "./api/slices/authSlice/auth";

import { DashboardPage }     from "./pages/dashboard";
import { FreeUserPage }      from "./pages/freeUser";
import { MonthlyUserPage }   from "./pages/monthlyUsers";
import { YearlyUserPage }    from "./pages/yearlyUsers";
import { MyRewardsPage }     from "./pages/myRewards";
import { PointHistoryPage }  from "./pages/pointHistory";
import { CouponHistoryPage } from "./pages/couponHistory";
import { RequestRedeemPage } from "./pages/requestRedeem";
import { RedeemHistoryPage } from "./pages/redeemHistory";
import Login                    from "./components/Login";
import SetUpProfile             from "./components/SetUpProfile";
import PaymentRequestChat       from "./components/PaymentRequestChat";
import { AppleCallbackHandler } from "./components/Login";

const GOOGLE_CLIENT_ID =
  import.meta.env.VITE_GOOGLE_CLIENT_ID ||
  "356026568517-62q9fhbdn6e1b632fnopj846gpuv0fj6.apps.googleusercontent.com";

// ── Protected Route ───────────────────────────────────────────────────────────
const ProtectedRoute = ({ children }) => {
  const token = Cookies.get("accessToken");
  if (!token) return <Navigate to="/login" replace />;
  return children;
};

// ── Public Route ──────────────────────────────────────────────────────────────
const PublicRoute = ({ children }) => {
  const token = Cookies.get("accessToken");
  if (token) return <Navigate to="/dashboard?status=ref-guide" replace />;
  return children;
};

// ── Setup Profile Route ───────────────────────────────────────────────────────
// Allows access whether or not the user has a token (Apple sets token
// before navigating here, Google arrives without one via location.state).
// Only blocks direct URL access with no token AND no provider state.
const SetupProfileRoute = ({ children }) => {
  const location = useLocation();
  const token    = Cookies.get("accessToken");
  const hasProviderState = location.state && location.state.provider;

  // Has token (Apple flow) OR has provider state (Google flow) → allow
  if (token || hasProviderState) return children;

  // Neither → user landed here directly, send back to login
  return <Navigate to="/login" replace />;
};

// ── Monthly Guard ─────────────────────────────────────────────────────────────
const MonthlyUserGuard = () => {
  const { search } = useLocation();
  const status = new URLSearchParams(search).get("status");
  const validStatuses = ["trial", "subscribed", "cancelled", "expired", "refund"];
  if (!validStatuses.includes(status)) return <Navigate to="/dashboard?status=ref-guide" replace />;
  return <MonthlyUserPage />;
};

// ── Yearly Guard ──────────────────────────────────────────────────────────────
const YearlyUserGuard = () => {
  const { search } = useLocation();
  const status = new URLSearchParams(search).get("status");
  const validStatuses = ["trial", "subscribed", "cancelled", "expired", "refund"];
  if (!validStatuses.includes(status)) return <Navigate to="/dashboard?status=ref-guide" replace />;
  return <YearlyUserPage />;
};

// ── AppContent ────────────────────────────────────────────────────────────────
const AppContent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (!token) return;

    // Don't redirect away from setupprofile — user needs to complete it first
    if (location.pathname === "/setupprofile") return;

    let user = null;
    try {
      const fromStorage = localStorage.getItem("user");
      if (fromStorage) user = JSON.parse(fromStorage);
    } catch {
      // ignore
    }

    if (!user) {
      user = isJSON(getUser());
    }

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      Cookies.set("referralUser", JSON.stringify(user), {
        expires:  1,
        sameSite: true,
        secure:   false,
      });
      dispatch(setUser(user));
      if (location.pathname === "/") {
        navigate("/dashboard?status=ref-guide", { replace: true });
      }
    }
  }, [location.pathname]);

  useEffect(() => {
    scrollToTop();
  }, [location.pathname]);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>

        {/* ── Public routes (blocked if already logged in) ── */}
        <Route path="/"       element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/login"  element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/signin" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><Login /></PublicRoute>} />


   {/* <Route path="/setupprofile" element={<PublicRoute><SetUpProfile /></PublicRoute>} /> */}



        {/* ── Apple OAuth callback ──────────────────────────────────────────────
            Apple redirects here → AppleCallbackHandler sets token then
            navigates to /setupprofile (NOT /dashboard directly).              ── */}
        <Route path="/auth/callback" element={<AppleCallbackHandler />} />

        {/* ── Setup profile ─────────────────────────────────────────────────────
            Apple flow: has token, no provider state → allowed via token check.
            Google flow: no token yet, but has location.state.provider → allowed.
            Direct URL access with neither → redirected to /login.             ── */}
        <Route path="/setupprofile" element={
          <SetupProfileRoute><SetUpProfile /></SetupProfileRoute>
        } />

        {/* ── Protected routes ── */}
        <Route path="/dashboard" element={
          <ProtectedRoute><DashboardPage /></ProtectedRoute>
        } />

        <Route path="/free-users" element={
          <ProtectedRoute><FreeUserPage /></ProtectedRoute>
        } />

        <Route path="/monthly-premium-users" element={
          <ProtectedRoute><MonthlyUserGuard /></ProtectedRoute>
        } />

        <Route path="/yearly-premium-users" element={
          <ProtectedRoute><YearlyUserGuard /></ProtectedRoute>
        } />

        <Route path="/my-rewards" element={
          <ProtectedRoute><MyRewardsPage /></ProtectedRoute>
        } />

        <Route path="/request-redeem" element={
          <ProtectedRoute><RequestRedeemPage /></ProtectedRoute>
        } />

        <Route path="/point-history" element={
          <ProtectedRoute><PointHistoryPage /></ProtectedRoute>
        } />

        <Route path="/coupon-history" element={
          <ProtectedRoute><CouponHistoryPage /></ProtectedRoute>
        } />

        <Route path="/redeem-history" element={
          <ProtectedRoute><RedeemHistoryPage /></ProtectedRoute>
        } />

        <Route path="/payment-request-chat" element={
          <ProtectedRoute><PaymentRequestChat /></ProtectedRoute>
        } />

        {/* ── Catch all ── */}
        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>
    </>
  );
};

const App = () => {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AppContent />
    </GoogleOAuthProvider>
  );
};

export default App;





