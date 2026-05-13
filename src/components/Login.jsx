import { useState, useEffect, useRef } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";

import Apple        from "../assets/pngs/Apple.png";
import Google       from "../assets/pngs/Google.png";
import Network      from "../assets/pngs/Network.png";
import FamocareLogo from "../assets/pngs/FamocareLogo.png";
import ShieldCheck  from "../assets/pngs/ShieldCheck.png";

import { setUser } from "../api/slices/authSlice/auth";

// ── Config ────────────────────────────────────────────────────────────────────
const RAW_DOMAIN = import.meta.env.VITE_API_DOMAIN || "https://apis.famocare.com";
const API_BASE   = `${RAW_DOMAIN.replace(/\/$/, "")}/api/referralsystem`;

const GOOGLE_CLIENT_ID =
  import.meta.env.VITE_GOOGLE_CLIENT_ID ||
  "356026568517-62q9fhbdn6e1b632fnopj846gpuv0fj6.apps.googleusercontent.com";

const APPLE_CONFIG = {
  clientId:    "com.appistanltd.famocare.web",
  scope:       "name email",
  redirectURI: "https://referral.famocare.com/auth/callback",
  usePopup:    true,
};

// ── Load Apple SDK once at module level ───────────────────────────────────────
let appleSDKReady = false;
const loadAppleSDK = () => {
  if (appleSDKReady || document.getElementById("apple-auth-sdk")) return;
  const script     = document.createElement("script");
  script.id        = "apple-auth-sdk";
  script.src       = "https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js";
  script.async     = true;
  script.onload    = () => {
    appleSDKReady = true;
    if (window.AppleID) {
      try {
        window.AppleID.auth.init({
          clientId:    APPLE_CONFIG.clientId,
          scope:       APPLE_CONFIG.scope,
          redirectURI: APPLE_CONFIG.redirectURI,
          state:       "origin:web",
          nonce:       Math.random().toString(36).substring(2, 15),
          usePopup:    true,
        });
      } catch (err) {
        console.error("[Apple SDK] Init error:", err);
      }
    }
  };
  document.body.appendChild(script);
};

loadAppleSDK();

// ── Utility ───────────────────────────────────────────────────────────────────
const resolveImageUrl = (...candidates) => {
  for (const url of candidates) {
    if (url && typeof url === "string" && url.trim() !== "" && url.trim() !== "null" && url.trim() !== "undefined") {
      return url.trim();
    }
  }
  return null;
};

// ── Normalize API Response ────────────────────────────────────────────────────
const normalizeAuthResponse = (data, googlePicture = null) => {
  const accessToken  = data.accessToken  || data.user?.accessToken;
  const refreshToken = data.refreshToken || data.user?.refreshToken;

  const cleanUser = {
    id:                     data.user?.id,
    name:                   data.user?.name,
    email:                  data.user?.email,
    imageUrl:               resolveImageUrl(googlePicture, data.user?.imageUrl),
    idType:                 data.user?.idType,
    status:                 data.user?.status,
    balance:                data.user?.balance,
    country:                data.user?.country,
    phoneCode:              data.user?.phoneCode,
    phoneNo:                data.user?.phoneNo,
    socialUid:              data.user?.socialUid,
    androidAppReferralLink: data.user?.androidAppReferralLink,
    iosAppReferralLink:     data.user?.iosAppReferralLink,
    createdAt:              data.user?.createdAt,
    updatedAt:              data.user?.updatedAt,
  };

  return { accessToken, refreshToken, user: cleanUser };
};

// ── API Helpers ───────────────────────────────────────────────────────────────
const apiPost = async (path, body) => {
  const url = `${API_BASE}${path}`;
  try {
    const response = await fetch(url, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(body),
    });
    const data = await response.json().catch(() => ({}));
    return { data, status: response.status, ok: response.ok };
  } catch (err) {
    console.error("[API] Fetch error:", err);
    return { data: {}, status: 0, ok: false };
  }
};

const apiPostWithTimeout = (path, body, timeoutMs = 10000) =>
  Promise.race([
    apiPost(path, body),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Request timed out. Please try again.")), timeoutMs)
    ),
  ]);

const appleSignInAPI = ({ socialUid, socialToken, email, username, imageUrl }) =>
  apiPostWithTimeout("/auth/signin/apple", {
    socialUid,
    socialToken,
    signupType: "apple",
    email:      email    || null,
    username:   username || null,
    imageUrl:   imageUrl || null,
  });

const googleSignUpAPI = ({ username, email, socialUid, socialToken, imageUrl }) =>
  apiPostWithTimeout("/auth/signup/google", {
    username,
    email,
    signupType: "google",
    socialUid,
    socialToken,
    imageUrl,
  });

const googleLoginAPI = ({ email, socialUid, socialToken, imageUrl }) =>
  apiPostWithTimeout("/auth/login/google", {
    email,
    socialUid,
    socialToken,
    signupType: "google",
    imageUrl,
  });

