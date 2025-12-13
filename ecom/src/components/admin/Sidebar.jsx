// import React from 'react';
// import TreeView from './TreeView';

// const Sidebar = ({ role, currentPage, onNavigate }) => {
//   const baseMenu = [
//     {
//       id: 'dashboard',
//       icon: '📊',
//       label: 'Dashboard',
//       selected: currentPage === 'dashboard',
//       onClick: () => onNavigate('dashboard')
//     },
//     {
//       id: 'employees',
//       icon: '👥',
//       label: 'Employees',
//       selected: currentPage === 'employees',
//       onClick: () => onNavigate('employees')
//     },
//     {
//       id: 'tracking',
//       icon: '📡',
//       label: 'Live Tracking',
//       selected: currentPage === 'tracking',
//       onClick: () => onNavigate('tracking')
//     },
//     {
//       id: 'attendance',
//       icon: '📅',
//       label: 'Attendance',
//       selected: currentPage === 'attendance',
//       onClick: () => onNavigate('attendance')
//     }
//   ];

//   const bossMenu = [
//     {
//       id: 'reports',
//       icon: '📈',
//       label: 'Reports',
//       children: [
//         { id: 'reports-weekly', icon: '📊', label: 'Weekly Report', onClick: () => onNavigate('reports-weekly') },
//         { id: 'reports-monthly', icon: '📆', label: 'Monthly Report', onClick: () => onNavigate('reports-monthly') }
//       ]
//     },
//     {
//       id: 'settings',
//       icon: '⚙️',
//       label: 'Settings',
//       children: [
//         { id: 'settings-general', icon: '🔧', label: 'General', onClick: () => onNavigate('settings-general') },
//         { id: 'settings-users', icon: '👤', label: 'User Management', onClick: () => onNavigate('settings-users') }
//       ]
//     }
//   ];

//   const treeData = role === 'Boss' ? [...baseMenu, ...bossMenu] : baseMenu;

//   return (
//     <aside className="sidebar">
//       <div className="sidebar-header">
//         <h2>🏢 ACORE IT</h2>
//         <span className="role-badge">{role}</span>
//       </div>
//       <nav className="sidebar-nav">
//         <TreeView data={treeData} />
//       </nav>
//       <div className="sidebar-footer">
//         <p>© 2024 ACORE IT</p>
//         <p>Version 1.0.0</p>
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;




import React, { useState } from 'react';
import TreeView from './TreeView';
import './Sidebar.css'; // CSS file import

const Sidebar = ({ role, currentPage, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(true);

  const baseMenu = [
    {
      id: 'dashboard',
      icon: '📊',
      label: 'Dashboard',
      selected: currentPage === 'dashboard',
      onClick: () => onNavigate('dashboard')
    },
    {
      id: 'employees',
      icon: '👥',
      label: 'Employees',
      selected: currentPage === 'employees',
      onClick: () => onNavigate('employees')
    },
    {
      id: 'tracking',
      icon: '📡',
      label: 'Live Tracking',
      selected: currentPage === 'tracking',
      onClick: () => onNavigate('tracking')
    },
    {
      id: 'attendance',
      icon: '📅',
      label: 'Attendance',
      selected: currentPage === 'attendance',
      onClick: () => onNavigate('attendance')
    }
  ];

  const bossMenu = [
    {
      id: 'reports',
      icon: '📈',
      label: 'Reports',
      children: [
        { id: 'reports-weekly', icon: '📊', label: 'Weekly Report', onClick: () => onNavigate('reports-weekly') },
        { id: 'reports-monthly', icon: '📆', label: 'Monthly Report', onClick: () => onNavigate('reports-monthly') }
      ]
    },
    {
      id: 'settings',
      icon: '⚙️',
      label: 'Settings',
      children: [
        { id: 'settings-general', icon: '🔧', label: 'General', onClick: () => onNavigate('settings-general') },
        { id: 'settings-users', icon: '👤', label: 'User Management', onClick: () => onNavigate('settings-users') }
      ]
    }
  ];

  const treeData = role === 'Boss' ? [...baseMenu, ...bossMenu] : baseMenu;

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Agar sidebar closed hai to sirf toggle button dikhao
  if (!isOpen) {
    return (
      <div style={{
        position: 'fixed',
        top: '15px',
        left: '15px',
        zIndex: '1000'
      }}>
        <button 
          onClick={toggleSidebar}
          title="Open sidebar"
          style={{
            width: '40px',
            height: '40px',
            background: '#1e293b',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '20px',
            cursor: 'pointer',
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = '#3b82f6';
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = '#1e293b';
            e.target.style.transform = 'scale(1)';
          }}
        >
          ☰
        </button>
      </div>
    );
  }

  return (
    <aside style={{
      position: 'fixed',
      left: '0',
      top: '0',
      width: '250px',
      height: '100vh',
      background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
      color: 'white',
      zIndex: '1000',
      boxShadow: '2px 0 10px rgba(0,0,0,0.2)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header section me toggle button */}
      <div style={{
        padding: '20px 15px',
        borderBottom: '1px solid #334155'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '10px'
        }}>
          <h2 style={{ margin: '0', fontSize: '18px' }}>🏢 ACORE IT</h2>
          <button 
            onClick={toggleSidebar}
            title="Close sidebar"
            style={{
              background: 'none',
              border: 'none',
              color: '#94a3b8',
              fontSize: '24px',
              cursor: 'pointer',
              width: '30px',
              height: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '4px',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255,255,255,0.1)';
              e.target.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'none';
              e.target.style.color = '#94a3b8';
            }}
          >
            ×
          </button>
        </div>
        <span style={{
          background: '#3b82f6',
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '12px',
          fontWeight: '500'
        }}>{role}</span>
      </div>
      
      <nav style={{
        padding: '15px',
        flexGrow: '1'
      }}>
        <TreeView data={treeData} />
      </nav>
      
      <div style={{
        padding: '15px',
        borderTop: '1px solid #334155',
        fontSize: '12px',
        color: '#94a3b8'
      }}>
        <p style={{ margin: '0 0 5px 0' }}>© 2024 ACORE IT</p>
        <p style={{ margin: '0' }}>Version 1.0.0</p>
      </div>
    </aside>
  );
};

export default Sidebar;