import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { generateOtpValidationSchema } from "../../validation/auth-validation";
import { PhoneVarificationFormFields } from "../../components/auth/fields/login-fields";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const usePhoneVerification = ({ onBack }) => {
  const navigate = useNavigate();
  const { loading, user } = useSelector((state) => state.auth);
  const schema = generateOtpValidationSchema();

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const enteredOtp = watch("otp");

  useEffect(() => {
    if (user?.user?.otp) {
      const otpString = user?.user?.otp?.toString();
      reset({ otp: otpString });
    }
  }, [user, reset]);

  const fields = PhoneVarificationFormFields(
    register,
    loading,
    control,
    onBack
  );

  const onSubmit = (data) => {
    try {
      const expectedOtp = user?.user?.otp?.toString();

      if (!expectedOtp) {
        toast.error("No OTP available to verify. Please try again.");
        return;
      }

      if (enteredOtp === expectedOtp) {
        toast.success("Login successfully!");
        navigate("/dashboard?status=ref-guide");
      } else {
        toast.error("Invalid OTP. Please try again.");
        return;
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return {
    handleSubmit,
    errors,
    fields,
    onSubmit,
  };
};
