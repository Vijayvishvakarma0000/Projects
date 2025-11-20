import React from 'react';
import './DashboardGrid.css';

const DashboardGrid = ({ onCardClick, attendanceStatus }) => {
  const cards = [
    {
      id: 'attendance',
      icon: '⏰',
      title: 'Attendance',
      description: 'Punch in/out and track your daily attendance with automatic location detection',
      badge: attendanceStatus?.isPunchedIn ? 'Active' : null,
      onClick: () => onCardClick('attendance')
    },
    {
      id: 'leave',
      icon: '🏖',
      title: 'Leave Management',
      description: 'Apply for CL, SL, Birthday Leave and track your leave balance',
      onClick: () => onCardClick('leave')
    },
    {
      id: 'birthday',
      icon: '🎂',
      title: 'Birthdays',
      description: 'Check upcoming birthdays and work anniversaries of your colleagues',
      onClick: () => onCardClick('birthday')
    },
    {
      id: 'calendar',
      icon: '📅',
      title: 'Holiday Calendar',
      description: 'View all official holidays and plan your time off accordingly',
      onClick: () => onCardClick('calendar')
    },
    {
      id: 'github',
      icon: '💻',
      title: 'GitHub Integration',
      description: 'Push your code commits and track your development work',
      onClick: () => onCardClick('github')
    },
    {
      id: 'profile',
      icon: '👤',
      title: 'My Profile',
      description: 'View and update your personal and professional information',
      onClick: () => onCardClick('profile')
    }
  ];

  return (
    <section className="dashboard-grid-section">
      <div className="dashboard-grid">
        {cards.map((card) => (
          <div
            key={card.id}
            className="dashboard-card"
            onClick={card.onClick}
          >
            <div className="card-icon">
              <span className="card-icon-symbol">{card.icon}</span>
            </div>
            
            <div className="card-content">
              <h3 className="card-title">{card.title}</h3>
              <p className="card-description">{card.description}</p>
            </div>

            {card.badge && (
              <span className={`card-badge ${card.badge.toLowerCase()}`}>
                {card.badge}
              </span>
            )}

            <div className="card-hover-indicator">
              <span>→</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DashboardGrid;