import React from 'react';
import Modal from '../common/Modal';
import './AttendanceModal.css';

const AttendanceModal = ({ isOpen, onClose, attendance, onPunch }) => {
  const {
    isPunchedIn,
    workingHours,
    workingTime,
    canLogout,
    loading
  } = attendance;

  const calculateProgress = () => {
    return Math.min((workingHours / 7) * 100, 100);
  };

  const getRemainingTime = () => {
    if (workingHours >= 7) return 'Ready to punch out!';
    
    const remainingHours = 7 - workingHours;
    const hours = Math.floor(remainingHours);
    const minutes = Math.floor((remainingHours - hours) * 60);
    
    return `Complete ${hours}h ${minutes}m more`;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="⏰ Attendance Tracker"
      size="medium"
    >
      <div className="attendance-modal-content">
        <div className={`attendance-status-card ${isPunchedIn ? 'active' : 'inactive'}`}>
          <div className="status-header">
            <h3 className="status-title">
              Today's Status: 
              <span className="status-value">
                {isPunchedIn ? ' 🟢 Punched In' : ' ⚪ Not Punched In'}
              </span>
            </h3>
          </div>

          <div className="working-time-display">
            <div className="time-value">{workingTime}</div>
            <p className="time-label">Working Hours Today</p>
          </div>

          {isPunchedIn && (
            <div className="progress-section">
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${calculateProgress()}%` }}
                ></div>
              </div>
              <div className="progress-info">
                <span className="progress-text">{getRemainingTime()}</span>
                <span className="progress-percentage">
                  {calculateProgress().toFixed(1)}%
                </span>
              </div>
            </div>
          )}

          <button
            className={`punch-button ${isPunchedIn ? 'punch-out' : 'punch-in'} ${loading ? 'loading' : ''}`}
            onClick={onPunch}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="button-spinner"></span>
                Processing...
              </>
            ) : isPunchedIn ? (
              canLogout ? (
                '🔴 Punch Out'
              ) : (
                `⏳ ${getRemainingTime()}`
              )
            ) : (
              '🟢 Punch In'
            )}
          </button>

          <div className="location-info">
            <span className="location-icon">📍</span>
            <span className="location-text">
              {isPunchedIn ? 'Location tracking active' : 'Location will be detected on punch in'}
            </span>
          </div>
        </div>

        {isPunchedIn && (
          <div className="attendance-stats">
            <div className="stat-item">
              <div className="stat-value">{workingHours.toFixed(2)}h</div>
              <div className="stat-label">Total Time</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">
                {canLogout ? '✅' : '⏳'}
              </div>
              <div className="stat-label">7 Hours</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">
                {Math.floor(workingHours)}h {Math.floor((workingHours % 1) * 60)}m
              </div>
              <div className="stat-label">Completed</div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default AttendanceModal;