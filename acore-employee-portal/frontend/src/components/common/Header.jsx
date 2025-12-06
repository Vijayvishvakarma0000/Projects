// // import React from 'react';
// // import './Header.css';

// // const Header = ({ currentUser, onProfileClick, onLogout, onAttendanceClick }) => {
// //   const getInitials = (name) => {
// //     return name.split(' ').map(n => n.charAt(0)).join('').toUpperCase();
// //   };

// //   return (
// //     <header className="header">
// //       <div className="header-left">
// //         <div className="logo">
// //           <span className="logo-icon">🏢</span>
// //         </div>
// //         <div className="company-info">
// //           <h1 className="company-name">Acore IT Hub</h1>
// //           <p className="company-tagline">Employee Management Portal</p>
// //         </div>
// //       </div>

// //       <div className="header-right">
// //         <button 
// //           className="attendance-btn"
// //           onClick={onAttendanceClick}
// //         >
// //           <span className="attendance-icon">⏰</span>
// //           Attendance
// //         </button>

// //         <button 
// //           className="profile-btn"
// //           onClick={onProfileClick}
// //         >
// //           <span className="profile-icon">👤</span>
// //           My Profile
// //         </button>

// //         <div className="user-section">
// //           <div className="user-avatar">
// //             {getInitials(currentUser.name)}
// //           </div>
// //           <div className="user-info">
// //             <h3 className="user-name">{currentUser.name}</h3>
// //             <p className="user-designation">{currentUser.designation}</p>
// //           </div>
// //           <button className="logout-btn" onClick={onLogout}>
// //             Logout
// //           </button>
// //         </div>
// //       </div>
// //     </header>
// //   );
// // };

// // export default Header;



// import React from 'react';
// import './Header.css';

// const Header = ({ currentUser, onProfileClick, onLogout, onAttendanceClick, onToggleSidebar, isSidebarOpen }) => {
//   const getInitials = (name) => {
//     return name.split(' ').map(n => n.charAt(0)).join('').toUpperCase();
//   };

//   return (
//     <header className="header">
//       <div className="header-left">
//         <div className="logo">
//           <span className="logo-icon">🏢</span>
//         </div>
//         <div className="company-info">
//           <h1 className="company-name">Acore IT Hub</h1>
//           <p className="company-tagline">Employee Management Portal</p>
//         </div>
//       </div>

//       <div className="header-right">
//         <button 
//           className="attendance-btn"
//           onClick={onAttendanceClick}
//         >
//           <span className="attendance-icon">⏰</span>
//           Attendance
//         </button>

//         <button 
//           className="profile-btn"
//           onClick={onProfileClick}
//         >
//           <span className="profile-icon">👤</span>
//           My Profile
//         </button>

//         <div className="user-section">
//           <div className="user-avatar">
//             {getInitials(currentUser.name)}
//           </div>
//           <div className="user-info">
//             <h3 className="user-name">{currentUser.name}</h3>
//             <p className="user-designation">{currentUser.designation}</p>
//           </div>
//           <button className="logout-btn" onClick={onLogout}>
//             Logout
//           </button>
//         </div>

//         {/* Hamburger Button - Sabse right side mein */}
//         <button 
//           className="hamburger-btn"
//           onClick={onToggleSidebar}
//           title={isSidebarOpen ? "Hide Menu" : "Show Menu"}
//         >
//           <span className={`hamburger-line ${isSidebarOpen ? 'open' : ''}`}></span>
//           <span className={`hamburger-line ${isSidebarOpen ? 'open' : ''}`}></span>
//           <span className={`hamburger-line ${isSidebarOpen ? 'open' : ''}`}></span>
//         </button>
//       </div>
//     </header>
//   );
// };

// export default Header;


// import React, { useState } from 'react';
// import './Header.css';

// const Header = ({ currentUser, onProfileClick, onLogout, onAttendanceClick, onCardClick, attendanceStatus }) => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const getInitials = (name) => {
//     return name.split(' ').map(n => n.charAt(0)).join('').toUpperCase();
//   };

