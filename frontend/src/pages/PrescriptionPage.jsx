


import React, { useState, useEffect } from "react";
import {
  FaHeartbeat,
  FaStethoscope,
  FaLungs,
  FaCapsules,
  FaBaby,
  FaAllergies,
  FaNotesMedical,
  FaStar,
  FaBars,
} from "react-icons/fa";
import DoctorSidebar from "./DoctorSidebar"; // Assuming DoctorSidebar is available

// Mock drug data from DrugLibrary
const initialDrugs = [
  { generic: "Paracetamol", brand: "Crocin", form: "Tablet" },
  { generic: "Metformin", brand: "Glyciphage", form: "Tablet" },
  { generic: "Atorvastatin", brand: "Atorva", form: "Tablet" },
  { generic: "Amoxicillin", brand: "Mox", form: "Capsule" },
  { generic: "Omeprazole", brand: "Omez", form: "Capsule" },
  { generic: "Losartan", brand: "Losar", form: "Tablet" },
  { generic: "Azithromycin", brand: "Azithral", form: "Tablet" },
];

// Generate 100+ ready-made templates
const generateTemplates = () => {
  const categories = [
    { key: "Diabetes", label: "Endocrinology" },
    { key: "BP", label: "Cardiology" },
    { key: "Fever", label: "General Care" },
    { key: "Thyroid", label: "Pediatrics" },
    { key: "Asthma", label: "Respiratory" },
    { key: "Allergy", label: "Immunology" },
  ];
  const usageOptions = ["Daily", "As Needed", "Short-Term", "Chronic"];
  const diseases = [
    "Type 1 Diabetes",
    "Type 2 Diabetes",
    "Gestational Diabetes",
    "Hypertension Stage 1",
    "Hypertension Stage 2",
    "Viral Fever",
    "Bacterial Fever",
    "Hypothyroidism",
    "Hyperthyroidism",
    "Asthma Acute",
    "Asthma Chronic",
    "Seasonal Allergy",
    "Food Allergy",
  ];
  const templates = [];
  let id = 1;
  categories.forEach((cat) => {
    diseases.forEach((disease) => {
      if (disease.includes(cat.key)) {
        templates.push({
          id: id++,
          name: `${disease} Management`,
          category: cat.key,
          usage: usageOptions[Math.floor(Math.random() * usageOptions.length)],
          drugs: [
            {
              generic: initialDrugs[Math.floor(Math.random() * initialDrugs.length)].generic,
              brand: initialDrugs[Math.floor(Math.random() * initialDrugs.length)].brand,
              form: initialDrugs[Math.floor(Math.random() * initialDrugs.length)].form,
              dosage: `${Math.floor(Math.random() * 500 + 100)}mg - ${Math.random() > 0.5 ? "1 tab daily" : "2x/day"}`,
            },
          ],
          advice: `Follow ${cat.label.toLowerCase()} guidelines, maintain healthy lifestyle`,
          notes: `Monitor regularly, consult every 3 months`,
          isPersonal: false,
        });
      }
    });
  });
  return templates;
};

