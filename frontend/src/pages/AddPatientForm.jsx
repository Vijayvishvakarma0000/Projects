
import React, { useState } from "react";

const AddPatientForm = ({ onSave, onClose }) => {
  const [patient, setPatient] = useState({
    name: "",
    gender: "",
    age: "",
    mobile: "",
    uhid: "",
    date: "",
    time: "",
    consultant: "",
    appointmentId: "",
    referredBy: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!patient.name || !patient.mobile) {
      alert("⚠️ Please fill at least Name & Mobile No.");
      return;
    }
    onSave(patient);
    setPatient({
      name: "",
      gender: "",
      age: "",
      mobile: "",
      uhid: "",
      date: "",
      time: "",
      consultant: "",
      appointmentId: "",
      referredBy: "",
    });
  };

  return (
    <div style={{ background: "#f9f9f9", padding: "1rem", border: "1px solid #ccc", borderRadius: "6px", marginTop: "1rem" }}>
      <h3>Add New Patient</h3>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          value={patient.name}
          onChange={(e) => setPatient({ ...patient, name: e.target.value })}
          required
        />

        <label>Gender:</label>
        <select
          value={patient.gender}
          onChange={(e) => setPatient({ ...patient, gender: e.target.value })}
        >
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <label>Age:</label>
        <input
          type="number"
          value={patient.age}
          onChange={(e) => setPatient({ ...patient, age: e.target.value })}
        />

        <label>Mobile No.:</label>
        <input
          type="text"
          value={patient.mobile}
          onChange={(e) => setPatient({ ...patient, mobile: e.target.value })}
          required
        />

        <label>UHID:</label>
        <input
          type="text"
          value={patient.uhid}
          onChange={(e) => setPatient({ ...patient, uhid: e.target.value })}
        />

        <label>Date:</label>
        <input
          type="date"
          value={patient.date}
          onChange={(e) => setPatient({ ...patient, date: e.target.value })}
        />

        <label>Time:</label>
        <input
          type="time"
          value={patient.time}
          onChange={(e) => setPatient({ ...patient, time: e.target.value })}
        />

        <label>Consultant Type:</label>
        <input
          type="text"
          value={patient.consultant}
          onChange={(e) => setPatient({ ...patient, consultant: e.target.value })}
        />

        <label>Appointment ID:</label>
        <input
          type="text"
          value={patient.appointmentId}
          onChange={(e) => setPatient({ ...patient, appointmentId: e.target.value })}
        />

        <label>Referred By:</label>
        <input
          type="text"
          value={patient.referredBy}
          onChange={(e) => setPatient({ ...patient, referredBy: e.target.value })}
        />

        <button type="submit">Save Patient</button>
        <button type="button" style={{ marginLeft: "10px", background: "gray" }} onClick={onClose}>
          Cancel
        </button>
      </form>

      {/* Internal CSS for Mobile Responsiveness */}
      <style>{`
        form {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        label {
          font-size: 14px;
          color: #333;
          margin-bottom: 5px;
        }
        input, select {
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 14px;
          width: 100%;
          box-sizing: border-box;
        }
        button {
          padding: 8px 12px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          background: #186476ff;
          color: white;
          width: 100%;
        }
        button[type="button"] {
          background: gray;
          margin-left: 0;
        }
        h3 {
          font-size: 18px;
          color: #186476ff;
          margin-bottom: 15px;
        }

        /* Desktop Styles */
        @media (min-width: 768px) {
          form {
            flex-direction: row;
            flex-wrap: wrap;
            gap: 15px;
          }
          label, input, select {
            flex: 1 1 45%;
            max-width: 48%;
          }
          button {
            flex: 1 1 22%;
            max-width: 24%;
            padding: 10px 16px;
            font-size: 16px;
          }
          h3 {
            font-size: 20px;
          }
        }

        /* Very Small Screens */
        @media (max-width: 480px) {
          h3 {
            font-size: 16px;
          }
          label, input, select, button {
            font-size: 13px;
          }
          input, select {
            padding: 6px;
          }
          button {
            padding: 6px 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default AddPatientForm;