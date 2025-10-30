import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateDoctorProfile, clearMessage } from "../../redux/Slices/clinicSlice";

const DoctorDetails = ({
  clinicData,
  onChange, // Optional: for parent to handle text input changes
  onDigitalSignatureUpload, // Optional: for parent to handle signature upload
  onDigitalStampUpload, // Optional: for parent to handle stamp upload
}) => {
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.clinic);

  // Controlled form state for text inputs
  const [formData, setFormData] = useState({
    doctorName: clinicData?.doctorName || "",
    doctorEmail: clinicData?.doctorEmail || clinicData?.email || "",
    doctorDegree: clinicData?.doctorDegree || "",
    doctorSpecialization: clinicData?.doctorSpecialization || "",
    doctorRegNo: clinicData?.doctorRegNo || "",
    doctorLicense: clinicData?.doctorLicense || "",
    doctorContact: clinicData?.doctorContact || clinicData?.contactNumber || "",
  });

  // State for file inputs
  const [digitalSignatureFile, setDigitalSignatureFile] = useState(null);
  const [digitalStampFile, setDigitalStampFile] = useState(null);

  // Sync formData with clinicData when it changes
  useEffect(() => {
    setFormData({
      doctorName: clinicData?.doctorName || "",
      doctorEmail: clinicData?.doctorEmail || clinicData?.email || "",
      doctorDegree: clinicData?.doctorDegree || "",
      doctorSpecialization: clinicData?.doctorSpecialization || "",
      doctorRegNo: clinicData?.doctorRegNo || "",
      doctorLicense: clinicData?.doctorLicense || "",
      doctorContact: clinicData?.doctorContact || clinicData?.contactNumber || "",
    });
  }, [clinicData]);

  // Clear messages/errors after 5 seconds
  useEffect(() => {
    if (message || error) {
      const timer = setTimeout(() => {
        dispatch(clearMessage());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message, error, dispatch]);

  // Handle text input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (onChange) onChange(e); // Notify parent if provided
  };

  // Handle file input changes
  const handleSignatureChange = (e) => {
    const file = e.target.files?.[0] || null;
    setDigitalSignatureFile(file);
    if (onDigitalSignatureUpload) onDigitalSignatureUpload(e);
  };

  const handleStampChange = (e) => {
    const file = e.target.files?.[0] || null;
    setDigitalStampFile(file);
    if (onDigitalStampUpload) onDigitalStampUpload(e);
  };

  // Handle form submission
  const handleSave = async () => {
    const payload = new FormData();
    
    // Append text fields (matching API keys in updateDoctorProfile)
    if (formData.doctorName) payload.append("name", formData.doctorName);
    if (formData.doctorEmail) payload.append("email", formData.doctorEmail);
    if (formData.doctorDegree) payload.append("degree", formData.doctorDegree);
    if (formData.doctorSpecialization) payload.append("specialization", formData.doctorSpecialization);
    if (formData.doctorRegNo) payload.append("registrationNumber", formData.doctorRegNo);
    if (formData.doctorLicense) payload.append("registrationNumber", formData.doctorLicense); // Adjust if license needs a different key
    if (formData.doctorContact) payload.append("contact", formData.doctorContact);

    // Append file fields
    if (digitalSignatureFile) payload.append("digitalSignature", digitalSignatureFile);
    if (digitalStampFile) payload.append("digitalStamp", digitalStampFile);

    try {
      const resultAction = await dispatch(updateDoctorProfile(payload));
      if (updateDoctorProfile.fulfilled.match(resultAction)) {
        console.log("Doctor profile updated:", resultAction.payload);
      } else {
        console.error("Update failed:", resultAction.payload || resultAction.error);
      }
    } catch (err) {
      console.error("Dispatch error:", err);
    }
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
        .input:focus {
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
        .save-btn {
          margin-top: 8px;
          padding: 10px 14px;
          border-radius: 8px;
          border: none;
          background: #025b84;
          color: white;
          cursor: pointer;
          font-weight: 600;
          opacity: ${loading ? 0.6 : 1};
          pointer-events: ${loading ? "none" : "auto"};
        }
        .message {
          margin-top: 10px;
          padding: 10px;
          border-radius: 8px;
          font-size: 1rem;
          text-align: center;
        }
        .success {
          background-color: #e6ffed;
          color: #2e7d32;
        }
        .error {
          background-color: #ffe6e6;
          color: #d32f2f;
        }
      `}</style>

      <h2 className="section-title">🧑‍⚕️ Doctor Details</h2>
      <div className="form-group">
        <div>
          <label className="label">Doctor Name</label>
          <input
            type="text"
            name="doctorName"
            value={formData.doctorName}
            onChange={handleInputChange}
            className="input"
          />
        </div>
        <div>
          <label className="label">Email</label>
          <input
            type="email"
            name="doctorEmail"
            value={formData.doctorEmail}
            onChange={handleInputChange}
            className="input"
          />
        </div>
        <div>
          <label className="label">Degree</label>
          <input
            type="text"
            name="doctorDegree"
            value={formData.doctorDegree}
            onChange={handleInputChange}
            className="input"
          />
        </div>
        <div>
          <label className="label">Specialization</label>
          <input
            type="text"
            name="doctorSpecialization"
            value={formData.doctorSpecialization}
            onChange={handleInputChange}
            className="input"
          />
        </div>
        <div>
          <label className="label">Registration No</label>
          <input
            type="text"
            name="doctorRegNo"
            value={formData.doctorRegNo}
            onChange={handleInputChange}
            className="input"
          />
        </div>
        <div>
          <label className="label">License No</label>
          <input
            type="text"
            name="doctorLicense"
            value={formData.doctorLicense}
            onChange={handleInputChange}
            className="input"
          />
        </div>
        <div>
          <label className="label">Contact</label>
          <input
            type="text"
            name="doctorContact"
            value={formData.doctorContact}
            onChange={handleInputChange}
            className="input"
          />
        </div>
        <div>
          <label className="label">Digital Signature</label>
          <input
            type="file"
            onChange={handleSignatureChange}
            className="file-input"
            accept="image/*"
          />
          {clinicData?.digitalSignature && !digitalSignatureFile && (
            <img
              src={clinicData.digitalSignature}
              alt="Digital Signature"
              className="preview-image"
            />
          )}
          {digitalSignatureFile && (
            <div style={{ marginTop: 8 }}>{digitalSignatureFile.name}</div>
          )}
        </div>
        <div>
          <label className="label">Digital Stamp</label>
          <input
            type="file"
            onChange={handleStampChange}
            className="file-input"
            accept="image/*"
          />
          {clinicData?.digitalStamp && !digitalStampFile && (
            <img
              src={clinicData.digitalStamp}
              alt="Digital Stamp"
              className="preview-image"
            />
          )}
          {digitalStampFile && (
            <div style={{ marginTop: 8 }}>{digitalStampFile.name}</div>
          )}
        </div>
      </div>

      <button className="save-btn" onClick={handleSave} disabled={loading}>
        {loading ? "Saving..." : "Save All Data"}
      </button>

      {message && <div className="message success">{message}</div>}
      {error && <div className="message error">{error}</div>}
    </>
  );
};

export default DoctorDetails;