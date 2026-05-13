import logo from "../../../assets/svgs/logo.svg";

export const LandingPage = () => {
  return (
    <div className="flex justify-center items-center bg-white h-screen">
      <img
        src={logo}
        alt="Logo"
        className="w-fit h-fit img_loader"
        width={120}
        height={100}
      />
    </div>
  );
};
