// src/components/Appointments.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDailyCalendar,
  fetchWeeklyCalendar,
} from "../../redux/Slices/receptionSlice";

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
  appointments: propsAppointments,
  calendarView,
  setCalendarView,
  selectedDate,
  setSelectedDate,
  handleUpdateStatus,
  handleSendReminder,
}) => {
  const dispatch = useDispatch();

  // 1. clinicId: localStorage > prop > auth
  const clinicIdFromStorage = localStorage.getItem("clinicId");
  const auth = useSelector((s) => s.auth || {});
  const clinicIdFromAuth = auth?.clinic?.id || auth?.user?.clinicId || null;
  const clinicId = clinicIdProp || clinicIdFromStorage || clinicIdFromAuth;

  // 2. Redux calendar data
  const {
    dailyCalendar = [],
    weeklyCalendar = [],
    calendarLoading,
    calendarError,
    weeklyLoading,
    weeklyError,
  } = useSelector((s) => s.reception || {});

  // 3. Final appointments: props (for demo) > Redux
  const appointmentsFromRedux = calendarView === "weekly" ? weeklyCalendar : dailyCalendar;
  const appointments = Array.isArray(propsAppointments)
    ? propsAppointments
    : Array.isArray(appointmentsFromRedux)
    ? appointmentsFromRedux
    : [];

  const safeDate = toYYYYMMDD(selectedDate);

  // Debug
  useEffect(() => {
    console.log("Appointments Debug:", {
      clinicId,
      clinicIdProp,
      clinicIdFromStorage,
      clinicIdFromAuth,
      calendarView,
      safeDate,
    });
  }, [clinicId, clinicIdProp, clinicIdFromStorage, clinicIdFromAuth, calendarView, safeDate]);

  const loadCalendar = () => {
    if (!clinicId) {
      console.error("Missing clinicId → Cannot fetch calendar");
      return;
    }

    const payload = { date: safeDate, clinicId };

    if (calendarView === "weekly") {
      dispatch(fetchWeeklyCalendar(payload));
    } else {
      dispatch(fetchDailyCalendar(payload));
    }
  };

  // 4. Re-fetch when clinicId, date, or view changes
  useEffect(() => {
    loadCalendar();
  }, [clinicId, safeDate, calendarView, dispatch]);

  const isLoading = calendarView === "weekly" ? !!weeklyLoading : !!calendarLoading;
  const error = calendarView === "weekly" ? weeklyError : calendarError;

  return (
    <>
      <style jsx>{`
        /* ... tumhara existing CSS ... */
      `}</style>

      <div className="card">
        <h2 className="section-title">Appointments & Queue Management</h2>

        <div className="calendar-toggle">
          <button
            className={`tab-button ${calendarView === "daily" ? "active" : ""}`}
            onClick={() => setCalendarView("daily")}
            type="button"
          >
            Daily View
          </button>

          <button
            className={`tab-button ${calendarView === "weekly" ? "active" : ""}`}
            onClick={() => setCalendarView("weekly")}
            type="button"
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
            aria-label="Select date"
          />
        </div>

        {isLoading && <div style={{ padding: 8 }}>Loading appointments...</div>}
        {error && <div style={{ color: "red", padding: 8 }}>Error: {error}</div>}

        <table className="table" aria-live="polite">
          <thead>
            <tr>
              <th className="th">Token #</th>
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
                const patient = a.patientId || a.patient || {};
                const dateDisplay = formatLocalDate(a.date || a.appointmentDate || safeDate);
                const status = (a.status || "").toString().toLowerCase();

                return (
                  <tr key={a._id || a.id || a.tokenNumber || Math.random()}>
                    <td className="td">{a.tokenNumber ?? a.token ?? "—"}</td>
                    <td className="td">
                      {patient.name || patient.uhid || "Unknown"}
                      {patient.uhid && (
                        <div style={{ fontSize: 12, color: "#666" }}>
                          ({patient.uhid})
                        </div>
                      )}
                    </td>
                    <td className="td">{dateDisplay}</td>
                    <td className="td">{a.time || a.slot || "—"}</td>
                    <td className="td" style={{ textTransform: "capitalize" }}>
                      {status || "—"}
                    </td>
                    <td className="td">
                      {status === "waiting" && (
                        <button
                          className="status-button"
                          style={{ background: "#007BFF" }}
                          onClick={() => handleUpdateStatus?.(a._id || a.id, "in_consultation")}
                          type="button"
                        >
                          Start
                        </button>
                      )}

                      {status === "in_consultation" && (
                        <button
                          className="status-button"
                          style={{ background: "#6c757d" }}
                          onClick={() => handleUpdateStatus?.(a._id || a.id, "completed")}
                          type="button"
                        >
                          Finish
                        </button>
                      )}

                      <button
                        className="button blue-button small"
                        onClick={() =>
                          handleSendReminder?.(
                            patient._id || patient.id || a.patientId,
                            a.doctorId || a.doctor,
                            a.time,
                            a.date || a.appointmentDate
                          )
                        }
                        type="button"
                      >
                        Send Reminder
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className="td" style={{ textAlign: "center", padding: 12 }}>
                  {clinicId ? "No appointments for selected date" : "Clinic not selected"}
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