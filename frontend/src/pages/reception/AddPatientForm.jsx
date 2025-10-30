
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerPatient } from "../../redux/Slices/receptionSlice";

const AddPatientForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.reception);

  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    age: "",
    phone: "",
    address: "",
    category: "general",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!formData.name) e.name = "Name required";
    if (!formData.gender) e.gender = "Gender required";
    if (!formData.age || formData.age <= 0) e.age = "Valid age required";
    if (!formData.phone || !/^\d{10}$/.test(formData.phone)) e.phone = "Valid phone required";
    if (!formData.address) e.address = "Address required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await dispatch(registerPatient({ ...formData, age: parseInt(formData.age) })).unwrap();
      alert("✅ Patient registered successfully!");
      setFormData({ name: "", gender: "", age: "", phone: "", address: "", category: "general" });
      onClose();
    } catch (err) {
      alert(`❌ Registration failed: ${err}`);
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Register New Patient</h2>
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div style={styles.field}>
            <label style={styles.label}>Name</label>
            <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} style={styles.input} />
            {errors.name && <p style={styles.error}>{errors.name}</p>}
          </div>
          {/* Gender */}
          <div style={styles.field}>
            <label style={styles.label}>Gender</label>
            <select value={formData.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value })} style={styles.select}>
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.gender && <p style={styles.error}>{errors.gender}</p>}
          </div>
          {/* Age */}
          <div style={styles.field}>
            <label style={styles.label}>Age</label>
            <input type="number" value={formData.age} onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || "" })} style={styles.input} />
            {errors.age && <p style={styles.error}>{errors.age}</p>}
          </div>
          {/* Phone */}
          <div style={styles.field}>
            <label style={styles.label}>Phone</label>
            <input type="text" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} style={styles.input} />
            {errors.phone && <p style={styles.error}>{errors.phone}</p>}
          </div>
          {/* Address */}
          <div style={styles.field}>
            <label style={styles.label}>Address</label>
            <input type="text" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} style={styles.input} />
            {errors.address && <p style={styles.error}>{errors.address}</p>}
          </div>
          {/* Category */}
          <div style={styles.field}>
            <label style={styles.label}>Category</label>
            <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} style={styles.select}>
              <option value="general">General</option>
              <option value="emergency">Emergency</option>
            </select>
          </div>

          <div style={styles.actions}>
            <button type="submit" disabled={loading} style={styles.saveBtn}>{loading ? "Saving..." : "Save"}</button>
            <button type="button" onClick={onClose} style={styles.cancelBtn}>Cancel</button>
          </div>
          {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}
        </form>
      </div>
    </div>
  );
};

const styles = {
  overlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 },
  formContainer: { background: "#fff", padding: 20, borderRadius: 10, width: 400, boxShadow: "0 2px 10px rgba(0,0,0,0.2)" },
  title: { textAlign: "center", marginBottom: 20, color: "#186476" },
  field: { marginBottom: 10 },
  label: { fontWeight: 600, marginBottom: 5, display: "block" },
  input: { padding: 8, border: "1px solid #ccc", borderRadius: 5, width: "100%" },
  select: { padding: 8, border: "1px solid #ccc", borderRadius: 5, width: "100%" },
  actions: { marginTop: 15, display: "flex", justifyContent: "space-between" },
  saveBtn: { background: "#28a745", color: "#fff", border: "none", padding: "10px 15px", borderRadius: 5, cursor: "pointer" },
  cancelBtn: { background: "#6c757d", color: "#fff", border: "none", padding: "10px 15px", borderRadius: 5, cursor: "pointer" },
  error: { color: "red", fontSize: 12 },
};

export default AddPatientForm;
