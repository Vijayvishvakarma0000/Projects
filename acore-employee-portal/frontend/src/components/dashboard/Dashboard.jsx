import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    projects: 0,
    tasks: 0,
    users: 0,
    clients: 0,
    projectStatus: [],
    taskStatus: [],
    recentUpdates: []
  });

  const [loading, setLoading] = useState(true);

  // Fetch data on component mount
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setDashboardData({
        projects: 5,
        tasks: 19,
        users: 32,
        clients: 22,
        projectStatus: [
          { status: 'In Progress', count: 4, color: '#3b82f6' },
          { status: 'Completed', count: 1, color: '#10b981' },
          { status: 'On Hold', count: 0, color: '#f59e0b' },
          { status: 'Cancelled', count: 0, color: '#ef4444' }
        ],
        taskStatus: [
          { status: 'Completed', count: 6, color: '#10b981' },
          { status: 'In Progress', count: 8, color: '#3b82f6' },
          { status: 'Pending', count: 3, color: '#f59e0b' },
          { status: 'On Hold', count: 2, color: '#ef4444' }
        ],
        recentUpdates: [
          { type: 'project', title: 'Customer Satisfaction Improvement Initiative', status: 'In Progress', date: '15-Nov-2024' },
          { type: 'task', title: 'Server Configuration [IT Infrastructure Upgrade]', assignedTo: 'John Smith', dueDate: '24-Nov-2025' },
          { type: 'project', title: 'Website Redesign', status: 'In Progress', date: '25-Feb-2024' },
          { type: 'task', title: 'Homepage Design [Website Redesign]', assignedTo: 'John Smith', dueDate: '14-Oct-2025' }
        ]
      });
      setLoading(false);
    }, 1000);
  }, []);

  // Chart rendering functions (same as before)
  const renderProjectChart = () => {
    const total = dashboardData.projectStatus.reduce((sum, item) => sum + item.count, 0);
    
    return (
      <div className="chart-container">
        <div className="chart-title">Projects Status</div>
        <div className="chart-bar-container">
          {dashboardData.projectStatus.map((item, index) => {
            if (total === 0) return null;
            const percentage = (item.count / total) * 100;
            return (
              <div key={index} className="chart-bar-item">
                <div className="chart-bar-label">
                  <span className="chart-status-dot" style={{ backgroundColor: item.color }}></span>
                  <span className="chart-status-name">{item.status}</span>
                  <span className="chart-status-count">({item.count})</span>
                </div>
                <div className="chart-bar-bg">
                  <div 
                    className="chart-bar-fill" 
                    style={{ 
                      width: `${percentage}%`,
                      backgroundColor: item.color 
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderTaskChart = () => {
    const total = dashboardData.taskStatus.reduce((sum, item) => sum + item.count, 0);
    
    return (
      <div className="chart-container">
        <div className="chart-title">Tasks Overview</div>
        <div className="chart-donut-container">
          <div className="donut-chart">
            {total > 0 && dashboardData.taskStatus.map((item, index, array) => {
              const percentage = (item.count / total) * 100;
              const previousPercentages = array.slice(0, index).reduce((sum, i) => sum + (i.count/total)*360, 0);
              return (
                <div 
                  key={index}
                  className="donut-segment"
                  style={{
                    '--percentage': percentage,
                    '--rotation': previousPercentages,
                    '--color': item.color
                  }}
                ></div>
              );
            })}
            <div className="donut-center">
              <div className="donut-center-text">{total}</div>
              <div className="donut-center-label">Total Tasks</div>
            </div>
          </div>
          <div className="chart-legend">
            {dashboardData.taskStatus.map((item, index) => (
              <div key={index} className="legend-item">
                <span className="legend-dot" style={{ backgroundColor: item.color }}></span>
                <span className="legend-label">{item.status}</span>
                <span className="legend-count">({item.count})</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading dashboard data...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      {/* Dashboard Header */}
      <div className="dashboard-header">
        <h2>📊 Dashboard Overview</h2>
      </div>

      {/* Stats Cards */}
      <div className="dashboard-stats-grid">
        <div className="stat-card">
          <div className="stat-icon bg-project">
            <i className="fas fa-briefcase"></i>
          </div>
          <div className="stat-content">
            <div className="stat-value">{dashboardData.projects}</div>
            <div className="stat-label">Total Projects</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon bg-task">
            <i className="fas fa-newspaper"></i>
          </div>
          <div className="stat-content">
            <div className="stat-value">{dashboardData.tasks}</div>
            <div className="stat-label">Total Tasks</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon bg-user">
            <i className="fas fa-user"></i>
          </div>
          <div className="stat-content">
            <div className="stat-value">{dashboardData.users}</div>
            <div className="stat-label">Users</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon bg-client">
            <i className="fas fa-sticky-note"></i>
          </div>
          <div className="stat-content">
            <div className="stat-value">{dashboardData.clients}</div>
            <div className="stat-label">Clients</div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        <div className="chart-wrapper">
          {renderProjectChart()}
        </div>
        <div className="chart-wrapper">
          {renderTaskChart()}
        </div>
      </div>

      {/* Recent Updates */}
      <div className="recent-updates">
        <div className="updates-header">
          <h3>📝 Recent Updates</h3>
        </div>
        <div className="updates-list">
          {dashboardData.recentUpdates.slice(0, 5).map((update, index) => (
            <div key={index} className="update-item">
              <div className="update-type">
                {update.type === 'project' ? '📁' : '✓'}
              </div>
              <div className="update-content">
                <div className="update-title">{update.title}</div>
                <div className="update-details">
                  {update.type === 'project' ? (
                    <span className="status-badge in-progress">{update.status}</span>
                  ) : (
                    <span className="assigned-to">Assigned to: {update.assignedTo}</span>
                  )}
                  <span className="update-date">
                    {update.type === 'project' ? `Updated: ${update.date}` : `Due: ${update.dueDate}`}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h3>🚀 Quick Actions</h3>
        <div className="actions-grid">
          <button className="action-btn">
            <span className="action-icon">➕</span>
            <span className="action-text">New Project</span>
          </button>
          <button className="action-btn">
            <span className="action-icon">📝</span>
            <span className="action-text">Create Task</span>
          </button>
          <button className="action-btn">
            <span className="action-icon">📊</span>
            <span className="action-text">Generate Report</span>
          </button>
          <button className="action-btn">
            <span className="action-icon">👥</span>
            <span className="action-text">Manage Team</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;