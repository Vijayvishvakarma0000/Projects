import React from "react";

const NewBill = ({ newBill, setNewBill, billErrors, patients, facilityOptions, handleAddTransaction, setShowPatientForm, tax }) => {
  const selectedPatient = patients.find(p => p.id === parseInt(newBill.patientId));

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

        .required {
          color: #dc3545;
          font-size: 0.9rem;
          margin-left: 5px;
        }

        .input,
        .select {
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

        .input:focus,
        .select:focus {
          border-color: #1d9ad6;
          box-shadow: 0 0 0 3px rgba(29, 154, 214, 0.2);
        }

        .select {
          appearance: none;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='%23186476' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>");
          background-repeat: no-repeat;
          background-position: right 0.75rem center;
          background-size: 1rem;
        }

        .error {
          color: #dc3545;
          font-size: 0.9rem;
          margin-top: 4px;
        }

        .button {
          padding: 12px 24px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 600;
          transition: background 0.3s, transform 0.2s;
        }

        .primary-button {
          background: #186476;
          color: white;
        }

        .primary-button:hover {
          background: #3fa3b9;
          transform: translateY(-2px);
        }

        .total-amount {
          font-size: 1.2rem;
          font-weight: bold;
          color: #186476;
          margin-top: 20px;
          text-align: center;
        }

        @media (max-width: 768px) {
          .card {
            padding: 24px 16px;
          }
          .form-group {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="card">
        <h2 className="section-title">➕ New Bill</h2>
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
          <button
            className="button primary-button"
            onClick={() => setShowPatientForm(true)}
          >
            Add New Patient
          </button>
        </div>
        <div className="form-group">
          <div>
            <label className="label">
              Patient <span className="required">*</span>
            </label>
            <select
              className="select"
              style={billErrors.patientId ? { borderColor: "#dc3545" } : {}}
              value={newBill.patientId}
              onChange={(e) => setNewBill({ ...newBill, patientId: e.target.value })}
            >
              <option value="">Select Patient</option>
              {patients.map(p => (
                <option key={p.id} value={p.id}>{`${p.name} (UHID: ${p.uhid})`}</option>
              ))}
            </select>
            {billErrors.patientId && <div className="error">{billErrors.patientId}</div>}
          </div>
          <div>
            <label className="label">UHID</label>
            <input
              type="text"
              className="input"
              value={selectedPatient ? selectedPatient.uhid : ""}
              readOnly
            />
          </div>
          <div>
            <label className="label">Appointment ID</label>
            <input
              type="text"
              className="input"
              value={selectedPatient ? selectedPatient.appointmentId : ""}
              readOnly
            />
          </div>
          <div>
            <label className="label">Patient Category</label>
            <input
              type="text"
              className="input"
              value={selectedPatient ? selectedPatient.patientCategory : ""}
              readOnly
            />
          </div>
          <div>
            <label className="label">Consultation Fee (₹)</label>
            <input
              type="number"
              className="input"
              style={billErrors.consultationFee ? { borderColor: "#dc3545" } : {}}
              value={newBill.consultationFee}
              onChange={(e) => setNewBill({ ...newBill, consultationFee: e.target.value })}
              min="0"
              step="0.01"
              placeholder="Enter consultation fee"
            />
            {billErrors.consultationFee && <div className="error">{billErrors.consultationFee}</div>}
          </div>
          <div>
            <label className="label">Service / Facility</label>
            <select
              className="select"
              style={billErrors.service ? { borderColor: "#dc3545" } : {}}
              value={newBill.service}
              onChange={(e) => setNewBill({ ...newBill, service: e.target.value, serviceAmount: "" })}
            >
              <option value="">Select Service</option>
              {facilityOptions.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
            {billErrors.service && <div className="error">{billErrors.service}</div>}
          </div>
          <div>
            <label className="label">Custom Service (if not listed)</label>
            <input
              type="text"
              className="input"
              value={newBill.customService}
              onChange={(e) => setNewBill({ ...newBill, customService: e.target.value })}
              placeholder="Enter custom service"
            />
          </div>
          <div>
            <label className="label">Service Amount (₹)</label>
            <input
              type="number"
              className="input"
              style={billErrors.serviceAmount ? { borderColor: "#dc3545" } : {}}
              value={newBill.serviceAmount}
              onChange={(e) => setNewBill({ ...newBill, serviceAmount: e.target.value })}
              min="0"
              step="0.01"
              placeholder="Enter service amount"
            />
            {billErrors.serviceAmount && <div className="error">{billErrors.serviceAmount}</div>}
          </div>
          <div>
            <label className="label">Discount (₹)</label>
            <input
              type="number"
              className="input"
              style={billErrors.discount ? { borderColor: "#dc3545" } : {}}
              value={newBill.discount}
              onChange={(e) => setNewBill({ ...newBill, discount: e.target.value })}
              min="0"
              step="0.01"
              placeholder="Enter discount"
            />
            {billErrors.discount && <div className="error">{billErrors.discount}</div>}
          </div>
          <div style={{ gridColumn: "1 / -1", textAlign: "center" }}>
            <div className="total-amount">
              Total Amount: ₹{((parseFloat(newBill.consultationFee || 0) + parseFloat(newBill.serviceAmount || 0)) * (1 + tax / 100) - parseFloat(newBill.discount || 0)).toFixed(2)}
            </div>
            <button
              className="button primary-button"
              onClick={handleAddTransaction}
            >
              Generate Bill
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewBill;