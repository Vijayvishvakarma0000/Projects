




import React from "react";

const PrescriptionCertificates = ({ clinicData, onChange }) => {
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
        .textarea {
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
        .checkbox-label {
          font-size: 0.9rem;
          color: #186476;
          display: flex;
          align-items: center;
          gap: 8px;
        }
      `}</style>

      <h2 className="section-title">💉 Prescription & Certificates</h2>
      <div className="form-group">
        <div>
          <label className="label">Default Language</label>
          <input
            type="text"
            name="defaultLanguage"
            value={clinicData.defaultLanguage}
            onChange={onChange}
            className="input"
          />
        </div>
        <div>
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="adviceHandouts"
              checked={clinicData.adviceHandouts}
              onChange={onChange}
            />
            Advice Handouts
          </label>
        </div>
        <div>
          <label className="label">Favorite Templates (comma-separated)</label>
          <textarea
            value={clinicData.favoriteTemplates.join(", ")}
            onChange={(e) =>
              onChange({
                target: {
                  name: "favoriteTemplates",
                  value: e.target.value.split(",").map((t) => t.trim()),
                  type: "text",
                },
              })
            }
            className="textarea"
          />
        </div>
        <div>
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="certificatesEnabled"
              checked={clinicData.certificatesEnabled}
              onChange={onChange}
            />
            Enable Certificates
          </label>
        </div>
        <div>
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="autoDoctorClinicDetails"
              checked={clinicData.autoDoctorClinicDetails}
              onChange={onChange}
            />
            Auto-fill Doctor/Clinic Details
          </label>
        </div>
      </div>
    </>
  );
};

export default PrescriptionCertificates;
