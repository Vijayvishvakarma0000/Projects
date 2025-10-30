import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import store from "./redux/store";
import "./App.css";

// Auth Pages
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

// Doctor Pages
import Dashboard from "./pages/dashboard";
import ClinicPage from "./pages/ClinicPage";
import DoctorSuite from "./pages/DoctorSuite";
import CertificatePage from "./pages/CertificatePage";
import PatientAnalytics from "./pages/PatientAnalytics";
import PrescriptionPage from "./pages/PrescriptionPage";
import AccountPage from "./pages/AccountPage";
import PatientsPage from "./pages/PatientsPage";
import DrugsLibrary from "./pages/DrugsLibrary";
import LibraryPage from "./pages/LibraryPage";
import ClinicManagementPage from "./pages/Clinicmanagement";
import ReceptionDashBoard from "./pages/ReceptionPage";

// Subscription & Razorpay
import SubscriptionPage from "./pages/SubscriptionPage";
import PaymentPage from "./pages/PaymentPage";
import { logout, setToken, setUser } from "./redux/Slices/authSlice";
import NewBill from "./pages/reception/NewBill";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");
    if (token) {
      dispatch(setToken(token));
    }
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        dispatch(setUser(user));
      } catch (e) {
        console.warn("Invalid user in localStorage — clearing");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        dispatch(logout());
      }
    }
  }, [dispatch]);
  return (
    <Provider store={store}>
      <Router>
        <div style={{ margin: "0 auto", overflow: "hidden" }}>
          <Routes>
            {/* Auth */}
            <Route path="/" element={<SignIn />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            {/* Doctor */}
            <Route path="/doctor-dashboard" element={<Dashboard />} />
             <Route path="/receptionist-dashboard" element={<ReceptionDashBoard />} />
            
            <Route path="/my-clinic" element={<ClinicPage />} />
            <Route path="/doctor-suite" element={<DoctorSuite />} />
            <Route path="/patients" element={<PatientsPage />} />
            <Route path="/certificates" element={<CertificatePage />} />
            <Route path="/account-billing" element={<AccountPage />} />
            <Route
              path="/prescription-library"
              element={<PrescriptionPage />}
            />
            <Route path="/analytics" element={<PatientAnalytics />} />    
            <Route path="/drugs-library" element={<DrugsLibrary />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route
              path="/clinic-management"
              element={<ClinicManagementPage />}
            />
            {/* Subscription */}
            <Route path="/subscription" element={<SubscriptionPage />} />
            <Route path="/payment/:planId" element={<PaymentPage />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;