import React, { useState } from "react";
import { FaPrint, FaTimes, FaFileInvoice, FaMoneyBill, FaClipboardList, FaChartBar, FaCog, FaBars } from "react-icons/fa";

const AddPatientForm = ({ onSave, onClose, existingPatient }) => {
  const [patient, setPatient] = useState({
    name: existingPatient?.name || "",
    gender: existingPatient?.gender || "",
    age: existingPatient?.age || "",
    mobile: existingPatient?.mobile || existingPatient?.contact || "",
    uhid: existingPatient?.uhid || existingPatient?.id ? `UHID-${String(existingPatient.id).padStart(6, "0")}` : `UHID-${String(Math.floor(Math.random() * 1000000) + 1).padStart(6, "0")}`,
    address: existingPatient?.address || "",
    medicalHistory: existingPatient?.medicalHistory || "",
    emergencyContact: existingPatient?.emergencyContact || "",
    insuranceDetails: existingPatient?.insuranceDetails || "",
    patientCategory: existingPatient?.patientCategory || "General",
    date: existingPatient?.date || new Date().toISOString().split("T")[0],
    time: existingPatient?.time || "",
    consultant: existingPatient?.consultant || "",
    appointmentId: existingPatient?.appointmentId || existingPatient?.id ? `APPT-${String(existingPatient.id).padStart(6, "0")}` : `APPT-${String(Math.floor(Math.random() * 1000000) + 1).padStart(6, "0")}`,
    referredBy: existingPatient?.referredBy || "",
    fee: existingPatient?.fee || "",
    status: existingPatient?.status || "Waiting",
  });

  const [errors, setErrors] = useState({});

  const consultants = [
    { name: "Dr. Alice Smith", availableDays: ["Monday", "Tuesday", "Wednesday", "Friday"], availableTimes: ["09:00", "10:00", "11:00", "14:00", "15:00"] },
    { name: "Dr. Bob Johnson", availableDays: ["Tuesday", "Thursday", "Saturday"], availableTimes: ["10:30", "11:30", "13:00", "14:30"] },
    { name: "Dr. Carol White", availableDays: ["Monday", "Wednesday", "Friday"], availableTimes: ["09:30", "10:30", "12:00", "15:30"] },
    { name: "Dr. David Lee", availableDays: ["Tuesday", "Thursday", "Saturday"], availableTimes: ["11:00", "12:30", "14:00", "16:00"] },
  ];

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = {
      name: "Name",
      mobile: "Mobile No.",
      gender: "Gender",
      age: "Age",
      address: "Address",
      fee: "Consultation Fee",
      status: "Status",
    };

    Object.keys(requiredFields).forEach(key => {
      if (!patient[key]) newErrors[key] = `${requiredFields[key]} is required`;
    });

    if (patient.mobile && !/^\d{10}$/.test(patient.mobile)) {
      newErrors.mobile = "Mobile number must be 10 digits";
    }

    if (patient.age && (patient.age <= 0 || patient.age > 120)) {
      newErrors.age = "Age must be between 1 and 120";
    }

    if (patient.fee && patient.fee <= 0) {
      newErrors.fee = "Consultation fee must be greater than 0";
    }

    if (patient.date && patient.time) {
      const selectedDate = new Date(patient.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.date = "Date cannot be in the past";
      }

      const selectedTime = patient.time;
      const [hours, minutes] = selectedTime.split(":").map(Number);
      if (hours < 9 || hours >= 17) {
        newErrors.time = "Appointments are only available between 9 AM and 5 PM";
      }

      if (patient.consultant) {
        const consultant = consultants.find(c => c.name === patient.consultant);
        if (consultant) {
          const day = selectedDate.toLocaleString("en-US", { weekday: "long" });
          if (!consultant.availableDays.includes(day)) {
            newErrors.consultant = `${consultant.name} is not available on ${day}`;
          } else if (!consultant.availableTimes.includes(selectedTime)) {
            newErrors.time = `${consultant.name} is not available at ${selectedTime}`;
          }
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert("⚠️ Please correct the errors in the form");
      return;
    }

    onSave({
      ...patient,
      fee: parseFloat(patient.fee),
      age: parseInt(patient.age),
    });

    setPatient({
      name: "",
      gender: "",
      age: "",
      mobile: "",
      uhid: `UHID-${String(Math.floor(Math.random() * 1000000) + 1).padStart(6, "0")}`,
      address: "",
      medicalHistory: "",
      emergencyContact: "",
      insuranceDetails: "",
      patientCategory: "General",
      date: new Date().toISOString().split("T")[0],
      time: "",
      consultant: "",
      appointmentId: `APPT-${String(Math.floor(Math.random() * 1000000) + 1).padStart(6, "0")}`,
      referredBy: "",
      fee: "",
      status: "Waiting",
    });
    setErrors({});
  };

  return (
    <>
      <style jsx>{`
        .modal {
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

        .container {
          background: white;
          border-radius: 18px;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
          padding: 32px 28px;
          max-width: 800px;
          width: 90%;
          max-height: 80vh;
          overflow-y: auto;
          position: relative;
          overflow: hidden;
        }

        .container::before {
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

        .container:hover::before {
          transform: scaleX(1);
        }

        .container:hover {
          transform: translateY(-8px);
          box-shadow: 0 14px 26px rgba(0, 0, 0, 0.15);
        }

        .header {
          font-size: 1.8rem;
          font-weight: 600;
          color: #025b84;
          border-bottom: 2px solid #e6f2f7;
          padding-bottom: 6px;
          margin-bottom: 20px;
          text-align: center;
        }

        .form {
          display: grid;
          gap: 20px;
          grid-template-columns: 1fr 1fr;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .label {
          display: block;
          font-size: 1rem;
          font-weight: 600;
          color: #186476;
          margin-bottom: 8px;
        }

        .required {
          color: #dc3545;
          font-size: 0.9rem;
          margin-left: 5px;
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

        .input:focus,
        .select:focus {
          border-color: #1d9ad6;
          box-shadow: 0 0 0 3px rgba(29, 154, 214, 0.2);
        }

        .select {
          appearance: none;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='%23186476' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>");
          background-repeat: no-repeat;
          background-position: right 0.75rem center;
          background-size: 1rem;
        }

        .error {
          color: #dc3545;
          font-size: 0.9rem;
          margin-top: 4px;
        }

        .button-container {
          grid-column: 1 / -1;
          display: flex;
          justify-content: center;
          gap: 15px;
          margin-top: 20px;
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

        .save-button {
          background: #186476;
          color: white;
        }

        .save-button:hover {
          background: #3fa3b9;
          transform: translateY(-2px);
        }

        .cancel-button {
          background: #6c757d;
          color: white;
        }

        .cancel-button:hover {
          background: #5a6268;
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .form {
            grid-template-columns: 1fr;
          }
          .container {
            padding: 24px 16px;
          }
        }
      `}</style>

      <div className="modal">
        <div className="container">
          <h3 className="header">{existingPatient ? "Edit Patient" : "Add New Patient"}</h3>
          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label className="label">
                Name <span className="required">*</span>
              </label>
              <input
                type="text"
                className="input"
                style={errors.name ? { borderColor: "#dc3545" } : {}}
                value={patient.name}
                onChange={(e) => setPatient({ ...patient, name: e.target.value })}
                required
              />
              {errors.name && <div className="error">{errors.name}</div>}
            </div>
            <div className="form-group">
              <label className="label">
                Gender <span className="required">*</span>
              </label>
              <select
                className="select"
                style={errors.gender ? { borderColor: "#dc3545" } : {}}
                value={patient.gender}
                onChange={(e) => setPatient({ ...patient, gender: e.target.value })}
                required
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && <div className="error">{errors.gender}</div>}
            </div>
            <div className="form-group">
              <label className="label">
                Age <span className="required">*</span>
              </label>
              <input
                type="number"
                className="input"
                style={errors.age ? { borderColor: "#dc3545" } : {}}
                value={patient.age}
                onChange={(e) => setPatient({ ...patient, age: e.target.value })}
                min="1"
                max="120"
                required
              />
              {errors.age && <div className="error">{errors.age}</div>}
            </div>
            <div className="form-group">
              <label className="label">
                Mobile No. <span className="required">*</span>
              </label>
              <input
                type="text"
                className="input"
                style={errors.mobile ? { borderColor: "#dc3545" } : {}}
                value={patient.mobile}
                onChange={(e) => setPatient({ ...patient, mobile: e.target.value })}
                required
              />
              {errors.mobile && <div className="error">{errors.mobile}</div>}
            </div>
            <div className="form-group">
              <label className="label">UHID</label>
              <input type="text" className="input" value={patient.uhid} readOnly />
            </div>
            <div className="form-group">
              <label className="label">
                Address <span className="required">*</span>
              </label>
              <input
                type="text"
                className="input"
                style={errors.address ? { borderColor: "#dc3545" } : {}}
                value={patient.address}
                onChange={(e) => setPatient({ ...patient, address: e.target.value })}
                required
              />
              {errors.address && <div className="error">{errors.address}</div>}
            </div>
            <div className="form-group">
              <label className="label">Medical History</label>
              <input
                type="text"
                className="input"
                value={patient.medicalHistory}
                onChange={(e) => setPatient({ ...patient, medicalHistory: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="label">Emergency Contact</label>
              <input
                type="text"
                className="input"
                value={patient.emergencyContact}
                onChange={(e) => setPatient({ ...patient, emergencyContact: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="label">Insurance Details</label>
              <input
                type="text"
                className="input"
                value={patient.insuranceDetails}
                onChange={(e) => setPatient({ ...patient, insuranceDetails: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="label">Patient Category</label>
              <select
                className="select"
                value={patient.patientCategory}
                onChange={(e) => setPatient({ ...patient, patientCategory: e.target.value })}
              >
                <option value="General">General</option>
                <option value="Insurance">Insurance</option>
                <option value="Corporate">Corporate</option>
              </select>
            </div>
            <div className="form-group">
              <label className="label">Appointment Date</label>
              <input
                type="date"
                className="input"
                style={errors.date ? { borderColor: "#dc3545" } : {}}
                value={patient.date}
                onChange={(e) => setPatient({ ...patient, date: e.target.value })}
              />
              {errors.date && <div className="error">{errors.date}</div>}
            </div>
            <div className="form-group">
              <label className="label">Appointment Time</label>
              <input
                type="time"
                className="input"
                style={errors.time ? { borderColor: "#dc3545" } : {}}
                value={patient.time}
                onChange={(e) => setPatient({ ...patient, time: e.target.value })}
              />
              {errors.time && <div className="error">{errors.time}</div>}
            </div>
            <div className="form-group">
              <label className="label">Consultant</label>
              <select
                className="select"
                style={errors.consultant ? { borderColor: "#dc3545" } : {}}
                value={patient.consultant}
                onChange={(e) => setPatient({ ...patient, consultant: e.target.value })}
              >
                <option value="">Select Consultant</option>
                {consultants.map((consultant, index) => (
                  <option key={index} value={consultant.name}>{consultant.name}</option>
                ))}
              </select>
              {errors.consultant && <div className="error">{errors.consultant}</div>}
            </div>
            <div className="form-group">
              <label className="label">Appointment ID</label>
              <input type="text" className="input" value={patient.appointmentId} readOnly />
            </div>
            <div className="form-group">
              <label className="label">Referred By</label>
              <input
                type="text"
                className="input"
                value={patient.referredBy}
                onChange={(e) => setPatient({ ...patient, referredBy: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="label">
                Consultation Fee (₹) <span className="required">*</span>
              </label>
              <input
                type="number"
                className="input"
                style={errors.fee ? { borderColor: "#dc3545" } : {}}
                value={patient.fee}
                onChange={(e) => setPatient({ ...patient, fee: e.target.value })}
                min="0"
                step="0.01"
                required
              />
              {errors.fee && <div className="error">{errors.fee}</div>}
            </div>
            <div className="form-group">
              <label className="label">
                Status <span className="required">*</span>
              </label>
              <select
                className="select"
                style={errors.status ? { borderColor: "#dc3545" } : {}}
                value={patient.status}
                onChange={(e) => setPatient({ ...patient, status: e.target.value })}
                required
              >
                <option value="Waiting">Waiting</option>
                <option value="Pending">Pending</option>
                <option value="Emergency">Emergency</option>
              </select>
              {errors.status && <div className="error">{errors.status}</div>}
            </div>
            <div className="button-container">
              <button type="submit" className="button save-button">
                {existingPatient ? "Update Patient" : "Save Patient"}
              </button>
              <button type="button" className="button cancel-button" onClick={onClose}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddPatientForm;