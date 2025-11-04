// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axiosInstance from "../../utils/axiosInstance";
// import { API_URL } from "../../utils/baseurl";

// // Add staff API
// export const addStaffApi = createAsyncThunk(
//   "staff/addStaff",
//   async (staffPayload, { getState, rejectWithValue }) => {
//     try {
//       const token =
//         getState()?.auth?.token ||
//         localStorage.getItem("accessToken") ||
//         localStorage.getItem("token");

//       if (!token) {
//         return rejectWithValue("No authentication token found");
//       }

//       const response = await axiosInstance.post(`${API_URL}/api/staff`, staffPayload, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         withCredentials: true,
//       });

//       return response.data;
//     } catch (err) {
//       console.error("addStaffApi error:", err);
//       return rejectWithValue(err.response?.data || err.message || "Failed to add staff");
//     }
//   }
// );

// const staffSlice = createSlice({
//   name: "staff",
//   initialState: {
//     staffList: [],
//     loading: false,
//     error: null,
//     message: null,
//     lastCreatedStaff: null,
//   },
//   reducers: {
//     setStaffList: (state, action) => {
//       state.staffList = action.payload;
//     },
//     clearStaffMessage: (state) => {
//       state.message = null;
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // addStaffApi
//       .addCase(addStaffApi.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.message = null;
//       })
//       .addCase(addStaffApi.fulfilled, (state, action) => {
//         state.loading = false;
//         state.message = action.payload?.message || "Staff added successfully";
//         state.lastCreatedStaff = action.payload?.staff || action.payload;
//         if (action.payload?.staff) {
//           state.staffList.push(action.payload.staff);
//         }
//       })
//       .addCase(addStaffApi.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || action.error?.message || "Failed to add staff";
//       });
//   },
// });


// export const { setStaffList, clearStaffMessage } = staffSlice.actions;
// export default staffSlice.reducer;

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axiosInstance from "../../utils/axiosInstance";
// import { API_URL } from "../../utils/baseurl";

// // ---- Add staff (tumhara existing thunk) ----
// export const addStaffApi = createAsyncThunk(
//   "staff/addStaff",
//   async (staffPayload, { getState, rejectWithValue }) => {
//     try {
//       const token =
//         getState()?.auth?.token ||
//         localStorage.getItem("accessToken") ||
//         localStorage.getItem("token");

//       if (!token) {
//         return rejectWithValue("No authentication token found");
//       }

//       const response = await axiosInstance.post(`${API_URL}/api/staff`, staffPayload, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         withCredentials: true,
//       });

//       return response.data;
//     } catch (err) {
//       console.error("addStaffApi error:", err);
//       return rejectWithValue(err.response?.data || err.message || "Failed to add staff");
//     }
//   }
// );

// // ---- Get staff by clinicId (naya thunk) ----
// export const getStaffApi = createAsyncThunk(
//   "staff/getStaff",
//   async (clinicId, { getState, rejectWithValue }) => {
//     try {
//       const token =
//         getState()?.auth?.token ||
//         localStorage.getItem("accessToken") ||
//         localStorage.getItem("token");

//       if (!token) {
//         return rejectWithValue("No authentication token found");
//       }

//       if (!clinicId) {
//         return rejectWithValue("clinicId is required");
//       }

//       const response = await axiosInstance.get(`${API_URL}/api/staff/${clinicId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         withCredentials: true,
//       });

//       // API gives array directly
//       return response.data;
//     } catch (err) {
//       console.error("getStaffApi error:", err);
//       return rejectWithValue(err.response?.data || err.message || "Failed to fetch staff");
//     }
//   }
// );

// const staffSlice = createSlice({
//   name: "staff",
//   initialState: {
//     staffList: [],
//     loading: false,
//     error: null,
//     message: null,
//     lastCreatedStaff: null,
//   },
//   reducers: {
//     setStaffList: (state, action) => {
//       state.staffList = action.payload;
//     },
//     clearStaffMessage: (state) => {
//       state.message = null;
//       state.error = null;
//     },
//     clearStaffList: (state) => {
//       state.staffList = [];
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // addStaffApi
//       .addCase(addStaffApi.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.message = null;
//       })
//       .addCase(addStaffApi.fulfilled, (state, action) => {
//         state.loading = false;
//         state.message = action.payload?.message || "Staff added successfully";
//         state.lastCreatedStaff = action.payload?.staff || action.payload;
//         if (action.payload?.staff) {
//           state.staffList.push(action.payload.staff);
//         }
//       })
//       .addCase(addStaffApi.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || action.error?.message || "Failed to add staff";
//       })

