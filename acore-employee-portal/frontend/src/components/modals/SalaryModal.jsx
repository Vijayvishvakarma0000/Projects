import React, { useState } from 'react';
import './SalaryModal.css';

const SalaryModal = ({ isOpen, onClose, currentUser }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  if (!isOpen) return null;

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const handleDownload = () => {
    // Simulate download functionality
    alert('Salary slip download started!');
  };

  const salaryData = {
    grossSalary: 75000,
    deductions: 8500,
    netSalary: 66500,
    earnings: [
      { label: 'Basic Salary', amount: 45000 },
      { label: 'HRA', amount: 18000 },
      { label: 'DA', amount: 4500 },
      { label: 'Transport', amount: 2500 },
      { label: 'Special', amount: 5000 }
    ],
    deductionsList: [
      { label: 'PF', amount: 5400 },
      { label: 'Professional Tax', amount: 200 },
      { label: 'Income Tax', amount: 2500 },
      { label: 'ESI', amount: 400 }
    ]
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content salary-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 style={{color:"white"}}>💰 Salary Slip</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="salary-slip-section">
          <div className="salary-header">
            <h3>💰 Salary Slip</h3>
            <button className="download-slip-btn" onClick={handleDownload}>
              📥 Download Slip
            </button>
          </div>
          
          <div className="salary-month">
            <div className="salary-month-nav">
              <button className="month-btn" onClick={() => navigateMonth('prev')}>◀</button>
              <span className="current-month">{formatDate(currentDate)}</span>
              <button className="month-btn" onClick={() => navigateMonth('next')}>▶</button>
            </div>
          </div>
          
          <div className="salary-grid">
            <div className="salary-card earnings">
              <div className="salary-label">💵 Gross Salary</div>
              <div className="salary-value">₹{salaryData.grossSalary.toLocaleString()}</div>
            </div>
            <div className="salary-card deductions">
              <div className="salary-label">📉 Total Deductions</div>
              <div className="salary-value">₹{salaryData.deductions.toLocaleString()}</div>
            </div>
            <div className="salary-card earnings">
              <div className="salary-label">💰 Net Salary</div>
              <div className="salary-value">₹{salaryData.netSalary.toLocaleString()}</div>
            </div>
          </div>
          
          <div className="salary-breakdown">
            <div className="breakdown-header">📊 Detailed Salary Breakdown</div>
            <div className="breakdown-content">
              <div className="breakdown-section">
                <div className="breakdown-title">💵 Earnings</div>
                {salaryData.earnings.map((item, index) => (
                  <div key={index} className="breakdown-item">
                    <span className="breakdown-label">{item.label}</span>
                    <span className="breakdown-amount positive">₹{item.amount.toLocaleString()}</span>
                  </div>
                ))}
                <div className="breakdown-item total-item">
                  <span className="breakdown-label total-label">Total Earnings</span>
                  <span className="breakdown-amount positive total-amount">₹{salaryData.grossSalary.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="breakdown-section">
                <div className="breakdown-title">📉 Deductions</div>
                {salaryData.deductionsList.map((item, index) => (
                  <div key={index} className="breakdown-item">
                    <span className="breakdown-label">{item.label}</span>
                    <span className="breakdown-amount negative">₹{item.amount.toLocaleString()}</span>
                  </div>
                ))}
                <div className="breakdown-item total-item">
                  <span className="breakdown-label total-label">Total Deductions</span>
                  <span className="breakdown-amount negative total-amount">₹{salaryData.deductions.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="net-salary-card">
            <div className="net-salary-label">💰 NET SALARY (Take Home)</div>
            <div className="net-salary-value">₹{salaryData.netSalary.toLocaleString()}</div>
            <div className="net-salary-note">
              Gross ₹{salaryData.grossSalary.toLocaleString()} - Deductions ₹{salaryData.deductions.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalaryModal;