



import React from "react";

const Preferences = ({ clinicData, onChange }) => {
  return (
    <>
      <style jsx>{`
        .section-title {
          font-size: 1.8rem;
          font-weight: 600;
          color: #025b84;
          border-bottom: 2px solid #e6f2f7;
          padding-bottom: 6px;
          margin-bottom: 20px;
        }
        .form-group {
          display: grid;
          gap: 20px;
          grid-template-columns: 1fr 1fr;
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
        .select {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          background-image: url("data:image/svg+xml;charset=US-ASCII,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'><path fill='%23186776' d='M2 0L0 2h4z'/></svg>");
          background-repeat: no-repeat;
          background-position: right 10px top 50%;
          background-size: 8px 10px;
        }
        .input:focus,
        .select:focus {
          border-color: #1d9ad6;
          box-shadow: 0 0 0 3px rgba(29, 154, 214, 0.2);
        }
      `}</style>

      <h2 className="section-title">⚙️ Preferences</h2>
      <div className="form-group">
        <div>
          <label className="label">Language</label>
          <select
            name="language"
            value={clinicData.language}
            onChange={onChange}
            className="select"
          >
            <option>English</option>
            <option>Hindi</option>
            <option>Gujarati</option>
            <option>Marathi</option>
          </select>
        </div>
        <div>
          <label className="label">SMS Gateway</label>
          <input
            type="text"
            name="smsGateway"
            value={clinicData.smsGateway}
            onChange={onChange}
            className="input"
          />
        </div>
        <div>
          <label className="label">WhatsApp Gateway</label>
          <input
            type="text"
            name="whatsappGateway"
            value={clinicData.whatsappGateway}
            onChange={onChange}
            className="input"
          />
        </div>
        <div>
          <label className="label">Letterhead</label>
          <input
            type="text"
            name="letterhead"
            value={clinicData.letterhead}
            onChange={onChange}
            className="input"
          />
        </div>
        <div>
          <label className="label">Branding</label>
          <input
            type="text"
            name="branding"
            value={clinicData.branding}
            onChange={onChange}
            className="input"
          />
        </div>
      </div>
    </>
  );
};

export default Preferences;