// ── Auth Checks ───────────────────────────────────────────────────────────────
const isLoginSuccess = (ok, data) => ok && data?.success === true;

const isUserAlreadyExists = (status, data) =>
  status === 409 ||
  status === 400 ||
  (data?.message && (
    data.message.toLowerCase().includes("already")   ||
    data.message.toLowerCase().includes("exists")    ||
    data.message.toLowerCase().includes("duplicate")
  ));

// ── Loading Screen ────────────────────────────────────────────────────────────
const LoadingScreen = ({ isApple }) => (
  <div className="min-h-screen w-screen bg-[#ECECEC] flex items-center justify-center">
    <div className="bg-white p-8 rounded-lg shadow-lg text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#237D93] mx-auto mb-4" />
      <h2 className="text-xl font-semibold text-[#055860] mb-2">
        {isApple ? "Completing Apple Sign-In..." : "Signing you in..."}
      </h2>
      <p className="text-gray-600">Please wait while we sign you in</p>
    </div>
  </div>
);

// ── Apple Callback Handler ────────────────────────────────────────────────────
export const AppleCallbackHandler = () => (
  <div className="min-h-screen w-screen bg-[#ECECEC] flex items-center justify-center">
    <div className="bg-white p-8 rounded-lg shadow-lg text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#237D93] mx-auto mb-4" />
      <h2 className="text-xl font-semibold text-[#055860] mb-2">Completing Sign-In...</h2>
      <p className="text-gray-600">Please wait while we set up your account</p>
    </div>
  </div>
);

