




import React from "react";
import { v4 as uuidv4 } from "uuid";

const PrescriptionPreview = React.forwardRef(
  (
    {
      selectedPatient,
      clinicalHistory,
      vitals,
      diagnosis,
      prescriptionMedicines,
      treatmentPlan,
      followUp,
      autoReminder,
      customDays,
      handlePrint,
      handleWhatsApp,
      handleEmail,
      handleSave,
    },
    ref
  ) => {
    const prescriptionId = uuidv4().slice(0, 8);
    const timestamp = new Date()
      .toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
      .replace(",", "");

    if (!selectedPatient) {
      return (
        <div style={{ textAlign: "center", padding: "20px", color: "#e74c3c" }}>
          <em>No patient selected</em>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className="prescription-preview"
        style={{
          border: "1px solid #000",
          padding: "15mm",
          maxWidth: "210mm", // A4 width
  minHeight: "297mm", // A4 height
          margin: "10px auto",
          fontFamily: "'Times New Roman', Times, serif",
          fontSize: "10pt",
          background: "#fff",
          boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
          position: "relative",
        }}
      >
        <style>{`
          .prescription-preview {
            position: relative;
          }
          .prescription-preview::before {
            content: "City Health Clinic";
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-45deg);
            font-size: 30pt;
            color: rgba(0, 0, 0, 0.08);
            pointer-events: none;
            z-index: 0;
          }
          .prescription-preview h1 {
            font-size: 16pt;
            margin: 0 0 5px;
            color: #1a3c5e;
            font-weight: bold;
           
          }
          .prescription-preview h3 {
            font-size: 12pt;
            margin: 0 0 4px;
            color: #333;
            font-weight: bold;
          }
          .prescription-preview h4 {
            font-size: 11pt;
            margin: 10px 0 5px;
            border-bottom: 1.5px solid #1a3c5e;
            padding-bottom: 3px;
            color: #1a3c5e;
            font-weight: bold;
          }
          .prescription-preview p {
            margin: 3px 0;
            line-height: 1.4;
            font-size: 10pt;
            color: #333;
          }
          .prescription-preview table {
            width: 100%;
            border-collapse: collapse;
            margin: 10px 0;
            font-size: 9pt;
          }
          .prescription-preview th, .prescription-preview td {
            border: 1px solid #1a3c5e;
            padding: 6px;
            text-align: left;
            vertical-align: top;
          }
          .prescription-preview th {
            background: #e6f0fa;
            font-weight: bold;
            color: #1a3c5e;
          }
          .prescription-preview .section {
            margin-bottom: 12px;
            page-break-inside: avoid;
            position: relative;
            z-index: 1;
          }
          .prescription-preview .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
            gap: 6px;
          }
          .prescription-preview .action-buttons {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
            margin-top: 15px;
            justify-content: center;
          }
          .prescription-preview button {
            background: #1a3c5e;
            color: white;
            border: none;
            padding: 6px 12px;
            cursor: pointer;
            border-radius: 4px;
            font-size: 9pt;
            transition: background 0.3s ease;
          }
          .prescription-preview button:hover {
            background: #145a6b;
          }
          .prescription-preview .tooltip {
            position: relative;
            display: inline-block;
            cursor: help;
          }
          .prescription-preview .tooltip .tooltip-text {
            visibility: hidden;
            width: 120px;
            background: #333;
            color: #fff;
            text-align: center;
            border-radius: 4px;
            padding: 5px;
            position: absolute;
            z-index: 2;
            bottom: 100%;
            left: 50%;
            margin-left: -60px;
            font-size: 8pt;
          }
          .prescription-preview .tooltip:hover .tooltip-text {
            visibility: visible;
          }
          @media print {
            .prescription-preview {
              border: none;
              margin: 0;
              padding: 10mm;
              box-shadow: none;
              min-height: 0;
            }
            .prescription-preview::before {
              color: rgba(0, 0, 0, 0.05);
            }
            .prescription-preview .action-buttons {
              display: none;
            }
            body {
              margin: 0;
              font-size: 10pt;
            }
            @page {
              size: A5;
              margin: 10mm;
            }
          }
        `}</style>

        {/* Header with Logo */}
        <div
          className="prescription-header section"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "2px solid #1a3c5e",
            paddingBottom: "8px",
            marginBottom: "12px",
          }}
        >
          <div style={{ alignItems: "center" }}>
            <div>
              <h1>City Health Clinic</h1>
              <p>123, Main Street, City, India 400001</p>
              <p>Contact: +91 98765 43210 | Email: contact@cityhealth.in</p>
              <p>GSTIN: 27AAAAA0000A1Z5 | License: MH/MED/123456</p>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <h3>Dr. Rajesh Gupta, MD</h3>
            <p>General Medicine </p>
            <p> Reg. No: 123456</p>
            <p>Prescription ID: {prescriptionId}</p>
          </div>
        </div>

        {/* Patient Demographics */}

        <div className="patient-details section">
          <h4>Patient Details</h4>
          <div
            className="grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr", // Two equal columns
              gap: "12px",
              alignItems: "start",
            }}
          >
            {/* Left Column */}
            <div className="left-column">
              <p>
                <strong>Name:</strong> {selectedPatient.name || "-"}
              </p>
              <p>
                <strong>Age/Gender:</strong>{" "}
                {selectedPatient.age || selectedPatient.gender
                  ? `${selectedPatient.age || "-"} / ${
                      selectedPatient.gender || "-"
                    }`
                  : "-"}
              </p>
              <p>
                <strong>UHID:</strong> {selectedPatient.UHID || "-"}
              </p>
              <p>
                <strong>Contact:</strong> {selectedPatient.contact || "-"}
              </p>
            </div>

            {/* Right Column */}
            <div className="right-column">
              <p>
                <strong>Address:</strong>{" "}
                {selectedPatient?.address
                  ? `${selectedPatient.address.locality}, ${selectedPatient.address.city}, ${selectedPatient.address.state}, ${selectedPatient.address.country}`
                  : "N/A"}
              </p>
              <p>
                <strong>Blood Group:</strong>{" "}
                {selectedPatient.bloodGroup || "-"}
              </p>
              <p>
                <strong>Allergies:</strong> {selectedPatient.allergies || "-"}
              </p>
              <p>
                <strong>Date & Time:</strong> {timestamp}
              </p>
            </div>
          </div>
        </div>

        {/* Clinical History */}
        <div className="clinical-history section">
          <h4>Clinical History</h4>
          <p>
            <strong>Chief Complaint:</strong>{" "}
            {clinicalHistory.chiefComplaint || "-"}
          </p>
          <p>
            <strong>Past Medical History:</strong>{" "}
            {clinicalHistory.pastMedicalHistory || "-"}
          </p>
          <p>
            <strong>Family History:</strong>{" "}
            {clinicalHistory.familyHistory || "-"}
          </p>
        </div>

        {/* Examination / Vitals */}
        <div className="vitals section">
          <h4>Examination / Vitals</h4>
          <div className="grid">
            <p>
              <strong>
                <span className="tooltip">
                  BP
                  <span className="tooltip-text">Blood Pressure (mmHg)</span>
                </span>
                :
              </strong>{" "}
              {vitals.bp || "-"}
            </p>
            <p>
              <strong>
                <span className="tooltip">
                  Pulse
                  <span className="tooltip-text">Heart Rate (bpm)</span>
                </span>
                :
              </strong>{" "}
              {vitals.pulse ? `${vitals.pulse} bpm` : "-"}
            </p>
            <p>
              <strong>
                <span className="tooltip">
                  Temp
                  <span className="tooltip-text">Temperature (°C)</span>
                </span>
                :
              </strong>{" "}
              {vitals.temp ? `${vitals.temp} °C` : "-"}
            </p>
            <p>
              <strong>
                <span className="tooltip">
                  Resp
                  <span className="tooltip-text">
                    Respiratory Rate (breaths/min)
                  </span>
                </span>
                :
              </strong>{" "}
              {vitals.respiration ? `${vitals.respiration} breaths/min` : "-"}
            </p>
            <p>
              <strong>
                <span className="tooltip">
                  SpO2
                  <span className="tooltip-text">Oxygen Saturation (%)</span>
                </span>
                :
              </strong>{" "}
              {vitals.spo2 ? `${vitals.spo2}%` : "-"}
            </p>
            <p style={{ gridColumn: "span 2" }}>
              <strong>Findings:</strong> {vitals.findings || "-"}
            </p>
          </div>
        </div>

        {/* Diagnosis */}
        <div className="diagnosis section">
          <h4>Diagnosis</h4>
          <p>
            <strong>Provisional:</strong> {diagnosis.provisional || "-"}
          </p>
          <p>
            <strong>Final:</strong> {diagnosis.final || "-"}
          </p>
        </div>

        {/* Prescription Table */}
        <div className="prescription section">
          <h4>Rx (Prescription)</h4>
          {prescriptionMedicines.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th style={{ width: "5%" }}>#</th>
                  <th style={{ width: "20%" }}>Brand Name</th>
                  <th style={{ width: "20%" }}>Generic Name</th>
                  <th style={{ width: "10%" }}>Route</th>
                  <th style={{ width: "10%" }}>Dose</th>
                  <th style={{ width: "15%" }}>Timing</th>
                  <th style={{ width: "10%" }}>Duration</th>
                  <th style={{ width: "20%" }}>Notes</th>
                </tr>
              </thead>
              <tbody>
                {prescriptionMedicines.map((med, i) => (
                  <tr key={i}>
                    <td>{med.serial || i + 1}</td>
                    <td>{med.brandName}</td>
                    <td>{med.genericName}</td>
                    <td>{med.route}</td>
                    <td>{med.dose}</td>
                    <td>{`${med.morning || 0}-${med.afternoon || 0}-${
                      med.evening || 0
                    }-${med.night || 0}`}</td>
                    <td>{med.duration}</td>
                    <td>{med.notes || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>
              <em>No medicines prescribed</em>
            </p>
          )}
        </div>

        {/* Treatment Plan */}
        <div className="treatment-plan section">
          <h4>Treatment Plan</h4>
          <p>
            <strong>Lifestyle Advice:</strong>{" "}
            {treatmentPlan.lifestyleAdvice || "-"}
          </p>
          <p>
            <strong>Procedures:</strong> {treatmentPlan.procedures || "-"}
          </p>
          <p>
            <strong>Referrals:</strong> {treatmentPlan.referrals || "-"}
          </p>
        </div>

        {/* Follow-up */}
        <div className="follow-up section">
          <h4>Follow-up</h4>
          <p>
            <strong>Notes:</strong> {followUp.notes || "-"}
          </p>
          <p>
            <strong>Investigations:</strong> {followUp.investigations || "-"}
          </p>
          <p>
            <strong>Procedures:</strong> {followUp.procedures || "-"}
          </p>
          <p>
            <strong>Referrals:</strong> {followUp.referrals || "-"}
          </p>
          <p>
            <strong>Next Appointment:</strong>{" "}
            {followUp.nextAppointment
              ? new Date(followUp.nextAppointment).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })
              : "-"}
          </p>
          <p>
            <strong>Reminders:</strong>{" "}
            {autoReminder === "none"
              ? "None"
              : autoReminder === "custom"
              ? `Every ${customDays} days`
              : `Every ${autoReminder}`}
          </p>
        </div>

        {/* Footer */}
        <div
          className="footer section"
          style={{
            borderTop: "1.5px solid #1a3c5e",
            paddingTop: "10px",
            marginTop: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <p style={{ fontSize: "9pt", color: "#333" }}>
              <strong>Disclaimer:</strong> This is a computer-generated
              prescription. If symptoms persist or worsen, consult your doctor
              immediately. Dispense only by a licensed pharmacist.
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p>
              <strong>Dr. Rajesh Gupta</strong>
            </p>
            <p
              style={{
                borderTop: "1px solid #1a3c5e",
                width: "140px",
                marginTop: "10px",
              }}
            >
              &nbsp;
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button
            onClick={() => {
              if (window.confirm("Print prescription?")) handlePrint();
            }}
          >
            🖨️ Print
          </button>
          <button
            onClick={() => {
              if (window.confirm("Send via WhatsApp?")) handleWhatsApp();
            }}
          >
            📱 WhatsApp
          </button>
          <button
            onClick={() => {
              if (window.confirm("Send via Email?")) handleEmail();
            }}
          >
            📧 Email
          </button>
          <button
            onClick={() => {
              if (window.confirm("Save to EMR?")) handleSave();
            }}
          >
            💾 Save
          </button>
        </div>
      </div>
    );
  }
);

export default PrescriptionPreview;
