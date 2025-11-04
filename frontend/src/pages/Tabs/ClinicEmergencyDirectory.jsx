// ClinicEmergencyDirectory.jsx
import React, { useState } from "react";

const ClinicEmergencyDirectory = () => {
  const [sections, setSections] = useState([
    {
      title: "Medical & Legal",
      contacts: [
        { role: "Doctor", name: "Dr. Mehta", phone: "9876543210" },
        { role: "Backup Doctor", name: "Dr. Sharma", phone: "9876501234" },
        { role: "Hospital Admin", name: "Mr. Rajan", phone: "9823012345" },
        { role: "Ambulance", name: "City Ambulance", phone: "108" },
        { role: "Biomedical Waste", name: "EcoWaste Solutions", phone: "9823214567" },
      ],
    },
    {
      title: "Operations",
      contacts: [
        { role: "Receptionist", name: "Priya", phone: "9823000099" },
        { role: "Electrician", name: "Ramesh Electricals", phone: "9876549876" },
        { role: "IT Support", name: "TechCare Solutions", phone: "9845678901" },
        { role: "Housekeeping", name: "CleanServe", phone: "9812345678" },
      ],
    },
    {
      title: "Supplies",
      contacts: [
        { role: "Pharma Distributor", name: "MediTrade Pvt Ltd", phone: "9834501234" },
        { role: "Water Supplier", name: "PureDrop", phone: "9823456677" },
        { role: "Printer Service", name: "PrintWorks", phone: "9898123456" },
      ],
    },
    {
      title: "Waste & Compliance",
      contacts: [
        { role: "Biomedical Vendor", name: "BioServe", phone: "9812334455" },
        { role: "Lawyer", name: "Mr. Sandeep Verma", phone: "9876123456" },
        { role: "CA / Accountant", name: "Agarwal & Co.", phone: "9822222222" },
      ],
    },
    {
      title: "Communication",
      contacts: [
        { role: "SMS Gateway", name: "FastNotify", phone: "9845098765" },
        { role: "Digital Marketing", name: "ClinicBoost Agency", phone: "9812012345" },
      ],
    },
  ]);

  const [newContact, setNewContact] = useState({
    role: "",
    name: "",
    phone: "",
    sectionIndex: null,
  });

  const handleAddContact = (sectionIndex) => {
    if (!newContact.role || !newContact.name || !newContact.phone) {
      alert("Please fill all fields before adding!");
      return;
    }

    const updatedSections = [...sections];
    updatedSections[sectionIndex].contacts.push({
      role: newContact.role,
      name: newContact.name,
      phone: newContact.phone,
    });

    setSections(updatedSections);
    setNewContact({ role: "", name: "", phone: "", sectionIndex: null });
  };

  return (
    <div style={styles.pageContainer}>
      <h1 style={styles.header}>Clinic Emergency & Support Directory</h1>
      <p style={styles.subHeader}>
        Quick access to key emergency and operational contacts for the clinic.
      </p>

      <div style={styles.grid}>
        {sections.map((section, sIndex) => (
          <div key={sIndex} style={styles.card}>
            <h2 style={styles.cardTitle}>{section.title}</h2>
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeader}>
                  <th>Role</th>
                  <th>Name</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
                {section.contacts.map((contact, cIndex) => (
                  <tr key={cIndex} style={styles.tableRow}>
                    <td>{contact.role}</td>
                    <td>{contact.name}</td>
                    <td>{contact.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Add new contact form */}
            <div style={styles.addForm}>
              <input
                style={styles.input}
                placeholder="Role"
                value={
                  newContact.sectionIndex === sIndex ? newContact.role : ""
                }
                onChange={(e) =>
                  setNewContact({
                    ...newContact,
                    sectionIndex: sIndex,
                    role: e.target.value,
                  })
                }
              />
              <input
                style={styles.input}
                placeholder="Name"
                value={
                  newContact.sectionIndex === sIndex ? newContact.name : ""
                }
                onChange={(e) =>
                  setNewContact({
                    ...newContact,
                    sectionIndex: sIndex,
                    name: e.target.value,
                  })
                }
              />
              <input
                style={styles.input}
                placeholder="Phone"
                value={
                  newContact.sectionIndex === sIndex ? newContact.phone : ""
                }
                onChange={(e) =>
                  setNewContact({
                    ...newContact,
                    sectionIndex: sIndex,
                    phone: e.target.value,
                  })
                }
              />
              <button
                style={styles.addButton}
                onClick={() => handleAddContact(sIndex)}
              >
                Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// INTERNAL CSS
const styles = {
  pageContainer: {
    fontFamily: "'Segoe UI', Roboto, sans-serif",
    backgroundColor: "#f8fafc",
    minHeight: "100vh",
    padding: "50px 80px",
  },
  header: {
    fontSize: "2rem",
    fontWeight: "700",
    color: "#00529B",
    textAlign: "center",
    marginBottom: "6px",
  },
  subHeader: {
    textAlign: "center",
    fontSize: "1rem",
    color: "#555",
    marginBottom: "40px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
    gap: "25px",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
    padding: "25px",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
  cardTitle: {
    fontSize: "1.2rem",
    color: "#0066cc",
    fontWeight: "600",
    marginBottom: "16px",
    borderBottom: "2px solid #e6f2ff",
    paddingBottom: "6px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "16px",
  },
  tableHeader: {
    background: "#f0f6fc",
    color: "#003f73",
    fontSize: "0.9rem",
  },
  tableRow: {
    borderBottom: "1px solid #f2f2f2",
    fontSize: "0.9rem",
  },
  addForm: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
  },
  input: {
    flex: "1 1 30%",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "0.9rem",
  },
  addButton: {
    backgroundColor: "#0078D4",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "8px 14px",
    cursor: "pointer",
    fontWeight: "500",
    transition: "background 0.2s ease",
  },
};

export default ClinicEmergencyDirectory;
