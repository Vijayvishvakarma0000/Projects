import React, { useEffect, useState } from "react";
import API from "../services/api";

const card = { background: "#fff", padding: 14, borderRadius: 10, boxShadow: "0 6px 18px rgba(15,23,42,0.04)" };

export default function AnnouncementsCard() {
  const [anns, setAnns] = useState([]);
  useEffect(() => {
    load();
  }, []);
  async function load() {
    try {
      const r = await API.get("/announcements");
      setAnns(r.data.anns || []);
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <div style={card}>
      <h4 style={{ marginTop: 0 }}>Announcements</h4>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {anns.map((a) => (
          <li key={a._id} style={{ padding: "8px 0", borderBottom: "1px dashed #f3f4f6" }}>
            <div style={{ fontWeight: 600 }}>{a.title}</div>
            <div style={{ color: "#6b7280", fontSize: 13 }}>{a.body}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}