

// billingSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import { API_URL } from "../../utils/baseurl";

/**
 * Save or update clinic billing settings
 * PUT dynamic clinicId but fixed base endpoint
 */
export const saveBillingSettings = createAsyncThunk(
  "billing/saveBillingSettings",
  async ({ clinicId, billingData }, { getState, rejectWithValue }) => {
    try {
      const token =
        getState().auth?.token ||
        localStorage.getItem("accessToken") ||
        localStorage.getItem("token");

      if (!token) return rejectWithValue("No authentication token found");

      if (!clinicId) return rejectWithValue("Clinic ID is missing");

      // Ensure services is an array
      if (!Array.isArray(billingData.services)) billingData.services = [];

      const response = await axiosInstance.put(
        `${API_URL}/api/billing-settings/${clinicId}`,
        billingData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log("✅ Billing Settings Saved/Updated:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Billing Settings Update Error:", error);
      return rejectWithValue(
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Failed to update billing settings"
      );
    }
  }
);

/**
 * Get clinic billing settings
 * GET /api/billing-settings/:clinicId
 */
export const getBillingSettings = createAsyncThunk(
  "billing/getBillingSettings",
  async (clinicId, { getState, rejectWithValue }) => {
    try {
      const token =
        getState().auth?.token ||
        localStorage.getItem("accessToken") ||
        localStorage.getItem("token");

      if (!token) return rejectWithValue("No authentication token found");

      if (!clinicId) return rejectWithValue("Clinic ID is missing");

      const response = await axiosInstance.get(
        `${API_URL}/api/billing-settings/${clinicId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      // Ensure services is an array
      const data = response.data;
      if (!Array.isArray(data.services)) data.services = [];

      console.log("✅ Billing Settings Fetched:", data);
      return data;
    } catch (error) {
      console.error("❌ Fetch Billing Settings Error:", error);
      return rejectWithValue(
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Failed to fetch billing settings"
      );
    }
  }
);

const billingSlice = createSlice({
  name: "billing",
  initialState: {
    billingSettings: null,
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    clearBillingMessage: (state) => {
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    // Save/Update Billing Settings
    builder
      .addCase(saveBillingSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(saveBillingSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.billingSettings = action.payload;
        state.message = "✅ Billing settings updated successfully!";
      })
      .addCase(saveBillingSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update billing settings";
      });

    // Get Billing Settings
    builder
      .addCase(getBillingSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBillingSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.billingSettings = action.payload;
      })
      .addCase(getBillingSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch billing settings";
      });
  },
});

export const { clearBillingMessage } = billingSlice.actions;
export default billingSlice.reducer;