//       // getStaffApi
//       .addCase(getStaffApi.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(getStaffApi.fulfilled, (state, action) => {
//         state.loading = false;
//         // API returns array directly
//         state.staffList = Array.isArray(action.payload) ? action.payload : [];
//       })
//       .addCase(getStaffApi.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || action.error?.message || "Failed to fetch staff";
//       });
//   },
// });

// export const { setStaffList, clearStaffMessage, clearStaffList } = staffSlice.actions;
// export default staffSlice.reducer;


// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axiosInstance from "../../utils/axiosInstance";
// import { API_URL } from "../../utils/baseurl";

// // ---- Add Staff API ----
// export const addStaffApi = createAsyncThunk(
//   "staff/addStaff",
//   async (staffPayload, { getState, rejectWithValue }) => {
//     try {
//       const token =
//         getState()?.auth?.token ||
//         localStorage.getItem("accessToken") ||
//         localStorage.getItem("token");

//       if (!token) return rejectWithValue("No authentication token found");

//       const response = await axiosInstance.post(`${API_URL}/api/staff`, staffPayload, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         withCredentials: true,
//       });

//       return response.data;
//     } catch (err) {
//       console.error("addStaffApi error:", err);
//       return rejectWithValue(err.response?.data || err.message || "Failed to add staff");
//     }
//   }
// );

// // ---- Get Staff by clinicId ----
// export const getStaffApi = createAsyncThunk(
//   "staff/getStaff",
//   async (clinicId, { getState, rejectWithValue }) => {
//     try {
//       const token =
//         getState()?.auth?.token ||
//         localStorage.getItem("accessToken") ||
//         localStorage.getItem("token");

//       if (!token) return rejectWithValue("No authentication token found");
//       if (!clinicId) return rejectWithValue("clinicId is required");

//       const response = await axiosInstance.get(`${API_URL}/api/staff/${clinicId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//         withCredentials: true,
//       });

//       console.log("test1",response)
//       return response.data;
//     } catch (err) {
//       console.error("getStaffApi error:", err);
//       return rejectWithValue(err.response?.data || err.message || "Failed to fetch staff");
//     }
//   }
// );
// // ---- Get Specific Clinic Staff (Single API call for fixed clinicId) ----
// export const getSpecificClinicStaffApi = createAsyncThunk(
//   "staff/getSpecificClinicStaffApi",
//   async (_, { getState, rejectWithValue }) => {
//     try {
//       const token =
//         getState()?.auth?.token ||
//         localStorage.getItem("accessToken") ||
//         localStorage.getItem("token");

//       if (!token) return rejectWithValue("No authentication token found");

//       // ✅ Static clinicId (change if needed)
//       const clinicId = localStorage.getItem('selectedClinicId'); 

//       const response = await axiosInstance.get(`${API_URL}/api/staff/${clinicId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//         withCredentials: true,
//       });

//       console.log("✅ Specific Clinic Staff:", response.data);
//       return response.data;
//     } catch (err) {
//       console.error("❌ getSpecificClinicStaffApi error:", err);
//       return rejectWithValue(err.response?.data || err.message || "Failed to fetch staff");
//     }
//   }
// );

// // ---- Slice ----
// const staffSlice = createSlice({
//   name: "staff",
//   initialState: {
//     staffList: [],
//     loading: false,
//     error: null,
//     message: null,
//   },
//   reducers: {
//     clearStaffMessage: (state) => {
//       state.message = null;
//       state.error = null;
//     },
//     setStaffList: (state, action) => {
//       state.staffList = action.payload || [];
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Get Staff
//       .addCase(getStaffApi.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(getStaffApi.fulfilled, (state, action) => {
//         state.loading = false;
//         state.staffList = action.payload || [];
//       })
//       .addCase(getStaffApi.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || "Failed to fetch staff";
//       })
//       // Add Staff
//       .addCase(addStaffApi.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(addStaffApi.fulfilled, (state, action) => {
//         state.loading = false;
//         state.message = "Staff added successfully!";
//         if (action.payload?.staff) {
//           state.staffList.push(action.payload.staff);
//         }
//       })
//       .addCase(addStaffApi.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || "Failed to add staff";
//       });
//   },
// });

