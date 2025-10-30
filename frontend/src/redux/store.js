// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage
import { combineReducers } from "redux";

// Import reducers
import authReducer from "./Slices/authSlice";
import clinicReducer from "./Slices/clinicSlice";
import subscriptionReducer from "./Slices/subscriptionSlice";
import patientsReducer from "./Slices/patientsSlice";
import receptionReducer from "./Slices/receptionSlice";
import staffReducer from "./Slices/staffSlice";
import licenseReducer from "./Slices/licenseSlice";
import billingReducer from "./Slices/billingSlice";

// === Persist Config ===
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "clinic"], // Sirf yeh persist karo
  // blacklist: ["reception"] // optional: reception ka data nahi save karna
};

// === Combine Reducers ===
const rootReducer = combineReducers({
  auth: authReducer,
  clinic: clinicReducer,
  subscription: subscriptionReducer,
  patients: patientsReducer,
  reception: receptionReducer,
  staff: staffReducer,
  license: licenseReducer,
  billing: billingReducer,
});

// === Persisted Reducer ===
const persistedReducer = persistReducer(persistConfig, rootReducer);

// === Store ===
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "clinic/addClinic/pending",
          "clinic/addClinic/fulfilled",
        ],
        ignoredPaths: ["clinic.payload", "clinic.currentClinic.logo"],
      },
    }),
});

// === Persistor ===
export const persistor = persistStore(store); // MUST EXPORT

console.log("Redux Store + Persist Initialized");

export default store;
export const dispatch = store.dispatch;
export const getState = store.getState;