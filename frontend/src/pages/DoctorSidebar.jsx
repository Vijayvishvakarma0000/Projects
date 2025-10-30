


import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUserMd, FaSignOutAlt, FaBookMedical, FaPills } from "react-icons/fa";
import logoImage from "../assets/logo.png"; // Ensure the path is correct

const DoctorSidebar = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.layout}>
      <div style={styles.sidebar}>
        <div style={styles.logoSection}>
          <img
            src={logoImage}
            alt="Hospital Logo"
            style={styles.logo}
          />
        </div>

        <div style={styles.profileCard}>
          <div style={styles.imageWrapper}>
            <img
              src="https://randomuser.me/api/portraits/men/44.jpg"
              alt="Doctor"
              style={styles.profileImage}
            />
          </div>
          <h3 style={styles.profileName}>Dr. John Doe</h3>
          <p style={styles.profileDetail}>doctor@hospital.com</p>
          <p style={styles.profileSub}>MBBS, MD • Cardiology</p>
        </div>

        <div style={styles.bottomMenu}>
          <button
            style={styles.navButton}
            onClick={() => navigate("/doctor/profile")}
          >
            <FaUserMd style={styles.icon} /> Profile
          </button>
          {/* <button
            style={styles.navButton}
            onClick={() => navigate("/library")}
          >
            <FaBookMedical style={styles.icon} /> Library
          </button>
          <button
            style={styles.navButton}
            onClick={() => navigate("/drugs-library")}
          >
            <FaPills style={styles.icon} /> Drugs Library
          </button> */}
          <button
            style={{ ...styles.navButton, ...styles.logout }}
            onClick={() => navigate("/logout")}
          >
            <FaSignOutAlt style={styles.icon} /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  layout: {
    display: "flex",
    minHeight: "100vh",
  },
  sidebar: {
    width: "210px",
    background: "linear-gradient(135deg, #186476, #3fa3b9)",
    padding: "1.5rem",
    color: "white",
    boxShadow: "2px 0 20px rgba(0, 0, 0, 0.15)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    position: "fixed",
    top: 0,
    left: 0,
    bottom: 0,
  },
  logoSection: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: "0.75rem",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    marginBottom: "1.5rem",
  },
  logo: {
    width: "150px",
    height: "50px",
    objectFit: "contain",
  },
  profileCard: {
    textAlign: "center",
    marginBottom: "1.5rem",
  },
  imageWrapper: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    border: "3px solid #ffffff",
    padding: "3px",
    background: "#bbdefb",
    margin: "0 auto 0.75rem auto",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    objectFit: "cover",
  },
  profileName: {
    fontSize: "1.25rem",
    fontWeight: "600",
    marginBottom: "0.5rem",
  },
  profileDetail: {
    fontSize: "0.9rem",
    opacity: 0.95,
    marginBottom: "0.25rem",
  },
  profileSub: {
    fontSize: "0.85rem",
    opacity: 0.85,
    fontStyle: "italic",
  },
  bottomMenu: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    marginBottom: "1rem",
  },
  navButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "0.5rem",
    background: "#ffffff",
    color: "#186476",
    fontWeight: "600",
    fontSize: "0.9rem",
    padding: "0.75rem 1rem",
    borderRadius: "8px",
    cursor: "pointer",
    border: "none",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease",
  },
  logout: {
    background: "#3fa3b9",
    color: "white",
  },
  icon: {
    fontSize: "1rem",
  },
};

// Add keyframes for animation
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  button:hover:not(:disabled) { transform: translateY(-2px); background-color: #3fa3b9; color: #ffffff; }
  button:disabled { opacity: 0.6; cursor: not-allowed; }
`;
document.head.appendChild(styleSheet);

export default DoctorSidebar;
