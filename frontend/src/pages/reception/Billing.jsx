import React from "react";

const Billing = ({ patients, billing, getTotalBilling }) => {
  return (
    <>
      <style jsx>{`
        .card {
          background: #fff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          margin-bottom: 20px;
        }

        .section-title {
          font-size: 20px;
          font-weight: bold;
          color: #333;
          margin-bottom: 15px;
        }

        .table {
          width: 100%;
          border-collapse: collapse;
        }

        .th {
          border: 1px solid #ccc;
          padding: 8px;
          background: #e9ecef;
          text-align: left;
          font-size: 14px;
        }

        .td {
          border: 1px solid #ccc;
          padding: 8px;
          font-size: 14px;
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

        .blue-button {
          background: #239eb9;
          color: #fff;
        }

        @media (max-width: 768px) {
          .table {
            display: block;
            overflow-x: auto;
            white-space: nowrap;
          }
          .card {
            padding: 15px;
          }
        }
      `}</style>

      <div className="card">
        <h2 className="section-title">Billing & Services</h2>
        <table className="table">
          <thead>
            <tr>
              <th className="th">Token #</th>
              <th className="th">Patient</th>
              <th className="th">Total Amount</th>
              <th className="th">Discount</th>
              <th className="th">Services / Facilities</th>
              <th className="th">Date</th>
              <th className="th">Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.length > 0 ? patients.map(p => {
              const patientBilling = billing.filter(b => b.patientId === p.id);
              const total = getTotalBilling(p.id);
              const totalDiscount = patientBilling.reduce((sum, b) => sum + b.discount, 0);
              const services = patientBilling.flatMap(b => b.details);
              const dates = patientBilling.map(b => b.date).join(", ");
              return (
                <tr key={p.id}>
                  <td className="td">{p.id}</td>
                  <td className="td">{p.name}</td>
                  <td className="td">₹{total}</td>
                  <td className="td">₹{totalDiscount}</td>
                  <td className="td">{services.length > 0 ? services.join(", ") : "-"}</td>
                  <td className="td">{dates || "-"}</td>
                  <td className="td">
                    <button
                      className="button blue-button"
                      onClick={() => alert(`Receipt Printed/Shared for ${p.name}: ₹${total} after ₹${totalDiscount} discount`)}
                    >
                      Print/Share
                    </button>
                  </td>
                </tr>
              );
            }) : <tr><td colSpan="7" className="td" style={{ textAlign: "center" }}>No billing records</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Billing;