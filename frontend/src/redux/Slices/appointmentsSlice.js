// src/features/appointments/appointmentsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Helper to get auth token
const getAuthToken = (getState) => {
  try {
    const stateToken = getState()?.auth?.token;
    if (stateToken) return stateToken;
  } catch (e) {}
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

// ========================================
// 1. GET NEXT APPOINTMENT ID (POST /next)
// ========================================
export const getNextAppointmentId = createAsyncThunk(
  "appointments/getNextAppointmentId",
  async ({ clinicId, doctorId } = {}, { getState, rejectWithValue }) => {
    try {
      if (!clinicId) return rejectWithValue({ message: "clinicId required" });

      const token = getAuthToken(getState);
      const headers = { "Content-Type": "application/json" };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const url = `https://api.mediscript.in/api/reception/appointments/${clinicId}/next`;

      const res = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify({ doctorId: doctorId || undefined }),
      });

      let body = null;
      try {
        body = await res.json();
      } catch (e) {}

      if (!res.ok)
        return rejectWithValue(body || { message: `Failed ${res.status}` });

      const appointmentId =
        body?.appointmentId || body?.id || body?.appointment_id;
      if (!appointmentId)
        return rejectWithValue({ message: "No appointmentId" });

      return { appointmentId, ...body };
    } catch (err) {
      return rejectWithValue({ message: err.message || "Network error" });
    }
  }
);

// ========================================
// 2. CREATE APPOINTMENT
// ========================================
export const createAppointment = createAsyncThunk(
  "appointments/createAppointment",
  async (payload, { getState, rejectWithValue }) => {
    try {
      const token = getAuthToken(getState);
      const headers = { "Content-Type": "application/json" };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const { clinicId, ...body } = payload;
      if (!clinicId) return rejectWithValue({ error: "Clinic ID required" });

      const url = new URL(
        "https://api.mediscript.in/api/reception/appointments"
      );
      url.searchParams.append("clinicId", clinicId);

      const res = await fetch(url.toString(), {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });

      let bodyRes = null;
      try {
        bodyRes = await res.json();
      } catch (e) {}

      if (!res.ok)
        return rejectWithValue(bodyRes || { message: `Failed ${res.status}` });

      return bodyRes;
    } catch (err) {
      return rejectWithValue({ message: err.message || "Network error" });
    }
  }
);

// ========================================
// 3. CALL NEXT PATIENT (POST /next - EMPTY BODY)
// ========================================
export const startConsultation = createAsyncThunk(
  "appointments/startConsultation",
  async ({ clinicId }, { getState, rejectWithValue }) => {
    try {
      if (!clinicId) return rejectWithValue({ message: "clinicId required" });

      const token = getAuthToken(getState);
      if (!token) return rejectWithValue({ message: "No auth token" });

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const url = `https://api.mediscript.in/api/reception/appointments/${clinicId}/next`;

      console.log("startConsultation → POST", url);

      const res = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify({}), // empty body as per curl
      });

      let body = null;
      try {
        body = await res.json();
      } catch (e) {}

      console.log("startConsultation → status:", res.status, "response:", body);

      if (!res.ok) {
        return rejectWithValue(body || { message: `Failed ${res.status}` });
      }

      // Return token + patient info
      return body;
    } catch (err) {
      console.error("startConsultation error:", err);
      return rejectWithValue({ message: err.message || "Network error" });
    }
  }
);

// ========================================
// 4. CALL PREVIOUS PATIENT (POST /previous)
// ========================================
export const callPreviousPatient = createAsyncThunk(
  "appointments/callPreviousPatient",
  async ({ clinicId }, { getState, rejectWithValue }) => {
    try {
      if (!clinicId) return rejectWithValue({ message: "clinicId required" });

      const token = getAuthToken(getState);
      if (!token) return rejectWithValue({ message: "No auth token" });

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const url = `https://api.mediscript.in/api/reception/appointments/${clinicId}/previous`;

      console.log("callPreviousPatient → POST", url);

      const res = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify({}), // empty body
      });

      let body = null;
      try {
        body = await res.json();
      } catch (e) {}

      console.log(
        "callPreviousPatient → status:",
        res.status,
        "response:",
        body
      );

      if (!res.ok) {
        return rejectWithValue(body || { message: `Failed ${res.status}` });
      }

      return body; // { tokenNumber, patient, status: "in_consultation" }
    } catch (err) {
      console.error("callPreviousPatient error:", err);
      return rejectWithValue({ message: err.message || "Network error" });
    }
  }
);

