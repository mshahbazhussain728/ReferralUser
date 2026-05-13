import * as yup from "yup";

export const redeemPoints = {
  points: "points",
};

export const generateRedeemPointsValidationSchema = () => {
  return yup.object().shape({
    [redeemPoints.points]: yup.string().required("This field is required"),
  });
};

export const generateGetCouponValidationSchema = () => {
  return yup.object().shape({
    couponType: yup
      .string()
      .oneOf(["monthly", "yearly"], "Please select a coupon type")
      .required("This field is required"),
  });
};
