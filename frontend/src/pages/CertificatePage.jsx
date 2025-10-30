/*
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import DoctorSidebar from "./DoctorSidebar"; // Assuming DoctorSidebar is available

const CertificatePage = () => {
  const [selectedPatientId, setSelectedPatientId] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [remarks, setRemarks] = useState("");
  const [duration, setDuration] = useState("");
  const [notes, setNotes] = useState("");
  const [history, setHistory] = useState([]);
  const [previewCert, setPreviewCert] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const certificateTypes = [
    "Leave",
    "Fitness",
    "Insurance",
    "Travel",
    "Hospitalization",
    "Pregnancy",
    "Vaccination",
    "Surgery",
    "COVID recovery",
  ];

  const patients = [
    { id: 1, name: "John Doe", age: 30, gender: "Male", contact: "9876543210" },
    { id: 2, name: "Jane Smith", age: 28, gender: "Female", contact: "9876543211" },
    { id: 3, name: "Rohan Gupta", age: 35, gender: "Male", contact: "9876543212" },
  ];

  const doctor = {
    name: "Dr. Priya Sharma",
    degree: "MBBS, MD",
    clinic: "City Health Clinic",
    registrationNo: "REG12345",
  };

  const selectedPatient = patients.find((p) => p.id === parseInt(selectedPatientId));

  const handleGenerate = () => {
    if (!selectedPatient) return alert("Please select a patient");
    if (!selectedType) return alert("Please select certificate type");

    const newCert = {
      type: selectedType,
      patient: selectedPatient,
      doctor,
      remarks,
      duration,
      notes,
      date: new Date().toLocaleDateString(),
    };

    setHistory([newCert, ...history]);
    setPreviewCert(newCert);

    setRemarks("");
    setDuration("");
    setNotes("");
  };

  const handlePrint = (cert) => {
    const content = getCertificateContent(cert);
    const newWindow = window.open();
    newWindow.document.write(content);
    newWindow.print();
  };

  const handleWhatsApp = (cert) => {
    const message = encodeURIComponent(stripHtml(getCertificateContent(cert)));
    window.open(`https://wa.me/?text=${message}`, "_blank");
  };

  const handleEmail = (cert) => {
    const subject = encodeURIComponent(`Certificate - ${cert.type}`);
    const body = encodeURIComponent(stripHtml(getCertificateContent(cert)));
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  const stripHtml = (html) => {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const getCertificateContent = (cert) => `
    <div style="
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
      width: 650px; 
      margin: 20px auto; 
      padding: 30px; 
      border: 3px solid #05668d; 
      border-radius: 12px; 
      text-align: center;
      background-color: #f0f9fb;
    ">
      <h2 style="margin-bottom:15px; color:#0288d1;">${cert.type} Certificate</h2>
      <p><strong>Date:</strong> ${cert.date}</p>
      <p><strong>Patient:</strong> ${cert.patient.name}, Age: ${cert.patient.age}, Gender: ${cert.patient.gender}</p>
      <p><strong>Doctor:</strong> ${cert.doctor.name}, ${cert.doctor.degree}, ${cert.doctor.clinic}</p>
      <p><strong>Remarks:</strong> ${cert.remarks}</p>
      <p><strong>Duration:</strong> ${cert.duration}</p>
      <p><strong>Notes:</strong> ${cert.notes}</p>
      <hr style="margin:20px 0; border-color:#05668d;">
      <p style="font-size:14px; color:#555;">Generated from Medical Web Portal</p>
    </div>
  `;

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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
          min-height: 100vh;
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
          margin-bottom: 40px;
          color: #03678f;
          letter-spacing: 0.03em;
          text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.08);
        }

        .form-card,
        .preview-card,
        .history-card {
          background: white;
          padding: 25px;
          border-radius: 12px;
          margin-bottom: 25px;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
          transition: all 0.35s ease;
        }

        .form-card:hover,
        .preview-card:hover,
        .history-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 14px 26px rgba(0, 0, 0, 0.15);
        }

        .form-group {
          margin-bottom: 15px;
          display: flex;
          flex-direction: column;
        }

        label {
          font-weight: bold;
          margin-bottom: 5px;
          color: #05668d;
        }

        input,
        select,
        textarea {
          padding: 10px;
          border-radius: 6px;
          border: 1px solid #ccc;
          width: 100%;
          font-size: 1rem;
        }

        textarea {
          resize: vertical;
          min-height: 100px;
        }

        button {
          padding: 10px 15px;
          border-radius: 6px;
          border: none;
          background-color: #186476;
          color: white;
          cursor: pointer;
          margin-top: 10px;
          font-size: 1rem;
        }

        button:hover {
          background-color: #3fa3b9;
        }

        .action-container button {
          margin-right: 10px;
          background: #05668d;
        }

        .action-container button:hover {
          background: #0288d1;
        }

        .history-list {
          list-style: none;
          padding: 0;
        }

        .history-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px;
          border-bottom: 1px solid #ddd;
          flex-wrap: wrap;
          gap: 5px;
        }

        .history-item div {
          flex: 1;
          min-width: 200px;
        }

        @media (max-width: 768px) {
          .page {
            margin-left: 0;
            padding: 24px 16px;
          }

          h1 {
            font-size: 2.2rem;
            margin-bottom: 30px;
          }

          .toggle-button {
            left: 10px;
            top: 10px;
          }
        }
      `}</style>

      <div className="layout">
        {isSidebarOpen && <DoctorSidebar />}
        <div className="page" role="main" aria-label="Certificate Management page">
          <button className="toggle-button" onClick={toggleSidebar}>
                     <FaBars size={10} />
                   </button>
          <h1>📄 Certificate Management</h1>

          <div className="form-card">
            <h3>Patient & Certificate Details</h3>

            <div className="form-group">
              <label>Select Patient</label>
              <select
                value={selectedPatientId}
                onChange={(e) => setSelectedPatientId(e.target.value)}
              >
                <option value="">--Select Patient--</option>
                {patients.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} (Age: {p.age}, {p.gender})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Certificate Type</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="">--Select Type--</option>
                {certificateTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Remarks</label>
              <input
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Enter remarks"
              />
            </div>

            <div className="form-group">
              <label>Duration</label>
              <input
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="Enter duration"
              />
            </div>

            <div className="form-group">
              <label>Notes</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Additional notes"
              />
            </div>

            <button className="primary-btn" onClick={handleGenerate}>
              Generate Certificate
            </button>
          </div>

          {previewCert && (
            <div className="preview-card">
              <h3>Certificate Preview</h3>
              <div dangerouslySetInnerHTML={{ __html: getCertificateContent(previewCert) }} />
              <div className="action-container">
                <button onClick={() => handlePrint(previewCert)}>Print / PDF</button>
                <button onClick={() => handleWhatsApp(previewCert)}>WhatsApp</button>
                <button onClick={() => handleEmail(previewCert)}>Email</button>
              </div>
            </div>
          )}

          <div className="history-card">
            <h3>History</h3>
            {history.length === 0 ? (
              <p>No certificates generated yet.</p>
            ) : (
              <ul className="history-list">
                {history.map((cert, index) => (
                  <li key={index} className="history-item">
                    <div>
                      <strong>{cert.type}</strong> - {cert.patient.name} - {cert.date}
                    </div>
                    <div>
                      <button onClick={() => handlePrint(cert)}>Print / PDF</button>
                      <button onClick={() => handleWhatsApp(cert)}>WhatsApp</button>
                      <button onClick={() => handleEmail(cert)}>Email</button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CertificatePage;



*/

import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import DoctorSidebar from "./DoctorSidebar"; // Assuming DoctorSidebar is available
import axios from "axios";
import { useSelector } from "react-redux";

