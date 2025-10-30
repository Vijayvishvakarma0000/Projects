
import React, { useState, useRef, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import AddPatientForm from "./AddPatientForm";
import PrescriptionPreview from "./PrescriptionPreview";
import DoctorSidebar from "./DoctorSidebar";

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false); // Reset error state when children change
  }, [children]);

  const handleRetry = () => {
    setHasError(false);
  };

  if (hasError) {
    return (
      <>
        <style jsx>{`
          .error-container {
            background: #fff3cd;
            border-radius: 18px;
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
            padding: 32px 28px;
            text-align: center;
            color: #856404;
            max-width: 800px;
            margin: 20px auto;
            position: relative;
            overflow: hidden;
          }

          .error-container::before {
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

          .error-container:hover::before {
            transform: scaleX(1);
          }

          .error-container:hover {
            transform: translateY(-8px);
            box-shadow: 0 14px 26px rgba(0, 0, 0, 0.15);
          }

          .error-message {
            font-size: 1rem;
            margin-bottom: 20px;
          }

          .retry-button {
            background: #186476;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 1rem;
            font-weight: 600;
            transition: background 0.3s, transform 0.2s;
          }

          .retry-button:hover {
            background: #3fa3b9;
            transform: translateY(-2px);
          }

          @media (max-width: 768px) {
            .error-container {
              padding: 24px 16px;
            }
          }
        `}</style>
        <div className="error-container">
          <p className="error-message">Error rendering prescription preview. Please check the data and try again.</p>
          <button className="retry-button" onClick={handleRetry}>
            Retry
          </button>
        </div>
      </>
    );
  }

  try {
    return children;
  } catch (error) {
    console.error("ErrorBoundary caught an error:", error);
    setHasError(true);
    return null;
  }
};

