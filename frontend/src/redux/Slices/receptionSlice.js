// receptionSlice.js (thunk portion)
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

const API_BASE_URL = "https://api.mediscript.in/api";

export const registerPatient = createAsyncThunk(
  "reception/registerPatient",
  async (formData, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token =
        state?.auth?.token ||
        state?.auth?.user?.token ||
        localStorage.getItem("token");

      // derive clinicId from formData, redux state, or localStorage
      const clinicId =
        formData?.clinicId ||
        state?.auth?.user?.clinicId ||
        state?.clinic?.currentClinic?.id ||
        state?.clinic?.currentClinic?._id ||
        localStorage.getItem("clinicId") ||
        localStorage.getItem("selectedClinicId");

      if (!token) {
        return rejectWithValue("Authorization token missing. Please login.");
      }

      if (!clinicId) {
        return rejectWithValue("clinicId missing. Please select a clinic.");
      }

      const payload = {
        clinicId,
        uhid: formData.uhid || "",
        name: formData.name || "",
        gender: formData.gender || "",
        age: formData.age !== undefined ? Number(formData.age) : undefined,
        phone: formData.phone || formData.mobile || formData.contact || "",
        address: formData.address || "",
        category: formData.category || formData.patientCategory || "general",
      };

      const url = `${API_BASE_URL}/reception/patient/register`;
      const response = await axiosInstance.post(url, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data?.patient || response.data;
    } catch (error) {
      console.error("registerPatient failed:", {
        message: error.message,
        response: error?.response?.data,
        status: error?.response?.status,
      });

      const serverMsg =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        (typeof error?.response?.data === "string"
          ? error.response.data
          : null);

      const status = error?.response?.status;
      const message =
        serverMsg ||
        (status
          ? `Request failed with status ${status}`
          : error.message || "Registration failed");

      return rejectWithValue(message);
    }
  }
);

export const fetchPatients = createAsyncThunk(
  "reception/fetchPatients",
  async (clinicIdArg, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token =
        state?.auth?.token ||
        state?.auth?.user?.token ||
        localStorage.getItem("token");

      const clinicId = String(
        clinicIdArg ||
          state?.auth?.clinic?.id ||
          state?.auth?.user?.clinicId ||
          localStorage.getItem("clinicId") ||
          ""
      ).trim();

      if (!clinicId || clinicId === "null" || clinicId === "undefined") {
        return rejectWithValue("Invalid clinicId");
      }

      if (!token) {
        return rejectWithValue("Authorization token missing");
      }

      const url = `${API_BASE_URL}/reception/patient/all/${clinicId}`;
      const response = await axiosInstance.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data?.patients ?? response.data ?? [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch patients"
      );
    }
  }
);
export const uploadReport = createAsyncThunk(
  "reception/uploadReport",
  async ({ patientId, file, files }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token =
        state?.auth?.token ||
        state?.auth?.user?.token ||
        localStorage.getItem("token");

      if (!token) {
        return rejectWithValue("Authorization token missing. Please login.");
      }

      if (!patientId) {
        return rejectWithValue("patientId is required to upload a report.");
      }

      const formData = new FormData();

      // Support either single `file` or multiple `files` (array)
      if (file) {
        formData.append("report", file);
      } else if (Array.isArray(files)) {
        files.forEach((f) => formData.append("report", f));
      } else {
        return rejectWithValue("No file(s) provided for upload.");
      }

      const url = `${API_BASE_URL}/reception/patient/${patientId}/upload-report`;

      // Do not set Content-Type with boundary manually; axios/browser will set it.
      const response = await axiosInstance.post(url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          // If your axiosInstance doesn't already set 'Content-Type', you can omit it.
          // 'Content-Type': 'multipart/form-data'
        },
      });

      // Prefer returning updated patient object if API provides it, otherwise return response.data
      return response.data?.patient ?? response.data;
    } catch (error) {
      console.error("uploadReport failed:", {
        message: error.message,
        response: error?.response?.data,
        status: error?.response?.status,
      });

      const serverMsg =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        (typeof error?.response?.data === "string"
          ? error.response.data
          : null);

      const status = error?.response?.status;
      const message =
        serverMsg ||
        (status
          ? `Request failed with status ${status}`
          : error.message || "Upload failed");

      return rejectWithValue(message);
    }
  }
);

