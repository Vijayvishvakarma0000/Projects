import React, { useEffect, useState } from "react";
import API from "../services/api";

const card = { background: "#fff", padding: 14, borderRadius: 10, boxShadow: "0 6px 18px rgba(15,23,42,0.04)" };
const btnPrimary = { background: "#0f172a", color: "white", border: "none", padding: "8px 12px", borderRadius: 8, cursor: "pointer" };
const btnAccent = { background: "#0ea5a4", color: "white", border: "none", padding: "8px 12px", borderRadius: 8, cursor: "pointer" };
const recordItem = { fontSize: 13, padding: "6px 0", borderBottom: "1px dashed #f1f5f9" };

export default function AttendanceCard({ me }) {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRecs();
    // eslint-disable-next-line
  }, []);

  async function fetchRecs() {
    try {
      const r = await API.get("/attendance/me");
      setRecords(r.data.recs || []);
    } catch (e) {
      console.error(e);
    }
  }

  async function punch(type) {
    setLoading(true);
    let loc = null;
    if (navigator.geolocation) {
      try {
        const pos = await new Promise((res, rej) =>
          navigator.geolocation.getCurrentPosition(res, rej, { enableHighAccuracy: true })
        );
        loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      } catch (e) {}
    }
    try {
      await API.post("/attendance/punch", { type, location: loc });
      await fetchRecs();
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }

  return (
    <div style={card}>
      <h4 style={{ marginTop: 0 }}>Attendance</h4>
      <div style={{ display: "flex", gap: 8 }}>
        <button style={btnPrimary} onClick={() => punch("IN")} disabled={loading}>
          Punch IN
        </button>
        <button style={btnAccent} onClick={() => punch("OUT")} disabled={loading}>
          Punch OUT
        </button>
      </div>
      <div style={{ marginTop: 10 }}>
        {records.length === 0 ? (
          <div style={{ color: "#6b7280" }}>No records yet</div>
        ) : (
          <ul style={{ paddingLeft: 0 }}>
            {records.map((r) => (
              <li key={r._id} style={recordItem}>
                {new Date(r.at).toLocaleString()} — <b>{r.type}</b>
                {r.location ? ` @ ${r.location.lat.toFixed(3)},${r.location.lng.toFixed(3)}` : ""}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}