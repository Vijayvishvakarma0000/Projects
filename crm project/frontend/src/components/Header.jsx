// import React from "react";

// const headerStyle = {
//   gridArea: "header",
//   display: "flex",
//   justifyContent: "space-between",
//   alignItems: "center",
//   padding: "0 20px",
//   background: "#fff",
//   borderBottom: "1px solid #e6e9ef",
//   height: 64,
// };

// const brand = { fontWeight: 700 };
// const headerRight = { display: "flex", gap: 12, alignItems: "center" };
// const btnGhost = { background: "transparent", border: "none", cursor: "pointer", color: "#0f172a" };

// export default function Header({ user, onLogout }) {
//   return (
//     <header style={headerStyle}>
//       <div style={brand}>Acore CRM</div>
//       <div style={headerRight}>
//         <div>{user ? ${user.name} (${user.designation || "Employee"}) : "..."}</div>
//         <button style={btnGhost} onClick={onLogout}>
//           Logout
//         </button>
//       </div>
//     </header>
//   );
// }


import React from "react";

const headerStyle = {
  gridArea: "header",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 20px",
  background: "#fff",
  borderBottom: "1px solid #e6e9ef",
  height: 64,
};

const brand = { fontWeight: 700 };
const headerRight = { display: "flex", gap: 12, alignItems: "center" };
const btnGhost = { 
  background: "transparent", 
  border: "none", 
  cursor: "pointer", 
  color: "#0f172a" 
};

export default function Header({ user, onLogout }) {
  return (
    <header style={headerStyle}>
      <div style={brand}>Acore CRM</div>
      <div style={headerRight}>
        <div>
          {user ? `${user.name} (${user.designation || "Employee"})` : "..."}
          {/* ↑ Backticks use karein */}
        </div>
        <button style={btnGhost} onClick={onLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}