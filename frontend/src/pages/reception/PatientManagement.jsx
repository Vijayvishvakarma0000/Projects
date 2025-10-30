// src/components/PatientManagement.js
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppointmentForm from "./AppointmentForm";
import {
  fetchPatients,
  uploadReport,
} from "../../redux/Slices/receptionSlice";

const PatientManagement = ({
  setShowPatientForm,
  clinicIdProp,
  setActiveTab,
  setNewBill,
}) => {
  const dispatch = useDispatch();

  // --- Redux State ---
  const {
    patients = [],
    loading: patientsLoading,
    error: patientsError,
  } = useSelector((state) => state.reception);

  // --- Local UI State ---
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const fileInputRef = useRef(null);
  const [selectedPatientForUpload, setSelectedPatientForUpload] = useState(null);
  const [uploadingId, setUploadingId] = useState(null);

  // --- Fetch Patients on clinicId change ---
  useEffect(() => {
    if (clinicIdProp) {
      console.log("PatientManagement: Fetching patients for clinic:", clinicIdProp);
      dispatch(fetchPatients(clinicIdProp));
    }
  }, [clinicIdProp, dispatch]);

  // --- Handlers ---
  const handleEdit = (patient) => {
    console.log("Editing patient:", patient);
    // You can pass patient to AddPatientForm via parent or context
    // For now, we'll assume parent handles it
    setShowPatientForm(true);
    // You might want to pass patient data to parent
    // Or use a global edit state
  };

  const handleBookAppointment = (patient) => {
    setSelectedPatient(patient);
    setShowAppointmentForm(true);
  };

  const handleNewBill = (patient) => {
    console.log("New bill for patient:", patient);
    setNewBill((prev) => ({
      ...prev,
      patientId: patient._id,
      patientName: patient.name,
    }));
    setActiveTab("newBill");
  };

  // --- Upload Report ---
  const handleUploadClick = (patient) => {
    setSelectedPatientForUpload(patient);
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    const patient = selectedPatientForUpload;

    if (!patient || !file) {
      e.target.value = null;
      return;
    }

    try {
      setUploadingId(patient._id);
      await dispatch(uploadReport({ patientId: patient._id, file })).unwrap();
      alert("Report uploaded successfully!");
      // Refresh patients to show updated reports
      dispatch(fetchPatients(clinicIdProp));
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed: " + (err.message || err));
    } finally {
      setUploadingId(null);
      setSelectedPatientForUpload(null);
      e.target.value = null;
    }
  };

  const handleViewReports = (reports) => {
    if (!reports || reports.length === 0) return;
    const url = reports[0].url || reports[0].fileUrl;
    if (url) {
      window.open(url, "_blank");
    } else {
      alert("No report URL found");
    }
  };

  // --- Refresh Button ---
  const handleRefresh = () => {
    if (clinicIdProp) {
      dispatch(fetchPatients(clinicIdProp));
    }
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>Patient Management</h2>

      {/* Action Buttons */}
      <div style={styles.actionBar}>
        <button style={styles.addBtn} onClick={() => setShowPatientForm(true)}>
          + Add New Patient
        </button>
        <button style={styles.refreshBtn} onClick={handleRefresh}>
          Refresh
        </button>
        {patientsLoading && <span style={styles.loading}>Loading patients...</span>}
        {patientsError && <span style={styles.error}>{patientsError}</span>}
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,application/pdf"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {/* Patients Table */}
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Token</th>
              <th style={styles.th}>UHID</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Age</th>
              <th style={styles.th}>Gender</th>
              <th style={styles.th}>Phone</th>
              <th style={styles.th}>Address</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Reports</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.length === 0 && !patientsLoading ? (
              <tr>
                <td colSpan="10" style={{ ...styles.td, textAlign: "center", color: "#666" }}>
                  No patients found
                </td>
              </tr>
            ) : (
              patients.map((p) => (
                <tr key={p._id}>
                  <td style={styles.td}>{p.tokenNumber || "—"}</td>
                  <td style={styles.td}>{p.uhid || "—"}</td>
                  <td style={styles.td}>{p.name}</td>
                  <td style={styles.td}>{p.age}</td>
                  <td style={styles.td}>{p.gender}</td>
                  <td style={styles.td}>{p.phone || p.mobile || "—"}</td>
                  <td style={styles.td}>{p.address || "—"}</td>
                  <td style={styles.td}>{p.status || "N/A"}</td>
                  <td style={styles.td}>
                    {Array.isArray(p.reports) && p.reports.length > 0 ? (
                      <button
                        style={styles.viewBtn}
                        onClick={() => handleViewReports(p.reports)}
                      >
                        View ({p.reports.length})
                      </button>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td style={styles.td}>
                    <div style={styles.actionGroup}>
                      <button
                        style={styles.editBtn}
                        onClick={() => handleEdit(p)}
                        title="Edit Patient"
                      >
                        Edit
                      </button>
                      <button
                        style={styles.bookBtn}
                        onClick={() => handleBookAppointment(p)}
                        title="Book Appointment"
                      >
                        Book
                      </button>
                      <button
                        style={styles.billBtn}
                        onClick={() => handleNewBill(p)}
                        title="New Bill"
                      >
                        Bill
                      </button>
                      <button
                        style={{
                          ...styles.uploadBtn,
                          background: uploadingId === p._id ? "#6c757d" : "#20c997",
                        }}
                        onClick={() => handleUploadClick(p)}
                        disabled={uploadingId === p._id}
                        title="Upload Report"
                      >
                        {uploadingId === p._id ? "Uploading..." : "Upload"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Appointment Form Modal */}
      {showAppointmentForm && (
        <AppointmentForm
          initialPatient={selectedPatient}
          onClose={() => {
            setShowAppointmentForm(false);
            setSelectedPatient(null);
          }}
          defaultClinicId={clinicIdProp}
        />
      )}
    </div>
  );
};

// --- Styles ---
const styles = {
  card: {
    background: "#fff",
    padding: 20,
    borderRadius: 12,
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    marginBottom: 20,
  },
  title: {
    color: "#2c3e50",
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 16,
    textAlign: "center",
  },
  actionBar: {
    display: "flex",
    gap: 10,
    alignItems: "center",
    marginBottom: 16,
    flexWrap: "wrap",
  },
  addBtn: {
    background: "#28a745",
    color: "#fff",
    padding: "10px 16px",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontWeight: "600",
    fontSize: 14,
  },
  refreshBtn: {
    background: "#007bff",
    color: "#fff",
    padding: "10px 16px",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontWeight: "600",
    fontSize: 14,
  },
  loading: {
    color: "#186476",
    fontStyle: "italic",
  },
  error: {
    color: "#dc3545",
    fontWeight: "500",
  },
  tableContainer: {
    overflowX: "auto",
    borderRadius: 8,
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: 14,
  },
  th: {
    background: "#f8f9fa",
    border: "1px solid #dee2e6",
    padding: "10px 8px",
    textAlign: "left",
    fontWeight: "600",
    color: "#495057",
    fontSize: 13,
  },
  td: {
    border: "1px solid #dee2e6",
    padding: "8px",
    verticalAlign: "top",
  },
  actionGroup: {
    display: "flex",
    gap: 6,
    flexWrap: "wrap",
  },
  editBtn: {
    background: "#007bff",
    color: "#fff",
    padding: "5px 8px",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
    fontSize: 12,
    minWidth: 44,
  },
  bookBtn: {
    background: "#17a2b8",
    color: "#fff",
    padding: "5px 8px",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
    fontSize: 12,
    minWidth: 44,
  },
  billBtn: {
    background: "#ffc107",
    color: "#212529",
    padding: "5px 8px",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
    fontSize: 12,
    minWidth: 44,
  },
  uploadBtn: {
    background: "#20c997",
    color: "#fff",
    padding: "5px 8px",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
    fontSize: 12,
    minWidth: 44,
  },
  viewBtn: {
    background: "#6f42c1",
    color: "#fff",
    padding: "4px 8px",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
    fontSize: 12,
  },
};

export default PatientManagement;