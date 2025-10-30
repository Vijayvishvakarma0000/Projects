
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLicense, getLicenses, updateLicense, deleteLicense } from "../../redux/Slices/licenseSlice";

const allLicenseTypes = [
  "clinicReg",
  "medical",
  "fire",
  "biomedical",
  "pollution",
  "other"
];

const reminderOptions = ["popup", "email", "sms", "whatsapp"];

const LicensesCompliance = () => {
  const dispatch = useDispatch();
  const { currentClinic } = useSelector((state) => state.clinic);
  const { loading, message, error, licenses } = useSelector((state) => state.license);

  const clinicId = currentClinic?._id || "68ce3eec0bfbcc75c37abeb1";

  const [showForm, setShowForm] = useState(false);
  const [newLicense, setNewLicense] = useState({
    type: "",
    customType: "",
    licenseNumber: "",
    documentUrl: "",
    issuedDate: "",
    expiryDate: "",
    reminderDays: 30,
    expiryReminder: []
  });

  const [showUpdateModal, setShowUpdateModal] = useState({
    visible: false,
    licenseId: "",
    expiryDate: ""
  });

  useEffect(() => {
    dispatch(getLicenses(clinicId));
  }, [clinicId, dispatch]);

  const handleChange = (field, value) => {
    setNewLicense((prev) => ({ ...prev, [field]: value }));
  };

  const handleFormReminderToggle = (option) => {
    const reminders = newLicense.expiryReminder || [];
    if (reminders.includes(option)) {
      setNewLicense({ ...newLicense, expiryReminder: reminders.filter((r) => r !== option) });
    } else {
      setNewLicense({ ...newLicense, expiryReminder: [...reminders, option] });
    }
  };

  const handleAddLicense = async () => {
    const { type, customType, issuedDate, expiryDate, reminderDays, licenseNumber, expiryReminder } = newLicense;
    const finalType = type === "other" ? customType : type;

    if (!finalType || !issuedDate || !expiryDate || !reminderDays || !licenseNumber) {
      alert("Please fill all required fields.");
      return;
    }

    const licenseData = {
      type: finalType,
      registrationNumber: licenseNumber,
      issuedDate,
      expiryDate,
      reminderDays: Number(reminderDays),
      expiryReminder,
      status: "active",
    };

    try {
      await dispatch(addLicense({ clinicId, licenseData })).unwrap();
      setNewLicense({
        type: "",
        customType: "",
        licenseNumber: "",
        documentUrl: "",
        issuedDate: "",
        expiryDate: "",
        reminderDays: 30,
        expiryReminder: [],
      });
      setShowForm(false);
    } catch (err) {
      console.error("❌ Add License Error:", err);
    }
  };

  const handleUpdateLicense = async () => {
    if (!showUpdateModal.expiryDate) {
      alert("Please select a valid expiry date");
      return;
    }

    try {
      await dispatch(updateLicense({ licenseId: showUpdateModal.licenseId, updatedData: { expiryDate: showUpdateModal.expiryDate } })).unwrap();
      setShowUpdateModal({ visible: false, licenseId: "", expiryDate: "" });
    } catch (err) {
      console.error("❌ Update License Error:", err);
    }
  };

  const handleDeleteLicense = async (licenseId) => {
    if (window.confirm("Are you sure you want to delete this license?")) {
      try {
        await dispatch(deleteLicense(licenseId)).unwrap();
      } catch (err) {
        console.error("❌ Delete License Error:", err);
      }
    }
  };

  return (
    <div className="container">
      <h2 className="section-title">🏥 Licenses & Compliance</h2>

      {/* List of licenses */}
      <div className="licenses-grid">
        {licenses.length === 0 ? (
          <p className="no-data">No licenses added yet.</p>
        ) : (
          licenses.map((lic) => (
            <div key={lic._id} className="license-card">
              <div className="card-header">
                {lic.type}
                <span style={{ float: "right" }}>
                  <button
                    style={{ cursor: "pointer", background: "none", border: "none", marginRight: "8px" }}
                    onClick={() =>
                      setShowUpdateModal({
                        visible: true,
                        licenseId: lic._id,
                        expiryDate: lic.expiryDate || ""
                      })
                    }
                  >
                    ✏️
                  </button>
                  <button
                    style={{ cursor: "pointer", background: "none", border: "none" }}
                    onClick={() => handleDeleteLicense(lic._id)}
                  >
                    🗑️
                  </button>
                </span>
              </div>
              <div className="card-body">
                <p><strong>License No:</strong> {lic.registrationNumber || lic.licenseNumber}</p>
                <p><strong>Issued:</strong> {lic.issuedDate || "-"}</p>
                <p><strong>Expiry:</strong> {lic.expiryDate || "-"}</p>
                <p><strong>Reminder Days:</strong> {lic.reminderDays || 0}</p>
                <p><strong>Reminders:</strong> {Array.isArray(lic.expiryReminder) ? lic.expiryReminder.join(", ") : "-"}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <button className="btn-toggle" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Close Form ✖" : "➕ Add License"}
      </button>

      {/* Add License Modal */}
      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add New License</h3>
            <button className="close-btn" onClick={() => setShowForm(false)}>✖</button>

            <select value={newLicense.type} onChange={(e) => handleChange("type", e.target.value)}>
              <option value="">Select License Type</option>
              {allLicenseTypes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>

            {newLicense.type === "other" && (
              <input
                type="text"
                placeholder="Enter Custom License Name"
                value={newLicense.customType}
                onChange={(e) => handleChange("customType", e.target.value)}
              />
            )}

            <input
              type="text"
              placeholder="License Number"
              value={newLicense.licenseNumber}
              onChange={(e) => handleChange("licenseNumber", e.target.value)}
            />
            <input
              type="date"
              placeholder="Issued Date"
              value={newLicense.issuedDate}
              onChange={(e) => handleChange("issuedDate", e.target.value)}
            />
            <input
              type="date"
              placeholder="Expiry Date"
              value={newLicense.expiryDate}
              onChange={(e) => handleChange("expiryDate", e.target.value)}
            />
            <input
              type="number"
              placeholder="Reminder Days"
              value={newLicense.reminderDays}
              onChange={(e) => handleChange("reminderDays", e.target.value)}
            />

            <div className="reminders">
              {reminderOptions.map((opt) => (
                <label key={opt}>
                  <input
                    type="checkbox"
                    checked={newLicense.expiryReminder.includes(opt)}
                    onChange={() => handleFormReminderToggle(opt)}
                  />{" "}
                  {opt}
                </label>
              ))}
            </div>

            <button className="btn-save" onClick={handleAddLicense} disabled={loading}>
              {loading ? "Saving..." : "💾 Save License"}
            </button>
          </div>
        </div>
      )}

      {/* Update Expiry Modal */}
      {showUpdateModal.visible && (
        <div className="modal">
          <div className="modal-content">
            <h3>Update Expiry Date</h3>
            <button className="close-btn" onClick={() => setShowUpdateModal({ visible: false, licenseId: "", expiryDate: "" })}>✖</button>
            <input
              type="date"
              value={showUpdateModal.expiryDate}
              onChange={(e) =>
                setShowUpdateModal({ ...showUpdateModal, expiryDate: e.target.value })
              }
            />
            <button className="btn-save" onClick={handleUpdateLicense} disabled={loading}>
              {loading ? "Updating..." : "💾 Update"}
            </button>
          </div>
        </div>
      )}

      {message && <div className="message success">{message}</div>}
      {error && <div className="message error">{error}</div>}

      <style jsx>{`
        .container { max-width: 900px; margin: auto; padding: 20px; font-family: 'Segoe UI', sans-serif; }
        .section-title { font-size: 2rem; font-weight: 700; color: #0077b6; text-align: center; margin-bottom: 20px; }
        .licenses-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; }
        .license-card { background: #f9f9f9; border-radius: 12px; box-shadow: 0 6px 16px rgba(0,0,0,0.12); padding: 20px; transition: transform 0.2s; }
        .license-card:hover { transform: translateY(-6px); }
        .card-header { font-weight: 700; color: #0077b6; font-size: 1.2rem; margin-bottom: 10px; text-transform: capitalize; }
        .btn-toggle, .btn-save { background: #0077b6; color: white; border: none; border-radius: 8px; padding: 10px 20px; cursor: pointer; margin: 20px auto; display: block; font-weight: 600; }
        .btn-save[disabled] { opacity: 0.6; cursor: not-allowed; }
        .modal { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.4); display: flex; justify-content: center; align-items: center; z-index: 1000; }
        .modal-content { background: white; padding: 25px; border-radius: 12px; width: 400px; position: relative; display: flex; flex-direction: column; gap: 10px; }
        .close-btn { position: absolute; top: 10px; right: 10px; border: none; background: none; font-size: 1.2rem; cursor: pointer; }
        .message { padding: 12px; border-radius: 8px; margin-top: 15px; text-align: center; font-weight: 600; }
        .success { background: #e6f7ec; color: #0b7a2e; }
        .error { background: #fdecea; color: #b91c1c; }
        .no-data { text-align: center; color: #777; }
      `}</style>
    </div>
  );
};

export default LicensesCompliance;
