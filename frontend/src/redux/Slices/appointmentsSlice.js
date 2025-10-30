// src/features/appointments/appointmentsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


// Helper to get auth token from state or localStorage
const getAuthToken = (getState) => {
  try {
    const stateToken = getState()?.auth?.token;
    if (stateToken) return stateToken;
  } catch (e) {
    // ignore
  }
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

// Example usage of an endpoint to get the next appointment ID
export const getNextAppointmentId = createAsyncThunk(
  "appointments/getNextAppointmentId",
  async ({ clinicId, doctorId } = {}, { getState, rejectWithValue }) => {
    try {
      if (!clinicId) return rejectWithValue({ message: "clinicId required" });

      const token = getAuthToken(getState);

      const params = new URLSearchParams();
      params.append("clinicId", clinicId);
      if (doctorId) params.append("doctorId", doctorId);

      const headers = { "Content-Type": "application/json" };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const url = `https://api.mediscript.in/api/reception/pre-generate-appointment-id?${params.toString()}`;
      const res = await fetch(url, { method: "GET", headers });

      let body = null;
      try { body = await res.json(); } catch (e) {}

      console.log("getNextAppointmentId -> status:", res.status, "body:", body, "usedToken:", !!token);

      if (!res.ok) return rejectWithValue(body || { message: `Request failed ${res.status}` });

      // normalize appointmentId
      const appointmentId = body?.appointmentId || body?.id || body?.appointment_id || (body?.raw && body.raw.appointmentId) || null;

      return { ...body, appointmentId };
    } catch (err) {
      console.error("getNextAppointmentId error:", err);
      return rejectWithValue({ message: err.message || "Network error" });
    }
  }
);

// Thunk to create a new appointment

// createAppointment thunk (improved error handling & logging)
export const createAppointment = createAsyncThunk(
  "appointments/createAppointment",
  async (payload, { getState, rejectWithValue }) => {
    try {
      const token = getAuthToken(getState);

      const headers = { "Content-Type": "application/json" };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      console.log("createAppointment -> sending payload:", payload, "usingToken:", !!token);

      const res = await fetch("https://api.mediscript.in/api/reception/appointments", {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      });

      let body = null;
      try { body = await res.json(); } catch (e) {}

      console.log("createAppointment -> status:", res.status, "body:", body);

      if (!res.ok) {
        return rejectWithValue(body || { message: `Request failed ${res.status}` });
      }

      return body;
    } catch (err) {
      console.error("createAppointment network error:", err);
      return rejectWithValue({ message: err.message || "Network error" });
    }
  }
);




const appointmentsSlice = createSlice({
  name: "appointments",
  initialState: {
    items: [],
    creating: false,
    createError: null,
    // new fields for pregenerated id
    nextAppointmentId: "", // last fetched id
    fetchingNextId: false,
    fetchNextIdError: null,
  },
  reducers: {
    // add local reducers if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAppointment.pending, (state) => {
        state.creating = true;
        state.createError = null;
      })
      .addCase(createAppointment.fulfilled, (state, action) => {
        state.creating = false;
        state.items.push(action.payload);
      })
      .addCase(createAppointment.rejected, (state, action) => {
        state.creating = false;
        state.createError = action.payload || action.error;
      })
      .addCase(getNextAppointmentId.pending, (state) => {
        state.fetchingNextId = true;
        state.fetchNextIdError = null;
      })
      .addCase(getNextAppointmentId.fulfilled, (state, action) => {
        state.fetchingNextId = false;
        state.nextAppointmentId = action.payload?.appointmentId;
      })
      .addCase(getNextAppointmentId.rejected, (state, action) => {
        state.fetchingNextId = false;
        state.fetchNextIdError = action.payload || action.error;
      });
  },
});

export default appointmentsSlice.reducer;
