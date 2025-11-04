import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  registerPatient,
  fetchDailyCalendar,
  fetchPatients,
} from "../redux/Slices/receptionSlice";
import AddPatientForm from "../pages/reception/AddPatientForm";
import DoctorSidebar from "../pages/DoctorSidebar";
import Dashboard from "../pages/reception/Dashboard";
import PatientManagement from "../pages/reception/PatientManagement";
import Appointments from "./reception/Appointments";
import Billing from "../pages/reception/Billing";
import NewBill from "../pages/reception/NewBill";
import { logout } from "../redux/Slices/authSlice";

const ReceptionPage = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const reception = useSelector((state) => state.reception);

  // Initialize clinicId from localStorage if available
  const [clinicId, setClinicId] = useState(() => {
  const saved = localStorage.getItem("clinicId") || localStorage.getItem("selectedClinicId");
  return saved ? String(saved).trim() : "";
});
  // Sync clinicId from auth when auth changes (doctor login path)
  useEffect(() => {
    const idFromAuth =
      auth?.clinic?.id ||
      auth?.user?.clinicId ||
      auth?.user?.clinic?.id ||
      (Array.isArray(auth?.user?.clinics) && auth.user.clinics[0]?.id);

    if (idFromAuth) {
      const idStr = String(idFromAuth).trim();
      if (idStr && idStr !== clinicId) {
        console.log("✅ Syncing clinicId from auth:", idStr);
        setClinicId(idStr);
        try {
          localStorage.setItem("clinicId", idStr);
        } catch (e) {
          console.warn("Failed to persist clinicId:", e);
        }
      }
    } else {
      // fallback: maybe login flow just wrote localStorage
      const saved = localStorage.getItem("clinicId");
      if (saved && saved !== clinicId) {
        setClinicId(String(saved).trim());
      }
    }
  }, [auth]); // run when auth updates

  // Debug logs (remove in production)
  useEffect(() => {
    console.log("CLINIC DEBUG:", {
      localStorage: localStorage.getItem("clinicId"),
      redux: auth?.clinic?.id,
      userClinicId: auth?.user?.clinicId,
      state: clinicId,
    });
  }, [auth, clinicId]);

  // --- Redux Data ---
  const {
    patients = [],
    dailyCalendar = [],
    calendarLoading,
    calendarError,
    loading: patientLoading,
    error: patientError,
  } = reception;

  // --- Local UI States ---
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showPatientForm, setShowPatientForm] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [calendarView, setCalendarView] = useState("daily");
  const [selectedDate, setSelectedDate] = useState(() =>
    new Date().toISOString().slice(0, 10)
  );

  const [newBill, setNewBill] = useState({
    patientId: "",
    consultationFee: "",
    service: "",
    customService: "",
    serviceAmount: "",
    discount: "0",
  });
  const [billErrors, setBillErrors] = useState({});

  const [appointments, setAppointments] = useState([]);
  const [billing, setBilling] = useState([]);

  const facilityOptions = [
    "Consultation",
    "Lab Test",
    "Dressing",
    "Injection",
    "X-Ray",
    "ECG",
    "Pharmacy",
  ];

  // --- Fetch Patients ---
  // effect depends on clinicId and auth so it re-runs when either becomes available
  useEffect(() => {
    if (clinicId) {
      console.log("Fetching patients for clinic:", clinicId);
      dispatch(fetchPatients(clinicId));
    } else {
      console.log("No clinicId, skipping fetch");
    }
  }, [clinicId, auth, dispatch]);

  // --- Fetch Calendar (daily) ---
  useEffect(() => {
    if (clinicId) {
      const today = new Date().toISOString().split("T")[0];
      dispatch(fetchDailyCalendar({ date: today, clinicId }));
    }
  }, [dispatch, clinicId]);

  // Re-fetch when selectedDate changes
  useEffect(() => {
    if (clinicId && selectedDate) {
      dispatch(fetchDailyCalendar({ date: selectedDate, clinicId }));
    }
  }, [selectedDate, dispatch, clinicId]);

  // --- Register Patient ---
  const handleAddPatient = async (newPatientData) => {
    const payload = {
      clinicId: clinicId || newPatientData.clinicId,
      uhid: newPatientData.uhid || "",
      name: newPatientData.name || "",
      gender: newPatientData.gender || "",
      age: newPatientData.age ? Number(newPatientData.age) : undefined,
      phone: newPatientData.phone || newPatientData.mobile || "",
      address: newPatientData.address || "",
      category: newPatientData.category || "general",
      referredBy: newPatientData.referredBy,
      appointmentId: newPatientData.appointmentId,
    };

    try {
      const createdPatient = await dispatch(registerPatient(payload)).unwrap();
      alert(
        `Patient Registered! Token: T${String(
          createdPatient.id || patients.length + 1
        ).padStart(3, "0")}`
      );
      setShowPatientForm(false);
      setEditingPatient(null);
      // optionally re-fetch to ensure list updated
      if (clinicId) dispatch(fetchPatients(clinicId));
    } catch (err) {
      alert(`Error: ${err.message || err}`);
      console.error("Register error:", err);
    }
  };

  // --- Handlers ---
  const handleEditPatient = (patient) => {
    setEditingPatient(patient);
    setShowPatientForm(true);
  };

  const handleBookAppointment = (patientId) => {
    const doctor = prompt("Doctor Name:");
    const time = prompt("Time:");
    if (!doctor || !time) return alert("Required!");
    const token = `T${String(patientId).padStart(3, "0")}`;
    setAppointments((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        patientId,
        doctor,
        date: selectedDate,
        time,
        status: "waiting",
        token,
      },
    ]);
    alert(`Booked: ${doctor} at ${time}`);
  };

  const handleAddTransaction = () => {
    const errors = {};
    if (!newBill.patientId) errors.patientId = "Required";
    if (!newBill.consultationFee && !newBill.service && !newBill.customService)
      errors.amount = "Enter fee or service";

    if (Object.keys(errors).length) {
      setBillErrors(errors);
      return alert("Fix errors");
    }

    const total =
      parseFloat(newBill.consultationFee || 0) +
      parseFloat(newBill.serviceAmount || 0);
    const discount = parseFloat(newBill.discount || 0);

    setBilling((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        patientId: parseInt(newBill.patientId),
        amount: total,
        details: [newBill.customService || newBill.service || "Consultation"],
        date: selectedDate,
        discount,
      },
    ]);

    alert(`Bill: ₹${(total - discount).toFixed(2)}`);
    setNewBill({
      patientId: "",
      consultationFee: "",
      service: "",
      customService: "",
      serviceAmount: "",
      discount: "0",
    });
    setBillErrors({});
  };

  const handleLogout = async () => {
    if (window.confirm("Logout?")) {
      try {
        await dispatch(logout()).unwrap();
        localStorage.clear();
        window.location.href = "/";
      } catch {
        localStorage.clear();
        window.location.href = "/";
      }
    }
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // --- Filters & helpers ---
  const filteredPatients = patients.filter(
    (p) =>
      p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.mobile?.includes(searchQuery) ||
      p.uhid?.includes(searchQuery)
  );

  const getTotalBilling = (patientId) =>
    billing
      .filter((b) => b.patientId === patientId)
      .reduce((sum, b) => sum + (b.amount - (b.discount || 0)), 0);

  const waiting = patients.filter((p) => p.status === "Waiting");
  const pending = patients.filter((p) => p.status === "Pending");
  const emergency = patients.filter((p) => p.status === "Emergency");

  const onUpdateStatus = (id, status) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a))
    );
  };

  const onSendReminder = (patientId, doctorId, time, date) => {
    alert(`Reminder: Patient ${patientId} at ${time} on ${date}`);
  };

  return (
    <>
      <style jsx>{`
        .layout {
          display: flex;
          min-height: 100vh;
        }
        .container {
          padding: 30px;
          background: #f4f9ff;
          min-height: 100vh;
          width: 100%;
          transition: margin-left 0.3s ease;
          margin-left: ${isSidebarOpen ? "250px" : "0px"};
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
        }
        .header {
          text-align: center;
          font-size: 28px;
          font-weight: bold;
          margin-bottom: 20px;
          color: #333;
        }
        .tabs {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-bottom: 20px;
        }
        .tab-button {
          padding: 10px 20px;
          border-radius: 6px;
          border: 1px solid #ccc;
          background: #fff;
          font-weight: bold;
          cursor: pointer;
        }
        .tab-button.active {
          background: #186476;
          color: #fff;
        }
      `}</style>

      <div style={{ position: "fixed", top: 20, right: 20, zIndex: 1000 }}>
        <button
          onClick={handleLogout}
          style={{
            background: "#dc3545",
            color: "white",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      <div className="layout">
        {isSidebarOpen && <DoctorSidebar />}
        <div className="container">
          <button className="toggle-button" onClick={toggleSidebar}>
            Menu
          </button>
          <h1 className="header">Reception Dashboard</h1>

          <div className="tabs">
            {[
              "dashboard",
              "patients",
              "appointments",
              "billing",
              "newBill",
            ].map((tab) => (
              <button
                key={tab}
                className={`tab-button ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === "newBill"
                  ? "New Bill"
                  : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {patientLoading && (
            <p style={{ textAlign: "center", color: "#186476" }}>Loading...</p>
          )}
          {patientError && (
            <p style={{ textAlign: "center", color: "red" }}>{patientError}</p>
          )}

          {showPatientForm && (
            <AddPatientForm
              onSave={handleAddPatient}
              onClose={() => {
                setShowPatientForm(false);
                setEditingPatient(null);
              }}
              existingPatient={editingPatient}
            />
          )}

          {activeTab === "dashboard" && (
            <Dashboard
              patients={patients}
              appointments={appointments}
              billing={billing}
              selectedDate={selectedDate}
              waiting={waiting}
              pending={pending}
              emergency={emergency}
              handleUpdatePatientStatus={() => {}}
              dailyCalendar={dailyCalendar}
              calendarLoading={calendarLoading}
              calendarError={calendarError}
            />
          )}

          {activeTab === "patients" && (
            <PatientManagement
              patients={filteredPatients}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              setShowPatientForm={setShowPatientForm}
              handleBookAppointment={handleBookAppointment}
              handleEditPatient={handleEditPatient}
              setActiveTab={setActiveTab}
              setNewBill={setNewBill}
              clinicIdProp={clinicId}
            />
          )}

          {activeTab === "appointments" && (
            <Appointments
              appointments={appointments}
              patients={patients}
              calendarView={calendarView}
              setCalendarView={setCalendarView}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              handleUpdateStatus={onUpdateStatus}
              handleSendReminder={onSendReminder}
              clinicId={clinicId}
            />
          )}

          {activeTab === "billing" && (
            <Billing
              patients={patients}
              billing={billing}
              getTotalBilling={getTotalBilling}
              clinicId={clinicId}
            />
          )}

          {activeTab === "newBill" && (
            <NewBill
              newBill={newBill}
              setNewBill={setNewBill}
              billErrors={billErrors}
              patients={patients}
              facilityOptions={facilityOptions}
              handleAddTransaction={handleAddTransaction}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ReceptionPage;
