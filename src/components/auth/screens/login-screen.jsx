

// import { useState, useEffect, useRef } from "react";
// import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
// import { useNavigate, useLocation } from "react-router-dom";

// import Apple from "../assets/pngs/Apple.png";
// import Google from "../assets/pngs/Google.png";
// import Network from "../assets/pngs/Network.png";
// import FamocareLogo from "../assets/pngs/FamocareLogo.png";
// import ShieldCheck from "../assets/pngs/ShieldCheck.png";

// const GOOGLE_CLIENT_ID =
//   import.meta.env.VITE_GOOGLE_CLIENT_ID ||
//   "356026568517-62q9fhbdn6e1b632fnopj846gpuv0fj6.apps.googleusercontent.com";

// const APPLE_CONFIG = {
//   clientId: "com.appistanltd.famocare",
//   teamId: "XYQV46F93K",
//   keyId: "6752908773",
//   redirectURI: "http://localhost:5173/auth/apple/callback",
//   scope: "name email",
//   responseType: "code id_token",
//   responseMode: "form_post",
// };

// // ─────────────────────────────────────────────
// //  API HELPERS
// // ─────────────────────────────────────────────

// /**
//  * Google SIGN UP → POST /api/auth/signup/google
//  * Postman body fields: username, email, signupType, socialUid, socialToken, imageUrl
//  */
// const googleSignUpAPI = async ({ username, email, socialUid, socialToken, imageUrl }) => {
//   const payload = {
//     username,
//     email,
//     signupType: "google",
//     socialUid,
//     socialToken,
//     imageUrl,
//   };


//   const response = await fetch(
//     "https://referralapis.appistan.co/api/auth/signup/google",
//     {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     }
//   );

//   const data = await response.json().catch(() => ({}));

//   if (!response.ok) {
//     throw new Error(data.message || data.error || `Signup API error: ${response.status}`);
//   }
//   return data;
// };

// /**
//  * Google SIGN IN → POST /api/auth/login/google
//  * Required body fields: email, socialUid, socialToken (login likely needs fewer fields)
//  */
// const googleLoginAPI = async ({ email, socialUid, socialToken }) => {
//   const payload = {
//     email,
//     socialUid,
//     socialToken,
//     signupType: "google",
//   };


//   const response = await fetch(
//     "https://referralapis.appistan.co/api/auth/login/google",
//     {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     }
//   );

//   const data = await response.json().catch(() => ({}));

//   if (!response.ok) {
//     throw new Error(data.message || data.error || `Login API error: ${response.status}`);
//   }
//   return data;
// };

// /** Store tokens and user in localStorage */
// const storeAuthData = (apiResponse) => {
//   localStorage.setItem("accessToken", apiResponse.accessToken);
//   localStorage.setItem("refreshToken", apiResponse.refreshToken);
//   localStorage.setItem("user", JSON.stringify(apiResponse.user));
// };

// // ─────────────────────────────────────────────
// //  COMPONENT
// // ─────────────────────────────────────────────

// const AuthContent = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [isSignUp, setIsSignUp] = useState(location.pathname === "/signup");
//   const [isProcessingApple, setIsProcessingApple] = useState(false);
//   const [isProcessingGoogle, setIsProcessingGoogle] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   const googleButtonRef = useRef(null);

//   const decodeJWT = (token) => {
//     try {
//       const base64Url = token.split(".")[1];
//       const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
//       const jsonPayload = decodeURIComponent(
//         atob(base64)
//           .split("")
//           .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
//           .join("")
//       );
//       return JSON.parse(jsonPayload);
//     } catch (error) {
//       throw error;
//     }
//   };

//   // Load Apple SDK
//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src =
//       "https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js";
//     script.async = true;
//     script.onload = () => {
//       if (window.AppleID) {
//         try {
//           window.AppleID.auth.init({
//             clientId: APPLE_CONFIG.clientId,
//             teamId: APPLE_CONFIG.teamId,
//             keyId: APPLE_CONFIG.keyId,
//             redirectURI: APPLE_CONFIG.redirectURI,
//             scope: APPLE_CONFIG.scope,
//             responseType: APPLE_CONFIG.responseType,
//             responseMode: APPLE_CONFIG.responseMode,
//             state: "origin:web",
//             nonce: Math.random().toString(36).substring(2, 15),
//           });
//         } catch (error) {
//         }
//       }
//     };
//     document.body.appendChild(script);
//     return () => {
//       if (document.body.contains(script)) document.body.removeChild(script);
//     };
//   }, []);

