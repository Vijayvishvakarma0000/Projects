// ClinicProfile.jsx
import React, { useState, useEffect } from "react";

const ClinicProfile = ({ clinicData, onSave }) => {
  const defaultClinicData = {
    clinicName: "",
    address: "",
    logo: null,
    timings: "",
    holidays: "",
    services: [],
    qrCodes: { payment: null, feedback: null, googleMaps: null },
    consultingHours: [{ day: "", hours: "" }],
  };

  const [formData, setFormData] = useState(clinicData || defaultClinicData);
  const [consultingHours, setConsultingHours] = useState(
    Array.isArray(clinicData?.consultingHours) && clinicData.consultingHours.length > 0
      ? clinicData.consultingHours
      : [{ day: "", hours: "" }]
  );

  useEffect(() => {
    // Sync local formData with clinicData when it changes
    setFormData(clinicData || defaultClinicData);
    if (Array.isArray(clinicData?.consultingHours) && clinicData.consultingHours.length > 0) {
      setConsultingHours(clinicData.consultingHours);
    }
  }, [clinicData]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleServicesChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      services: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
    }));
  };

  const handleConsultingHoursChange = (index, field, value) => {
    const updatedHours = [...consultingHours];
    updatedHours[index] = { ...updatedHours[index], [field]: value };
    setConsultingHours(updatedHours);
    setFormData((prev) => ({
      ...prev,
      consultingHours: updatedHours,
    }));
  };

  const addConsultingHour = () => {
    setConsultingHours((prev) => [...prev, { day: "", hours: "" }]);
  };

  const removeConsultingHour = (index) => {
    const updatedHours = consultingHours.filter((_, i) => i !== index);
    setConsultingHours(updatedHours);
    setFormData((prev) => ({
      ...prev,
      consultingHours: updatedHours,
    }));
  };

  const handleFileChange = (field, e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFormData((prev) => ({
      ...prev,
      [field]: file,
    }));
  };

  const handleQRCodeUpload = (type, e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFormData((prev) => ({
      ...prev,
      qrCodes: { ...prev.qrCodes, [type]: file },
    }));
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <>
      <style jsx>{`
        .section-title {
          font-size: 1.8rem;
          font-weight: 600;
          color: #025b84;
          border-bottom: 2px solid #e6f2f7;
          padding-bottom: 6px;
          margin-bottom: 20px;
        }
        .form-group {
          display: grid;
          gap: 20px;
          grid-template-columns: 1fr 1fr;
          margin-bottom: 20px;
        }
        .label {
          display: block;
          font-size: 1rem;
          font-weight: 600;
          color: #186476;
          margin-bottom: 8px;
        }
        .input,
        .textarea,
        .file-input {
          width: 100%;
          padding: 12px;
          border: 1px solid #3fa3b9;
          border-radius: 8px;
          font-size: 1rem;
          color: #186476;
          background-color: #f8fafc;
          outline: none;
          transition: border-color 0.3s, box-shadow 0.3s;
          box-sizing: border-box;
        }
        .textarea {
          min-height: 100px;
          resize: vertical;
        }
        .input:focus,
        .textarea:focus {
          border-color: #1d9ad6;
          box-shadow: 0 0 0 3px rgba(29, 154, 214, 0.2);
        }
        .preview-image {
          width: 100px;
          height: 100px;
          object-fit: contain;
          margin-top: 8px;
          border-radius: 8px;
        }
        .error-message {
          color: red;
          text-align: center;
          margin-bottom: 20px;
        }
        .consulting-hours-container {
          margin-bottom: 20px;
        }
        .consulting-hour-row {
          display: flex;
          gap: 10px;
          align-items: center;
          margin-bottom: 10px;
        }
        .consulting-hour-row button {
          padding: 8px;
          background: #ff4d4f;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
        }
        .consulting-hour-row button:hover {
          background: #d9363e;
        }
        .add-button {
          padding: 10px 20px;
          background: #186476;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
        }
        .add-button:hover {
          background: #3fa3b9;
        }
        .save-button {
          padding: 10px 20px;
          background: #186476;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          margin-top: 20px;
        }
        .save-button:hover {
          background: #3fa3b9;
        }
      `}</style>

      <h2 className="section-title">🏥 Clinic Profile</h2>

      {!clinicData && (
        <div className="error-message">
          No clinic data available. Please wait or select a clinic.
        </div>
      )}

      <div className="form-group">
        <div>
          <label className="label">Clinic Name</label>
          <input
            type="text"
            name="clinicName"
            value={formData.clinicName || ""}
            onChange={handleInputChange}
            className="input"
            disabled={!clinicData}
          />
        </div>
        <div>
          <label className="label">Address</label>
          <textarea
            name="address"
            value={formData.address || ""}
            onChange={handleInputChange}
            className="textarea"
            disabled={!clinicData}
          />
        </div>
        <div>
          <label className="label">Timings</label>
          <input
            type="text"
            name="timings"
            value={formData.timings || ""}
            onChange={handleInputChange}
            className="input"
            disabled={!clinicData}
          />
        </div>
        <div>
          <label className="label">Holidays</label>
          <input
            type="text"
            name="holidays"
            value={formData.holidays || ""}
            onChange={handleInputChange}
            className="input"
            disabled={!clinicData}
          />
        </div>
        <div className="consulting-hours-container">
          <label className="label">Consulting Hours</label>
          {consultingHours.map((hour, index) => (
            <div key={index} className="consulting-hour-row">
              <input
                type="text"
                value={hour.day}
                onChange={(e) => handleConsultingHoursChange(index, "day", e.target.value)}
                className="input"
                placeholder="Day (e.g., Monday)"
                disabled={!clinicData}
              />
              <input
                type="text"
                value={hour.hours}
                onChange={(e) => handleConsultingHoursChange(index, "hours", e.target.value)}
                className="input"
                placeholder="Hours (e.g., 9 AM - 7 PM)"
                disabled={!clinicData}
              />
              {consultingHours.length > 1 && (
                <button onClick={() => removeConsultingHour(index)}>Remove</button>
              )}
            </div>
          ))}
          <button className="add-button" onClick={addConsultingHour} disabled={!clinicData}>
            Add Consulting Hour
          </button>
        </div>
        <div>
          <label className="label">Services Offered (comma-separated)</label>
          <input
            type="text"
            value={(formData.services || []).join(", ")}
            onChange={handleServicesChange}
            className="input"
            disabled={!clinicData}
          />
        </div>
        <div>
          <label className="label">Logo</label>
          <input
            type="file"
            onChange={(e) => handleFileChange("logo", e)}
            className="file-input"
            disabled={!clinicData}
          />
          {formData.logo && (
            <img
              src={
                typeof formData.logo === "string"
                  ? formData.logo
                  : URL.createObjectURL(formData.logo)
              }
              alt="Clinic Logo"
              className="preview-image"
            />
          )}
        </div>
        <div>
          <label className="label">Payment QR Code</label>
          <input
            type="file"
            onChange={(e) => handleQRCodeUpload("payment", e)}
            className="file-input"
            disabled={!clinicData}
          />
          {formData.qrCodes?.payment && (
            <img
              src={
                typeof formData.qrCodes.payment === "string"
                  ? formData.qrCodes.payment
                  : URL.createObjectURL(formData.qrCodes.payment)
              }
              alt="Payment QR"
              className="preview-image"
            />
          )}
        </div>
        <div>
          <label className="label">Feedback QR Code</label>
          <input
            type="file"
            onChange={(e) => handleQRCodeUpload("feedback", e)}
            className="file-input"
            disabled={!clinicData}
          />
          {formData.qrCodes?.feedback && (
            <img
              src={
                typeof formData.qrCodes.feedback === "string"
                  ? formData.qrCodes.feedback
                  : URL.createObjectURL(formData.qrCodes.feedback)
              }
              alt="Feedback QR"
              className="preview-image"
            />
          )}
        </div>
        <div>
          <label className="label">Google Maps QR Code</label>
          <input
            type="file"
            onChange={(e) => handleQRCodeUpload("googleMaps", e)}
            className="file-input"
            disabled={!clinicData}
          />
          {formData.qrCodes?.googleMaps && (
            <img
              src={
                typeof formData.qrCodes.googleMaps === "string"
                  ? formData.qrCodes.googleMaps
                  : URL.createObjectURL(formData.qrCodes.googleMaps)
              }
              alt="Google Maps QR"
              className="preview-image"
            />
          )}
        </div>
      </div>
      <div className="save-container">
        <button className="save-button" onClick={handleSave} disabled={!clinicData}>
          💾 Save Clinic Profile
        </button>
      </div>
    </>
  );
};

export default ClinicProfile;