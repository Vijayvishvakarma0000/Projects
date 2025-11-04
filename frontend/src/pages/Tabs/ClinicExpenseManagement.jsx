// ClinicExpenseManagement.jsx
import React, { useState } from "react";

const ClinicExpenseManagement = () => {
  const [expenses, setExpenses] = useState({
    "Staff Expenses": [],
    "Clinic Overheads": [],
    "Medical Supplies": [],
    Maintenance: [],
    "Admin & Stationery": [],
    "Waste & Compliance": [],
    Marketing: [],
    Miscellaneous: [],
  });

  const [formData, setFormData] = useState({
    category: "",
    item: "",
    amount: "",
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddExpense = () => {
    const { category, item, amount, date } = formData;
    if (!category || !item || !amount || !date) {
      alert("Please fill in all fields!");
      return;
    }
    const newExpense = { item, amount: parseFloat(amount), date };
    setExpenses((prev) => ({
      ...prev,
      [category]: [...prev[category], newExpense],
    }));
    setFormData({ category: "", item: "", amount: "", date: "" });
  };

  const getTotal = (category) => {
    return expenses[category].reduce((acc, exp) => acc + exp.amount, 0);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Clinic Expense Management</h1>
      <p style={styles.subheading}>
        Manage and monitor all clinic expenses in one place.
      </p>

      {/* Expense Input Form */}
      <div style={styles.formSection}>
        <h2 style={styles.formTitle}>Add New Expense</h2>
        <div style={styles.form}>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="">Select Category</option>
            {Object.keys(expenses).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="item"
            placeholder="Expense Item (e.g. Electricity Bill)"
            value={formData.item}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="number"
            name="amount"
            placeholder="Amount (₹)"
            value={formData.amount}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            style={styles.input}
          />

          <button onClick={handleAddExpense} style={styles.button}>
            + Add Expense
          </button>
        </div>
      </div>

      {/* Expense Summary Cards */}
      <div style={styles.grid}>
        {Object.keys(expenses).map((category) => (
          <div key={category} style={styles.card}>
            <h2 style={styles.cardTitle}>{category}</h2>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Item</th>
                  <th style={styles.th}>Amount (₹)</th>
                  <th style={styles.th}>Date</th>
                </tr>
              </thead>
              <tbody>
                {expenses[category].length === 0 ? (
                  <tr>
                    <td colSpan="3" style={styles.empty}>
                      No expenses added yet
                    </td>
                  </tr>
                ) : (
                  expenses[category].map((exp, i) => (
                    <tr key={i}>
                      <td style={styles.td}>{exp.item}</td>
                      <td style={styles.td}>{exp.amount.toFixed(2)}</td>
                      <td style={styles.td}>{exp.date}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <div style={styles.totalBox}>
              <strong>Total: ₹{getTotal(category).toFixed(2)}</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// INTERNAL STYLES
const styles = {
  container: {
    padding: "50px 8%",
    backgroundColor: "#f5f6fa",
    fontFamily: "'Poppins', sans-serif",
    minHeight: "100vh",
  },
  heading: {
    textAlign: "center",
    fontSize: "32px",
    fontWeight: "700",
    color: "#2c3e50",
    marginBottom: "10px",
  },
  subheading: {
    textAlign: "center",
    color: "#555",
    marginBottom: "30px",
  },
  formSection: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    marginBottom: "40px",
  },
  formTitle: {
    fontSize: "20px",
    marginBottom: "15px",
    color: "#0066cc",
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
  },
  input: {
    flex: "1 1 180px",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  button: {
    backgroundColor: "#0066cc",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "10px 16px",
    cursor: "pointer",
    transition: "background 0.3s",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    padding: "20px",
  },
  cardTitle: {
    fontSize: "18px",
    color: "#0066cc",
    borderBottom: "2px solid #0066cc",
    paddingBottom: "5px",
    marginBottom: "10px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    textAlign: "left",
    padding: "8px",
    borderBottom: "1px solid #ddd",
    color: "#333",
  },
  td: {
    padding: "8px",
    borderBottom: "1px solid #eee",
    fontSize: "14px",
  },
  empty: {
    textAlign: "center",
    color: "#888",
    padding: "10px 0",
  },
  totalBox: {
    textAlign: "right",
    marginTop: "10px",
    color: "#2c3e50",
  },
};

export default ClinicExpenseManagement;
