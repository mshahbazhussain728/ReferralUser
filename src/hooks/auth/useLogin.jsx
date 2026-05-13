import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { generateLoginValidationSchema } from "../../validation/auth-validation";
import { LoginContactFormFields } from "../../components/auth/fields/login-fields";
import { logIn } from "../../api/slices/authSlice/auth";
import { parsePhoneNumberFromString } from "libphonenumber-js";

export const useLogin = ({ onLoginSuccess, onSignUp }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const schema = generateLoginValidationSchema();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const fields = LoginContactFormFields(register, loading, control);

  const onSubmit = async (data) => {
    const phoneNumber = parsePhoneNumberFromString(data?.phoneNo);

    if (!phoneNumber || !phoneNumber.isValid()) {
      throw new Error(
        "Invalid phone number. Please check the number and try again."
      );
    }

    const countryCode = `+${phoneNumber.countryCallingCode}`;
    const nationalNumber = phoneNumber.nationalNumber;

    const formData = new FormData();
    formData.append("phoneCode", countryCode);
    formData.append("phoneNo", nationalNumber);

    Object?.keys(data)?.forEach((key) => {
      if (key !== "phoneNo") {
        formData.append(key, data[key]);
      }
    });

    try {
      const res = await dispatch(logIn({ data: formData, setError }));

      const isReqistered = res?.payload?.data?.isRegistered;

      if (isReqistered) {
        onLoginSuccess();
      } else {
        onSignUp();
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  return {
    handleSubmit,
    errors,
    fields,
    onSubmit,
  };
};
