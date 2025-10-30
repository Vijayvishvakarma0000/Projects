import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  FaUserPlus,
  FaSearch,
  FaTimes,
  FaSync,
  FaUserCircle,
} from "react-icons/fa";
import DoctorSidebar from "./DoctorSidebar";
import { registerPatient, fetchPatients } from "../redux/Slices/patientsSlice";

const PatientsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: patients, loading, error } = useSelector((state) => state.patients);

  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPatient, setNewPatient] = useState({
    clinicId: "",
    name: "",
    gender: "",
    age: "",
    phone: "",
    address: "",
    category: "general",
  });
  const [notification, setNotification] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toastTimeout = useRef(null);

  // Set clinicId from localStorage on mount
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const clinicId = user.clinicId;
    if (clinicId) {
      setNewPatient((prev) => ({ ...prev, clinicId }));
      console.log("Clinic ID set:", clinicId);
    } else {
      setNotification({
        message: "No clinic selected. Redirecting to clinic selection.",
        type: "error",
      });
      setTimeout(() => navigate("/clinic-management"), 2000);
    }
  }, [navigate]);

  // Fetch patients on mount
  useEffect(() => {
    dispatch(fetchPatients());
  }, [dispatch]);

  // Handle error notifications
  useEffect(() => {
    if (error) {
      setNotification({ message: error, type: "error" });
      toastTimeout.current = setTimeout(() => {
        dispatch(clearPatientError());
        setNotification(null);
      }, 3000);
      return () => clearTimeout(toastTimeout.current);
    }
  }, [error, dispatch]);

  const showNotification = (message, type) => {
    setNotification({ message, type });
    if (toastTimeout.current) clearTimeout(toastTimeout.current);
    toastTimeout.current = setTimeout(() => setNotification(null), 3000);
  };

  const filteredPatients = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.phone.includes(searchTerm)
  );

  const handleAddPatient = async () => {
    console.log("handleAddPatient Called: Form values:", newPatient);
    if (!newPatient.clinicId) {
      console.log("Validation Failed: Missing clinicId");
      setNotification({
        message: "No clinic selected. Redirecting to clinic selection.",
        type: "error",
      });
      setTimeout(() => navigate("/clinic-management"), 2000);
      return;
    }
    if (!newPatient.name || !newPatient.age || !newPatient.phone) {
      console.log("Validation Failed: Missing required fields");
      showNotification("Name, age, and phone are required", "error");
      return;
    }
    setIsLoading(true);
    console.log("Validation Passed: Dispatching registerPatient");

    const patientData = {
      clinicId: newPatient.clinicId,
      name: newPatient.name,
      gender: newPatient.gender,
      age: parseInt(newPatient.age),
      phone: newPatient.phone,
      address: newPatient.address,
      category: newPatient.category,
    };
    console.log("Dispatching with patientData:", patientData);

    try {
      const result = await dispatch(registerPatient(patientData)).unwrap();
      console.log("Dispatch Success: Result", result);
      setNewPatient({
        clinicId: newPatient.clinicId, // Retain clinicId
        name: "",
        gender: "",
        age: "",
        phone: "",
        address: "",
        category: "general",
      });
      setShowAddForm(false);
      const token = result.token || "N/A";
      showNotification(
        `Patient registered with UHID: ${
          result.patient?._id || result._id || "N/A"
        }, Token: ${token}`,
        "success"
      );
    } catch (err) {
      console.error("Dispatch Error:", err);
      showNotification(err || "Failed to add patient", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    showNotification("Filters reset", "success");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const styles = {
    layout: {
      display: "flex",
      minHeight: "100vh",
      overflow: "hidden",
    },
    container: {
      padding: "20px",
      fontFamily: "'Segoe UI', sans-serif",
      background: "linear-gradient(135deg, #f4f9ff 0%, #e8f4f8 100%)",
      minHeight: "100vh",
      flex: 1,
      transition: "margin-left 0.3s ease",
      marginLeft: isSidebarOpen ? "250px" : "0",
    },
    toggleButton: {
      position: "fixed",
      top: "20px",
      right: "20px",
      background: "#186476",
      color: "white",
      border: "none",
      borderRadius: "8px",
      padding: "10px",
      cursor: "pointer",
      zIndex: 1000,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      fontSize: "28px",
      fontWeight: "bold",
      color: "#186476",
      textAlign: "center",
      marginBottom: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
    },
    searchGroup: {
      display: "flex",
      justifyContent: "center",
      gap: "10px",
      marginBottom: "20px",
      flexWrap: "wrap",
      background: "#fff",
      padding: "1rem",
      borderRadius: "1rem",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    },
    input: {
      width: "250px",
      padding: "10px 14px 10px 40px",
      borderRadius: "10px",
      border: "1px solid #d1d5db",
      fontSize: "14px",
      transition: "all 0.3s",
    },
    searchIcon: {
      position: "absolute",
      left: "12px",
      top: "50%",
      transform: "translateY(-50%)",
      color: "#6b7280",
      fontSize: "1rem",
    },
    resetBtn: {
      background: "#6c757d",
      color: "#fff",
      borderRadius: "8px",
      padding: "8px 14px",
      border: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "6px",
    },
    addBtn: {
      background: "#186476",
      color: "#fff",
      borderRadius: "8px",
      padding: "8px 14px",
      border: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "6px",
    },
    modal: {
      position: "fixed",
      top: 0,
      left: isSidebarOpen ? "250px" : "0",
      width: isSidebarOpen ? "calc(100% - 250px)" : "100%",
      height: "100%",
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    },
    modalContent: {
      background: "#fff",
      padding: "20px",
      borderRadius: "10px",
      maxWidth: "500px",
      width: "90%",
      boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
    },
    formSection: {
      marginBottom: "15px",
    },
    formSectionHeader: {
      fontSize: "16px",
      fontWeight: "600",
      color: "#186476",
      marginBottom: "10px",
    },
    editInput: {
      width: "100%",
      padding: "8px",
      borderRadius: "6px",
      border: "1px solid #d1d5db",
      fontSize: "14px",
      marginBottom: "10px",
    },
    modalActions: {
      display: "flex",
      gap: "10px",
      justifyContent: "flex-end",
    },
    saveBtn: {
      background: "#16a34a",
      color: "#fff",
      borderRadius: "8px",
      padding: "8px 14px",
      border: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "6px",
    },
    cancelBtn: {
      background: "#dc2626",
      color: "#fff",
      borderRadius: "8px",
      padding: "8px 14px",
      border: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "6px",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
      gap: "15px",
    },
    patientCard: {
      background: "#fff",
      padding: "15px",
      borderRadius: "10px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      cursor: "pointer",
      textAlign: "center",
    },
    patientName: {
      fontSize: "16px",
      fontWeight: "bold",
      margin: "10px 0 5px",
    },
    patientInfo: {
      fontSize: "13px",
      color: "#4b5563",
      margin: "2px 0",
    },
    notification: {
      position: "fixed",
      top: "20px",
      right: "20px",
      padding: "10px 20px",
      borderRadius: "8px",
      color: "#fff",
      zIndex: 2000,
      background: "#16a34a",
    },
    loading: {
      textAlign: "center",
      fontSize: "1rem",
      color: "#6b7280",
      padding: "2rem",
    },
  };

  return (
    <div style={styles.layout}>
      {isSidebarOpen && <DoctorSidebar />}
      <div style={styles.container}>
        <button style={styles.toggleButton} onClick={toggleSidebar}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="2"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <h1 style={styles.title}>
          <FaUserCircle /> Patient Dashboard
        </h1>

        {/* Search Bar */}
        <div style={styles.searchGroup}>
          <FaSearch style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search by name or phone..."
            style={styles.input}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search patients"
          />
          <button
            style={styles.resetBtn}
            onClick={handleResetFilters}
            aria-label="Reset search"
          >
            <FaSync /> Reset
          </button>
          <button
            style={styles.addBtn}
            onClick={() => setShowAddForm(true)}
            aria-label="Add new patient"
          >
            <FaUserPlus /> Add Patient
          </button>
        </div>

        {/* Add Patient Form */}
        {showAddForm && (
          <div style={styles.modal}>
            <div style={styles.modalContent}>
              <h2 style={styles.formSectionHeader}>Add New Patient</h2>
              <div style={styles.formSection}>
                <input
                  style={styles.editInput}
                  value={newPatient.name}
                  onChange={(e) =>
                    setNewPatient({ ...newPatient, name: e.target.value })
                  }
                  placeholder="Name *"
                  aria-label="Patient name"
                />
                <input
                  style={styles.editInput}
                  type="number"
                  value={newPatient.age}
                  onChange={(e) =>
                    setNewPatient({ ...newPatient, age: e.target.value })
                  }
                  placeholder="Age *"
                  aria-label="Patient age"
                />
                <select
                  style={styles.editInput}
                  value={newPatient.gender}
                  onChange={(e) =>
                    setNewPatient({ ...newPatient, gender: e.target.value })
                  }
                  aria-label="Patient gender"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <input
                  style={styles.editInput}
                  value={newPatient.phone}
                  onChange={(e) =>
                    setNewPatient({ ...newPatient, phone: e.target.value })
                  }
                  placeholder="Phone *"
                  aria-label="Patient phone"
                />
                <input
                  style={styles.editInput}
                  value={newPatient.address}
                  onChange={(e) =>
                    setNewPatient({ ...newPatient, address: e.target.value })
                  }
                  placeholder="Address"
                  aria-label="Patient address"
                />
                <select
                  style={styles.editInput}
                  value={newPatient.category}
                  onChange={(e) =>
                    setNewPatient({ ...newPatient, category: e.target.value })
                  }
                  aria-label="Patient category"
                >
                  <option value="general">General</option>
                  <option value="special">Special</option>
                </select>
              </div>
              <div style={styles.modalActions}>
                <button
                  style={styles.saveBtn}
                  onClick={handleAddPatient}
                  disabled={isLoading || loading}
                  aria-label="Add new patient"
                >
                  <FaUserPlus />{" "}
                  {isLoading || loading ? "Adding..." : "Add Patient"}
                </button>
                <button
                  style={styles.cancelBtn}
                  onClick={() => setShowAddForm(false)}
                  aria-label="Cancel adding patient"
                >
                  <FaTimes /> Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Patients Grid */}
        {isLoading || loading ? (
          <div style={styles.loading}>Loading...</div>
        ) : (
          <div style={styles.grid}>
            {filteredPatients.map((patient, index) => (
              <div
                key={patient.id || patient._id || index}
                style={styles.patientCard}
              >
                <FaUserCircle size={40} style={{ color: "#186476" }} />
                <h3 style={styles.patientName}>{patient.name}</h3>
                <p style={styles.patientInfo}>
                  UHID: {patient.id || patient._id || "N/A"}
                </p>
                <p style={styles.patientInfo}>
                  Token: {patient.token || "N/A"}
                </p>
                <p style={styles.patientInfo}>Age: {patient.age}</p>
                <p style={styles.patientInfo}>Gender: {patient.gender}</p>
                <p style={styles.patientInfo}>Phone: {patient.phone}</p>
                <p style={styles.patientInfo}>
                  Address: {patient.address || "N/A"}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Notification Toast */}
        {notification && (
          <div
            style={{
              ...styles.notification,
              background:
                notification.type === "success" ? "#16a34a" : "#dc2626",
            }}
          >
            {notification.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientsPage;