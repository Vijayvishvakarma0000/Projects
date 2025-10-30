import React from "react";

const NewBill = ({ newBill, setNewBill, billErrors, patients, facilityOptions, handleAddTransaction }) => {
  return (
    <>
      <style jsx>{`
        .card {
          background: #fff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          margin-bottom: 20px;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }

        .section-title {
          font-size: 20px;
          font-weight: bold;
          color: #333;
          margin-bottom: 15px;
        }

        .form-group {
          display: grid;
          gap: 1rem;
          grid-template-columns: 1fr 1fr;
          margin-bottom: 20px;
        }

        .label {
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #333;
          font-size: 14px;
          display: block;
        }

        .required {
          color: #dc3545;
          font-size: 12px;
          margin-left: 5px;
        }

        .input,
        .select {
          padding: 10px;
          border-radius: 6px;
          border: 1px solid #d1d5db;
          width: 100%;
          font-size: 14px;
          background: #f9fafb;
          transition: border-color 0.3s;
          box-sizing: border-box;
        }

        .input:focus,
        .select:focus {
          border-color: #186476;
          outline: none;
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
          font-size: 12px;
          margin-top: 0.3rem;
        }

        .button {
          padding: 10px 20px;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          font-weight: 600;
          font-size: 14px;
          transition: background 0.3s, transform 0.1s;
        }

        .button:hover {
          transform: scale(1.05);
        }

        .green-button {
          background: #28a745;
          color: #fff;
        }

        .total-amount {
          font-size: 16px;
          font-weight: bold;
          color: #186476;
          margin-top: 10px;
          text-align: center;
        }

        @media (max-width: 768px) {
          .form-group {
            grid-template-columns: 1fr;
          }
          .card {
            padding: 15px;
          }
        }
      `}</style>

      <div className="card">
        <h2 className="section-title">➕ New Bill</h2>
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
            <label className="label">
              Consultation Fee (₹)
            </label>
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
            <label className="label">
              Service / Facility
            </label>
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
            <label className="label">
              Custom Service (if not listed)
            </label>
            <input
              type="text"
              className="input"
              value={newBill.customService}
              onChange={(e) => setNewBill({ ...newBill, customService: e.target.value })}
              placeholder="Enter custom service"
            />
          </div>
          <div>
            <label className="label">
              Service Amount (₹)
            </label>
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
            <label className="label">
              Discount (₹)
            </label>
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
              Total Amount: ₹{(parseFloat(newBill.consultationFee || 0) + parseFloat(newBill.serviceAmount || 0) - parseFloat(newBill.discount || 0)).toFixed(2)}
            </div>
            <button
              className="button green-button"
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