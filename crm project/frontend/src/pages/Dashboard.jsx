
import React, { useEffect, useState } from "react";
import API from "../services/api";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import AttendanceCard from "../components/AttendanceCard";
import LeavesCard from "../components/LeavesCard";
import EmployeesList from "../components/EmployeesList";
import AnnouncementsCard from "../components/AnnouncementsCard";
import GitPushModal from "../components/GitPushModal";

const appGrid = {
  display: "grid",
  gridTemplateColumns: "220px 1fr",
  gridTemplateRows: "64px 1fr",
  gridTemplateAreas: `
    "sidebar header"
    "sidebar main"
  `,
  minHeight: "100vh",
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif"
};

const mainStyle = { 
  gridArea: "main", 
  padding: 20, 
  background: "#f4f6f8",
  overflow: "auto"
};

const grid2 = { 
  display: "grid", 
  gridTemplateColumns: "1fr 320px", 
  gap: 16, 
  marginBottom: 16 
};

const grid3 = { 
  display: "grid", 
  gridTemplateColumns: "1fr 320px", 
  gap: 16 
};

const gitButtonStyle = {
  padding: "8px 16px",
  borderRadius: 8,
  border: "none",
  backgroundColor: "#0366d6",
  color: "white",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "500",
  transition: "background-color 0.2s"
};

export default function Dashboard({ onLogout }) {
  const [me, setMe] = useState(null);
  const [showGit, setShowGit] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMe();
  }, []);

  async function fetchMe() {
    try {
      setLoading(true);
      const response = await API.get("/employees/me");
      setMe(response.data.user);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    try {
      if (me && me._id) {
        await API.post("/auth/logout", { userId: me._id });
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      onLogout();
    }
  }

  // Handle button hover effect
  const handleMouseEnter = (e) => {
    e.target.style.backgroundColor = "#0256c7";
  };

  const handleMouseLeave = (e) => {
    e.target.style.backgroundColor = "#0366d6";
  };

  return (
    <div style={appGrid}>
      <Header user={me} onLogout={logout} />
      <Sidebar />
      <main style={mainStyle}>
        {loading ? (
          <div style={{ 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center", 
            height: 200 
          }}>
            Loading...
          </div>
        ) : (
          <>
            <div style={grid2}>
              <AttendanceCard me={me} />
              <LeavesCard me={me} />
            </div>
            <div style={grid3}>
              <AnnouncementsCard />
              <EmployeesList />
            </div>
            <div style={{ marginTop: 20 }}>
              <button 
                style={gitButtonStyle}
                onClick={() => setShowGit(true)}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                Push Code to GitHub
              </button>
            </div>
          </>
        )}
      </main>
      {showGit && <GitPushModal onClose={() => setShowGit(false)} />}
    </div>
  );
}