// export const { clearStaffMessage, setStaffList } = staffSlice.actions;
// export default staffSlice.reducer;


// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axiosInstance from "../../utils/axiosInstance";
// import { API_URL } from "../../utils/baseurl";

// // ---- Add Staff API ----
// export const addStaffApi = createAsyncThunk(
//   "staff/addStaff",
//   async (staffPayload, { getState, rejectWithValue }) => {
//     try {
//       const token =
//         getState()?.auth?.token ||
//         localStorage.getItem("accessToken") ||
//         localStorage.getItem("token");

//       if (!token) return rejectWithValue("No authentication token found");

//       const response = await axiosInstance.post(`${API_URL}/api/staff`, staffPayload, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         withCredentials: true,
//       });

//       return response.data;
//     } catch (err) {
//       console.error("addStaffApi error:", err);
//       return rejectWithValue(err.response?.data || err.message || "Failed to add staff");
//     }
//   }
// );

// // ---- Get Specific Clinic Staff ----
// export const getSpecificClinicStaffApi = createAsyncThunk(
//   "staff/getSpecificClinicStaffApi",
//   async (_, { getState, rejectWithValue }) => {
//     try {
//       const token =
//         getState()?.auth?.token ||
//         localStorage.getItem("accessToken") ||
//         localStorage.getItem("token");

//       if (!token) return rejectWithValue("No authentication token found");

//       const clinicId = localStorage.getItem('selectedClinicId'); 

//       if (!clinicId) {
//         return rejectWithValue("No clinic ID found");
//       }

//       const response = await axiosInstance.get(`${API_URL}/api/staff/${clinicId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//         withCredentials: true,
//       });

//       console.log("✅ Specific Clinic Staff:", response.data);
//       return response.data;
//     } catch (err) {
//       console.error("❌ getSpecificClinicStaffApi error:", err);
//       return rejectWithValue(err.response?.data || err.message || "Failed to fetch staff");
//     }
//   }
// );

// // ---- Slice ----
// const staffSlice = createSlice({
//   name: "staff",
//   initialState: {
//     staffList: [],
//     loading: false,
//     error: null,
//     message: null,
//   },
//   reducers: {
//     clearStaffMessage: (state) => {
//       state.message = null;
//       state.error = null;
//     },
//     setStaffList: (state, action) => {
//       state.staffList = action.payload || [];
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Get Specific Clinic Staff
//       .addCase(getSpecificClinicStaffApi.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(getSpecificClinicStaffApi.fulfilled, (state, action) => {
//         state.loading = false;
//         state.staffList = action.payload?.staff || action.payload || [];
//         state.error = null;
//       })
//       .addCase(getSpecificClinicStaffApi.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || "Failed to fetch staff";
//         state.staffList = [];
//       })
//       // Add Staff
//       .addCase(addStaffApi.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(addStaffApi.fulfilled, (state, action) => {
//         state.loading = false;
//         state.message = "Staff added successfully!";
//         if (action.payload?.staff) {
//           state.staffList.push(action.payload.staff);
//         }
//       })
//       .addCase(addStaffApi.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || "Failed to add staff";
//       });
//   },
// });

// export const { clearStaffMessage, setStaffList } = staffSlice.actions;
// export default staffSlice.reducer;















import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import { API_URL } from "../../utils/baseurl";