// ── Main Auth Component ───────────────────────────────────────────────────────
const AuthContent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isProcessingGoogle, setIsProcessingGoogle] = useState(false);
  const [isProcessingApple,  setIsProcessingApple]  = useState(false);
  const [errorMessage,       setErrorMessage]       = useState("");
  const [appleReady,         setAppleReady]         = useState(appleSDKReady);

  const googleButtonRef        = useRef(null);
  const handleAppleResponseRef = useRef(null);

  // ── Poll until Apple SDK is ready ─────────────────────────────────────────
  useEffect(() => {
    if (appleSDKReady) { setAppleReady(true); return; }
    const interval = setInterval(() => {
      if (appleSDKReady || window.AppleID?.auth) {
        appleSDKReady = true;
        setAppleReady(true);
        clearInterval(interval);
      }
    }, 200);
    return () => clearInterval(interval);
  }, []);

  // ── JWT Decoder ────────────────────────────────────────────────────────────
  const decodeJWT = (token) => {
    const base64Url   = token.split(".")[1];
    const base64      = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64).split("").map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)).join("")
    );
    return JSON.parse(jsonPayload);
  };

  // ── Store Auth Data ────────────────────────────────────────────────────────
  const storeAuthData = (normalized) => {
    const { accessToken, refreshToken, user } = normalized;
    Cookies.set("accessToken",  accessToken,  { expires: 1 });
    Cookies.set("refreshToken", refreshToken, { expires: 7 });
    Cookies.set("referralUser", JSON.stringify(user), { expires: 1, sameSite: true, secure: false });
    dispatch(setUser(user));
    return user;
  };

  // ── Navigate to Dashboard (Google only) ───────────────────────────────────
  const navigateToDashboard = (normalized, extra = {}) => {
    const { accessToken, refreshToken, user } = normalized;
    navigate("/dashboard?status=ref-guide", {
      replace: true,
      state: { email: user.email, name: user.name, picture: user.imageUrl, accessToken, refreshToken, user, ...extra },
    });
  };

  // ── Navigate to Setup Profile (Apple only) ────────────────────────────────
  const navigateToSetupProfile = (normalized, extra = {}) => {
    const { accessToken, refreshToken, user } = normalized;
    navigate("/setupprofile", {
      replace: true,
      state: { email: user.email, name: user.name, picture: user.imageUrl, accessToken, refreshToken, user, ...extra },
    });
  };

  // ── Apple Response Handler ─────────────────────────────────────────────────
  handleAppleResponseRef.current = async (data) => {
    try {
      const idToken = data?.authorization?.id_token;
      const code    = data?.authorization?.code;
      const userObj = data?.user;

      if (!idToken && !code) {
        setErrorMessage("Apple Sign-In failed. No token received.");
        setIsProcessingApple(false);
        return;
      }

      let appleUid = localStorage.getItem("FamoCareAppleUserID");
      if (idToken) {
        try {
          const payload = JSON.parse(atob(idToken.split(".")[1]));
          if (payload.sub) {
            appleUid = payload.sub;
            localStorage.setItem("FamoCareAppleUserID", appleUid);
          }
        } catch (_) {}
      }
      if (!appleUid) {
        appleUid = crypto.randomUUID();
        localStorage.setItem("FamoCareAppleUserID", appleUid);
      }

      if (userObj?.name?.firstName || userObj?.name?.lastName) {
        const username = [userObj.name.firstName, userObj.name.lastName].filter(Boolean).join(" ").trim();
        if (username) localStorage.setItem("FamoCareAppleUsername", username);
      }

      const email = userObj?.email || (() => {
        try { return JSON.parse(atob(idToken.split(".")[1])).email || ""; }
        catch { return ""; }
      })();

      const savedUsername = localStorage.getItem("FamoCareAppleUsername") || "";

      const { data: apiData, ok: apiOk } = await appleSignInAPI({
        socialUid:   appleUid,
        socialToken: idToken || code,
        email,
        username:    savedUsername,
        imageUrl:    null,
      });

      if (apiOk && apiData?.success === true) {
        const apiName   = apiData.user?.name;
        const finalName = apiName && apiName !== "Apple User" && apiName.trim() !== ""
          ? apiName.trim()
          : savedUsername;

        const normalized = normalizeAuthResponse(
          { ...apiData, user: { ...apiData.user, name: finalName, imageUrl: null } },
          null
        );

        storeAuthData(normalized);

        // ✅ Apple always goes to setup-profile
        navigateToSetupProfile(normalized, { provider: "apple", appleUid });
        return;
      }

      throw new Error(apiData?.message || "Apple Sign-In failed. Please try again.");

    } catch (err) {
      console.error("Apple response handling error:", err);
      setErrorMessage(err.message || "Apple Sign-In failed. Please try again.");
      setIsProcessingApple(false);
    }
  };

  // ── Apple SDK Event Listeners ──────────────────────────────────────────────
  useEffect(() => {
    const handleAppleSuccess = (event) => {
      handleAppleResponseRef.current(event.detail.data || event.detail);
    };
    const handleAppleFailure = (event) => {
      const error = event.detail?.error || "Unknown error";
      if (error !== "popup_closed_by_user") {
        setErrorMessage(`Apple Sign-In failed: ${error}`);
      }
      setIsProcessingApple(false);
    };

    document.addEventListener("AppleIDSignInOnSuccess", handleAppleSuccess);
    document.addEventListener("AppleIDSignInOnFailure", handleAppleFailure);

    return () => {
      document.removeEventListener("AppleIDSignInOnSuccess", handleAppleSuccess);
      document.removeEventListener("AppleIDSignInOnFailure", handleAppleFailure);
    };
  }, []);

  // ── Google Sign-In ─────────────────────────────────────────────────────────
  const handleGoogleSignInSuccess = async (credentialResponse) => {
    setErrorMessage("");
    setIsProcessingGoogle(true);
    try {
      const decoded = decodeJWT(credentialResponse.credential);
      const { sub: socialUid, email, name: username, picture: googlePicture } = decoded;
      const socialToken = credentialResponse.credential;

      // 1. Try login first
      const { data: loginData, status: loginStatus, ok: loginOk } =
        await googleLoginAPI({ email, socialUid, socialToken, imageUrl: googlePicture });

      if (isLoginSuccess(loginOk, loginData)) {
        const normalized = normalizeAuthResponse(loginData, googlePicture);
        storeAuthData(normalized);
        // ✅ Google login → dashboard
        navigateToDashboard(normalized, { provider: "google", googleUid: socialUid, isNewUser: false });
        return;
      }

      // 2. Not found → try signup
      const isNotFound =
        loginStatus === 404 ||
        loginStatus === 401 ||
        (loginData?.message && (
          loginData.message.toLowerCase().includes("not found") ||
          loginData.message.toLowerCase().includes("no user")   ||
          loginData.message.toLowerCase().includes("invalid")
        ));

      if (isNotFound || !loginOk) {
        const { data: signupData, status: signupStatus, ok: signupOk } =
          await googleSignUpAPI({ username, email, socialUid, socialToken, imageUrl: googlePicture });

        if (signupOk && signupData?.success === true) {
          const normalized = normalizeAuthResponse(signupData, googlePicture);
          storeAuthData(normalized);
          // ✅ Google signup → dashboard
          navigateToDashboard(normalized, { provider: "google", googleUid: socialUid, isNewUser: true });
          return;
        }

        if (isUserAlreadyExists(signupStatus, signupData)) {
          const { data: retryData, ok: retryOk } =
            await googleLoginAPI({ email, socialUid, socialToken, imageUrl: googlePicture });

          if (isLoginSuccess(retryOk, retryData)) {
            const normalized = normalizeAuthResponse(retryData, googlePicture);
            storeAuthData(normalized);
            // ✅ Google retry login → dashboard
            navigateToDashboard(normalized, { provider: "google", googleUid: socialUid, isNewUser: false });
            return;
          }
        }

        throw new Error(signupData?.message || "Authentication failed. Please try again.");
      }

      throw new Error(loginData?.message || "Authentication failed. Please try again.");

    } catch (error) {
      console.error("Google auth error:", error);
      setErrorMessage(error.message || "Authentication failed. Please try again.");
      setIsProcessingGoogle(false);
    }
  };

  const handleGoogleSignInError = () => {
    setErrorMessage("Google Sign-In failed. Please try again.");
    setIsProcessingGoogle(false);
  };

  // ── Apple Sign-In Button ───────────────────────────────────────────────────
  const handleAppleSignIn = async () => {
    if (!appleReady || !window.AppleID?.auth) {
      return;
    }
    setErrorMessage("");
    setIsProcessingApple(true);
    try {
      await window.AppleID.auth.signIn();
    } catch (error) {
      if (error.error === "popup_closed_by_user") {
        // silent
      } else {
        setErrorMessage(`Apple Sign-In failed: ${error.error || error.message || "Unknown error"}`);
      }
      setIsProcessingApple(false);
    }
  };

  // ── Loading State ──────────────────────────────────────────────────────────
  if (isProcessingGoogle || isProcessingApple) {
    return <LoadingScreen isApple={isProcessingApple} />;
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen w-screen bg-[#ECECEC] flex items-center justify-center overflow-hidden">
      <div className="min-h-screen w-full max-w-[4366px] bg-white shadow-lg grid md:grid-cols-2 overflow-hidden">

        {/* LEFT SIDE */}
        <div className="flex flex-col items-center justify-center bg-[#237D93] px-10">
          <img src={Network} className="w-32 mb-6" alt="Network" />
          <h2 className="text-white text-xl font-bold mb-7">Grow Your Network</h2>
          <p className="text-center text-sm text-[#D6EEF1] max-w-xs mt-[-22px]">
            Sign in to continue managing referrals and growing your network effectively.
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col items-center justify-center py-14 px-8">
          <img
            src={FamocareLogo}
            className="h-[100px] w-14 mb-5"
            alt="Famocare Logo"
            onError={(e) => { e.target.style.display = "none"; }}
          />
          <h1 className="text-[35px] font-bold text-[#055860] mt-[-30px]">
            Famo<span className="text-[#691188]">care</span>
          </h1>
          <h1 className="text-[15px] font-bold text-[#111827] mt-[-10px]">
            Referral Web App
          </h1>
          <p className="text-sm text-gray-500 mb-[-5px] text-center">
            Welcome back! Please sign in to your account
          </p>

          {errorMessage && (
            <div className="w-full max-w-xs mb-4 p-2 mt-5 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
              <span className="text-red-500 mt-[-2px] whitespace-nowrap">⚠️</span>
              <p className="text-sm text-red-600 font-medium">{errorMessage}</p>
            </div>
          )}

          <div className="w-full max-w-xs space-y-3 mt-5">

            {/* Google Button */}
            <button
              onClick={() => {
                googleButtonRef.current?.querySelector('div[role="button"]')?.click();
              }}
              disabled={isProcessingGoogle || isProcessingApple}
              className="w-full bg-white text-gray-700 border border-gray-300 rounded-lg py-2.5 flex items-center justify-center gap-3 text-sm hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <img src={Google} className="w-5" alt="Google" />
              Continue with Google
            </button>

            <div ref={googleButtonRef} className="hidden">
              <GoogleLogin
                onSuccess={handleGoogleSignInSuccess}
                onError={handleGoogleSignInError}
                theme="outline"
                size="large"
                text="signin_with"
              />
            </div>

            {/* Apple Button */}
            <button
              onClick={handleAppleSignIn}
              disabled={isProcessingGoogle || isProcessingApple || !appleReady}
              className="w-full bg-black text-white rounded-lg py-2.5 flex items-center justify-center gap-3 text-sm hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <img src={Apple} className="w-5" alt="Apple" />
              Continue with Apple
            </button>

          </div>

          <div className="mt-6 flex items-center gap-1">
            <img src={ShieldCheck} className="w-4" alt="Shield" />
            <p className="text-xs text-gray-500">Secure Authentication</p>
          </div>
          <p className="text-[11px] text-gray-400 mt-1">
            Your data is protected with industry-standard security
          </p>
        </div>

      </div>
    </div>
  );
};

