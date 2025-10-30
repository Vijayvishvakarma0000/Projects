


import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaNotesMedical, FaPills, FaBars } from "react-icons/fa"; // Added FaBars for toggle
import DoctorSidebar from "./DoctorSidebar"; // Import the sidebar component


export default function LibraryPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

        h1 {
          font-size: 2.5rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 60px;
          color: #03678f;
          letter-spacing: 0.03em;
          text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.08);
        }

        .cards-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 40px;
          justify-content: center;
          align-items: stretch;
          max-width: 1200px;
          margin: auto;
        }

        .card {
          background: white;
          border-radius: 18px;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
          padding: 32px 28px;
          transition: all 0.35s ease;
          text-decoration: none;
          color: inherit;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
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

        .card-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }

        .card-icon {
          font-size: 2.2rem;
          color: #1d9ad6;
        }

        .card-title {
          font-size: 1.8rem;
          font-weight: 600;
          color: #025b84;
          border-bottom: 2px solid #e6f2f7;
          padding-bottom: 6px;
          flex: 1;
        }

        .card-content {
          font-size: 1.05rem;
          line-height: 1.65;
          color: #4b5c6a;
          flex-grow: 1;
        }

        @media (max-width: 768px) {
          .page {
            margin-left: 0;
            padding: 24px 16px;
          }
          h1 {
            font-size: 2.2rem;
            margin-bottom: 40px;
          }
          .toggle-button {
            left: 10px;
            top: 10px;
          }
        }
      `}</style>

      <div className="layout">
        {isSidebarOpen && <DoctorSidebar />}
        <div className="page" role="main" aria-label="Medical Library page">
          <button className="toggle-button" onClick={toggleSidebar}>
            <FaBars size={10} />
          </button>
          <h1>Medical Library</h1>
          <div className="cards-container">
            <Link
              to="/prescription-library"
              className="card"
              aria-labelledby="prescription-library-header"
            >
              <div className="card-header">
                <FaNotesMedical className="card-icon" />
                <h2 id="prescription-library-header" className="card-title">
                  Prescription Library
                </h2>
              </div>
              <p className="card-content">
                Manage comprehensive patient prescriptions efficiently.
                Quickly search, review, and update prescriptions ensuring
                optimal care continuity and accurate medication records.
              </p>
            </Link>

            <Link
              to="/drugs-library"
              className="card"
              aria-labelledby="drugs-library-header"
            >
              <div className="card-header">
                <FaPills className="card-icon" />
                <h2 id="drugs-library-header" className="card-title">
                  Drugs Library
                </h2>
              </div>
              <p className="card-content">
                Access a detailed and up-to-date database of drugs including
                generics, brand names, dosing guidelines, and interactions to
                support safe prescribing practices.
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}