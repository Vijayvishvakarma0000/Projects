
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveBillingSettings, getBillingSettings } from "../../redux/Slices/billingSlice";

// Icons
const icons = {
  consultation: "💊",
  discount: "🏷️",
  tax: "💰",
  payment: "💳",
  services: "🩺",
};

// Example available options (replace with API fetch if needed)
const availableServices = ["ECG", "Lab", "Pre-Op Fitness", "Certificate"];
const availableCategories = ["procedure", "certificate", "therapy"];

const BillingCommunication = ({ clinicData = {}, onChange = () => {} }) => {
  const dispatch = useDispatch();
  const { currentClinic } = useSelector((state) => state.clinic);
  const { loading, error, message, billingSettings } = useSelector((state) => state.billing);

  const clinicId = clinicData.clinicId || currentClinic?._id;

  const [data, setData] = useState({
    defaultConsultationFee: "",
    discountPercent: "",
    tax: { enabled: false, gstPercent: "" },
    paymentMethods: { cash: false, upi: false, card: false, insurance: false },
    services: [],
  });

  const [newService, setNewService] = useState({
    name: "",
    category: "",
    defaultAmount: "",
    customService: "",
    customCategory: "",
  });

  // Fetch billing settings on mount
  useEffect(() => {
    if (clinicId) dispatch(getBillingSettings(clinicId));
  }, [clinicId, dispatch]);

  // Populate form when billing settings are fetched
  useEffect(() => {
    const settings = billingSettings || clinicData;
    if (settings) {
      setData({
        defaultConsultationFee: settings.defaultConsultationFee || "",
        discountPercent: settings.discountPercent || "",
        tax: {
          enabled: settings.tax?.enabled || false,
          gstPercent: settings.tax?.gstPercent || "",
        },
        paymentMethods: {
          cash: settings.paymentMethods?.cash || false,
          upi: settings.paymentMethods?.upi || false,
          card: settings.paymentMethods?.card || false,
          insurance: settings.paymentMethods?.insurance || false,
        },
        services: settings.services || [],
      });
    }
  }, [billingSettings, clinicData]);

useEffect(() => {
  onChange({ target: { name: "clinicData", value: data } });
}, [data, onChange]);


  const handleInputChange = (e, field, nestedField) => {
    if (nestedField) {
      setData(prev => ({ ...prev, [field]: { ...prev[field], [nestedField]: e.target.value } }));
    } else {
      setData(prev => ({ ...prev, [field]: e.target.value }));
    }
  };

  const handleCheckboxChange = (e, field, nestedField) => {
    if (nestedField) {
      setData(prev => ({ ...prev, [field]: { ...prev[field], [nestedField]: e.target.checked } }));
    } else {
      setData(prev => ({ ...prev, [field]: e.target.checked }));
    }
  };

  const removeService = (index) => {
    setData(prev => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index),
    }));
  };

  const handleServiceChange = (index, field, value) => {
    setData(prev => ({
      ...prev,
      services: prev.services.map((service, i) =>
        i === index ? { ...service, [field]: field === "defaultAmount" ? Number(value) : value } : service
      ),
    }));
  };

  const handleSave = () => {
    if (!clinicId) return alert("Clinic ID is missing!");
    dispatch(saveBillingSettings({ clinicId, billingData: data }));
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Billing & Communication</h2>

      {/* Consultation & Discount */}
      <div style={styles.card}>
        <h3 style={styles.cardHeading}>{icons.consultation} Consultation & Discount</h3>
        <div style={styles.row}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Consultation Fee (₹)</label>
            <input
              type="number"
              value={data.defaultConsultationFee}
              onChange={(e) => handleInputChange(e, "defaultConsultationFee")}
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Discount (%)</label>
            <input
              type="number"
              value={data.discountPercent}
              onChange={(e) => handleInputChange(e, "discountPercent")}
              style={styles.input}
            />
          </div>
        </div>
      </div>

      {/* Tax */}
      <div style={styles.card}>
        <h3 style={styles.cardHeading}>{icons.tax} Tax</h3>
        <div style={styles.row}>
          <label style={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={data.tax.enabled}
              onChange={(e) => handleCheckboxChange(e, "tax", "enabled")}
            /> Enable GST
          </label>
          {data.tax.enabled && (
            <input
              type="number"
              value={data.tax.gstPercent}
              onChange={(e) => handleInputChange(e, "tax", "gstPercent")}
              placeholder="GST %"
              style={{ ...styles.input, width: "120px" }}
            />
          )}
        </div>
      </div>

      {/* Payment Methods */}
      <div style={styles.card}>
        <h3 style={styles.cardHeading}>{icons.payment} Payment Methods</h3>
        <div style={styles.row}>
          {Object.keys(data.paymentMethods).map((method) => (
            <label key={method} style={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={data.paymentMethods[method]}
                onChange={(e) => handleCheckboxChange(e, "paymentMethods", method)}
              />{" "}
              {method.charAt(0).toUpperCase() + method.slice(1)}
            </label>
          ))}
        </div>
      </div>

      {/* Services */}
      <div style={styles.card}>
        <h3 style={styles.cardHeading}>{icons.services} Services</h3>
        <div style={styles.servicesGrid}>
          {data.services.map((service, index) => (
            <div key={index} style={styles.serviceCard}>
              <button onClick={() => removeService(index)} style={styles.removeBtn}>×</button>
              <div style={styles.categoryBadge}>{service.category}</div>
              <input
                type="text"
                value={service.name}
                onChange={(e) => handleServiceChange(index, "name", e.target.value)}
                placeholder="Service Name"
                style={styles.serviceNameInput}
              />
              <input
                type="number"
                value={service.defaultAmount}
                onChange={(e) => handleServiceChange(index, "defaultAmount", e.target.value)}
                placeholder="Amount"
                style={styles.serviceAmountInput}
              />
            </div>
          ))}
        </div>

        {/* Add Service Form */}
        <div style={styles.addServiceRow}>
          {/* Service Name */}
          {newService.name === "OtherService" ? (
            <input
              type="text"
              placeholder="Enter Service Name"
              value={newService.customService || ""}
              onChange={(e) => setNewService(prev => ({ ...prev, customService: e.target.value }))}
              style={styles.inputSmall}
            />
          ) : (
            <select
              value={newService.name}
              onChange={(e) => {
                if (e.target.value === "OtherService") {
                  setNewService(prev => ({ ...prev, name: "OtherService", customService: "" }));
                } else {
                  setNewService(prev => ({ ...prev, name: e.target.value, customService: "" }));
                }
              }}
              style={styles.inputSmall}
            >
              <option value="">Select Service</option>
              {availableServices.map((service) => (
                <option key={service} value={service}>{service}</option>
              ))}
              <option value="OtherService">Other</option>
            </select>
          )}

          {/* Category */}
          {newService.category === "OtherCategory" ? (
            <input
              type="text"
              placeholder="Enter Category"
              value={newService.customCategory || ""}
              onChange={(e) => setNewService(prev => ({ ...prev, customCategory: e.target.value }))}
              style={styles.inputSmall}
            />
          ) : (
            <select
              value={newService.category}
              onChange={(e) => {
                if (e.target.value === "OtherCategory") {
                  setNewService(prev => ({ ...prev, category: "OtherCategory", customCategory: "" }));
                } else {
                  setNewService(prev => ({ ...prev, category: e.target.value, customCategory: "" }));
                }
              }}
              style={styles.inputSmall}
            >
              <option value="">Select Category</option>
              {availableCategories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
              <option value="OtherCategory">Other</option>
            </select>
          )}

          {/* Amount */}
          <input
            type="number"
            placeholder="Amount"
            value={newService.defaultAmount}
            onChange={(e) => setNewService(prev => ({ ...prev, defaultAmount: e.target.value }))}
            style={styles.inputSmall}
          />

          {/* Add Button */}
          <button
            onClick={() => {
              if ((!newService.name && !newService.customService) || 
                  (!newService.category && !newService.customCategory) || 
                  !newService.defaultAmount) return;

              const serviceToAdd = {
                name: newService.name === "OtherService" ? newService.customService : newService.name,
                category: newService.category === "OtherCategory" ? newService.customCategory : newService.category,
                defaultAmount: Number(newService.defaultAmount),
              };

              setData(prev => ({ ...prev, services: [...prev.services, serviceToAdd] }));
              setNewService({ name: "", category: "", defaultAmount: "", customService: "", customCategory: "" });
            }}
            style={styles.addBtn}
          >
            Add Service
          </button>
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        disabled={loading}
        style={{ ...styles.addBtn, marginTop: "20px" }}
      >
        {loading ? "Saving..." : "Save Settings"}
      </button>

      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      {message && <p style={{ color: "green", marginTop: "10px" }}>{message}</p>}
    </div>
  );
};

const styles = {
  container: { padding: "25px", maxWidth: "960px", margin: "0 auto", fontFamily: "'Segoe UI', sans-serif", background: "#f5f7fb" },
  heading: { fontSize: "28px", fontWeight: "700", marginBottom: "30px", color: "#222" },
  card: { background: "#fff", padding: "25px", borderRadius: "16px", boxShadow: "0 10px 25px rgba(0,0,0,0.08)", marginBottom: "28px", transition: "0.3s" },
  cardHeading: { fontSize: "20px", fontWeight: "600", marginBottom: "18px", color: "#1f1f1f" },
  row: { display: "flex", alignItems: "center", flexWrap: "wrap", gap: "20px" },
  inputGroup: { flex: "1 1 45%" },
  label: { display: "block", marginBottom: "8px", fontWeight: "500", color: "#555" },
  input: { width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #ccc", outline: "none", fontSize: "14px" },
  inputSmall: { padding: "8px 12px", borderRadius: "8px", border: "1px solid #ccc", width: "160px", fontSize: "14px" },
  checkboxLabel: { marginRight: "22px", fontWeight: "500", color: "#555", cursor: "pointer", fontSize: "14px" },
  servicesGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" },
  serviceCard: { position: "relative", background: "#ffffff", borderRadius: "16px", padding: "18px 20px", boxShadow: "0 6px 18px rgba(0,0,0,0.08)", display: "flex", flexDirection: "column", gap: "12px", transition: "0.3s" },
  removeBtn: { position: "absolute", top: "10px", right: "12px", border: "none", background: "transparent", cursor: "pointer", fontWeight: "bold", color: "#ff4d4f", fontSize: "20px", transition: "0.2s" },
  categoryBadge: { background: "linear-gradient(90deg, #36d1dc, #5b86e5)", color: "#fff", borderRadius: "12px", padding: "4px 10px", fontSize: "12px", fontWeight: "600", textAlign: "center", width: "fit-content" },
  serviceNameInput: { padding: "8px 10px", borderRadius: "8px", border: "1px solid #ccc", fontSize: "14px", width: "100%" },
  serviceAmountInput: { padding: "8px 10px", borderRadius: "8px", border: "1px solid #ccc", fontSize: "14px", width: "100%" },
  addServiceRow: { display: "flex", gap: "12px", marginTop: "20px", flexWrap: "wrap", alignItems: "center" },
  addBtn: { padding: "8px 20px", borderRadius: "8px", border: "none", background: "linear-gradient(90deg,#36d1dc,#5b86e5)", color: "#fff", cursor: "pointer", fontWeight: "600", transition: "0.3s" },
};

export default BillingCommunication;
