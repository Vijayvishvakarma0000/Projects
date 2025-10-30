import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import { setAuthHeader, clearAuthHeader } from "../../utils/axiosInstance";

const API_BASE_URL = "https://api.mediscript.in/api";

const tokenFromStorage = localStorage.getItem("token") || null;
const clinicIdFromStorage = localStorage.getItem("clinicId") || null;
const clinicNameFromStorage = localStorage.getItem("clinicName") || null;
const calendarIdFromStorage =
  localStorage.getItem("calendarId") || clinicIdFromStorage || null;

// authSlice.js (top of file, outside slice)
const normalizeClinicId = (candidate) => {
  if (!candidate) return null;
  // candidate may be string id, or object { id, _id, name, calendarId }
  if (typeof candidate === "string") return candidate;
  if (typeof candidate === "object") {
    return candidate.id || candidate._id || null;
  }
  return null;
};

const saveClinicToState = (state, clinicCandidate) => {
  const clinicId = normalizeClinicId(clinicCandidate);
  if (!clinicId) return null;

  state.clinic.id = String(clinicId);
  // name/calendarId may be found on the candidate if object
  if (clinicCandidate && typeof clinicCandidate === "object") {
    state.clinic.name = clinicCandidate.name || state.clinic.name || null;
    state.clinic.calendarId =
      clinicCandidate.calendarId || state.clinic.calendarId || state.clinic.id;
  } else {
    state.clinic.calendarId = state.clinic.calendarId || state.clinic.id;
  }

  try {
    localStorage.setItem("clinicId", String(state.clinic.id));
    if (state.clinic.name)
      localStorage.setItem("clinicName", String(state.clinic.name));
    if (state.clinic.calendarId)
      localStorage.setItem("calendarId", String(state.clinic.calendarId));
  } catch (e) {
    console.warn("Failed to persist clinic to localStorage", e);
  }

  return state.clinic.id;
};

// ====================== ASYNC THUNKS ======================
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `${API_BASE_URL}/auth/register`,
        userData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log("✅ User registered:", response.data);

      // Normalize token extraction
      const token =
        response.data?.token ||
        response.data?.accessToken ||
        response.data?.data?.token ||
        null;

      if (token) {
        dispatch(setToken(token)); // updates Redux state (and localStorage per reducer)
        setAuthHeader(token); // update axios default header
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

export const requestSignupOTP = createAsyncThunk(
  "auth/requestSignupOTP",
  async (otpData, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `${API_BASE_URL}/auth/otp/request`,
        otpData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const token =
        response.data?.token ||
        response.data?.accessToken ||
        response.data?.data?.token ||
        null;

      if (token) {
        dispatch(setToken(token));
        setAuthHeader(token);
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "OTP request failed"
      );
    }
  }
);

export const verifySignupOTP = createAsyncThunk(
  "auth/verifySignupOTP",
  async ({ otpData }, { dispatch, getState, rejectWithValue }) => {
    try {
      const { auth: { accessToken } = {} } = getState();
      const response = await axiosInstance.post(
        `${API_BASE_URL}/auth/otp/verify`,
        otpData,
        {
          headers: {
            "Content-Type": "application/json",
            ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
          },
          withCredentials: true,
        }
      );

      const token =
        response.data?.token ||
        response.data?.accessToken ||
        response.data?.data?.token ||
        null;

      if (token) {
        dispatch(setToken(token));
        setAuthHeader(token);
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "OTP verification failed"
      );
    }
  }
);

export const requestLoginOTP = createAsyncThunk(
  "auth/requestLoginOTP",
  async (loginData, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `${API_BASE_URL}/auth/otp/request`,
        loginData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const token =
        response.data?.token ||
        response.data?.accessToken ||
        response.data?.data?.token ||
        null;

      if (token) {
        dispatch(setToken(token));
        setAuthHeader(token);
      }

      console.log("✅ Login OTP requested:", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Login OTP request failed"
      );
    }
  }
);

