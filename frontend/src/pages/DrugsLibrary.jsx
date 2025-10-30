

import React, { useState } from "react";
import { FaPills, FaSearch, FaPlus, FaSave, FaBars, FaTimes } from "react-icons/fa";
import DoctorSidebar from "./DoctorSidebar";

export default function DrugLibrary() {
  const [drugs, setDrugs] = useState([
    { generic: "Paracetamol", brand: "Crocin", form: "Tablet" },
    { generic: "Metformin", brand: "Glyciphage", form: "Tablet" },
    { generic: "Atorvastatin", brand: "Atorva", form: "Tablet" },
    { generic: "Amoxicillin", brand: "Mox", form: "Capsule" },
    { generic: "Omeprazole", brand: "Omez", form: "Capsule" },
    { generic: "Losartan", brand: "Losar", form: "Tablet" },
    { generic: "Azithromycin", brand: "Azithral", form: "Tablet" },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newDrug, setNewDrug] = useState({ generic: "", brand: "", form: "" });
  const [savedDrug, setSavedDrug] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleBrandChange = (index, e) => {
    const updatedDrugs = [...drugs];
    updatedDrugs[index].brand = e.target.value;
    setDrugs(updatedDrugs);
  };

  const handleFormChange = (index, e) => {
    const updatedDrugs = [...drugs];
    updatedDrugs[index].form = e.target.value;
    setDrugs(updatedDrugs);
  };

  const saveDrug = (index) => {
    setSavedDrug(drugs[index].generic);
    setTimeout(() => setSavedDrug(null), 2000);
  };

  const filteredDrugs = drugs.filter(
    (drug) =>
      drug.generic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      drug.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      drug.form.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNewDrugChange = (field, value) => {
    setNewDrug((prev) => ({ ...prev, [field]: value }));
  };

  const addNewDrug = () => {
    const { generic, brand, form } = newDrug;
    if (generic.trim() && brand.trim() && form.trim()) {
      const exists = drugs.some(
        (d) => d.generic.toLowerCase() === generic.trim().toLowerCase()
      );
      if (!exists) {
        setDrugs([...drugs, { generic: generic.trim(), brand: brand.trim(), form: form.trim() }]);
        setNewDrug({ generic: "", brand: "", form: "" });
      } else {
        alert("⚠️ Drug with this generic name already exists.");
      }
    } else {
      alert("⚠️ Please fill in generic, brand, and form fields.");
    }
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
          transition: background 0.2s ease;
        }

        .toggle-button:hover {
          background: #3fa3b9;
        }

        .header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-bottom: 60px;
        }

        .header h1 {
          font-size: 2.5rem;
          font-weight: 700;
          color: #03678f;
          letter-spacing: 0.03em;
          text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.08);
        }

        .search-bar {
          display: flex;
          align-items: center;
          background: white;
          border: 1px solid #d0e3f0;
          border-radius: 8px;
          padding: 8px 12px;
          margin-bottom: 40px;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .search-bar input {
          flex: 1;
          border: none;
          outline: none;
          font-size: 1rem;
          padding: 6px;
          color: #2c3e50;
        }

        .search-bar svg {
          color: #1d9ad6;
          font-size: 18px;
        }

        .card {
          background: white;
          border-radius: 18px;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
          padding: 32px 28px;
          margin-bottom: 40px;
          position: relative;
          overflow: hidden;
          transition: all 0.35s ease;
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

        .card-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }

        .card-title {
          font-size: 1.8rem;
          font-weight: 600;
          color: #025b84;
          border-bottom: 2px solid #e6f2f7;
          padding-bottom: 6px;
        }

        .form-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 20px;
        }

        .form-row input,
        .form-row select {
          padding: 12px;
          border: 1px solid #d0e3f0;
          border-radius: 8px;
          font-size: 1rem;
          color: #2c3e50;
          background: #fafafa;
          transition: border-color 0.2s ease;
        }

        .form-row input:focus,
        .form-row select:focus {
          outline: none;
          border-color: #1d9ad6;
          box-shadow: 0 0 5px rgba(29, 154, 214, 0.3);
        }

        .add-button {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #186476;
          border: none;
          color: white;
          padding: 12px 20px;
          font-size: 1rem;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .add-button:hover {
          background: #3fa3b9;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th,
        td {
          padding: 12px 10px;
          border-bottom: 1px solid #e6f2f7;
          text-align: left;
        }

        th {
          background: #186476;
          color: white;
          font-weight: 600;
          font-size: 0.95rem;
        }

        td input,
        td select {
          width: 100%;
          padding: 10px;
          border: 1px solid #d0e3f0;
          border-radius: 8px;
          font-size: 0.95rem;
          color: #2c3e50;
          background: #fafafa;
        }

        td input:focus,
        td select:focus {
          outline: none;
          border-color: #1d9ad6;
          box-shadow: 0 0 5px rgba(29, 154, 214, 0.3);
        }

        .save-btn {
          background: #186476;
          color: white;
          border: none;
          padding: 10px 16px;
          border-radius: 8px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          transition: background 0.3s ease;
        }

        .save-btn:hover {
          background: #3fa3b9;
        }

        .saved {
          font-size: 0.85rem;
          color: #1d9ad6;
          margin-left: 10px;
        }

        .note {
          font-size: 1.05rem;
          line-height: 1.65;
          color: #4b5c6a;
          text-align: center;
          margin-top: 20px;
        }

        @media (max-width: 768px) {
          .page {
            margin-left: 0;
            padding: 24px 16px;
          }

          .header h1 {
            font-size: 2.2rem;
            margin-bottom: 40px;
          }

          .toggle-button {
            left: 10px;
            top: 10px;
            right: auto;
          }

          .form-row {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .header h1 {
            font-size: 1.8rem;
          }

          .search-bar input,
          .form-row input,
          .form-row select,
          .save-btn,
          .add-button {
            font-size: 0.9rem;
            padding: 10px;
          }

          th,
          td {
            padding: 8px;
          }
        }
      `}</style>

      <div className="layout">
        {isSidebarOpen && <DoctorSidebar />}
        <div className="page" role="main" aria-label="Drug Library page">
          <button className="toggle-button" onClick={toggleSidebar}>
             <FaBars size={10} ></FaBars>
          </button>
          <div className="header">
            <FaPills size={28} color="#1d9ad6" />
            <h1>Drug Library</h1>
          </div>

          <div className="search-bar">
            <FaSearch />
            <input
              type="text"
              placeholder="Search by generic, brand, or form..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="card">
            <div className="card-header">
              <FaPlus className="card-icon" />
              <h2 className="card-title">Add a New Drug</h2>
            </div>
            <div className="form-row">
              <input
                type="text"
                placeholder="Generic Name"
                value={newDrug.generic}
                onChange={(e) => handleNewDrugChange("generic", e.target.value)}
              />
              <input
                type="text"
                placeholder="Brand Name"
                value={newDrug.brand}
                onChange={(e) => handleNewDrugChange("brand", e.target.value)}
              />
              <select
                value={newDrug.form}
                onChange={(e) => handleNewDrugChange("form", e.target.value)}
              >
                <option value="" disabled>
                  Select Form
                </option>
                <option value="Tablet">Tablet</option>
                <option value="Capsule">Capsule</option>
                <option value="Syrup">Syrup</option>
                <option value="Injection">Injection</option>
                <option value="Cream">Cream</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <button className="add-button" onClick={addNewDrug}>
              <FaPlus /> Add Drug
            </button>
          </div>

          <div className="card">
            <div className="card-header">
              <FaPills className="card-icon" />
              <h2 className="card-title">Drug Database</h2>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Generic Name</th>
                  <th>Brand Name</th>
                  <th>Form</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredDrugs.length > 0 ? (
                  filteredDrugs.map((drug, index) => (
                    <tr key={drug.generic}>
                      <td>{drug.generic}</td>
                      <td>
                        <input
                          type="text"
                          value={drug.brand}
                          onChange={(e) => handleBrandChange(drugs.indexOf(drug), e)}
                          placeholder="Enter brand name"
                        />
                      </td>
                      <td>
                        <select
                          value={drug.form}
                          onChange={(e) => handleFormChange(drugs.indexOf(drug), e)}
                        >
                          <option value="Tablet">Tablet</option>
                          <option value="Capsule">Capsule</option>
                          <option value="Syrup">Syrup</option>
                          <option value="Injection">Injection</option>
                          <option value="Cream">Cream</option>
                          <option value="Other">Other</option>
                        </select>
                      </td>
                      <td>
                        <button
                          className="save-btn"
                          onClick={() => saveDrug(drugs.indexOf(drug))}
                        >
                          <FaSave /> Save
                        </button>
                        {savedDrug === drug.generic && (
                          <span className="saved">✔ Saved</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" style={{ textAlign: "center", color: "#4b5c6a" }}>
                      No drugs found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="note">
            Doctors can edit brand names and forms, then save changes. Preferences remembered during session.
          </div>
        </div>
      </div>
    </>
  );
}