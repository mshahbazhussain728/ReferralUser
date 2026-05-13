import { Results } from "./results";
import { useLocation } from "react-router-dom";
import { ReferralGuide } from "./referral-guide";
import { useDashboard } from "../../hooks/dashboard/useDashboard";
import { CustomLoader } from "../../base-component/ui/loadingEffect/custom-loader";

export const Dashboard = () => {
  const location = useLocation();
  const {
    loading,
    results,
    handleRefLinkModal,
    handleQRCodeModal,
    handleRefDiscountCodeModal,
  } = useDashboard();

  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get("status");

  const iosHandler = [
    handleRefLinkModal,
    handleRefDiscountCodeModal,
    handleQRCodeModal,
  ];

  return (
    <div className="mb-10">
      {status === "ref-guide" && (
        <>
          {loading?.links ? (
            <CustomLoader />
          ) : (
            <ReferralGuide iosHandler={iosHandler} />
          )}
        </>
      )}

      {status === "results" && (
        <>{loading?.results ? <CustomLoader /> : <Results data={results} />}</>
      )}
    </div>
  );
};






