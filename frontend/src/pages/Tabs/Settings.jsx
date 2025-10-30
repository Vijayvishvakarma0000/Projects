import React from "react";

const Settings = ({ defaultFees, setDefaultFees, procedureCharges, setProcedureCharges, tax, setTax }) => {
  return (
    <>
      <style jsx>{`
        .card {
          background: white;
          border-radius: 18px;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
          padding: 32px 28px;
          transition: all 0.35s ease;
          max-width: 800px;
          margin: 0 auto;
          position: relative;
          overflow: hidden;
        }

        .card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          height: 4px;
          width: 100%;
          background: linear-gradient(90deg, #1d9ad6, #44c2f5);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s ease;
        }

        .card:hover::before {
          transform: scaleX(1);
        }

        .card:hover {
          transform: translateY(-8px);
          box-shadow: 0 14px 26px rgba(0, 0, 0, 0.15);
        }

        .section-title {
          font-size: 1.8rem;
          font-weight: 600;
          color: #025b84;
          border-bottom: 2px solid #e6f2f7;
          padding-bottom: 6px;
          margin-bottom: 20px;
        }

        .form-group-vertical {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .label {
          display: block;
          font-size: 1rem;
          font-weight: 600;
          color: #186476;
          margin-bottom: 8px;
        }

        .input {
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

        @media (max-width: 768px) {
          .card {
            padding: 24px 16px;
          }
        }
      `}</style>

      <div className="card">
        <h2 className="section-title">⚙️ Settings</h2>
        <div className="form-group-vertical">
          <label className="label">Default Consultation Fee (₹)</label>
          <input
            type="number"
            className="input"
            value={defaultFees}
            onChange={(e) => setDefaultFees(e.target.value)}
            min="0"
            step="0.01"
          />
          <label className="label">Default Procedure Charges (₹)</label>
          <input
            type="number"
            className="input"
            value={procedureCharges}
            onChange={(e) => setProcedureCharges(e.target.value)}
            min="0"
            step="0.01"
          />
          <label className="label">Tax / GST (%)</label>
          <input
            type="number"
            className="input"
            value={tax}
            onChange={(e) => setTax(e.target.value)}
            min="0"
            step="0.1"
          />
        </div>
      </div>
    </>
  );
};

export default Settings;