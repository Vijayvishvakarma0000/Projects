import React from "react";

const FinanceSummary = ({ billing, expenses, handleAddExpense, totalIncome, totalExpenses }) => {
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

        .button {
          padding: 12px 24px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 600;
          transition: background 0.3s, transform 0.2s;
        }

        .secondary-button {
          background: #6c757d;
          color: white;
        }

        .secondary-button:hover {
          background: #5a6268;
          transform: translateY(-2px);
        }

        .summary {
          margin-bottom: 20px;
        }

        .summary-p {
          margin: 8px 0;
          font-size: 1rem;
          color: #2c3e50;
        }

        .summary-p strong {
          color: #186476;
        }

        @media (max-width: 768px) {
          .card {
            padding: 24px 16px;
          }
        }
      `}</style>

      <div className="card">
        <h2 className="section-title">💰 Finance Summary</h2>
        <div className="summary">
          <p className="summary-p">
            <strong>Daily Collection:</strong> ₹{billing.filter(t => t.date === new Date().toISOString().split("T")[0]).reduce((sum, t) => sum + t.amount, 0).toFixed(2)}
          </p>
          <p className="summary-p">
            <strong>Monthly Income:</strong> ₹{billing.filter(t => t.date.startsWith(new Date().toISOString().slice(0, 7))).reduce((sum, t) => sum + t.amount, 0).toFixed(2)}
          </p>
          <p className="summary-p">
            <strong>Total Expenses:</strong> ₹{totalExpenses.toFixed(2)}
          </p>
          <p className="summary-p">
            <strong>Net Balance:</strong> ₹{(totalIncome - totalExpenses).toFixed(2)}
          </p>
        </div>
        <h3 className="section-title">Add Expense</h3>
        <div className="form-group-vertical">
          <label className="label">Expense Amount (₹)</label>
          <input
            type="number"
            className="input"
            id="expAmount"
            placeholder="Enter expense amount"
            min="0"
            step="0.01"
          />
          <label className="label">Expense Description</label>
          <input
            type="text"
            className="input"
            id="expDesc"
            placeholder="Enter expense description"
          />
          <button
            className="button secondary-button"
            onClick={() => handleAddExpense(
              document.getElementById("expAmount").value,
              document.getElementById("expDesc").value
            )}
          >
            Add Expense
          </button>
        </div>
      </div>
    </>
  );
};

export default FinanceSummary;