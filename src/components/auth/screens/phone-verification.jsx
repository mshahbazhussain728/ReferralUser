import { Form } from "../../../base-component/form/form";
import { BackIcon } from "../../../assets/svgs/components/back-icon";
import { usePhoneVerification } from "../../../hooks/auth/usePhoneVerification";
import { useSelector } from "react-redux";

export const PhoneVarification = ({ onBack, onSignUp }) => {
  const { handleSubmit, errors, fields, onSubmit } = usePhoneVerification({
    onSignUp,
    onBack,
  });

  const { user } = useSelector((state) => state.auth);

  const phoneCode = user.user?.phoneCode;
  const phoneNo = user.user?.phoneNo;

  return (
    <div className="md:border md:border-[#cccccc] md:rounded-[12px] bg-white p-[22px] md:py-[60px] md:px-[130px] md:w-[790px]">
      <span className="md:hidden mt-3">
        <BackIcon onClick={onBack} />
      </span>
      <p className="text-primary font-semibold md:font-bold text-[20px] md:text-[32px] text-center">
        Phone Verification
      </p>

      <p className="text-[#808080] text-sm font-medium md:font-semibold md:text-[22px] mb-[35px] text-center leading-10">
        Enter the OTP code sent to your phone number {phoneCode} *****
        {phoneNo?.slice(-3)}
        <span
          onClick={onBack}
          className="text-primary text-sm font-medium md:font-semibold md:text-[22px] pl-2 underline cursor-pointer"
        >
          Change phone number
        </span>
      </p>

      <Form
        formFields={fields}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
      />
    </div>
  );
};
