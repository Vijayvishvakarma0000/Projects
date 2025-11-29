import React from "react";
const card = { background: "#fff", padding: 14, borderRadius: 10, boxShadow: "0 6px 18px rgba(15,23,42,0.04)" };

export default function LeavesCard({ me }) {
  const leaves = ["Casual Leave (CL)", "Sick Leave (SL)", "Birthday Leave"];
  return (
    <div style={card}>
      <h4 style={{ marginTop: 0 }}>Leaves</h4>
      <ul>
        {leaves.map((l) => (
          <li key={l} style={{ padding: "6px 0" }}>
            {l}
          </li>
        ))}
      </ul>
    </div>
  );
}