// src/components/AppointmentForm.js
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createAppointment,// ← Alag feature ke liye rakha (queue/next patient)
  preGenerateAppointmentId, // ← New API for appointment ID
} from "../../redux/Slices/appointmentsSlice";

const AppointmentForm = ({
  initialPatient,
  onClose,
  defaultClinicId,
  defaultDoctorId,
  onSuccess,
}) => {
  const dispatch = useDispatch();

  // Redux state (dono APIs ke liye)
  const {
    creating,
    createError,

    // New: pre-generate ID states
    preGeneratedId,
    preGenerating,
    preGenerateError,
  } = useSelector((state) => state.appointments || {});

  const [doctorId, setDoctorId] = useState(defaultDoctorId || "");
  const [patientId, setPatientId] = useState(initialPatient?._id || "");
  const [appointmentId, setAppointmentId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [referredBy, setReferredBy] = useState("");

  const timeInputRef = useRef(null);

  // Sync patientId
  useEffect(() => {
    if (initialPatient?._id) setPatientId(initialPatient._id);
  }, [initialPatient]);

  // Fetch pre-generated appointment ID (correct API)
  useEffect(() => {
    if (defaultClinicId) {
      dispatch(preGenerateAppointmentId({ clinicId: defaultClinicId }))
        .unwrap()
        .then((res) => {
          setAppointmentId(res.appointmentId || "");
        })
        .catch(() => {
          setAppointmentId(clientGenerateAppointmentId(defaultClinicId));
        });
    }
  }, [defaultClinicId, dispatch]);

  // Sync from Redux if regenerated
  useEffect(() => {
    if (preGeneratedId) {
      setAppointmentId(preGeneratedId);
    }
  }, [preGeneratedId]);

  // Convert local time to UTC
  const convertLocalTimeToUTC = (timeStr) => {
    if (!timeStr) return "";
    const [hours, minutes] = timeStr.split(":").map(Number);
    const localDate = new Date();
    localDate.setHours(hours, minutes, 0, 0);
    return `${String(localDate.getUTCHours()).padStart(2, "0")}:${String(
      localDate.getUTCMinutes()
    ).padStart(2, "0")}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!defaultClinicId) {
      alert("Clinic ID is missing!");
      return;
    }
    if (!patientId || !date || !time) {
      alert("Please fill all required fields.");
      return;
    }

    const utcTime = convertLocalTimeToUTC(time);
    const payload = {
      doctorId: doctorId || null,
      clinicId: defaultClinicId,
      patientId,
      appointmentId: appointmentId || clientGenerateAppointmentId(defaultClinicId),
      date,
      time: utcTime,
      referredBy: referredBy || undefined,
    };

    console.log("Sending appointment payload:", payload);

    dispatch(createAppointment(payload))
      .unwrap()
      .then((res) => {
        onSuccess?.(res);
        alert("Appointment created successfully!");
        onClose();
      })
      .catch((err) => {
        console.error("Create failed:", err);
        alert("Failed: " + (err.error || err.message || "Try again"));
      });
  };

  // Regenerate using pre-generate API
  const regenerateId = () => {
    if (!defaultClinicId) {
      alert("Clinic ID required to generate appointment id.");
      return;
    }
    dispatch(preGenerateAppointmentId({ clinicId: defaultClinicId }))
      .unwrap()
      .then((res) => {
        setAppointmentId(res.appointmentId);
      })
      .catch(() => {
        setAppointmentId(clientGenerateAppointmentId(defaultClinicId));
      });
  };

  const focusTimeInput = () => timeInputRef.current?.focus();

  return (
    <div style={ui.overlay}>
      <div role="dialog" aria-modal="true" style={ui.modal}>
        <header style={ui.header}>
          <div>
            <h2 style={ui.title}>Create Appointment</h2>
            <p style={ui.subtitle}>Fill the details below to create an appointment.</p>
          </div>
          <button onClick={onClose} aria-label="Close" style={ui.closeBtn}>
            X
          </button>
        </header>

        <form onSubmit={handleSubmit} style={ui.form}>
          {initialPatient && (
            <div style={ui.patientCard}>
              <div>
                <div style={ui.patientName}>{initialPatient.name}</div>
                <div style={ui.patientMeta}>
                  UHID: {initialPatient.uhid || "—"} · Age: {initialPatient.age || "—"} · {initialPatient.gender || "—"}
                </div>
              </div>
              <div style={ui.patientId}>ID: {initialPatient._id}</div>
            </div>
          )}

          <div style={ui.grid}>
            <label style={ui.label}>
              Clinic ID *
              <input
                style={{ ...ui.input, ...ui.readOnlyInput }}
                value={defaultClinicId || "—"}
                readOnly
              />
            </label>

            <label style={ui.label}>
              Patient ID *
              <input
                style={{ ...ui.input, ...ui.readOnlyInput }}
                value={patientId}
                readOnly
              />
            </label>

            <label style={ui.label}>
              Appointment ID *
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input
                  style={{ ...ui.input, ...ui.readOnlyInput, flex: 1 }}
                  value={appointmentId}
                  readOnly
                />
                <button
                  type="button"
                  onClick={regenerateId}
                  style={ui.regenBtn}
                  disabled={preGenerating}
                >
                  {preGenerating ? "..." : "Regenerate"}
                </button>
              </div>
              {preGenerateError && (
                <div style={{ color: "#b91c1c", fontSize: 12, marginTop: 6 }}>
                  Using fallback ID
                </div>
              )}
            </label>

            <label style={ui.label}>
              Date *
              <input
                style={ui.input}
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </label>

            <label style={ui.label}>
              Time *
              <div style={ui.timeWrap}>
                <input
                  ref={timeInputRef}
                  style={{ ...ui.input, paddingRight: 40 }}
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={focusTimeInput}
                  style={ui.watchBtn}
                ></button>
              </div>
            </label>

            <label style={{ ...ui.label, gridColumn: "1 / -1" }}>
              Referred By
              <input
                style={ui.input}
                value={referredBy}
                onChange={(e) => setReferredBy(e.target.value)}
                placeholder="Dr. Smith (optional)"
              />
            </label>
          </div>

          <div style={ui.footer}>
            <div style={ui.helpText}>
              <small>Required fields are marked with *</small>
            </div>
            <div style={ui.actions}>
              <button
                type="button"
                onClick={onClose}
                style={{ ...ui.button, ...ui.cancelBtn }}
                disabled={creating}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{ ...ui.button, ...ui.submitBtn }}
                disabled={creating}
              >
                {creating ? "Creating…" : "Create Appointment"}
              </button>
            </div>
          </div>

          {createError && (
            <div style={ui.error}>
              <strong>Error:</strong>{" "}
              {createError.error || createError.message || "Unknown error"}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

// Updated fallback: API jaisa format (SK-APPT-2025-XXXX)
function clientGenerateAppointmentId(clinicId = "") {
  const prefix = clinicId ? clinicId.slice(0, 2).toUpperCase() : "XX";
  const year = new Date().getFullYear();
  const counter = String(Math.floor(Math.random() * 9999) + 1).padStart(4, "0");
  return `${prefix}-APPT-${year}-${counter}`;
}

// UI Styles (unchanged)
const ui = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.45)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
    padding: 20,
  },
  modal: {
    width: 720,
    maxWidth: "100%",
    background: "#fff",
    borderRadius: 12,
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
    overflow: "hidden",
  },
  header: {
    padding: "18px 20px",
    borderBottom: "1px solid #eef2f5",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { margin: 0, fontSize: 18, color: "#111827" },
  subtitle: { margin: "6px 0 0", color: "#6b7280", fontSize: 13 },
  closeBtn: {
    background: "transparent",
    border: "none",
    fontSize: 18,
    cursor: "pointer",
    color: "#6b7280",
  },
  form: { padding: 20, display: "flex", flexDirection: "column", gap: 12 },
  patientCard: {
    display: "flex",
    justifyContent: "space-between",
    background: "#f8fafc",
    padding: 12,
    borderRadius: 8,
    border: "1px solid #eef2f5",
  },
  patientName: { fontWeight: 600, fontSize: 14, color: "#0f172a" },
  patientMeta: { fontSize: 12, color: "#475569", marginTop: 4 },
  patientId: {
    fontSize: 12,
    color: "#475569",
    background: "#fff",
    padding: "6px 10px",
    borderRadius: 6,
    border: "1px solid #e6eef6",
    fontFamily: "monospace",
  },
  grid: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 },
  label: { display: "flex", flexDirection: "column", fontSize: 13, color: "#0f172a" },
  input: {
    marginTop: 6,
    padding: "10px 12px",
    borderRadius: 8,
    border: "1px solid #dbe7f0",
    outline: "none",
    fontSize: 14,
  },
  readOnlyInput: { background: "#f3f4f6", color: "#374151", cursor: "not-allowed" },
  regenBtn: {
    padding: "8px 10px",
    borderRadius: 8,
    border: "1px solid #e5e7eb",
    background: "#fff",
    cursor: "pointer",
  },
  timeWrap: { position: "relative", display: "flex", alignItems: "center" },
  watchBtn: {
    position: "absolute",
    right: 8,
    top: "50%",
    transform: "translateY(-50%)",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    color: "#6b7280",
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 6,
  },
  helpText: { color: "#6b7280", fontSize: 13 },
  actions: { display: "flex", gap: 10 },
  button: {
    padding: "10px 14px",
    borderRadius: 8,
    fontSize: 14,
    border: "none",
    cursor: "pointer",
  },
  cancelBtn: { background: "#f3f4f6", color: "#111827" },
  submitBtn: {
    background: "#0b74e8",
    color: "#fff",
    boxShadow: "0 6px 18px rgba(11,116,232,0.18)",
  },
  error: {
    marginTop: 12,
    background: "#fff5f5",
    border: "1px solid #fecaca",
    color: "#b91c1c",
    padding: 10,
    borderRadius: 8,
    fontSize: 13,
  },
};

export default AppointmentForm;