import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignUpFormFields } from "../../components/auth/fields/sign-up-fields";
import { generateSignUpValidationSchema } from "../../validation/auth-validation";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../api/slices/authSlice/auth";
import { useNavigate } from "react-router-dom";

export const useSignUp = (onSignupSuccess) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, errorData } = useSelector((state) => state.auth);

  const schema = generateSignUpValidationSchema();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const fields = SignUpFormFields(register, loading, control);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      if (errorData?.phoneCode && errorData?.phoneNo) {
        formData.append("phoneCode", errorData.phoneCode);
        formData.append("phoneNo", errorData.phoneNo);
      } else {
        console.warn("phoneCode or phoneNo missing in errorData");
      }

      if (data.name) {
        formData.append("name", data.name);
      }
      if (data.imageUrl) {
        formData.append("imageUrl", data.imageUrl);
      }
      if (data.country) {
        formData.append("country", data.country);
      }

      const res = await dispatch(
        signUp({ data: formData, navigate, setError })
      );
      if (res?.meta?.requestStatus === "fulfilled") {
        onSignupSuccess();
      }
    } catch (error) {
      console.error("Sign up error:", error);
    }
  };

  return {
    handleSubmit,
    errors,
    fields,
    onSubmit,
  };
};
