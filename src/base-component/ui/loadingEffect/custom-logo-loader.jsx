import logo from "../../../assets/svgs/logo-icon.svg";

export const CompanyLogoLoader = () => {
  return (
    <div>
      <img
        src={logo}
        alt="Company Logo"
        className="w-fit h-fit img_loader"
        width={120}
        height={100}
      />
    </div>
  );
};
