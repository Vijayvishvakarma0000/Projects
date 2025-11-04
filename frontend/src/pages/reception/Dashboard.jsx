import React from "react";

const extractAppointments = (data) => {
  if (!data) return [];

  const candidates = [
    data.appointments,
    data.data?.appointments,
    data.daily?.appointments,
    data.daily?.slots,
    data.slots,
    data.items,
    data.schedule,
    data.list,
  ];

  for (const arr of candidates) {
    if (Array.isArray(arr)) return arr;
  }

  if (Array.isArray(data)) return data;

  console.warn("Warning: No appointment array found in API response:", data);
  return [];
};

// ---------------------------------------------------------------
// Dashboard Component (Fully Updated with Live Stats)
// ---------------------------------------------------------------
const Dashboard = ({
  dailyCalendar,          // Full calendar API response
  calendarLoading = false,
  calendarError = null,

  todayStats = { todaysPatients: 0, todaysAppointments: 0, todaysBilling: 0 },
  statsLoading = false,
  statsError = null,

  patients = [],
  appointments = [],
  billing = [],
  selectedDate,
  waiting = [],
  pending = [],
  emergency = [],
  handleUpdatePatientStatus,
}) => {
  // --- Extract Appointments from Calendar API ---
  const apiAppointments = extractAppointments(dailyCalendar);
  const apiCount = apiAppointments.length;

  // --- Local Fallback Counts ---
  const localTodayCount = appointments.filter((a) => a.date === selectedDate).length;
  const localBillingToday = billing
    .filter((b) => b.date === selectedDate)
    .reduce((sum, b) => sum + (b.amount - (b.discount || 0)), 0);

  // --- Final Display Values with Priority: API → Local ---
  const displayPatients = statsLoading
    ? "…"
    : todayStats.todaysPatients > 0
    ? todayStats.todaysPatients
    : patients.length;

  const displayAppointments = calendarLoading
    ? "…"
    : apiCount > 0
    ? apiCount
    : todayStats.todaysAppointments > 0
    ? todayStats.todaysAppointments
    : localTodayCount;

  const displayBilling = statsLoading
    ? "…"
    : todayStats.todaysBilling > 0
    ? todayStats.todaysBilling.toFixed(2)
    : localBillingToday.toFixed(2);

  // --- Status Messages ---
  const getAppointmentStatusMessage = () => {
    if (calendarLoading) {
      return <div className="api-status api-loading">Loading appointments…</div>;
    }
    if (calendarError) {
      return (
        <div className="api-status api-error">
          Using local data (API failed)
        </div>
      );
    }
    if (apiCount > 0 && localTodayCount > 0 && apiCount !== localTodayCount) {
      return (
        <div className="api-status" style={{ background: "#e8f5e9", color: "#2e7d32" }}>
          Synced ({apiCount}) – local: {localTodayCount}
        </div>
      );
    }
    return null;
  };

  const getStatsStatusMessage = () => {
    if (statsLoading) {
      return <div className="api-status api-loading">Loading stats…</div>;
    }
    if (statsError) {
      return (
        <div className="api-status api-error">
          Using local data
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <style jsx>{`
        .overview-card {
          display: inline-block;
          width: 220px;
          padding: 15px;
          margin: 10px;
          background: #186476;
          color: #fff;
          border-radius: 8px;
          text-align: center;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s;
        }
        .overview-card:hover {
          transform: translateY(-3px);
        }

        .queue-container {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
          margin-bottom: 20px;
        }

        .queue-card {
          flex: 1;
          min-width: 220px;
          background: #fff;
          padding: 15px;
          border-radius: 8px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        }

        .section-title {
          margin-top: 30px;
          text-align: center;
          font-size: 20px;
          font-weight: bold;
          color: #333;
        }

        .status-button {
          padding: 5px 10px;
          margin-left: 10px;
          border-radius: 4px;
          border: none;
          cursor: pointer;
          color: #fff;
          font-weight: bold;
          transition: all 0.3s;
        }
        .status-button:hover {
          transform: scale(1.05);
          opacity: 0.9;
        }

        .api-status {
          margin: 8px 0 0;
          padding: 6px;
          border-radius: 6px;
          font-size: 0.85rem;
          text-align: center;
        }
        .api-loading {
          background: #e3f2fd;
          color: #1976d2;
        }
        .api-error {
          background: #ffebee;
          color: #c62828;
        }

        @media (max-width: 768px) {
          .overview-card {
            width: 100%;
            margin: 10px 0;
          }
          .queue-container {
            flex-direction: column;
          }
        }
      `}</style>

      <div>
        {/* ==================== OVERVIEW CARDS ==================== */}
        <div style={{ textAlign: "center" }}>
          {/* Today's Patients */}
          <div className="overview-card">
            Today’s Patients
            <br />
            <strong style={{ fontSize: "1.8rem" }}>{displayPatients}</strong>
            {getStatsStatusMessage()}
          </div>

          {/* Today’s Appointments */}
          <div className="overview-card">
            Today’s Appointments
            <br />
            <strong style={{ fontSize: "1.8rem" }}>{displayAppointments}</strong>
            {getAppointmentStatusMessage()}
          </div>

          {/* Total Billing */}
          <div className="overview-card">
            Total Billing (Today)
            <br />
            <strong style={{ fontSize: "1.6rem" }}>{displayBilling}</strong>
            {getStatsStatusMessage()}
          </div>
        </div>

        {/* ==================== PATIENT QUEUE ==================== */}
        <h2 className="section-title">Patient Queue</h2>
        <div className="queue-container">
          {/* Waiting */}
          <div className="queue-card">
            <h3>Waiting ({waiting.length})</h3>
            {waiting.length > 0 ? (
              waiting.map((p) => (
                <p key={p.id} style={{ margin: "8px 0" }}>
                  <strong>Token #{String(p.id).padStart(3, "0")}</strong> -{" "}
                  {p.name} ({p.age}y, {p.gender})
                  <button
                    className="status-button"
                    style={{ background: "#28a745" }}
                    onClick={() => handleUpdatePatientStatus(p.id)}
                  >
                    Mark Done
                  </button>
                </p>
              ))
            ) : (
              <p style={{ color: "#666" }}>No patients waiting</p>
            )}
          </div>

          {/* Pending */}
          <div className="queue-card">
            <h3>Pending ({pending.length})</h3>
            {pending.length > 0 ? (
              pending.map((p) => (
                <p key={p.id} style={{ margin: "8px 0" }}>
                  <strong>Token #{String(p.id).padStart(3, "0")}</strong> -{" "}
                  {p.name}
                  <button
                    className="status-button"
                    style={{ background: "#ffc107", color: "#000" }}
                    onClick={() => handleUpdatePatientStatus(p.id)}
                  >
                    Update
                  </button>
                </p>
              ))
            ) : (
              <p style={{ color: "#666" }}>No pending patients</p>
            )}
          </div>

          {/* Emergency */}
          <div className="queue-card">
            <h3>Emergency ({emergency.length})</h3>
            {emergency.length > 0 ? (
              emergency.map((p) => (
                <p key={p.id} style={{ margin: "8px 0" }}>
                  <strong>Token #{String(p.id).padStart(3, "0")}</strong> -{" "}
                  {p.name}
                  <button
                    className="status-button"
                    style={{ background: "#dc3545" }}
                    onClick={() => handleUpdatePatientStatus(p.id)}
                  >
                    Urgent
                  </button>
                </p>
              ))
            ) : (
              <p style={{ color: "#666" }}>No emergency patients</p>
            )}
          </div>
        </div>

        {/* ==================== LIVE APPOINTMENTS LIST ==================== */}
        {apiAppointments.length > 0 && !calendarLoading && (
          <>
            <h2 className="section-title">Today’s Appointments (Live)</h2>
            <div
              style={{
                background: "#f8f9fa",
                padding: "15px",
                borderRadius: "8px",
                marginTop: "10px",
              }}
            >
              {apiAppointments.map((apt, i) => (
                <div
                  key={apt._id || apt.id || i}
                  style={{
                    padding: "10px 0",
                    borderBottom: "1px solid #eee",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span>
                    <strong>{apt.timeSlot || apt.time || "—"}</strong> →{" "}
                    {apt.patient?.name || apt.patientName || "Unknown Patient"}
                  </span>
                  <span
                    style={{
                      color: "#186476",
                      fontWeight: "bold",
                      fontSize: "0.9rem",
                    }}
                  >
                    {apt.status || "Scheduled"}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Dashboard;