//   // Apple Callback
//   useEffect(() => {
//     const handleAppleCallback = async () => {
//       const urlParams = new URLSearchParams(location.search);
//       const code = urlParams.get("code");
//       const idToken = urlParams.get("id_token");
//       const userParam = urlParams.get("user");

//       if (!code && !idToken) return;

//       setIsProcessingApple(true);

//       try {
//         let appleUserID = localStorage.getItem("FamoCareAppleUserID");
//         if (!appleUserID) {
//           appleUserID = crypto.randomUUID();
//           localStorage.setItem("FamoCareAppleUserID", appleUserID);
//         }

//         let userName = "";
//         let userEmail = "";

//         if (userParam) {
//           try {
//             const userData = JSON.parse(userParam);
//             if (userData.name) {
//               userName = `${userData.name.firstName || ""} ${userData.name.lastName || ""}`.trim();
//             }
//             userEmail = userData.email || "";
//           } catch (e) {
//           }
//         }

//         if (idToken && !userEmail) {
//           try {
//             const parts = idToken.split(".");
//             const payload = JSON.parse(atob(parts[1]));
//             userEmail = payload.email || "";
//           } catch (e) {
//           }
//         }

//         navigate("/setupprofile", {
//           state: {
//             provider: "apple",
//             email: userEmail,
//             name: userName,
//             appleUid: appleUserID,
//             idToken,
//             authorizationCode: code,
//           },
//         });
//       } catch (error) {
//         setErrorMessage("Failed to process Apple Sign-In. Please try again.");
//         setIsProcessingApple(false);
//       }
//     };

//     handleAppleCallback();
//   }, [location.search, navigate]);

//   // Google success — calls signup OR login based on isSignUp
//   const handleGoogleSignInSuccess = async (credentialResponse) => {
//     setIsProcessingGoogle(true);
//     setErrorMessage("");

//     try {
//       const decodedToken = decodeJWT(credentialResponse.credential);
//       const {
//         sub: socialUid,   // Google user ID  → socialUid
//         email,
//         name: username,   // Google name     → username
//         picture: imageUrl // Google picture  → imageUrl
//       } = decodedToken;

//       // socialToken = the raw Google ID token (JWT)
//       const socialToken = credentialResponse.credential;


//       let apiResponse;

//       if (isSignUp) {
//         apiResponse = await googleSignUpAPI({
//           username,
//           email,
//           socialUid,
//           socialToken,
//           imageUrl,
//         });
//       } else {
//         apiResponse = await googleLoginAPI({
//           email,
//           socialUid,
//           socialToken,
//         });
//       }

//       if (apiResponse.success) {
//         storeAuthData(apiResponse);

//         setTimeout(() => {
//           navigate("/dashboard?status=ref-guide", {
//             state: {
//               provider: "google",
//               email: apiResponse.user.email,
//               name: apiResponse.user.name,
//               picture: apiResponse.user.imageUrl || imageUrl,
//               googleUid: socialUid,
//               accessToken: apiResponse.accessToken,
//               refreshToken: apiResponse.refreshToken,
//               user: apiResponse.user,
//               isNewUser: isSignUp,
//             },
//           });
//         }, 500);
//       } else {
//         throw new Error(apiResponse.message || "Authentication failed");
//       }
//     } catch (error) {
//       setErrorMessage(
//         error.message ||
//           `Google ${isSignUp ? "Sign Up" : "Sign In"} failed. Please try again.`
//       );
//       setIsProcessingGoogle(false);
//     }
//   };

//   const handleGoogleSignInError = () => {
//     setErrorMessage("Google Sign-In failed. Please try again.");
//     setIsProcessingGoogle(false);
//   };

//   const handleAppleSignIn = async () => {
//     setIsProcessingApple(true);
//     setErrorMessage("");

//     try {
//       if (!window.AppleID?.auth) {
//         setErrorMessage("Apple Sign-In is not ready. Please try again in a moment.");
//         setIsProcessingApple(false);
//         return;
//       }
//       await window.AppleID.auth.signIn();
//     } catch (error) {
//       if (error.error === "popup_closed_by_user") {
//         setErrorMessage("Sign-In was cancelled. Please try again.");
//       } else {
//         setErrorMessage(`Apple Sign-In failed: ${error.error || error.message || "Unknown error"}`);
//       }
//       setIsProcessingApple(false);
//     }
//   };