const CertificatePage = () => {
  // State declarations (unchanged from original)
  const [patientName, setPatientName] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [patientGender, setPatientGender] = useState("");
  const [patientContact, setPatientContact] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [history, setHistory] = useState([]);
  const [previewCert, setPreviewCert] = useState(null);
  const [createdCertId, setCreatedCertId] = useState(null);
  const [createdCertType, setCreatedCertType] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [error, setError] = useState("");
  const [token, setToken] = useState("");

  // Other state declarations (unchanged)
  const [remarks, setRemarks] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [place, setPlace] = useState("Indore");
  const [diagnosis, setDiagnosis] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [idProofNo, setIdProofNo] = useState("");
  const [resumeDate, setResumeDate] = useState("");
  const [examDate, setExamDate] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bp, setBp] = useState("");
  const [pulse, setPulse] = useState("");
  const [visionLeft, setVisionLeft] = useState("");
  const [visionRight, setVisionRight] = useState("");
  const [hearing, setHearing] = useState("");
  const [chest, setChest] = useState("");
  const [teeth, setTeeth] = useState("");
  const [mentalCondition, setMentalCondition] = useState("");
  const [purpose, setPurpose] = useState("");
  const [village, setVillage] = useState("");
  const [po, setPo] = useState("");
  const [ps, setPs] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [pin, setPin] = useState("");
  const [positiveDate, setPositiveDate] = useState("");
  const [negativeDate, setNegativeDate] = useState("");
  const [examinationDate, setExaminationDate] = useState("");
  const [fitnessStatus, setFitnessStatus] = useState("");
  const [advice, setAdvice] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [surgeryName, setSurgeryName] = useState("");
  const [surgeryDate, setSurgeryDate] = useState("");
  const [anesthesiaType, setAnesthesiaType] = useState("");
  const [recoveryStatus, setRecoveryStatus] = useState("");
  const [hospitalStayFrom, setHospitalStayFrom] = useState("");
  const [hospitalStayTo, setHospitalStayTo] = useState("");
  const [pregnancyWeeks, setPregnancyWeeks] = useState("");
  const [expectedDeliveryDate, setExpectedDeliveryDate] = useState("");
  const [maternityLeaveFrom, setMaternityLeaveFrom] = useState("");
  const [maternityLeaveTo, setMaternityLeaveTo] = useState("");
  const [surgeryType, setSurgeryType] = useState("");
  const [investigations, setInvestigations] = useState("");
  const [fitStatus, setFitStatus] = useState("");
  const [specialRemarks, setSpecialRemarks] = useState("");
  const [travelPurpose, setTravelPurpose] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [fitForTravel, setFitForTravel] = useState(false);
  const [precautions, setPrecautions] = useState("");
  const [institutionName, setInstitutionName] = useState("");
  const [classSection, setClassSection] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [restDays, setRestDays] = useState("");
  const [doctorAdvice, setDoctorAdvice] = useState("");
  const [insuranceCompany, setInsuranceCompany] = useState("");
  const [policyNumber, setPolicyNumber] = useState("");
  const [claimNumber, setClaimNumber] = useState("");
  const [treatmentGiven, setTreatmentGiven] = useState("");
  const [admissionDate, setAdmissionDate] = useState("");
  const [dischargeDate, setDischargeDate] = useState("");
  const [billAmount, setBillAmount] = useState("");
  const [vaccineName, setVaccineName] = useState("");
  const [doseNumber, setDoseNumber] = useState("");
  const [batchNumber, setBatchNumber] = useState("");
  const [vaccinationDate, setVaccinationDate] = useState("");
  const [nextDoseDate, setNextDoseDate] = useState("");
  const [ward, setWard] = useState("");
  const [bedNumber, setBedNumber] = useState("");
  const [advisedRestDays, setAdvisedRestDays] = useState("");

  const { refreshToken } = useSelector((state) => state.auth);

  const certificateTypes = [
    "fitness",
    "preoperative_fitness",
    "leave",
    "fit_to_resume",
    "hospitalization",
    "vaccination",
    "maternity",
    "illness",
    "travel",
    "insurance",
    "surgical",
    "covid_fit",
  ];

  // Fetch token (unchanged)
  useEffect(() => {
    const storedToken = localStorage.getItem("token") || refreshToken;
    if (storedToken) {
      setToken(storedToken);
    } else {
      setError("Authentication token is missing. Please log in again.");
    }
  }, [refreshToken]);

  // Reset form (unchanged)
  const resetForm = () => {
    setPatientName("");
    setPatientAge("");
    setPatientGender("");
    setPatientContact("");
    setRemarks("");
    setFromDate("");
    setToDate("");
    setPlace("Indore");
    setDiagnosis("");
    setFatherName("");
    setIdProofNo("");
    setResumeDate("");
    setExamDate("");
    setHeight("");
    setWeight("");
    setBp("");
    setPulse("");
    setVisionLeft("");
    setVisionRight("");
    setHearing("");
    setChest("");
    setTeeth("");
    setMentalCondition("");
    setPurpose("");
    setVillage("");
    setPo("");
    setPs("");
    setDistrict("");
    setState("");
    setPin("");
    setPositiveDate("");
    setNegativeDate("");
    setExaminationDate("");
    setFitnessStatus("");
    setAdvice("");
    setHospitalName("");
    setSurgeryName("");
    setSurgeryDate("");
    setAnesthesiaType("");
    setRecoveryStatus("");
    setHospitalStayFrom("");
    setHospitalStayTo("");
    setPregnancyWeeks("");
    setExpectedDeliveryDate("");
    setMaternityLeaveFrom("");
    setMaternityLeaveTo("");
    setSurgeryType("");
    setInvestigations("");
    setFitStatus("");
    setSpecialRemarks("");
    setTravelPurpose("");
    setTravelDate("");
    setFitForTravel(false);
    setPrecautions("");
    setInstitutionName("");
    setClassSection("");
    setRollNumber("");
    setRestDays("");
    setDoctorAdvice("");
    setInsuranceCompany("");
    setPolicyNumber("");
    setClaimNumber("");
    setTreatmentGiven("");
    setAdmissionDate("");
    setDischargeDate("");
    setBillAmount("");
    setVaccineName("");
    setDoseNumber("");
    setBatchNumber("");
    setVaccinationDate("");
    setNextDoseDate("");
    setWard("");
    setBedNumber("");
    setAdvisedRestDays("");
    setCreatedCertId(null);
    setCreatedCertType(null);
    setPreviewCert(null);
  };

  // Generate certificate (unchanged)
  const handleGenerate = async () => {
    if (!patientName) return setError("Please enter patient name");
    if (!patientAge) return setError("Please enter patient age");
    if (!patientGender) return setError("Please enter patient gender");
    if (!selectedType) return setError("Please select certificate type");
    if (!token) return setError("Authentication token is missing");

    const requiredFields = {
      fit_to_resume: [fromDate, toDate, resumeDate, place, diagnosis],
      fitness: [
        examDate,
        height,
        weight,
        bp,
        pulse,
        visionLeft,
        visionRight,
        hearing,
        chest,
        teeth,
        mentalCondition,
        purpose,
        village,
        po,
        ps,
        district,
        state,
        pin,
        fatherName,
      ],
      covid_fit: [
        positiveDate,
        negativeDate,
        examinationDate,
        fitnessStatus,
        advice,
        place,
      ],
      surgical: [
        hospitalName,
        surgeryName,
        surgeryDate,
        anesthesiaType,
        recoveryStatus,
        hospitalStayFrom,
        hospitalStayTo,
        diagnosis,
        advice,
        place,
      ],
      maternity: [
        examinationDate,
        pregnancyWeeks,
        expectedDeliveryDate,
        fitnessStatus,
        advice,
        maternityLeaveFrom,
        maternityLeaveTo,
        remarks,
        place,
      ],
      preoperative_fitness: [
        surgeryType,
        surgeryDate,
        hospitalName,
        investigations,
        fitStatus,
        specialRemarks,
        place,
      ],
      travel: [
        travelPurpose,
        travelDate,
        diagnosis,
        fitForTravel,
        precautions,
        place,
      ],
      illness: [
        institutionName,
        classSection,
        rollNumber,
        diagnosis,
        fromDate,
        toDate,
        restDays,
        doctorAdvice,
        place,
        idProofNo,
        fatherName,
      ],
      insurance: [
        insuranceCompany,
        policyNumber,
        claimNumber,
        diagnosis,
        treatmentGiven,
        admissionDate,
        dischargeDate,
        hospitalName,
        billAmount,
        remarks,
        place,
        idProofNo,
        fatherName,
      ],
      vaccination: [
        vaccineName,
        doseNumber,
        batchNumber,
        vaccinationDate,
        nextDoseDate,
        place,
        idProofNo,
        fatherName,
      ],
      hospitalization: [
        admissionDate,
        dischargeDate,
        diagnosis,
        treatmentGiven,
        hospitalName,
        ward,
        bedNumber,
        advisedRestDays,
        place,
        idProofNo,
        fatherName,
      ],
      leave: [
        fromDate,
        toDate,
        diagnosis,
        restDays,
        place,
        idProofNo,
        fatherName,
      ],
    };

    const missingFields = requiredFields[selectedType]?.filter(
      (field) => !field
    );
    if (missingFields?.length > 0) {
      return setError(
        `Please fill in all required fields: ${missingFields.join(", ")}`
      );
    }

    const payload = {
      type: selectedType,
      name: patientName,
      age: parseInt(patientAge),
      gender: patientGender.toLowerCase(),
      ...(patientContact && { contact: patientContact }),
      ...(fatherName && { fatherName }),
      ...(idProofNo && { idProofNo }),
      details: {
        ...(diagnosis && { diagnosis }),
        ...(fromDate && { fromDate }),
        ...(toDate && { toDate }),
        ...(place && { place }),
        ...(remarks && { remarks }),
        ...(resumeDate && { resumeDate }),
        ...(examDate && { examDate }),
        ...(height && { height: parseInt(height) }),
        ...(weight && { weight: parseInt(weight) }),
        ...(bp && { bp }),
        ...(pulse && { pulse: parseInt(pulse) }),
        ...(visionLeft && { visionLeft }),
        ...(visionRight && { visionRight }),
        ...(hearing && { hearing }),
        ...(chest && { chest }),
        ...(teeth && { teeth }),
        ...(mentalCondition && { mentalCondition }),
        ...(purpose && { purpose }),
        ...(village && { village }),
        ...(po && { po }),
        ...(ps && { ps }),
        ...(district && { district }),
        ...(state && { state }),
        ...(pin && { pin }),
        ...(positiveDate && { positiveDate }),
        ...(negativeDate && { negativeDate }),
        ...(examinationDate && { examinationDate }),
        ...(fitnessStatus && { fitnessStatus }),
        ...(advice && { advice }),
        ...(hospitalName && { hospitalName }),
        ...(surgeryName && { surgeryName }),
        ...(surgeryDate && { surgeryDate }),
        ...(anesthesiaType && { anesthesiaType }),
        ...(recoveryStatus && { recoveryStatus }),
        ...(hospitalStayFrom && { hospitalStayFrom }),
        ...(hospitalStayTo && { hospitalStayTo }),
        ...(pregnancyWeeks && { pregnancyWeeks: parseInt(pregnancyWeeks) }),
        ...(expectedDeliveryDate && { expectedDeliveryDate }),
        ...(maternityLeaveFrom && { maternityLeaveFrom }),
        ...(maternityLeaveTo && { maternityLeaveTo }),
        ...(surgeryType && { surgeryType }),
        ...(investigations && { investigations }),
        ...(fitStatus && { fitStatus }),
        ...(specialRemarks && { specialRemarks }),
        ...(travelPurpose && { travelPurpose }),
        ...(travelDate && { travelDate }),
        ...(fitForTravel && { fitForTravel: fitForTravel === "true" }),
        ...(precautions && { precautions }),
        ...(institutionName && { institutionName }),
        ...(classSection && { classSection }),
        ...(rollNumber && { rollNumber }),
        ...(restDays && { restDays: parseInt(restDays) }),
        ...(doctorAdvice && { doctorAdvice }),
        ...(insuranceCompany && { insuranceCompany }),
        ...(policyNumber && { policyNumber }),
        ...(claimNumber && { claimNumber }),
        ...(treatmentGiven && { treatmentGiven }),
        ...(admissionDate && { admissionDate }),
        ...(dischargeDate && { dischargeDate }),
        ...(billAmount && { billAmount: parseInt(billAmount) }),
        ...(vaccineName && { vaccineName }),
        ...(doseNumber && { doseNumber: parseInt(doseNumber) }),
        ...(batchNumber && { batchNumber }),
        ...(vaccinationDate && { vaccinationDate }),
        ...(nextDoseDate && { nextDoseDate }),
        ...(ward && { ward }),
        ...(bedNumber && { bedNumber }),
        ...(advisedRestDays && { advisedRestDays: parseInt(advisedRestDays) }),
      },
    };

    try {
      const response = await axios.post(
        "https://api.mediscript.in/api/certificate/create",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Cookie: `refreshToken=${token}`,
          },
        }
      );

      if (response.data.success && response.data.certificate) {
        const newCert = {
          ...response.data.certificate,
          patient: {
            name: response.data.certificate.name,
            age: response.data.certificate.age,
            gender: response.data.certificate.gender,
            contact: response.data.certificate.contact,
          },
          doctor: {
            name: response.data.certificate.doctorId || "Dr. Unknown",
            degree: "MBBS, MD",
            clinic: "City Health Clinic",
            registrationNo: "REG12345",
          },
          date: new Date(
            response.data.certificate.issueDate
          ).toLocaleDateString(),
        };
        setHistory([newCert, ...history]);
        setCreatedCertId(response.data.certificate._id);
        setCreatedCertType(response.data.certificate.type);
        setError("");
        resetForm();
      } else {
        setError(response.data.message || "Failed to generate certificate");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Error generating certificate");
    }
  };

  // Enhanced handleViewCertificate with detailed error handling
  const handleViewCertificate = async (certId, type) => {
    try {
      console.log(`Fetching certificate: ID=${certId}, Type=${type}`); // Debug log
      const certDetails = await fetchCertificateDetails(certId, type);
      if (certDetails) {
        setPreviewCert(certDetails.certificate);
        setError(""); // Clear any previous errors
      } else {
        setError(
          `Certificate not found for ID: ${certId}, Type: ${type}. Please verify the certificate details.`
        );
      }
    } catch (err) {
      console.error(
        `Error fetching certificate ID=${certId}, Type=${type}:`,
        err
      );
      setError(
        err.response?.status === 404
          ? `Certificate not found for ID: ${certId}, Type: ${type}. Please check if the certificate exists.`
          : `Error fetching certificate: ${
              err.response?.data?.error || err.message || "Unknown error"
            }`
      );
    }
  };

  // Enhanced handleViewPdf with detailed error handling
  const handleViewPdf = async (certId, type) => {
    if (!token) {
      setError("Authentication token is missing. Please log in again.");
      return;
    }

    const endpointMap = {
      fitness: `print`, // Updated to 'fit' to resolve 404 error for fitness type
      preoperative_fitness: `pre`,
      leave: `leave`,
      fit_to_resume: `fit-to-resume`,
      hospitalization: `hospital`,
      vaccination: `vaccin`,
      maternity: `maternity`,
      illness: `illness`,
      travel: `travel`,
      insurance: `insurance`,
      surgical: `surgical`,
      covid_fit: `recover`,
      print: `print`,
    };

    const endpoint = `https://api.mediscript.in/api/certificate/${endpointMap[type]}/${certId}`;
    console.log(`Fetching PDF from: ${endpoint}`); // Debug log

    try {
      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
          Cookie: `refreshToken=${token}`,
        },
        responseType: "blob", // For PDF
      });

      const file = new Blob([response.data], { type: "application/pdf" });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL, "_blank");
      setError(""); // Clear any previous errors
    } catch (err) {
      console.error(`Error fetching PDF for ID=${certId}, Type=${type}:`, err);
      setError(
        err.response?.status === 404
          ? `PDF not found for certificate ID: ${certId}, Type: ${type}. Please check if the certificate exists.`
          : `Error fetching PDF: ${
              err.response?.data?.error || err.message || "Unknown error"
            }`
      );
    }
  };

  // Enhanced fetchCertificateDetails with detailed error handling and updated endpointMap
  const fetchCertificateDetails = async (certId, type) => {
    if (!token) {
      setError("Authentication token is missing. Please log in again.");
      return null;
    }

    const endpointMap = {
      fitness: `fit`, // Updated to 'fit' to resolve 404 error for fitness type
      preoperative_fitness: `pre`,
      leave: `leave`,
      fit_to_resume: `fit-to-resume`,
      hospitalization: `hospital`,
      vaccination: `vaccin`,
      maternity: `maternity`,
      illness: `illness`,
      travel: `travel`,
      insurance: `insurance`,
      surgical: `surgical`,
      covid_fit: `recover`,
      print: `print`,
    };

    const endpoint = `https://api.mediscript.in/api/certificate/${endpointMap[type]}/${certId}`;
    console.log(`Fetching certificate details from: ${endpoint}`); // Debug log

    try {
      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
          Cookie: `refreshToken=${token}`,
        },
      });

      if (response.data.success && response.data.certificate) {
        return {
          certificate: {
            ...response.data.certificate,
            patient: {
              name: response.data.certificate.name,
              age: response.data.certificate.age,
              gender: response.data.certificate.gender,
              contact: response.data.certificate.contact,
            },
            doctor: {
              name: response.data.certificate.doctorId || "Dr. Unknown",
              degree: "MBBS, MD",
              clinic: "City Health Clinic",
              registrationNo: "REG12345",
            },
            date: new Date(
              response.data.certificate.issueDate
            ).toLocaleDateString(),
          },
        };
      } else {
        setError(
          response.data.message ||
            `Failed to fetch certificate details for ID: ${certId}, Type: ${type}`
        );
        return null;
      }
    } catch (err) {
      console.error(
        `Error in fetchCertificateDetails for ID=${certId}, Type=${type}:`,
        err
      );
      setError(
        err.response?.status === 404
          ? `Certificate not found for ID: ${certId}, Type: ${type}. Please verify the certificate details.`
          : `Error fetching certificate details: ${
              err.response?.data?.error || err.message || "Unknown error"
            }`
      );
      return null;
    }
  };

  // Print, WhatsApp, Email functions (unchanged)
  const handlePrint = async (cert) => {
    const details = await fetchCertificateDetails(
      cert._id,
      cert.type === "print" ? "print" : cert.type
    );
    if (!details) return;

    const content = getCertificateContent(details.certificate || cert);
    const newWindow = window.open();
    newWindow.document.write(content);
    newWindow.print();
  };

  const handleWhatsApp = async (cert) => {
    const details = await fetchCertificateDetails(
      cert._id,
      cert.type === "print" ? "print" : cert.type
    );
    if (!details) return;

    const message = encodeURIComponent(
      stripHtml(getCertificateContent(details.certificate || cert))
    );
    window.open(`https://wa.me/?text=${message}`, "_blank");
  };

  const handleEmail = async (cert) => {
    const details = await fetchCertificateDetails(
      cert._id,
      cert.type === "print" ? "print" : cert.type
    );
    if (!details) return;

    const subject = encodeURIComponent(`Certificate - ${cert.type}`);
    const body = encodeURIComponent(
      stripHtml(getCertificateContent(details.certificate || cert))
    );
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  const stripHtml = (html) => {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  // Certificate content rendering (unchanged)
  const getCertificateContent = (cert) => {
    const details = cert.details || {};
    return `
      <div style="
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
        width: 650px; 
        margin: 20px auto; 
        padding: 30px; 
        border: 3px solid #05668d; 
        border-radius: 12px; 
        text-align: center;
        background-color: #f0f9fb;
      ">
        <h2 style="margin-bottom:15px; color:#0288d1;">${cert.type
          .replace(/_/g, " ")
          .toUpperCase()} Certificate</h2>
        <p><strong>Date:</strong> ${
          cert.date || new Date(cert.issueDate).toLocaleDateString()
        }</p>
        <p><strong>Patient:</strong> ${cert.name || cert.patient.name}, Age: ${
      cert.age || cert.patient.age
    }, Gender: ${cert.gender || cert.patient.gender}</p>
        ${
          cert.fatherName
            ? `<p><strong>Father's Name:</strong> ${cert.fatherName}</p>`
            : ""
        }
        ${
          cert.idProofNo
            ? `<p><strong>ID Proof No:</strong> ${cert.idProofNo}</p>`
            : ""
        }
        <p><strong>Doctor:</strong> ${cert.doctor.name}, ${
      cert.doctor.degree
    }, ${cert.doctor.clinic}</p>
        ${
          details.diagnosis
            ? `<p><strong>Diagnosis:</strong> ${details.diagnosis}</p>`
            : ""
        }
        ${
          details.fromDate && details.toDate
            ? `<p><strong>Duration:</strong> From ${details.fromDate} to ${details.toDate}</p>`
            : ""
        }
        ${
          details.resumeDate
            ? `<p><strong>Resume Date:</strong> ${details.resumeDate}</p>`
            : ""
        }
        ${
          details.examDate
            ? `<p><strong>Examination Date:</strong> ${details.examDate}</p>`
            : ""
        }
        ${
          details.height
            ? `<p><strong>Height:</strong> ${details.height} cm</p>`
            : ""
        }
        ${
          details.weight
            ? `<p><strong>Weight:</strong> ${details.weight} kg</p>`
            : ""
        }
        ${
          details.bp
            ? `<p><strong>Blood Pressure:</strong> ${details.bp}</p>`
            : ""
        }
        ${
          details.pulse
            ? `<p><strong>Pulse:</strong> ${details.pulse} bpm</p>`
            : ""
        }
        ${
          details.visionLeft
            ? `<p><strong>Vision (Left):</strong> ${details.visionLeft}</p>`
            : ""
        }
        ${
          details.visionRight
            ? `<p><strong>Vision (Right):</strong> ${details.visionRight}</p>`
            : ""
        }
        ${
          details.hearing
            ? `<p><strong>Hearing:</strong> ${details.hearing}</p>`
            : ""
        }
        ${
          details.chest ? `<p><strong>Chest:</strong> ${details.chest}</p>` : ""
        }
        ${
          details.teeth ? `<p><strong>Teeth:</strong> ${details.teeth}</p>` : ""
        }
        ${
          details.mentalCondition
            ? `<p><strong>Mental Condition:</strong> ${details.mentalCondition}</p>`
            : ""
        }
        ${
          details.purpose
            ? `<p><strong>Purpose:</strong> ${details.purpose}</p>`
            : ""
        }
        ${
          details.village
            ? `<p><strong>Village:</strong> ${details.village}</p>`
            : ""
        }
        ${
          details.po ? `<p><strong>Post Office:</strong> ${details.po}</p>` : ""
        }
        ${
          details.ps
            ? `<p><strong>Police Station:</strong> ${details.ps}</p>`
            : ""
        }
        ${
          details.district
            ? `<p><strong>District:</strong> ${details.district}</p>`
            : ""
        }
        ${
          details.state ? `<p><strong>State:</strong> ${details.state}</p>` : ""
        }
        ${details.pin ? `<p><strong>PIN:</strong> ${details.pin}</p>` : ""}
        ${
          details.positiveDate
            ? `<p><strong>Positive Date:</strong> ${details.positiveDate}</p>`
            : ""
        }
        ${
          details.negativeDate
            ? `<p><strong>Negative Date:</strong> ${details.negativeDate}</p>`
            : ""
        }
        ${
          details.examinationDate
            ? `<p><strong>Examination Date:</strong> ${details.examinationDate}</p>`
            : ""
        }
        ${
          details.fitnessStatus
            ? `<p><strong>Fitness Status:</strong> ${details.fitnessStatus}</p>`
            : ""
        }
        ${
          details.advice
            ? `<p><strong>Advice:</strong> ${details.advice}</p>`
            : ""
        }
        ${
          details.hospitalName
            ? `<p><strong>Hospital Name:</strong> ${details.hospitalName}</p>`
            : ""
        }
        ${
          details.surgeryName
            ? `<p><strong>Surgery Name:</strong> ${details.surgeryName}</p>`
            : ""
        }
        ${
          details.surgeryDate
            ? `<p><strong>Surgery Date:</strong> ${details.surgeryDate}</p>`
            : ""
        }
        ${
          details.anesthesiaType
            ? `<p><strong>Anesthesia Type:</strong> ${details.anesthesiaType}</p>`
            : ""
        }
        ${
          details.recoveryStatus
            ? `<p><strong>Recovery Status:</strong> ${details.recoveryStatus}</p>`
            : ""
        }
        ${
          details.hospitalStayFrom && details.hospitalStayTo
            ? `<p><strong>Hospital Stay:</strong> From ${details.hospitalStayFrom} to ${details.hospitalStayTo}</p>`
            : ""
        }
        ${
          details.pregnancyWeeks
            ? `<p><strong>Pregnancy Weeks:</strong> ${details.pregnancyWeeks}</p>`
            : ""
        }
        ${
          details.expectedDeliveryDate
            ? `<p><strong>Expected Delivery Date:</strong> ${details.expectedDeliveryDate}</p>`
            : ""
        }
        ${
          details.maternityLeaveFrom && details.maternityLeaveTo
            ? `<p><strong>Maternity Leave:</strong> From ${details.maternityLeaveFrom} to ${details.maternityLeaveTo}</p>`
            : ""
        }
        ${
          details.surgeryType
            ? `<p><strong>Surgery Type:</strong> ${details.surgeryType}</p>`
            : ""
        }
        ${
          details.investigations
            ? `<p><strong>Investigations:</strong> ${details.investigations}</p>`
            : ""
        }
        ${
          details.fitStatus
            ? `<p><strong>Fitness Status:</strong> ${details.fitStatus}</p>`
            : ""
        }
        ${
          details.specialRemarks
            ? `<p><strong>Special Remarks:</strong> ${details.specialRemarks}</p>`
            : ""
        }
        ${
          details.travelPurpose
            ? `<p><strong>Travel Purpose:</strong> ${details.travelPurpose}</p>`
            : ""
        }
        ${
          details.travelDate
            ? `<p><strong>Travel Date:</strong> ${details.travelDate}</p>`
            : ""
        }
        ${
          details.fitForTravel !== undefined
            ? `<p><strong>Fit for Travel:</strong> ${
                details.fitForTravel ? "Yes" : "No"
              }</p>`
            : ""
        }
        ${
          details.precautions
            ? `<p><strong>Precautions:</strong> ${details.precautions}</p>`
            : ""
        }
        ${
          details.institutionName
            ? `<p><strong>Institution Name:</strong> ${details.institutionName}</p>`
            : ""
        }
        ${
          details.classSection
            ? `<p><strong>Class/Section:</strong> ${details.classSection}</p>`
            : ""
        }
        ${
          details.rollNumber
            ? `<p><strong>Roll Number:</strong> ${details.rollNumber}</p>`
            : ""
        }
        ${
          details.restDays
            ? `<p><strong>Rest Days:</strong> ${details.restDays}</p>`
            : ""
        }
        ${
          details.doctorAdvice
            ? `<p><strong>Doctor Advice:</strong> ${details.doctorAdvice}</p>`
            : ""
        }
        ${
          details.insuranceCompany
            ? `<p><strong>Insurance Company:</strong> ${details.insuranceCompany}</p>`
            : ""
        }
        ${
          details.policyNumber
            ? `<p><strong>Policy Number:</strong> ${details.policyNumber}</p>`
            : ""
        }
        ${
          details.claimNumber
            ? `<p><strong>Claim Number:</strong> ${details.claimNumber}</p>`
            : ""
        }
        ${
          details.treatmentGiven
            ? `<p><strong>Treatment Given:</strong> ${details.treatmentGiven}</p>`
            : ""
        }
        ${
          details.admissionDate && details.dischargeDate
            ? `<p><strong>Hospitalization:</strong> From ${details.admissionDate} to ${details.dischargeDate}</p>`
            : ""
        }
        ${
          details.billAmount
            ? `<p><strong>Bill Amount:</strong> ₹${details.billAmount}</p>`
            : ""
        }
        ${
          details.vaccineName
            ? `<p><strong>Vaccine Name:</strong> ${details.vaccineName}</p>`
            : ""
        }
        ${
          details.doseNumber
            ? `<p><strong>Dose Number:</strong> ${details.doseNumber}</p>`
            : ""
        }
        ${
          details.batchNumber
            ? `<p><strong>Batch Number:</strong> ${details.batchNumber}</p>`
            : ""
        }
        ${
          details.vaccinationDate
            ? `<p><strong>Vaccination Date:</strong> ${details.vaccinationDate}</p>`
            : ""
        }
        ${
          details.nextDoseDate
            ? `<p><strong>Next Dose Date:</strong> ${details.nextDoseDate}</p>`
            : ""
        }
        ${details.ward ? `<p><strong>Ward:</strong> ${details.ward}</p>` : ""}
        ${
          details.bedNumber
            ? `<p><strong>Bed Number:</strong> ${details.bedNumber}</p>`
            : ""
        }
        ${
          details.advisedRestDays
            ? `<p><strong>Advised Rest Days:</strong> ${details.advisedRestDays}</p>`
            : ""
        }
        ${
          details.remarks
            ? `<p><strong>Remarks:</strong> ${details.remarks}</p>`
            : ""
        }
        <p><strong>Place:</strong> ${details.place || "Not specified"}</p>
        <hr style="margin:20px 0; border-color:#05668d;">
        <p style="font-size:14px; color:#555;">Generated from Medical Web Portal</p>
      </div>
    `;
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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
          min-height: 100vh;
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
          margin-bottom: 40px;
          color: #03678f;
          letter-spacing: 0.03em;
          text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.08);
        }

        .form-card,
        .preview-card,
        .history-card {
          background: white;
          padding: 25px;
          border-radius: 12px;
          margin-bottom: 25px;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
          transition: all 0.35s ease;
        }

        .form-card:hover,
        .preview-card:hover,
        .history-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 14px 26px rgba(0, 0, 0, 0.15);
        }

        .form-group {
          margin-bottom: 15px;
          display: flex;
          flex-direction: column;
        }

        label {
          font-weight: bold;
          margin-bottom: 5px;
          color: #05668d;
        }

        input,
        select,
        textarea {
          padding: 10px;
          border-radius: 6px;
          border: 1px solid #ccc;
          width: 100%;
          font-size: 1rem;
        }

        textarea {
          resize: vertical;
          min-height: 100px;
        }

        button {
          padding: 10px 15px;
          border-radius: 6px;
          border: none;
          background-color: #186476;
          color: white;
          cursor: pointer;
          margin-top: 10px;
          font-size: 1rem;
        }

        button:hover {
          background-color: #3fa3b9;
        }

        .action-container {
          display: flex;
          gap: 10px;
          justify-content: center;
        }

        .action-container button {
          margin-right: 10px;
          background: #05668d;
        }

        .action-container button:hover {
          background: #0288d1;
        }

        .history-list {
          list-style: none;
          padding: 0;
        }

        .history-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px;
          border-bottom: 1px solid #ddd;
          flex-wrap: wrap;
          gap: 5px;
        }

        .history-item div {
          flex: 1;
          min-width: 200px;
        }

        .error {
          color: red;
          margin-bottom: 15px;
          text-align: center;
          font-weight: 500;
          background-color: #ffe6e6;
          padding: 10px;
          border-radius: 6px;
        }

        @media (max-width: 768px) {
          .page {
            margin-left: 0;
            padding: 24px 16px;
          }

          h1 {
            font-size: 2.2rem;
            margin-bottom: 30px;
          }

          .toggle-button {
            left: 10px;
            top: 10px;
          }

          .action-container {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>

      <div className="layout">
        {isSidebarOpen && <DoctorSidebar />}
        <div
          className="page"
          role="main"
          aria-label="Certificate Management page"
        >
          <button className="toggle-button" onClick={toggleSidebar}>
            {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
          <h1>📄 Certificate Management</h1>

          {error && <p className="error">{error}</p>}

          <div className="form-card">
            <h3>Patient & Certificate Details</h3>

            <div className="form-group">
              <label>Patient Name</label>
              <input
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="Enter patient name"
              />
            </div>

            <div className="form-group">
              <label>Patient Age</label>
              <input
                type="number"
                value={patientAge}
                onChange={(e) => setPatientAge(e.target.value)}
                placeholder="Enter patient age"
              />
            </div>

            <div className="form-group">
              <label>Patient Gender</label>
              <select
                value={patientGender}
                onChange={(e) => setPatientGender(e.target.value)}
              >
                <option value="">--Select Gender--</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Patient Contact (Optional)</label>
              <input
                value={patientContact}
                onChange={(e) => setPatientContact(e.target.value)}
                placeholder="Enter patient contact"
              />
            </div>

            <div className="form-group">
              <label>Certificate Type</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="">--Select Type--</option>
                {certificateTypes.map((type) => (
                  <option key={type} value={type}>
                    {type.replace(/_/g, " ").toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            {[
              "fitness",
              "illness",
              "insurance",
              "vaccination",
              "hospitalization",
              "leave",
            ].includes(selectedType) && (
              <div className="form-group">
                <label>Father's Name</label>
                <input
                  value={fatherName}
                  onChange={(e) => setFatherName(e.target.value)}
                  placeholder="Enter father's name"
                />
              </div>
            )}

            {[
              "illness",
              "insurance",
              "vaccination",
              "hospitalization",
              "leave",
            ].includes(selectedType) && (
              <div className="form-group">
                <label>ID Proof No</label>
                <input
                  value={idProofNo}
                  onChange={(e) => setIdProofNo(e.target.value)}
                  placeholder="Enter ID proof number"
                />
              </div>
            )}

            {(selectedType === "fit_to_resume" ||
              selectedType === "illness" ||
              selectedType === "leave" ||
              selectedType === "maternity" ||
              selectedType === "travel" ||
              selectedType === "insurance" ||
              selectedType === "hospitalization" ||
              selectedType === "surgical") && (
              <div className="form-group">
                <label>Diagnosis</label>
                <textarea
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                  placeholder="Enter diagnosis"
                />
              </div>
            )}

            {(selectedType === "fit_to_resume" ||
              selectedType === "illness" ||
              selectedType === "leave") && (
              <>
                <div className="form-group">
                  <label>From Date</label>
                  <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    placeholder="Select from date"
                  />
                </div>
                <div className="form-group">
                  <label>To Date</label>
                  <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    placeholder="Select to date"
                  />
                </div>
              </>
            )}

            {selectedType === "fit_to_resume" && (
              <div className="form-group">
                <label>Resume Date</label>
                <input
                  type="date"
                  value={resumeDate}
                  onChange={(e) => setResumeDate(e.target.value)}
                  placeholder="Select resume date"
                />
              </div>
            )}

            {(selectedType === "fitness" ||
              selectedType === "covid_fit" ||
              selectedType === "surgical" ||
              selectedType === "maternity" ||
              selectedType === "preoperative_fitness" ||
              selectedType === "travel" ||
              selectedType === "illness" ||
              selectedType === "insurance" ||
              selectedType === "vaccination" ||
              selectedType === "hospitalization" ||
              selectedType === "leave") && (
              <div className="form-group">
                <label>Place</label>
                <input
                  value={place}
                  onChange={(e) => setPlace(e.target.value)}
                  placeholder="Enter place (e.g., Indore)"
                />
              </div>
            )}

            {(selectedType === "fit_to_resume" ||
              selectedType === "maternity" ||
              selectedType === "insurance") && (
              <div className="form-group">
                <label>Remarks</label>
                <input
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="Enter remarks"
                />
              </div>
            )}

            {selectedType === "fitness" && (
              <>
                <div className="form-group">
                  <label>Examination Date</label>
                  <input
                    type="date"
                    value={examDate}
                    onChange={(e) => setExamDate(e.target.value)}
                    placeholder="Select examination date"
                  />
                </div>
                <div className="form-group">
                  <label>Height (cm)</label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="Enter height"
                  />
                </div>
                <div className="form-group">
                  <label>Weight (kg)</label>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="Enter weight"
                  />
                </div>
                <div className="form-group">
                  <label>Blood Pressure</label>
                  <input
                    value={bp}
                    onChange={(e) => setBp(e.target.value)}
                    placeholder="Enter BP (e.g., 120/80)"
                  />
                </div>
                <div className="form-group">
                  <label>Pulse (bpm)</label>
                  <input
                    type="number"
                    value={pulse}
                    onChange={(e) => setPulse(e.target.value)}
                    placeholder="Enter pulse"
                  />
                </div>
                <div className="form-group">
                  <label>Vision Left</label>
                  <input
                    value={visionLeft}
                    onChange={(e) => setVisionLeft(e.target.value)}
                    placeholder="Enter vision left (e.g., 6/6)"
                  />
                </div>
                <div className="form-group">
                  <label>Vision Right</label>
                  <input
                    value={visionRight}
                    onChange={(e) => setVisionRight(e.target.value)}
                    placeholder="Enter vision right (e.g., 6/6)"
                  />
                </div>
                <div className="form-group">
                  <label>Hearing</label>
                  <input
                    value={hearing}
                    onChange={(e) => setHearing(e.target.value)}
                    placeholder="Enter hearing status"
                  />
                </div>
                <div className="form-group">
                  <label>Chest</label>
                  <input
                    value={chest}
                    onChange={(e) => setChest(e.target.value)}
                    placeholder="Enter chest status"
                  />
                </div>
                <div className="form-group">
                  <label>Teeth</label>
                  <input
                    value={teeth}
                    onChange={(e) => setTeeth(e.target.value)}
                    placeholder="Enter teeth status"
                  />
                </div>
                <div className="form-group">
                  <label>Mental Condition</label>
                  <input
                    value={mentalCondition}
                    onChange={(e) => setMentalCondition(e.target.value)}
                    placeholder="Enter mental condition"
                  />
                </div>
                <div className="form-group">
                  <label>Purpose</label>
                  <input
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    placeholder="Enter purpose (e.g., Employment)"
                  />
                </div>
                <div className="form-group">
                  <label>Village</label>
                  <input
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                    placeholder="Enter village"
                  />
                </div>
                <div className="form-group">
                  <label>Post Office</label>
                  <input
                    value={po}
                    onChange={(e) => setPo(e.target.value)}
                    placeholder="Enter post office"
                  />
                </div>
                <div className="form-group">
                  <label>Police Station</label>
                  <input
                    value={ps}
                    onChange={(e) => setPs(e.target.value)}
                    placeholder="Enter police station"
                  />
                </div>
                <div className="form-group">
                  <label>District</label>
                  <input
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    placeholder="Enter district"
                  />
                </div>
                <div className="form-group">
                  <label>State</label>
                  <input
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="Enter state"
                  />
                </div>
                <div className="form-group">
                  <label>PIN</label>
                  <input
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder="Enter PIN"
                  />
                </div>
              </>
            )}

            {selectedType === "covid_fit" && (
              <>
                <div className="form-group">
                  <label>Positive Date</label>
                  <input
                    type="date"
                    value={positiveDate}
                    onChange={(e) => setPositiveDate(e.target.value)}
                    placeholder="Select positive date"
                  />
                </div>
                <div className="form-group">
                  <label>Negative Date</label>
                  <input
                    type="date"
                    value={negativeDate}
                    onChange={(e) => setNegativeDate(e.target.value)}
                    placeholder="Select negative date"
                  />
                </div>
                <div className="form-group">
                  <label>Examination Date</label>
                  <input
                    type="date"
                    value={examinationDate}
                    onChange={(e) => setExaminationDate(e.target.value)}
                    placeholder="Select examination date"
                  />
                </div>
                <div className="form-group">
                  <label>Fitness Status</label>
                  <input
                    value={fitnessStatus}
                    onChange={(e) => setFitnessStatus(e.target.value)}
                    placeholder="Enter fitness status (e.g., FIT)"
                  />
                </div>
                <div className="form-group">
                  <label>Advice</label>
                  <textarea
                    value={advice}
                    onChange={(e) => setAdvice(e.target.value)}
                    placeholder="Enter advice"
                  />
                </div>
              </>
            )}

            {selectedType === "surgical" && (
              <>
                <div className="form-group">
                  <label>Hospital Name</label>
                  <input
                    value={hospitalName}
                    onChange={(e) => setHospitalName(e.target.value)}
                    placeholder="Enter hospital name"
                  />
                </div>
                <div className="form-group">
                  <label>Surgery Name</label>
                  <input
                    value={surgeryName}
                    onChange={(e) => setSurgeryName(e.target.value)}
                    placeholder="Enter surgery name"
                  />
                </div>
                <div className="form-group">
                  <label>Surgery Date</label>
                  <input
                    type="date"
                    value={surgeryDate}
                    onChange={(e) => setSurgeryDate(e.target.value)}
                    placeholder="Select surgery date"
                  />
                </div>
                <div className="form-group">
                  <label>Anesthesia Type</label>
                  <input
                    value={anesthesiaType}
                    onChange={(e) => setAnesthesiaType(e.target.value)}
                    placeholder="Enter anesthesia type"
                  />
                </div>
                <div className="form-group">
                  <label>Recovery Status</label>
                  <input
                    value={recoveryStatus}
                    onChange={(e) => setRecoveryStatus(e.target.value)}
                    placeholder="Enter recovery status"
                  />
                </div>
                <div className="form-group">
                  <label>Hospital Stay From</label>
                  <input
                    type="date"
                    value={hospitalStayFrom}
                    onChange={(e) => setHospitalStayFrom(e.target.value)}
                    placeholder="Select hospital stay from date"
                  />
                </div>
                <div className="form-group">
                  <label>Hospital Stay To</label>
                  <input
                    type="date"
                    value={hospitalStayTo}
                    onChange={(e) => setHospitalStayTo(e.target.value)}
                    placeholder="Select hospital stay to date"
                  />
                </div>
                <div className="form-group">
                  <label>Advice</label>
                  <textarea
                    value={advice}
                    onChange={(e) => setAdvice(e.target.value)}
                    placeholder="Enter advice"
                  />
                </div>
              </>
            )}

            {selectedType === "maternity" && (
              <>
                <div className="form-group">
                  <label>Examination Date</label>
                  <input
                    type="date"
                    value={examinationDate}
                    onChange={(e) => setExaminationDate(e.target.value)}
                    placeholder="Select examination date"
                  />
                </div>
                <div className="form-group">
                  <label>Pregnancy Weeks</label>
                  <input
                    type="number"
                    value={pregnancyWeeks}
                    onChange={(e) => setPregnancyWeeks(e.target.value)}
                    placeholder="Enter pregnancy weeks"
                  />
                </div>
                <div className="form-group">
                  <label>Expected Delivery Date</label>
                  <input
                    type="date"
                    value={expectedDeliveryDate}
                    onChange={(e) => setExpectedDeliveryDate(e.target.value)}
                    placeholder="Select expected delivery date"
                  />
                </div>
                <div className="form-group">
                  <label>Fitness Status</label>
                  <input
                    value={fitnessStatus}
                    onChange={(e) => setFitnessStatus(e.target.value)}
                    placeholder="Enter fitness status (e.g., fit)"
                  />
                </div>
                <div className="form-group">
                  <label>Advice</label>
                  <textarea
                    value={advice}
                    onChange={(e) => setAdvice(e.target.value)}
                    placeholder="Enter advice"
                  />
                </div>
                <div className="form-group">
                  <label>Maternity Leave From</label>
                  <input
                    type="date"
                    value={maternityLeaveFrom}
                    onChange={(e) => setMaternityLeaveFrom(e.target.value)}
                    placeholder="Select maternity leave from date"
                  />
                </div>
                <div className="form-group">
                  <label>Maternity Leave To</label>
                  <input
                    type="date"
                    value={maternityLeaveTo}
                    onChange={(e) => setMaternityLeaveTo(e.target.value)}
                    placeholder="Select maternity leave to date"
                  />
                </div>
              </>
            )}

            {selectedType === "preoperative_fitness" && (
              <>
                <div className="form-group">
                  <label>Surgery Type</label>
                  <input
                    value={surgeryType}
                    onChange={(e) => setSurgeryType(e.target.value)}
                    placeholder="Enter surgery type"
                  />
                </div>
                <div className="form-group">
                  <label>Surgery Date</label>
                  <input
                    type="date"
                    value={surgeryDate}
                    onChange={(e) => setSurgeryDate(e.target.value)}
                    placeholder="Select surgery date"
                  />
                </div>
                <div className="form-group">
                  <label>Hospital Name</label>
                  <input
                    value={hospitalName}
                    onChange={(e) => setHospitalName(e.target.value)}
                    placeholder="Enter hospital name"
                  />
                </div>
                <div className="form-group">
                  <label>Investigations</label>
                  <input
                    value={investigations}
                    onChange={(e) => setInvestigations(e.target.value)}
                    placeholder="Enter investigations"
                  />
                </div>
                <div className="form-group">
                  <label>Fitness Status</label>
                  <input
                    value={fitStatus}
                    onChange={(e) => setFitStatus(e.target.value)}
                    placeholder="Enter fitness status (e.g., fit)"
                  />
                </div>
                <div className="form-group">
                  <label>Special Remarks</label>
                  <input
                    value={specialRemarks}
                    onChange={(e) => setSpecialRemarks(e.target.value)}
                    placeholder="Enter special remarks"
                  />
                </div>
              </>
            )}

            {selectedType === "travel" && (
              <>
                <div className="form-group">
                  <label>Travel Purpose</label>
                  <input
                    value={travelPurpose}
                    onChange={(e) => setTravelPurpose(e.target.value)}
                    placeholder="Enter travel purpose"
                  />
                </div>
                <div className="form-group">
                  <label>Travel Date</label>
                  <input
                    type="date"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    placeholder="Select travel date"
                  />
                </div>
                <div className="form-group">
                  <label>Fit for Travel</label>
                  <select
                    value={fitForTravel}
                    onChange={(e) => setFitForTravel(e.target.value)}
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Precautions</label>
                  <textarea
                    value={precautions}
                    onChange={(e) => setPrecautions(e.target.value)}
                    placeholder="Enter precautions"
                  />
                </div>
              </>
            )}

            {selectedType === "illness" && (
              <>
                <div className="form-group">
                  <label>Institution Name</label>
                  <input
                    value={institutionName}
                    onChange={(e) => setInstitutionName(e.target.value)}
                    placeholder="Enter institution name"
                  />
                </div>
                <div className="form-group">
                  <label>Class/Section</label>
                  <input
                    value={classSection}
                    onChange={(e) => setClassSection(e.target.value)}
                    placeholder="Enter class or section"
                  />
                </div>
                <div className="form-group">
                  <label>Roll Number</label>
                  <input
                    value={rollNumber}
                    onChange={(e) => setRollNumber(e.target.value)}
                    placeholder="Enter roll number"
                  />
                </div>
                <div className="form-group">
                  <label>Rest Days</label>
                  <input
                    type="number"
                    value={restDays}
                    onChange={(e) => setRestDays(e.target.value)}
                    placeholder="Enter rest days"
                  />
                </div>
                <div className="form-group">
                  <label>Doctor Advice</label>
                  <textarea
                    value={doctorAdvice}
                    onChange={(e) => setDoctorAdvice(e.target.value)}
                    placeholder="Enter doctor advice"
                  />
                </div>
              </>
            )}

            {selectedType === "insurance" && (
              <>
                <div className="form-group">
                  <label>Insurance Company</label>
                  <input
                    value={insuranceCompany}
                    onChange={(e) => setInsuranceCompany(e.target.value)}
                    placeholder="Enter insurance company"
                  />
                </div>
                <div className="form-group">
                  <label>Policy Number</label>
                  <input
                    value={policyNumber}
                    onChange={(e) => setPolicyNumber(e.target.value)}
                    placeholder="Enter policy number"
                  />
                </div>
                <div className="form-group">
                  <label>Claim Number</label>
                  <input
                    value={claimNumber}
                    onChange={(e) => setClaimNumber(e.target.value)}
                    placeholder="Enter claim number"
                  />
                </div>
                <div className="form-group">
                  <label>Treatment Given</label>
                  <textarea
                    value={treatmentGiven}
                    onChange={(e) => setTreatmentGiven(e.target.value)}
                    placeholder="Enter treatment given"
                  />
                </div>
                <div className="form-group">
                  <label>Admission Date</label>
                  <input
                    type="date"
                    value={admissionDate}
                    onChange={(e) => setAdmissionDate(e.target.value)}
                    placeholder="Select admission date"
                  />
                </div>
                <div className="form-group">
                  <label>Discharge Date</label>
                  <input
                    type="date"
                    value={dischargeDate}
                    onChange={(e) => setDischargeDate(e.target.value)}
                    placeholder="Select discharge date"
                  />
                </div>
                <div className="form-group">
                  <label>Hospital Name</label>
                  <input
                    value={hospitalName}
                    onChange={(e) => setHospitalName(e.target.value)}
                    placeholder="Enter hospital name"
                  />
                </div>
                <div className="form-group">
                  <label>Bill Amount (₹)</label>
                  <input
                    type="number"
                    value={billAmount}
                    onChange={(e) => setBillAmount(e.target.value)}
                    placeholder="Enter bill amount"
                  />
                </div>
              </>
            )}

            {selectedType === "vaccination" && (
              <>
                <div className="form-group">
                  <label>Vaccine Name</label>
                  <input
                    value={vaccineName}
                    onChange={(e) => setVaccineName(e.target.value)}
                    placeholder="Enter vaccine name"
                  />
                </div>
                <div className="form-group">
                  <label>Dose Number</label>
                  <input
                    type="number"
                    value={doseNumber}
                    onChange={(e) => setDoseNumber(e.target.value)}
                    placeholder="Enter dose number"
                  />
                </div>
                <div className="form-group">
                  <label>Batch Number</label>
                  <input
                    value={batchNumber}
                    onChange={(e) => setBatchNumber(e.target.value)}
                    placeholder="Enter batch number"
                  />
                </div>
                <div className="form-group">
                  <label>Vaccination Date</label>
                  <input
                    type="date"
                    value={vaccinationDate}
                    onChange={(e) => setVaccinationDate(e.target.value)}
                    placeholder="Select vaccination date"
                  />
                </div>
                <div className="form-group">
                  <label>Next Dose Date</label>
                  <input
                    type="date"
                    value={nextDoseDate}
                    onChange={(e) => setNextDoseDate(e.target.value)}
                    placeholder="Select next dose date"
                  />
                </div>
              </>
            )}

            {selectedType === "hospitalization" && (
              <>
                <div className="form-group">
                  <label>Admission Date</label>
                  <input
                    type="date"
                    value={admissionDate}
                    onChange={(e) => setAdmissionDate(e.target.value)}
                    placeholder="Select admission date"
                  />
                </div>
                <div className="form-group">
                  <label>Discharge Date</label>
                  <input
                    type="date"
                    value={dischargeDate}
                    onChange={(e) => setDischargeDate(e.target.value)}
                    placeholder="Select discharge date"
                  />
                </div>
                <div className="form-group">
                  <label>Treatment Given</label>
                  <textarea
                    value={treatmentGiven}
                    onChange={(e) => setTreatmentGiven(e.target.value)}
                    placeholder="Enter treatment given"
                  />
                </div>
                <div className="form-group">
                  <label>Hospital Name</label>
                  <input
                    value={hospitalName}
                    onChange={(e) => setHospitalName(e.target.value)}
                    placeholder="Enter hospital name"
                  />
                </div>
                <div className="form-group">
                  <label>Ward</label>
                  <input
                    value={ward}
                    onChange={(e) => setWard(e.target.value)}
                    placeholder="Enter ward"
                  />
                </div>
                <div className="form-group">
                  <label>Bed Number</label>
                  <input
                    value={bedNumber}
                    onChange={(e) => setBedNumber(e.target.value)}
                    placeholder="Enter bed number"
                  />
                </div>
                <div className="form-group">
                  <label>Advised Rest Days</label>
                  <input
                    type="number"
                    value={advisedRestDays}
                    onChange={(e) => setAdvisedRestDays(e.target.value)}
                    placeholder="Enter advised rest days"
                  />
                </div>
              </>
            )}

            {selectedType === "leave" && (
              <div className="form-group">
                <label>Rest Days</label>
                <input
                  type="number"
                  value={restDays}
                  onChange={(e) => setRestDays(e.target.value)}
                  placeholder="Enter rest days"
                />
              </div>
            )}

            <button className="primary-btn" onClick={handleGenerate}>
              Generate Certificate
            </button>
          </div>

          {createdCertId && (
            <div className="preview-card">
              <h3>Certificate Created</h3>
              <p>
                Certificate has been successfully created with ID:{" "}
                {createdCertId}
              </p>
              <div className="action-container">
                <button
                  className="primary-btn"
                  onClick={() =>
                    handleViewCertificate(createdCertId, createdCertType)
                  }
                >
                  View Certificate
                </button>
                <button
                  className="primary-btn"
                  onClick={() => handleViewPdf(createdCertId, createdCertType)}
                >
                  View PDF
                </button>
              </div>
            </div>
          )}

          {previewCert && (
            <div className="preview-card">
              <h3>Certificate Preview</h3>
              <div
                dangerouslySetInnerHTML={{
                  __html: getCertificateContent(previewCert),
                }}
              />
              <div className="action-container">
                <button onClick={() => handlePrint(previewCert)}>
                  Print / PDF
                </button>
                <button
                  onClick={() =>
                    handleViewPdf(previewCert._id, previewCert.type)
                  }
                >
                  View PDF
                </button>
                <button onClick={() => handleWhatsApp(previewCert)}>
                  WhatsApp
                </button>
                <button onClick={() => handleEmail(previewCert)}>Email</button>
              </div>
            </div>
          )}

          <div className="history-card">
            <h3>History</h3>
            {history.length === 0 ? (
              <p>No certificates generated yet.</p>
            ) : (
              <ul className="history-list">
                {history.map((cert) => (
                  <li key={cert._id} className="history-item">
                    <div>
                      <strong>
                        {cert.type.replace(/_/g, " ").toUpperCase()}
                      </strong>{" "}
                      - {cert.name || cert.patient.name} - {cert.date}
                    </div>
                    <div className="action-container">
                      <button
                        onClick={() =>
                          handleViewCertificate(cert._id, cert.type)
                        }
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleViewPdf(cert._id, cert.type)}
                      >
                        View PDF
                      </button>
                      <button onClick={() => handlePrint(cert)}>
                        Print / PDF
                      </button>
                      <button onClick={() => handleWhatsApp(cert)}>
                        WhatsApp
                      </button>
                      <button onClick={() => handleEmail(cert)}>Email</button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CertificatePage;