// ========================================
// 5. PRE-GENERATE APPOINTMENT ID (GET)
// ========================================
export const preGenerateAppointmentId = createAsyncThunk(
  "appointments/preGenerateAppointmentId",
  async ({ clinicId }, { getState, rejectWithValue }) => {
    try {
      if (!clinicId) {
        return rejectWithValue({ message: "clinicId is required" });
      }

      const token = getAuthToken(getState);
      if (!token) {
        return rejectWithValue({ message: "Authentication token missing" });
      }

      const url = `https://api.mediscript.in/api/reception/pre-generate-appointment-id?clinicId=${clinicId}`;

      const res = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          // No Content-Type needed for GET without body
        },
      });

      let data = null;
      try {
        data = await res.json();
      } catch (e) {}

      if (!res.ok) {
        return rejectWithValue(
          data || { message: `Request failed with status ${res.status}` }
        );
      }

      // API returns something like { appointmentId: "APT-2025-00123" }
      const appointmentId = data?.appointmentId || data?.id;
      if (!appointmentId) {
        return rejectWithValue({ message: "appointmentId not returned" });
      }

      return { appointmentId, raw: data };
    } catch (err) {
      return rejectWithValue({ message: err.message || "Network error" });
    }
  }
);

// ========================================
// SLICE
// ========================================
const appointmentsSlice = createSlice({
  name: "appointments",
  initialState: {
    items: [],
    creating: false,
    createError: null,
    nextAppointmentId: "",
    fetchingNextId: false,
    fetchNextIdError: null,

    // start consultation
    starting: false,
    startError: null,
    nextToken: null,

    preGeneratedId: "", // <-- holds the generated ID
    preGenerating: false, // <-- loading flag
    preGenerateError: null, // <-- error
  },
  reducers: {
    clearStartError: (state) => {
      state.startError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // create
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
        state.createError = action.payload;
      })

      // get next id
      .addCase(getNextAppointmentId.pending, (state) => {
        state.fetchingNextId = true;
        state.fetchNextIdError = null;
      })
      .addCase(getNextAppointmentId.fulfilled, (state, action) => {
        state.fetchingNextId = false;
        state.nextAppointmentId = action.payload.appointmentId;
      })
      .addCase(getNextAppointmentId.rejected, (state, action) => {
        state.fetchingNextId = false;
        state.fetchNextIdError = action.payload;
      })

      // start consultation
      .addCase(startConsultation.pending, (state) => {
        state.starting = true;
        state.startError = null;
      })
      .addCase(startConsultation.fulfilled, (state, action) => {
        state.starting = false;
        state.nextToken =
          action.payload?.tokenNumber || action.payload?.appointmentId;
      })
      .addCase(startConsultation.rejected, (state, action) => {
        state.starting = false;
        state.startError = action.payload;
      })

      // call previous patient
      .addCase(callPreviousPatient.pending, (state) => {
        state.callingPrevious = true;
        state.previousError = null;
      })
      .addCase(callPreviousPatient.fulfilled, (state, action) => {
        state.callingPrevious = false;
        state.previousToken =
          action.payload?.tokenNumber || action.payload?.appointmentId;
      })
      .addCase(callPreviousPatient.rejected, (state, action) => {
        state.callingPrevious = false;
        state.previousError = action.payload;
      })
      // pre-generate appointment ID
      .addCase(preGenerateAppointmentId.pending, (state) => {
        state.preGenerating = true;
        state.preGenerateError = null;
      })
      .addCase(preGenerateAppointmentId.fulfilled, (state, action) => {
        state.preGenerating = false;
        state.preGeneratedId = action.payload.appointmentId;
      })
      .addCase(preGenerateAppointmentId.rejected, (state, action) => {
        state.preGenerating = false;
        state.preGenerateError = action.payload;
      });
  },
});

export const { clearStartError } = appointmentsSlice.actions;
export default appointmentsSlice.reducer;
