import React, { useState, useEffect } from 'react';

const LiveTrackingPage = ({ trackingData }) => {
  const [time, setTime] = useState(new Date());
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [filterStatus, setFilterStatus] = useState('All');

  // Update time every second for live feel
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-refresh tracking data
  useEffect(() => {
    if (!autoRefresh) return;
    
    const refreshTimer = setInterval(() => {
      // Simulate data refresh
      console.log('Refreshing tracking data...');
    }, 30000); // Refresh every 30 seconds
    
    return () => clearInterval(refreshTimer);
  }, [autoRefresh]);

  const filteredData = trackingData.filter(track => {
    if (filterStatus === 'All') return true;
    return track.status === filterStatus;
  });

  // Statistics
  const totalTracked = trackingData.length;
  const productiveCount = trackingData.filter(t => t.status === 'Productive').length;
  const meetingCount = trackingData.filter(t => t.status === 'Meeting').length;
  const breakCount = trackingData.filter(t => t.status === 'Break').length;

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Productive': return '✅';
      case 'Meeting': return '📅';
      case 'Break': return '☕';
      default: return '⏸️';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Productive': return '#10b981';
      case 'Meeting': return '#3b82f6';
      case 'Break': return '#f59e0b';
      default: return '#94a3b8';
    }
  };

  const getAppIcon = (appName) => {
    if (appName.includes('VS Code')) return '💻';
    if (appName.includes('Figma')) return '🎨';
    if (appName.includes('Zoom')) return '📹';
    if (appName.includes('Chrome')) return '🌐';
    if (appName.includes('Postman')) return '📡';
    return '🖥️';
  };

  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <h2 className="page-title">📡 Live Tracking</h2>
          <p className="page-subtitle">
            Real-time monitoring • Last updated: {time.toLocaleTimeString()}
          </p>
        </div>
        <div className="tracking-controls">
          <div className="auto-refresh-toggle">
            <span className="toggle-label">Auto Refresh</span>
            <label className="switch">
              <input 
                type="checkbox" 
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
              />
              <span className="slider"></span>
            </label>
          </div>
          <button className="btn-refresh" onClick={() => console.log('Manual refresh')}>
            🔄 Refresh Now
          </button>
        </div>
      </div>

      {/* Info Banner */}
      <div className="info-banner">
        <span>🔌</span>
        <div>
          <strong>Electron IPC Integration Ready</strong>
          <p>This module receives real-time data from desktop tracking agents</p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="summary-cards">
        <div className="card">
          <div className="card-icon">👁️</div>
          <h3>Currently Tracked</h3>
          <p className="card-value">{totalTracked}</p>
          <p className="card-trend">Active sessions</p>
        </div>
        <div className="card card-success">
          <div className="card-icon">✅</div>
          <h3>Productive</h3>
          <p className="card-value">{productiveCount}</p>
          <p className="card-trend">Working efficiently</p>
        </div>
        <div className="card card-info">
          <div className="card-icon">📅</div>
          <h3>In Meetings</h3>
          <p className="card-value">{meetingCount}</p>
          <p className="card-trend">Scheduled meetings</p>
        </div>
        <div className="card card-warning">
          <div className="card-icon">☕</div>
          <h3>On Break</h3>
          <p className="card-value">{breakCount}</p>
          <p className="card-trend">Taking breaks</p>
        </div>
      </div>

      {/* Activity Distribution Chart */}
      <div className="charts-section">
        <div className="chart-box">
          <h3>📊 Activity Distribution</h3>
          <div className="activity-distribution">
            <div className="distribution-chart">
              <div className="chart-circle" style={{
                background: `conic-gradient(
                  #10b981 0% ${(productiveCount / totalTracked) * 100}%,
                  #3b82f6 ${(productiveCount / totalTracked) * 100}% ${((productiveCount + meetingCount) / totalTracked) * 100}%,
                  #f59e0b ${((productiveCount + meetingCount) / totalTracked) * 100}% 100%
                )`
              }}>
                <div className="chart-center">
                  <span className="chart-total">{totalTracked}</span>
                  <span className="chart-label">Active</span>
                </div>
              </div>
              <div className="chart-legend">
                <div className="legend-item">
                  <span className="legend-dot" style={{ background: '#10b981' }}></span>
                  <span>Productive ({productiveCount})</span>
                </div>
                <div className="legend-item">
                  <span className="legend-dot" style={{ background: '#3b82f6' }}></span>
                  <span>Meetings ({meetingCount})</span>
                </div>
                <div className="legend-item">
                  <span className="legend-dot" style={{ background: '#f59e0b' }}></span>
                  <span>Break ({breakCount})</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="chart-box">
          <h3>⏰ Peak Activity Times</h3>
          <div className="peak-activity">
            <div className="time-slots">
              {[
                { time: '9-10 AM', activity: 85, color: '#10b981' },
                { time: '10-11 AM', activity: 92, color: '#10b981' },
                { time: '11-12 PM', activity: 78, color: '#3b82f6' },
                { time: '12-1 PM', activity: 45, color: '#f59e0b' },
                { time: '1-2 PM', activity: 88, color: '#10b981' },
                { time: '2-3 PM', activity: 95, color: '#10b981' },
                { time: '3-4 PM', activity: 82, color: '#10b981' },
                { time: '4-5 PM', activity: 76, color: '#3b82f6' },
              ].map((slot, index) => (
                <div key={index} className="time-slot">
                  <div className="slot-time">{slot.time}</div>
                  <div className="slot-bar-container">
                    <div 
                      className="slot-bar" 
                      style={{
                        width: `${slot.activity}%`,
                        background: slot.color
                      }}
                      title={`${slot.activity}% activity`}
                    ></div>
                  </div>
                  <div className="slot-value">{slot.activity}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-row">
        <div className="search-container">
          <input 
            type="text" 
            className="search-input" 
            placeholder="🔍 Search by name or application..."
          />
        </div>
        <div className="filter-group">
          <select 
            className="filter-select" 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All Activities</option>
            <option value="Productive">Productive</option>
            <option value="Meeting">Meetings</option>
            <option value="Break">Break</option>
          </select>
          <button className="btn-icon" title="View Screenshots">
            📸 View Screenshots
          </button>
          <button className="btn-icon" title="Export Data">
            📥 Export
          </button>
        </div>
      </div>

      {/* Live Tracking Grid */}
      <div className="tracking-grid">
        {filteredData.map((track, index) => (
          <div key={index} className="tracking-card">
            <div className="tracking-header">
              <div className="employee-info">
                <div className="employee-avatar" style={{ background: getStatusColor(track.status) }}>
                  {track.name[0]}
                </div>
                <div>
                  <strong>{track.name}</strong>
                  <p>{track.empId}</p>
                </div>
              </div>
              <span 
                className="status-badge" 
                style={{ 
                  background: `${getStatusColor(track.status)}20`,
                  color: getStatusColor(track.status)
                }}
              >
                {getStatusIcon(track.status)} {track.status}
              </span>
            </div>
            
            <div className="tracking-body">
              <div className="tracking-info">
                <span className="info-label">🎯 Current Activity:</span>
                <strong className="info-value">{track.currentActivity}</strong>
              </div>
              <div className="tracking-info">
                <span className="info-label">💻 Application:</span>
                <div className="app-info">
                  <span className="app-icon">{getAppIcon(track.appName)}</span>
                  <strong className="info-value">{track.appName}</strong>
                </div>
              </div>
              <div className="tracking-info">
                <span className="info-label">⏱️ Duration:</span>
                <strong className="info-value time-duration">{track.duration}</strong>
              </div>
              <div className="tracking-info">
                <span className="info-label">📸 Screenshot:</span>
                <span className={`screenshot-status ${track.screenshot === '✅' ? 'available' : 'warning'}`}>
                  {track.screenshot} {track.screenshot === '✅' ? 'Available' : 'Manual Review'}
                </span>
              </div>
            </div>

            <div className="tracking-footer">
              <div className="time-indicator">
                <span className="time-icon">🕐</span>
                <span className="time-text">Active for {track.duration}</span>
              </div>
              <div className="action-buttons">
                <button className="btn-icon-small" title="View Details">
                  👁️
                </button>
                <button className="btn-icon-small" title="Take Screenshot">
                  📷
                </button>
                <button className="btn-icon-small" title="Send Message">
                  💬
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Live Updates Panel */}
      <div className="live-updates">
        <h3>🔄 Live Updates</h3>
        <div className="updates-list">
          <div className="update-item new">
            <span className="update-icon">🆕</span>
            <div className="update-content">
              <strong>Rahul Verma</strong> started working on "User Authentication Module"
              <span className="update-time">2 mins ago</span>
            </div>
          </div>
          <div className="update-item">
            <span className="update-icon">📊</span>
            <div className="update-content">
              <strong>Anjali Singh</strong> opened Figma for design work
              <span className="update-time">5 mins ago</span>
            </div>
          </div>
          <div className="update-item">
            <span className="update-icon">📅</span>
            <div className="update-content">
              <strong>Sneha Reddy</strong> joined team meeting on Zoom
              <span className="update-time">10 mins ago</span>
            </div>
          </div>
          <div className="update-item">
            <span className="update-icon">☕</span>
            <div className="update-content">
              <strong>Arjun Mehta</strong> is taking a break
              <span className="update-time">12 mins ago</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .page-subtitle {
          color: #94a3b8;
          font-size: 14px;
          margin-top: 4px;
        }
        
        .tracking-controls {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        
        .auto-refresh-toggle {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .toggle-label {
          font-size: 14px;
          color: #94a3b8;
        }
        
        .switch {
          position: relative;
          display: inline-block;
          width: 50px;
          height: 24px;
        }
        
        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }
        
        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #334155;
          transition: .4s;
          border-radius: 24px;
        }
        
        .slider:before {
          position: absolute;
          content: "";
          height: 16px;
          width: 16px;
          left: 4px;
          bottom: 4px;
          background-color: white;
          transition: .4s;
          border-radius: 50%;
        }
        
        input:checked + .slider {
          background-color: #10b981;
        }
        
        input:checked + .slider:before {
          transform: translateX(26px);
        }
        
        .btn-refresh {
          background: rgba(59, 130, 246, 0.1);
          color: #3b82f6;
          border: 1px solid rgba(59, 130, 246, 0.3);
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.2s;
        }
        
        .btn-refresh:hover {
          background: rgba(59, 130, 246, 0.2);
        }
        
        .card-trend {
          font-size: 12px;
          color: #94a3b8;
          margin-top: 4px;
        }
        
        .activity-distribution {
          display: flex;
          justify-content: center;
          margin-top: 20px;
        }
        
        .distribution-chart {
          display: flex;
          align-items: center;
          gap: 40px;
        }
        
        .chart-circle {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .chart-center {
          width: 100px;
          height: 100px;
          background: #1e293b;
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        
        .chart-total {
          font-size: 28px;
          font-weight: 700;
          color: #f1f5f9;
        }
        
        .chart-label {
          font-size: 12px;
          color: #94a3b8;
        }
        
        .chart-legend {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .legend-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: #94a3b8;
        }
        
        .legend-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }
        
        .peak-activity {
          margin-top: 20px;
        }
        
        .time-slots {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .time-slot {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .slot-time {
          width: 60px;
          font-size: 12px;
          color: #94a3b8;
        }
        
        .slot-bar-container {
          flex: 1;
          height: 20px;
          background: #334155;
          border-radius: 10px;
          overflow: hidden;
        }
        
        .slot-bar {
          height: 100%;
          border-radius: 10px;
          transition: width 0.3s ease;
        }
        
        .slot-value {
          width: 40px;
          text-align: right;
          font-size: 12px;
          font-weight: 600;
          color: #f1f5f9;
        }
        
        .employee-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          color: white;
          flex-shrink: 0;
        }
        
        .employee-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .app-info {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .app-icon {
          font-size: 18px;
        }
        
        .info-label {
          color: #94a3b8;
          font-size: 13px;
          min-width: 120px;
        }
        
        .info-value {
          color: #f1f5f9;
          font-size: 14px;
        }
        
        .time-duration {
          color: #3b82f6;
          font-weight: 600;
        }
        
        .screenshot-status {
          font-size: 13px;
          font-weight: 500;
          padding: 2px 8px;
          border-radius: 12px;
        }
        
        .screenshot-status.available {
          background: rgba(16, 185, 129, 0.2);
          color: #10b981;
        }
        
        .screenshot-status.warning {
          background: rgba(245, 158, 11, 0.2);
          color: #f59e0b;
        }
        
        .tracking-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 16px;
          padding-top: 12px;
          border-top: 1px solid #334155;
        }
        
        .time-indicator {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: #94a3b8;
        }
        
        .time-icon {
          font-size: 14px;
        }
        
        .action-buttons {
          display: flex;
          gap: 8px;
        }
        
        .btn-icon-small {
          background: transparent;
          border: none;
          cursor: pointer;
          font-size: 16px;
          padding: 4px;
          opacity: 0.7;
          transition: opacity 0.2s;
          color: #94a3b8;
        }
        
        .btn-icon-small:hover {
          opacity: 1;
          color: #f1f5f9;
        }
        
        .live-updates {
          background: #1e293b;
          padding: 20px;
          border-radius: 8px;
          border: 1px solid #334155;
          margin-top: 24px;
        }
        
        .updates-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 16px;
        }
        
        .update-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 12px;
          background: #334155;
          border-radius: 6px;
          border-left: 3px solid #3b82f6;
        }
        
        .update-item.new {
          border-left-color: #10b981;
          background: rgba(16, 185, 129, 0.1);
        }
        
        .update-icon {
          font-size: 18px;
          flex-shrink: 0;
        }
        
        .update-content {
          flex: 1;
          font-size: 14px;
          color: #f1f5f9;
        }
        
        .update-content strong {
          color: #3b82f6;
        }
        
        .update-time {
          display: block;
          font-size: 12px;
          color: #94a3b8;
          margin-top: 4px;
        }
        
        @media (max-width: 768px) {
          .tracking-controls {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
          }
          
          .distribution-chart {
            flex-direction: column;
            gap: 20px;
          }
          
          .tracking-card {
            padding: 12px;
          }
          
          .tracking-info {
            flex-direction: column;
            align-items: flex-start;
            gap: 4px;
          }
          
          .info-label {
            min-width: auto;
          }
        }
      `}</style>
    </div>
  );
};

export default LiveTrackingPage;