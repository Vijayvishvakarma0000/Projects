import { useState } from "react";

export const useClinic = () => {
  const [clinicData, setClinicData] = useState({
    licenses: {
      clinicRegistration: { number: "", expiry: "" },
      doctorMedicalLicense: { number: "", expiry: "" },
      fireSafety: { number: "", expiry: "" },
      biomedicalWaste: { number: "", expiry: "" },
      pollutionControl: { number: "", expiry: "" },
    },
    expiryReminder: "popup,email,sms,whatsapp",
  });

  const handleNestedChange = (section, key, value) => {
    setClinicData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  return { clinicData, handleNestedChange, setClinicData };
};
