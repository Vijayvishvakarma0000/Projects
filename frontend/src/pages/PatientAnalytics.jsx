
import React, { useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { FaUserInjured, FaUserPlus, FaUserCheck, FaStar, FaMoneyBillWave, FaFileInvoiceDollar, FaBars, FaNotesMedical } from "react-icons/fa";
import DoctorSidebar from "./DoctorSidebar";

const ClinicalAnalytics = () => {
  const [timeFrame, setTimeFrame] = useState("Daily");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Sample data for all analytics sections
  const patientVolumeData = {
    Daily: [
      { date: "2025-09-13", patients: 20 },
      { date: "2025-09-12", patients: 18 },
      { date: "2025-09-11", patients: 15 },
    ],
    Weekly: [
      { date: "Week 37", patients: 120 },
      { date: "Week 36", patients: 110 },
      { date: "Week 35", patients: 100 },
    ],
    Monthly: [
      { date: "Sep 2025", patients: 520 },
      { date: "Aug 2025", patients: 480 },
      { date: "Jul 2025", patients: 450 },
    ],
  };

  const peakConsultationHoursData = [
    { time: "8-10 AM", patients: 10 },
    { time: "10-12 PM", patients: 25 },
    { time: "12-2 PM", patients: 15 },
    { time: "2-4 PM", patients: 20 },
    { time: "4-6 PM", patients: 30 },
  ];

  const newVsFollowUpData = [
    { type: "New", count: 12, percentage: 60 },
    { type: "Follow-up", count: 8, percentage: 40 },
  ];

  const diseaseTrendsData = {
    Daily: [
      { condition: "Diabetes", cases: 5 },
      { condition: "Hypertension", cases: 4 },
      { condition: "Common Cold", cases: 8 },
    ],
    Weekly: [
      { condition: "Diabetes", cases: 40 },
      { condition: "Hypertension", cases: 35 },
      { condition: "Common Cold", cases: 25 },
    ],
    Monthly: [
      { condition: "Diabetes", cases: 160 },
      { condition: "Hypertension", cases: 140 },
      { condition: "Common Cold", cases: 100 },
    ],
  };

  const seasonalIllnessData = [
    { month: "Jan", cases: 50 },
    { month: "Apr", cases: 30 },
    { month: "Jul", cases: 20 },
    { month: "Oct", cases: 60 },
  ];

  const ageWiseDiseaseData = [
    { ageGroup: "0-10", patients: 20 },
    { ageGroup: "11-20", patients: 30 },
    { ageGroup: "21-40", patients: 50 },
    { ageGroup: "41-60", patients: 40 },
    { ageGroup: "60+", patients: 30 },
  ];

  const genderRatioData = [
    { gender: "Male", count: 110, percentage: 52 },
    { gender: "Female", count: 100, percentage: 48 },
    { gender: "Other", count: 2, percentage: 1 },
  ];

  const followUpComplianceData = [
    { interval: "1 Week", compliance: 85 },
    { interval: "1 Month", compliance: 70 },
    { interval: "3 Months", compliance: 60 },
  ];

  const investigationUtilizationData = [
    { test: "CBC", count: 50 },
    { test: "X-ray", count: 30 },
    { test: "ECG", count: 20 },
    { test: "Lipid Profile", count: 25 },
  ];

  const mostPrescribedDrugsData = [
    { drug: "Metformin", count: 100 },
    { drug: "Amlodipine", count: 80 },
    { drug: "Paracetamol", count: 120 },
  ];

  const doctorWisePrescriptionData = [
    { doctor: "Dr. Sharma", prescriptions: 15 },
    { doctor: "Dr. Gupta", prescriptions: 12 },
    { doctor: "Dr. Rao", prescriptions: 10 },
  ];

  const avgDrugsPerPrescriptionData = [
    { department: "Endocrinology", avgDrugs: 2.5 },
    { department: "Cardiology", avgDrugs: 2.0 },
    { department: "General", avgDrugs: 1.8 },
  ];

  const genericVsBrandData = [
    { type: "Generic", percentage: 65 },
    { type: "Brand", percentage: 35 },
  ];

  const costPerPrescriptionData = [
    { doctor: "Dr. Sharma", cost: 500 },
    { doctor: "Dr. Gupta", cost: 450 },
    { doctor: "Dr. Rao", cost: 400 },
  ];

  const drugSafetyAlertsData = [
    { alert: "Pregnancy Unsafe", count: 5 },
    { alert: "Duplicate", count: 3 },
    { alert: "High-risk", count: 2 },
  ];

  const revenueTrendsData = {
    Daily: [
      { date: "2025-09-13", revenue: 8000 },
      { date: "2025-09-12", revenue: 7500 },
      { date: "2025-09-11", revenue: 7000 },
    ],
    Weekly: [
      { date: "Week 37", revenue: 50000 },
      { date: "Week 36", revenue: 48000 },
      { date: "Week 35", revenue: 45000 },
    ],
    Monthly: [
      { date: "Sep 2025", revenue: 200000 },
      { date: "Aug 2025", revenue: 190000 },
      { date: "Jul 2025", revenue: 180000 },
    ],
  };

  const revenueByServiceData = [
    { service: "Consultation", revenue: 200000 },
    { service: "Procedure", revenue: 50000 },
    { service: "Certificates", revenue: 20000 },
    { service: "Lab", revenue: 120000 },
    { service: "Pharmacy", revenue: 160000 },
  ];

  const doctorWiseRevenueData = [
    { doctor: "Dr. Sharma", revenue: 100000 },
    { doctor: "Dr. Gupta", revenue: 80000 },
    { doctor: "Dr. Rao", revenue: 60000 },
  ];

  const outstandingPaymentsData = [
    { entity: "Patient A", amount: 5000 },
    { entity: "Insurance Co.", amount: 20000 },
    { entity: "Patient B", amount: 3000 },
  ];

  const expenseReportsData = [
    { type: "Salary", amount: 100000 },
    { type: "Rent", amount: 50000 },
    { type: "Consumables", amount: 30000 },
  ];

  const profitLossData = [
    { period: "Q1 2025", profit: 50000 },
    { period: "Q2 2025", profit: 60000 },
    { period: "Q3 2025", profit: 55000 },
  ];

  const certificateTypesData = [
    { type: "Fitness", count: 30 },
    { type: "Leave", count: 20 },
    { type: "Pre-Op", count: 15 },
  ];

  const turnaroundTimeData = [
    { type: "Fitness", time: 10 },
    { type: "Leave", time: 15 },
    { type: "Pre-Op", time: 20 },
  ];

  const averageRatingData = [
    { doctor: "Dr. Sharma", rating: 4.8 },
    { doctor: "Dr. Gupta", rating: 4.5 },
    { doctor: "Dr. Rao", rating: 4.3 },
  ];

  const complaintsCategoryData = [
    { category: "Waiting Time", count: 10 },
    { category: "Staff", count: 5 },
    { category: "Billing", count: 3 },
    { category: "Doctor Explanation", count: 2 },
  ];

  const npsData = [
    { category: "Promoters", percentage: 60 },
    { category: "Neutral", percentage: 30 },
    { category: "Detractors", percentage: 10 },
  ];

  const yearOnYearPatientGrowthData = [
    { year: "2023", growth: 10 },
    { year: "2024", growth: 15 },
    { year: "2025", growth: 12 },
  ];

  const revenueGrowthData = [
    { period: "Q1 2025", growth: 8 },
    { period: "Q2 2025", growth: 10 },
    { period: "Q3 2025", growth: 9 },
  ];

  const conversionData = [
    { period: "Q1 2025", conversion: 40 },
    { period: "Q2 2025", conversion: 45 },
    { period: "Q3 2025", conversion: 42 },
  ];

  const referralSourcesData = [
    { source: "Self", count: 100 },
    { source: "Family/Friend", count: 50 },
    { source: "Doctor Referral", count: 30 },
    { source: "Online", count: 20 },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const currentVolume = patientVolumeData[timeFrame];
  const currentDisease = diseaseTrendsData[timeFrame];
  const currentRevenue = revenueTrendsData[timeFrame];

  const totalPatients = currentVolume.reduce((s, i) => s + i.patients, 0);
  const totalRevenue = currentRevenue.reduce((s, i) => s + i.revenue, 0);
  const totalOutstanding = outstandingPaymentsData.reduce((s, i) => s + i.amount, 0);

  const COLORS = ["#186476", "#25bfdb", "#ff9800", "#6c757d"];

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
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .card-container {
          display: flex;
          flex-wrap: wrap;
          gap: 22px;
          margin-bottom: 30px;
          justify-content: center;
        }

        .card {
          background: white;
          padding: 18px 25px;
          border-radius: 12px;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
          transition: all 0.35s ease;
          flex: 1 1 220px;
          text-align: center;
          min-width: 140px;
        }

        .card:hover {
          transform: translateY(-8px);
          box-shadow: 0 14px 26px rgba(0, 0, 0, 0.15);
        }

        .card-icon {
          font-size: 28px;
          color: #186476;
          margin-bottom: 10px;
        }

        .card-title {
          font-size: 13px;
          color: #666;
          margin-bottom: 8px;
        }

        .card-value {
          font-size: 22px;
          font-weight: 700;
          color: #003049;
        }

        .button-group {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
          justify-content: center;
        }

        .button {
          padding: 10px 15px;
          border-radius: 6px;
          border: none;
          background-color: #186476;
          color: white;
          cursor: pointer;
          font-size: 1rem;
        }

        .button:hover {
          background-color: #3fa3b9;
        }

        .button-active {
          background-color: #05668d;
        }

        .section {
          background: white;
          padding: 25px;
          border-radius: 12px;
          margin-bottom: 25px;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
          transition: all 0.35s ease;
        }

        .section:hover {
          transform: translateY(-8px);
          box-shadow: 0 14px 26px rgba(0, 0, 0, 0.15);
        }

        .section-header {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 15px;
          color: #05668d;
        }

        .chart-title {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 15px;
          color: #05668d;
        }

        .chart-container {
          width: 100%;
          height: 300px;
          margin-bottom: 20px;
        }

        .export-btn {
          padding: 10px 20px;
          border-radius: 6px;
          border: none;
          background-color: #6c757d;
          color: white;
          cursor: pointer;
          margin: 10px 5px 0 5px;
          font-size: 1rem;
        }

        .export-btn:hover {
          background-color: #5a6268;
        }

        .email-btn {
          padding: 10px 20px;
          border-radius: 6px;
          border: none;
          background-color: #ff9800;
          color: white;
          cursor: pointer;
          margin: 10px 5px 0 5px;
          font-size: 1rem;
        }

        .email-btn:hover {
          background-color: #e68900;
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

          .card-container {
            flex-direction: column;
            align-items: center;
          }

          .card {
            width: 100%;
            max-width: 300px;
          }

          .button-group {
            flex-direction: column;
            align-items: center;
          }

          .button {
            width: 100%;
            max-width: 200px;
          }
        }
      `}</style>

      <div className="layout">
        {isSidebarOpen && <DoctorSidebar />}
        <div className="page" role="main" aria-label="Clinical Analytics Dashboard">
          <button
            className="toggle-button"
            onClick={toggleSidebar}
            aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            <FaBars size={10} />
          </button>
          <h1>
            <FaNotesMedical size={28} /> Clinical Analytics Dashboard
          </h1>

          <div className="card-container">
            <div className="card">
              <FaUserInjured className="card-icon" />
              <div className="card-title">Total Patients ({timeFrame})</div>
              <div className="card-value">{totalPatients}</div>
            </div>
            <div className="card">
              <FaUserPlus className="card-icon" />
              <div className="card-title">New Patients</div>
              <div className="card-value">{newVsFollowUpData[0].count}</div>
            </div>
            <div className="card">
              <FaUserCheck className="card-icon" />
              <div className="card-title">Follow-up Patients</div>
              <div className="card-value">{newVsFollowUpData[1].count}</div>
            </div>
            <div className="card">
              <FaStar className="card-icon" />
              <div className="card-title">Average Rating</div>
              <div className="card-value">4.5 / 5</div>
            </div>
            <div className="card">
              <FaMoneyBillWave className="card-icon" />
              <div className="card-title">Revenue ({timeFrame})</div>
              <div className="card-value">₹{totalRevenue.toLocaleString()}</div>
            </div>
            <div className="card">
              <FaFileInvoiceDollar className="card-icon" />
              <div className="card-title">Outstanding Payments</div>
              <div className="card-value">₹{totalOutstanding.toLocaleString()}</div>
            </div>
          </div>

          <div className="button-group">
            {["Daily", "Weekly", "Monthly"].map((frame) => (
              <button
                key={frame}
                className={`button ${timeFrame === frame ? "button-active" : ""}`}
                onClick={() => setTimeFrame(frame)}
              >
                {frame}
              </button>
            ))}
          </div>

          <div className="section">
            <div className="section-header">Clinical Analytics</div>
            <div className="chart-title">Patient Volume Trends</div>
            <div className="chart-container">
              <ResponsiveContainer>
                <LineChart data={currentVolume}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                  <XAxis dataKey="date" fontSize={14} stroke="#2c3e50" />
                  <YAxis fontSize={14} stroke="#2c3e50" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #ccc",
                      borderRadius: "6px",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="patients" stroke="#05668d" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-title">Peak Consultation Hours</div>
            <div className="chart-container">
              <ResponsiveContainer>
                <BarChart data={peakConsultationHoursData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                  <XAxis dataKey="time" fontSize={14} stroke="#2c3e50" />
                  <YAxis fontSize={14} stroke="#2c3e50" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #ccc",
                      borderRadius: "6px",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="patients" fill="#186476" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-title">New vs Follow-up Ratio</div>
            <div className="chart-container">
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={newVsFollowUpData} dataKey="percentage" nameKey="type" outerRadius={80} label>
                    {newVsFollowUpData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => `${value}%`}
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #ccc",
                      borderRadius: "6px",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-title">Disease Trends</div>
            <div className="chart-container">
              <ResponsiveContainer>
                <BarChart data={currentDisease}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                  <XAxis dataKey="condition" fontSize={14} stroke="#2c3e50" />
                  <YAxis fontSize={14} stroke="#2c3e50" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #ccc",
                      borderRadius: "6px",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="cases" fill="#186476" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-title">Seasonal Illness (Common Cold)</div>
            <div className="chart-container">
              <ResponsiveContainer>
                <LineChart data={seasonalIllnessData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                  <XAxis dataKey="month" fontSize={14} stroke="#2c3e50" />
                  <YAxis fontSize={14} stroke="#2c3e50" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #ccc",
                      borderRadius: "6px",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="cases" stroke="#05668d" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-title">Age-wise Disease Distribution</div>
            <div className="chart-container">
              <ResponsiveContainer>
                <BarChart data={ageWiseDiseaseData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                  <XAxis dataKey="ageGroup" fontSize={14} stroke="#2c3e50" />
                  <YAxis fontSize={14} stroke="#2c3e50" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #ccc",
                      borderRadius: "6px",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="patients" fill="#186476" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-title">Gender Ratio</div>
            <div className="chart-container">
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={genderRatioData} dataKey="percentage" nameKey="gender" outerRadius={80} label>
                    {genderRatioData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => `${value}%`}
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #ccc",
                      borderRadius: "6px",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-title">Follow-up Compliance</div>
            <div className="chart-container">
              <ResponsiveContainer>
                <BarChart data={followUpComplianceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                  <XAxis dataKey="interval" fontSize={14} stroke="#2c3e50" />
                  <YAxis fontSize={14} stroke="#2c3e50" />
                  <Tooltip
                    formatter={(value) => `${value}%`}
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #ccc",
                      borderRadius: "6px",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="compliance" fill="#186476" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-title">Investigation Utilization</div>
            <div className="chart-container">
              <ResponsiveContainer>
                <BarChart data={investigationUtilizationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                  <XAxis dataKey="test" fontSize={14} stroke="#2c3e50" />
                  <YAxis fontSize={14} stroke="#2c3e50" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #ccc",
                      borderRadius: "6px",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="count" fill="#186476" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="section">
            <div className="section-header">Prescription Analytics</div>
            <div className="chart-title">Most Prescribed Drugs</div>
            <div className="chart-container">
              <ResponsiveContainer>
                <BarChart data={mostPrescribedDrugsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                  <XAxis dataKey="drug" fontSize={14} stroke="#2c3e50" />
                  <YAxis fontSize={14} stroke="#2c3e50" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #ccc",
                      borderRadius: "6px",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="count" fill="#186476" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-title">Doctor-wise Prescription Count</div>
            <div className="chart-container">
              <ResponsiveContainer>
                <BarChart data={doctorWisePrescriptionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                  <XAxis dataKey="doctor" fontSize={14} stroke="#2c3e50" />
                  <YAxis fontSize={14} stroke="#2c3e50" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #ccc",
                      borderRadius: "6px",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="prescriptions" fill="#186476" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-title">Average Drugs per Prescription</div>
            <div className="chart-container">
              <ResponsiveContainer>
                <BarChart data={avgDrugsPerPrescriptionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                  <XAxis dataKey="department" fontSize={14} stroke="#2c3e50" />
                  <YAxis fontSize={14} stroke="#2c3e50" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #ccc",
                      borderRadius: "6px",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="avgDrugs" fill="#186476" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-title">Generic vs Brand Usage</div>
            <div className="chart-container">
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={genericVsBrandData} dataKey="percentage" nameKey="type" outerRadius={80} label>
                    {genericVsBrandData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => `${value}%`}
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #ccc",
                      borderRadius: "6px",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-title">Cost per Prescription</div>
            <div className="chart-container">
              <ResponsiveContainer>
                <BarChart data={costPerPrescriptionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                  <XAxis dataKey="doctor" fontSize={14} stroke="#2c3e50" />
                  <YAxis fontSize={14} stroke="#2c3e50" />
                  <Tooltip
                    formatter={(value) => `₹${value}`}
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #ccc",
                      borderRadius: "6px",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="cost" fill="#186476" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-title">Drug Safety Alerts</div>
            <div className="chart-container">
              <ResponsiveContainer>
                <BarChart data={drugSafetyAlertsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                  <XAxis dataKey="alert" fontSize={14} stroke="#2c3e50" />
                  <YAxis fontSize={14} stroke="#2c3e50" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #ccc",
                      borderRadius: "6px",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="count" fill="#186476" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="section">
            <div className="section-header">Financial Analytics</div>
            <div className="chart-title">Revenue Trends</div>
            <div className="chart-container">
              <ResponsiveContainer>
                <LineChart data={currentRevenue}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                  <XAxis dataKey="date" fontSize={14} stroke="#2c3e50" />
                  <YAxis fontSize={14} stroke="#2c3e50" />
                  <Tooltip
                    formatter={(value) => `₹${value.toLocaleString()}`}
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #ccc",
                      borderRadius: "6px",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#05668d" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-title">Revenue by Service Type</div>
            <div className="chart-container">
              <ResponsiveContainer>
                <BarChart data={revenueByServiceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                  <XAxis dataKey="service" fontSize={14} stroke="#2c3e50" />
                  <YAxis fontSize={14} stroke="#2c3e50" />
                  <Tooltip
                    formatter={(value) => `₹${value.toLocaleString()}`}
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #ccc",
                      borderRadius: "6px",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="revenue" fill="#186476" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-title">Doctor-wise Revenue</div>
            <div className="chart-container">
              <ResponsiveContainer>
                <BarChart data={doctorWiseRevenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                  <XAxis dataKey="doctor" fontSize={14} stroke="#2c3e50" />
                  <YAxis fontSize={14} stroke="#2c3e50" />
                  <Tooltip
                    formatter={(value) => `₹${value.toLocaleString()}`}
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #ccc",
                      borderRadius: "6px",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="revenue" fill="#186476" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-title">Outstanding Payments</div>
            <div className="chart-container">
              <ResponsiveContainer>
                <BarChart data={outstandingPaymentsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                  <XAxis dataKey="entity" fontSize={14} stroke="#2c3e50" />
                  <YAxis fontSize={14} stroke="#2c3e50" />
                  <Tooltip
                    formatter={(value) => `₹${value.toLocaleString()}`}
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #ccc",
                      borderRadius: "6px",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="amount" fill="#186476" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-title">Expense Reports</div>
            <div className="chart-container">
              <ResponsiveContainer>
                <BarChart data={expenseReportsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                  <XAxis dataKey="type" fontSize={14} stroke="#2c3e50" />
                  <YAxis fontSize={14} stroke="#2c3e50" />
                  <Tooltip
                    formatter={(value) => `₹${value.toLocaleString()}`}
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #ccc",
                      borderRadius: "6px",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="amount" fill="#186476" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-title">Profit & Loss Snapshot</div>
            <div className="chart-container">
              <ResponsiveContainer>
                <LineChart data={profitLossData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                  <XAxis dataKey="period" fontSize={14} stroke="#2c3e50" />
                  <YAxis fontSize={14} stroke="#2c3e50" />
                  <Tooltip
                    formatter={(value) => `₹${value.toLocaleString()}`}
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #ccc",
                      borderRadius: "6px",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="profit" stroke="#05668d" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="section">
            <div className="section-header">Certificate Reports</div>
            <div className="chart-title">Certificate Types Issued</div>
            <div className="chart-container">
              <ResponsiveContainer>
                <BarChart data={certificateTypesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                  <XAxis dataKey="type" fontSize={14} stroke="#2c3e50" />
                  <YAxis fontSize={14} stroke="#2c3e50" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #ccc",
                      borderRadius: "6px",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="count" fill="#186476" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-title">Turnaround Time</div>
            <div className="chart-container">
              <ResponsiveContainer>
                <BarChart data={turnaroundTimeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                  <XAxis dataKey="type" fontSize={14} stroke="#2c3e50" />
                  <YAxis fontSize={14} stroke="#2c3e50" />
                  <Tooltip
                    formatter={(value) => `${value} minutes`}
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #ccc",
                      borderRadius: "6px",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="time" fill="#186476" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="section">
            <div className="section-header">Patient Feedback Analytics</div>
            <div className="chart-title">Average Rating</div>
            <div className="chart-container">
              <ResponsiveContainer>
                <BarChart data={averageRatingData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                  <XAxis dataKey="doctor" fontSize={14} stroke="#2c3e50" />
                  <YAxis domain={[0, 5]} fontSize={14} stroke="#2c3e50" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #ccc",
                      borderRadius: "6px",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="rating" fill="#186476" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-title">Complaints Category</div>
            <div className="chart-container">
              <ResponsiveContainer>
                <BarChart data={complaintsCategoryData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                  <XAxis dataKey="category" fontSize={14} stroke="#2c3e50" />
                  <YAxis fontSize={14} stroke="#2c3e50" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #ccc",
                      borderRadius: "6px",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="count" fill="#186476" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-title">Net Promoter Score (NPS)</div>
            <div className="chart-container">
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={npsData} dataKey="percentage" nameKey="category" outerRadius={80} label>
                    {npsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => `${value}%`}
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #ccc",
                      borderRadius: "6px",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="section">
            <div className="section-header">Growth & Performance</div>
            <div className="chart-title">Year-on-Year Patient Growth</div>
            <div className="chart-container">
              <ResponsiveContainer>
                <LineChart data={yearOnYearPatientGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                  <XAxis dataKey="year" fontSize={14} stroke="#2c3e50" />
                  <YAxis fontSize={14} stroke="#2c3e50" />
                  <Tooltip
                    formatter={(value) => `${value}%`}
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #ccc",
                      borderRadius: "6px",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="growth" stroke="#05668d" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-title">Revenue Growth</div>
            <div className="chart-container">
              <ResponsiveContainer>
                <LineChart data={revenueGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                  <XAxis dataKey="period" fontSize={14} stroke="#2c3e50" />
                  <YAxis fontSize={14} stroke="#2c3e50" />
                  <Tooltip
                    formatter={(value) => `${value}%`}
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #ccc",
                      borderRadius: "6px",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="growth" stroke="#05668d" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-title">New to Follow-up Conversion</div>
            <div className="chart-container">
              <ResponsiveContainer>
                <LineChart data={conversionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                  <XAxis dataKey="period" fontSize={14} stroke="#2c3e50" />
                  <YAxis fontSize={14} stroke="#2c3e50" />
                  <Tooltip
                    formatter={(value) => `${value}%`}
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #ccc",
                      borderRadius: "6px",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="conversion" stroke="#05668d" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-title">Referral Sources</div>
            <div className="chart-container">
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={referralSourcesData} dataKey="count" nameKey="source" outerRadius={80} label>
                    {referralSourcesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #ccc",
                      borderRadius: "6px",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="section">
            <div className="section-header">Reports</div>
            <button className="export-btn">Export as Excel</button>
            <button className="export-btn">Export as PDF</button>
            <button className="email-btn">Auto Email Summary</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClinicalAnalytics;