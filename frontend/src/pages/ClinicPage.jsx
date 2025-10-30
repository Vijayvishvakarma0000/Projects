import React, { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import DoctorSidebar from "./DoctorSidebar";
import ClinicProfile from "./Tabs/ClinicProfile";
import DoctorDetails from "./Tabs/DoctorDetails";
import LicensesCompliance from "./Tabs/LicensesCompliance";
import Preferences from "./Tabs/Preferences";
import PrescriptionCertificates from "./Tabs/PrescriptionCertificates";
import BillingCommunication from "./Tabs/BillingCommunication";
import StaffManagement from "./Tabs/StaffManagement";
import {
  fetchClinicById,
  updateClinic,
  clearMessage,
} from "../redux/Slices/clinicSlice";
import { setStaffList } from "../redux/Slices/staffSlice";
import { logout } from "../redux/Slices/authSlice";

const ClinicPage = () => {
  const [activeTab, setActiveTab] = useState("clinic");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const params = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { currentClinic, loading: clinicLoading, error: clinicError, message: clinicMessage } = useSelector(
    (state) => state.clinic
  );
  const { staffList, loading: staffLoading, error: staffError, message: staffMessage } = useSelector(
    (state) => state.staff
  );
  const { accessToken } = useSelector((state) => state.auth);

  const storedToken =
    accessToken || localStorage.getItem("accessToken") || null;

  const query = new URLSearchParams(location.search);
  const clinicIdFromQuery = query.get("clinicId") || null;
  const clinicIdFromParams = params.clinicId || null;
  const clinicIdFromLocal = localStorage.getItem("selectedClinicId") || null;
  const clinicId = clinicIdFromQuery || clinicIdFromParams || clinicIdFromLocal;

  useEffect(() => {
    console.log("🔍 ClinicPage - Clinic ID:", clinicId);
    console.log("🔍 ClinicPage - Token (store|local):", accessToken, storedToken);

    if (!storedToken) {
      console.warn("No token found. Redirecting to signin.");
      alert("No authentication token found. Please sign in.");
      navigate("/signin");
      return;
    }

    if (!clinicId) {
      console.error("No clinicId provided.");
      alert("No clinic selected. Please select a clinic from Clinic Management.");
      navigate("/clinic-management");
      return;
    }

    dispatch(clearMessage());
    dispatch(fetchClinicById(clinicId))
      .unwrap()
      .then((response) => {
        console.log("✅ Clinic data fetched:", response);
        console.log("consultingHours:", response.clinic?.consultingHours);
        localStorage.setItem("selectedClinicId", clinicId);
        // Initialize empty staffList
        dispatch(setStaffList([]));
      })
      .catch((err) => {
        console.error("❌ Failed to fetch clinic:", err);
        alert(`Failed to load clinic data: ${err}`);
      });
  }, [clinicId, storedToken, dispatch, navigate]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSave = (updatedClinicData) => {
    if (!clinicId || !updatedClinicData) {
      alert("Cannot save: No clinic selected or data unavailable.");
      return;
    }

    const formData = new FormData();
    for (const key in updatedClinicData) {
      const value = updatedClinicData[key];
      if (key === "consultingHours") {
        value.forEach((hour, index) => {
          formData.append(`consultingHours[${index}][day]`, hour.day || "");
          formData.append(`consultingHours[${index}][hours]`, hour.hours || "");
        });
      } else if (value instanceof File) {
        formData.append(key, value);
      } else if (typeof value === "object" && value !== null) {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value);
      }
    }

    dispatch(updateClinic({ clinicId, clinicData: formData }))
      .unwrap()
      .then(() => {
        console.log("✅ Clinic updated successfully");
        alert("✅ All Clinic Data Saved!");
      })
      .catch((err) => {
        console.error("Update failed:", err);
        alert(`Failed to update clinic: ${err}`);
      });
  };

  // Staff management functions
  const addStaff = () => {
    if (!currentClinic?._id) {
      alert("Cannot add staff: No clinic selected.");
      return;
    }
    const newStaff = {
      id: `${Date.now()}`, // Temporary ID
      name: "",
      username: "",
      phone: "",
      role: "receptionist",
      permissions: {
        viewPatients: false,
        editBills: false,
        issueCertificates: false,
      },
      clinicId: currentClinic._id,
    };
    dispatch(setStaffList([...staffList, newStaff]));
  };

  const updateStaff = (id, field, value) => {
    dispatch(
      setStaffList(
        staffList.map((staff) =>
          staff.id === id ? { ...staff, [field]: value } : staff
        )
      )
    );
  };

  const updateStaffPermission = (id, permission, value) => {
    dispatch(
      setStaffList(
        staffList.map((staff) =>
          staff.id === id
            ? {
                ...staff,
                permissions: { ...staff.permissions, [permission]: value },
              }
            : staff
        )
      )
    );
  };

  const resetStaffPassword = (id) => {
    dispatch(
      setStaffList(
        staffList.map((staff) =>
          staff.id === id ? { ...staff, password: "********" } : staff
        )
      )
    );
    alert(`Password reset for staff ID: ${id}`);
  };

  if (clinicLoading && !currentClinic) {
    return <div className="loading">Loading clinic data...</div>;
  }

  if (clinicError) {
    return (
      <div className="error">
        Error: {clinicError}
        <button onClick={() => navigate("/clinic-management")}>
          Return to Clinic Management
        </button>
      </div>
    );
  }

  if (!currentClinic) {
    return (
      <div className="no-data">
        No clinic data available. Please select a clinic.
        <button onClick={() => navigate("/clinic-management")}>
          Select Clinic
        </button>
      </div>
    );
  }

  return (
    <div className="layout">
      {isSidebarOpen && <DoctorSidebar />}
      <main className="page" aria-label="Clinic Admin Dashboard">
        <button
          className="toggle-button"
          type="button"
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
        >
          <FaBars size={16} />
        </button>
        <h1>🏥 Clinic Admin Dashboard</h1>
        <div className="status-messages">
          {clinicMessage && (
            <p style={{ color: "green", textAlign: "center" }}>{clinicMessage}</p>
          )}
          {clinicError && (
            <p style={{ color: "red", textAlign: "center" }}>{clinicError}</p>
          )}
          {staffMessage && (
            <p style={{ color: "green", textAlign: "center" }}>{staffMessage}</p>
          )}
          {staffError && (
            <p style={{ color: "red", textAlign: "center" }}>{staffError}</p>
          )}
        </div>
        <div className="tab-container">
          {[
            { id: "clinic", label: "Clinic Profile" },
            { id: "doctor", label: "Doctor Details" },
            { id: "staff", label: "Staff Management" },
            { id: "licenses", label: "Licenses & Compliance" },
            { id: "preferences", label: "Preferences" },
            { id: "prescription", label: "Prescription & Certificates" },
            { id: "billing", label: "Billing & Communication" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
              aria-label={`Switch to ${tab.label} tab`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="card">
          {activeTab === "clinic" && (
            <ClinicProfile clinicData={currentClinic} onSave={handleSave} />
          )}
          {activeTab === "doctor" && (
            <DoctorDetails clinicData={currentClinic} onSave={handleSave} />
          )}
          {activeTab === "licenses" && (
            <LicensesCompliance
              licenses={currentClinic?.licenses || {}}
              onSave={handleSave}
            />
          )}
          {activeTab === "preferences" && (
            <Preferences clinicData={currentClinic} onSave={handleSave} />
          )}
          {activeTab === "prescription" && (
            <PrescriptionCertificates
              clinicData={currentClinic}
              onSave={handleSave}
            />
          )}
          {activeTab === "billing" && (
            <BillingCommunication
              clinicData={currentClinic}
              onSave={handleSave}
            />
          )}
          {activeTab === "staff" && (
            <StaffManagement
              clinicId={currentClinic?._id}
              staffList={staffList}
              addStaff={addStaff}
              updateStaff={updateStaff}
              updateStaffPermission={updateStaffPermission}
              resetStaffPassword={resetStaffPassword}
            />
          )}
        </div>
      </main>
      <style jsx>{`
        .layout {
          display: flex;
          min-height: 100vh;
          overflow: hidden;
        }
        .page {
          padding: 40px 24px;
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(to right, #f8fbfd, #eef6fa);
          color: #2c3e50;
          min-height: 90vh;
          transition: margin-left 0.3s ease;
          margin-left: ${isSidebarOpen ? "250px" : "0"};
          width: 100%;
        }
        .toggle-button {
          position: fixed;
          top: 20px;
          right: 20px;
          background: #186476;
          color: white;
          border: none;
          border-radius: 8px;
          padding: 10px;
          cursor: pointer;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
        .toggle-button:hover {
          background: #3fa3b9;
        }
        h1 {
          font-size: 2.5rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 60px;
          color: #03678f;
          letter-spacing: 0.03em;
          text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.08);
        }
        .status-messages {
          margin-bottom: 20px;
        }
        .tab-container {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          justify-content: center;
          margin-bottom: 40px;
        }
        .tab-button {
          padding: 12px 24px;
          background: #e6f7fa;
          color: #186476;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.3s, transform 0.2s;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .tab-button.active {
          background: #186476;
          color: white;
        }
        .tab-button:hover {
          background: #3fa3b9;
          color: white;
          transform: translateY(-2px);
        }
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
        .loading,
        .error,
        .no-data {
          text-align: center;
          padding: 20px;
          font-size: 1.2rem;
          color: #186476;
        }
        .error {
          color: red;
        }
        .error button,
        .no-data button {
          margin-top: 10px;
          padding: 10px 20px;
          background: #186476;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
        }
        .error button:hover,
        .no-data button:hover {
          background: #3fa3b9;
        }
        @media (max-width: 768px) {
          .page {
            margin-left: 0;
            padding: 24px 16px;
          }
          h1 {
            font-size: 2.2rem;
            margin-bottom: 40px;
          }
          .toggle-button {
            left: 10px;
            top: 10px;
          }
          .tab-container {
            flex-direction: column;
            align-items: center;
          }
          .tab-button {
            width: 100%;
            text-align: center;
          }
          .card {
            padding: 24px 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default ClinicPage;