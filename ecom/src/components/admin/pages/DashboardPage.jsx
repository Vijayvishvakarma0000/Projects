import React, { useState, useEffect } from 'react';
import { getSummaryData } from '../../../utils/constants'; 

const DashboardPage = ({ employees }) => {
  const summary = getSummaryData(employees);
  const [time, setTime] = useState(new Date());
  
  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Graph data for department distribution
  const departmentData = [
    { name: 'Engineering', value: 4, color: '#3b82f6' },
    { name: 'Design', value: 1, color: '#10b981' },
    { name: 'Quality', value: 1, color: '#f59e0b' },
    { name: 'Management', value: 1, color: '#ef4444' },
    { name: 'HR', value: 1, color: '#8b5cf6' }
  ];

  // Weekly hours data for graph
  const weeklyHoursData = [
    { day: 'Mon', hours: 42, target: 40 },
    { day: 'Tue', hours: 38, target: 40 },
    { day: 'Wed', hours: 45, target: 40 },
    { day: 'Thu', hours: 41, target: 40 },
    { day: 'Fri', hours: 39, target: 40 },
    { day: 'Sat', hours: 22, target: 20 },
    { day: 'Sun', hours: 0, target: 0 }
  ];

  const maxHours = Math.max(...weeklyHoursData.map(d => Math.max(d.hours, d.target))) + 5;

  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <h2 className="page-title">📊 Dashboard Overview</h2>
          <p className="page-subtitle">Welcome back! Today is {time.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
        <div className="current-time">
          <span className="time-icon">🕐</span>
          <span>{time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>
      
      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="card">
          <div className="card-icon">👥</div>
          <h3>Total Employees</h3>
          <p className="card-value">{summary.totalEmployees}</p>
          <p className="card-trend">↗️ 12% from last month</p>
        </div>
        <div className="card card-success">
          <div className="card-icon">✅</div>
          <h3>Active Now</h3>
          <p className="card-value">{summary.activeNow}</p>
          <p className="card-trend">🟢 All systems operational</p>
        </div>
        <div className="card card-warning">
          <div className="card-icon">🏖️</div>
          <h3>On Leave</h3>
          <p className="card-value">{summary.onLeave}</p>
          <p className="card-trend">🟡 Normal leave pattern</p>
        </div>
        <div className="card card-info">
          <div className="card-icon">⏱️</div>
          <h3>Avg Hours/Day</h3>
          <p className="card-value">{summary.avgHours}h</p>
          <p className="card-trend">↗️ 0.5h from yesterday</p>
        </div>
        <div className="card card-primary">
          <div className="card-icon">📈</div>
          <h3>Total Hours Today</h3>
          <p className="card-value">{summary.totalHoursToday}h</p>
          <p className="card-trend">📊 92% of target achieved</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        {/* Department Distribution Chart */}
        <div className="chart-box">
          <div className="chart-header">
            <h3>📊 Department-wise Distribution</h3>
            <span className="chart-subtitle">Employee count by department</span>
          </div>
          <div className="dept-stats">
            {departmentData.map((dept, index) => (
              <div key={index} className="dept-item">
                <div className="dept-bar-container">
                  <div 
                    className="dept-bar" 
                    style={{
                      width: `${(dept.value / Math.max(...departmentData.map(d => d.value))) * 80}%`,
                      background: dept.color
                    }}
                  ></div>
                  <div className="dept-value">{dept.value}</div>
                </div>
                <span className="dept-name">{dept.name}</span>
                <span className="dept-percentage">
                  {Math.round((dept.value / summary.totalEmployees) * 100)}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Hours Graph */}
        <div className="chart-box">
          <div className="chart-header">
            <h3>📈 Weekly Hours Analysis</h3>
            <span className="chart-subtitle">Actual vs Target hours this week</span>
          </div>
          <div className="weekly-hours-graph">
            <div className="graph-y-axis">
              {[0, 10, 20, 30, 40, 50].map((value) => (
                <div key={value} className="y-label">{value}h</div>
              ))}
            </div>
            <div className="graph-bars">
              {weeklyHoursData.map((day, index) => (
                <div key={index} className="bar-group">
                  <div className="bar-container">
                    <div 
                      className="bar bar-target" 
                      style={{ height: `${(day.target / maxHours) * 100}%` }}
                      title={`Target: ${day.target}h`}
                    ></div>
                    <div 
                      className="bar bar-actual" 
                      style={{ 
                        height: `${(day.hours / maxHours) * 100}%`,
                        background: day.hours >= day.target ? '#10b981' : '#f59e0b'
                      }}
                      title={`Actual: ${day.hours}h`}
                    ></div>
                  </div>
                  <div className="bar-label">{day.day}</div>
                  <div className="bar-value">
                    {day.hours >= day.target ? '✅' : '⚠️'} {day.hours}h
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="graph-legend">
            <div className="legend-item">
              <span className="legend-color" style={{ background: '#3b82f6' }}></span>
              <span>Target Hours</span>
            </div>
            <div className="legend-item">
              <span className="legend-color" style={{ background: '#10b981' }}></span>
              <span>Actual Hours (Met)</span>
            </div>
            <div className="legend-item">
              <span className="legend-color" style={{ background: '#f59e0b' }}></span>
              <span>Actual Hours (Below)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Status Cards */}
      <div className="charts-section">
        <div className="chart-box">
          <h3>🎯 Today's Activity Status</h3>
          <div className="activity-stats">
            <div className="activity-item">
              <div className="activity-circle" style={{background: '#10b981'}}>✅</div>
              <div>
                <strong>Active & Productive</strong>
                <p>{summary.activeNow} employees working efficiently</p>
              </div>
              <span className="activity-percentage">85%</span>
            </div>
            <div className="activity-item">
              <div className="activity-circle" style={{background: '#f59e0b'}}>☕</div>
              <div>
                <strong>On Break</strong>
                <p>Currently on scheduled breaks</p>
              </div>
              <span className="activity-percentage">8%</span>
            </div>
            <div className="activity-item">
              <div className="activity-circle" style={{background: '#ef4444'}}>⏸️</div>
              <div>
                <strong>Inactive</strong>
                <p>1 employee not active today</p>
              </div>
              <span className="activity-percentage">7%</span>
            </div>
          </div>
        </div>

        {/* Productivity Meter */}
        <div className="chart-box">
          <h3>⚡ Overall Productivity</h3>
          <div className="productivity-meter">
            <div className="meter-container">
              <div className="meter-circle">
                <div className="meter-value">92%</div>
                <div className="meter-label">Productivity</div>
              </div>
              <div className="meter-progress"></div>
            </div>
            <div className="productivity-details">
              <div className="detail-item">
                <span className="detail-label">Coding/Development</span>
                <span className="detail-value">45%</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Meetings</span>
                <span className="detail-value">20%</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Design & Planning</span>
                <span className="detail-value">18%</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Testing & QA</span>
                <span className="detail-value">12%</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Break/Idle</span>
                <span className="detail-value">5%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="recent-activity">
        <div className="activity-header">
          <h3>🕒 Recent Activity</h3>
          <button className="btn-view-all">View All →</button>
        </div>
        <div className="activity-list">
          {employees.slice(0, 5).map(emp => (
            <div key={emp.id} className="activity-log">
              <div className="activity-avatar" style={{ 
                background: emp.department === 'Engineering' ? '#3b82f6' : 
                           emp.department === 'Design' ? '#10b981' : 
                           emp.department === 'Management' ? '#ef4444' : '#8b5cf6'
              }}>
                {emp.name[0]}
              </div>
              <div className="activity-details">
                <div className="activity-main">
                  <strong>{emp.name}</strong>
                  <span className={`activity-status ${emp.status.toLowerCase().replace(' ', '-')}`}>
                    {emp.status}
                  </span>
                </div>
                <p>{emp.role} • {emp.department} • Last active: {emp.lastActive}</p>
              </div>
              <div className="activity-hours">
                <div className="hours-today">{emp.todayHours}h today</div>
                <div className="hours-week">{emp.weekHours}h this week</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .page-subtitle {
          color: #94a3b8;
          font-size: 14px;
          margin-top: 4px;
        }
        
        .current-time {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(59, 130, 246, 0.1);
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 14px;
          color: #3b82f6;
        }
        
        .time-icon {
          font-size: 16px;
        }
        
        .card-trend {
          font-size: 12px;
          color: #94a3b8;
          margin-top: 4px;
        }
        
        .chart-header {
          margin-bottom: 20px;
        }
        
        .chart-subtitle {
          color: #94a3b8;
          font-size: 13px;
          display: block;
          margin-top: 4px;
        }
        
        .dept-bar-container {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .dept-value {
          min-width: 20px;
          text-align: right;
          font-size: 14px;
          font-weight: 600;
          color: #f1f5f9;
        }
        
        .dept-percentage {
          min-width: 40px;
          text-align: right;
          font-size: 13px;
          color: #94a3b8;
        }
        
        .weekly-hours-graph {
          display: flex;
          gap: 16px;
          height: 200px;
          margin-top: 20px;
        }
        
        .graph-y-axis {
          display: flex;
          flex-direction: column-reverse;
          justify-content: space-between;
          padding-bottom: 24px;
        }
        
        .y-label {
          font-size: 11px;
          color: #94a3b8;
        }
        
        .graph-bars {
          flex: 1;
          display: flex;
          justify-content: space-around;
          align-items: flex-end;
          padding-bottom: 24px;
        }
        
        .bar-group {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          width: 40px;
        }
        
        .bar-container {
          flex: 1;
          width: 30px;
          position: relative;
          display: flex;
          align-items: flex-end;
        }
        
        .bar {
          width: 100%;
          position: absolute;
          bottom: 0;
          border-radius: 4px 4px 0 0;
          transition: height 0.3s ease;
        }
        
        .bar-target {
          background: #3b82f6;
          opacity: 0.3;
          height: 50%;
        }
        
        .bar-actual {
          background: #10b981;
          z-index: 2;
          width: 70%;
          left: 15%;
        }
        
        .bar-label {
          font-size: 12px;
          color: #94a3b8;
        }
        
        .bar-value {
          font-size: 11px;
          color: #f1f5f9;
          background: rgba(30, 41, 59, 0.8);
          padding: 2px 6px;
          border-radius: 4px;
        }
        
        .graph-legend {
          display: flex;
          gap: 16px;
          margin-top: 20px;
          flex-wrap: wrap;
        }
        
        .legend-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: #94a3b8;
        }
        
        .legend-color {
          width: 12px;
          height: 12px;
          border-radius: 2px;
        }
        
        .activity-percentage {
          font-size: 18px;
          font-weight: 600;
          color: #f1f5f9;
        }
        
        .productivity-meter {
          display: flex;
          align-items: center;
          gap: 30px;
          margin-top: 20px;
        }
        
        .meter-container {
          position: relative;
          width: 120px;
          height: 120px;
        }
        
        .meter-circle {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: conic-gradient(#10b981 0% 92%, #334155 92% 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        
        .meter-circle::before {
          content: '';
          position: absolute;
          width: 80px;
          height: 80px;
          background: #1e293b;
          border-radius: 50%;
        }
        
        .meter-value {
          font-size: 24px;
          font-weight: 700;
          color: #10b981;
          position: relative;
          z-index: 1;
        }
        
        .meter-label {
          font-size: 12px;
          color: #94a3b8;
          position: relative;
          z-index: 1;
        }
        
        .productivity-details {
          flex: 1;
        }
        
        .detail-item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
          padding-bottom: 8px;
          border-bottom: 1px solid #334155;
        }
        
        .detail-label {
          font-size: 13px;
          color: #94a3b8;
        }
        
        .detail-value {
          font-size: 13px;
          font-weight: 600;
          color: #f1f5f9;
        }
        
        .activity-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }
        
        .btn-view-all {
          background: transparent;
          border: 1px solid #334155;
          color: #3b82f6;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .btn-view-all:hover {
          background: rgba(59, 130, 246, 0.1);
        }
        
        .activity-main {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 4px;
        }
        
        .activity-status {
          font-size: 11px;
          padding: 2px 8px;
          border-radius: 10px;
          font-weight: 500;
        }
        
        .activity-status.active {
          background: rgba(16, 185, 129, 0.2);
          color: #10b981;
        }
        
        .activity-status.inactive {
          background: rgba(239, 68, 68, 0.2);
          color: #ef4444;
        }
        
        .activity-status.on-leave {
          background: rgba(245, 158, 11, 0.2);
          color: #f59e0b;
        }
        
        .activity-hours {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 4px;
        }
        
        .hours-today {
          font-size: 14px;
          font-weight: 600;
          color: #f1f5f9;
        }
        
        .hours-week {
          font-size: 12px;
          color: #94a3b8;
        }
        
        @media (max-width: 768px) {
          .productivity-meter {
            flex-direction: column;
            gap: 20px;
          }
          
          .activity-log {
            flex-direction: column;
            gap: 12px;
            text-align: center;
          }
          
          .activity-hours {
            align-items: center;
          }
        }
      `}</style>
    </div>
  );
};

export default DashboardPage;