// ── Export ────────────────────────────────────────────────────────────────────
export const Auth = () => (
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <AuthContent />
  </GoogleOAuthProvider>
);

export default Auth;




// import { useState, useEffect, useRef } from "react";
// import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import Cookies from "js-cookie";

// import Apple        from "../assets/pngs/Apple.png";
// import Google       from "../assets/pngs/Google.png";
// import Network      from "../assets/pngs/Network.png";
// import FamocareLogo from "../assets/pngs/FamocareLogo.png";
// import ShieldCheck  from "../assets/pngs/ShieldCheck.png";

// import { setUser } from "../api/slices/authSlice/auth";

// // ── Config ────────────────────────────────────────────────────────────────────
// const RAW_DOMAIN = import.meta.env.VITE_API_DOMAIN || "https://apis.famocare.com";
// const API_BASE   = `${RAW_DOMAIN.replace(/\/$/, "")}/api/referralsystem`;

// const GOOGLE_CLIENT_ID =
//   import.meta.env.VITE_GOOGLE_CLIENT_ID ||
//   "356026568517-62q9fhbdn6e1b632fnopj846gpuv0fj6.apps.googleusercontent.com";

// const APPLE_CONFIG = {
//   clientId:    "com.appistanltd.famocare.web",
//   scope:       "name email",
//   redirectURI: "https://referral.famocare.com/auth/callback",
//   usePopup:    true,
// };

