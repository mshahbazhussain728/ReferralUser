import React from "react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
// import Logo1 from "../assets/pngs/logo1.png";
 import logo from "../assets/svgs/logo.svg";

import { sideBar, staticEnums } from "../utils/static";
import { DashboardIcon } from "../assets/svgs/components/dashboard-icon";
import { UsersIcon } from "../assets/svgs/components/users-icon";
import { MonthlyPremIcon } from "../assets/svgs/components/monthly-prem-icon";
import { YearlyPremIcon } from "../assets/svgs/components/yearly-prem-icon";
import { MyRewardsIcon } from "../assets/svgs/components/rewards-icon";
import { RequestRedeemIcon } from "../assets/svgs/components/redeem-icon";
import { PointIcon } from "../assets/svgs/components/point-icon";
import { CouponIcon } from "../assets/svgs/components/coupon-icon";
import { RedeeemHistoryIcon } from "../assets/svgs/components/redeem-history-icon";
import { LogoutIcon } from "../assets/svgs/components/logout-icon";
import { useDispatch, useSelector } from "react-redux";
import { updateModalType } from "../api/slices/globalSlice/global";
import { ModalType } from "../types/ui";
import { CrossIcon } from "../assets/svgs/components/cross-icon";

export const svgs = {
  Dashboard: <DashboardIcon />,
  Users: <UsersIcon />,
  MonthlyPrem: <MonthlyPremIcon />,
  YearlyPrem: <YearlyPremIcon />,
  MyRewards: <MyRewardsIcon />,
  RequestRedeem: <RequestRedeemIcon />,
  Point: <PointIcon />,
  Coupon: <CouponIcon />,
  RedeemHistory: <RedeeemHistoryIcon />,
  Logout: <LogoutIcon />,
  dummy: <></>,
};

const PREM_SVG_ICONS = ["YearlyPrem"];

const ChevronIcon = ({ open, white }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="13"
    height="8"
    viewBox="0 0 13 8"
    fill="none"
    style={{
      transform: open ? "rotate(180deg)" : "rotate(0deg)",
      transition: "transform 0.3s",
      display: "block",
    }}
  >
    <path
      d="M0.267406 0.598758C0.438678 0.427537 0.670942 0.331351 0.913121 0.331351C1.1553 0.331351 1.38756 0.427537 1.55883 0.598758L6.07975 5.11967L10.6007 0.598758C10.7729 0.43239 11.0036 0.340333 11.2431 0.342413C11.4826 0.344494 11.7116 0.440547 11.881 0.609883C12.0503 0.779219 12.1463 1.00829 12.1484 1.24776C12.1505 1.48723 12.0585 1.71793 11.8921 1.89019L6.72546 7.05681C6.55419 7.22803 6.32193 7.32422 6.07975 7.32422C5.83757 7.32422 5.6053 7.22803 5.43403 7.05681L0.267406 1.89019C0.0961862 1.71891 0 1.48665 0 1.24447C0 1.00229 0.0961862 0.77003 0.267406 0.598758Z"
      fill={white ? "#ffffff" : "#8F8F8F"}
    />
  </svg>
);

export const SideBar = ({ isDrawer, handleDrawer, openTitle, onToggle }) => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const dispatch = useDispatch();

  const userRole = staticEnums["User"]["role"][user?.role] || 0;
  const urlStatus = new URLSearchParams(location.search).get("status");

  // Close the drawer on mobile/tablet after any navigation
  const closeDrawer = () => {
    if (isDrawer) handleDrawer();
  };

  const handleLogout = () => {
    dispatch(updateModalType({ type: ModalType.LOGOUT }));
  };

  return (
    <div className="fixed left-0 w-[312px] bg-white rounded-r-[6px] h-full overflow-y-auto custom-scroll">
      <div className="absolute top-4 right-4 xMini:block xl:hidden">
        <CrossIcon onClick={handleDrawer} />
      </div>

      <div className="flex items-center justify-center pt-[28px] pb-[43px]">
        <img src={logo} alt="Logo" className="h-[139px] w-[137px]" />
      </div>

      <div className="px-4 pb-[30px] flex flex-col">
        <div className="space-y-3">
          {sideBar.map((item) => {
            if (!item?.role?.includes(userRole)) return null;

            const isOpen = openTitle === item.title;
            const isActive = isOpen;

            const iconClass = isActive
              ? PREM_SVG_ICONS.includes(item.icon)
                ? "sidebar-prem-svg"
                : "sidebar-svg"
              : "";

            const rowClass = `rounded-lg flex justify-between items-center p-4 w-full ${
              isActive ? "bg-[#691188]" : "hover:bg-[#E9E1FF]"
            }`;

            const rowInner = (
              <>
                <div className="flex items-center gap-x-3">
                  <span className={iconClass}>{svgs[item.icon]}</span>
                  <span
                    className={`text-base font-semibold tracking-[0.5px] ${
                      isActive ? "text-white" : "text-[#525451]"
                    }`}
                  >
                    {item.title}
                  </span>
                </div>
                {item.inner && <ChevronIcon open={isOpen} white={isActive} />}
              </>
            );

            return (
              <React.Fragment key={item.title}>
                {/* ✅ KEY FIX: items with `inner` (dropdown) are ALWAYS buttons,
                    never Links — regardless of whether they also have a pathname */}
                {item.pathname && !item.inner ? (
                  <Link
                    to={{
                      pathname: item.pathname,
                      search: item.query
                        ? new URLSearchParams({
                            [item.queryName || "status"]: item.query,
                          }).toString()
                        : "",
                    }}
                    onClick={() => {
                      onToggle(item);
                      closeDrawer();
                    }}
                    className={rowClass}
                  >
                    {rowInner}
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={(e) => {
                      // ✅ Prevent navigation and event bubbling on small screens
                      e.preventDefault();
                      e.stopPropagation();
                      onToggle(item);
                      // Close drawer only if this item has no dropdown children
                      if (!item.inner) closeDrawer();
                    }}
                    className={rowClass}
                  >
                    {rowInner}
                  </button>
                )}

                {/* Submenu children */}
                {item.inner &&
                  isOpen &&
                  item.inner.map((it, ind) => {
                    const isChildActive =
                      location.pathname === it.pathname &&
                      urlStatus === it.query;

                    return (
                      <motion.div
                        key={ind}
                        className="mt-2 px-3"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25 }}
                      >
                        <Link
                          to={{
                            pathname: it.pathname,
                            search: new URLSearchParams({
                              status: it.query,
                            }).toString(),
                          }}
                          onClick={closeDrawer}
                          className={`block text-sm font-medium tracking-[0.5px] px-3 py-2 w-full text-start rounded-lg ${
                            isChildActive
                              ? "bg-[#691188] text-white"
                              : "text-[#525451] hover:bg-[#E9E1FF]"
                          }`}
                        >
                          {it.title}
                        </Link>
                      </motion.div>
                    );
                  })}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      <div className="pl-[32px] pt-[90px] pb-[44px]">
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-x-[14px] text-[#691188] text-lg font-semibold"
        >
          <LogoutIcon />
          Logout Account
        </button>
      </div>
    </div>
  );
};