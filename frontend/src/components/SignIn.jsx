// src/pages/SignIn.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  requestLoginOTP,
  verifyLoginOTP,
  resetError,
  logout,
} from "../redux/Slices/authSlice";
import axios from "axios";
import logo from "../assets/logo.png";

const SignIn = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [selectedRole, setSelectedRole] = useState(null);
  const [formError, setFormError] = useState("");
  const [resendTimer, setResendTimer] = useState(0);

  const [receptionistPhone, setReceptionistPhone] = useState("");
  const [receptionistPassword, setReceptionistPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    loading,
    error,
    loginOtpRequested,
    loginOtpVerified,
    refreshToken,
    user,
  } = useSelector((state) => state.auth);

  const validatePhone = (p) => /^[0-9]{10}$/.test(p);
  const validateOtp = (o) => /^[0-9]{4,6}$/.test(o);

  // OTP resend timer
  useEffect(() => {
    let timer;
    if (loginOtpRequested && resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [loginOtpRequested, resendTimer]);

  // Navigate after successful doctor login
  useEffect(() => {
    if (loginOtpVerified && user && selectedRole === "doctor") {
      navigate("/clinic-management");
    }
  }, [loginOtpVerified, user, selectedRole, navigate]);

  // Clear error on unmount
  useEffect(() => () => dispatch(resetError()), [dispatch]);

  // Main Login Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (selectedRole === "doctor") {
      if (!loginOtpRequested) {
        if (!validatePhone(phone)) {
          setFormError("Please enter a valid 10-digit phone number");
          return;
        }
        try {
          await dispatch(
            requestLoginOTP({ contact: phone, role: selectedRole })
          ).unwrap();
          setResendTimer(30);
        } catch (err) {
          setFormError(err?.message || "Failed to send OTP");
        }
      } else {
        if (!validateOtp(otp)) {
          setFormError("Please enter a valid OTP (4-6 digits)");
          return;
        }
        try {
          await dispatch(
            verifyLoginOTP({
              otpData: { contact: phone, code: otp },
              refreshToken,
            })
          ).unwrap();
        } catch (err) {
          setFormError(err?.message || "OTP verification failed");
        }
      }
    } else if (selectedRole === "receptionist") {
      const p = receptionistPhone.trim();
      const pwd = receptionistPassword;

      if (!validatePhone(p)) {
        setFormError("Please enter a valid 10-digit phone number");
        return;
      }
      if (!pwd || pwd.length < 4) {
        setFormError("Please enter a valid password (min 4 characters)");
        return;
      }

      try {
        const response = await axios.post(
          "https://api.mediscript.in/api/auth/login",
          { identifier: p, password: pwd },
          { headers: { "Content-Type": "application/json" }, withCredentials: true }
        );

        const { user: apiUser, accessToken } = response.data;

        // Save Token
        if (accessToken) {
          localStorage.setItem("token", accessToken);
        }

        // Extract clinicId from any possible field
        const clinicId = apiUser?.clinicId || apiUser?.clinic?.id || apiUser?.clinic_id;
        if (!clinicId) {
          setFormError("Clinic not assigned. Contact admin.");
          return;
        }

        // SAVE clinicId in localStorage
        localStorage.setItem("clinicId", String(clinicId).trim());

        // Save user info
        localStorage.setItem(
          "user",
          JSON.stringify({ role: "receptionist", ...apiUser, clinicId })
        );

        console.log("Receptionist Login Success – clinicId saved:", clinicId);

        // Wait for localStorage write
        await new Promise(resolve => setTimeout(resolve, 0));

        // Now navigate
        navigate("/receptionist-dashboard");

      } catch (err) {
        console.error("Login error:", err);
        setFormError(
          err.response?.data?.message || err.message || "Invalid credentials"
        );
      }
    } else {
      setFormError("Please select a role to continue");
    }
  };

  const handleBack = () => {
    setOtp("");
    setFormError("");
    dispatch(logout());
    setResendTimer(0);
  };

  const handleResendOtp = async () => {
    setFormError("");
    if (!validatePhone(phone)) {
      setFormError("Please enter a valid 10-digit phone number");
      return;
    }
    try {
      await dispatch(requestLoginOTP({ contact: phone, role: selectedRole })).unwrap();
      setResendTimer(30);
    } catch (err) {
      setFormError(err?.message || "Failed to resend OTP");
    }
  };

  const handleSignupRedirect = () => {
    navigate("/signup");
  };

  if (!selectedRole) {
    return (
      <div style={styles.container}>
        <div style={styles.formContainer}>
          <div style={styles.header}>
            <img src={logo} alt="MediScript Logo" style={styles.logo} />
            <h2 style={styles.title}>MediScript Login</h2>
          </div>

          <h3 style={styles.roleSelectionTitle}>Select Your Role</h3>
          <div style={styles.buttonContainer}>
            <button onClick={() => setSelectedRole("doctor")} style={styles.button}>
              Doctor
            </button>
            <button onClick={() => setSelectedRole("receptionist")} style={styles.button}>
              Receptionist
            </button>
          </div>

          <div style={styles.signupContainer}>
            <p style={styles.signupText}>Don't have an account?</p>
            <button onClick={handleSignupRedirect} style={styles.signupButton}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <div style={styles.header}>
          <img src={logo} alt="MediScript Logo" style={styles.logo} />
          <h2 style={styles.title}>MediScript Login</h2>
        </div>

        {(error || formError) && (
          <div style={styles.errorContainer}>
            <p style={styles.error}>{error || formError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          {selectedRole === "doctor" ? (
            <>
              <div style={styles.formGroup}>
                <label style={styles.label}>Phone Number</label>
                <input
                  type="tel"
                  placeholder="Enter 10-digit phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ""))}
                  style={styles.input}
                  disabled={loading}
                />
              </div>

              {loginOtpRequested && (
                <div style={styles.formGroup}>
                  <label style={styles.label}>Enter OTP</label>
                  <input
                    type="text"
                    placeholder="Enter 4-6 digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ""))}
                    style={styles.input}
                    disabled={loading}
                  />
                  <div style={styles.resendContainer}>
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      style={styles.resendButton}
                      disabled={resendTimer > 0 || loading}
                    >
                      Resend OTP {resendTimer > 0 ? `(${resendTimer}s)` : ""}
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <div style={styles.formGroup}>
                <label style={styles.label}>Phone Number</label>
                <input
                  type="tel"
                  placeholder="Enter 10-digit phone number"
                  value={receptionistPhone}
                  onChange={(e) => setReceptionistPhone(e.target.value.replace(/[^0-9]/g, ""))}
                  style={styles.input}
                  disabled={loading}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Password</label>
                <input
                  type="password"
                  placeholder="Enter password"
                  value={receptionistPassword}
                  onChange={(e) => setReceptionistPassword(e.target.value)}
                  style={styles.input}
                  disabled={loading}
                />
              </div>
            </>
          )}

          <div style={styles.buttonContainer}>
            {selectedRole === "doctor" && loginOtpRequested && (
              <button
                type="button"
                onClick={handleBack}
                style={{ ...styles.button, background: "#6b7280" }}
                disabled={loading}
              >
                Back
              </button>
            )}
            <button type="submit" style={styles.button} disabled={loading}>
              {loading
                ? "Processing..."
                : selectedRole === "doctor" && loginOtpRequested
                ? "Verify OTP"
                : "Login"}
            </button>
          </div>
        </form>

        <div style={styles.signupContainer}>
          <p style={styles.signupText}>Don't have an account?</p>
          <button onClick={handleSignupRedirect} style={styles.signupButton}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #e3f2fd, #a3dfe49f)",
  },
  formContainer: {
    background: "#fff",
    padding: "2rem",
    borderRadius: "16px",
    width: "100%",
    maxWidth: "400px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  },
  roleSelectionTitle: { textAlign: "center", marginBottom: "1rem" },
  header: { textAlign: "center", marginBottom: "1rem" },
  logo: { height: "80px" },
  title: { color: "#186476", fontSize: "1.75rem", fontWeight: "700" },
  formGroup: { marginBottom: "1rem" },
  label: { display: "block", color: "#186476", marginBottom: "0.5rem" },
  input: {
    width: "100%",
    padding: "0.85rem",
    borderRadius: "8px",
    border: "1px solid #3fa3b9",
    fontSize: "1rem",
  },
  button: {
    width: "100%",
    padding: "0.85rem",
    border: "none",
    borderRadius: "8px",
    background: "#186476",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
  },
  buttonContainer: { display: "flex", gap: "0.75rem", marginTop: "1rem" },
  errorContainer: {
    background: "#fef2f2",
    color: "#dc2626",
    padding: "0.75rem",
    borderRadius: "8px",
    marginBottom: "1rem",
    textAlign: "center",
  },
  resendContainer: { textAlign: "right", marginTop: "0.5rem" },
  resendButton: {
    background: "none",
    border: "none",
    color: "#186476",
    textDecoration: "underline",
    cursor: "pointer",
  },
  signupContainer: { textAlign: "center", marginTop: "1rem" },
  signupText: { color: "#186476" },
  signupButton: {
    background: "none",
    border: "none",
    color: "#186476",
    textDecoration: "underline",
    cursor: "pointer",
    fontWeight: "600",
  },
};

export default SignIn;