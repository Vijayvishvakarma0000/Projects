import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user"); 
    alert("Logged out successfully!");
    navigate("/login");
  };

  return (
    <div className="form-container">
      <h2>Welcome, {user?.name}</h2>
      <p>Email: {user?.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;