//   const menuItems = [
//     {
//       id: 'attendance',
//       icon: '⏰',
//       title: 'Attendance',
//       description: 'Punch in/out and track attendance',
//       badge: attendanceStatus?.isPunchedIn ? 'Active' : null,
//     },
//     {
//       id: 'leave',
//       icon: '🏖',
//       title: 'Leave Management',
//       description: 'Apply for leaves and track balance',
//     },
//     {
//       id: 'birthday',
//       icon: '🎂',
//       title: 'Birthdays',
//       description: 'Check upcoming birthdays',
//     },
//     {
//       id: 'calendar',
//       icon: '📅',
//       title: 'Holiday Calendar',
//       description: 'View official holidays',
//     },
//     {
//       id: 'github',
//       icon: '💻',
//       title: 'GitHub Integration',
//       description: 'Push code and track work',
//     },
//     {
//       id: 'profile',
//       icon: '👤',
//       title: 'My Profile',
//       description: 'View and update information',
//     }
//   ];

//   const handleMenuToggle = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const handleMenuItemClick = (itemId) => {
//     onCardClick(itemId);
//     setIsMenuOpen(false);
//   };

//   const handleCloseMenu = () => {
//     setIsMenuOpen(false);
//   };

//   return (
//     <>
//       {/* Overlay */}
//       {isMenuOpen && <div className="menu-overlay" onClick={handleCloseMenu}></div>}
      
//       <header className="header">
//         <div className="header-left">
//           <div className="logo">
//             <span className="logo-icon">🏢</span>
//           </div>
//           <div className="company-info">
//             <h1 className="company-name">Acore IT Hub</h1>
//             <p className="company-tagline">Employee Management Portal</p>
//           </div>
//         </div>

//         <div className="header-right">
//           <button 
//             className="attendance-btn"
//             onClick={onAttendanceClick}
//           >
//             <span className="attendance-icon">⏰</span>
//             Attendance
//           </button>

//           <button 
//             className="profile-btn"
//             onClick={onProfileClick}
//           >
//             <span className="profile-icon">👤</span>
//             My Profile
//           </button>

//           <div className="user-section">
//             <div className="user-avatar">
//               {getInitials(currentUser.name)}
//             </div>
//             <div className="user-info">
//               <h3 className="user-name">{currentUser.name}</h3>
//               <p className="user-designation">{currentUser.designation}</p>
//             </div>
//             <button className="logout-btn" onClick={onLogout}>
//               Logout
//             </button>
//           </div>

//           {/* Hamburger Button with Dropdown Menu */}
//           <div className="hamburger-menu-container">
//             <button 
//               className="hamburger-btn"
//               onClick={handleMenuToggle}
//               title={isMenuOpen ? "Close Menu" : "Open Menu"}
//             >
//               <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
//               <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
//               <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
//             </button>

//             {/* Dropdown Menu */}
//             <div className={`dropdown-menu ${isMenuOpen ? 'menu-open' : ''}`}>
//               <div className="menu-header">
//                 <h3>Quick Actions</h3>
//               </div>
//               <div className="menu-items">
//                 {menuItems.map((item, index) => (
//                   <div
//                     key={item.id}
//                     className="menu-item"
//                     onClick={() => handleMenuItemClick(item.id)}
//                     style={{ animationDelay: `${index * 0.1}s` }}
//                   >
//                     <div className="menu-item-icon">
//                       <span>{item.icon}</span>
//                     </div>
//                     <div className="menu-item-content">
//                       <h4 className="menu-item-title">
//                         {item.title}
//                         {item.badge && (
//                           <span className={`menu-item-badge ${item.badge.toLowerCase()}`}>
//                             {item.badge}
//                           </span>
//                         )}
//                       </h4>
//                       <p className="menu-item-description">{item.description}</p>
//                     </div>
//                     <div className="menu-item-arrow">→</div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>
//     </>
//   );
// };

// export default Header;


// @@@@@@@@@@@@@@@@@@@



// import React, { useState } from 'react';
// import './Header.css';

// const Header = ({ currentUser, onProfileClick, onLogout, onCardClick, attendanceStatus }) => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const getInitials = (name) => {
//     return name.split(' ').map(n => n.charAt(0)).join('').toUpperCase();
//   };

//   const menuItems = [


//         {
//     id: 'attendance',  // ✅ YEH ADD KARO
//     icon: '⏰',
//     title: 'Attendance',
//     description: 'Punch in/out and track attendance',
//     badge: attendanceStatus?.isPunchedIn ? 'Active' : null,
//   },

