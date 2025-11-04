// src/pages/reception/Appointments.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDailyCalendar,
  fetchWeeklyCalendar,
} from "../../redux/Slices/receptionSlice";
import {
  startConsultation,
  callPreviousPatient,
} from "../../redux/Slices/appointmentsSlice";

const formatLocalDate = (isoString) => {
  try {
    const d = new Date(isoString);
    return d.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return isoString;
  }
};

const toYYYYMMDD = (d) => {
  if (!d) return new Date().toISOString().slice(0, 10);
  if (typeof d === "string" && d.length === 10) return d;
  const dt = new Date(d);
  return dt.toISOString().slice(0, 10);
};

const Appointments = ({
  clinicId: clinicIdProp,
  appointments: propsAppointments = [],
  calendarView,
  setCalendarView,
  selectedDate,
  setSelectedDate,
  handleUpdateStatus,
  handleSendReminder,
}) => {
  const dispatch = useDispatch();

  // === 1. Clinic ID ===
  const clinicIdFromStorage = localStorage.getItem("clinicId");
  const auth = useSelector((s) => s.auth || {});
  const clinicIdFromAuth = auth?.clinic?.id || auth?.user?.clinicId || null;
  const clinicId = clinicIdProp || clinicIdFromStorage || clinicIdFromAuth;

  // === 2. Calendar Data ===
  const {
    dailyCalendar = [],
    weeklyCalendar = [],
    calendarLoading,
    calendarError,
    weeklyLoading,
    weeklyError,
  } = useSelector((s) => s.reception || {});

  // === 3. Appointments State (Next + Previous) ===
  const { starting, startError, callingPrevious, previousError } = useSelector(
    (s) => s.appointments || {}
  );

  const appointmentsFromRedux =
    calendarView === "weekly" ? weeklyCalendar : dailyCalendar;

  const appointments =
    Array.isArray(propsAppointments) && propsAppointments.length > 0
      ? propsAppointments
      : Array.isArray(appointmentsFromRedux)
      ? appointmentsFromRedux
      : [];

  const safeDate = toYYYYMMDD(selectedDate);

  // === 4. Modal & Refresh ===
  const [showForm, setShowForm] = useState(false);

  const loadCalendar = () => {
    if (!clinicId) return;
    const payload = { date: safeDate, clinicId };
    if (calendarView === "weekly") {
      dispatch(fetchWeeklyCalendar(payload));
    } else {
      dispatch(fetchDailyCalendar(payload));
    }
  };

  useEffect(() => {
    loadCalendar();
  }, [clinicId, safeDate, calendarView, dispatch]);

  const isLoading =
    calendarView === "weekly" ? !!weeklyLoading : !!calendarLoading;
  const error = calendarView === "weekly" ? weeklyError : calendarError;

  // === 5. Call Next Patient ===
  const handleStartConsultation = async () => {
    if (!clinicId) {
      alert("Clinic ID missing!");
      return;
    }

    try {
      const result = await dispatch(startConsultation({ clinicId })).unwrap();
      const token = result.tokenNumber || result.appointmentId || "Unknown";
      alert(`Next Patient Called! Token #${token}`);
      loadCalendar();
    } catch (err) {
      alert("Failed: " + (err.message || "Try again"));
    }
  };

  // === 6. Call Previous Patient ===
  const handleCallPrevious = async () => {
    if (!clinicId) {
      alert("Clinic ID missing!");
      return;
    }

    try {
      const result = await dispatch(callPreviousPatient({ clinicId })).unwrap();
      const token = result.tokenNumber || result.appointmentId || "Unknown";
      alert(`Previous Patient Called! Token #${token}`);
      loadCalendar();
    } catch (err) {
      alert("Failed: " + (err.message || "Try again"));
    }
  };

  return (
    <>
      <style jsx>{`
        /* === CARD & LAYOUT === */
        .card {
          background: #ffffff;
          padding: 24px;
          border-radius: 12px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
          margin-bottom: 24px;
          font-family: system-ui, -apple-system, sans-serif;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          flex-wrap: wrap;
          gap: 12px;
        }

        .section-title {
          font-size: 22px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .action-buttons {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .btn {
          padding: 10px 18px;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s ease;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        }

        .btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .btn-call-next {
          background: #007bff;
          color: #fff;
        }

        .btn-call-previous {
          background: #dc3545;
          color: #fff;
        }

        .btn-call-next:disabled,
        .btn-call-previous:disabled {
          background: #6c757d;
          cursor: not-allowed;
          transform: none;
        }

        .btn-call-next:hover:not(:disabled) {
          background: #0056b3;
        }

        .btn-call-previous:hover:not(:disabled) {
          background: #c82333;
        }

        /* === TABS & DATE === */
        .calendar-toggle {
          display: flex;
          gap: 12px;
          align-items: center;
          flex-wrap: wrap;
          margin-bottom: 20px;
        }

        .tab-button {
          padding: 10px 20px;
          border-radius: 8px;
          border: 1.5px solid #d1d5db;
          background: #fff;
          color: #4b5563;
          cursor: pointer;
          font-weight: 600;
          font-size: 14px;
          transition: all 0.2s;
        }

        .tab-button.active {
          background: #186476;
          color: #fff;
          border-color: #186476;
        }

        .tab-button:hover:not(.active) {
          background: #f0f9ff;
          border-color: #186476;
        }

        .input {
          padding: 10px 12px;
          border-radius: 8px;
          border: 1.5px solid #d1d5db;
          font-size: 14px;
          background: #f9fafb;
          min-width: 160px;
        }

        .input:focus {
          outline: none;
          border-color: #186476;
          box-shadow: 0 0 0 3px rgba(24, 100, 118, 0.15);
        }

        /* === TABLE === */
        .table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 12px;
          font-size: 14px;
        }

        .th {
          background: #f1f5f9;
          padding: 14px 12px;
          text-align: left;
          font-weight: 600;
          color: #374151;
          border-bottom: 2px solid #e2e8f0;
        }

        .td {
          padding: 12px;
          border-bottom: 1px solid #e2e8f0;
          vertical-align: middle;
        }

        .token {
          font-weight: 700;
          font-family: "Courier New", monospace;
          color: #186476;
        }

        .appointment-id {
          font-family: "Courier New", monospace;
          font-size: 13px;
          color: #1e40af;
          background: #ebf8ff;
          padding: 4px 8px;
          border-radius: 6px;
          display: inline-block;
        }

        .patient-name {
          font-weight: 600;
          color: #1f2937;
        }

        .uhid {
          font-size: 12px;
          color: #6b7280;
          margin-top: 2px;
        }

        .status-badge {
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
        }

        .status-waiting {
          background: #fef3c7;
          color: #92400e;
        }
        .status-in_consultation {
          background: #dbeafe;
          color: #1e40af;
        }
        .status-completed {
          background: #d1fae5;
          color: #065f46;
        }
        .status-default {
          background: #e5e7eb;
          color: #4b5563;
        }

        .status-button {
          padding: 6px 12px;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          color: #fff;
          font-weight: 600;
          font-size: 13px;
          margin-right: 6px;
          transition: all 0.2s;
        }

        .status-button:hover {
          transform: scale(1.05);
        }

        .btn-start {
          background: #007bff;
        }
        .btn-done {
          background: #28a745;
        }
        .btn-reminder {
          background: #17a2b8;
        }

        /* === MESSAGES === */
        .loading,
        .error-msg,
        .call-error {
          padding: 12px 16px;
          border-radius: 8px;
          text-align: center;
          font-size: 14px;
          margin: 12px 0;
        }

        .loading {
          background: #dbeafe;
          color: #1e40af;
        }

        .error-msg {
          background: #fee2e2;
          color: #991b1b;
        }

        .call-error {
          background: #fef3c7;
          color: #92400e;
        }

        .empty-state {
          text-align: center;
          padding: 32px 16px;
          color: #6b7280;
          font-style: italic;
        }

        /* === RESPONSIVE === */
        @media (max-width: 768px) {
          .header {
            flex-direction: column;
            align-items: stretch;
          }

          .action-buttons {
            justify-content: center;
          }

          .calendar-toggle {
            flex-direction: column;
            align-items: stretch;
          }

          .tab-button,
          .input {
            width: 100%;
            text-align: center;
          }

          .table {
            display: block;
            overflow-x: auto;
            white-space: nowrap;
          }

          .th,
          .td {
            min-width: 100px;
          }
        }
      `}</style>

      <div className="card">
        {/* Header */}
        <div className="header">
          <h2 className="section-title">Appointments & Queue</h2>
          <div className="action-buttons">
            <button
              className="btn btn-call-previous"
              onClick={handleCallPrevious}
              disabled={callingPrevious}
            >
              {callingPrevious ? "Calling..." : "Call Previous Patient"}
            </button>
            <button
              className="btn btn-call-next"
              onClick={handleStartConsultation}
              disabled={starting}
            >
              {starting ? "Calling..." : "Call Next Patient"}
            </button>
          </div>
        </div>

        {/* Tabs + Date */}
        <div className="calendar-toggle">
          <button
            className={`tab-button ${calendarView === "daily" ? "active" : ""}`}
            onClick={() => setCalendarView("daily")}
          >
            Daily View
          </button>
          <button
            className={`tab-button ${
              calendarView === "weekly" ? "active" : ""
            }`}
            onClick={() => setCalendarView("weekly")}
          >
            Weekly View
          </button>
          <input
            type="date"
            className="input"
            value={safeDate}
            onChange={(e) => {
              setSelectedDate(e.target.value);
              setCalendarView("daily");
            }}
          />
        </div>

        {/* Loading */}
        {isLoading && <div className="loading">Loading appointments...</div>}

        {/* API Error */}
        {error && <div className="error-msg">Error: {error}</div>}

        {/* Call Errors */}
        {startError && (
          <div className="call-error">
            Failed to call next patient: {startError.message || "Try again"}
          </div>
        )}
        {previousError && (
          <div className="call-error">
            Failed to call previous patient:{" "}
            {previousError.message || "Try again"}
          </div>
        )}

        {/* Table */}
        <table className="table">
          <thead>
            <tr>
              <th className="th">Token #</th>
              <th className="th">Appointment ID</th> {/* ← NEW COLUMN */}
              <th className="th">Patient</th>
              <th className="th">Date</th>
              <th className="th">Time</th>
              <th className="th">Status</th>
              <th className="th">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length > 0 ? (
              appointments.map((a) => {
                // Fixed: patientId use karo, patient nahi
                const patient = a.patientId || {};

                const status = (a.status || "").toString().toLowerCase();
                const statusClass =
                  status === "waiting"
                    ? "status-waiting"
                    : status === "in_consultation"
                    ? "status-in_consultation"
                    : status === "completed"
                    ? "status-completed"
                    : "status-default";

                const apptId = a.appointmentId || a.id || a.tokenNumber || "—";

                return (
                  <tr key={a._id || a.id || a.tokenNumber}>
                    <td className="td">
                      <span className="token">
                        #
                        {String(a.tokenNumber || a.token || "—").padStart(
                          3,
                          "0"
                        )}
                      </span>
                    </td>
                    <td className="td">
                      <span className="appointment-id">{apptId}</span>
                    </td>
                    <td className="td">
                      <div className="patient-name">
                        {patient.name || "Unknown"}
                      </div>
                      {patient.uhid && (
                        <div className="uhid">({patient.uhid})</div>
                      )}
                    </td>
                    <td className="td">
                      {formatLocalDate(a.date || safeDate)}
                    </td>
                    <td className="td">{a.time || a.slot || "—"}</td>
                    <td className="td">
                      <span className={`status-badge ${statusClass}`}>
                        {status ? status.replace(/_/g, " ") : "Scheduled"}
                      </span>
                    </td>
                    <td className="td">
                      {status === "waiting" && (
                        <button
                          className="status-button btn-start"
                          onClick={() =>
                            handleUpdateStatus?.(
                              a._id || a.id,
                              "in_consultation"
                            )
                          }
                        >
                          Start
                        </button>
                      )}
                      {status === "in_consultation" && (
                        <button
                          className="status-button btn-done"
                          onClick={() =>
                            handleUpdateStatus?.(a._id || a.id, "completed")
                          }
                        >
                          Done
                        </button>
                      )}
                      <button
                        className="status-button btn-reminder"
                        onClick={() =>
                          handleSendReminder?.(
                            patient._id || patient.id,
                            a.doctorId,
                            a.time,
                            a.date
                          )
                        }
                      >
                        Reminder
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="7" className="empty-state">
                  {clinicId
                    ? isLoading
                      ? "Loading appointments..."
                      : "No appointments for selected date"
                    : "Please select a clinic"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Appointments;
