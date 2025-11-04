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

/**
 * NEW: Get Active Patients for Clinic
 * GET /api/dashboard/active-patients?clinicId=:clinicId
 */
export const getActivePatients = createAsyncThunk(
  "billing/getActivePatients",
  async (clinicId, { getState, rejectWithValue }) => {
    try {
      const token =
        getState().auth?.token ||
        localStorage.getItem("accessToken") ||
        localStorage.getItem("token");

      if (!token) return rejectWithValue("No authentication token found");
      if (!clinicId) return rejectWithValue("Clinic ID is missing");

      const response = await axiosInstance.get(
        `${API_URL}/api/dashboard/active-patients`,
        {
          params: { clinicId },
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      console.log("Active Patients Fetched:", response.data);
      return response.data; // { ok: true, data: [...] }
    } catch (error) {
      console.error("Fetch Active Patients Error:", error);
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "Failed to fetch active patients"
      );
    }
  }
);




const billingSlice = createSlice({
  name: "billing",
  initialState: {
    billingSettings: null,
    activePatients: [], // ← New state
    loading: false,
    error: null,
    message: null,
    activePatientsLoading: false,
    activePatientsError: null,
  },
  reducers: {
    clearBillingMessage: (state) => {
      state.error = null;
      state.message = null;
      state.activePatientsError = null;
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

    // === Get Active Patients ===
    builder
      .addCase(getActivePatients.pending, (state) => {
        state.activePatientsLoading = true;
        state.activePatientsError = null;
      })
      .addCase(getActivePatients.fulfilled, (state, action) => {
        state.activePatientsLoading = false;
        state.activePatients = action.payload.ok ? action.payload.data : [];
      })
      .addCase(getActivePatients.rejected, (state, action) => {
        state.activePatientsLoading = false;
        state.activePatientsError = action.payload;
        state.activePatients = [];
      });
  },
});

export const { clearBillingMessage } = billingSlice.actions;
export default billingSlice.reducer;
