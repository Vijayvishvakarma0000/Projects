import React, { useState } from 'react';

const AttendancePage = ({ attendance, employees }) => {
  const [selectedDate, setSelectedDate] = useState('2024-12-13');
  const [viewType, setViewType] = useState('daily'); // daily, weekly, monthly
  const [departmentFilter, setDepartmentFilter] = useState('All');

  // Filter attendance for selected date
  const todayAttendance = attendance.filter(a => a.date === selectedDate);

  // Calculate statistics
  const presentCount = todayAttendance.filter(a => a.status === 'Present').length;
  const absentCount = todayAttendance.filter(a => a.status === 'Absent').length;
  const totalEmployees = employees.length;
  const attendancePercentage = totalEmployees > 0 ? Math.round((presentCount / totalEmployees) * 100) : 0;
  
  // Calculate average hours for present employees
  const presentEmployees = todayAttendance.filter(a => a.status === 'Present');
  const totalHours = presentEmployees.reduce((sum, a) => sum + a.totalHours, 0);
  const avgHours = presentEmployees.length > 0 ? (totalHours / presentEmployees.length).toFixed(1) : 0;

  // Weekly data for graph
  const weeklyData = [
    { day: 'Mon', date: 'Dec 9', present: 7, absent: 1, avgHours: 8.2 },
    { day: 'Tue', date: 'Dec 10', present: 8, absent: 0, avgHours: 8.5 },
    { day: 'Wed', date: 'Dec 11', present: 7, absent: 1, avgHours: 8.1 },
    { day: 'Thu', date: 'Dec 12', present: 7, absent: 1, avgHours: 8.0 },
    { day: 'Fri', date: 'Dec 13', present: 6, absent: 2, avgHours: 8.25 },
    { day: 'Sat', date: 'Dec 14', present: 3, absent: 5, avgHours: 4.5 },
    { day: 'Sun', date: 'Dec 15', present: 0, absent: 8, avgHours: 0 }
  ];

  // Monthly overview
  const monthlyOverview = {
    totalDays: 22,
    workingDays: 20,
    presentDays: 165,
    absentDays: 11,
    leaveDays: 8,
    avgAttendance: 91
  };

  // Department-wise attendance
  const departmentAttendance = [
    { dept: 'Engineering', total: 4, present: 3, absent: 1, percentage: 75 },
    { dept: 'Design', total: 1, present: 1, absent: 0, percentage: 100 },
    { dept: 'Management', total: 1, present: 0, absent: 1, percentage: 0 },
    { dept: 'Quality', total: 1, present: 1, absent: 0, percentage: 100 },
    { dept: 'HR', total: 1, present: 1, absent: 0, percentage: 100 }
  ];

  const getEmployeeInfo = (empId) => {
    const emp = employees.find(e => e.empId === empId);
    return emp || { name: 'Unknown', department: 'Unknown' };
  };

  const formatTime = (time) => {
    if (time === '-' || !time) return '-';
    return time;
  };

  const handleMarkAttendance = (empId, status) => {
    alert(`Marked ${empId} as ${status}`);
    // In real app, this would update the attendance data
  };

  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <h2 className="page-title">📅 Attendance Management</h2>
          <p className="page-subtitle">
            {viewType === 'daily' ? 'Daily Attendance' : 
             viewType === 'weekly' ? 'Weekly Overview' : 'Monthly Report'}
          </p>
        </div>
        <div className="view-controls">
          <div className="view-toggle">
            <button 
              className={`view-btn ${viewType === 'daily' ? 'active' : ''}`}
              onClick={() => setViewType('daily')}
            >
              Daily
            </button>
            <button 
              className={`view-btn ${viewType === 'weekly' ? 'active' : ''}`}
              onClick={() => setViewType('weekly')}
            >
              Weekly
            </button>
            <button 
              className={`view-btn ${viewType === 'monthly' ? 'active' : ''}`}
              onClick={() => setViewType('monthly')}
            >
              Monthly
            </button>
          </div>
        </div>
      </div>

      {/* Daily View */}
      {viewType === 'daily' && (
        <>
          <div className="attendance-header">
            <div className="date-controls">
              <input 
                type="date" 
                className="date-input"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
              <div className="date-navigation">
                <button className="btn-icon" onClick={() => {
                  // Previous day
                  const date = new Date(selectedDate);
                  date.setDate(date.getDate() - 1);
                  setSelectedDate(date.toISOString().split('T')[0]);
                }}>
                  ◀️
                </button>
                <span className="current-date">
                  {new Date(selectedDate).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
                <button className="btn-icon" onClick={() => {
                  // Next day
                  const date = new Date(selectedDate);
                  date.setDate(date.getDate() + 1);
                  setSelectedDate(date.toISOString().split('T')[0]);
                }}>
                  ▶️
                </button>
              </div>
            </div>

            <div className="attendance-summary">
              <div className="summary-item">
                <span className="summary-icon">👥</span>
                <div>
                  <strong>Total Employees</strong>
                  <p>{totalEmployees}</p>
                </div>
              </div>
              <div className="summary-item">
                <span className="summary-icon present">✅</span>
                <div>
                  <strong>Present Today</strong>
                  <p>{presentCount}</p>
                </div>
              </div>
              <div className="summary-item">
                <span className="summary-icon absent">❌</span>
                <div>
                  <strong>Absent Today</strong>
                  <p>{absentCount}</p>
                </div>
              </div>
              <div className="summary-item">
                <span className="summary-icon">📊</span>
                <div>
                  <strong>Attendance %</strong>
                  <p>{attendancePercentage}%</p>
                </div>
              </div>
              <div className="summary-item">
                <span className="summary-icon">⏱️</span>
                <div>
                  <strong>Avg Hours</strong>
                  <p>{avgHours}h</p>
                </div>
              </div>
            </div>
          </div>

          {/* Attendance Chart */}
          <div className="charts-section">
            <div className="chart-box">
              <h3>📊 Today's Attendance Overview</h3>
              <div className="attendance-chart">
                <div className="chart-bars">
                  <div className="bar-group">
                    <div 
                      className="bar present-bar" 
                      style={{ height: `${(presentCount / totalEmployees) * 100}%` }}
                      title={`Present: ${presentCount}`}
                    >
                      <span className="bar-value">{presentCount}</span>
                    </div>
                    <div className="bar-label">Present</div>
                  </div>
                  <div className="bar-group">
                    <div 
                      className="bar absent-bar" 
                      style={{ height: `${(absentCount / totalEmployees) * 100}%` }}
                      title={`Absent: ${absentCount}`}
                    >
                      <span className="bar-value">{absentCount}</span>
                    </div>
                    <div className="bar-label">Absent</div>
                  </div>
                  <div className="bar-group">
                    <div 
                      className="bar leave-bar" 
                      style={{ height: `${((totalEmployees - presentCount - absentCount) / totalEmployees) * 100}%` }}
                      title={`On Leave: ${totalEmployees - presentCount - absentCount}`}
                    >
                      <span className="bar-value">{totalEmployees - presentCount - absentCount}</span>
                    </div>
                    <div className="bar-label">Leave</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="chart-box">
              <h3>🏢 Department-wise Attendance</h3>
              <div className="dept-attendance">
                {departmentAttendance.map((dept, index) => (
                  <div key={index} className="dept-item">
                    <div className="dept-name">{dept.dept}</div>
                    <div className="dept-stats">
                      <span className="dept-present">{dept.present}/{dept.total}</span>
                      <div className="dept-progress">
                        <div 
                          className="progress-bar" 
                          style={{ 
                            width: `${dept.percentage}%`,
                            background: dept.percentage >= 80 ? '#10b981' : 
                                      dept.percentage >= 60 ? '#f59e0b' : '#ef4444'
                          }}
                        ></div>
                      </div>
                      <span className="dept-percentage">{dept.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Attendance Table */}
          <div className="table-container">
            <div className="table-header">
              <h3>📋 Today's Attendance Details</h3>
              <div className="table-actions">
                <select 
                  className="filter-select" 
                  value={departmentFilter}
                  onChange={(e) => setDepartmentFilter(e.target.value)}
                >
                  <option value="All">All Departments</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Design">Design</option>
                  <option value="Management">Management</option>
                  <option value="Quality">Quality</option>
                  <option value="HR">HR</option>
                </select>
                <button className="btn-primary" onClick={() => alert('Exporting attendance data...')}>
                  📥 Export
                </button>
                <button className="btn-icon" onClick={() => alert('Sending reminders...')}>
                  🔔 Send Reminders
                </button>
              </div>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Emp ID</th>
                  <th>Employee Name</th>
                  <th>Department</th>
                  <th>Check In</th>
                  <th>Check Out</th>
                  <th>Total Hours</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map(emp => {
                  const att = todayAttendance.find(a => a.empId === emp.empId) || {
                    date: selectedDate,
                    empId: emp.empId,
                    checkIn: '-',
                    checkOut: '-',
                    totalHours: 0,
                    status: 'Absent'
                  };

                  if (departmentFilter !== 'All' && emp.department !== departmentFilter) {
                    return null;
                  }

                  return (
                    <tr key={emp.empId}>
                      <td><strong>{emp.empId}</strong></td>
                      <td>
                        <div className="employee-info">
                          <div className="employee-avatar">{emp.name[0]}</div>
                          <div>
                            <div className="employee-name">{emp.name}</div>
                            <div className="employee-role">{emp.role}</div>
                          </div>
                        </div>
                      </td>
                      <td>{emp.department}</td>
                      <td className={att.checkIn !== '-' ? 'time-present' : 'time-absent'}>
                        {formatTime(att.checkIn)}
                      </td>
                      <td className={att.checkOut !== '-' ? 'time-present' : 'time-absent'}>
                        {formatTime(att.checkOut)}
                      </td>
                      <td><strong>{att.totalHours}h</strong></td>
                      <td>
                        <span className={`status-badge ${att.status.toLowerCase()}`}>
                          {att.status}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          {att.status === 'Absent' ? (
                            <>
                              <button 
                                className="btn-small btn-success"
                                onClick={() => handleMarkAttendance(emp.empId, 'Present')}
                              >
                                ✅ Mark Present
                              </button>
                              <button 
                                className="btn-small btn-warning"
                                onClick={() => handleMarkAttendance(emp.empId, 'Leave')}
                              >
                                🏖️ Mark Leave
                              </button>
                            </>
                          ) : (
                            <button 
                              className="btn-small btn-danger"
                              onClick={() => handleMarkAttendance(emp.empId, 'Absent')}
                            >
                              ❌ Mark Absent
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Weekly View */}
      {viewType === 'weekly' && (
        <div className="weekly-view">
          <h3>📅 Weekly Attendance Report (Dec 9 - Dec 15, 2024)</h3>
          
          <div className="summary-cards">
            <div className="card">
              <div className="card-icon">📊</div>
              <h3>Avg Daily Attendance</h3>
              <p className="card-value">86%</p>
            </div>
            <div className="card">
              <div className="card-icon">✅</div>
              <h3>Total Present</h3>
              <p className="card-value">38</p>
            </div>
            <div className="card">
              <div className="card-icon">❌</div>
              <h3>Total Absent</h3>
              <p className="card-value">10</p>
            </div>
            <div className="card">
              <div className="card-icon">🏖️</div>
              <h3>Total Leaves</h3>
              <p className="card-value">8</p>
            </div>
          </div>

          <div className="weekly-chart">
            <h3>Weekly Attendance Trend</h3>
            <div className="chart-container">
              <div className="chart-y-axis">
                {[0, 2, 4, 6, 8].map(num => (
                  <div key={num} className="y-label">{num}</div>
                ))}
              </div>
              <div className="chart-grid">
                {weeklyData.map((day, index) => (
                  <div key={index} className="chart-column">
                    <div className="column-group">
                      <div 
                        className="column present-column" 
                        style={{ height: `${(day.present / 8) * 100}%` }}
                        title={`Present: ${day.present}`}
                      ></div>
                      <div 
                        className="column absent-column" 
                        style={{ height: `${(day.absent / 8) * 100}%` }}
                        title={`Absent: ${day.absent}`}
                      ></div>
                    </div>
                    <div className="column-label">
                      <div className="day-name">{day.day}</div>
                      <div className="day-date">{day.date.split(' ')[1]}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="chart-legend">
              <div className="legend-item">
                <span className="legend-color present"></span>
                <span>Present</span>
              </div>
              <div className="legend-item">
                <span className="legend-color absent"></span>
                <span>Absent</span>
              </div>
            </div>
          </div>

          <div className="weekly-table">
            <h3>Weekly Attendance Details</h3>
            <table>
              <thead>
                <tr>
                  <th>Day</th>
                  <th>Date</th>
                  <th>Present</th>
                  <th>Absent</th>
                  <th>Attendance %</th>
                  <th>Avg Hours</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {weeklyData.map((day, index) => (
                  <tr key={index}>
                    <td><strong>{day.day}</strong></td>
                    <td>{day.date}</td>
                    <td>{day.present}</td>
                    <td>{day.absent}</td>
                    <td>{Math.round((day.present / 8) * 100)}%</td>
                    <td>{day.avgHours}h</td>
                    <td>
                      <span className={`status-badge ${day.present >= 7 ? 'present' : 'absent'}`}>
                        {day.present >= 7 ? 'Good' : 'Low'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Monthly View */}
      {viewType === 'monthly' && (
        <div className="monthly-view">
          <h3>📅 Monthly Attendance Report (November 2024)</h3>
          
          <div className="summary-cards">
            <div className="card">
              <div className="card-icon">📅</div>
              <h3>Working Days</h3>
              <p className="card-value">{monthlyOverview.workingDays}</p>
            </div>
            <div className="card card-success">
              <div className="card-icon">✅</div>
              <h3>Present Days</h3>
              <p className="card-value">{monthlyOverview.presentDays}</p>
            </div>
            <div className="card card-danger">
              <div className="card-icon">❌</div>
              <h3>Absent Days</h3>
              <p className="card-value">{monthlyOverview.absentDays}</p>
            </div>
            <div className="card card-warning">
              <div className="card-icon">🏖️</div>
              <h3>Leave Days</h3>
              <p className="card-value">{monthlyOverview.leaveDays}</p>
            </div>
            <div className="card">
              <div className="card-icon">📊</div>
              <h3>Avg Attendance</h3>
              <p className="card-value">{monthlyOverview.avgAttendance}%</p>
            </div>
          </div>

          <div className="monthly-chart">
            <h3>Monthly Attendance Distribution</h3>
            <div className="pie-chart-container">
              <div className="pie-chart">
                <div className="pie-segment present-segment"></div>
                <div className="pie-segment absent-segment"></div>
                <div className="pie-segment leave-segment"></div>
                <div className="pie-center">
                  <div className="pie-value">{monthlyOverview.avgAttendance}%</div>
                  <div className="pie-label">Attendance</div>
                </div>
              </div>
              <div className="pie-legend">
                <div className="legend-item">
                  <span className="legend-dot present"></span>
                  <div>
                    <strong>Present</strong>
                    <p>{monthlyOverview.presentDays} days ({Math.round((monthlyOverview.presentDays / monthlyOverview.totalDays) * 100)}%)</p>
                  </div>
                </div>
                <div className="legend-item">
                  <span className="legend-dot absent"></span>
                  <div>
                    <strong>Absent</strong>
                    <p>{monthlyOverview.absentDays} days ({Math.round((monthlyOverview.absentDays / monthlyOverview.totalDays) * 100)}%)</p>
                  </div>
                </div>
                <div className="legend-item">
                  <span className="legend-dot leave"></span>
                  <div>
                    <strong>Leaves</strong>
                    <p>{monthlyOverview.leaveDays} days ({Math.round((monthlyOverview.leaveDays / monthlyOverview.totalDays) * 100)}%)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .page-subtitle {
          color: #94a3b8;
          font-size: 14px;
          margin-top: 4px;
        }
        
        .view-controls {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        
        .view-toggle {
          display: flex;
          background: #334155;
          border-radius: 8px;
          padding: 4px;
        }
        
        .view-btn {
          padding: 8px 16px;
          border: none;
          background: transparent;
          color: #94a3b8;
          cursor: pointer;
          border-radius: 6px;
          font-size: 14px;
          transition: all 0.2s;
        }
        
        .view-btn.active {
          background: #3b82f6;
          color: white;
        }
        
        .attendance-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 24px;
          flex-wrap: wrap;
          gap: 20px;
        }
        
        .date-controls {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .date-input {
          padding: 10px 16px;
          background: #1e293b;
          border: 1px solid #334155;
          border-radius: 6px;
          color: #f1f5f9;
          font-size: 14px;
          min-width: 200px;
        }
        
        .date-navigation {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .current-date {
          color: #f1f5f9;
          font-weight: 500;
          min-width: 200px;
          text-align: center;
        }
        
        .attendance-summary {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 16px;
          flex: 1;
        }
        
        .summary-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          background: #1e293b;
          border-radius: 8px;
          border: 1px solid #334155;
        }
        
        .summary-icon {
          font-size: 24px;
          width: 48px;
          height: 48px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(59, 130, 246, 0.1);
        }
        
        .summary-icon.present {
          background: rgba(16, 185, 129, 0.1);
          color: #10b981;
        }
        
        .summary-icon.absent {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
        }
        
        .summary-item strong {
          display: block;
          font-size: 14px;
          color: #94a3b8;
        }
        
        .summary-item p {
          font-size: 20px;
          font-weight: 600;
          color: #f1f5f9;
          margin: 4px 0 0 0;
        }
        
        .attendance-chart {
          margin-top: 20px;
        }
        
        .chart-bars {
          display: flex;
          justify-content: center;
          align-items: flex-end;
          gap: 40px;
          height: 200px;
          padding: 0 40px;
        }
        
        .bar-group {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }
        
        .bar {
          width: 60px;
          border-radius: 6px 6px 0 0;
          position: relative;
          transition: height 0.3s ease;
        }
        
        .present-bar {
          background: #10b981;
        }
        
        .absent-bar {
          background: #ef4444;
        }
        
        .leave-bar {
          background: #f59e0b;
        }
        
        .bar-value {
          position: absolute;
          top: -25px;
          left: 0;
          right: 0;
          text-align: center;
          font-weight: 600;
          color: #f1f5f9;
          font-size: 14px;
        }
        
        .bar-label {
          color: #94a3b8;
          font-size: 14px;
        }
        
        .dept-attendance {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-top: 20px;
        }
        
        .dept-item {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        
        .dept-name {
          width: 120px;
          color: #f1f5f9;
          font-size: 14px;
        }
        
        .dept-stats {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .dept-present {
          width: 60px;
          font-size: 14px;
          font-weight: 600;
          color: #f1f5f9;
        }
        
        .dept-progress {
          flex: 1;
          height: 8px;
          background: #334155;
          border-radius: 4px;
          overflow: hidden;
        }
        
        .progress-bar {
          height: 100%;
          border-radius: 4px;
          transition: width 0.3s ease;
        }
        
        .dept-percentage {
          width: 50px;
          text-align: right;
          font-size: 14px;
          font-weight: 600;
          color: #f1f5f9;
        }
        
        .table-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }
        
        .table-actions {
          display: flex;
          gap: 12px;
          align-items: center;
        }
        
        .employee-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .employee-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #3b82f6;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          color: white;
          flex-shrink: 0;
        }
        
        .employee-name {
          font-weight: 500;
          color: #f1f5f9;
        }
        
        .employee-role {
          font-size: 12px;
          color: #94a3b8;
        }
        
        .time-present {
          color: #10b981;
          font-weight: 500;
        }
        
        .time-absent {
          color: #ef4444;
        }
        
        .action-buttons {
          display: flex;
          gap: 8px;
        }
        
        .btn-small {
          padding: 6px 12px;
          border: none;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .btn-success {
          background: rgba(16, 185, 129, 0.2);
          color: #10b981;
        }
        
        .btn-warning {
          background: rgba(245, 158, 11, 0.2);
          color: #f59e0b;
        }
        
        .btn-danger {
          background: rgba(239, 68, 68, 0.2);
          color: #ef4444;
        }
        
        .btn-small:hover {
          opacity: 0.8;
        }
        
        .weekly-view, .monthly-view {
          animation: fadeIn 0.3s ease;
        }
        
        .weekly-chart, .monthly-chart {
          background: #1e293b;
          padding: 20px;
          border-radius: 8px;
          border: 1px solid #334155;
          margin: 24px 0;
        }
        
        .chart-container {
          display: flex;
          gap: 20px;
          margin-top: 20px;
        }
        
        .chart-y-axis {
          display: flex;
          flex-direction: column-reverse;
          justify-content: space-between;
          padding: 20px 0;
        }
        
        .y-label {
          font-size: 12px;
          color: #94a3b8;
          height: 40px;
          display: flex;
          align-items: center;
        }
        
        .chart-grid {
          flex: 1;
          display: flex;
          justify-content: space-around;
          align-items: flex-end;
          padding: 20px 0;
        }
        
        .chart-column {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }
        
        .column-group {
          height: 200px;
          display: flex;
          align-items: flex-end;
          gap: 4px;
        }
        
        .column {
          width: 30px;
          border-radius: 4px 4px 0 0;
        }
        
        .present-column {
          background: #10b981;
        }
        
        .absent-column {
          background: #ef4444;
        }
        
        .column-label {
          text-align: center;
        }
        
        .day-name {
          font-size: 14px;
          color: #f1f5f9;
          font-weight: 500;
        }
        
        .day-date {
          font-size: 12px;
          color: #94a3b8;
        }
        
        .weekly-table {
          margin-top: 24px;
        }
        
        .pie-chart-container {
          display: flex;
          align-items: center;
          gap: 40px;
          margin-top: 20px;
        }
        
        .pie-chart {
          width: 200px;
          height: 200px;
          border-radius: 50%;
          background: conic-gradient(
            #10b981 0% 75%,
            #ef4444 75% 85%,
            #f59e0b 85% 100%
          );
          position: relative;
        }
        
        .pie-center {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100px;
          height: 100px;
          background: #1e293b;
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        
        .pie-value {
          font-size: 24px;
          font-weight: 700;
          color: #10b981;
        }
        
        .pie-label {
          font-size: 12px;
          color: #94a3b8;
        }
        
        .pie-legend {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        .legend-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          background: #334155;
          border-radius: 6px;
        }
        
        .legend-dot {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        
        .legend-dot.present {
          background: #10b981;
        }
        
        .legend-dot.absent {
          background: #ef4444;
        }
        
        .legend-dot.leave {
          background: #f59e0b;
        }
        
        .legend-item strong {
          display: block;
          color: #f1f5f9;
          font-size: 14px;
        }
        
        .legend-item p {
          color: #94a3b8;
          font-size: 12px;
          margin: 4px 0 0 0;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @media (max-width: 768px) {
          .attendance-header {
            flex-direction: column;
          }
          
          .attendance-summary {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .chart-bars {
            gap: 20px;
            padding: 0 20px;
          }
          
          .bar {
            width: 40px;
          }
          
          .table-header {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
          }
          
          .table-actions {
            flex-wrap: wrap;
          }
          
          .pie-chart-container {
            flex-direction: column;
            gap: 20px;
          }
        }
        
        @media (max-width: 480px) {
          .view-toggle {
            flex-direction: column;
            width: 100%;
          }
          
          .view-btn {
            width: 100%;
            text-align: center;
          }
          
          .attendance-summary {
            grid-template-columns: 1fr;
          }
          
          .chart-bars {
            gap: 10px;
            padding: 0 10px;
          }
          
          .bar {
            width: 30px;
          }
        }
      `}</style>
    </div>
  );
};

export default AttendancePage;