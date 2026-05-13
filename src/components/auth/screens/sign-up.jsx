import { useSignUp } from "../../../hooks/auth/useSignUp";
import { Form } from "../../../base-component/form/form";
import { BackIcon } from "../../../assets/svgs/components/back-icon";

export const SignUp = ({ onSignupSuccess }) => {
  const { handleSubmit, errors, fields, onSubmit } = useSignUp(onSignupSuccess);

  return (
    <div className="p-[22px] md:py-[50px] md:px-[140px] md:border md:border-[#CFD6E9] bg-white rounded-xl w-[805px]">
      <div className="flex md:hidden flex-col gap-y-[18px]">
        <BackIcon />
        <p className="text-[22px] font-semibold mb-[37px]">
          Let’s complete your profile
        </p>
      </div>
      <Form
        formFields={fields}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
      />
    </div>
  );
};