// // ── Load Apple SDK once at module level ───────────────────────────────────────
// let appleSDKReady = false;
// const loadAppleSDK = () => {
//   if (appleSDKReady || document.getElementById("apple-auth-sdk")) return;
//   const script     = document.createElement("script");
//   script.id        = "apple-auth-sdk";
//   script.src       = "https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js";
//   script.async     = true;
//   script.onload    = () => {
//     appleSDKReady = true;
//     if (window.AppleID) {
//       try {
//         window.AppleID.auth.init({
//           clientId:    APPLE_CONFIG.clientId,
//           scope:       APPLE_CONFIG.scope,
//           redirectURI: APPLE_CONFIG.redirectURI,
//           state:       "origin:web",
//           nonce:       Math.random().toString(36).substring(2, 15),
//           usePopup:    true,
//         });
//       } catch (err) {
//         console.error("[Apple SDK] Init error:", err);
//       }
//     }
//   };
//   document.body.appendChild(script);
// };

// loadAppleSDK();

// // ── Utility ───────────────────────────────────────────────────────────────────
// const resolveImageUrl = (...candidates) => {
//   for (const url of candidates) {
//     if (url && typeof url === "string" && url.trim() !== "" && url.trim() !== "null" && url.trim() !== "undefined") {
//       return url.trim();
//     }
//   }
//   return null;
// };

// // ── Normalize API Response ────────────────────────────────────────────────────
// const normalizeAuthResponse = (data, googlePicture = null) => {
//   const accessToken  = data.accessToken  || data.user?.accessToken;
//   const refreshToken = data.refreshToken || data.user?.refreshToken;

//   const cleanUser = {
//     id:                     data.user?.id,
//     name:                   data.user?.name,
//     email:                  data.user?.email,
//     imageUrl:               resolveImageUrl(googlePicture, data.user?.imageUrl),
//     idType:                 data.user?.idType,
//     status:                 data.user?.status,
//     balance:                data.user?.balance,
//     country:                data.user?.country,
//     phoneCode:              data.user?.phoneCode,
//     phoneNo:                data.user?.phoneNo,
//     socialUid:              data.user?.socialUid,
//     androidAppReferralLink: data.user?.androidAppReferralLink,
//     iosAppReferralLink:     data.user?.iosAppReferralLink,
//     createdAt:              data.user?.createdAt,
//     updatedAt:              data.user?.updatedAt,
//   };

//   return { accessToken, refreshToken, user: cleanUser };
// };

// // ── API Helpers ───────────────────────────────────────────────────────────────
// const apiPost = async (path, body) => {
//   const url = `${API_BASE}${path}`;
//   try {
//     const response = await fetch(url, {
//       method:  "POST",
//       headers: { "Content-Type": "application/json" },
//       body:    JSON.stringify(body),
//     });
//     const data = await response.json().catch(() => ({}));
//     return { data, status: response.status, ok: response.ok };
//   } catch (err) {
//     console.error("[API] Fetch error:", err);
//     return { data: {}, status: 0, ok: false };
//   }
// };

// const apiPostWithTimeout = (path, body, timeoutMs = 10000) =>
//   Promise.race([
//     apiPost(path, body),
//     new Promise((_, reject) =>
//       setTimeout(() => reject(new Error("Request timed out. Please try again.")), timeoutMs)
//     ),
//   ]);

// const appleSignInAPI = ({ socialUid, socialToken, email, username, imageUrl }) =>
//   apiPostWithTimeout("/auth/signin/apple", {
//     socialUid,
//     socialToken,
//     signupType: "apple",
//     email:      email    || null,
//     username:   username || null,
//     imageUrl:   imageUrl || null,
//   });

// const googleSignUpAPI = ({ username, email, socialUid, socialToken, imageUrl }) =>
//   apiPostWithTimeout("/auth/signup/google", {
//     username,
//     email,
//     signupType: "google",
//     socialUid,
//     socialToken,
//     imageUrl,
//   });

// const googleLoginAPI = ({ email, socialUid, socialToken, imageUrl }) =>
//   apiPostWithTimeout("/auth/login/google", {
//     email,
//     socialUid,
//     socialToken,
//     signupType: "google",
//     imageUrl,
//   });

// // ── Auth Checks ───────────────────────────────────────────────────────────────
// const isLoginSuccess = (ok, data) => ok && data?.success === true;

// const isUserAlreadyExists = (status, data) =>
//   status === 409 ||
//   status === 400 ||
//   (data?.message && (
//     data.message.toLowerCase().includes("already")   ||
//     data.message.toLowerCase().includes("exists")    ||
//     data.message.toLowerCase().includes("duplicate")
//   ));

