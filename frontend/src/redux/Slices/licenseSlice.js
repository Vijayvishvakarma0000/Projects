
// licenseSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import { API_URL } from "../../utils/baseurl";

/**
 * Add a new license for a clinic
 * POST /api/license/:clinicId/add
 */
export const addLicense = createAsyncThunk(
  "license/addLicense",
  async ({ clinicId, licenseData }, { getState, rejectWithValue }) => {
    try {
      const token =
        getState().auth?.token ||
        localStorage.getItem("accessToken") ||
        localStorage.getItem("token");

      if (!token) return rejectWithValue("No authentication token found");

      const response = await axiosInstance.post(
        `${API_URL}/api/license/${clinicId}/add`,
        licenseData,
        {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "Failed to add license"
      );
    }
  }
);

/**
 * Get all licenses for a clinic
 * GET /api/license/:clinicId
 */
export const getLicenses = createAsyncThunk(
  "license/getLicenses",
  async (clinicId, { getState, rejectWithValue }) => {
    try {
      const token =
        getState().auth?.token ||
        localStorage.getItem("accessToken") ||
        localStorage.getItem("token");

      if (!token) return rejectWithValue("No authentication token found");

      const response = await axiosInstance.get(`${API_URL}/api/license/${clinicId}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      return response.data.licenses || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "Failed to fetch licenses"
      );
    }
  }
);

/**
 * Update a license (e.g., expiry date)
 * PUT /api/license/:licenseId/update
 */
export const updateLicense = createAsyncThunk(
  "license/updateLicense",
  async ({ licenseId, updatedData }, { getState, rejectWithValue }) => {
    try {
      const token =
        getState().auth?.token ||
        localStorage.getItem("accessToken") ||
        localStorage.getItem("token");

      if (!token) return rejectWithValue("No authentication token found");

      const response = await axiosInstance.put(
        `${API_URL}/api/license/${licenseId}/update`,
        updatedData,
        {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      return response.data.license || { _id: licenseId, ...updatedData };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "Failed to update license"
      );
    }
  }
);

/**
 * Delete a license
 * DELETE /api/license/:licenseId/delete
 */
export const deleteLicense = createAsyncThunk(
  "license/deleteLicense",
  async (licenseId, { getState, rejectWithValue }) => {
    try {
      const token =
        getState().auth?.token ||
        localStorage.getItem("accessToken") ||
        localStorage.getItem("token");

      if (!token) return rejectWithValue("No authentication token found");

      await axiosInstance.delete(`${API_URL}/api/license/${licenseId}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      return licenseId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "Failed to delete license"
      );
    }
  }
);

const licenseSlice = createSlice({
  name: "license",
  initialState: {
    licenses: [],
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    clearLicenseMessage: (state) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ADD
      .addCase(addLicense.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(addLicense.fulfilled, (state, action) => {
        state.loading = false;
        const license = action.payload?.license || action.payload;
        if (license) state.licenses.push(license);
        state.message = "✅ License added successfully!";
      })
      .addCase(addLicense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to add license";
      })

      // GET
      .addCase(getLicenses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLicenses.fulfilled, (state, action) => {
        state.loading = false;
        state.licenses = action.payload;
      })
      .addCase(getLicenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch licenses";
      })

      // UPDATE
      .addCase(updateLicense.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(updateLicense.fulfilled, (state, action) => {
        state.loading = false;
        const updatedLicense = action.payload;
        state.licenses = state.licenses.map((l) =>
          l._id === updatedLicense._id ? { ...l, ...updatedLicense } : l
        );
        state.message = "✅ License updated successfully!";
      })
      .addCase(updateLicense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update license";
      })

      // DELETE
      .addCase(deleteLicense.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(deleteLicense.fulfilled, (state, action) => {
        state.loading = false;
        state.licenses = state.licenses.filter((l) => l._id !== action.payload);
        state.message = "✅ License deleted successfully!";
      })
      .addCase(deleteLicense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete license";
      });
  },
});

export const { clearLicenseMessage } = licenseSlice.actions;
export default licenseSlice.reducer;
