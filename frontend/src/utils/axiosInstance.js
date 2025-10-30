// src/utils/axiosInstance.js
import axios from "axios";
import { API_URL } from "./baseurl";

// Create axios instance
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
  timeout: 15000,
});

// === REQUEST INTERCEPTOR ===
axiosInstance.interceptors.request.use(
  (config) => {
    // Try to get token from localStorage (fallback)
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Handle file uploads
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    }

    console.log("Request →", config.method.toUpperCase(), config.url);
    console.log("Token attached:", !!token);
    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// === RESPONSE INTERCEPTOR (401 handling) ===
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("401 Unauthorized → Logging out");
      localStorage.removeItem("token");
      localStorage.removeItem("clinicId");
      localStorage.removeItem("clinicName");
      localStorage.removeItem("calendarId");

      // Optional: Dispatch logout if Redux is available
      // But avoid circular dependency → just redirect
      window.location.href = "/signin";
    }
    return Promise.reject(error);
  }
);

// === HELPER FUNCTIONS ===
export const setAuthHeader = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common.Authorization;
  }
};

export const clearAuthHeader = () => {
  delete axiosInstance.defaults.headers.common.Authorization;
};

// === AUTO SET TOKEN ON LOAD ===
const savedToken = localStorage.getItem("token");
if (savedToken) {
  setAuthHeader(savedToken);
  console.log("Token loaded from localStorage:", savedToken);
}

export default axiosInstance;