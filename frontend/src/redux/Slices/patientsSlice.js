// src/store/patientsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../utils/baseurl"; // <-- your API base URL

// ========================
// ASYNC THUNK: Register Patient
// ========================
export const registerPatient = createAsyncThunk(
  "patients/registerPatient",
  async (payload, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token"); // JWT from frontend
      const res = await axios.post(
        `${API_URL}/api/reception/patient/register`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return res.data.patient; // { ok: true, patient }
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { error: "Failed to register patient" }
      );
    }
  }
);

// ========================
// ASYNC THUNK: Fetch Patients
// ========================
export const fetchPatients = createAsyncThunk(
  "patients/fetchPatients",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_URL}/api/reception/patient/list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data.patients; // adjust if your API returns { patients: [...] }
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { error: "Failed to fetch patients" }
      );
    }
  }
);

const patientsSlice = createSlice({
  name: "patients",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // registerPatient
      .addCase(registerPatient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerPatient.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(registerPatient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || "Something went wrong";
      })

      // fetchPatients
      .addCase(fetchPatients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || "Something went wrong";
      });
  },
});

export default patientsSlice.reducer;
