import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addStaffApi, clearStaffMessage } from "../../redux/Slices/staffSlice";

const StaffManagement = ({
  clinicId,
  staffList,
  addStaff,
  updateStaff,
  updateStaffPermission,
  resetStaffPassword,
}) => {
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.staff || {});
  const [submittingIds, setSubmittingIds] = useState({});
  const [lastCreatedPasswords, setLastCreatedPasswords] = useState({});

  // Clear messages after 5 seconds
  useEffect(() => {
    if (message || error) {
      const timer = setTimeout(() => {
        dispatch(clearStaffMessage());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message, error, dispatch]);

  const handleSubmitStaff = async (staff) => {
    if (!clinicId) {
      alert("Cannot add staff: No clinic selected.");
      return;
    }

    if (!staff.name || !staff.phone) {
      alert("Name and phone are required.");
      return;
    }

    const tempId = staff.id || Math.random().toString(36).slice(2, 9);
    setSubmittingIds((s) => ({ ...s, [tempId]: true }));

    const payload = {
      clinicId,
      name: staff.name,
      phone: staff.phone,
      role: (staff.role || "receptionist").toLowerCase(),
      email: staff.email || undefined,
      permissions: {
        canViewPatients: !!(staff.permissions?.viewPatients ?? false),
        canEditBills: !!(staff.permissions?.editBills ?? false),
        canIssueCertificates: !!(staff.permissions?.issueCertificates ?? false),
      },
    };

    try {
      console.log("Submitting staff payload:", payload);
      const resultAction = await dispatch(addStaffApi(payload));
      if (addStaffApi.fulfilled.match(resultAction)) {
        const autoPassword = resultAction.payload?.autoPassword || "";
        setLastCreatedPasswords((p) => ({ ...p, [tempId]: autoPassword }));
        console.log("Staff created:", resultAction.payload);
        // Update local staff with server response
        if (resultAction.payload?.staff) {
          updateStaff(tempId, "id", resultAction.payload.staff._id);
          updateStaff(tempId, "name", resultAction.payload.staff.name);
          updateStaff(tempId, "phone", resultAction.payload.staff.phone);
          updateStaff(tempId, "role", resultAction.payload.staff.role);
          updateStaff(tempId, "email", resultAction.payload.staff.email || "");
          updateStaff(tempId, "autoPassword", autoPassword);
          updateStaffPermission(
            tempId,
            "viewPatients",
            resultAction.payload.staff.permissions?.canViewPatients || false
          );
          updateStaffPermission(
            tempId,
            "editBills",
            resultAction.payload.staff.permissions?.canEditBills || false
          );
          updateStaffPermission(
            tempId,
            "issueCertificates",
            resultAction.payload.staff.permissions?.canIssueCertificates || false
          );
        }
      } else {
        console.error("Failed to create staff:", resultAction.payload || resultAction.error);
        alert(
          "Failed to add staff: " +
            (resultAction.payload?.message || resultAction.error?.message || "Unknown error")
        );
      }
    } catch (err) {
      console.error("Dispatch error:", err);
      alert("Error while adding staff: " + err.message);
    } finally {
      setSubmittingIds((s) => ({ ...s, [tempId]: false }));
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
          margin-bottom: 12px;
        }
        .primary-button:hover {
          background: #3fa3b9;
          transform: translateY(-2px);
        }
        .staff-card {
          border: 1px solid #3fa3b9;
          padding: 16px;
          border-radius: 8px;
          margin-bottom: 16px;
          background-color: #f8fafc;
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
        .select {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          background-image: url("data:image/svg+xml;charset=US-ASCII,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'><path fill='%23186776' d='M2 0L0 2h4z'/></svg>");
          background-repeat: no-repeat;
          background-position: right 10px top 50%;
          background-size: 8px 10px;
        }
        .input:focus,
        .select:focus {
          border-color: #1d9ad6;
          box-shadow: 0 0 0 3px rgba(29, 154, 214, 0.2);
        }
        .input[readonly] {
          background-color: #e6f2f7;
          cursor: not-allowed;
        }
        .input-group {
          display: flex;
          gap: 8px;
          align-items: center;
        }
        .reset-button {
          background: #dc2626;
          color: white;
          padding: 12px 16px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          transition: background 0.3s, transform 0.2s;
        }
        .reset-button:hover {
          background: #b91c1c;
          transform: translateY(-2px);
        }
        .permissions {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .checkbox-label {
          font-size: 0.9rem;
          color: #186476;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .submit-btn {
          background: #0f766e;
          color: white;
          padding: 10px 14px;
          border-radius: 8px;
          border: none;
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

      <h2 className="section-title">👥 Staff Management</h2>
      {message && <div className="message success">{message}</div>}
      {error && <div className="message error">{error}</div>}
      <button onClick={addStaff} className="button primary-button">
        + Add New Staff
      </button>

      {staffList.length === 0 && (
        <div className="message">No staff members found. Add a new staff member to get started.</div>
      )}

      {staffList.map((staff) => {
        const tempId = staff.id || staff._id || Math.random().toString(36).slice(2, 9);
        return (
          <div className="staff-card" key={tempId}>
            <div className="form-group">
              <div>
                <label className="label">Name</label>
                <input
                  type="text"
                  value={staff.name || ""}
                  onChange={(e) => updateStaff(staff.id, "name", e.target.value)}
                  className="input"
                />
              </div>
              <div>
                <label className="label">Password</label>
                <input
                  type="text"
                  value={lastCreatedPasswords[tempId] || staff.autoPassword || ""}
                  readOnly
                  className="input"
                />
              </div>
              <div>
                <label className="label">Phone</label>
                <input
                  type="text"
                  value={staff.phone || staff.contact || ""}
                  onChange={(e) => updateStaff(staff.id, "phone", e.target.value)}
                  className="input"
                />
              </div>
              <div>
                <label className="label">Role</label>
                <select
                  value={staff.role || "receptionist"}
                  onChange={(e) => updateStaff(staff.id, "role", e.target.value)}
                  className="select"
                >
                  <option value="receptionist">Receptionist</option>
                  <option value="nurse">Nurse</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div>
                <label className="label">Permissions</label>
                <div className="permissions">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={!!(staff.permissions?.viewPatients)}
                      onChange={(e) =>
                        updateStaffPermission(staff.id, "viewPatients", e.target.checked)
                      }
                    />
                    View Patients
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={!!(staff.permissions?.editBills)}
                      onChange={(e) =>
                        updateStaffPermission(staff.id, "editBills", e.target.checked)
                      }
                    />
                    Edit Bills
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={!!(staff.permissions?.issueCertificates)}
                      onChange={(e) =>
                        updateStaffPermission(staff.id, "issueCertificates", e.target.checked)
                      }
                    />
                    Issue Certificates
                  </label>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 8 }}>
                <button
                  className="submit-btn"
                  onClick={() => handleSubmitStaff(staff)}
                  disabled={submittingIds[tempId] || loading}
                  type="button"
                >
                  {submittingIds[tempId] || loading ? "Submitting..." : "Submit"}
                </button>
                <button
                  className="reset-button"
                  onClick={() => resetStaffPassword(staff.id)}
                  type="button"
                >
                  Reset Password
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default StaffManagement;