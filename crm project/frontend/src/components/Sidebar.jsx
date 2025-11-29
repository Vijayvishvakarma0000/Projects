import React from "react";

const sidebar = {
  gridArea: "sidebar",
  padding: 18,
  borderRight: "1px solid #e6e9ef",
  background: "#fff",
};

const navUl = { listStyle: "none", padding: 0, margin: 0 };
const navLi = { padding: "10px 6px", borderRadius: 6, cursor: "pointer" };

export default function Sidebar() {
  return (
    <aside style={sidebar}>
      <nav>
        <ul style={navUl}>
          <li style={navLi}>Dashboard</li>
          <li style={navLi}>Attendance</li>
          <li style={navLi}>Employees</li>
          <li style={navLi}>Leaves</li>
          <li style={navLi}>Announcements</li>
          <li style={navLi}>Settings</li>
        </ul>
      </nav>
    </aside>
  );
}