//     {
//       id: 'projects',
//       icon: '📋',
//       title: 'Projects',
//       description: 'Manage and track all projects',
//     }
//  ,
//       {
//     id: 'attendance-calendar',  // NEW: Attendance Calendar option
//     icon: '📊',
//     title: 'Attendance Calendar',
//     description: 'View monthly attendance with stats',
//   },

  
//     {
//       id: 'leave',
//       icon: '🏖',
//       title: 'Leave Management',
//       description: 'Apply for leaves and track balance',
//     },
//     {
//       id: 'salary',
//       icon: '💰',
//       title: 'Salary Slip',
//       description: 'View and download salary slips',
//     },
//     {
//       id: 'birthday',
//       icon: '🎂',
//       title: 'Birthdays',
//       description: 'Check upcoming birthdays',
//     },
//     {
//       id: 'calendar',
//       icon: '📅',
//       title: 'Holiday Calendar',
//       description: 'View official holidays',
//     },
//     {
//       id: 'github',
//       icon: '💻',
//       title: 'GitHub Integration',
//       description: 'Push code and track work',
//     },
//     // {
//     //   id: 'profile',
//     //   icon: '👤',
//     //   title: 'My Profile',
//     //   description: 'View and update information',
//     // }
//   ];

//   const handleMenuToggle = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const handleMenuItemClick = (itemId) => {
//     onCardClick(itemId);
//     setIsMenuOpen(false);
//   };

//   const handleCloseMenu = () => {
//     setIsMenuOpen(false);
//   };

//   return (
//     <>
//       {/* Overlay */}
//       {isMenuOpen && <div className="menu-overlay" onClick={handleCloseMenu}></div>}
      
//       <header className="header">
//         <div className="header-left">
//           <div className="logo">
//             <span className="logo-icon"><img src="/assets/acore-logo.jpg" alt="" /></span>
//           </div>
//           <div className="company-info">
//             <h1 className="company-name">Acore IT Hub PVT LTD</h1>
//             <p className="company-tagline">Employee Management Portal</p>
//           </div>
//         </div>

//         <div className="header-right">
//           {/* <button 
//             className="attendance-btn"
//             onClick={onAttendanceClick}
//           >
//             <span className="attendance-icon">⏰</span>
//             Attendance
//           </button> */}

//           <button 
//             className="profile-btn"
//             onClick={onProfileClick}
//           >
//             <span className="profile-icon">👤</span>
//             My Profile
//           </button>

//           <div className="user-section">
//             <div className="user-avatar">
//               {getInitials(currentUser.name)}
//             </div>
//             <div className="user-info">
//               <h3 className="user-name">{currentUser.name}</h3>
//               <p className="user-designation">{currentUser.designation}</p>
//             </div>
//             <button className="logout-btn" onClick={onLogout}>
//               Logout
//             </button>
//           </div>

//           {/* Hamburger Button with Dropdown Menu */}
//           <div className="hamburger-menu-container">
//             <button 
//               className="hamburger-btn"
//               onClick={handleMenuToggle}
//               title={isMenuOpen ? "Close Menu" : "Open Menu"}
//             >
//               <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
//               <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
//               <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
//             </button>

//             {/* Dropdown Menu */}
//             <div className={`dropdown-menu ${isMenuOpen ? 'menu-open' : ''}`}>
//               <div className="menu-header">
//                 <h3>Quick Actions</h3>
//               </div>
//               <div className="menu-items">
//                 {menuItems.map((item, index) => (
//                   <div
//                     key={item.id}
//                     className="menu-item"
//                     onClick={() => handleMenuItemClick(item.id)}
//                     style={{ animationDelay: `${index * 0.1}s` }}
//                   >
//                     <div className="menu-item-icon">
//                       <span>{item.icon}</span>
//                     </div>
//                     <div className="menu-item-content">
//                       <h4 className="menu-item-title">
//                         {item.title}
//                         {item.badge && (
//                           <span className={`menu-item-badge ${item.badge.toLowerCase()}`}>
//                             {item.badge}
//                           </span>
//                         )}
//                       </h4>
//                       <p className="menu-item-description">{item.description}</p>
//                     </div>
//                     <div className="menu-item-arrow">→</div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>
//     </>
//   );
// };

// export default Header;