// // ── Loading Screen ────────────────────────────────────────────────────────────
// const LoadingScreen = ({ isApple }) => (
//   <div className="min-h-screen w-screen bg-[#ECECEC] flex items-center justify-center">
//     <div className="bg-white p-8 rounded-lg shadow-lg text-center">
//       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#237D93] mx-auto mb-4" />
//       <h2 className="text-xl font-semibold text-[#055860] mb-2">
//         {isApple ? "Completing Apple Sign-In..." : "Signing you in..."}
//       </h2>
//       <p className="text-gray-600">Please wait while we sign you in</p>
//     </div>
//   </div>
// );

// // ── Apple Callback Handler ────────────────────────────────────────────────────
// export const AppleCallbackHandler = () => (
//   <div className="min-h-screen w-screen bg-[#ECECEC] flex items-center justify-center">
//     <div className="bg-white p-8 rounded-lg shadow-lg text-center">
//       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#237D93] mx-auto mb-4" />
//       <h2 className="text-xl font-semibold text-[#055860] mb-2">Completing Sign-In...</h2>
//       <p className="text-gray-600">Please wait while we set up your account</p>
//     </div>
//   </div>
// );

// // ── Main Auth Component ───────────────────────────────────────────────────────
// const AuthContent = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [isProcessingGoogle, setIsProcessingGoogle] = useState(false);
//   const [isProcessingApple,  setIsProcessingApple]  = useState(false);
//   const [errorMessage,       setErrorMessage]       = useState("");
//   const [appleReady,         setAppleReady]         = useState(appleSDKReady);

//   const googleButtonRef        = useRef(null);
//   const handleAppleResponseRef = useRef(null);

//   // ── Poll until Apple SDK is ready ─────────────────────────────────────────
//   useEffect(() => {
//     if (appleSDKReady) { setAppleReady(true); return; }
//     const interval = setInterval(() => {
//       if (appleSDKReady || window.AppleID?.auth) {
//         appleSDKReady = true;
//         setAppleReady(true);
//         clearInterval(interval);
//       }
//     }, 200);
//     return () => clearInterval(interval);
//   }, []);

//   // ── JWT Decoder ────────────────────────────────────────────────────────────
//   const decodeJWT = (token) => {
//     const base64Url   = token.split(".")[1];
//     const base64      = base64Url.replace(/-/g, "+").replace(/_/g, "/");
//     const jsonPayload = decodeURIComponent(
//       atob(base64).split("").map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)).join("")
//     );
//     return JSON.parse(jsonPayload);
//   };

//   // ── Store Auth Data ────────────────────────────────────────────────────────
//   const storeAuthData = (normalized) => {
//     const { accessToken, refreshToken, user } = normalized;
//     Cookies.set("accessToken",  accessToken,  { expires: 1 });
//     Cookies.set("refreshToken", refreshToken, { expires: 7 });
//     Cookies.set("referralUser", JSON.stringify(user), { expires: 1, sameSite: true, secure: false });
//     dispatch(setUser(user));
//     return user;
//   };

//   // ── Navigate to Dashboard (Google only) ───────────────────────────────────
//   const navigateToDashboard = (normalized, extra = {}) => {
//     const { accessToken, refreshToken, user } = normalized;
//     navigate("/dashboard?status=ref-guide", {
//       replace: true,
//       state: { email: user.email, name: user.name, picture: user.imageUrl, accessToken, refreshToken, user, ...extra },
//     });
//   };

//   // ── Navigate to Setup Profile (Apple only) ────────────────────────────────
//   const navigateToSetupProfile = (normalized, extra = {}) => {
//     const { accessToken, refreshToken, user } = normalized;
//     navigate("/setupprofile", {
//       replace: true,
//       state: { email: user.email, name: user.name, picture: user.imageUrl, accessToken, refreshToken, user, ...extra },
//     });
//   };

//   // ── Apple Response Handler ─────────────────────────────────────────────────
//   handleAppleResponseRef.current = async (data) => {
//     try {
//       const idToken = data?.authorization?.id_token;
//       const code    = data?.authorization?.code;
//       const userObj = data?.user;

//       if (!idToken && !code) {
//         setErrorMessage("Apple Sign-In failed. No token received.");
//         setIsProcessingApple(false);
//         return;
//       }

//       let appleUid = localStorage.getItem("FamoCareAppleUserID");
//       if (idToken) {
//         try {
//           const payload = JSON.parse(atob(idToken.split(".")[1]));
//           if (payload.sub) {
//             appleUid = payload.sub;
//             localStorage.setItem("FamoCareAppleUserID", appleUid);
//           }
//         } catch (_) {}
//       }
//       if (!appleUid) {
//         appleUid = crypto.randomUUID();
//         localStorage.setItem("FamoCareAppleUserID", appleUid);
//       }

