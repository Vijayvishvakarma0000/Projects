import React from "react";

const Receipts = ({ billing, patients, openReceipt }) => {
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

        .table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }

        .th {
          border: 1px solid #e6f2f7;
          padding: 12px;
          background: #186476;
          color: white;
          text-align: center;
          font-weight: 600;
        }

        .td {
          border: 1px solid #e6f2f7;
          padding: 12px;
          text-align: center;
          color: #2c3e50;
        }

        .link-button {
          background: none;
          border: none;
          color: #186476;
          cursor: pointer;
          text-decoration: underline;
          font-size: 1rem;
        }

        .link-button:hover {
          color: #3fa3b9;
        }

        @media (max-width: 768px) {
          .card {
            padding: 24px 16px;
          }
          .table {
            display: block;
            overflow-x: auto;
            white-space: nowrap;
          }
        }
      `}</style>

      <div className="card">
        <h2 className="section-title">🧾 Receipts</h2>
        <table className="table">
          <thead>
            <tr>
              <th className="th">Date</th>
              <th className="th">Patient</th>
              <th className="th">UHID</th>
              <th className="th">Total</th>
              <th className="th">Receipt</th>
            </tr>
          </thead>
          <tbody>
            {billing.map((t) => (
              <tr key={t.id}>
                <td className="td">{t.date}</td>
                <td className="td">{patients.find(p => p.id === t.patientId)?.name || "Unknown"}</td>
                <td className="td">{patients.find(p => p.id === t.patientId)?.uhid || "N/A"}</td>
                <td className="td">₹{t.amount.toFixed(2)}</td>
                <td className="td">
                  <button className="link-button" onClick={() => openReceipt(t)}>
                    View / Print
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Receipts;