export const verifyLoginOTP = createAsyncThunk(
  "auth/verifyLoginOTP",
  async ({ otpData }, { dispatch, getState, rejectWithValue }) => {
    try {
      const { auth: { accessToken } = {} } = getState();
      const response = await axiosInstance.post(
        `${API_BASE_URL}/auth/otp/verify`,
        otpData,
        {
          headers: {
            "Content-Type": "application/json",
            ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
          },
          withCredentials: true,
        }
      );

      const token =
        response.data?.token ||
        response.data?.accessToken ||
        response.data?.data?.token ||
        null;

      if (token) {
        dispatch(setToken(token));
        setAuthHeader(token);
      }

      console.log("✅ Login OTP verified:", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Login OTP verification failed"
      );
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  "auth/fetchUserProfile",
  async (_, { getState, rejectWithValue }) => {
    try {
      const {
        auth: { accessToken },
      } = getState();
      const response = await axiosInstance.get(`${API_BASE_URL}/auth/profile`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user profile"
      );
    }
  }
);

export const activateSubscription = createAsyncThunk(
  "auth/activateSubscription",
  async ({ subscriptionId, paymentId }, { getState, rejectWithValue }) => {
    try {
      const {
        auth: { accessToken },
      } = getState();
      const response = await axiosInstance.post(
        `${API_BASE_URL}/subscription/activate`,
        { subscriptionId, paymentId },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to activate subscription"
      );
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { getState, dispatch, rejectWithValue }) => {
    try {
      const {
        auth: { accessToken },
      } = getState();
      const response = await axiosInstance.post(
        `${API_BASE_URL}/auth/logout`,
        {},
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          withCredentials: true,
        }
      );
      console.log("Logout successful:", response.data);

      // Clear axios header + localStorage immediately
      clearAuthHeader();
      localStorage.removeItem("token");
      localStorage.removeItem("clinicId");
      localStorage.removeItem("clinicName");
      localStorage.removeItem("calendarId");

      return response.data;
    } catch (error) {
      // Even if API fails, still clear header & localStorage to force logout
      clearAuthHeader();
      localStorage.removeItem("token");
      localStorage.removeItem("clinicId");
      localStorage.removeItem("clinicName");
      localStorage.removeItem("calendarId");

      console.error("Logout API error:", error);
      return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  }
);

// ====================== SLICE ======================
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    accessToken: tokenFromStorage,
    refreshToken: null,
    subscriptionStatus: "inactive",
    loading: false,
    error: null,
    signupOtpRequested: false,
    signupOtpVerified: false,
    loginOtpRequested: false,
    loginOtpVerified: false,

    // Clinic info prefilled from localStorage so refresh keeps it
    clinic: {
      id: clinicIdFromStorage,
      name: clinicNameFromStorage,
      calendarId: calendarIdFromStorage,
    },
  },
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
    setToken: (state, action) => {
      state.accessToken = action.payload;
      localStorage.setItem("token", action.payload);
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.subscriptionStatus =
        action.payload.subscription?.status || "inactive";
    },
    setSubscriptionStatus: (state, action) => {
      state.subscriptionStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // ====================== REGISTER & OTP ======================
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user || action.payload;
        state.accessToken = action.payload.token || action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken || null;

        const clinicIdFromUser = action.payload.user?.clinicId;
        if (clinicIdFromUser) {
          saveClinicToState(state, clinicIdFromUser);
        }
        // persist token + set axios header
        if (state.accessToken) {
          localStorage.setItem("token", state.accessToken);
          try {
            setAuthHeader(state.accessToken);
          } catch (e) {
            console.warn("setAuthHeader failed:", e);
          }
        }

        // persist clinic if present in payload (normalize shapes)
        const clinicId =
          action.payload?.clinic || // <-- preferred
          action.payload?.user?.clinic || // <-- second
          action.payload?.user?.clinicId; // <-- only ID, not preferred
        if (clinicId) {
          state.clinic.id = clinicId;
          state.clinic.calendarId = clinicId;
          localStorage.setItem("clinicId", clinicId);
          localStorage.setItem("calendarId", clinicId);

          //localStorage.removeItem("clinicId");
          localStorage.setItem("clinicId", state.clinic.id);
          if (state.clinic.name)
            localStorage.setItem("clinicName", state.clinic.name);
          localStorage.setItem("calendarId", state.clinic.calendarId);
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ====================== SIGNUP OTP ======================
      .addCase(requestSignupOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(requestSignupOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.signupOtpRequested = true;
        state.accessToken =
          action.payload.token ||
          action.payload.accessToken ||
          state.accessToken;
        state.refreshToken = action.payload.refreshToken || state.refreshToken;

        if (state.accessToken) {
          localStorage.setItem("token", state.accessToken);
          try {
            setAuthHeader(state.accessToken);
          } catch (e) {}
        }
      })
      .addCase(requestSignupOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(verifySignupOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifySignupOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.signupOtpVerified = true;
        state.user = action.payload.user || action.payload;
        state.accessToken =
          action.payload.token ||
          action.payload.accessToken ||
          state.accessToken;
        state.refreshToken = action.payload.refreshToken || state.refreshToken;
        state.subscriptionStatus =
          action.payload.subscription?.status || "inactive";

        // Normalize & persist clinic info
        const clinic =
          action.payload?.clinic || // <-- preferred
          action.payload?.user?.clinic || // <-- second
          action.payload?.user?.clinicId; // <-- only ID, not preferred
        const clinicIdToStore = clinic?.id || clinic?._id || clinic || null;
        if (clinic?._id || clinic?.id) {
          state.clinic.id = clinic._id || clinic.id;
          state.clinic.id = clinicIdToStore;
          state.clinic.name = clinic?.name || state.clinic.name;
          state.clinic.calendarId = clinic?.calendarId || clinicIdToStore;

          //localStorage.removeItem("clinicId");
          localStorage.setItem("clinicId", state.clinic.id);
          if (state.clinic.name)
            localStorage.setItem("clinicName", state.clinic.name);
          localStorage.setItem("calendarId", state.clinic.calendarId);
        }

        console.log("Clinic info saved (verifySignupOTP):", state.clinic);

        if (state.accessToken) {
          localStorage.setItem("token", state.accessToken);
          try {
            setAuthHeader(state.accessToken);
          } catch (e) {}
        }
      })
      .addCase(verifySignupOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ====================== LOGIN OTP ======================
      .addCase(requestLoginOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(requestLoginOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.loginOtpRequested = true;
        state.accessToken =
          action.payload.token ||
          action.payload.accessToken ||
          state.accessToken;
        state.refreshToken = action.payload.refreshToken || state.refreshToken;

        if (state.accessToken) {
          localStorage.setItem("token", state.accessToken);
          try {
            setAuthHeader(state.accessToken);
          } catch (e) {}
        }
      })
      .addCase(requestLoginOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(verifyLoginOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyLoginOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.loginOtpVerified = true;

        state.user = action.payload.user || action.payload;
        state.accessToken =
          action.payload.token ||
          action.payload.accessToken ||
          state.accessToken;
        state.refreshToken = action.payload.refreshToken || state.refreshToken;
        state.subscriptionStatus =
          action.payload.subscription?.status || state.subscriptionStatus;

        console.log("verifyLoginOTP payload:", action.payload);

        // persist clinic (normalized)
        const clinicCandidate =
          action.payload?.user?.clinic ||
          action.payload?.clinic ||
          action.payload?.user?.clinicId ||
          action.payload?.user?.clinic?._id ||
          null;

        const persistedClinicId = saveClinicToState(state, clinicCandidate);
        if (persistedClinicId) {
          console.log("Persisted clinicId:", persistedClinicId);
        }

        // persist token + set axios header
        if (state.accessToken) {
          try {
            localStorage.setItem("token", state.accessToken);
            setAuthHeader(state.accessToken);
          } catch (e) {
            console.warn("persist token failed:", e);
          }
        }
      })

      .addCase(verifyLoginOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ====================== PROFILE & SUBSCRIPTION ======================
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user || action.payload;
        state.subscriptionStatus =
          action.payload.user?.subscription?.status || "inactive";

        const clinicCandidate =
          action.payload?.user?.clinic ||
          action.payload?.clinic ||
          action.payload?.user?.clinicId ||
          action.payload?.user?.clinic?._id ||
          null;

        saveClinicToState(state, clinicCandidate);
      })

      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(activateSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(activateSubscription.fulfilled, (state, action) => {
        state.loading = false;
        state.subscriptionStatus = action.payload.status || "active";
        state.user = action.payload.user || state.user;
      })
      .addCase(activateSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ====================== LOGOUT ======================
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        resetAuthState(state);
      })
      .addCase(logout.rejected, (state) => {
        resetAuthState(state); // Force logout even if API fails
      });
  },
});

// Helper to reset everything
const resetAuthState = (state) => {
  state.loading = false;
  state.user = null;
  state.accessToken = null;
  state.refreshToken = null;
  state.subscriptionStatus = "inactive";
  state.signupOtpRequested = false;
  state.signupOtpVerified = false;
  state.loginOtpRequested = false;
  state.loginOtpVerified = false;
  state.clinic = { id: null, name: null, calendarId: null };

  localStorage.clear();

  // clear axios header if util available
  try {
    clearAuthHeader();
  } catch (e) {
    /* ignore */
  }

  try {
    localStorage.removeItem("token");
    localStorage.removeItem("clinicId");
    localStorage.removeItem("clinicName");
    localStorage.removeItem("calendarId");
  } catch (e) {
    console.warn("Failed to clear localStorage on logout", e);
  }
};

export const {
  resetError,
  setToken,
  setAccessToken,
  setUser,
  setSubscriptionStatus,
} = authSlice.actions;

export default authSlice.reducer;
