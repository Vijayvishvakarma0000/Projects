import React, { useEffect, useState } from "react";
import API from "../services/api";

const card = { background: "#fff", padding: 14, borderRadius: 10, boxShadow: "0 6px 18px rgba(15,23,42,0.04)" };

export default function EmployeesList() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    load();
  }, []);
  async function load() {
    try {
      const r = await API.get("/employees");
      setUsers(r.data.users || []);
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <div style={card}>
      <h4 style={{ marginTop: 0 }}>Employees</h4>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {users.map((u) => (
          <li key={u._id} style={{ padding: "8px 0", borderBottom: "1px solid #f1f5f9" }}>
            <div style={{ fontWeight: 600 }}>{u.name}</div>
            <div style={{ fontSize: 12, color: "#6b7280" }}>
              {u.designation || "—"} • Joined: {u.joinDate ? new Date(u.joinDate).toLocaleDateString() : "—"}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}