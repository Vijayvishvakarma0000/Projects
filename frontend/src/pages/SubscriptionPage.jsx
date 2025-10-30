import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSubscriptionPlans,
  subscribeToPlan,
  clearSubscriptionError,
} from "../redux/Slices/subscriptionSlice";
import {
  setToken,
  fetchUserProfile,
  activateSubscription,
} from "../redux/Slices/authSlice";

const SubscriptionPage = () => {
  const { planId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { accessToken, user } = useSelector((state) => state.auth);
  const { plans, status, error } = useSelector((state) => state.subscription);
  const [buyLoading, setBuyLoading] = useState(false);

  useEffect(() => {
    const token = accessToken || localStorage.getItem("token");
    const role = user?.role || localStorage.getItem("role");

    if (!token || !role) {
      console.warn("⚠️ Missing token or role — redirecting to signin.");
      navigate("/signin");
      return;
    }

    dispatch(fetchSubscriptionPlans({ token, role }));

    return () => {
      dispatch(clearSubscriptionError());
    };
  }, [dispatch, accessToken, user, navigate]);

  const handleBuyPlan = async (selectedPlanId) => {
    const finalPlanId = selectedPlanId || planId;
    if (!finalPlanId) {
      alert("No plan selected. Please choose a plan.");
      return;
    }

    setBuyLoading(true);

    try {
      const token = accessToken || localStorage.getItem("token");
      if (!token) {
        alert("Please log in to continue.");
        navigate("/signin");
        return;
      }

      if (!accessToken && token) {
        dispatch(setToken(token));
      }

      const result = await dispatch(
        subscribeToPlan({ planId: finalPlanId, token })
      ).unwrap();

      if (!result.subscriptionId) {
        throw new Error("No subscription ID returned from the server.");
      }

      openRazorpay(result.subscriptionId);
    } catch (err) {
      console.error("❌ Subscription Error:", err);
      alert(err.message || "Failed to subscribe. Please try again.");
    } finally {
      setBuyLoading(false);
    }
  };

  const openRazorpay = (subscriptionId) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      subscription_id: subscriptionId,
      name: "MediScript",
      description: "Subscription Payment",
      handler: async (response) => {
        const { razorpay_payment_id, razorpay_subscription_id } = response;
        console.log("✅ Payment Successful:", response);

        try {
          await dispatch(
            activateSubscription({
              subscriptionId: razorpay_subscription_id,
              paymentId: razorpay_payment_id,
            })
          ).unwrap();

          await dispatch(fetchUserProfile()).unwrap();
          alert("Payment successful! Redirecting...");
          navigate("/clinic-management");
        } catch (error) {
          console.error("⚠️ Activation Error:", error);
          alert(
            error.message ||
              "Payment succeeded, but activation failed. Please contact support."
          );
        }
      },
      modal: {
        ondismiss: () => {
          console.log("Payment cancelled by user.");
          alert("Payment cancelled. You can try again later.");
        },
      },
      theme: { color: "#2563eb" },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <div className="subscription-page">
      <style>{`
        .subscription-page {
          min-height: 100vh;
          background-color: #f3f4f6;
          padding: 3rem 1rem;
          font-family: 'Inter', sans-serif;
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
        }
        .title {
          font-size: 2.5rem;
          font-weight: 700;
          text-align: center;
          color: #1f2937;
          margin-bottom: 3rem;
        }
        .loading-container {
          text-align: center;
        }
        .spinner {
          display: inline-block;
          width: 3rem;
          height: 3rem;
          border: 4px solid #3b82f6;
          border-top-color: transparent;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .loading-text {
          margin-top: 1rem;
          font-size: 1.125rem;
          color: #4b5563;
        }
        .error {
          text-align: center;
          color: #dc2626;
          font-size: 1.125rem;
          font-weight: 500;
        }
        .no-plans {
          text-align: center;
          color: #4b5563;
          font-size: 1.125rem;
        }
        .plans-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }
        .plan-card {
          background: white;
          border-radius: 0.75rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          padding: 1.5rem;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .plan-card:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
        }
        .plan-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 1rem;
        }
        .plan-price {
          font-size: 1.875rem;
          font-weight: bold;
          color: #2563eb;
          margin-bottom: 0.5rem;
        }
        .plan-price span {
          font-size: 0.875rem;
          font-weight: normal;
          color: #6b7280;
        }
        .plan-interval {
          color: #4b5563;
          margin-bottom: 1.5rem;
          text-transform: capitalize;
        }
        .choose-button {
          width: 100%;
          background: #2563eb;
          color: white;
          padding: 0.75rem 1rem;
          border: none;
          border-radius: 0.5rem;
          font-size: 1rem;
          cursor: pointer;
          transition: background 0.2s ease;
        }
        .choose-button:hover {
          background: #1d4ed8;
        }
        .choose-button:disabled {
          background: #6b7280;
          cursor: not-allowed;
        }
      `}</style>

      <div className="container">
        <h1 className="title">Choose Your Subscription Plan</h1>

        {status === "loading" && (
          <div className="loading-container">
            <div className="spinner"></div>
            <p className="loading-text">Loading subscription plans...</p>
          </div>
        )}

        {status === "failed" && (
          <div className="error">
            <p>{error || "Failed to load plans. Please try again."}</p>
            <button
              className="choose-button"
              onClick={() => {
                const token = accessToken || localStorage.getItem("token");
                const role = user?.role || localStorage.getItem("role");
                dispatch(fetchSubscriptionPlans({ token, role }));
              }}
            >
              Retry
            </button>
          </div>
        )}

        {status === "succeeded" && plans.length === 0 && (
          <p className="no-plans">
            No subscription plans available for your role ({user?.role || localStorage.getItem("role")}).
          </p>
        )}

        {status === "succeeded" && plans.length > 0 && (
          <div className="plans-grid">
            {plans.map((plan) => (
              <div key={plan._id} className="plan-card">
                <h2 className="plan-title">{plan.name}</h2>
                <p className="plan-price">
                  ₹{plan.price}
                  <span>/{plan.interval}</span>
                </p>
                <p className="plan-interval">Billed {plan.interval}</p>
                <p>{plan.description || "Includes all core features."}</p>
                <button
                  className="choose-button"
                  onClick={() => handleBuyPlan(plan._id)}
                  disabled={buyLoading}
                >
                  {buyLoading ? "Processing..." : `Buy ${plan.name}`}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionPage;