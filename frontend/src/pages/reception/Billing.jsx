import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getActivePatients } from "../../redux/Slices/billingSlice";

const Billing = ({
  patients: patientsProp,
  billing = [],
  getTotalBilling = () => 0,
  clinicId: clinicIdProp,
}) => {
  const dispatch = useDispatch();

  const {
    activePatients = [],
    activePatientsLoading = false,
    activePatientsError = null,
    billingSettings = null,
  } = useSelector((state) => state.billing || {});

  const clinicId = clinicIdProp || billingSettings?.clinicId || null;

  const [overrides, setOverrides] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPatient, setCurrentPatient] = useState(null);

  const patients =
    Array.isArray(patientsProp) && patientsProp.length > 0
      ? patientsProp
      : activePatients;

  useEffect(() => {
    if (!clinicId) return;
    dispatch(getActivePatients(clinicId));
  }, [clinicId, dispatch]);

  // Format date safely
  const safeFormatDate = (raw) => {
    if (!raw || raw === "-") return "-";
    const parsed = new Date(raw);
    if (isNaN(parsed.getTime())) return raw;
    return parsed.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const resolveStatus = (p, override = {}) => {
    const billNum = override.billNumber ?? p.billNumber ?? "-";
    const total = override.totalAmount ?? p.totalAmount ?? 0;
    return billNum !== "-" || total > 0 ? "Paid" : "Unpaid";
  };

  // Open Modal with Patient Data
  const handleGenerateBill = (p) => {
    setCurrentPatient(p);
    setIsModalOpen(true);
  };

  // Handle Form Submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const billNumber = formData.get("billNumber");
    const paymentMethod = formData.get("paymentMethod");
    const totalAmount = Number(formData.get("totalAmount")) || 0;

    if (!billNumber) {
      alert("Please enter Bill Number");
      return;
    }

    const id = currentPatient.appointmentId || currentPatient.id;
    setOverrides((prev) => ({
      ...prev,
      [id]: {
        billNumber,
        paymentMethod,
        totalAmount,
        status: "Paid",
        dateTime: new Date().toISOString(),
      },
    }));

    alert(
      `Bill generated for ${currentPatient.patientName || currentPatient.name}\nBill No: ${billNumber}\nAmount: ₹${totalAmount}`
    );

    setIsModalOpen(false);
    setCurrentPatient(null);
  };

  // Close Modal
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentPatient(null);
  };

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
          margin-bottom: 15px;
        }
        .table {
          width: 100%;
          border-collapse: collapse;
        }
        .th,
        .td {
          border: 1px solid #ccc;
          padding: 8px;
          font-size: 13px;
          text-align: left;
        }
        .button {
          padding: 8px 12px;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          font-weight: 600;
          font-size: 13px;
          margin-right: 6px;
        }
        .green-button {
          background: #28a745;
          color: #fff;
        }
        .blue-button {
          background: #239eb9;
          color: #fff;
        }
        .badge {
          padding: 4px 8px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 700;
        }
        .badge.paid {
          background: rgba(40, 167, 69, 0.12);
          color: #1f7a37;
        }
        .badge.unpaid {
          background: rgba(220, 53, 69, 0.08);
          color: #c72b32;
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .modal-content {
          background: white;
          padding: 24px;
          border-radius: 12px;
          width: 90%;
          max-width: 500px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        }
        .modal-header {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 16px;
          color: #333;
        }
        .form-group {
          margin-bottom: 16px;
        }
        .form-label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 6px;
          color: #444;
        }
        .form-label small {
          color: #888;
          font-weight: normal;
        }
        .form-input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 14px;
        }
        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 20px;
        }
        .btn-cancel {
          background: #f8f9fa;
          color: #6c757d;
          border: 1px solid #ddd;
        }
        .btn-submit {
          background: #28a745;
          color: white;
        }
        .btn-cancel,
        .btn-submit {
          padding: 10px 16px;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
        }
      `}</style>

      <div className="card">
        <h2 className="section-title">Billing & Services</h2>

        <table className="table">
          <thead>
            <tr>
              <th className="th">Token #</th>
              <th className="th">Patient</th>
              <th className="th">Bill No</th>
              <th className="th">Total Amount</th>
              <th className="th">Discount</th>
              <th className="th">Services</th>
              <th className="th">Date</th>
              <th className="th">Payment Method</th>
              <th className="th">Status</th>
              <th className="th">Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients && patients.length > 0 ? (
              patients.map((p, idx) => {
                const id = p.appointmentId || p.id || `row-${idx}`;
                const override = overrides[id] ?? {};
                const tokenNumber = p.tokenNumber ?? p.token ?? "-";
                const name = (p.patientName || p.name || "-").trim();
                const billNumber = override.billNumber ?? p.billNumber ?? "-";
                const total =
                  override.totalAmount ??
                  p.totalAmount ??
                  (typeof getTotalBilling === "function" ? getTotalBilling(p.id) : 0);
                const discount = p.discount ?? 0;
                const services = Array.isArray(p.services)
                  ? p.services.map(s => s.name).join(", ")
                  : p.services ?? "-";
                const date = safeFormatDate(override.dateTime ?? p.dateTime ?? "-");
                const paymentMethod = override.paymentMethod ?? p.paymentMethod ?? "-";
                const status = resolveStatus(p, override);

                return (
                  <tr key={id}>
                    <td className="td">{tokenNumber}</td>
                    <td className="td">{name}</td>
                    <td className="td">{billNumber}</td>
                    <td className="td">₹{total}</td>
                    <td className="td">₹{discount}</td>
                    <td className="td">{services}</td>
                    <td className="td">{date}</td>
                    <td className="td">{paymentMethod}</td>
                    <td className="td">
                      <span className={`badge ${status.toLowerCase()}`}>{status}</span>
                    </td>
                    <td className="td">
                      <button className="button green-button" onClick={() => handleGenerateBill(p)}>
                        Generate Bill
                      </button>
                      <button
                        className="button blue-button"
                        onClick={() =>
                          alert(`Printing receipt for ${name} (Bill: ${billNumber})`)
                        }
                      >
                        Print/Share
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td className="td" colSpan="10" style={{ textAlign: "center" }}>
                  {activePatientsLoading ? "Loading patients..." : "No billing records"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Form */}
      {isModalOpen && currentPatient && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">Generate Bill</div>
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label className="form-label">
                  Patient Name <small>({currentPatient.patientName || currentPatient.name})</small>
                </label>
                <input
                  type="text"
                  value={currentPatient.patientName || currentPatient.name || ""}
                  disabled
                  className="form-input"
                  style={{ background: "#f9f9f9" }}
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  Bill Number <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  name="billNumber"
                  className="form-input"
                  defaultValue={`BILL-${Date.now().toString().slice(-6)}`}
                  required
                  placeholder="e.g. KU-BILL-2025-0002"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Payment Method</label>
                <select name="paymentMethod" className="form-input" defaultValue="cash">
                  <option value="cash">Cash</option>
                  <option value="card">Card</option>
                  <option value="upi">UPI</option>
                  <option value="bank_transfer">Bank Transfer</option>
                  <option value="insurance">Insurance</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Total Amount (₹) / कुल राशि <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="number"
                  name="totalAmount"
                  className="form-input"
                  defaultValue={
                    currentPatient.totalAmount ??
                    (typeof getTotalBilling === "function" ? getTotalBilling(currentPatient.id) : 0)
                  }
                  min="0"
                  step="1"
                  required
                />
                <small style={{ color: "#666" }}>
                  Current Calculated: ₹
                  {currentPatient.totalAmount ??
                    (typeof getTotalBilling === "function" ? getTotalBilling(currentPatient.id) : 0)}
                </small>
              </div>

              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  Generate Bill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

Billing.propTypes = {
  patients: PropTypes.array,
  billing: PropTypes.array,
  getTotalBilling: PropTypes.func,
  clinicId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Billing;