//       if (userObj?.name?.firstName || userObj?.name?.lastName) {
//         const username = [userObj.name.firstName, userObj.name.lastName].filter(Boolean).join(" ").trim();
//         if (username) localStorage.setItem("FamoCareAppleUsername", username);
//       }

//       const email = userObj?.email || (() => {
//         try { return JSON.parse(atob(idToken.split(".")[1])).email || ""; }
//         catch { return ""; }
//       })();

//       const savedUsername = localStorage.getItem("FamoCareAppleUsername") || "";

//       const { data: apiData, ok: apiOk } = await appleSignInAPI({
//         socialUid:   appleUid,
//         socialToken: idToken || code,
//         email,
//         username:    savedUsername,
//         imageUrl:    null,
//       });

//       if (apiOk && apiData?.success === true) {
//         const apiName   = apiData.user?.name;
//         const finalName = apiName && apiName !== "Apple User" && apiName.trim() !== ""
//           ? apiName.trim()
//           : savedUsername;

//         const normalized = normalizeAuthResponse(
//           { ...apiData, user: { ...apiData.user, name: finalName, imageUrl: null } },
//           null
//         );

//         storeAuthData(normalized);

//         // ✅ Apple always goes to setup-profile
//         navigateToSetupProfile(normalized, { provider: "apple", appleUid });
//         return;
//       }

//       throw new Error(apiData?.message || "Apple Sign-In failed. Please try again.");

//     } catch (err) {
//       console.error("Apple response handling error:", err);
//       setErrorMessage(err.message || "Apple Sign-In failed. Please try again.");
//       setIsProcessingApple(false);
//     }
//   };

//   // ── Apple SDK Event Listeners ──────────────────────────────────────────────
//   useEffect(() => {
//     const handleAppleSuccess = (event) => {
//       handleAppleResponseRef.current(event.detail.data || event.detail);
//     };
//     const handleAppleFailure = (event) => {
//       const error = event.detail?.error || "Unknown error";
//       if (error !== "popup_closed_by_user") {
//         setErrorMessage(`Apple Sign-In failed: ${error}`);
//       }
//       setIsProcessingApple(false);
//     };

//     document.addEventListener("AppleIDSignInOnSuccess", handleAppleSuccess);
//     document.addEventListener("AppleIDSignInOnFailure", handleAppleFailure);

//     return () => {
//       document.removeEventListener("AppleIDSignInOnSuccess", handleAppleSuccess);
//       document.removeEventListener("AppleIDSignInOnFailure", handleAppleFailure);
//     };
//   }, []);

//   // ── Google Sign-In ─────────────────────────────────────────────────────────
//   const handleGoogleSignInSuccess = async (credentialResponse) => {
//     setErrorMessage("");
//     setIsProcessingGoogle(true);
//     try {
//       const decoded = decodeJWT(credentialResponse.credential);
//       const { sub: socialUid, email, name: username, picture: googlePicture } = decoded;
//       const socialToken = credentialResponse.credential;

//       // 1. Try login first
//       const { data: loginData, status: loginStatus, ok: loginOk } =
//         await googleLoginAPI({ email, socialUid, socialToken, imageUrl: googlePicture });

//       if (isLoginSuccess(loginOk, loginData)) {
//         const normalized = normalizeAuthResponse(loginData, googlePicture);
//         storeAuthData(normalized);
//         // ✅ Google login → dashboard
//         navigateToDashboard(normalized, { provider: "google", googleUid: socialUid, isNewUser: false });
//         return;
//       }

//       // 2. Not found → try signup
//       const isNotFound =
//         loginStatus === 404 ||
//         loginStatus === 401 ||
//         (loginData?.message && (
//           loginData.message.toLowerCase().includes("not found") ||
//           loginData.message.toLowerCase().includes("no user")   ||
//           loginData.message.toLowerCase().includes("invalid")
//         ));

//       if (isNotFound || !loginOk) {
//         const { data: signupData, status: signupStatus, ok: signupOk } =
//           await googleSignUpAPI({ username, email, socialUid, socialToken, imageUrl: googlePicture });

//         if (signupOk && signupData?.success === true) {
//           const normalized = normalizeAuthResponse(signupData, googlePicture);
//           storeAuthData(normalized);
//           // ✅ Google signup → dashboard
//           navigateToDashboard(normalized, { provider: "google", googleUid: socialUid, isNewUser: true });
//           return;
//         }

//         if (isUserAlreadyExists(signupStatus, signupData)) {
//           const { data: retryData, ok: retryOk } =
//             await googleLoginAPI({ email, socialUid, socialToken, imageUrl: googlePicture });

//           if (isLoginSuccess(retryOk, retryData)) {
//             const normalized = normalizeAuthResponse(retryData, googlePicture);
//             storeAuthData(normalized);
//             // ✅ Google retry login → dashboard
//             navigateToDashboard(normalized, { provider: "google", googleUid: socialUid, isNewUser: false });
//             return;
//           }
//         }

//         throw new Error(signupData?.message || "Authentication failed. Please try again.");
//       }

