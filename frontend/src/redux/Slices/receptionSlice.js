// src/redux/Slices/receptionSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

const API_BASE_URL = "https://api.mediscript.in/api";

// === REGISTER PATIENT ===
export const registerPatient = createAsyncThunk(
  "reception/registerPatient",
  async (formData, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token =
        state?.auth?.token ||
        state?.auth?.user?.token ||
        localStorage.getItem("token");

      const rawClinicId =
        formData?.clinicId ||
        state?.clinic?.currentClinic?.id ||
        state?.clinic?.currentClinic?._id ||
        state?.auth?.user?.clinicId ||
        state?.auth?.clinic?.id ||
        localStorage.getItem("clinicId") ||
        localStorage.getItem("selectedClinicId");

      const clinicId =
        typeof rawClinicId === "string"
          ? rawClinicId.trim()
          : rawClinicId
          ? String(rawClinicId).trim()
          : "";

      if (!token)
        return rejectWithValue("Authorization token missing. Please login.");
      if (!clinicId || clinicId === "null" || clinicId === "undefined") {
        return rejectWithValue("Clinic ID is required to register a patient.");
      }

      const payload = {
        clinicId,
        uhid: formData.uhid || "",
        name: formData.name || "",
        gender: formData.gender || "",
        age:
          formData.age !== undefined && formData.age !== null
            ? Number(formData.age)
            : undefined,
        phone: formData.phone || formData.mobile || formData.contact || "",
        address: formData.address || "",
        category: formData.category || formData.patientCategory || "general",
      };

      const url = `${API_BASE_URL}/reception/patient/register?clinicId=${encodeURIComponent(
        clinicId
      )}`;
      const response = await axiosInstance.post(url, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data?.patient || response.data;
    } catch (error) {
      const serverMsg =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error.message;
      return rejectWithValue(serverMsg || "Registration failed");
    }
  }
);

// === FETCH ALL PATIENTS ===
export const fetchPatients = createAsyncThunk(
  "reception/fetchPatients",
  async (clinicIdArg, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token =
        state?.auth?.token ||
        state?.auth?.user?.token ||
        localStorage.getItem("token");

      const rawClinicId =
        clinicIdArg ??
        state?.auth?.clinic?.id ??
        state?.auth?.user?.clinicId ??
        state?.auth?.user?.clinic?.id ??
        localStorage.getItem("clinicId") ??
        localStorage.getItem("selectedClinicId") ??
        "";

      const clinicId =
        typeof rawClinicId === "string"
          ? rawClinicId.trim()
          : rawClinicId
          ? String(rawClinicId).trim()
          : "";

      if (!clinicId || clinicId === "null" || clinicId === "undefined")
        return rejectWithValue("Invalid clinicId");
      if (!token) return rejectWithValue("Authorization token missing");

      const url = `${API_BASE_URL}/reception/patient/all/`;
      const response = await axiosInstance.get(url, {
        headers: { Authorization: `Bearer ${token}` },
        params: { clinicId },
      });

      return response.data?.patients ?? response.data ?? [];
    } catch (error) {
      const serverMsg =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error.message;
      return rejectWithValue(serverMsg || "Failed to fetch patients");
    }
  }
);

// === UPLOAD REPORT ===
export const uploadReport = createAsyncThunk(
  "reception/uploadReport",
  async ({ patientId, file, files }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token =
        state?.auth?.token ||
        state?.auth?.user?.token ||
        localStorage.getItem("token");

      if (!token)
        return rejectWithValue("Authorization token missing. Please login.");
      if (!patientId)
        return rejectWithValue("patientId is required to upload a report.");

      const formData = new FormData();
      if (file) formData.append("report", file);
      else if (Array.isArray(files))
        files.forEach((f) => formData.append("report", f));
      else return rejectWithValue("No file(s) provided for upload.");

      const url = `${API_BASE_URL}/reception/patient/${patientId}/upload-report`;
      const response = await axiosInstance.post(url, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data?.patient ?? response.data;
    } catch (error) {
      const serverMsg =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error.message;
      return rejectWithValue(serverMsg || "Upload failed");
    }
  }
);

// === DAILY CALENDAR ===
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

      const finalClinicId =
        overrideClinicId ||
        state?.auth?.clinic?.id ||
        state?.clinic?.currentClinic?.id ||
        state?.clinic?.currentClinic?._id ||
        state?.auth?.user?.clinicId ||
        localStorage.getItem("clinicId");

      const finalDate = date || new Date().toISOString().slice(0, 10);

      if (!token) return rejectWithValue("Missing auth token");
      if (!finalClinicId) return rejectWithValue("Missing clinicId");

      const url = `${API_BASE_URL}/reception/calendar/${encodeURIComponent(
        finalClinicId
      )}/daily?date=${encodeURIComponent(finalDate)}`;

      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || `API error ${res.status}`);

      return Array.isArray(data.appointments)
        ? data.appointments
        : Array.isArray(data)
        ? data
        : [];
    } catch (err) {
      return rejectWithValue(err.message || "Failed to fetch calendar");
    }
  }
);

// === WEEKLY CALENDAR ===
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

      const finalDate = date || new Date().toISOString().slice(0, 10);

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

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || `API error ${res.status}`);

      return Array.isArray(data.appointments) ? data.appointments : [];
    } catch (err) {
      return rejectWithValue(err.message || "Failed to fetch weekly calendar");
    }
  }
);

