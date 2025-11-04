import React, { useEffect, useRef, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppointmentForm from "./AppointmentForm";
import {
  fetchPatients,
  uploadReport,
  searchPatientByUHID,
  updatePatient,
} from "../../redux/Slices/receptionSlice";

const PatientManagement = ({
  setShowPatientForm,
  clinicIdProp,
  setActiveTab,
  setNewBill,
}) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  /* ------------------- Clinic ID ------------------- */
  const resolved =
    clinicIdProp ||
    localStorage.getItem("clinicId") ||
    localStorage.getItem("selectedClinicId") ||
    auth?.clinic?.id ||
    auth?.user?.clinicId ||
    auth?.user?.clinic?.id ||
    (Array.isArray(auth?.user?.clinics) && auth.user.clinics[0]?.id) ||
    "";
  const derivedClinicId = resolved ? String(resolved).trim() : "";

  /* ------------------- Redux State ------------------- */
  const {
    patients = [],
    loading: patientsLoading,
    error: patientsError,
    searchedPatient,
    searchLoading,
    searchError,
    loading: updateLoading,
  } = useSelector((state) => state.reception);

  /* ------------------- Local State ------------------- */
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const fileInputRef = useRef(null);
  const [selectedPatientForUpload, setSelectedPatientForUpload] =
    useState(null);
  const [uploadingId, setUploadingId] = useState(null);
  const [searchUhid, setSearchUhid] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Edit modal
  const [editModal, setEditModal] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    phone: "",
    address: "",
    gender: "",
    age: "",
    category: "",
  });

  /* ------------------- Effects ------------------- */
  useEffect(() => {
    if (derivedClinicId) dispatch(fetchPatients(derivedClinicId));
  }, [derivedClinicId, dispatch]);

  /* ------------------- UHID Suggestions ------------------- */
  const uhidSuggestions = useMemo(() => {
    if (!searchUhid.trim()) return [];
    const q = searchUhid.trim().toLowerCase();
    return patients
      .filter((p) => p.uhid?.toLowerCase().includes(q))
      .slice(0, 6)
      .map((p) => ({ uhid: p.uhid, name: p.name, _id: p._id }));
  }, [searchUhid, patients]);

  /* ------------------- Handlers ------------------- */
  const handleEdit = (patient) => {
    setEditingPatient(patient);
    setEditForm({
      name: patient.name || "",
      phone: patient.phone || patient.mobile || "",
      address: patient.address || "",
      gender: patient.gender || "",
      age: patient.age?.toString() || "",
      category: patient.category || "",
    });
    setEditModal(true);
  };

  const handleSaveEdit = async () => {
    if (!editForm.name.trim()) return alert("Name is required");
    try {
      await dispatch(
        updatePatient({
          uhid: editingPatient.uhid,
          updateData: {
            name: editForm.name.trim(),
            phone: editForm.phone.trim(),
            address: editForm.address.trim(),
            gender: editForm.gender,
            age: editForm.age ? Number(editForm.age) : undefined,
            category: editForm.category,
          },
          clinicId: derivedClinicId,
        })
      ).unwrap();
      alert("Patient updated successfully!");
      setEditModal(false);
      dispatch(fetchPatients(derivedClinicId));
    } catch (err) {
      alert("Update failed: " + (err.message || err));
    }
  };

  const handleBookAppointment = (patient) => {
    setSelectedPatient(patient);
    setShowAppointmentForm(true);
  };

  const handleNewBill = (patient) => {
    // 1. Fill the bill form (the same state you already use in ReceptionPage)
    setNewBill((prev) => ({
      ...prev,
      patientId: patient._id,
      patientName: patient.name,
      consultationFee: "", // keep empty – user will fill
      service: "",
      customService: "",
      serviceAmount: "",
      discount: "0",
    }));

    // 2. Switch to the New-Bill tab
    setActiveTab("newBill");
  };

  const handleUploadClick = (patient) => {
    setSelectedPatientForUpload(patient);
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    const patient = selectedPatientForUpload;
    if (!patient || !file) return;

    try {
      setUploadingId(patient._id);
      await dispatch(uploadReport({ patientId: patient._id, file })).unwrap();
      alert("Report uploaded!");
      dispatch(fetchPatients(derivedClinicId));
    } catch (err) {
      alert("Upload failed: " + (err.message || err));
    } finally {
      setUploadingId(null);
      setSelectedPatientForUpload(null);
      e.target.value = null;
    }
  };

  const handleViewReports = (reports) => {
    if (!reports?.length) return;
    const url = reports[0].url || reports[0].fileUrl;
    if (url) window.open(url, "_blank");
  };

  const handleRefresh = () => {
    if (derivedClinicId) dispatch(fetchPatients(derivedClinicId));
  };

  const handleSearch = () => {
    if (!searchUhid.trim()) return alert("Please enter UHID");
    dispatch(
      searchPatientByUHID({ uhid: searchUhid, clinicId: derivedClinicId })
    )
      .unwrap()
      .then(() => setIsSearchActive(true))
      .catch(() => setIsSearchActive(true));
    setShowSuggestions(false);
  };

  const handleClearSearch = () => {
    setSearchUhid("");
    setIsSearchActive(false);
    setShowSuggestions(false);
  };

  const selectSuggestion = (suggestion) => {
    setSearchUhid(suggestion.uhid);
    setShowSuggestions(false);
    dispatch(
      searchPatientByUHID({ uhid: suggestion.uhid, clinicId: derivedClinicId })
    )
      .unwrap()
      .then(() => setIsSearchActive(true));
  };

  const displayedPatients =
    isSearchActive && searchedPatient ? [searchedPatient] : patients;

  /* ------------------- JSX ------------------- */
  return (
    <div style={styles.card}>
      <h2 style={styles.title}>Patient Management</h2>

      {/* ---------- SEARCH ---------- */}
      <div style={styles.searchContainer}>
        <div style={styles.searchWrapper}>
          <input
            type="text"
            placeholder="Search by UHID (e.g. AS-2025-0001)"
            value={searchUhid}
            onChange={(e) => {
              setSearchUhid(e.target.value);
              setShowSuggestions(true);
              setIsSearchActive(false);
            }}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            onFocus={() => searchUhid && setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            style={styles.searchInput}
          />
          <button
            onClick={handleSearch}
            disabled={searchLoading}
            style={{
              ...styles.searchBtn,
              background: searchLoading ? "#6c757d" : "#186476",
            }}
          >
            {searchLoading ? "Searching..." : "Search"}
          </button>
          {isSearchActive && (
            <button onClick={handleClearSearch} style={styles.clearBtn}>
              Clear
            </button>
          )}
        </div>

        {showSuggestions && uhidSuggestions.length > 0 && (
          <div style={styles.suggestions}>
            {uhidSuggestions.map((s) => (
              <div
                key={s._id}
                style={styles.suggestionItem}
                onMouseDown={() => selectSuggestion(s)}
              >
                <strong>{s.uhid}</strong> — {s.name}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ---------- MESSAGES ---------- */}
      {searchError && <div style={styles.searchError}>{searchError}</div>}
      {isSearchActive && !searchedPatient && !searchLoading && (
        <div style={styles.searchNotFound}>
          No patient found with UHID: {searchUhid}
        </div>
      )}
      {isSearchActive && searchedPatient && (
        <div style={styles.searchSuccess}>
          Showing results for: <strong>{searchedPatient.uhid}</strong>
        </div>
      )}

      {/* ---------- ACTION BAR ---------- */}
      <div style={styles.actionBar}>
        <button style={styles.addBtn} onClick={() => setShowPatientForm(true)}>
          + Add New Patient
        </button>
        <button style={styles.refreshBtn} onClick={handleRefresh}>
          Refresh
        </button>
        {patientsLoading && <span style={styles.loading}>Loading...</span>}
        {patientsError && <span style={styles.error}>{patientsError}</span>}
      </div>

      {/* ---------- HIDDEN FILE INPUT ---------- */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,application/pdf"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {/* ---------- TABLE ---------- */}
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
              <th style={styles.th}>Medical History</th>
              <th style={styles.th}>Last Prescription</th>
              <th style={styles.th}>Facilities Used</th>
              <th style={styles.th}>Reports</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedPatients.length === 0 && !patientsLoading ? (
              <tr>
                <td
                  colSpan="13"
                  style={{ ...styles.td, textAlign: "center", color: "#666" }}
                >
                  {isSearchActive
                    ? "No patient found"
                    : "No patients in clinic"}
                </td>
              </tr>
            ) : (
              displayedPatients.map((p) => (
                <tr
                  key={p._id}
                  style={isSearchActive ? { background: "#e3f2fd" } : {}}
                >
                  <td style={styles.td}>{p.tokenNumber || "-"}</td>
                  <td style={styles.td}>{p.uhid || "-"}</td>
                  <td style={styles.td}>{p.name}</td>
                  <td style={styles.td}>{p.age}</td>
                  <td style={styles.td}>{p.gender}</td>
                  <td style={styles.td}>{p.phone || p.mobile || "-"}</td>
                  <td style={styles.td}>{p.address || "-"}</td>
                  <td style={styles.td}>{p.status || "N/A"}</td>
                  <td style={styles.td}>{p.medicalHistory || "-"}</td>
                  <td style={styles.td}>
                    {p.lastPrescription ? (
                      <div
                        style={{ maxWidth: 160, fontSize: 12, lineHeight: 1.3 }}
                      >
                        {p.lastPrescription}
                      </div>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td style={styles.td}>
                    {Array.isArray(p.facilitiesUsed) &&
                    p.facilitiesUsed.length > 0
                      ? p.facilitiesUsed.map((f) => f.name).join(", ")
                      : "-"}
                  </td>
                  <td style={styles.td}>
                    {Array.isArray(p.reports) && p.reports.length > 0 ? (
                      <button
                        style={styles.viewBtn}
                        onClick={() => handleViewReports(p.reports)}
                      >
                        View ({p.reports.length})
                      </button>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td style={styles.td}>
                    <div style={styles.actionGroup}>
                      <button
                        style={styles.editBtn}
                        onClick={() => handleEdit(p)}
                      >
                        Edit
                      </button>
                      <button
                        style={styles.bookBtn}
                        onClick={() => handleBookAppointment(p)}
                      >
                        Book
                      </button>
                      <button
                        style={styles.billBtn}
                        onClick={() => handleNewBill(p)}
                      >
                        Bill
                      </button>
                      <button
                        style={{
                          ...styles.uploadBtn,
                          background:
                            uploadingId === p._id ? "#6c757d" : "#20c997",
                        }}
                        onClick={() => handleUploadClick(p)}
                        disabled={uploadingId === p._id}
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

      {/* ---------- APPOINTMENT FORM ---------- */}
      {showAppointmentForm && (
        <AppointmentForm
          initialPatient={selectedPatient}
          onClose={() => {
            setShowAppointmentForm(false);
            setSelectedPatient(null);
          }}
          defaultClinicId={derivedClinicId}
          onSuccess={() => dispatch(fetchPatients(derivedClinicId))}
        />
      )}

      {/* ---------- EDIT MODAL (FULLY RESPONSIVE) ---------- */}
      {editModal && editingPatient && (
        <div style={styles.modalOverlay} onClick={() => setEditModal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h3 style={styles.modalTitle}>Edit Patient</h3>

            <div style={styles.modalBody}>
              <p style={styles.uhidLabel}>
                <strong>UHID:</strong> {editingPatient.uhid}
              </p>

              {/* ---- RESPONSIVE GRID ---- */}
              <div style={styles.formGrid}>
                {/* Name */}
                <div style={styles.formField}>
                  <label style={styles.label}>Name *</label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) =>
                      setEditForm({ ...editForm, name: e.target.value })
                    }
                    style={styles.modalInput}
                    placeholder="Enter patient name"
                  />
                </div>

                {/* Gender */}
                <div style={styles.formField}>
                  <label style={styles.label}>Gender</label>
                  <select
                    value={editForm.gender}
                    onChange={(e) =>
                      setEditForm({ ...editForm, gender: e.target.value })
                    }
                    style={styles.modalInput}
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Age */}
                <div style={styles.formField}>
                  <label style={styles.label}>Age</label>
                  <input
                    type="number"
                    min="0"
                    value={editForm.age}
                    onChange={(e) =>
                      setEditForm({ ...editForm, age: e.target.value })
                    }
                    style={styles.modalInput}
                    placeholder="Enter age"
                  />
                </div>

                {/* Phone */}
                <div style={styles.formField}>
                  <label style={styles.label}>Phone</label>
                  <input
                    type="text"
                    value={editForm.phone}
                    onChange={(e) =>
                      setEditForm({ ...editForm, phone: e.target.value })
                    }
                    style={styles.modalInput}
                    placeholder="Enter phone number"
                  />
                </div>

                {/* Address */}
                <div style={styles.formField}>
                  <label style={styles.label}>Address</label>
                  <input
                    type="text"
                    value={editForm.address}
                    onChange={(e) =>
                      setEditForm({ ...editForm, address: e.target.value })
                    }
                    style={styles.modalInput}
                    placeholder="Enter address"
                  />
                </div>

                {/* Category */}
                <div style={styles.formField}>
                  <label style={styles.label}>Category</label>
                  <select
                    value={editForm.category}
                    onChange={(e) =>
                      setEditForm({ ...editForm, category: e.target.value })
                    }
                    style={styles.modalInput}
                  >
                    <option value="">Select category</option>
                    <option value="general">General</option>
                    <option value="vip">VIP</option>
                    <option value="staff">Staff</option>
                  </select>
                </div>
              </div>
            </div>

            <div style={styles.modalFooter}>
              <button
                onClick={handleSaveEdit}
                disabled={updateLoading}
                style={{
                  ...styles.modalBtn,
                  background: updateLoading ? "#6c757d" : "#186476",
                }}
              >
                {updateLoading ? "Saving..." : "Save"}
              </button>
              <button
                onClick={() => setEditModal(false)}
                style={{ ...styles.modalBtn, background: "#dc3545" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ==================== STYLES ==================== */
const styles = {
  card: {
    background: "#fff",
    padding: 24,
    borderRadius: 16,
    boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
    marginBottom: 24,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  title: {
    color: "#1e293b",
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
    letterSpacing: "-0.5px",
  },

  /* ---- SEARCH ---- */
  searchContainer: { position: "relative", marginBottom: 20 },
  searchWrapper: {
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    minWidth: 240,
    padding: "12px 16px",
    borderRadius: 10,
    border: "2px solid #e2e8f0",
    fontSize: 15,
    transition: "all 0.2s",
    outline: "none",
  },
  searchBtn: {
    padding: "12px 24px",
    background: "#186476",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: "600",
    fontSize: 15,
    transition: "background 0.2s",
  },
  clearBtn: {
    padding: "12px 18px",
    background: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: "600",
    fontSize: 15,
  },
  suggestions: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    background: "#fff",
    border: "1px solid #cbd5e1",
    borderRadius: 10,
    maxHeight: 220,
    overflowY: "auto",
    zIndex: 10,
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    marginTop: 6,
  },
  suggestionItem: {
    padding: "12px 16px",
    borderBottom: "1px solid #f1f5f9",
    cursor: "pointer",
    fontSize: 14,
    transition: "background 0.2s",
  },

  searchError: {
    color: "#dc2626",
    background: "#fee2e2",
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 14,
  },
  searchNotFound: {
    color: "#92400e",
    background: "#fffbeb",
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 14,
  },
  searchSuccess: {
    color: "#186476",
    background: "#d1fae5",
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 14,
  },

  /* ---- ACTION BAR ---- */
  actionBar: {
    display: "flex",
    gap: 12,
    alignItems: "center",
    marginBottom: 20,
    flexWrap: "wrap",
  },
  addBtn: {
    background: "#10b981",
    color: "#fff",
    padding: "12px 20px",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: "600",
    fontSize: 15,
    boxShadow: "0 2px 6px rgba(16,185,129,0.3)",
  },
  refreshBtn: {
    background: "#3b82f6",
    color: "#fff",
    padding: "12px 20px",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: "600",
    fontSize: 15,
  },
  loading: { color: "#186476", fontStyle: "italic", fontSize: 14 },
  error: { color: "#dc2626", fontWeight: "500", fontSize: 14 },

  /* ---- TABLE ---- */
  tableContainer: {
    overflowX: "auto",
    borderRadius: 12,
    boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
  },
  table: { width: "100%", borderCollapse: "collapse", fontSize: 14 },
  th: {
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    padding: "14px 10px",
    textAlign: "left",
    fontWeight: "600",
    color: "#334155",
    fontSize: 13,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  td: {
    border: "1px solid #e2e8f0",
    padding: "10px",
    verticalAlign: "top",
    fontSize: 14,
  },
  actionGroup: { display: "flex", gap: 6, flexWrap: "wrap" },

  /* ---- BUTTONS ---- */
  editBtn: {
    background: "#3b82f6",
    color: "#fff",
    padding: "6px 10px",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 12,
    fontWeight: "600",
    minWidth: 48,
  },
  bookBtn: {
    background: "#06b6d4",
    color: "#fff",
    padding: "6px 10px",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 12,
    fontWeight: "600",
    minWidth: 48,
  },
  billBtn: {
    background: "#fbbf24",
    color: "#1f2937",
    padding: "6px 10px",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 12,
    fontWeight: "600",
    minWidth: 48,
  },
  uploadBtn: {
    background: "#10b981",
    color: "#fff",
    padding: "6px 10px",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 12,
    fontWeight: "600",
    minWidth: 48,
  },
  viewBtn: {
    background: "#7c3aed",
    color: "#fff",
    padding: "5px 10px",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 12,
    fontWeight: "600",
  },

  /* ---- MODAL (FULLY RESPONSIVE) ---- */
  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    backdropFilter: "blur(4px)",
  },
  modal: {
    background: "#fff",
    borderRadius: 16,
    width: "90%",
    maxWidth: 480,
    margin: "0 16px",
    boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
    animation: "fadeIn 0.3s ease-out",
    // responsive padding
    padding: "28px 24px",
    "@media (max-width: 480px)": { padding: "20px 16px" },
  },
  modalTitle: {
    margin: "0 0 18px",
    fontSize: 22,
    fontWeight: "700",
    color: "#1e293b",
    "@media (max-width: 480px)": { fontSize: 19 },
  },
  uhidLabel: { margin: "0 0 16px", fontSize: 15, color: "#475569" },
  modalBody: { marginBottom: 24 },

  // RESPONSIVE GRID
  formGrid: {
    display: "grid",
    gap: 16,
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    "@media (max-width: 480px)": {
      gridTemplateColumns: "1fr",
    },
  },
  formField: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    display: "block",
    margin: "0 0 6px",
    fontWeight: "600",
    color: "#374151",
    fontSize: 14,
  },
  modalInput: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: 10,
    border: "2px solid #e2e8f0",
    fontSize: 15,
    transition: "border 0.2s",
    outline: "none",
    boxSizing: "border-box", // <-- prevents overflow
    "@media (max-width: 480px)": { fontSize: 14 },
  },
  modalFooter: {
    display: "flex",
    gap: 12,
    justifyContent: "flex-end",
    flexWrap: "wrap",
    "@media (max-width: 480px)": { gap: 8 },
  },
  modalBtn: {
    padding: "12px 20px",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: "600",
    fontSize: 15,
    minWidth: 90,
    "@media (max-width: 480px)": {
      padding: "10px 16px",
      fontSize: 14,
      minWidth: 80,
    },
  },
};

/* ---- GLOBAL ANIMATIONS ---- */
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  input:focus, select:focus, button:focus {
    outline: 2px solid #186476;
    outline-offset: 2px;B
  }
  .suggestionItem:hover { background: #f1f5f9 !important; }
`;
document.head.appendChild(styleSheet);

export default PatientManagement;