// =============================
// 1️⃣ ADD STAFF API
// =============================
export const addStaffApi = createAsyncThunk(
  "staff/addStaff",
  async (staffPayload, { getState, rejectWithValue }) => {
    try {
      const token =
        getState()?.auth?.token ||
        localStorage.getItem("accessToken") ||
        localStorage.getItem("token");

      if (!token) return rejectWithValue("No authentication token found");

      const response = await axiosInstance.post(`${API_URL}/api/staff`, staffPayload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      return response.data;
    } catch (err) {
      console.error("❌ addStaffApi error:", err);
      return rejectWithValue(err.response?.data || err.message || "Failed to add staff");
    }
  }
);

// =============================
// 2️⃣ GET SPECIFIC CLINIC STAFF API
// =============================
export const getSpecificClinicStaffApi = createAsyncThunk(
  "staff/getSpecificClinicStaffApi",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token =
        getState()?.auth?.token ||
        localStorage.getItem("accessToken") ||
        localStorage.getItem("token");

      if (!token) return rejectWithValue("No authentication token found");

      const clinicId = localStorage.getItem("selectedClinicId");

      if (!clinicId) return rejectWithValue("No clinic ID found");

      const response = await axiosInstance.get(`${API_URL}/api/staff/${clinicId}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      console.log("✅ Specific Clinic Staff:", response.data);
      return response.data;
    } catch (err) {
      console.error("❌ getSpecificClinicStaffApi error:", err);
      return rejectWithValue(err.response?.data || err.message || "Failed to fetch staff");
    }
  }
);

// =============================
// 3️⃣ RESET STAFF PASSWORD API
// =============================
// ---- Reset Staff Password ----
export const resetStaffPasswordApi = createAsyncThunk(
  "staff/resetStaffPasswordApi",
  async ({ staffId, clinicId }, { getState, rejectWithValue }) => {
    try {
      const token =
        getState()?.auth?.token ||
        localStorage.getItem("accessToken") ||
        localStorage.getItem("token");

      if (!token) return rejectWithValue("No authentication token found");
      if (!staffId) return rejectWithValue("Staff ID is required");
      if (!clinicId) return rejectWithValue("Clinic ID is required");

      const response = await axiosInstance.put(
        `${API_URL}/api/staff/reset/${staffId}?clinicId=${clinicId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      console.log("✅ Password Reset Response:", response.data);
      return response.data;
    } catch (err) {
      console.error("❌ resetStaffPasswordApi error:", err);
      return rejectWithValue(
        err.response?.data || err.message || "Failed to reset password"
      );
    }
  }
);


// =============================
// 4️⃣ UPDATE STAFF DETAILS API
// =============================
export const updateStaffDetailsApi = createAsyncThunk(
  "staff/updateStaffDetailsApi",
  async ({ staffId, clinicId, permissions }, { getState, rejectWithValue }) => {
    try {
      const token =
        getState()?.auth?.token ||
        localStorage.getItem("accessToken") ||
        localStorage.getItem("token");

      if (!token) return rejectWithValue("No authentication token found");
      if (!staffId || !clinicId)
        return rejectWithValue("Staff ID and Clinic ID are required");

      const response = await axiosInstance.put(
        `${API_URL}/api/staff/update/${staffId}?clinicId=${clinicId}`,
        { permissions },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log("✅ Update Staff Response:", response.data);
      return response.data;
    } catch (err) {
      console.error("❌ updateStaffDetailsApi error:", err);
      return rejectWithValue(err.response?.data || err.message || "Failed to update staff details");
    }
  }
);

// =============================
// 5️⃣ STAFF SLICE
// =============================
const staffSlice = createSlice({
  name: "staff",
  initialState: {
    staffList: [],
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    clearStaffMessage: (state) => {
      state.message = null;
      state.error = null;
    },
    setStaffList: (state, action) => {
      state.staffList = action.payload || [];
    },
  },
  extraReducers: (builder) => {
    builder
      // ---- GET STAFF ----
      .addCase(getSpecificClinicStaffApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSpecificClinicStaffApi.fulfilled, (state, action) => {
        state.loading = false;
        state.staffList = action.payload?.staff || action.payload || [];
        state.error = null;
      })
      .addCase(getSpecificClinicStaffApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch staff";
        state.staffList = [];
      })

      // ---- ADD STAFF ----
      .addCase(addStaffApi.pending, (state) => {
        state.loading = true;
      })
      .addCase(addStaffApi.fulfilled, (state, action) => {
        state.loading = false;
        state.message = "Staff added successfully!";
        if (action.payload?.staff) {
          state.staffList.push(action.payload.staff);
        }
      })
      .addCase(addStaffApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to add staff";
      })

      // ---- RESET PASSWORD ----
      .addCase(resetStaffPasswordApi.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetStaffPasswordApi.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message || "Password reset successfully!";
      })
      .addCase(resetStaffPasswordApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to reset password";
      })

      // ---- UPDATE STAFF ----
      .addCase(updateStaffDetailsApi.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateStaffDetailsApi.fulfilled, (state, action) => {
        state.loading = false;
        state.message = "Staff details updated successfully!";
      })
      .addCase(updateStaffDetailsApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update staff details";
      });
  },
});

// =============================
// 6️⃣ EXPORTS
// =============================
export const { clearStaffMessage, setStaffList } = staffSlice.actions;
export default staffSlice.reducer;
