// src/components/AppointmentForm.js
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createAppointment,
  getNextAppointmentId,
} from "../../redux/Slices/appointmentsSlice";

const AppointmentForm = ({
  initialPatient,
  onClose,
  defaultClinicId,
  defaultDoctorId,
}) => {
  const dispatch = useDispatch();
  const {
    creating,
    createError,
    nextAppointmentId,
    fetchingNextId,
    fetchNextIdError,
  } = useSelector((state) => state.appointments || {});

  const [clinicId, setClinicId] = useState(defaultClinicId || "");
  const [doctorId, setDoctorId] = useState(defaultDoctorId || "");
  const [patientId, setPatientId] = useState(initialPatient?._id || "");
  const [appointmentId, setAppointmentId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [referredBy, setReferredBy] = useState("");

  const timeInputRef = useRef(null);

  useEffect(() => {
    if (initialPatient) setPatientId(initialPatient._id);
  }, [initialPatient]);

  // When clinicId (or doctorId) is available, request pregenerated ID
  useEffect(() => {
    if (defaultClinicId) {
      dispatch(getNextAppointmentId({ clinicId: defaultClinicId }))
        .unwrap()
        .then((res) => {
          setAppointmentId(res.appointmentId);
        })
        .catch((err) => {
          console.error("Failed to pre-generate appointment ID:", err);
        });
    }
  }, [defaultClinicId, dispatch]);

  // Keep component in sync if slice updates nextAppointmentId later
  useEffect(() => {
    if (nextAppointmentId) setAppointmentId(nextAppointmentId);
  }, [nextAppointmentId]);

  // Converts "HH:mm" local time to "HH:mm" UTC string
  function convertLocalTimeToUTC(timeStr) {
    if (!timeStr) return "";
    const [hours, minutes] = timeStr.split(":").map(Number);

    // Create a Date object for today with that local time
    const localDate = new Date();
    localDate.setHours(hours, minutes, 0, 0);

    // Convert to UTC hours/minutes
    const utcHours = localDate.getUTCHours();
    const utcMinutes = localDate.getUTCMinutes();

    // Return as "HH:mm"
    return `${String(utcHours).padStart(2, "0")}:${String(utcMinutes).padStart(
      2,
      "0"
    )}`;
  }

  const handleSubmit = (e) => {
    // Convert time → UTC
    const utcTime = convertLocalTimeToUTC(time);
    console.log("Local time:", time, "→ UTC time:", utcTime);

    const payload = {
      doctorId: doctorId || null, // 👈 send null if empty
      clinicId,
      patientId,
      appointmentId,
      date,
      time: utcTime, // 👈 use UTC time here
      referredBy,
    };
    e.preventDefault();

    {
      /*if (!clinicId || !doctorId || !patientId || !date || !time || !appointmentId) {
      alert("Please fill required fields (clinic, doctor, patient, appointmentId, date, time).");
      return;
    }
*/
    }
    dispatch(createAppointment(payload))
      .unwrap()
      .then(() => {
        alert("Appointment created");
        onClose();
      })
      .catch((err) => {
        console.error("Create appointment failed:", err);
      });
  };

  const focusTimeInput = () => {
    if (timeInputRef.current) timeInputRef.current.focus();
  };

  const regenerateId = () => {
    if (!clinicId) {
      alert("Clinic ID required to generate appointment id.");
      return;
    }

    dispatch(getNextAppointmentId({ clinicId, doctorId }))
      .unwrap()
      .then((res) => {
        if (res?.appointmentId) setAppointmentId(res.appointmentId);
        else setAppointmentId(clientGenerateAppointmentId(clinicId));
      })
      .catch(() => {
        setAppointmentId(clientGenerateAppointmentId(clinicId));
      });
  };

  return (
    <div style={ui.overlay}>
      <div role="dialog" aria-modal="true" style={ui.modal}>
        <header style={ui.header}>
          <div>
            <h2 style={ui.title}>Create Appointment</h2>
            <p style={ui.subtitle}>
              Fill the details below to create an appointment.
            </p>
          </div>
          <button onClick={onClose} aria-label="Close" style={ui.closeBtn}>
            ✕
          </button>
        </header>

        <form onSubmit={handleSubmit} style={ui.form}>
          {initialPatient && (
            <div style={ui.patientCard}>
              <div>
                <div style={ui.patientName}>{initialPatient.name}</div>
                <div style={ui.patientMeta}>
                  UHID: {initialPatient.uhid || "—"} · Age:{" "}
                  {initialPatient.age || "—"} · {initialPatient.gender || "—"}
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
                value={clinicId}
                onChange={(e) => setClinicId(e.target.value)}
                readOnly
              />
            </label>

            <label style={ui.label}>
              Patient ID *
              <input
                style={{ ...ui.input, ...ui.readOnlyInput }}
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
                placeholder="patientId"
                readOnly
              />
            </label>

            <label style={ui.label}>
              Appointment ID *
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input
                  style={{ ...ui.input, ...ui.readOnlyInput, flex: 1 }}
                  value={appointmentId}
                  onChange={(e) => setAppointmentId(e.target.value)}
                />
                <button
                  type="button"
                  onClick={regenerateId}
                  style={{
                    padding: "8px 10px",
                    borderRadius: 8,
                    border: "1px solid #e5e7eb",
                    background: "#fff",
                    cursor: "pointer",
                  }}
                  disabled={fetchingNextId}
                  title="Regenerate appointment id"
                >
                  {fetchingNextId ? "..." : "Regenerate"}
                </button>
              </div>
              {fetchNextIdError && (
                <div style={{ color: "#b91c1c", fontSize: 12, marginTop: 6 }}>
                  Failed to fetch id from server — using fallback.
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
                />
                <button
                  type="button"
                  onClick={focusTimeInput}
                  aria-label="Open time picker"
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
                placeholder="Dr Sachin (optional)"
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
              {createError.message || JSON.stringify(createError)}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

// client-side fallback generator (used only if server call fails)
function clientGenerateAppointmentId(clinicId = "") {
  const t = new Date();
  const yyyy = t.getFullYear();
  const mm = String(t.getMonth() + 1).padStart(2, "0");
  const dd = String(t.getDate()).padStart(2, "0");
  const hh = String(t.getHours()).padStart(2, "0");
  const min = String(t.getMinutes()).padStart(2, "0");
  const ss = String(t.getSeconds()).padStart(2, "0");
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  const prefix = clinicId
    ? clinicId.toString().slice(0, 6).toUpperCase()
    : "CLN";
  return `${prefix}-${yyyy}${mm}${dd}-${hh}${min}${ss}-${rand}`;
}

/* UI object (use your existing ui from prior file) */
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
    background: "#ffffff",
    borderRadius: 12,
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    padding: "18px 20px",
    borderBottom: "1px solid #eef2f5",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: { margin: 0, fontSize: 18, color: "#111827" },
  subtitle: { margin: "6px 0 0 0", color: "#6b7280", fontSize: 13 },
  closeBtn: {
    background: "transparent",
    border: "none",
    fontSize: 18,
    cursor: "pointer",
    padding: 6,
    lineHeight: 1,
    color: "#6b7280",
  },
  form: { padding: 20, display: "flex", flexDirection: "column", gap: 12 },
  patientCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
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
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 12,
    alignItems: "start",
  },
  label: {
    display: "flex",
    flexDirection: "column",
    fontSize: 13,
    color: "#0f172a",
  },
  input: {
    marginTop: 6,
    padding: "10px 12px",
    borderRadius: 8,
    border: "1px solid #dbe7f0",
    outline: "none",
    fontSize: 14,
    boxShadow: "inset 0 -1px 0 rgba(16,24,40,0.03)",
  },
  readOnlyInput: {
    background: "#f3f4f6",
    color: "#374151",
    cursor: "not-allowed",
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
  timeWrap: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  watchBtn: {
    position: "absolute",
    right: 8,
    top: "50%",
    transform: "translateY(-50%)",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    padding: 6,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#6b7280",
  },
};

export default AppointmentForm;