import React, { useState, useMemo, useCallback } from 'react';
import './Header.css';

const Header = ({ currentUser, onProfileClick, onLogout, onCardClick, attendanceStatus }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n.charAt(0)).join('').toUpperCase();
  };

  // Menu items with memoization for better performance
  const menuItems = useMemo(() => [
     {
    id: 'attendance',  // ✅ YEH ADD KARO
    icon: '⏰',
    title: 'Attendance',
    description: 'Punch in/out and track attendance',
    badge: attendanceStatus?.isPunchedIn ? 'Active' : null,
  },

    {
      id: 'projects',
      icon: '📋',
      title: 'Projects',
      description: 'Manage and track all projects',
    },
      {
    id: 'tasks', // ✅ NEW TASKS OPTION
    icon: '✅',
    title: 'Tasks',
    description: 'Manage and track project tasks',
  },
 ,
      {
    id: 'attendance-calendar',  // NEW: Attendance Calendar option
    icon: '📊',
    title: 'Attendance Calendar',
    description: 'View monthly attendance with stats',
  },

  
    {
      id: 'leave',
      icon: '🏖',
      title: 'Leave Management',
      description: 'Apply for leaves and track balance',
    },
    {
      id: 'salary',
      icon: '💰',
      title: 'Salary Slip',
      description: 'View and download salary slips',
    },
    {
      id: 'birthday',
      icon: '🎂',
      title: 'Birthdays',
      description: 'Check upcoming birthdays',
    },
    {
      id: 'calendar',
      icon: '📅',
      title: 'Holiday Calendar',
      description: 'View official holidays',
    },
    {
      id: 'github',
      icon: '💻',
      title: 'GitHub Integration',
      description: 'Push code and track work',
    },
    // {
    //   id: 'profile',
    //   icon: '👤',
    //   title: 'My Profile',
    //   description: 'View and update information',
    // }
  ], []);

  // Memoized handlers for better performance
  const handleMenuToggle = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const handleMenuItemClick = useCallback((itemId) => {
    onCardClick(itemId);
    setIsMenuOpen(false);
  }, [onCardClick]);

  const handleCloseMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  return (
    <>
      {/* Overlay */}
      {isMenuOpen && <div className="menu-overlay" onClick={handleCloseMenu}></div>}
      
      <header className="header">
        <div className="header-left">
          <div className="logo">
            <span className="logo-icon">
              <img src="/assets/acore-logo.jpg" alt="Acore IT Hub" />
            </span>
          </div>
          <div className="company-info">
            <h1 className="company-name">Acore IT Hub PVT LTD</h1>
            <p className="company-tagline">Employee Management Portal</p>
          </div>
        </div>

        <div className="header-right">
          <button 
            className="profile-btn"
            onClick={onProfileClick}
            aria-label="Profile"
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
            <button className="logout-btn" onClick={onLogout} aria-label="Logout">
              Logout
            </button>
          </div>

          {/* Hamburger Menu */}
          <div className="hamburger-menu-container">
            <button 
              className="hamburger-btn"
              onClick={handleMenuToggle}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
              <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
              <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
            </button>

            {/* Dropdown Menu */}
            <div className={`dropdown-menu ${isMenuOpen ? 'menu-open' : ''}`}>
              <div className="menu-header">
                <h3>🚀 Quick Actions</h3>
              </div>
              <div className="menu-items">
                {menuItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="menu-item"
                    onClick={() => handleMenuItemClick(item.id)}
                    style={{ animationDelay: `${index * 0.05}s` }}
                    role="button"
                    tabIndex={0}
                    onKeyPress={(e) => e.key === 'Enter' && handleMenuItemClick(item.id)}
                  >
                    <div className="menu-item-icon">
                      <span role="img" aria-label={item.title}>{item.icon}</span>
                    </div>
                    <div className="menu-item-content">
                      <h4 className="menu-item-title">
                        {item.title}
                        {item.badge && (
                          <span className={`menu-item-badge ${item.badge.toLowerCase()}`}>
                            {item.badge}
                          </span>
                        )}
                      </h4>
                      <p className="menu-item-description">{item.description}</p>
                    </div>
                    <div className="menu-item-arrow" aria-hidden="true">→</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

// Memoize the header component for better performance
export default React.memo(Header);