// === SEARCH BY UHID (FIXED: data.patients[0]) ===
export const searchPatientByUHID = createAsyncThunk(
  "reception/searchPatientByUHID",
  async (
    { uhid, clinicId: overrideClinicId },
    { getState, rejectWithValue }
  ) => {
    try {
      const state = getState();
      const token =
        state?.auth?.token ||
        state?.auth?.user?.token ||
        localStorage.getItem("token");

      if (!token)
        return rejectWithValue("Authorization token missing. Please login.");

      const finalClinicId =
        overrideClinicId ||
        state?.auth?.clinic?.id ||
        state?.auth?.user?.clinicId ||
        localStorage.getItem("clinicId") ||
        localStorage.getItem("selectedClinicId");

      if (!finalClinicId)
        return rejectWithValue("Clinic ID is required to search patient.");
      if (!uhid || uhid.trim() === "")
        return rejectWithValue("UHID is required to search.");

      const url = `${API_BASE_URL}/reception/patient/search?uhid=${encodeURIComponent(
        uhid.trim()
      )}&clinicId=${encodeURIComponent(finalClinicId)}`;

      const response = await axiosInstance.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      // FIXED: API returns { patients: [...] }
      const patient = response.data?.patients?.[0];

      if (!patient || !patient._id) {
        return rejectWithValue("Patient not found with this UHID.");
      }

      return patient;
    } catch (error) {
      const serverMsg =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error.message;
      return rejectWithValue(serverMsg || "Search failed");
    }
  }
);

// === UPDATE PATIENT (NEW) ===
export const updatePatient = createAsyncThunk(
  "reception/updatePatient",
  async (
    { uhid, updateData, clinicId: overrideClinicId },
    { getState, rejectWithValue }
  ) => {
    try {
      const state = getState();
      const token =
        state?.auth?.token ||
        state?.auth?.user?.token ||
        localStorage.getItem("token");

      if (!token)
        return rejectWithValue("Authorization token missing. Please login.");

      const finalClinicId =
        overrideClinicId ||
        state?.auth?.clinic?.id ||
        state?.auth?.user?.clinicId ||
        localStorage.getItem("clinicId") ||
        localStorage.getItem("selectedClinicId");

      if (!finalClinicId) return rejectWithValue("Clinic ID is required.");
      if (!uhid || uhid.trim() === "")
        return rejectWithValue("UHID is required.");

      const url = `${API_BASE_URL}/reception/patient/${encodeURIComponent(
        uhid.trim()
      )}?clinicId=${encodeURIComponent(finalClinicId)}`;

      const response = await axiosInstance.put(url, updateData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // API returns updated patient
      return response.data?.patient || response.data;
    } catch (error) {
      const serverMsg =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error.message;
      return rejectWithValue(serverMsg || "Failed to update patient");
    }
  }
);

// === SLICE ===
const receptionSlice = createSlice({
  name: "reception",
  initialState: {
    patients: [],
    loading: false,
    error: null,

    dailyCalendar: [],
    calendarLoading: false,
    calendarError: null,

    weeklyCalendar: [],
    weeklyLoading: false,
    weeklyError: null,

    searchedPatient: null,
    searchLoading: false,
    searchError: null,
  },
  reducers: {
    clearPatientError: (state) => {
      state.error = null;
      state.searchError = null;
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
        state.patients = [];
      })

      // registerPatient
      .addCase(registerPatient.fulfilled, (state, action) => {
        state.loading = false;
        const patient = action.payload;
        if (patient?._id) {
          const idx = state.patients.findIndex((p) => p._id === patient._id);
          if (idx >= 0) state.patients[idx] = patient;
          else state.patients.push(patient);
        }
      })

      // Daily Calendar
      .addCase(fetchDailyCalendar.pending, (state) => {
        state.calendarLoading = true;
        state.calendarError = null;
      })
      .addCase(fetchDailyCalendar.fulfilled, (state, action) => {
        state.calendarLoading = false;
        state.dailyCalendar = Array.isArray(action.payload)
          ? action.payload
          : [];
      })
      .addCase(fetchDailyCalendar.rejected, (state, action) => {
        state.calendarLoading = false;
        state.calendarError = action.payload;
      })

      // Weekly Calendar
      .addCase(fetchWeeklyCalendar.pending, (state) => {
        state.weeklyLoading = true;
        state.weeklyError = null;
      })
      .addCase(fetchWeeklyCalendar.fulfilled, (state, action) => {
        state.weeklyLoading = false;
        state.weeklyCalendar = Array.isArray(action.payload)
          ? action.payload
          : [];
      })
      .addCase(fetchWeeklyCalendar.rejected, (state, action) => {
        state.weeklyLoading = false;
        state.weeklyError = action.payload;
      })

      // Search Patient
      .addCase(searchPatientByUHID.pending, (state) => {
        state.searchLoading = true;
        state.searchError = null;
        state.searchedPatient = null;
      })
      .addCase(searchPatientByUHID.fulfilled, (state, action) => {
        state.searchLoading = false;
        state.searchedPatient = action.payload;
      })
      .addCase(searchPatientByUHID.rejected, (state, action) => {
        state.searchLoading = false;
        state.searchError = action.payload;
        state.searchedPatient = null;
      })

      // Update Patient
      .addCase(updatePatient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePatient.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload;
        if (updated?._id) {
          const idx = state.patients.findIndex((p) => p._id === updated._id);
          if (idx >= 0) {
            state.patients[idx] = updated;
          }
          // Also update searchedPatient if active
          if (state.searchedPatient?._id === updated._id) {
            state.searchedPatient = updated;
          }
        }
      })
      .addCase(updatePatient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Logout
      .addCase("auth/logout/fulfilled", (state) => {
        state.patients = [];
        state.dailyCalendar = [];
        state.weeklyCalendar = [];
        state.searchedPatient = null;
      });
  },
});

export const { clearPatientError, setPatients } = receptionSlice.actions;
export default receptionSlice.reducer;