export const fetchDailyCalendar = createAsyncThunk(
  "reception/fetchDailyCalendar",
  async (
    { date, clinicId: overrideClinicId } = {},
    { getState, rejectWithValue }
  ) => {
    try {
      const state = getState();
      const token =
        state?.auth?.token ||
        state?.auth?.user?.token ||
        localStorage.getItem("token");

      // Try override first, then Redux state, then localStorage
      const finalClinicId =
        overrideClinicId ||
        state?.auth?.clinic?.id ||
        state?.clinic?.currentClinic?.id ||
        state?.clinic?.currentClinic?._id ||
        state?.auth?.user?.clinicId ||
        localStorage.getItem("clinicId");

      const finalDate = date || new Date().toISOString().slice(0, 10); // YYYY-MM-DD

      console.log("fetchDailyCalendar → Using clinicId:", finalClinicId);
      console.log("fetchDailyCalendar → Using date:", finalDate);

      if (!token) return rejectWithValue("Missing auth token");
      if (!finalClinicId) return rejectWithValue("Missing clinicId");

      // Important: path uses clinicId now (not calendarId)
      const url = `${API_BASE_URL}/reception/calendar/${encodeURIComponent(
        finalClinicId
      )}/daily?date=${encodeURIComponent(finalDate)}`;

      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const text = await res.text();
      const data = text ? JSON.parse(text) : {};

      console.log("fetchDailyCalendar → API response:", data);

      if (!res.ok) {
        const msg = data?.message || data?.error || `API error ${res.status}`;
        throw new Error(msg);
      }

      // If API returns { appointments: [...] } object
      if (Array.isArray(data.appointments)) return data.appointments;
      // If API returns array directly
      if (Array.isArray(data)) return data;
      // Fallback: empty array
      return [];
    } catch (err) {
      console.error("fetchDailyCalendar failed:", err.message || err);
      return rejectWithValue(err.message || "Failed to fetch calendar");
    }
  }
);

export const fetchWeeklyCalendar = createAsyncThunk(
  "reception/fetchWeeklyCalendar",
  async (
    { date, clinicId: overrideClinicId } = {},
    { getState, rejectWithValue }
  ) => {
    try {
      const state = getState();
      const token =
        state?.auth?.token ||
        state?.auth?.user?.token ||
        localStorage.getItem("token");

      const finalClinicId =
        overrideClinicId ||
        state?.auth?.clinic?.id ||
        state?.clinic?.currentClinic?.id ||
        state?.clinic?.currentClinic?._id ||
        state?.auth?.user?.clinicId ||
        localStorage.getItem("clinicId");

      const finalDate = date || new Date().toISOString().slice(0, 10); // YYYY-MM-DD

      if (!token) return rejectWithValue("Missing auth token");
      if (!finalClinicId) return rejectWithValue("Missing clinicId");

      const url = `${API_BASE_URL}/reception/calendar/${encodeURIComponent(
        finalClinicId
      )}/weekly?date=${encodeURIComponent(finalDate)}`;

      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const text = await res.text();
      const data = text ? JSON.parse(text) : {};

      if (!res.ok) {
        const msg = data?.message || data?.error || `API error ${res.status}`;
        throw new Error(msg);
      }

      // API returns { ok:true, view:"weekly", appointments:[...] }
      // we only need the array
      return Array.isArray(data.appointments) ? data.appointments : [];
    } catch (err) {
      console.error("fetchWeeklyCalendar failed:", err);
      return rejectWithValue(err.message || "Failed to fetch weekly calendar");
    }
  }
);

const receptionSlice = createSlice({
  name: "reception",
  initialState: {
    patients: [],           // FIXED: Add patients array
    loading: false,
    error: null,

    dailyCalendar: [],
    calendarLoading: false,
    calendarError: null,

    weeklyCalendar: [],
    weeklyLoading: false,
    weeklyError: null,
  },
  reducers: {
    clearPatientError: (state) => {
      state.error = null;
    },
    setPatients: (state, action) => {
      state.patients = action.payload || [];
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchPatients
      .addCase(fetchPatients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.loading = false;
        state.patients = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.patients = []; // Clear on error
      })

      // registerPatient
      .addCase(registerPatient.fulfilled, (state, action) => {
        state.loading = false;
        const patient = action.payload;
        if (patient?._id) {
          const idx = state.patients.findIndex((p) => p._id === patient._id);
          if (idx >= 0) {
            state.patients[idx] = patient;
          } else {
            state.patients.push(patient);
          }
        }
      })

      // Daily Calendar - FIXED: Return array directly
      .addCase(fetchDailyCalendar.fulfilled, (state, action) => {
        state.calendarLoading = false;
        state.dailyCalendar = Array.isArray(action.payload) ? action.payload : [];
      })

      // Weekly
      .addCase(fetchWeeklyCalendar.fulfilled, (state, action) => {
        state.weeklyLoading = false;
        state.weeklyCalendar = Array.isArray(action.payload) ? action.payload : [];
      })

      // Logout: Clear patients
      .addCase("auth/logout/fulfilled", (state) => {
        state.patients = [];
        state.dailyCalendar = [];
        state.weeklyCalendar = [];
      });
  },
});

export const { clearPatientError, setPatients } = receptionSlice.actions;
export default receptionSlice.reducer;