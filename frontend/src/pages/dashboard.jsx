
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBell, FaEnvelope, FaUserCircle, FaSearch } from "react-icons/fa";

const Dashboard = () => {
  const navigate = useNavigate();

  const styles = {
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "15px 30px",
      background: "#fff",
      position: "sticky",
      top: 0,
      zIndex: 1000,
      flexWrap: "wrap",
      gap: "10px",
    },
    logo: { fontSize: "22px", fontWeight: "bold", color: "#035b69ff" },
    subText: { fontSize: "12px", color: "#777" },
    searchBar: {
      flex: 1,
      maxWidth: "500px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#f4f6f8",
      borderRadius: "25px",
      padding: "8px 15px",
      margin: "0 20px",
    },
    searchInput: { border: "none", outline: "none", background: "transparent", flex: 1, fontSize: "14px", marginLeft: "10px" },
    icons: { display: "flex", alignItems: "center", gap: "20px", fontSize: "22px", cursor: "pointer", color: "#333" },
    mainContent: { padding: "20px" },
    grid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" },
    card: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "25px",
      borderRadius: "20px",
      color: "#fff",
      fontWeight: "600",
      fontSize: "16px",
      cursor: "pointer",
      minHeight: "120px",
      boxShadow: "0 6px 15px rgba(0,0,0,0.08)",
      transition: "all 0.3s ease",
      textAlign: "center",
    },
    icon: { fontSize: "36px", marginBottom: "12px", transition: "transform 0.3s ease" },
    myClinic: { background: "linear-gradient(135deg, #186476ff, #3fa3b9ff)" },
    doctorSuite: { background: "linear-gradient(135deg, #52a4a7ff, #1b7169ff)" },
    reception: { background: "linear-gradient(135deg, #1facc5a9, #07a5ada1)" },
    patients: { background: "linear-gradient(135deg, #347297ff, #24a18ab5)" },
    certificates: { background: "linear-gradient(135deg, #fceabb, #f8b500)", color: "#444" },
    accountBilling: { background: "linear-gradient(135deg, #4c9c8dff, #4b89a2ff)" },
    prescriptionLibrary: { background: "linear-gradient(135deg, #43cea2, #185a9d)" },
    analytics: { background: "linear-gradient(135deg, #2980b9, #6dd5fa)" },
  };

  const cards = [
    { title: "My Clinic", icon: "🏥", style: styles.myClinic, path: "/my-clinic" },
    { title: "Doctor Suite", icon: "🩺", style: styles.doctorSuite, path: "/doctor-suite" },
    { title: "Reception", icon: "👤", style: styles.reception, path: "/receptionist-dashboard" },
    { title: "Patients", icon: "👥", style: styles.patients, path: "/patients", wide: true },
    { title: "Certificates", icon: "📄", style: styles.certificates, path: "/certificates" },
    { title: "Account Billing", icon: "💳", style: styles.accountBilling, path: "/account-billing" },
    { title: "Prescription Library", icon: "💊", style: styles.prescriptionLibrary, path: "/library" },
    { title: "Analytics & Reports", icon: "📈", style: styles.analytics, path: "/analytics" },
  ];

  return (
    <>
      <style>{`
        @media (max-width: 1024px) {
          .grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .grid { grid-template-columns: repeat(2, 1fr) !important; }
          .searchBar { flex: 100% !important; order: 2; margin: 10px 0 !important; }
          .icons { order: 3; margin-left: auto; }
          .card { grid-column: span 1 !important; }
        }
        @media (max-width: 480px) {
          .grid { grid-template-columns: repeat(2, 1fr) !important; gap: 10px !important; }
          .card { padding: 15px !important; font-size: 14px !important; grid-column: span 1 !important; }
          .icon { font-size: 28px !important; }
        }
      `}</style>

      {/* Header */}
      <div style={styles.header}>
        <div>
          <div style={styles.logo}>MediScript</div>
          <div style={styles.subText}>Medical Software for Clinics</div>
        </div>

        <div className="searchBar" style={styles.searchBar}>
          <FaSearch style={{ color: "#666" }} />
          <input type="text" placeholder="Search Patient / Appointment / Prescription" style={styles.searchInput} />
        </div>

        <div className="icons" style={styles.icons}>
          <FaBell />
          <FaEnvelope />
          <FaUserCircle />
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        <div className="grid" style={styles.grid}>
          {cards.map((card) => (
            <div
              key={card.title}
              className="card"
              style={{ ...styles.card, ...card.style, gridColumn: card.wide ? "span 2" : "span 1" }}
              onClick={() => navigate(card.path)}
              onMouseEnter={(e) => {
                if (window.innerWidth > 768) {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.15)";
                  e.currentTarget.firstChild.style.transform = "scale(1.2)";
                }
              }}
              onMouseLeave={(e) => {
                if (window.innerWidth > 768) {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 6px 15px rgba(0,0,0,0.08)";
                  e.currentTarget.firstChild.style.transform = "scale(1)";
                }
              }}
            >
              <div style={styles.icon}>{card.icon}</div>
              {card.title}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
