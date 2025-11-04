import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addStaffApi,
  clearStaffMessage,
  getSpecificClinicStaffApi,
  resetStaffPasswordApi,
  updateStaffDetailsApi,
} from "../../redux/Slices/staffSlice";

const StaffManagement = ({
  clinicId,
  staffList,
  addStaff,
  updateStaff,
  updateStaffPermission,
  resetStaffPassword,
}) => {
  const dispatch = useDispatch();
  const { loading, error, message, staffList: reduxStaffList } = useSelector((state) => state.staff || {});
  const [submittingIds, setSubmittingIds] = useState({});
  const [updatedPasswords, setUpdatedPasswords] = useState({}); // Store updated passwords

  // Clear messages after 5 seconds
  useEffect(() => {
    if (message || error) {
      const timer = setTimeout(() => {
        dispatch(clearStaffMessage());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message, error, dispatch]);

  // Fetch staff data when component mounts
  useEffect(() => {
    dispatch(getSpecificClinicStaffApi());
  }, [dispatch]);

  // Use staffList from props if available, otherwise use from Redux
  const displayStaffList = staffList && staffList.length > 0 ? staffList : reduxStaffList;

  const handleResetPassword = async (staffId) => {
    if (!staffId) {
      alert("Staff ID is required to reset password.");
      return;
    }
    if (!clinicId) {
      alert("Clinic ID is required to reset password.");
      return;
    }

    try {
      // Pass both staffId and clinicId as an object
      const result = await dispatch(
        resetStaffPasswordApi({ staffId, clinicId })
      ).unwrap();

      if (result.autoPassword) {
        // Store the new password in state
        setUpdatedPasswords((prev) => ({
          ...prev,
          [staffId]: result.autoPassword,
        }));

        alert(`Password reset successful! New Password: ${result.autoPassword}`);

        // Refresh staff list to get updated data
        dispatch(getSpecificClinicStaffApi());
      } else {
        alert("Password reset failed: No new password generated");
      }
    } catch (err) {
      console.error("Error resetting password:", err);
      alert(`Failed to reset password: ${err.message || "Unknown error"}`);
    }
  };

  const handleUpdateStaff = (staff) => {
    const staffId = staff.id || staff._id;

    if (!staffId || !clinicId) {
      alert("Staff ID and Clinic ID are required.");
      return;
    }

    const permissions = {
      canViewPatients: !!(staff.permissions?.viewPatients ?? staff.permissions?.canViewPatients ?? false),
      canEditBills: !!(staff.permissions?.editBills ?? staff.permissions?.canEditBills ?? false),
      canIssueCertificates: !!(staff.permissions?.issueCertificates ?? staff.permissions?.canIssueCertificates ?? false),
    };

    dispatch(updateStaffDetailsApi({ staffId, clinicId, permissions }))
      .unwrap()
      .then(() => {
        alert("Staff details updated successfully!");
        // Refresh staff list
        dispatch(getSpecificClinicStaffApi());
      })
      .catch((err) => {
        console.error("Error updating staff:", err);
        alert(`Failed to update staff: ${err.message || "Unknown error"}`);
      });
  };

  const handleSubmitStaff = async (staff) => {
    if (!clinicId) {
      alert("Cannot add staff: No clinic selected.");
      return;
    }

    if (!staff.name || !staff.phone) {
      alert("Name and phone are required.");
      return;
    }

    const tempId = staff.id || staff._id || Math.random().toString(36).slice(2, 9);
    setSubmittingIds((s) => ({ ...s, [tempId]: true }));

    const payload = {
      clinicId,
      name: staff.name,
      phone: staff.phone,
      role: (staff.role || "receptionist").toLowerCase(),
      permissions: {
        canViewPatients: !!(staff.permissions?.viewPatients ?? staff.permissions?.canViewPatients ?? false),
        canEditBills: !!(staff.permissions?.editBills ?? staff.permissions?.canEditBills ?? false),
        canIssueCertificates: !!(staff.permissions?.issueCertificates ?? staff.permissions?.canIssueCertificates ?? false),
      },
    };

    try {
      console.log("Submitting staff payload:", payload);
      const resultAction = await dispatch(addStaffApi(payload));
      if (addStaffApi.fulfilled.match(resultAction)) {
        console.log("Staff created:", resultAction.payload);

        // Store the auto-generated password
        if (resultAction.payload?.autoPassword) {
          const newStaffId = resultAction.payload.staff?._id;
          if (newStaffId) {
            setUpdatedPasswords((prev) => ({
              ...prev,
              [newStaffId]: resultAction.payload.autoPassword,
            }));
          }
        }

        // Refresh staff list after adding new staff
        dispatch(getSpecificClinicStaffApi());

        // Update local staff with server response if updateStaff function exists
        if (resultAction.payload?.staff && updateStaff) {
          const newStaffId = resultAction.payload.staff._id;
          updateStaff(tempId, "id", newStaffId);
          updateStaff(tempId, "name", resultAction.payload.staff.name);
          updateStaff(tempId, "phone", resultAction.payload.staff.phone);
          updateStaff(tempId, "role", resultAction.payload.staff.role);
          updateStaff(tempId, "autoPassword", resultAction.payload.autoPassword);
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

  // Function to get password for a staff member
  const getStaffPassword = (staff) => {
    const staffId = staff.id || staff._id;

    // First check updated passwords (for reset/new staff)
    if (updatedPasswords[staffId]) {
      return updatedPasswords[staffId];
    }

    // Then check staff object directly
    if (staff.autoPassword) {
      return staff.autoPassword;
    }

    // Then check from redux staff list
    const reduxStaff = reduxStaffList.find((s) => s._id === staffId);
    if (reduxStaff?.autoPassword) {
      return reduxStaff.autoPassword;
    }

    return "Password will be generated after submission";
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
          background-color: #e6fafc;
          cursor: not-allowed;
          font-weight: 600;
          color: #dc2626;
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
        .update-button {
          background: #0f766e;
          color: white;
          padding: 12px 16px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          transition: background 0.3s, transform 0.2s;
        }
        .update-button:hover {
          background: #0d9488;
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
          background: #1d4ed8;
          color: white;
          padding: 10px 14px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          font-weight: 600;
          opacity: ${loading ? 0.6 : 1};
          pointer-events: ${loading ? "none" : "auto"};
        }
        .submit-btn:hover {
          background: #1e40af;
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
        .password-field {
          position: relative;
        }
        .copy-password {
          position: absolute;
          right: 8px;
          top: 50%;
          transform: translateY(-50%);
          background: #186476;
          color: white;
          border: none;
          border-radius: 4px;
          padding: 4px 8px;
          font-size: 0.8rem;
          cursor: pointer;
        }
        .copy-password:hover {
          background: #3fa3b9;
        }
        .button-group {
          display: flex;
          gap: 8px;
          align-items: center;
          margin-top: 8px;
          flex-wrap: wrap;
        }
        .new-password-badge {
          background: #dc2626;
          color: white;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 0.7rem;
          margin-left: 8px;
        }
      `}</style>

      <h2 className="section-title">👥 Staff Management</h2>
      {message && <div className="message success">{message}</div>}
      {error && <div className="message error">{error}</div>}
      <button onClick={addStaff} className="button primary-button">
        + Add New Staff
      </button>

      {displayStaffList.length === 0 && !loading && (
        <div className="message">No staff members found. Add a new staff member to get started.</div>
      )}

      {loading && (
        <div className="message">Loading staff data...</div>
      )}

      {displayStaffList.map((staff) => {
        const tempId = staff.id || staff._id;
        const staffPassword = getStaffPassword(staff);
        const isNewPassword = updatedPasswords[tempId];

        return (
          <div className="staff-card" key={tempId}>
            <div className="form-group">
              <div>
                <label className="label">Name</label>
                <input
                  type="text"
                  value={staff.name || ""}
                  onChange={(e) => updateStaff && updateStaff(staff.id || staff._id, "name", e.target.value)}
                  className="input"
                />
              </div>
              <div className="password-field">
                <label className="label">
                  Password 
                  {isNewPassword && <span className="new-password-badge">NEW</span>}
                </label>
                <input
                  type="text"
                  value={staffPassword}
                  readOnly
                  className="input"
                />
                {staffPassword && staffPassword !== "Password will be generated after submission" && (
                  <button 
                    className="copy-password"
                    onClick={() => {
                      navigator.clipboard.writeText(staffPassword);
                      alert('Password copied to clipboard!');
                    }}
                  >
                    Copy
                  </button>
                )}
              </div>
              <div>
                <label className="label">Phone</label>
                <input
                  type="text"
                  value={staff.phone || staff.contact || ""}
                  onChange={(e) => updateStaff && updateStaff(staff.id || staff._id, "phone", e.target.value)}
                  className="input"
                />
              </div>
              <div>
                <label className="label">Role</label>
                <select
                  value={staff.role || "receptionist"}
                  onChange={(e) => updateStaff && updateStaff(staff.id || staff._id, "role", e.target.value)}
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
                      checked={!!(staff.permissions?.viewPatients ?? staff.permissions?.canViewPatients)}
                      onChange={(e) =>
                        updateStaffPermission && updateStaffPermission(staff.id || staff._id, "viewPatients", e.target.checked)
                      }
                    />
                    View SNIP
View Patients
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={!!(staff.permissions?.editBills ?? staff.permissions?.canEditBills)}
                      onChange={(e) =>
                        updateStaffPermission && updateStaffPermission(staff.id || staff._id, "editBills", e.target.checked)
                      }
                    />
                    Edit Bills
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={!!(staff.permissions?.issueCertificates ?? staff.permissions?.canIssueCertificates)}
                      onChange={(e) =>
                        updateStaffPermission && updateStaffPermission(staff.id || staff._id, "issueCertificates", e.target.checked)
                      }
                    />
                    Issue Certificates
                  </label>
                </div>
              </div>
              <div className="button-group">
                <button
                  className="submit-btn"
                  onClick={() => handleSubmitStaff(staff)}
                  disabled={submittingIds[tempId] || loading}
                  type="button"
                >
                  {submittingIds[tempId] || loading ? "Submitting..." : "Add Staff"}
                </button>
                <button
                  className="update-button"
                  onClick={() => handleUpdateStaff(staff)}
                  type="button"
                >
                  Update Staff
                </button>
                <button
                  className="reset-button"
                  onClick={() => handleResetPassword(staff.id || staff._id)}
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