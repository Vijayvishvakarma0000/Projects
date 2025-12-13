import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import DashboardPage from './pages/DashboardPage';
import EmployeesPage from './pages/EmployeesPage';
import LiveTrackingPage from './pages/LiveTrackingPage';
import AttendancePage from './pages/AttendancePage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';
import { 
  AUTHORIZED_USERS, 
  EMPLOYEES_DATA, 
  ATTENDANCE_DATA, 
  LIVE_TRACKING_DATA,
  WEEKLY_REPORT,
  MONTHLY_REPORT 
} from '../../utils/constants';
import './AdminDashboard.css';

const AdminDashboard = ({ userRole, onLogout }) => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [user] = useState({
    name: 'Admin User',
    role: userRole || 'Admin',
    department: 'Administration'
  });

  const renderPage = () => {
    switch(currentPage) {
      case 'dashboard':
        return <DashboardPage employees={EMPLOYEES_DATA} />;
      case 'employees':
        return <EmployeesPage employees={EMPLOYEES_DATA} />;
      case 'tracking':
        return <LiveTrackingPage trackingData={LIVE_TRACKING_DATA} />;
      case 'attendance':
        return <AttendancePage attendance={ATTENDANCE_DATA} employees={EMPLOYEES_DATA} />;
      case 'reports-weekly':
        return <ReportsPage reportType="weekly" reportData={WEEKLY_REPORT} />;
      case 'reports-monthly':
        return <ReportsPage reportType="monthly" reportData={MONTHLY_REPORT} />;
      case 'settings-general':
        return <SettingsPage section="general" users={AUTHORIZED_USERS} />;
      case 'settings-users':
        return <SettingsPage section="users" users={AUTHORIZED_USERS} />;
      default:
        return <DashboardPage employees={EMPLOYEES_DATA} />;
    }
  };

  return (
    <div className="admin-layout">
      <Sidebar role={userRole} currentPage={currentPage} onNavigate={setCurrentPage} />
      <div className="main-content">
        <Topbar user={user} onLogout={onLogout} />
        <div className="page-content">
          {renderPage()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;