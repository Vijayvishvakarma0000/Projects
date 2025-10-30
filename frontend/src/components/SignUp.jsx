import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import {
  registerUser,
  requestSignupOTP,
  verifySignupOTP,
  resetError,
} from "../redux/Slices/authSlice";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, signupOtpRequested, signupOtpVerified } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    otp: "",
  });
  const [role, setRole] = useState("doctor");

  // Redirect after successful OTP verification
  useEffect(() => {
    if (signupOtpVerified) navigate("/subscription"); // Default planId
  }, [signupOtpVerified, navigate]);

  // Clear errors on unmount
  useEffect(() => () => dispatch(resetError()), [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "phone" || name === "otp"
          ? value.replace(/[^0-9]/g, "")
          : value,
    });
  };

  // Step 1: Register and Request OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) return alert("Name is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return alert("Valid email required");
    if (!/^[0-9]{10}$/.test(formData.phone))
      return alert("Valid 10-digit phone required");

    try {
      await dispatch(
        registerUser({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          role,
        })
      ).unwrap();

      await dispatch(
        requestSignupOTP({ contact: formData.phone, role })
      ).unwrap();

      alert("OTP sent to your phone!");
    } catch (err) {
      console.error("Send OTP error:", err);
      alert(err || "Failed to send OTP");
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (formData.otp.length !== 6) return alert("OTP must be 6 digits");

    try {
      await dispatch(
        verifySignupOTP({
          otpData: { contact: formData.phone, code: formData.otp },
        })
      ).unwrap();

      alert("OTP verified successfully!");
      navigate("/subscription"); // Default planId
    } catch (err) {
      console.error("OTP verification failed:", err);
      alert(err || "OTP verification failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <div style={styles.header}>
          <img src={logo} alt="MediScript Logo" style={styles.logo} />
        </div>

        {error && <p style={styles.error}>{error}</p>}

        {!signupOtpRequested ? (
          <>
            <input
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              style={styles.input}
              disabled={loading}
            />
            <input
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
              disabled={loading}
            />
            <input
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              style={styles.input}
              disabled={loading}
            />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={styles.select}
              disabled={loading}
            >
              <option value="doctor">Doctor</option>
              <option value="receptionist">Receptionist</option>
              <option value="student">Medical Student</option>
              <option value="admin">Admin</option>
            </select>
          </>
        ) : (
          <input
            name="otp"
            placeholder="Enter 6-digit OTP"
            value={formData.otp}
            onChange={handleChange}
            style={styles.input}
            disabled={loading}
          />
        )}

        <button
          onClick={signupOtpRequested ? handleVerifyOtp : handleSendOtp}
          style={styles.button}
          disabled={loading}
        >
          {loading
            ? "Processing..."
            : signupOtpRequested
            ? "Verify OTP"
            : "Send OTP"}
        </button>

        <p style={styles.signupText}>
          Already have an account?{" "}
          <a href="/signin" style={styles.link}>
            Sign In
          </a>
        </p>
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
    background: "#e6f7fa",
  },
  formContainer: {
    background: "#fff",
    padding: "2rem",
    borderRadius: "12px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
    width: "100%",
    maxWidth: "400px",
  },
  header: { display: "flex", justifyContent: "center", marginBottom: "1.5rem" },
  logo: { height: "50px", objectFit: "contain" },
  input: {
    width: "100%",
    padding: "0.75rem",
    marginBottom: "1rem",
    border: "1px solid #3fa3b9",
    borderRadius: "8px",
    outline: "none",
  },
  select: {
    width: "100%",
    padding: "0.75rem",
    marginBottom: "1rem",
    border: "1px solid #3fa3b9",
    borderRadius: "8px",
    outline: "none",
  },
  button: {
    width: "100%",
    padding: "0.75rem",
    backgroundColor: "#186476",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  signupText: { textAlign: "center", marginTop: "1rem", fontSize: "0.9rem" },
  link: { color: "#3fa3b9", textDecoration: "none" },
  error: { color: "#dc2626", marginBottom: "1rem", textAlign: "center" },
};

export default SignUp;