const PrescriptionManagement = () => {
  const [autoReminder, setAutoReminder] = useState("none");
  const [customDays, setCustomDays] = useState("");
  const [patients, setPatients] = useState([
    {
      name: "Amit Sharma",
      mobile: "7400501510",
      UHID: "APJ123456",
      age: 34,
      gender: "Male",
      dob: "1991-05-15",
      address: {
        locality: "Kothrud",
        city: "Pune",
        state: "Maharashtra",
        country: "India",
      },
      email: "amit.sharma@example.com",
      referredBy: "Dr. Gupta",
    },
    {
      name: "Riya Mehta",
      mobile: "9876500001",
      UHID: "SR765432",
      age: 28,
      gender: "Female",
      dob: "1997-08-22",
      address: {
        locality: "Bandra",
        city: "Mumbai",
        state: "Maharashtra",
        country: "India",
      },
      email: "riya.mehta@example.com",
      referredBy: "Self",
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [diagnosis, setDiagnosis] = useState({
    provisional: "",
    final: "",
  });
  const [clinicalHistory, setClinicalHistory] = useState({
    chiefComplaint: "",
    hpi: "",
    pastMedical: "",
    pastSurgical: "",
    family: "",
    allergies: "",
    menstrual: "",
    social: "",
  });
  const [vitals, setVitals] = useState({
    height: "",
    weight: "",
    bmi: "",
    bp: "",
    pulse: "",
    temp: "",
    respiration: "",
    spo2: "",
    findings: "",
  });
  const [investigations, setInvestigations] = useState({
    labs: "",
    imaging: "",
    reports: [],
  });
  const [treatmentPlan, setTreatmentPlan] = useState({
    lifestyleAdvice: "",
    procedures: "",
    referrals: "",
  });
  const [followUp, setFollowUp] = useState({
    notes: "",
    investigations: "",
    procedures: "",
    referrals: "",
    nextAppointment: "",
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [writtenPrescription, setWrittenPrescription] = useState("");

  const diseaseTemplates = [
    {
      id: "abd_bloating",
      name: "Abdominal Bloating",
      medicines: [
        {
          serial: 1,
          brandName: "Paracetamol",
          genericName: "Acetaminophen",
          route: "Oral",
          dose: "500mg",
          morning: 1,
          afternoon: 0,
          evening: 1,
          night: 0,
          duration: "5 days",
          notes: "After food",
        },
        {
          serial: 2,
          brandName: "Probiotic",
          genericName: "Lactobacillus",
          route: "Oral",
          dose: "1 capsule",
          morning: 1,
          afternoon: 0,
          evening: 0,
          night: 0,
          duration: "7 days",
          notes: "Before food",
        },
      ],
    },
    {
      id: "hypertension",
      name: "Hypertension",
      medicines: [
        {
          serial: 1,
          brandName: "Amlodipine",
          genericName: "Amlodipine Besylate",
          route: "Oral",
          dose: "5mg",
          morning: 1,
          afternoon: 0,
          evening: 0,
          night: 0,
          duration: "30 days",
          notes: "Take in morning",
        },
        {
          serial: 2,
          brandName: "Losartan",
          genericName: "Losartan Potassium",
          route: "Oral",
          dose: "50mg",
          morning: 1,
          afternoon: 0,
          evening: 0,
          night: 0,
          duration: "30 days",
          notes: "Take in morning",
        },
      ],
    },
    {
      id: "diabetes",
      name: "Diabetes",
      medicines: [
        {
          serial: 1,
          brandName: "Metformin",
          genericName: "Metformin Hydrochloride",
          route: "Oral",
          dose: "500mg",
          morning: 1,
          afternoon: 0,
          evening: 1,
          night: 0,
          duration: "30 days",
          notes: "With meals",
        },
        {
          serial: 2,
          brandName: "Insulin",
          genericName: "Insulin",
          route: "Subcutaneous",
          dose: "10 units",
          morning: 0,
          afternoon: 0,
          evening: 1,
          night: 1,
          duration: "As prescribed",
          notes: "Inject as per doctor",
        },
      ],
    },
  ];

  const [templateSearch, setTemplateSearch] = useState("");
  const [selectedTemplates, setSelectedTemplates] = useState([]);
  const [prescriptionMedicines, setPrescriptionMedicines] = useState([]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Reset form states when a new patient is selected
  useEffect(() => {
    if (selectedPatient) {
      setDiagnosis({ provisional: "", final: "" });
      setClinicalHistory({
        chiefComplaint: "",
        hpi: "",
        pastMedical: "",
        pastSurgical: "",
        family: "",
        allergies: "",
        menstrual: "",
        social: "",
      });
      setVitals({
        height: "",
        weight: "",
        bmi: "",
        bp: "",
        pulse: "",
        temp: "",
        respiration: "",
        spo2: "",
        findings: "",
      });
      setInvestigations({ labs: "", imaging: "", reports: [] });
      setTreatmentPlan({ lifestyleAdvice: "", procedures: "", referrals: "" });
      setFollowUp({
        notes: "",
        investigations: "",
        procedures: "",
        referrals: "",
        nextAppointment: "",
      });
      setSelectedTemplates([]);
      setPrescriptionMedicines([]);
      setAutoReminder("none");
      setCustomDays("");
      setWrittenPrescription("");
      showMessage(`Prescription form reset for patient "${selectedPatient.name}".`);
    }
  }, [selectedPatient]);

  const filteredTemplates = diseaseTemplates.filter((template) =>
    template.name.toLowerCase().includes(templateSearch.toLowerCase())
  );

  const toggleTemplateSelection = (template) => {
    if (selectedTemplates.find((t) => t.id === template.id)) {
      setSelectedTemplates(
        selectedTemplates.filter((t) => t.id !== template.id)
      );
      setPrescriptionMedicines(
        prescriptionMedicines.filter((m) => m.templateId !== template.id)
      );
      // Remove the template's name from final diagnosis if it's the only selected template
      if (selectedTemplates.length === 1) {
        setDiagnosis({ ...diagnosis, final: "" });
      }
    } else {
      setSelectedTemplates([...selectedTemplates, template]);
      const medsWithTemplate = template.medicines.map((m, index) => ({
        ...m,
        serial: prescriptionMedicines.length + index + 1,
        templateId: template.id,
      }));
      setPrescriptionMedicines([...prescriptionMedicines, ...medsWithTemplate]);
      // Update final diagnosis with selected template name
      setDiagnosis({
        ...diagnosis,
        final: selectedTemplates.length
          ? `${diagnosis.final ? diagnosis.final + ", " : ""}${template.name}`
          : template.name
      });
    }
  };

  const updateMedicine = (index, field, value) => {
    const updated = [...prescriptionMedicines];
    updated[index][field] = value;
    setPrescriptionMedicines(updated);
  };

  const removeMedicine = (index) => {
    const updated = [...prescriptionMedicines];
    updated.splice(index, 1);
    updated.forEach((med, i) => (med.serial = i + 1));
    setPrescriptionMedicines(updated);
  };

  const addMedicine = () => {
    setPrescriptionMedicines([
      ...prescriptionMedicines,
      {
        serial: prescriptionMedicines.length + 1,
        brandName: "",
        genericName: "",
        route: "",
        dose: "",
        morning: 0,
        afternoon: 0,
        evening: 0,
        night: 0,
        duration: "",
        notes: "",
        templateId: "manual",
      },
    ]);
  };

  const showMessage = (msg) => {
    console.log(msg);
  };

  const filteredPatients = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.UHID.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSavePatient = (patient) => {
    setPatients([...patients, patient]);
    setSelectedPatient(patient);
    setShowAddForm(false);
    showMessage(`✅ New patient "${patient.name}" added and selected.`);
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files).map((file) => ({
      file,
      url: URL.createObjectURL(file),
      name: file.name,
    }));
    setInvestigations({
      ...investigations,
      reports: [...investigations.reports, ...files],
    });
    showMessage("Reports uploaded successfully.");
  };

  const handleDropboxUpload = (files) => {
    const dropboxFiles = files.map((file) => ({
      file: null,
      url: file.link,
      name: file.name,
    }));
    setInvestigations({
      ...investigations,
      reports: [...investigations.reports, ...dropboxFiles],
    });
    showMessage("Dropbox files added successfully.");
  };

  const prescriptionRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => prescriptionRef.current,
    documentTitle: `Prescription_${selectedPatient?.name || "patient"}`,
    onAfterPrint: () => showMessage("Prescription sent to printer."),
  });

  const handleWhatsApp = () => {
    if (!selectedPatient?.mobile) {
      alert("Patient mobile number missing");
      return;
    }
    const text = `Prescription for ${selectedPatient.name}\n\n` +
                 `UHID: ${selectedPatient.UHID}\n` +
                 `Chief Complaint: ${clinicalHistory.chiefComplaint || "Not Specified"}\n` +
                 `Diagnosis: ${diagnosis.final || diagnosis.provisional || "Not Specified"}\n\n` +
                 (writtenPrescription 
                   ? `Written Prescription:\n${writtenPrescription}\n\n`
                   : `Medicines:\n${prescriptionMedicines
                       .map(
                         (m) =>
                           `${m.serial}. ${m.brandName} (${m.genericName}, ${m.dose}, ${m.route}) ` +
                           `${m.morning}-${m.afternoon}-${m.evening}-${m.night} for ${m.duration} | ${m.notes}`
                       )
                       .join("\n")}\n\n`) +
                 `Vitals: ${vitals.bp ? `BP: ${vitals.bp}, ` : ""}` +
                 `${vitals.pulse ? `Pulse: ${vitals.pulse}, ` : ""}` +
                 `${vitals.temp ? `Temp: ${vitals.temp}` : ""}\n` +
                 `Advice: ${treatmentPlan.lifestyleAdvice || "Not Specified"}\n` +
                 `Follow-up: ${followUp.nextAppointment ? new Date(followUp.nextAppointment).toLocaleDateString("en-IN") : "Not Specified"}\n\n` +
                 `Disclaimer: This is a computer-generated prescription. If symptoms persist, consult doctor again.`;
    const whatsappUrl = `https://wa.me/91${selectedPatient.mobile}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank");
    showMessage("Prescription sent via WhatsApp.");
  };

  const handleEmail = () => {
    if (!selectedPatient?.email) {
      alert("Patient email missing");
      return;
    }
    const subject = `Prescription for ${selectedPatient?.name || ""}`;
    const body = `Dear ${selectedPatient?.name},\n\n` +
                 `Please find your prescription details below:\n\n` +
                 `UHID: ${selectedPatient.UHID}\n` +
                 `Chief Complaint: ${clinicalHistory.chiefComplaint || "Not Specified"}\n` +
                 `Diagnosis: ${diagnosis.final || diagnosis.provisional || "Not Specified"}\n\n` +
                 (writtenPrescription 
                   ? `Written Prescription:\n${writtenPrescription}\n\n`
                   : `Medicines:\n${prescriptionMedicines
                       .map(
                         (m) =>
                           `${m.serial}. ${m.brandName} (${m.genericName}, ${m.dose}, ${m.route}) ` +
                           `${m.morning}-${m.afternoon}-${m.evening}-${m.night} for ${m.duration} (${m.notes})`
                       )
                       .join("\n")}\n\n`) +
                 `Vitals:\n${vitals.bp ? `BP: ${vitals.bp}\n` : ""}` +
                 `${vitals.pulse ? `Pulse: ${vitals.pulse}\n` : ""}` +
                 `${vitals.temp ? `Temperature: ${vitals.temp}\n` : ""}` +
                 `${vitals.findings ? `Findings: ${vitals.findings}\n` : ""}\n` +
                 `Advice: ${treatmentPlan.lifestyleAdvice || "Not Specified"}\n` +
                 `Follow-up: ${followUp.nextAppointment ? new Date(followUp.nextAppointment).toLocaleDateString("en-IN") : "Not Specified"}\n\n` +
                 `Regards,\nDr. Rajesh Gupta\nCity Health Clinic\n\n` +
                 `Disclaimer: This is a computer-generated prescription. If symptoms persist, consult doctor again.`;
    window.location.href = `mailto:${selectedPatient?.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    showMessage("Prescription sent via Email.");
  };

  const handleSave = () => {
    if (!selectedPatient) {
      alert("Please select a patient before saving.");
      return;
    }
    const prescriptionData = {
      patient: { name: selectedPatient.name, UHID: selectedPatient.UHID },
      clinicalHistory: { chiefComplaint: clinicalHistory.chiefComplaint },
      vitals: {
        bp: vitals.bp,
        pulse: vitals.pulse,
        temp: vitals.temp,
        respiration: vitals.respiration,
        spo2: vitals.spo2,
        findings: vitals.findings,
      },
      diagnosis,
      medicines: prescriptionMedicines,
      writtenPrescription,
      treatmentPlan,
      followUp,
      reminders: { autoReminder, customDays },
      date: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    };
    const blob = new Blob([JSON.stringify(prescriptionData, null, 2)], {
      type: "application/json",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `prescription_${selectedPatient?.name || "patient"}.json`;
    link.click();
    showMessage("Prescription saved to EMR.");
  };

  const handleSendReminder = () => {
    if (!selectedPatient?.mobile || !followUp.nextAppointment) {
      alert("Patient mobile number or appointment date missing");
      return;
    }
    const reminderText = `Reminder: Your next appointment for ${selectedPatient.name} is scheduled on ${new Date(followUp.nextAppointment).toLocaleDateString("en-IN")}.`;
    const whatsappUrl = `https://wa.me/91${selectedPatient.mobile}?text=${encodeURIComponent(reminderText)}`;
    window.open(whatsappUrl, "_blank");
    showMessage("Follow-up reminder sent via WhatsApp.");
  };

  const handleResetPatient = () => {
    setSelectedPatient(null);
    showMessage("Patient selection cleared.");
  };

  const isPrescriptionValid = () => {
    return (
      selectedPatient?.name &&
      selectedPatient?.UHID &&
      clinicalHistory?.chiefComplaint &&
      (vitals?.bp || vitals?.pulse || vitals?.temp || vitals?.respiration || vitals?.spo2 || vitals?.findings) &&
      (diagnosis?.provisional || diagnosis?.final) &&
      (writtenPrescription || prescriptionMedicines.every(
        (med) =>
          med.brandName && med.genericName && med.route && med.dose && med.duration
      ))
    );
  };

  useEffect(() => {
    // Load Dropbox Chooser SDK
    const script = document.createElement("script");
    script.src = "https://www.dropbox.com/static/api/2/dropins.js";
    script.id = "dropboxjs";
    script.setAttribute("data-app-key", "YOUR_DROPBOX_APP_KEY"); // Replace with your Dropbox App Key
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

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

        .header {
          font-size: 2.5rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 60px;
          color: #03678f;
          letter-spacing: 0.03em;
          text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.08);
        }

        .card {
          background: white;
          border-radius: 18px;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
          padding: 32px 28px;
          transition: all 0.35s ease;
          max-width: 800px;
          margin: 0 auto 20px;
          position: relative;
          overflow: hidden;
        }

        .card::before {
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

        .card:hover::before {
          transform: scaleX(1);
        }

        .card:hover {
          transform: translateY(-8px);
          box-shadow: 0 14px 26px rgba(0, 0, 0, 0.15);
        }

        .section-title {
          font-size: 1.8rem;
          font-weight: 600;
          color: #025b84;
          border-bottom: 2px solid #e6f2f7;
          padding-bottom: 6px;
          margin-bottom: 20px;
        }

        .sub-section-title {
          font-size: 1.2rem;
          font-weight: 600;
          color: #186476;
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
        }

        .form-group {
          display: grid;
          gap: 20px;
          grid-template-columns: 1fr 1fr;
          margin-bottom: 20px;
        }

        .vitals-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 15px;
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
        .select,
        .textarea {
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

        .textarea {
          min-height: 80px;
          resize: vertical;
        }

        .input:focus,
        .select:focus,
        .textarea:focus {
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

        .file-input {
          padding: 12px;
          border: 1px solid #3fa3b9;
          border-radius: 8px;
          background-color: #f8fafc;
          color: #186476;
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
        }

        .primary-button:hover {
          background: #3fa3b9;
          transform: translateY(-2px);
        }

        .remove-button {
          background: #dc3545;
          color: white;
        }

        .remove-button:hover {
          background: #c82333;
          transform: translateY(-2px);
        }

        .reset-button {
          background: #dc3545;
          color: white;
        }

        .reset-button:hover {
          background: #c82333;
          transform: translateY(-2px);
        }

        .dropbox-button {
          background: #0061ff;
          color: white;
          padding: 12px 24px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 600;
          transition: background 0.3s, transform 0.2s;
          margin-top: 10px;
        }

        .dropbox-button:hover {
          background: #0041cc;
          transform: translateY(-2px);
        }

        .search-results {
          background: white;
          border: 1px solid #3fa3b9;
          border-radius: 8px;
          max-height: 150px;
          overflow-y: auto;
          margin-bottom: 20px;
        }

        .search-result-item {
          padding: 12px;
          cursor: pointer;
          transition: background 0.3s;
        }

        .search-result-item:hover {
          background: #f0f0f0;
        }

        .prescription-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }

        .th,
        .td {
          border: 1px solid #e6f2f7;
          padding: 12px;
          text-align: left;
        }

        .th {
          background: #186476;
          color: white;
          font-weight: 600;
        }

        .td {
          color: #2c3e50;
        }

        .no-patient-message {
          background: #fff3cd;
          border: 1px solid #ffeeba;
          padding: 16px;
          border-radius: 8px;
          color: #856404;
          text-align: center;
          margin-bottom: 20px;
        }

        .warning-message {
          background: #fff3cd;
          border: 1px solid #ffeeba;
          padding: 16px;
          border-radius: 8px;
          color: #856404;
          text-align: center;
          margin-bottom: 20px;
        }

        .action-buttons {
          display: flex;
          gap: 15px;
          flex-wrap: wrap;
          justify-content: center;
          margin-top: 20px;
        }

        .preview-section {
          background: white;
          border-radius: 18px;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
          padding: 32px 28px;
          max-width: 800px;
          margin: 20px auto;
          position: relative;
          overflow: hidden;
        }

        .preview-section::before {
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

        .preview-section:hover::before {
          transform: scaleX(1);
        }

        .preview-section:hover {
          transform: translateY(-8px);
          box-shadow: 0 14px 26px rgba(0, 0, 0, 0.15);
        }

        .patient-info {
          margin-top: 20px;
        }

        .patient-info p {
          margin: 8px 0;
          font-size: 1rem;
          color: #2c3e50;
        }

        .patient-info strong {
          color: #186476;
        }

        @media print {
          .preview-section {
            border: none;
            box-shadow: none;
            padding: 0;
          }
          .action-buttons,
          .reset-button,
          .primary-button,
          .remove-button,
          .toggle-button,
          .dropbox-button {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .page {
            margin-left: 0;
            padding: 24px 16px;
          }
          .header {
            font-size: 2.2rem;
            margin-bottom: 40px;
          }
          .toggle-button {
            left: 10px;
            top: 10px;
          }
          .form-group,
          .vitals-grid {
            grid-template-columns: 1fr;
          }
          .card,
          .preview-section {
            padding: 24px 16px;
          }
          .prescription-table {
            display: block;
            overflow-x: auto;
            white-space: nowrap;
          }
        }
      `}</style>

      <div className="layout">
        {isSidebarOpen && <DoctorSidebar />}
        <div className="page" role="main" aria-label="Prescription Management">
          <button className="toggle-button" onClick={toggleSidebar}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
          <h1 className="header">🏥 Prescription Management</h1>
          <div className="card">
            <h2 className="section-title">1. Patient Selection</h2>
            <div className="form-group">
              <div>
                <label className="label">Search Patient</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Search by name or UHID"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && filteredPatients.length > 0 && (
                  <div className="search-results">
                    {filteredPatients.map((p, i) => (
                      <div
                        key={i}
                        className="search-result-item"
                        onClick={() => {
                          setSelectedPatient(p);
                          setSearchTerm("");
                          showMessage(`Patient "${p.name}" selected.`);
                        }}
                      >
                        {p.name} (UHID: {p.UHID})
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div style={{ display: "flex", gap: "15px", alignItems: "flex-end" }}>
                <button
                  className="button primary-button"
                  onClick={() => setShowAddForm(!showAddForm)}
                >
                  {showAddForm ? "Close Form" : "Add New Patient"}
                </button>
                {selectedPatient && (
                  <button className="button reset-button" onClick={handleResetPatient}>
                    Clear Patient Selection
                  </button>
                )}
              </div>
            </div>
            {showAddForm && (
              <AddPatientForm
                onSave={handleSavePatient}
                onClose={() => setShowAddForm(false)}
              />
            )}
            {selectedPatient && (
              <div className="patient-info">
                <h3 className="sub-section-title">Patient Demographics</h3>
                <p><strong>Name:</strong> {selectedPatient.name}</p>
                <p><strong>UHID:</strong> {selectedPatient.UHID}</p>
                <p><strong>Age/Gender:</strong> {selectedPatient.age}/{selectedPatient.gender}</p>
                <p><strong>DOB:</strong> {selectedPatient.dob}</p>
                <p><strong>Address:</strong> {`${selectedPatient.address.locality}, ${selectedPatient.address.city}, ${selectedPatient.address.state}, ${selectedPatient.address.country}`}</p>
                <p><strong>Contact:</strong> {selectedPatient.mobile} | {selectedPatient.email}</p>
                <p><strong>Referred By:</strong> {selectedPatient.referredBy}</p>
              </div>
            )}
          </div>

          {!selectedPatient ? (
            <div className="no-patient-message">
              Please select a patient to start the prescription process.
            </div>
          ) : (
            <>
              {!isPrescriptionValid() && (
                <div className="warning-message">
                  Warning: Please complete all required fields (Name, UHID, Chief Complaint, at least one vital, diagnosis, and complete prescription details) before previewing.
                </div>
              )}
              <div className="card">
                <h2 className="section-title">2. Clinical History</h2>
                <div className="form-group">
                  <div>
                    <label className="label">Chief Complaint</label>
                    <textarea
                      className="textarea"
                      value={clinicalHistory.chiefComplaint}
                      onChange={(e) =>
                        setClinicalHistory({
                          ...clinicalHistory,
                          chiefComplaint: e.target.value,
                        })
                      }
                      placeholder="Reason for visit..."
                    />
                  </div>
                  <div>
                    <label className="label">History of Present Illness (HPI)</label>
                    <textarea
                      className="textarea"
                      value={clinicalHistory.hpi}
                      onChange={(e) =>
                        setClinicalHistory({
                          ...clinicalHistory,
                          hpi: e.target.value,
                        })
                      }
                      placeholder="History of present illness..."
                    />
                  </div>
                  <div>
                    <label className="label">Past Medical History</label>
                    <textarea
                      className="textarea"
                      value={clinicalHistory.pastMedical}
                      onChange={(e) =>
                        setClinicalHistory({
                          ...clinicalHistory,
                          pastMedical: e.target.value,
                        })
                      }
                      placeholder="Diabetes, Hypertension, Thyroid, etc..."
                    />
                  </div>
                  <div>
                    <label className="label">Past Surgical History</label>
                    <textarea
                      className="textarea"
                      value={clinicalHistory.pastSurgical}
                      onChange={(e) =>
                        setClinicalHistory({
                          ...clinicalHistory,
                          pastSurgical: e.target.value,
                        })
                      }
                      placeholder="Previous surgeries..."
                    />
                  </div>
                  <div>
                    <label className="label">Family History</label>
                    <textarea
                      className="textarea"
                      value={clinicalHistory.family}
                      onChange={(e) =>
                        setClinicalHistory({
                          ...clinicalHistory,
                          family: e.target.value,
                        })
                      }
                      placeholder="Family medical history..."
                    />
                  </div>
                  <div>
                    <label className="label">Allergies</label>
                    <textarea
                      className="textarea"
                      value={clinicalHistory.allergies}
                      onChange={(e) =>
                        setClinicalHistory({
                          ...clinicalHistory,
                          allergies: e.target.value,
                        })
                      }
                      placeholder="Known allergies..."
                    />
                  </div>
                  <div>
                    <label className="label">Menstrual History</label>
                    <textarea
                      className="textarea"
                      value={clinicalHistory.menstrual}
                      onChange={(e) =>
                        setClinicalHistory({
                          ...clinicalHistory,
                          menstrual: e.target.value,
                        })
                      }
                      placeholder="Menstrual history (if applicable)..."
                    />
                  </div>
                  <div>
                    <label className="label">Social History</label>
                    <textarea
                      className="textarea"
                      value={clinicalHistory.social}
                      onChange={(e) =>
                        setClinicalHistory({
                          ...clinicalHistory,
                          social: e.target.value,
                        })
                      }
                      placeholder="Smoking, Alcohol, Lifestyle..."
                    />
                  </div>
                </div>
              </div>

              <div className="card">
                <h2 className="section-title">3. Examination / Vitals</h2>
                <div className="vitals-grid">
                  <div>
                    <label className="label">Height (cm)</label>
                    <input
                      type="number"
                      className="input"
                      value={vitals.height}
                      onChange={(e) => {
                        const height = e.target.value;
                        setVitals({ ...vitals, height });
                        if (height && vitals.weight) {
                          const bmi = (
                            vitals.weight / ((height / 100) ** 2)
                          ).toFixed(2);
                          setVitals((prev) => ({ ...prev, bmi }));
                        }
                      }}
                      placeholder="Height in cm"
                    />
                  </div>
                  <div>
                    <label className="label">Weight (kg)</label>
                    <input
                      type="number"
                      className="input"
                      value={vitals.weight}
                      onChange={(e) => {
                        const weight = e.target.value;
                        setVitals({ ...vitals, weight });
                        if (vitals.height && weight) {
                          const bmi = (
                            weight / ((vitals.height / 100) ** 2)
                          ).toFixed(2);
                          setVitals((prev) => ({ ...prev, bmi }));
                        }
                      }}
                      placeholder="Weight in kg"
                    />
                  </div>
                  <div>
                    <label className="label">BMI</label>
                    <input
                      type="text"
                      className="input"
                      value={vitals.bmi}
                      readOnly
                      placeholder="Auto-calculated"
                    />
                  </div>
                  <div>
                    <label className="label">BP (mmHg)</label>
                    <input
                      type="text"
                      className="input"
                      value={vitals.bp}
                      onChange={(e) =>
                        setVitals({ ...vitals, bp: e.target.value })
                      }
                      placeholder="e.g., 120/80"
                    />
                  </div>
                  <div>
                    <label className="label">Pulse (bpm)</label>
                    <input
                      type="number"
                      className="input"
                      value={vitals.pulse}
                      onChange={(e) =>
                        setVitals({ ...vitals, pulse: e.target.value })
                      }
                      placeholder="Pulse rate"
                    />
                  </div>
                  <div>
                    <label className="label">Temperature (°C)</label>
                    <input
                      type="number"
                      className="input"
                      value={vitals.temp}
                      onChange={(e) =>
                        setVitals({ ...vitals, temp: e.target.value })
                      }
                      placeholder="Temperature"
                    />
                  </div>
                  <div>
                    <label className="label">Respiration (breaths/min)</label>
                    <input
                      type="number"
                      className="input"
                      value={vitals.respiration}
                      onChange={(e) =>
                        setVitals({ ...vitals, respiration: e.target.value })
                      }
                      placeholder="Respiration rate"
                    />
                  </div>
                  <div>
                    <label className="label">SpO2 (%)</label>
                    <input
                      type="number"
                      className="input"
                      value={vitals.spo2}
                      onChange={(e) =>
                        setVitals({ ...vitals, spo2: e.target.value })
                      }
                      placeholder="Oxygen saturation"
                    />
                  </div>
                </div>
                <div>
                  <label className="label">Examination Findings</label>
                  <textarea
                    className="textarea"
                    value={vitals.findings}
                    onChange={(e) =>
                      setVitals({ ...vitals, findings: e.target.value })
                    }
                    placeholder="Physical examination findings..."
                  />
                </div>
              </div>

              <div className="card">
                <h2 className="section-title">4. Investigations</h2>
                <div className="form-group">
                  <div>
                    <label className="label">Labs</label>
                    <textarea
                      className="textarea"
                      value={investigations.labs}
                      onChange={(e) =>
                        setInvestigations({
                          ...investigations,
                          labs: e.target.value,
                        })
                      }
                      placeholder="HbA1c, FBS/PPBS, Lipid profile, Thyroid profile, CBC, etc..."
                    />
                  </div>
                  <div>
                    <label className="label">Imaging</label>
                    <textarea
                      className="textarea"
                      value={investigations.imaging}
                      onChange={(e) =>
                        setInvestigations({
                          ...investigations,
                          imaging: e.target.value,
                        })
                      }
                      placeholder="X-ray, 2D Echo, ECG, USG, etc..."
                    />
                  </div>
                </div>
                <div>
                  <label className="label">Upload Reports (PDF/Image)</label>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="file-input"
                    onChange={handleFileUpload}
                  />
                  <button
                    className="dropbox-button"
                    onClick={() => {
                      window.Dropbox.choose({
                        success: handleDropboxUpload,
                        cancel: () => {},
                        linkType: "direct",
                        multiselect: true,
                        extensions: ['.pdf', '.jpg', '.jpeg', '.png'],
                      });
                    }}
                  >
                    Upload from Dropbox
                  </button>
                  {investigations.reports.length > 0 && (
                    <div style={{ marginTop: "20px" }}>
                      <h3 className="sub-section-title">Uploaded Reports:</h3>
                      <ul>
                        {investigations.reports.map((report, i) => (
                          <li key={i}>
                            <a href={report.url} target="_blank" rel="noopener noreferrer">
                              {report.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <div className="card">
                <h2 className="section-title">5. Diagnosis</h2>
                <div className="form-group">
                  <div>
                    <label className="label">Provisional Diagnosis</label>
                    <textarea
                      className="textarea"
                      value={diagnosis.provisional}
                      onChange={(e) =>
                        setDiagnosis({ ...diagnosis, provisional: e.target.value })
                      }
                      placeholder="Provisional diagnosis..."
                    />
                  </div>
                  <div>
                    <label className="label">Final Diagnosis</label>
                    <textarea
                      className="textarea"
                      value={diagnosis.final}
                      onChange={(e) =>
                        setDiagnosis({ ...diagnosis, final: e.target.value })
                      }
                      placeholder="Final diagnosis..."
                    />
                  </div>
                </div>
              </div>

              <div className="card">
                <h2 className="section-title">6. Prescription Creation</h2>
                <div>
                  <label className="label">Search Disease Templates</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="Search disease templates..."
                    value={templateSearch}
                    onChange={(e) => setTemplateSearch(e.target.value)}
                  />
                  {templateSearch && (
                    <div className="search-results">
                      {filteredTemplates.map((template) => (
                        <div
                          key={template.id}
                          className="search-result-item"
                          onClick={() => {
                            toggleTemplateSelection(template);
                            setTemplateSearch("");
                            showMessage(`Template "${template.name}" selected.`);
                          }}
                        >
                          {template.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div style={{ marginTop: "20px" }}>
                  <h3 className="sub-section-title">Written Prescription</h3>
                  <textarea
                    className="textarea"
                    value={writtenPrescription}
                    onChange={(e) => setWrittenPrescription(e.target.value)}
                    placeholder="Enter written prescription details..."
                    style={{ minHeight: "120px" }}
                  />
                </div>
              </div>

              <div className="card">
                <h2 className="section-title">7. Edit Prescription</h2>
                {prescriptionMedicines.length > 0 && (
                  <table className="prescription-table">
                    <thead>
                      <tr>
                        <th className="th">Serial</th>
                        <th className="th">Brand Name</th>
                        <th className="th">Generic Name</th>
                        <th className="th">Route</th>
                        <th className="th">Dose</th>
                        <th className="th">Timings (M-A-E-N)</th>
                        <th className="th">Duration</th>
                        <th className="th">Notes</th>
                        <th className="th">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {prescriptionMedicines.map((med, index) => (
                        <tr key={index}>
                          <td className="td">{med.serial}</td>
                          <td className="td">
                            <input
                              type="text"
                              className="input"
                              value={med.brandName}
                              onChange={(e) =>
                                updateMedicine(index, "brandName", e.target.value)
                              }
                              placeholder="Brand Name"
                              required
                            />
                          </td>
                          <td className="td">
                            <input
                              type="text"
                              className="input"
                              value={med.genericName}
                              onChange={(e) =>
                                updateMedicine(index, "genericName", e.target.value)
                              }
                              placeholder="Generic Name"
                              required
                            />
                          </td>
                          <td className="td">
                            <select
                              className="select"
                              value={med.route}
                              onChange={(e) =>
                                updateMedicine(index, "route", e.target.value)
                              }
                              required
                            >
                              <option value="">Select Route</option>
                              <option value="Oral">Oral</option>
                              <option value="Subcutaneous">Subcutaneous</option>
                              <option value="Intravenous">Intravenous</option>
                              <option value="Topical">Topical</option>
                            </select>
                          </td>
                          <td className="td">
                            <input
                              type="text"
                              className="input"
                              value={med.dose}
                              onChange={(e) =>
                                updateMedicine(index, "dose", e.target.value)
                              }
                              placeholder="Dose"
                              required
                            />
                          </td>
                          <td className="td">
                            <input
                              type="text"
                              className="input"
                              value={`${med.morning || 0}-${med.afternoon || 0}-${med.evening || 0}-${med.night || 0}`}
                              onChange={(e) => {
                                const parts = e.target.value
                                  .split("-")
                                  .map((p) => parseInt(p.trim()) || 0);
                                updateMedicine(index, "morning", parts[0]);
                                updateMedicine(index, "afternoon", parts[1]);
                                updateMedicine(index, "evening", parts[2]);
                                updateMedicine(index, "night", parts[3]);
                              }}
                              placeholder="M-A-E-N"
                            />
                          </td>
                          <td className="td">
                            <input
                              type="text"
                              className="input"
                              value={med.duration}
                              onChange={(e) =>
                                updateMedicine(index, "duration", e.target.value)
                              }
                              placeholder="Duration"
                              required
                            />
                          </td>
                          <td className="td">
                            <input
                              type="text"
                              className="input"
                              value={med.notes}
                              onChange={(e) =>
                                updateMedicine(index, "notes", e.target.value)
                              }
                              placeholder="Notes"
                            />
                          </td>
                          <td className="td">
                            <button
                              className="button remove-button"
                              onClick={() => removeMedicine(index)}
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
                <button className="button primary-button" onClick={addMedicine}>
                  + Add Medicine
                </button>
              </div>

              <div className="card">
                <h2 className="section-title">8. Treatment Plan</h2>
                <div className="form-group">
                  <div>
                    <label className="label">Lifestyle Advice</label>
                    <textarea
                      className="textarea"
                      value={treatmentPlan.lifestyleAdvice}
                      onChange={(e) =>
                        setTreatmentPlan({
                          ...treatmentPlan,
                          lifestyleAdvice: e.target.value,
                        })
                      }
                      placeholder="Diet, exercise, or other lifestyle recommendations..."
                    />
                  </div>
                  <div>
                    <label className="label">Procedures</label>
                    <textarea
                      className="textarea"
                      value={treatmentPlan.procedures}
                      onChange={(e) =>
                        setTreatmentPlan({
                          ...treatmentPlan,
                          procedures: e.target.value,
                        })
                      }
                      placeholder="Recommended procedures..."
                    />
                  </div>
                  <div>
                    <label className="label">Referrals</label>
                    <textarea
                      className="textarea"
                      value={treatmentPlan.referrals}
                      onChange={(e) =>
                        setTreatmentPlan({
                          ...treatmentPlan,
                          referrals: e.target.value,
                        })
                      }
                      placeholder="Referrals to specialists..."
                    />
                  </div>
                </div>
              </div>

              <div className="card">
                <h2 className="section-title">9. Follow-up</h2>
                <div className="form-group">
                  <div>
                    <label className="label">Follow-up Notes</label>
                    <textarea
                      className="textarea"
                      value={followUp.notes}
                      onChange={(e) =>
                        setFollowUp({ ...followUp, notes: e.target.value })
                      }
                      placeholder="Notes for follow-up visit..."
                    />
                  </div>
                  <div>
                    <label className="label">Investigations Advised</label>
                    <textarea
                      className="textarea"
                      value={followUp.investigations}
                      onChange={(e) =>
                        setFollowUp({
                          ...followUp,
                          investigations: e.target.value,
                        })
                      }
                      placeholder="Investigations for follow-up..."
                    />
                  </div>
                  <div>
                    <label className="label">Procedures Advised</label>
                    <textarea
                      className="textarea"
                      value={followUp.procedures}
                      onChange={(e) =>
                        setFollowUp({ ...followUp, procedures: e.target.value })
                      }
                      placeholder="Procedures for follow-up..."
                    />
                  </div>
                  <div>
                    <label className="label">Referrals</label>
                    <textarea
                      className="textarea"
                      value={followUp.referrals}
                      onChange={(e) =>
                        setFollowUp({ ...followUp, referrals: e.target.value })
                      }
                      placeholder="Referrals for follow-up..."
                    />
                  </div>
                  <div>
                    <label className="label">Next Appointment Date</label>
                    <input
                      type="date"
                      className="input"
                      value={followUp.nextAppointment}
                      onChange={(e) =>
                        setFollowUp({
                          ...followUp,
                          nextAppointment: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="label">Auto Reminders</label>
                    <select
                      className="select"
                      value={autoReminder}
                      onChange={(e) => setAutoReminder(e.target.value)}
                    >
                      <option value="none">None</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="custom">Custom (days)</option>
                    </select>
                    {autoReminder === "custom" && (
                      <input
                        type="number"
                        className="input"
                        placeholder="Enter number of days"
                        min="1"
                        value={customDays}
                        onChange={(e) => setCustomDays(e.target.value)}
                      />
                    )}
                  </div>
                </div>
                <button className="button primary-button" onClick={handleSendReminder}>
                  Send Follow-up Reminder
                </button>
              </div>

              <div className="card">
                <h2 className="section-title">10. Output</h2>
                <div className="action-buttons">
                  <button className="button primary-button" onClick={handlePrint}>
                    Print Prescription
                  </button>
                  <button className="button primary-button" onClick={handleWhatsApp}>
                    Send via WhatsApp
                  </button>
                  <button className="button primary-button" onClick={handleEmail}>
                    Send via Email
                  </button>
                  <button className="button primary-button" onClick={handleSave}>
                    Save to EMR
                  </button>
                </div>
              </div>

              {selectedPatient && (
                <div className="preview-section">
                  <h2 className="section-title">Prescription Preview</h2>
                  <ErrorBoundary>
                    <PrescriptionPreview
                      ref={prescriptionRef}
                      selectedPatient={selectedPatient}
                      clinicalHistory={clinicalHistory}
                      vitals={vitals}
                      diagnosis={diagnosis}
                      prescriptionMedicines={prescriptionMedicines}
                      writtenPrescription={writtenPrescription}
                      treatmentPlan={treatmentPlan}
                      followUp={followUp}
                      autoReminder={autoReminder}
                      customDays={customDays}
                      handlePrint={handlePrint}
                      handleWhatsApp={handleWhatsApp}
                      handleEmail={handleEmail}
                      handleSave={handleSave}
                    />
                  </ErrorBoundary>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PrescriptionManagement;
















