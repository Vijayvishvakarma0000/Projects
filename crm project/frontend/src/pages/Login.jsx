import React, { useState } from "react";
import API, { setAuthToken } from "../services/api";

const container = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  background: "#f4f6f8",
  padding: 16,
  boxSizing: "border-box",
};
const card = {
  width: 360,
  background: "#fff",
  padding: 20,
  borderRadius: 10,
  boxShadow: "0 10px 30px rgba(2,6,23,0.08)",
  boxSizing: "border-box",
};
const input = { width: "100%", padding: 10, margin: "8px 0", borderRadius: 8, border: "1px solid #e6e9ef" };
const btnPrimary = { background: "#0f172a", color: "white", border: "none", padding: "8px 12px", borderRadius: 8, cursor: "pointer" };
const btnGhost = { background: "transparent", border: "none", color: "#0f172a", cursor: "pointer", marginLeft: 8 };
const muted = { color: "#6b7280", fontSize: 13, marginTop: 8 };
const errorStyle = { color: "#b91c1c", marginTop: 8 };

export default function Login({ onAuth }) {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function requestOtp() {
    setError("");
    if (!phone) return setError("Phone required");
    setLoading(true);
    try {
      const res = await API.post("/auth/request-otp", { phone, email, name });
      console.log("DEBUG OTP:", res.data.debugOtp);
      setStep(2);
    } catch (e) {
      setError(e?.response?.data?.error || "Failed to request OTP");
    } finally {
      setLoading(false);
    }
  }

  async function verify() {
    setError("");
    if (!otp) return setError("Enter OTP");
    setLoading(true);
    try {
      const res = await API.post("/auth/verify-otp", { phone, otp });
      const token = res.data.token;
      setAuthToken(token);
      onAuth(token);
    } catch (e) {
      setError(e?.response?.data?.error || "OTP verify failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={container}>
      <div style={card}>
        <h2 style={{ marginTop: 0 }}>Acore CRM</h2>
        {step === 1 ? (
          <>
            <input style={input} placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <input style={input} placeholder="Company Email (@acore.com)" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input style={input} placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <div style={{ display: "flex", alignItems: "center", marginTop: 8 }}>
              <button style={btnPrimary} onClick={requestOtp} disabled={loading}>
                {loading ? "Sending..." : "Request OTP"}
              </button>
            </div>
            <p style={muted}>Login uses mobile OTP. Company email optional but must end with @acore.com</p>
          </>
        ) : (
          <>
            <input style={input} placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
            <div style={{ display: "flex", alignItems: "center", marginTop: 8 }}>
              <button style={btnPrimary} onClick={verify} disabled={loading}>
                {loading ? "Verifying..." : "Verify & Login"}
              </button>
              <button style={btnGhost} onClick={() => setStep(1)}>
                Back
              </button>
            </div>
          </>
        )}
        {error && <div style={errorStyle}>{error}</div>}
      </div>
    </div>
  );
}