import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  logout,
  setToken,
  setUser,
  fetchUserProfile,
} from "../redux/Slices/authSlice";
import {
  fetchClinics,
  addClinic,
  clearMessage,
  setCurrentClinic,
} from "../redux/Slices/clinicSlice";

const ClinicManagementPage = () => {
  const [newClinic, setNewClinic] = useState({
    clinicName: "",
    address: "",
    contactNumber: "",
    email: "",
    whatsappLink: "",
    code: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const {
    clinics = [],
    loading,
    error,
    message,
  } = useSelector((state) => state.clinic);
  const { accessToken, user } = useSelector((state) => state.auth); // Changed from token to accessToken

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Wait for token and user before fetching clinics
  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("token");
    if (accessToken && user) {
      setIsReady(true);
      dispatch(fetchClinics());
    } else if (tokenFromStorage && !user) {
      // Hydrate token and fetch user profile
      dispatch(setToken(tokenFromStorage));
      dispatch(fetchUserProfile()).then((result) => {
        if (fetchUserProfile.fulfilled.match(result)) {
          setIsReady(true);
          dispatch(fetchClinics());
        } else {
          console.error("Failed to fetch user profile:", result.payload);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          dispatch(logout());
          navigate("/signin");
        }
      });
    } else {
      console.log("No token available, redirecting to signin");
      navigate("/signin");
    }
  }, [accessToken, user, dispatch, navigate]);

  // Auto-generate code based on clinic name
  useEffect(() => {
    if (newClinic.clinicName) {
      const code = newClinic.clinicName
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase())
        .join("")
        .slice(0, 2);
      setNewClinic((prev) => ({ ...prev, code }));
    } else {
      setNewClinic((prev) => ({ ...prev, code: "" }));
    }
  }, [newClinic.clinicName]);

  // Handle Logout
  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      console.log("Logout successful, redirecting to signin");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/signin");
    } catch (error) {
      console.error("Logout failed:", error);
      // Clear localStorage and redirect even if API fails
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/signin");
    }
  };

  const handleAddClinic = async (e) => {
    e.preventDefault();

    try {
      // Validate inputs
      if (!newClinic.clinicName) return alert("Clinic name is required");
      if (!newClinic.address) return alert("Address is required");
      if (!/^[0-9]{10}$/.test(newClinic.contactNumber))
        return alert("Valid 10-digit contact number required");
      if (!/\S+@\S+\.\S+/.test(newClinic.email))
        return alert("Valid email required");

      const tokenFromStore = accessToken || localStorage.getItem("token");
      let currentUser =
        user ||
        (() => {
          try {
            return JSON.parse(localStorage.getItem("user") || "null");
          } catch {
            return null;
          }
        })();

      if (!tokenFromStore) {
        alert("Please login/register to add a clinic.");
        navigate("/signin");
        return;
      }

      // Hydrate Redux token if missing
      if (!accessToken && tokenFromStore) {
        dispatch(setToken(tokenFromStore));
      }

      // If user missing, fetch profile
      if (!currentUser) {
        try {
          const profileResponse = await dispatch(fetchUserProfile()).unwrap();
          currentUser = profileResponse.user || profileResponse;
          if (currentUser) {
            dispatch(setUser(currentUser));
            localStorage.setItem("user", JSON.stringify(currentUser));
          } else {
            throw new Error("No user data in profile response");
          }
        } catch (err) {
          console.error("Failed to fetch profile before addClinic:", err);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          dispatch(logout());
          alert("Session invalid. Please login again.");
          navigate("/signin");
          return;
        }
      }

      // Build JSON payload
      const clinicData = {
        clinicName: newClinic.clinicName,
        address: newClinic.address,
        contactNumber: newClinic.contactNumber,
        email: newClinic.email,
        whatsappLink: newClinic.whatsappLink,
        code: newClinic.code,
        ownerId: currentUser.id || currentUser._id,
        consultingHours: newClinic.consultingHours,
      };

      // Dispatch addClinic
      await dispatch(addClinic(clinicData)).unwrap();
      setNewClinic({
        clinicName: "",
        address: "",
        contactNumber: "",
        email: "",
        whatsappLink: "",
        code: "",
        consultingHours: [{ day: "", hours: "" }],
      });
      setShowForm(false);
      dispatch(clearMessage());
      dispatch(fetchClinics());
    } catch (err) {
      console.error("Add clinic failed:", err);
      alert(err.message || "Failed to add clinic");
    }
  };

  const handleCancel = () => {
    setNewClinic({
      clinicName: "",
      address: "",
      contactNumber: "",
      email: "",
      whatsappLink: "",
      code: "",
    });
    setShowForm(false);
    dispatch(clearMessage());
  };

  const handleShowForm = () => {
    setShowForm(true);
    dispatch(clearMessage());
  };

  const handleSelectClinic = (clinic) => {
    const clinicId = clinic.id || clinic._id;
    // Update localStorage
    localStorage.setItem("selectedClinicId", clinicId);
    localStorage.setItem("selectedClinicId", clinicId);
    dispatch(setCurrentClinic(clinic));
    navigate(`/doctor-dashboard?clinicId=${clinicId}`);
  };

  return (
    <div className="clinic-page">
      {/* Logout Button */}
      <div
        style={{ display: "flex", justifyContent: "flex-end", padding: "10px" }}
      >
        <button
          onClick={handleLogout}
          style={{
            background: "red",
            color: "white",
            border: "none",
            padding: "8px 14px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
      <style>{`
        .clinic-page { font-family: Arial, sans-serif; min-height: 100vh; background: #f5f7fa; padding: 2rem; }
        .container { max-width: 1200px; margin: 0 auto; }
        .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
        h1 { font-size: 2.5rem; color: #1a202c; }
        .add-clinic-toggle { padding: 0.75rem 1.5rem; background: #5ac5d8; color: #fff; border: none; border-radius: 0.5rem; cursor: pointer; }
        .add-clinic-toggle:hover { background: #434190; }
        .add-clinic-form { max-width: 28rem; margin: 0 auto 3rem; background: #fff; border-radius: 1rem; padding: 2rem; display: ${
          showForm ? "block" : "none"
        }; }
        .add-clinic-form input { width: 100%; padding: 0.75rem; margin-bottom: 1rem; border: 1px solid #e2e8f0; border-radius: 0.5rem; }
        .add-clinic-form input[disabled] { background-color: #e2e8f0; cursor: not-allowed; }
        .form-buttons { display: flex; gap: 1rem; }
        .clinics-list { display: grid; grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr)); gap: 1.5rem; }
        .clinic-card { background: #fff; border-radius: 1rem; padding: 1.5rem; border-left: 4px solid #5a67d8; transition: transform 0.3s; }
        .clinic-card:hover { transform: translateY(-5px); }
        .cancel-button { padding: 0.75rem 1.5rem; background: #6b7280; color: #fff; border: none; border-radius: 0.5rem; cursor: pointer; }
        .cancel-button:hover { background: #4b5563; }
        .spinner { margin-right: 0.5rem; animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
        .error-list { list-style: disc; padding-left: 20px; }
      `}</style>

      <div className="container">
        <div className="header">
          <h1>Clinic Management</h1>
          {!showForm && isReady && (
            <button className="add-clinic-toggle" onClick={handleShowForm}>
              Add New Clinic
            </button>
          )}
        </div>

        {message && (
          <p style={{ color: "green", textAlign: "center" }}>{message}</p>
        )}
        {error && (
          <div style={{ color: "red", textAlign: "center" }}>
            <p>Error: {error}</p>
            {typeof error === "string" && error.includes("Network error") && (
              <ul className="error-list">
                <li>Server may be down or unreachable.</li>
                <li>Check your internet connection.</li>
              </ul>
            )}
          </div>
        )}
        {loading && (
          <p style={{ color: "blue", textAlign: "center" }}>Loading...</p>
        )}

        {isReady && (
          <form className="add-clinic-form" onSubmit={handleAddClinic}>
            <h2>Add New Clinic</h2>
            <input
              type="text"
              placeholder="Clinic Name"
              value={newClinic.clinicName}
              onChange={(e) =>
                setNewClinic({ ...newClinic, clinicName: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Address"
              value={newClinic.address}
              onChange={(e) =>
                setNewClinic({ ...newClinic, address: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Contact Number"
              value={newClinic.contactNumber}
              onChange={(e) =>
                setNewClinic({ ...newClinic, contactNumber: e.target.value })
              }
            />
            <input
              type="email"
              placeholder="Email"
              value={newClinic.email}
              onChange={(e) =>
                setNewClinic({ ...newClinic, email: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="WhatsApp Link"
              value={newClinic.whatsappLink}
              onChange={(e) =>
                setNewClinic({ ...newClinic, whatsappLink: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Code (auto-generated)"
              value={newClinic.code}
              disabled
            />

            <div className="form-buttons">
              <button type="submit" disabled={loading}>
                {loading ? (
                  <span>
                    <i className="fas fa-spinner spinner"></i> Adding...
                  </span>
                ) : (
                  "Add Clinic"
                )}
              </button>
              <button
                type="button"
                className="cancel-button"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <div className="clinics-list">
          {clinics?.map((clinic) => (
            <div key={clinic.id || clinic._id} className="clinic-card">
              <h3>{clinic.name}</h3>
              <p>Address: {clinic.location}</p>
              <p>Contact: {clinic.contactNumber}</p>
              <p>Email: {clinic.email}</p>
              <p>
                WhatsApp:{" "}
                <a
                  href={clinic.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {clinic.whatsappLink}
                </a>
              </p>
              <p>Code: {clinic.code}</p>
              <button onClick={() => handleSelectClinic(clinic)}>
                Select Clinic
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClinicManagementPage;



