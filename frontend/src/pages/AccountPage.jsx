import React, { useState, useRef } from "react";
import {
  FaPrint,
  FaTimes,
  FaFileInvoice,
  FaMoneyBill,
  FaClipboardList,
  FaChartBar,
  FaCog,
  FaBars,
} from "react-icons/fa";
import AddPatientForm from "../pages/Tabs/AddPatientForm";
import DoctorSidebar from "../pages/DoctorSidebar";
import NewBill from "../pages/Tabs/NewBill";
import Receipts from "../pages/Tabs/Receipts";
import PatientLedger from "../pages/Tabs/PatientLedger";
import FinanceSummary from "../pages/Tabs/FinanceSummary";
import Settings from "../pages/Tabs/Settings";

const AccountBillingPage = () => {
  const [activeTab, setActiveTab] = useState("newBill");
  const [showPatientForm, setShowPatientForm] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [newBill, setNewBill] = useState({
    patientId: "",
    consultationFee: "",
    service: "",
    customService: "",
    serviceAmount: "",
    discount: "0",
  });
  const [billErrors, setBillErrors] = useState({});
  const [defaultFees, setDefaultFees] = useState(500);
  const [procedureCharges, setProcedureCharges] = useState(1000);
  const [tax, setTax] = useState(5);
  const [showReceipt, setShowReceipt] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const receiptRef = useRef();

  const [patients, setPatients] = useState([
    {
      id: 1,
      name: "John Doe",
      age: 30,
      gender: "Male",
      contact: "9876543210",
      mobile: "9876543210",
      address: "123 Main St, City",
      lastPrescription: "Metformin 500mg",
      reports: ["Blood Sugar Report - 2025-09-10"],
      status: "Waiting",
      facilities: ["Lab Test"],
      lastVisit: "2025-09-10",
      medicalHistory: "Diabetes Type 2",
      uhid: "UHID-000001",
      emergencyContact: "9123456789",
      insuranceDetails: "",
      patientCategory: "General",
      appointmentId: "APPT-000001",
      referredBy: "Dr. Smith",
    },
    {
      id: 2,
      name: "Jane Smith",
      age: 25,
      gender: "Female",
      contact: "9123456780",
      mobile: "9123456780",
      address: "456 Oak Ave, City",
      lastPrescription: "Amlodipine 5mg",
      reports: [],
      status: "Pending",
      facilities: ["Injection"],
      lastVisit: "2025-09-12",
      medicalHistory: "Hypertension",
      uhid: "UHID-000002",
      emergencyContact: "9988776655",
      insuranceDetails: "Policy #XYZ123",
      patientCategory: "Insurance",
      appointmentId: "APPT-000002",
      referredBy: "Dr. Jones",
    },
    {
      id: 3,
      name: "Michael Brown",
      age: 40,
      gender: "Male",
      contact: "9988776655",
      mobile: "9988776655",
      address: "789 Pine Rd, City",
      lastPrescription: "",
      reports: [],
      status: "Emergency",
      facilities: [],
      lastVisit: "2025-09-15",
      medicalHistory: "None",
      uhid: "UHID-000003",
      emergencyContact: "9876541234",
      insuranceDetails: "",
      patientCategory: "General",
      appointmentId: "APPT-000003",
      referredBy: "",
    },
  ]);

  const [billing, setBilling] = useState([
    {
      id: 1,
      patientId: 1,
      amount: 788,
      details: ["Consultation", "Lab Test"],
      date: "2025-09-01",
      discount: 50,
      tax: 38,
      subtotal: 750,
    },
    {
      id: 2,
      patientId: 2,
      amount: 1050,
      details: ["Consultation", "Pharmacy"],
      date: "2025-09-03",
      discount: 0,
      tax: 50,
      subtotal: 1000,
    },
  ]);

  const [expenses, setExpenses] = useState([
    { amount: 200, desc: "Stationary", date: "2025-09-01" },
    { amount: 500, desc: "Electricity Bill", date: "2025-09-02" },
  ]);

  const facilityOptions = [
    "Consultation",
    "Lab Test",
    "Dressing",
    "Injection",
    "X-Ray",
    "ECG",
    "Pharmacy",
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleAddPatient = (newPatientData) => {
    const {
      name,
      age,
      gender,
      mobile,
      address,
      medicalHistory,
      emergencyContact,
      insuranceDetails,
      patientCategory,
      date,
      time,
      consultant,
      appointmentId,
      referredBy,
      fee,
      status,
    } = newPatientData;
    const existingPatient = patients.find(
      (p) => p.mobile === mobile || p.uhid === newPatientData.uhid
    );
    const newId = existingPatient ? existingPatient.id : patients.length + 1;
    const token = `T${String(newId).padStart(3, "0")}`;

    if (existingPatient) {
      setPatients(
        patients.map((p) =>
          p.mobile === mobile || p.uhid === newPatientData.uhid
            ? {
                ...p,
                name,
                age: parseInt(age),
                gender,
                mobile,
                address,
                medicalHistory,
                emergencyContact,
                insuranceDetails,
                patientCategory,
                status,
                referredBy,
              }
            : p
        )
      );
      alert(`Patient ${name} updated successfully`);
    } else {
      setPatients([
        ...patients,
        {
          id: newId,
          name,
          age: parseInt(age),
          gender,
          contact: mobile,
          mobile,
          address,
          medicalHistory,
          emergencyContact,
          insuranceDetails,
          patientCategory,
          lastPrescription: "",
          reports: [],
          status,
          facilities: [],
          lastVisit: date || new Date().toISOString().split("T")[0],
          uhid: newPatientData.uhid,
          appointmentId,
          referredBy,
        },
      ]);
      setBilling([
        ...billing,
        {
          id: billing.length + 1,
          patientId: newId,
          amount: parseFloat(fee),
          details: ["Consultation"],
          date: date || new Date().toISOString().split("T")[0],
          discount: 0,
          tax: parseFloat(fee) * (tax / 100),
          subtotal: parseFloat(fee),
        },
      ]);
      alert(`Patient Registered. Token #${token} & Fee ₹${fee} collected`);
    }

    setShowPatientForm(false);
    setEditingPatient(null);
  };

  const handleAddTransaction = () => {
    const errors = {};
    if (!newBill.patientId) errors.patientId = "Patient is required";
    if (
      !newBill.consultationFee &&
      !newBill.service &&
      !newBill.customService
    ) {
      errors.amount = "At least one of Consultation Fee or Service is required";
    }
    if (newBill.consultationFee && newBill.consultationFee < 0) {
      errors.consultationFee = "Consultation fee cannot be negative";
    }
    if (
      newBill.service &&
      !newBill.customService &&
      !facilityOptions.includes(newBill.service)
    ) {
      errors.service =
        "Please select a valid service or enter a custom service";
    }
    if (newBill.serviceAmount && newBill.serviceAmount < 0) {
      errors.serviceAmount = "Service amount cannot be negative";
    }
    if (newBill.discount && newBill.discount < 0) {
      errors.discount = "Discount cannot be negative";
    }

    const subtotal =
      parseFloat(newBill.consultationFee || 0) +
      parseFloat(newBill.serviceAmount || 0);
    const taxAmt = subtotal * (tax / 100);
    const total = subtotal + taxAmt - parseFloat(newBill.discount || 0);

    if (newBill.discount && parseFloat(newBill.discount) > subtotal) {
      errors.discount = "Discount cannot exceed subtotal";
    }

    if (Object.keys(errors).length > 0) {
      setBillErrors(errors);
      alert("⚠️ Please correct the errors in the billing form");
      return;
    }

    const patient = patients.find((p) => p.id === parseInt(newBill.patientId));
    const service = newBill.customService || newBill.service;

    const newTransaction = {
      id: billing.length + 1,
      patientId: parseInt(newBill.patientId),
      amount: total,
      details: [service || "Consultation"],
      date: new Date().toISOString().split("T")[0],
      discount: parseFloat(newBill.discount || 0),
      tax: taxAmt,
      subtotal,
      patientCategory: patient.patientCategory,
      uhid: patient.uhid,
      appointmentId: patient.appointmentId,
    };

    setBilling([...billing, newTransaction]);

    if (service && !patient.facilities.includes(service)) {
      setPatients(
        patients.map((p) =>
          p.id === parseInt(newBill.patientId)
            ? { ...p, facilities: [...p.facilities, service] }
            : p
        )
      );
    }

    alert(
      `Bill generated for ${patient.name}: ₹${total.toFixed(2)} after ₹${
        newBill.discount || 0
      } discount`
    );
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

  const handleAddExpense = (amount, desc) => {
    if (!amount || !desc) {
      alert("⚠️ Please enter both amount and description");
      return;
    }
    if (amount < 0) {
      alert("⚠️ Expense amount cannot be negative");
      return;
    }
    const newExpense = {
      amount: parseFloat(amount),
      desc,
      date: new Date().toISOString().split("T")[0],
    };
    setExpenses([...expenses, newExpense]);
    alert(`Expense added: ₹${amount} for ${desc}`);
    document.getElementById("expAmount").value = "";
    document.getElementById("expDesc").value = "";
  };

  const openReceipt = (txn) => {
    setSelectedReceipt(txn);
    setShowReceipt(true);
  };

  const handlePrint = () => {
    const printContents = receiptRef.current.innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  const totalIncome = billing.reduce((sum, t) => sum + Number(t.amount), 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + Number(e.amount), 0);

  return (
    <>
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

        .popup {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.4);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .popup-content {
          background: white;
          border-radius: 18px;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
          padding: 32px 28px;
          width: 350px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .popup-content::before {
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

        .popup-content:hover::before {
          transform: scaleX(1);
        }

        .popup-content:hover {
          transform: translateY(-8px);
          box-shadow: 0 14px 26px rgba(0, 0, 0, 0.15);
        }

        .popup-actions {
          margin-top: 20px;
          display: flex;
          justify-content: space-around;
        }

        .total-amount {
          font-size: 1.2rem;
          font-weight: bold;
          color: #186476;
          margin-top: 20px;
          text-align: center;
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
        }
      `}</style>

      <div className="layout">
        {isSidebarOpen && <DoctorSidebar />}
        <div
          className="page"
          role="main"
          aria-label="Clinic Accounts and Billing"
        >
          <button className="toggle-button" onClick={toggleSidebar}>
            <FaBars size={10} />
          </button>
          <h1>🏥 Clinic Accounts & Billing</h1>
          <div className="tab-container">
            {[
              { id: "newBill", label: "New Bill", icon: <FaFileInvoice /> },
              { id: "receipts", label: "Receipts", icon: <FaMoneyBill /> },
              {
                id: "ledger",
                label: "Patient Ledger",
                icon: <FaClipboardList />,
              },
              { id: "finance", label: "Finance Summary", icon: <FaChartBar /> },
              { id: "settings", label: "Settings", icon: <FaCog /> },
            ].map((tab) => (
              <button
                key={tab.id}
                className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

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

          {activeTab === "newBill" && (
            <NewBill
              newBill={newBill}
              setNewBill={setNewBill}
              billErrors={billErrors}
              patients={patients}
              facilityOptions={facilityOptions}
              handleAddTransaction={handleAddTransaction}
              setShowPatientForm={setShowPatientForm}
              tax={tax}
            />
          )}

          {activeTab === "receipts" && (
            <Receipts
              billing={billing}
              patients={patients}
              openReceipt={openReceipt}
            />
          )}

          {activeTab === "ledger" && (
            <PatientLedger billing={billing} patients={patients} />
          )}

          {activeTab === "finance" && (
            <FinanceSummary
              billing={billing}
              expenses={expenses}
              handleAddExpense={handleAddExpense}
              totalIncome={totalIncome}
              totalExpenses={totalExpenses}
            />
          )}

          {activeTab === "settings" && (
            <Settings
              defaultFees={defaultFees}
              setDefaultFees={setDefaultFees}
              procedureCharges={procedureCharges}
              setProcedureCharges={setProcedureCharges}
              tax={tax}
              setTax={setTax}
            />
          )}

          {showReceipt && selectedReceipt && (
            <div className="popup">
              <div className="popup-content" ref={receiptRef}>
                <h2 className="section-title">🏥 Clinic Receipt</h2>
                <p>
                  <strong>Patient:</strong>{" "}
                  {patients.find((p) => p.id === selectedReceipt.patientId)
                    ?.name || "Unknown"}
                </p>
                <p>
                  <strong>UHID:</strong> {selectedReceipt.uhid || "N/A"}
                </p>
                <p>
                  <strong>Appointment ID:</strong>{" "}
                  {selectedReceipt.appointmentId || "N/A"}
                </p>
                <p>
                  <strong>Patient Category:</strong>{" "}
                  {selectedReceipt.patientCategory || "N/A"}
                </p>
                <p>
                  <strong>Date:</strong> {selectedReceipt.date}
                </p>
                <p>
                  <strong>Services:</strong>{" "}
                  {selectedReceipt.details.join(", ")}
                </p>
                <p>
                  <strong>Subtotal:</strong> ₹
                  {selectedReceipt.subtotal.toFixed(2)}
                </p>
                <p>
                  <strong>Tax ({tax}%):</strong> ₹
                  {selectedReceipt.tax.toFixed(2)}
                </p>
                <p>
                  <strong>Discount:</strong> ₹{selectedReceipt.discount || 0}
                </p>
                <h3 className="total-amount">
                  Total: ₹{selectedReceipt.amount.toFixed(2)}
                </h3>
              </div>
              <div className="popup-actions">
                <button className="button print-button" onClick={handlePrint}>
                  <FaPrint /> Print
                </button>
                <button
                  className="button close-button"
                  onClick={() => setShowReceipt(false)}
                >
                  <FaTimes /> Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AccountBillingPage;
