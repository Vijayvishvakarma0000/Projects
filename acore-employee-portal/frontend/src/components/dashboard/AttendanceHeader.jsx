import React from 'react';
import './AttendanceHeader.css';

const AttendanceHeader = ({ onAttendanceClick, attendanceStatus }) => {
  return (
    <div className="attendance-header-section">
      <div className="attendance-header-content">
        <div className="attendance-info">
          <h2 className="attendance-greeting">
            Good Morning, Welcome Back! 👋
          </h2>
          <p className="attendance-status">
            {attendanceStatus?.isPunchedIn 
              ? '✅ You are punched in - Have a productive day!' 
              : '⏰ Ready to start your day? Punch in now!'}
          </p>
        </div>
        
        <button 
          className="attendance-main-btn"
          onClick={onAttendanceClick}
        >
          <span className="attendance-main-icon">⏰</span>
          <div className="attendance-btn-text">
            <span className="attendance-btn-title">
              {attendanceStatus?.isPunchedIn ? 'Punch Out' : 'Punch In'}
            </span>
            <span className="attendance-btn-subtitle">
              {attendanceStatus?.isPunchedIn ? 'End your day' : 'Start your day'}
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default AttendanceHeader;