import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import { API_URL } from "../../utils/baseUrl";

// Add staff API
export const addStaffApi = createAsyncThunk(
  "staff/addStaff",
  async (staffPayload, { getState, rejectWithValue }) => {
    try {
      const token =
        getState()?.auth?.token ||
        localStorage.getItem("accessToken") ||
        localStorage.getItem("token");

      if (!token) {
        return rejectWithValue("No authentication token found");
      }

      const response = await axiosInstance.post(`${API_URL}/api/staff`, staffPayload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      return response.data;
    } catch (err) {
      console.error("addStaffApi error:", err);
      return rejectWithValue(err.response?.data || err.message || "Failed to add staff");
    }
  }
);

const staffSlice = createSlice({
  name: "staff",
  initialState: {
    staffList: [],
    loading: false,
    error: null,
    message: null,
    lastCreatedStaff: null,
  },
  reducers: {
    setStaffList: (state, action) => {
      state.staffList = action.payload;
    },
    clearStaffMessage: (state) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // addStaffApi
      .addCase(addStaffApi.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(addStaffApi.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message || "Staff added successfully";
        state.lastCreatedStaff = action.payload?.staff || action.payload;
        if (action.payload?.staff) {
          state.staffList.push(action.payload.staff);
        }
      })
      .addCase(addStaffApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error?.message || "Failed to add staff";
      });
  },
});

export const { setStaffList, clearStaffMessage } = staffSlice.actions;
export default staffSlice.reducer;