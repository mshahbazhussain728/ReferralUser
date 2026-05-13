


// import { toast } from "react-toastify";
// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { ModalType } from "../../types/ui";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchMyRewardsUtil } from "../../utils/utility";
// import { updateModalType } from "../../api/slices/globalSlice/global";
// import { redeemRequest } from "../../api/slices/redeemRequest/redeem-request";
// import { RedeemRequestFormFields } from "../../components/requestRedeem/redeem-request-fields";
// import { generateRedeemPointsValidationSchema } from "../../validation/redeem-points-validation";

// export const useRedeemRequest = () => {
//   const dispatch = useDispatch();
//   const { user, loading: authLoading } = useSelector((state) => state.auth);
//   const [myRewards, setMyRewards] = useState(null);
//   const { loading } = useSelector((state) => state.redeemRequest);
//   const { loading: myRewardsLoading } = useSelector((state) => state.myRewards);

//   useEffect(() => {
//     fetchMyRewardsUtil({ dispatch, user, authLoading, setMyRewards });
//   }, [dispatch, authLoading, user]);

//   const handleRedeemRequest = () => {
//     dispatch(updateModalType({ type: ModalType.REDEEM_REQUEST_SUCCESS }));
//   };

//   // Generate schema with minimum 100 points validation
//   const schema = generateRedeemPointsValidationSchema();

//   const {
//     register,
//     handleSubmit,
//     control,
//     formState: { errors },
//     setError,
//     reset,
//   } = useForm({
//     resolver: yupResolver(schema),
//   });

//   const fields = RedeemRequestFormFields(register, loading, control);

//   const onSubmit = async (data) => {
//     const uid = user?.user?.id;
//     if (!uid) {
//       toast.error("User not authenticated");
//       return;
//     }

//     // Validate minimum points
//     const points = parseInt(data?.points, 10);
//     if (isNaN(points)) {
//       toast.error("Please enter a valid number");
//       return;
//     }

//     if (points < 100) {
//       toast.error("Minimum withdrawal is 100 points");
//       return;
//     }

//     // Check if user has enough points - FIXED
//     const userPoints = myRewards?.reward?.active || 0;
    
//     console.log("💰 User points:", userPoints);
//     console.log("💰 MyRewards object:", myRewards);
//     console.log("🎫 Requested points:", points);

//     if (!myRewards || userPoints === 0) {
//       toast.error("Unable to fetch your current points balance. Please refresh and try again.");
//       return;
//     }

//     if (points > userPoints) {
//       toast.error(`Insufficient points. You have ${userPoints} points available`);
//       return;
//     }

//     const formData = new FormData();
//     formData.append("points", points);
//     formData.append("uid", uid);

//     try {
//       console.log("📤 Submitting redeem request with points:", points);
//       const res = await dispatch(redeemRequest({ data: formData, setError }));
      
//       if (res?.payload) {
//         console.log("✅ Redeem request successful");
//         toast.success("Redeem request submitted successfully");
//         handleRedeemRequest();
//         reset();
//         // Refresh rewards after successful redemption
//         fetchMyRewardsUtil({ dispatch, user, authLoading, setMyRewards });
//       }
//     } catch (error) {
//       console.error("❌ Error submitting redeem request:", error);
//       toast.error(error?.message || "Failed to submit redeem request");
//     }
//   };

//   return {
//     handleSubmit,
//     errors,
//     fields,
//     onSubmit,
//     myRewards,
//     myRewardsLoading,
//   };
// };




import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ModalType } from "../../types/ui";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyRewardsUtil } from "../../utils/utility";
import { updateModalType } from "../../api/slices/globalSlice/global";
import { redeemRequest } from "../../api/slices/redeemRequest/redeem-request";
import { RedeemRequestFormFields } from "../../components/requestRedeem/redeem-request-fields";
import { generateRedeemPointsValidationSchema } from "../../validation/redeem-points-validation";

export const useRedeemRequest = () => {
  const dispatch = useDispatch();
  const { user, loading: authLoading } = useSelector((state) => state.auth);
  const [myRewards, setMyRewards] = useState(null);
  const { loading } = useSelector((state) => state.redeemRequest);
  const { loading: myRewardsLoading } = useSelector((state) => state.myRewards);

  // Fetch rewards on component mount and when user changes
  useEffect(() => {
    if (user && !authLoading) {
      fetchMyRewardsUtil({ dispatch, user, authLoading, setMyRewards });
    }
  }, [dispatch, authLoading, user]);

  const handleRedeemRequest = () => {
    dispatch(updateModalType({ type: ModalType.REDEEM_REQUEST_SUCCESS }));
  };

  // Generate schema with minimum 100 points validation
  const schema = generateRedeemPointsValidationSchema();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setError,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const fields = RedeemRequestFormFields(register, loading, control);

  const onSubmit = async (data) => {
    const uid = user?.id
    if (!uid) {
      toast.error("User not authenticated");
      return;
    }

    // Validate minimum points
    const points = parseInt(data?.points, 10);
    if (isNaN(points)) {
      toast.error("Please enter a valid number");
      return;
    }

    if (points < 100) {
      toast.error("Minimum withdrawal is 100 points");
      return;
    }

    // Check if user has enough points
    const userPoints = myRewards?.reward?.active || 0;
    
    console.log("💰 Current balance:", userPoints);
    console.log("🎫 Redeeming:", points);

    if (!myRewards || userPoints === 0) {
      toast.error("Unable to fetch your current points balance. Please refresh and try again.");
      return;
    }

    if (points > userPoints) {
      toast.error(`Insufficient points. You have ${userPoints} points available`);
      return;
    }

    const formData = new FormData();
    formData.append("points", points);
    formData.append("uid", uid);

    try {
      console.log("📤 Submitting redeem request...");
      const res = await dispatch(redeemRequest({ data: formData, setError }));
      
      if (res?.payload) {
        console.log("✅ Redeem request successful");
        
        // Show success message
        toast.success(`Successfully redeemed ${points} points!`);
        
        // Reset form immediately
        reset();
        
        // Refresh rewards to get updated balance in real-time
        await fetchMyRewardsUtil({ dispatch, user, authLoading, setMyRewards });
        
        console.log("💰 New balance:", myRewards?.reward?.active);
        
        // Show success modal
        handleRedeemRequest();
      } else {
        toast.error("Failed to submit redeem request. Please try again.");
      }
    } catch (error) {
      console.error("❌ Error submitting redeem request:", error);
      toast.error(error?.message || "Failed to submit redeem request");
    }
  };

  return {
    handleSubmit,
    errors,
    fields,
    onSubmit,
    myRewards,
    myRewardsLoading,
  };
};


