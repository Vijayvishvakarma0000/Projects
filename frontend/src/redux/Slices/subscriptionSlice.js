


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import { API_URL } from "../../utils/baseurl";

/**
 * 🧩 Fetch all available subscription plans (filtered by user role)
 */
export const fetchSubscriptionPlans = createAsyncThunk(
  "subscription/fetchPlans",
  async ({ token, role }, { rejectWithValue }) => {
    try {
      if (!token) return rejectWithValue("Authentication token missing");
      if (!role) return rejectWithValue("User role not specified");

      const response = await axiosInstance.get(`${API_URL}/api/subscription/plans`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      const plans = response.data?.plans;
      if (!Array.isArray(plans)) {
        return rejectWithValue("Invalid response format for plans");
      }

      // 🔍 Filter by role (ex: doctor, student)
      const filteredPlans = plans.filter(
        (plan) => plan.visibleTo?.includes(role)
      );

      console.log(`✅ Loaded ${filteredPlans.length} plans for role: ${role}`);
      return filteredPlans;
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Failed to fetch subscription plans";
      console.error("❌ Fetch Plans Error:", message);
      return rejectWithValue(message);
    }
  }
);

/**
 * 💳 Subscribe to a selected plan
 */
export const subscribeToPlan = createAsyncThunk(
  "subscription/subscribeToPlan",
  async ({ planId, token }, { rejectWithValue }) => {
    try {
      if (!token) return rejectWithValue("Authentication required");
      if (!planId) return rejectWithValue("No plan selected");

      const response = await axiosInstance.post(
        `${API_URL}/api/subscription/buyplan`,
        { planId },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      console.log("✅ Subscription created:", response.data);
      return response.data; // e.g. { subscriptionId: "...", status: "pending" }
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Failed to subscribe to plan";
      console.error("❌ Subscribe Plan Error:", message);
      return rejectWithValue(message);
    }
  }
);

/**
 * ⚙️ Redux Slice
 */
const subscriptionSlice = createSlice({
  name: "subscription",
  initialState: {
    plans: [],
    userSubscription: null,
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {
    clearSubscriptionError: (state) => {
      state.error = null;
    },
    resetSubscriptionState: (state) => {
      state.plans = [];
      state.userSubscription = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🧩 Fetch Plans
      .addCase(fetchSubscriptionPlans.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchSubscriptionPlans.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.plans = action.payload;
      })
      .addCase(fetchSubscriptionPlans.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // 💳 Subscribe Plan
      .addCase(subscribeToPlan.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(subscribeToPlan.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userSubscription = action.payload;
      })
      .addCase(subscribeToPlan.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearSubscriptionError, resetSubscriptionState } =
  subscriptionSlice.actions;

export default subscriptionSlice.reducer;