//   const toggleAuthMode = () => {
//     const next = !isSignUp;
//     setIsSignUp(next);
//     navigate(next ? "/signup" : "/signin");
//     setErrorMessage("");
//   };

//   if (isProcessingApple || isProcessingGoogle) {
//     return (
//       <div className="min-h-screen w-screen bg-[#ECECEC] flex items-center justify-center">
//         <div className="bg-white p-8 rounded-lg shadow-lg text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#237D93] mx-auto mb-4"></div>
//           <h2 className="text-xl font-semibold text-[#055860] mb-2">
//             {isProcessingApple
//               ? "Redirecting to Apple..."
//               : isSignUp
//               ? "Creating your account..."
//               : "Signing you in..."}
//           </h2>
//           <p className="text-gray-600">Please wait while we complete your authentication</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen w-screen bg-[#ECECEC] flex items-center justify-center">
//       <div className="min-h-screen w-full max-w-[1366px] bg-white shadow-lg grid md:grid-cols-2">

//         {/* LEFT SIDE */}
//         <div className="flex flex-col items-center justify-center bg-[#237D93] px-10">
//           <img src={Network} className="w-32 mb-6" alt="Network" />
//           <h2 className="text-white text-xl font-bold mb-5">Grow Your Network</h2>
//           <p className="text-center text-sm text-[#D6EEF1] max-w-xs mt-[-22px]">
//             {isSignUp
//               ? "Create an account to start managing referrals and growing your network effectively."
//               : "Sign in to continue managing referrals and growing your network effectively."}
//           </p>
//         </div>

//         {/* RIGHT SIDE */}
//         <div className="flex flex-col items-center justify-center py-14 px-8">
//           <img src={FamocareLogo} className="h-[100px] w-14" alt="Famocare Logo" />
//           <h1 className="text-[35px] font-bold text-[#055860] mt-[-25px]">
//             Famo<span className="text-[#691188]">care</span>
//           </h1>
//           <h1 className="text-[15px] font-bold text-[#111827] mt-[-10px]">Referral Web App</h1>
//           <p className="text-sm text-gray-500 mb-2 text-center">
//             {isSignUp ? "Create your account" : "Welcome back! Please Sign in to your account"}
//           </p>

//           {/* ERROR MESSAGE */}
//           {errorMessage && (
//             <div className="w-full max-w-xs mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
//               <p className="text-sm text-red-600">{errorMessage}</p>
//             </div>
//           )}

//           {/* BUTTONS */}
//           <div className="w-full max-w-xs space-y-3 mb-6">

//             {/* Custom Google button */}
//             <button
//               onClick={() => {
//                 googleButtonRef.current?.querySelector('div[role="button"]')?.click();
//               }}
//               disabled={isProcessingGoogle || isProcessingApple}
//               className="w-full bg-white text-gray-700 border border-gray-300 rounded-lg py-2.5 flex items-center justify-center gap-3 text-sm hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               <img src={Google} className="w-5" alt="Google" />
//               {isSignUp ? "Sign up with Google" : "Sign in with Google"}
//             </button>

//             {/* Hidden Google OAuth trigger */}
//             <div ref={googleButtonRef} className="hidden">
//               <GoogleLogin
//                 onSuccess={handleGoogleSignInSuccess}
//                 onError={handleGoogleSignInError}
//                 theme="outline"
//                 size="large"
//                 text={isSignUp ? "signup_with" : "signin_with"}
//               />
//             </div>

//             {/* Apple button */}
//             <button
//               onClick={handleAppleSignIn}
//               disabled={isProcessingGoogle || isProcessingApple}
//               className="w-full bg-black text-white rounded-lg py-2.5 flex items-center justify-center gap-3 text-sm hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               <img src={Apple} className="w-5" alt="Apple" />
//               {isSignUp ? "Sign up with Apple" : "Sign in with Apple"}
//             </button>

//           </div>

//           {/* TOGGLE */}
//           <p className="text-sm text-gray-600 mt-6">
//             {isSignUp ? "Already have an account? " : "Don't have an account? "}
//             <button
//               onClick={toggleAuthMode}
//               className="text-[#237D93] font-semibold hover:underline bg-none border-none cursor-pointer"
//             >
//               {isSignUp ? "Sign in" : "Sign up"}
//             </button>
//           </p>

//           {/* SECURITY BADGE */}
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

// export const Auth = () => {
//   return (
//     <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
//       <AuthContent />
//     </GoogleOAuthProvider>
//   );
// };

// export default Auth;


