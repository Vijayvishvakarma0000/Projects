// clinicSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import { API_URL } from "../../utils/baseurl";

// ---------- NEW: fetchClinics thunk ----------

export const fetchClinics = createAsyncThunk(
  "clinic/fetchClinics",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token || localStorage.getItem("token");
      console.log("🔑 Fetch Clinics - Token:", token);

      if (!token) {
        return rejectWithValue("No authentication token found");
      }

      const response = await axiosInstance.get(`${API_URL}/api/clinic`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      
      console.log("✅ Fetch Clinics Response:", response.data);
      return response.data;
    } catch (err) {
      console.error("❌ Fetch Clinics Error:", err);
      return rejectWithValue(
        err.response?.data?.error || err.message || "Failed to fetch clinics"
      );
    }
  }
);

export const fetchClinicById = createAsyncThunk(
  "clinic/fetchClinicById",
  async (clinicId, { getState, rejectWithValue }) => {
    try {
      const { auth: { accessToken } } = getState();
      const response = await axiosInstance.get(
        `${API_URL}/api/clinic/${clinicId}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          withCredentials: true,
        }
      );
      console.log("Fetch clinic response:", response.data);
      console.log("consultingHours:", response.data.clinic?.consultingHours);
      return response.data;
    } catch (error) {
      console.error("Fetch clinic error:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch clinic data"
      );
    }
  }
);

export const updateClinic = createAsyncThunk(
  "clinic/updateClinic",
  async ({ clinicId, clinicData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `${API_URL}/api/clinic/${clinicId}`,
        clinicData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      console.log("✅ Update Clinic Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("🔥 updateClinic error:", error);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const addClinic = createAsyncThunk(
  "clinic/addClinic",
  async (clinicData, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token || localStorage.getItem("token");
      const user = getState().auth.user;

      if (!token || !user?.id) {
        return rejectWithValue("User not authenticated");
      }

      const res = await axiosInstance.post(`${API_URL}/api/clinic`, clinicData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      console.log("✅ Add Clinic Response:", res.data);
      return res.data;
    } catch (err) {
      console.error("❌ Add Clinic Error:", err);
      return rejectWithValue(err.response?.data?.error || "Add clinic failed");
    }
  }
);

// ---------- NEW: updateDoctorProfile thunk ----------
export const updateDoctorProfile = createAsyncThunk(
  "clinic/updateDoctorProfile",
  // payload should be a FormData instance
  async (formData, { getState, rejectWithValue }) => {
    try {
      // try to get token from state then localStorage
      const token = getState().auth?.token || localStorage.getItem("accessToken") || localStorage.getItem("token");

      if (!token) {
        return rejectWithValue("No authentication token found");
      }

      const response = await axiosInstance.put(
        `${API_URL}/api/doctor/profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            // let axios set the correct multipart boundary
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      console.log("✅ updateDoctorProfile Response:", response.data);
      return response.data;
    } catch (err) {
      console.error("❌ updateDoctorProfile Error:", err);
      return rejectWithValue(err.response?.data?.error || err.message || "Failed to update doctor profile");
    }
  }
);


export const clearMessage = createAsyncThunk(
  "clinic/clearMessage",
  async () => {
    return null;
  }
);

const clinicSlice = createSlice({
  name: "clinic",
  initialState: {
    clinics: [],
    loading: false,
    error: null,
    message: null,
    currentClinic: null,
  },
  reducers: {
    clearMessage: (state) => {
      state.message = null;
      state.error = null;
    },
    setCurrentClinic: (state, action) => {
      state.currentClinic = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClinics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClinics.fulfilled, (state, action) => {
        state.loading = false;
        const clinicsData = Array.isArray(action.payload)
          ? action.payload
          : action.payload.clinics || [];
        state.clinics = clinicsData.map((clinic) => ({
          id: clinic._id || clinic.id,
          name: clinic.clinicName || clinic.name,
          location: clinic.address || clinic.location,
          contactNumber: clinic.contactNumber,
          email: clinic.email,
          whatsappLink: clinic.whatsappLink,
          code: clinic.code,
          specialty: clinic.specialty || "—",
        }));
      })
      .addCase(fetchClinics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch clinics";
      })
      .addCase(fetchClinicById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.currentClinic = null;
      })
      .addCase(fetchClinicById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentClinic = action.payload.clinic || action.payload;
      })
      .addCase(fetchClinicById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch clinic data";
        state.currentClinic = null;
      })
      .addCase(updateClinic.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateClinic.fulfilled, (state, action) => {
        state.loading = false;
        state.currentClinic = action.payload.clinic || action.payload;
        state.message = "Clinic updated successfully";
      })
      .addCase(updateClinic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update clinic";
      })
      .addCase(addClinic.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(addClinic.fulfilled, (state, action) => {
        state.loading = false;
        const clinic = action.payload.clinic || action.payload;
        state.clinics.push({
          id: clinic._id || clinic.id,
          name: clinic.clinicName || clinic.name,
          location: clinic.address || clinic.location,
          contactNumber: clinic.contactNumber,
          email: clinic.email,
          whatsappLink: clinic.whatsappLink,
          code: clinic.code,
          specialty: clinic.specialty || "—",
        });
        state.message = "Clinic added successfully!";
      })
      .addCase(addClinic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to add clinic";
      })
      .addCase(clearMessage.fulfilled, (state) => {
        state.message = null;
        state.error = null;
      })
      
  },
});
export const { setCurrentClinic } = clinicSlice.actions;
export default clinicSlice.reducer;



