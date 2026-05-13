import { SignUp } from "./screens/sign-up";
import { useEffect, useState } from "react";
 import { Login } from "./screens/login-screen";
import { LandingPage } from "./screens/landing-page";
import { PhoneVarification } from "./screens/phone-verification";

export const Auth = () => {
  const [currentScreen, setCurrentScreen] = useState("landing");

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentScreen("login");
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handleSignupSuccess = () => {
    setCurrentScreen("login");
  };

  const handleLoginSuccess = () => {
    setCurrentScreen("phone");
  };

  const handleBack = () => {
    setCurrentScreen("login");
  };

  const handleSignUp = () => {
    setCurrentScreen("signup");
  };

  const screens = {
    landing: <LandingPage />,
    signup: <SignUp onSignupSuccess={handleSignupSuccess} />,
    login: (
      <Login onLoginSuccess={handleLoginSuccess} onSignUp={handleSignUp} />
    ),
    phone: <PhoneVarification onBack={handleBack} onSignUp={handleSignUp} />,
  };

  return (
    <div className="flex items-center justify-center md:h-screen">
      {screens[currentScreen]}
    </div>
  );
};
