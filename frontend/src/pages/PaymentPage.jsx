import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { API_URL } from "../utils/baseurl";
import {
  setUser,
  setSubscriptionStatus,
  activateSubscription,
  fetchUserProfile,
  setToken,
} from "../redux/Slices/authSlice"; // Corrected import path

const PaymentPage = () => {
  const { planId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    token,
    loading: authLoading,
    error: authError,
  } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);

  // Axios instance
  const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
    timeout: 15000,
  });

  // Attach token
  axiosInstance.interceptors.request.use(
    (config) => {
      const tokenFromStore = token || localStorage.getItem("token");
      if (tokenFromStore) {
        config.headers.Authorization = `Bearer ${tokenFromStore}`;
        if (!token) dispatch(setToken(tokenFromStore)); // Hydrate Redux if token is in localStorage
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Handle 401 errors
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        alert("Session expired. Please login again.");
        localStorage.removeItem("token");
        dispatch(logout());
        navigate("/signin"); // Updated to /signin
      }
      return Promise.reject(error);
    }
  );

  // Create subscription on component mount
  useEffect(() => {
    const createSubscription = async () => {
      try {
        if (!token && !localStorage.getItem("token")) {
          alert("Please login to proceed with payment.");
          navigate("/signin");
          return;
        }

        const res = await axiosInstance.post("/api/subscription/buyplan", {
          planId,
        });

        if (res.data.subscriptionId) {
          openRazorpay(res.data.subscriptionId);
        } else {
          alert("Failed to create subscription. Try again.");
        }
      } catch (err) {
        console.error("Error creating subscription:", err);
        alert(
          err.response?.data?.message || "Something went wrong. Try again."
        );
      } finally {
        setLoading(false);
      }
    };

    createSubscription();
  }, [planId, token, navigate]);

  // Razorpay payment handler
  const openRazorpay = (subscriptionId) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      subscription_id: subscriptionId,
      name: "MediScript",
      description: "Subscription Payment",
      handler: async (response) => {
        const { razorpay_payment_id, razorpay_subscription_id } = response;
        console.log("Payment successful:", response);
        alert("Payment successful! 🎉");

        try {
          // Activate subscription
          await dispatch(
            activateSubscription({
              subscriptionId: razorpay_subscription_id,
              paymentId: razorpay_payment_id,
            })
          ).unwrap();

          // Fetch updated user profile
          await dispatch(fetchUserProfile()).unwrap();

          // Redirect to clinic management
          navigate("/clinic-management");
        } catch (err) {
          console.error("Error updating subscription/profile:", err);
          alert(err || "Something went wrong. Please refresh the page.");
        }
      },
      modal: {
        ondismiss: () => console.log("Payment popup closed"),
      },
      theme: { color: "#2563eb" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial",
      }}
    >
      {loading || authLoading ? (
        <p>Initializing payment...</p>
      ) : authError ? (
        <p style={{ color: "red" }}>{authError}</p>
      ) : (
        <p>Opening Razorpay...</p>
      )}
    </div>
  );
};

export default PaymentPage;
