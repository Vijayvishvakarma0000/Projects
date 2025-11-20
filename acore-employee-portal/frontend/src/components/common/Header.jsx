import React from 'react';
import './Header.css';

const Header = ({ currentUser, onProfileClick, onLogout, onAttendanceClick }) => {
  const getInitials = (name) => {
    return name.split(' ').map(n => n.charAt(0)).join('').toUpperCase();
  };

  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">
          <span className="logo-icon">🏢</span>
        </div>
        <div className="company-info">
          <h1 className="company-name">Acore IT Hub</h1>
          <p className="company-tagline">Employee Management Portal</p>
        </div>
      </div>

      <div className="header-right">
        <button 
          className="attendance-btn"
          onClick={onAttendanceClick}
        >
          <span className="attendance-icon">⏰</span>
          Attendance
        </button>

        <button 
          className="profile-btn"
          onClick={onProfileClick}
        >
          <span className="profile-icon">👤</span>
          My Profile
        </button>

        <div className="user-section">
          <div className="user-avatar">
            {getInitials(currentUser.name)}
          </div>
          <div className="user-info">
            <h3 className="user-name">{currentUser.name}</h3>
            <p className="user-designation">{currentUser.designation}</p>
          </div>
          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;