//       throw new Error(loginData?.message || "Authentication failed. Please try again.");

//     } catch (error) {
//       console.error("Google auth error:", error);
//       setErrorMessage(error.message || "Authentication failed. Please try again.");
//       setIsProcessingGoogle(false);
//     }
//   };

//   const handleGoogleSignInError = () => {
//     setErrorMessage("Google Sign-In failed. Please try again.");
//     setIsProcessingGoogle(false);
//   };

//   // ── Apple Sign-In Button ───────────────────────────────────────────────────
//   const handleAppleSignIn = async () => {
//     if (!appleReady || !window.AppleID?.auth) {
//       return;
//     }
//     setErrorMessage("");
//     setIsProcessingApple(true);
//     try {
//       await window.AppleID.auth.signIn();
//     } catch (error) {
//       if (error.error === "popup_closed_by_user") {
//         // silent
//       } else {
//         setErrorMessage(`Apple Sign-In failed: ${error.error || error.message || "Unknown error"}`);
//       }
//       setIsProcessingApple(false);
//     }
//   };

//   // ── Loading State ──────────────────────────────────────────────────────────
//   if (isProcessingGoogle || isProcessingApple) {
//     return <LoadingScreen isApple={isProcessingApple} />;
//   }

//   // ── Render ─────────────────────────────────────────────────────────────────
//   return (
//     <div className="min-h-screen w-screen bg-[#ECECEC] flex items-center justify-center overflow-hidden">
//       <div className="min-h-screen w-full max-w-[4366px] bg-white shadow-lg grid md:grid-cols-2 overflow-hidden">

//         {/* LEFT SIDE */}
//         <div className="flex flex-col items-center justify-center bg-[#237D93] px-10">
//           <img src={Network} className="w-32 mb-6" alt="Network" />
//           <h2 className="text-white text-xl font-bold mb-7">Grow Your Network</h2>
//           <p className="text-center text-sm text-[#D6EEF1] max-w-xs mt-[-22px]">
//             Sign in to continue managing referrals and growing your network effectively.
//           </p>
//         </div>

//         {/* RIGHT SIDE */}
//         <div className="flex flex-col items-center justify-center py-14 px-8">
//           <img
//             src={FamocareLogo}
//             className="h-[100px] w-14 mb-5"
//             alt="Famocare Logo"
//             onError={(e) => { e.target.style.display = "none"; }}
//           />
//           <h1 className="text-[35px] font-bold text-[#055860] mt-[-30px]">
//             Famo<span className="text-[#691188]">care</span>
//           </h1>
//           <h1 className="text-[15px] font-bold text-[#111827] mt-[-10px]">
//             Referral Web App
//           </h1>
//           <p className="text-sm text-gray-500 mb-[-5px] text-center">
//             Welcome back! Please sign in to your account
//           </p>

//           {errorMessage && (
//             <div className="w-full max-w-xs mb-4 p-2 mt-5 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
//               <span className="text-red-500 mt-[-2px] whitespace-nowrap">⚠️</span>
//               <p className="text-sm text-red-600 font-medium">{errorMessage}</p>
//             </div>
//           )}

//           <div className="w-full max-w-xs space-y-3 mt-5">

//             {/* Google Button */}
//             <button
//               onClick={() => {
//                 googleButtonRef.current?.querySelector('div[role="button"]')?.click();
//               }}
//               disabled={isProcessingGoogle || isProcessingApple}
//               className="w-full bg-white text-gray-700 border border-gray-300 rounded-lg py-2.5 flex items-center justify-center gap-3 text-sm hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               <img src={Google} className="w-5" alt="Google" />
//               Continue with Google
//             </button>

//             <div ref={googleButtonRef} className="hidden">
//               <GoogleLogin
//                 onSuccess={handleGoogleSignInSuccess}
//                 onError={handleGoogleSignInError}
//                 theme="outline"
//                 size="large"
//                 text="signin_with"
//               />
//             </div>

//             {/* Apple Button */}
//             <button
//               onClick={handleAppleSignIn}
//               disabled={isProcessingGoogle || isProcessingApple || !appleReady}
//               className="w-full bg-black text-white rounded-lg py-2.5 flex items-center justify-center gap-3 text-sm hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               <img src={Apple} className="w-5" alt="Apple" />
//               Continue with Apple
//             </button>

//           </div>

//           <div className="mt-6 flex items-center gap-1">
//             <img src={ShieldCheck} className="w-4" alt="Shield" />
//             <p className="text-xs text-gray-500">Secure Authentication</p>
//           </div>
//           <p className="text-[11px] text-gray-400 mt-1">
//             Your data is protected with industry-standard security
//           </p>
//         </div>

//       </div>
//     </div>
//   );
// };

// // ── Export ────────────────────────────────────────────────────────────────────
// export const Auth = () => (
//   <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
//     <AuthContent />
//   </GoogleOAuthProvider>
// );

// export default Auth;