const PrescriptionPage = () => {
  const categories = [
    { key: "Diabetes", label: "Endocrinology", icon: <FaCapsules /> },
    { key: "BP", label: "Cardiology", icon: <FaHeartbeat /> },
    { key: "Fever", label: "General Care", icon: <FaStethoscope /> },
    { key: "Thyroid", label: "Pediatrics", icon: <FaBaby /> },
    { key: "Asthma", label: "Respiratory", icon: <FaLungs /> },
    { key: "Allergy", label: "Immunology", icon: <FaAllergies /> },
  ];
  const usageOptions = ["Daily", "As Needed", "Short-Term", "Chronic"];
  const formOptions = ["Tablet", "Capsule", "Syrup", "Injection", "Cream", "Other"];

  const [templates, setTemplates] = useState(generateTemplates());
  const [drugs] = useState(initialDrugs);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedUsage, setSelectedUsage] = useState("");
  const [selectedForm, setSelectedForm] = useState("");
  const [search, setSearch] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [newTemplate, setNewTemplate] = useState({
    name: "",
    category: "",
    usage: "",
    drugs: [],
    advice: "",
    notes: "",
    isPersonal: true,
  });

  // Handlers
  const handlePreview = (template) => {
    setSelectedTemplate(template);
    setSearch("");
  };

  const handleUse = (template) => {
    alert(`Prescription "${template.name}" loaded into Doctor Suite`);
    setSearch("");
    setSelectedTemplate(template);
    setTemplates([
      ...templates.filter((t) => !t.isPersonal),
      {
        ...template,
        id: templates.length + 1,
        isPersonal: true,
      },
    ]);
  };

  const handleFavorite = (template) => {
    if (favorites.includes(template.id)) {
      setFavorites(favorites.filter((id) => id !== template.id));
    } else {
      setFavorites([...favorites, template.id]);
    }
  };

  const handleSaveTemplate = () => {
    if (!newTemplate.name || !newTemplate.category || !newTemplate.usage || newTemplate.drugs.length === 0) {
      return alert("Template name, category, usage, and at least one drug are required!");
    }
    const formattedDrugs = newTemplate.drugs.map((drug) => ({
      generic: drug.generic,
      brand: drug.brand,
      form: drug.form,
      dosage: drug.dosage.trim(),
    }));
    if (editingTemplate) {
      setTemplates(
        templates.filter((t) => !t.isPersonal).concat([
          {
            ...editingTemplate,
            name: newTemplate.name,
            category: newTemplate.category,
            usage: newTemplate.usage,
            drugs: formattedDrugs,
            advice: newTemplate.advice,
            notes: newTemplate.notes,
            isPersonal: true,
          },
        ])
      );
      setEditingTemplate(null);
    } else {
      setTemplates(
        templates.filter((t) => !t.isPersonal).concat([
          {
            id: templates.length + 1,
            name: newTemplate.name,
            category: newTemplate.category,
            usage: newTemplate.usage,
            drugs: formattedDrugs,
            advice: newTemplate.advice,
            notes: newTemplate.notes,
            isPersonal: true,
          },
        ])
      );
    }
    setNewTemplate({
      name: "",
      category: "",
      usage: "",
      drugs: [],
      advice: "",
      notes: "",
      isPersonal: true,
    });
    setShowAdd(false);
    setSearch("");
  };

  const handleEdit = (template) => {
    setEditingTemplate(template);
    setNewTemplate({
      name: template.name,
      category: template.category,
      usage: template.usage,
      drugs: template.drugs,
      advice: template.advice,
      notes: template.notes,
      isPersonal: true,
    });
    setShowAdd(true);
    setSearch("");
    setSelectedTemplate(template);
  };

  const addDrugToTemplate = () => {
    setNewTemplate({
      ...newTemplate,
      drugs: [...newTemplate.drugs, { generic: "", brand: "", form: "", dosage: "" }],
    });
  };

  const updateDrugInTemplate = (index, field, value) => {
    const updatedDrugs = [...newTemplate.drugs];
    updatedDrugs[index][field] = value;
    setNewTemplate({ ...newTemplate, drugs: updatedDrugs });
  };

  const removeDrugFromTemplate = (index) => {
    setNewTemplate({
      ...newTemplate,
      drugs: newTemplate.drugs.filter((_, i) => i !== index),
    });
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Filtered suggestions for search dropdown
  const searchSuggestions = templates.filter((t) =>
    search
      ? t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.category.toLowerCase().includes(search.toLowerCase()) ||
        t.usage.toLowerCase().includes(search.toLowerCase()) ||
        t.drugs.some(
          (d) =>
            d.generic.toLowerCase().includes(search.toLowerCase()) ||
            d.brand.toLowerCase().includes(search.toLowerCase()) ||
            d.dosage.toLowerCase().includes(search.toLowerCase())
        )
      : false
  );

  // Filter templates by filters and search
  const filteredTemplates = templates.filter((t) => {
    const matchesCategory = selectedCategory ? t.category === selectedCategory : true;
    const matchesUsage = selectedUsage ? t.usage === selectedUsage : true;
    const matchesForm = selectedForm ? t.drugs.some((d) => d.form === selectedForm) : true;
    const matchesSearch = search
      ? t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.category.toLowerCase().includes(search.toLowerCase()) ||
        t.usage.toLowerCase().includes(search.toLowerCase()) ||
        t.drugs.some(
          (d) =>
            d.generic.toLowerCase().includes(search.toLowerCase()) ||
            d.brand.toLowerCase().includes(search.toLowerCase()) ||
            d.dosage.toLowerCase().includes(search.toLowerCase())
        )
      : true;
    return matchesCategory && matchesUsage && matchesForm && matchesSearch;
  });

  const myTemplates = templates.filter((t) => t.isPersonal);
  const favoriteTemplates = templates.filter((t) => favorites.includes(t.id));

  // Simulate admin updates (optional, removed for brevity but can be re-added)

  const getPreviewContent = (template) => `
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
      <h2 style="margin-bottom:15px; color:#0288d1;">Prescription: ${template.name}</h2>
      <p><strong>Clinic:</strong> Mediscript Clinic</p>
      <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
      <p><strong>Category:</strong> ${template.category}</p>
      <p><strong>Usage:</strong> ${template.usage}</p>
      <h3 style="margin: 15px 0; color:#05668d;">Drugs</h3>
      <table style="width:100%; border-collapse:collapse; margin-bottom:20px;">
        <thead>
          <tr style="background:#05668d; color:white;">
            <th style="padding:10px; border:1px solid #ccc;">Generic</th>
            <th style="padding:10px; border:1px solid #ccc;">Brand</th>
            <th style="padding:10px; border:1px solid #ccc;">Form</th>
            <th style="padding:10px; border:1px solid #ccc;">Dosage</th>
          </tr>
        </thead>
        <tbody>
          ${template.drugs
            .map(
              (d) => `
            <tr>
              <td style="padding:10px; border:1px solid #ccc;">${d.generic}</td>
              <td style="padding:10px; border:1px solid #ccc;">${d.brand}</td>
              <td style="padding:10px; border:1px solid #ccc;">${d.form}</td>
              <td style="padding:10px; border:1px solid #ccc;">${d.dosage}</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
      <p><strong>Advice:</strong> ${template.advice}</p>
      <p><strong>Notes:</strong> ${template.notes}</p>
      <hr style="margin:20px 0; border-color:#05668d;">
      <p style="font-size:14px; color:#555;">Generated from Medical Web Portal</p>
    </div>
  `;

  const handlePrint = (template) => {
    const content = getPreviewContent(template);
    const newWindow = window.open();
    newWindow.document.write(content);
    newWindow.print();
  };

  const handleWhatsApp = (template) => {
    const message = encodeURIComponent(stripHtml(getPreviewContent(template)));
    window.open(`https://wa.me/?text=${message}`, "_blank");
  };

  const handleEmail = (template) => {
    const subject = encodeURIComponent(`Prescription - ${template.name}`);
    const body = encodeURIComponent(stripHtml(getPreviewContent(template)));
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  const stripHtml = (html) => {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
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
        .history-card,
        .template-card {
          background: white;
          padding: 25px;
          border-radius: 12px;
          margin-bottom: 25px;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
          transition: all 0.35s ease;
        }

        .form-card:hover,
        .preview-card:hover,
        .history-card:hover,
        .template-card:hover {
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

        .suggestions {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: white;
          border: 1px solid #ddd;
          border-radius: 6px;
          z-index: 10;
          max-height: 250px;
          overflow-y: auto;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .suggestion-item {
          padding: 12px;
          cursor: pointer;
          border-bottom: 1px solid #eee;
          transition: all 0.2s;
        }

        .suggestion-item:hover {
          background: #f0f9fb;
        }

        .drug-row {
          display: flex;
          gap: 10px;
          align-items: center;
          margin-bottom: 10px;
        }

        .template-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 22px;
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

          .drug-row {
            flex-direction: column;
          }
        }
      `}</style>

      <div className="layout">
        {isSidebarOpen && <DoctorSidebar />}
        <div className="page" role="main" aria-label="Prescription Management page">
          <button className="toggle-button" onClick={toggleSidebar}>
            <FaBars size={10} />
          </button>
          <h1>
            <FaNotesMedical size={28} /> Prescription Library
          </h1>

          <div className="form-card">
            <h3>Search & Filter</h3>
            <div className="form-group" style={{ position: "relative" }}>
              <label>Search Templates</label>
              <input
                type="text"
                placeholder="Search by disease, category, usage, drug, or dosage..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && searchSuggestions.length > 0 && (
                <div className="suggestions">
                  {searchSuggestions.slice(0, 5).map((t) => {
                    const cat = categories.find((c) => c.key === t.category);
                    return (
                      <div key={t.id} className="suggestion-item">
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <span style={{ fontSize: "18px" }}>{cat?.icon}</span>
                          <span style={{ fontWeight: "bold" }}>
                            {t.name} <small>({cat?.label} | {t.usage})</small>
                          </span>
                        </div>
                        <div className="action-container" style={{ marginTop: "6px" }}>
                          <button onClick={() => handlePreview(t)}>👁 Preview</button>
                          <button onClick={() => handleUse(t)}>✅ Use</button>
                          <button
                            onClick={() => handleFavorite(t)}
                            style={{ backgroundColor: favorites.includes(t.id) ? "#FFD700" : "#05668d" }}
                          >
                            ★ Favorite
                          </button>
                          <button onClick={() => handleEdit(t)}>✏️ Edit</button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <div className="form-group">
                <label>Specialty</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">All Specialties</option>
                  {categories.map((cat) => (
                    <option key={cat.key} value={cat.key}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Usage</label>
                <select
                  value={selectedUsage}
                  onChange={(e) => setSelectedUsage(e.target.value)}
                >
                  <option value="">All Usage</option>
                  {usageOptions.map((usage) => (
                    <option key={usage} value={usage}>
                      {usage}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Form</label>
                <select
                  value={selectedForm}
                  onChange={(e) => setSelectedForm(e.target.value)}
                >
                  <option value="">All Forms</option>
                  {formOptions.map((form) => (
                    <option key={form} value={form}>
                      {form}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="form-card">
            <h3>{showAdd ? (editingTemplate ? "Edit Template" : "Add New Template") : "Template Management"}</h3>
            <button
              onClick={() => {
                setShowAdd(!showAdd);
                setEditingTemplate(null);
                setNewTemplate({
                  name: "",
                  category: "",
                  usage: "",
                  drugs: [],
                  advice: "",
                  notes: "",
                  isPersonal: true,
                });
                setSearch("");
              }}
            >
              {showAdd ? "Cancel" : "➕ Add Template"}
            </button>
            {showAdd && (
              <div style={{ marginTop: "20px" }}>
                <div className="form-group">
                  <label>Template Name</label>
                  <input
                    placeholder="e.g., Type 2 Diabetes Management"
                    value={newTemplate.name}
                    onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select
                    value={newTemplate.category}
                    onChange={(e) => setNewTemplate({ ...newTemplate, category: e.target.value })}
                  >
                    <option value="" disabled>
                      Select Category
                    </option>
                    {categories.map((cat) => (
                      <option key={cat.key} value={cat.key}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Usage</label>
                  <select
                    value={newTemplate.usage}
                    onChange={(e) => setNewTemplate({ ...newTemplate, usage: e.target.value })}
                  >
                    <option value="" disabled>
                      Select Usage
                    </option>
                    {usageOptions.map((usage) => (
                      <option key={usage} value={usage}>
                        {usage}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Drugs</label>
                  {newTemplate.drugs.map((drug, index) => (
                    <div key={index} className="drug-row">
                      <select
                        value={drug.generic}
                        onChange={(e) => updateDrugInTemplate(index, "generic", e.target.value)}
                      >
                        <option value="" disabled>
                          Select Generic
                        </option>
                        {drugs.map((d) => (
                          <option key={d.generic} value={d.generic}>
                            {d.generic}
                          </option>
                        ))}
                      </select>
                      <input
                        placeholder="Brand Name"
                        value={drug.brand}
                        onChange={(e) => updateDrugInTemplate(index, "brand", e.target.value)}
                      />
                      <select
                        value={drug.form}
                        onChange={(e) => updateDrugInTemplate(index, "form", e.target.value)}
                      >
                        <option value="" disabled>
                          Select Form
                        </option>
                        {formOptions.map((form) => (
                          <option key={form} value={form}>
                            {form}
                          </option>
                        ))}
                      </select>
                      <input
                        placeholder="Dosage (e.g., 500mg - 1 tab daily)"
                        value={drug.dosage}
                        onChange={(e) => updateDrugInTemplate(index, "dosage", e.target.value)}
                      />
                      <button
                        onClick={() => removeDrugFromTemplate(index)}
                        style={{ backgroundColor: "#dc3545" }}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button onClick={addDrugToTemplate}>+ Add Drug</button>
                </div>
                <div className="form-group">
                  <label>Advice</label>
                  <textarea
                    placeholder="Enter advice"
                    value={newTemplate.advice}
                    onChange={(e) => setNewTemplate({ ...newTemplate, advice: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Notes</label>
                  <textarea
                    placeholder="Additional notes"
                    value={newTemplate.notes}
                    onChange={(e) => setNewTemplate({ ...newTemplate, notes: e.target.value })}
                  />
                </div>
                <button onClick={handleSaveTemplate}>
                  {editingTemplate ? "💾 Save as My Template" : "Save Template"}
                </button>
              </div>
            )}
          </div>

          {selectedTemplate && (
            <div className="preview-card">
              <h3>Prescription Preview</h3>
              <div dangerouslySetInnerHTML={{ __html: getPreviewContent(selectedTemplate) }} />
              <div className="action-container">
                <button onClick={() => handlePrint(selectedTemplate)}>🖨 Print / PDF</button>
                <button onClick={() => handleWhatsApp(selectedTemplate)}>📱 WhatsApp</button>
                <button onClick={() => handleEmail(selectedTemplate)}>📧 Email</button>
              </div>
            </div>
          )}

          <div className="template-card">
            <h3>My Templates</h3>
            {myTemplates.length === 0 ? (
              <p>No personal templates yet. Add one to get started!</p>
            ) : (
              <div className="template-list">
                {myTemplates.map((template) => (
                  <div key={template.id} className="history-item">
                    <div>
                      <strong>{template.name}</strong> - {template.category} - {template.usage}
                    </div>
                    <div className="action-container">
                      <button onClick={() => handlePreview(template)}>👁 Preview</button>
                      <button onClick={() => handleUse(template)}>✅ Use</button>
                      <button
                        onClick={() => handleFavorite(template)}
                        style={{ backgroundColor: favorites.includes(template.id) ? "#FFD700" : "#05668d" }}
                      >
                        ★ Favorite
                      </button>
                      <button onClick={() => handleEdit(template)}>✏️ Edit</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="template-card">
            <h3>Favorites</h3>
            {favoriteTemplates.length === 0 ? (
              <p>No favorites yet. Mark templates as favorite to see them here!</p>
            ) : (
              <div className="template-list">
                {favoriteTemplates.map((template) => (
                  <div key={template.id} className="history-item">
                    <div>
                      <strong>{template.name}</strong> - {template.category} - {template.usage}
                    </div>
                    <div className="action-container">
                      <button onClick={() => handlePreview(template)}>👁 Preview</button>
                      <button onClick={() => handleUse(template)}>✅ Use</button>
                      <button
                        onClick={() => handleFavorite(template)}
                        style={{ backgroundColor: favorites.includes(template.id) ? "#FFD700" : "#05668d" }}
                      >
                        ★ Favorite
                      </button>
                      <button onClick={() => handleEdit(template)}>✏️ Edit</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="template-card">
            <h3>All Templates</h3>
            {filteredTemplates.length === 0 ? (
              <p>No templates match the selected filters.</p>
            ) : (
              <div className="template-list">
                {filteredTemplates.map((template) => (
                  <div key={template.id} className="history-item">
                    <div>
                      <strong>{template.name}</strong> - {template.category} - {template.usage}
                    </div>
                    <div className="action-container">
                      <button onClick={() => handlePreview(template)}>👁 Preview</button>
                      <button onClick={() => handleUse(template)}>✅ Use</button>
                      <button
                        onClick={() => handleFavorite(template)}
                        style={{ backgroundColor: favorites.includes(template.id) ? "#FFD700" : "#05668d" }}
                      >
                        ★ Favorite
                      </button>
                      <button onClick={() => handleEdit(template)}>✏️ Edit</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PrescriptionPage;