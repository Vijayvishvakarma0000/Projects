// // import React, { useState } from 'react';
// // import { useAuth } from './hooks/useAuth';
// // import { useAttendance } from './hooks/useAttendance';
// // import { useToast } from './hooks/useToast';
// // import Login from './components/auth/Login';
// // import Header from './components/common/Header';
// // import AnnouncementSlider from './components/dashboard/AnnouncementSlider';
// // import DashboardGrid from './components/dashboard/DashboardGrid';
// // import Toast from './components/common/Toast';
// // import AttendanceModal from './components/modals/AttendanceModal';
// // import LeaveModal from './components/modals/LeaveModal';
// // import ProfileModal from './components/modals/ProfileModal';

// // function App() {
// //   const { currentUser, loading: authLoading, login, logout, getUserInitials } = useAuth();
// //   const { isPunchedIn, workingHours, loading: attendanceLoading, handlePunch } = useAttendance();
// //   const { toast, showToast } = useToast();

// //   const [activeModal, setActiveModal] = useState(null);
// //   const [leaveLoading, setLeaveLoading] = useState(false);
// //   const [resignationLoading, setResignationLoading] = useState(false);

// //   const handleLogin = async (email, password) => {
// //     try {
// //       await login(email, password);
// //       showToast('✅ Login successful!');
// //     } catch (error) {
// //       showToast('❌ Login failed!', 'error');
// //     }
// //   };

// //   const handleLogout = () => {
// //     if (isPunchedIn) {
// //       const workHours = (Date.now() - punchInTime) / (1000 * 60 * 60);
// //       if (workHours < 7) {
// //         const hours = Math.floor(7 - workHours);
// //         const minutes = Math.floor(((7 - workHours) - hours) * 60);
// //         showToast(`⛔ Cannot logout! Complete ${hours}h ${minutes}m more work time.`, 'warning');
// //         return;
// //       }
// //     }
// //     logout();
// //     showToast('👋 Logged out successfully!');
// //   };

// //   const handlePunchClick = async () => {
// //     try {
// //       await handlePunch();
// //       if (!isPunchedIn) {
// //         showToast('✅ Punched in successfully!');
// //       } else {
// //         showToast('✅ Punched out successfully! You can now logout.');
// //       }
// //     } catch (error) {
// //       showToast(error.message, 'warning');
// //     }
// //   };

// //   const handleLeaveSubmit = async (formData) => {
// //     setLeaveLoading(true);
// //     setTimeout(() => {
// //       showToast('✅ Leave application submitted!');
// //       setActiveModal(null);
// //       setLeaveLoading(false);
// //     }, 1000);
// //   };

// //   const handleResignationSubmit = async (formData) => {
// //     setResignationLoading(true);
// //     setTimeout(() => {
// //       showToast('✅ Resignation request submitted successfully!');
// //       setResignationLoading(false);
// //       setTimeout(() => {
// //         showToast('📧 HR will contact you within 24-48 hours.');
// //       }, 2000);
// //     }, 1000);
// //   };

// //   const handleCardClick = (modalType) => {
// //     setActiveModal(modalType);
// //   };

// //   const closeModal = () => {
// //     setActiveModal(null);
// //   };

// //   if (!currentUser) {
// //     return (
// //       <>
// //         <Login onLogin={handleLogin} loading={authLoading} />
// //         <Toast toast={toast} />
// //       </>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen gradient-bg">
// //       <div className="container mx-auto px-4 py-8">
// //         <Header
// //           currentUser={currentUser}
// //           getUserInitials={getUserInitials}
// //           onProfileClick={() => handleCardClick('profile')}
// //           onLogout={handleLogout}
// //         />
        
// //         <AnnouncementSlider />
// //         <DashboardGrid onCardClick={handleCardClick} />

// //         {/* Modals */}
// //         <AttendanceModal
// //           isOpen={activeModal === 'attendance'}
// //           onClose={closeModal}
// //           attendance={{
// //             isPunchedIn,
// //             workingHours,
// //             loading: attendanceLoading
// //           }}
// //           onPunch={handlePunchClick}
// //         />

// //         <LeaveModal
// //           isOpen={activeModal === 'leave'}
// //           onClose={closeModal}
// //           onLeaveSubmit={handleLeaveSubmit}
// //           loading={leaveLoading}
// //         />

// //         <ProfileModal
// //           isOpen={activeModal === 'profile'}
// //           onClose={closeModal}
// //           currentUser={currentUser}
// //           getUserInitials={getUserInitials}
// //           onResignationSubmit={handleResignationSubmit}
// //           resignationLoading={resignationLoading}
// //         />

// //         <Toast toast={toast} />
// //       </div>
// //     </div>
// //   );
// // }

// // export default App;



// import React, { useState, useEffect } from 'react';
// import './app.css'

// function App() {
//   // State for user authentication
//   const [currentUser, setCurrentUser] = useState(null);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
  
//   // State for attendance tracking
//   const [isPunchedIn, setIsPunchedIn] = useState(false);
//   const [punchInTime, setPunchInTime] = useState(null);
//   const [workingHours, setWorkingHours] = useState(0);
//   const [workingSeconds, setWorkingSeconds] = useState('00:00:00');
  
//   // State for modals
//   const [activeModal, setActiveModal] = useState(null);
  
//   // State for forms
//   const [loginForm, setLoginForm] = useState({ email: '', password: '' });
//   const [leaveForm, setLeaveForm] = useState({ type: '', date: '', reason: '' });
  
//   // State for notifications
//   const [toast, setToast] = useState({ show: false, message: '' });

//   // Mock employee data
//   const employeeData = {
//     name: "Rajesh Kumar",
//     designation: "Senior Developer",
//     department: "IT",
//     employeeId: "ACORE001",
//     email: "rajesh.kumar@acoreithub.com",
//     phone: "+91 98765 43210",
//     joiningDate: "15 Jan 2022",
//     salary: 75000
//   };

//   // Mock announcements data
//   const announcements = [
//     {
//       id: 1,
//       title: "🎉 Welcome to New Employee Portal!",
//       content: "We're excited to launch our new employee management system with enhanced features.",
//       date: "15 Dec 2024"
//     },
//     {
//       id: 2,
//       title: "💰 Salary Slips Available",
//       content: "Check your profile section to view and download salary slips.",
//       date: "10 Dec 2024"
//     },
//     {
//       id: 3,
//       title: "🏖 Holiday Calendar Updated",
//       content: "2024 holiday calendar has been updated. Check calendar section.",
//       date: "5 Dec 2024"
//     }
//   ];

//   // Mock birthdays data
//   const birthdays = [
//     { name: "Priya Sharma", department: "Design", date: "Today" },
//     { name: "Amit Patel", department: "Marketing", date: "Tomorrow" },
//     { name: "Neha Gupta", department: "HR", date: "20 Dec" }
//   ];

//   // Function to show toast notifications
//   const showToast = (message) => {
//     setToast({ show: true, message });
//     setTimeout(() => setToast({ show: false, message: '' }), 3000);
//   };

//   // Function to handle login
//   const handleLogin = (e) => {
//     e.preventDefault();
//     if (loginForm.email && loginForm.password) {
//       setCurrentUser(employeeData);
//       setIsLoggedIn(true);
//       showToast('Login successful! Welcome to Acore IT Hub');
//       setLoginForm({ email: '', password: '' });
//     } else {
//       showToast('Please enter email and password');
//     }
//   };

//   // Function to handle logout
//   const handleLogout = () => {
//     if (isPunchedIn) {
//       showToast('Please punch out before logging out');
//       return;
//     }
//     setCurrentUser(null);
//     setIsLoggedIn(false);
//     showToast('Logged out successfully');
//   };

//   // Function to handle punch in/out
//   const handlePunch = () => {
//     if (!isPunchedIn) {
//       setIsPunchedIn(true);
//       setPunchInTime(new Date());
//       showToast('Punched in successfully! Have a productive day.');
//     } else {
//       if (workingHours < 7) {
//         showToast(`Complete ${(7 - workingHours).toFixed(1)} more hours before punching out`);
//         return;
//       }
//       setIsPunchedIn(false);
//       setPunchInTime(null);
//       setWorkingHours(0);
//       setWorkingSeconds('00:00:00');
//       showToast('Punched out successfully! See you tomorrow.');
//     }
//   };

//   // Function to handle leave application
//   const handleLeaveSubmit = (e) => {
//     e.preventDefault();
//     if (leaveForm.type && leaveForm.date && leaveForm.reason) {
//       showToast('Leave application submitted successfully!');
//       setLeaveForm({ type: '', date: '', reason: '' });
//       setActiveModal(null);
//     } else {
//       showToast('Please fill all leave details');
//     }
//   };

//   // Effect for tracking working hours
//   useEffect(() => {
//     let interval;
//     if (isPunchedIn && punchInTime) {
//       interval = setInterval(() => {
//         const now = new Date();
//         const diff = now - punchInTime;
//         const hours = diff / (1000 * 60 * 60);
//         setWorkingHours(hours);
        
//         // Format time as HH:MM:SS
//         const totalSeconds = Math.floor(diff / 1000);
//         const hoursFormatted = Math.floor(totalSeconds / 3600);
//         const minutesFormatted = Math.floor((totalSeconds % 3600) / 60);
//         const secondsFormatted = totalSeconds % 60;
        
//         setWorkingSeconds(
//           `${String(hoursFormatted).padStart(2, '0')}:${String(minutesFormatted).padStart(2, '0')}:${String(secondsFormatted).padStart(2, '0')}`
//         );
//       }, 1000);
//     }
    
//     return () => {
//       if (interval) clearInterval(interval);
//     };
//   }, [isPunchedIn, punchInTime]);

//   // Function to open modals
//   const openModal = (modalName) => {
//     setActiveModal(modalName);
//   };

//   // Function to close modals
//   const closeModal = () => {
//     setActiveModal(null);
//   };

//   // Render login page if not logged in
//   if (!isLoggedIn) {
//     return (
//       <div className="login-container">
//         <div className="login-box">
//           <div className="login-logo">
//             <span>🏢</span>
//           </div>
//           <h2>Acore IT Hub</h2>
//           <p>Employee Management Portal</p>
          
//           <form onSubmit={handleLogin} className="login-form">
//             <div className="input-group">
//               <label>Company Email</label>
//               <input 
//                 type="email" 
//                 placeholder="employee@acoreithub.com"
//                 value={loginForm.email}
//                 onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
//                 required
//               />
//             </div>
            
//             <div className="input-group">
//               <label>Password</label>
//               <input 
//                 type="password" 
//                 placeholder="Enter your password"
//                 value={loginForm.password}
//                 onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
//                 required
//               />
//             </div>
            
//             <button type="submit" className="login-btn">
//               Login to Portal
//             </button>
//           </form>
//         </div>

//         {/* Toast Notification */}
//         {toast.show && (
//           <div className="toast show">
//             <span>✅</span>
//             {toast.message}
//           </div>
//         )}
//       </div>
//     );
//   }

//   // Main dashboard after login
//   return (
//     <div className="container">
//       {/* Header Section */}
//       <header className="header">
//         <div className="header-left">
//           <div className="logo">
//             <span>🏢</span>
//           </div>
//           <div className="company-info">
//             <h1>Acore IT Hub</h1>
//             <p>Employee Management Portal</p>
//           </div>
//         </div>
        
//         <div className="header-right">
//           <button 
//             className="profile-btn"
//             onClick={() => openModal('profile')}
//           >
//             <span>👤</span>
//             My Profile
//           </button>
          
//           <div className="user-info">
//             <div className="user-avatar">
//               {currentUser?.name?.charAt(0)}
//             </div>
//             <div className="user-details">
//               <h3>{currentUser?.name}</h3>
//               <p>{currentUser?.designation}</p>
//             </div>
//             <button className="logout-btn" onClick={handleLogout}>
//               Logout
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Announcements Slider */}
//       <section className="announcements">
//         <div className="section-header">
//           <h2>📢 Announcements</h2>
//         </div>
//         <div className="announcements-slider">
//           {announcements.map(announcement => (
//             <div key={announcement.id} className="announcement-card">
//               <h3>{announcement.title}</h3>
//               <p>{announcement.content}</p>
//               <span className="announcement-date">{announcement.date}</span>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Dashboard Cards Grid */}
//       <section className="dashboard-grid">
//         {/* Attendance Card */}
//         <div className="dashboard-card" onClick={() => openModal('attendance')}>
//           <div className="card-icon attendance">⏰</div>
//           <h3>Attendance</h3>
//           <p>Punch in/out and track your daily attendance</p>
//           {isPunchedIn && <span className="status-badge active">Active</span>}
//         </div>

//         {/* Leave Management Card */}
//         <div className="dashboard-card" onClick={() => openModal('leave')}>
//           <div className="card-icon leave">🏖</div>
//           <h3>Leave Management</h3>
//           <p>Apply for leaves and track your leave balance</p>
//         </div>

//         {/* Birthdays Card */}
//         <div className="dashboard-card" onClick={() => openModal('birthdays')}>
//           <div className="card-icon birthday">🎂</div>
//           <h3>Birthdays</h3>
//           <p>Check upcoming birthdays of colleagues</p>
//         </div>

//         {/* Calendar Card */}
//         <div className="dashboard-card" onClick={() => openModal('calendar')}>
//           <div className="card-icon calendar">📅</div>
//           <h3>Holiday Calendar</h3>
//           <p>View all official holidays</p>
//         </div>

//         {/* GitHub Card */}
//         <div className="dashboard-card" onClick={() => openModal('github')}>
//           <div className="card-icon github">💻</div>
//           <h3>GitHub Integration</h3>
//           <p>Push code commits and track work</p>
//         </div>

//         {/* Salary Card */}
//         <div className="dashboard-card" onClick={() => openModal('salary')}>
//           <div className="card-icon salary">💰</div>
//           <h3>Salary Slips</h3>
//           <p>View and download your salary slips</p>
//         </div>
//       </section>

//       {/* MODALS */}

//       {/* Attendance Modal */}
//       {activeModal === 'attendance' && (
//         <div className="modal-overlay" onClick={closeModal}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <div className="modal-header">
//               <h2>⏰ Attendance Tracker</h2>
//               <button className="close-btn" onClick={closeModal}>✕</button>
//             </div>
            
//             <div className={`attendance-status ${isPunchedIn ? 'working' : ''}`}>
//               <h3>Today's Status: <span>{isPunchedIn ? 'Punched In' : 'Not Punched In'}</span></h3>
//               <div className="working-time">{workingSeconds}</div>
//               <p>Working Hours Today</p>
              
//               {isPunchedIn && (
//                 <div className="progress-info">
//                   <span>⏱</span>
//                   {workingHours < 7 ? (
//                     <span>Complete {(7 - workingHours).toFixed(2)}h more to punch out</span>
//                   ) : (
//                     <span>Ready to punch out!</span>
//                   )}
//                 </div>
//               )}
              
//               <button 
//                 className={`punch-btn ${isPunchedIn ? 'punch-out' : 'punch-in'}`}
//                 onClick={handlePunch}
//               >
//                 {isPunchedIn ? '🔴 Punch Out' : '🟢 Punch In'}
//               </button>
              
//               <div className="location-info">
//                 <span>📍</span>
//                 Location tracking enabled
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Leave Management Modal */}
//       {activeModal === 'leave' && (
//         <div className="modal-overlay" onClick={closeModal}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <div className="modal-header">
//               <h2>🏖 Leave Management</h2>
//               <button className="close-btn" onClick={closeModal}>✕</button>
//             </div>
            
//             <div className="leave-balance">
//               <div className="balance-card">
//                 <div className="balance-count">12</div>
//                 <div className="balance-label">Casual Leave</div>
//               </div>
//               <div className="balance-card">
//                 <div className="balance-count">7</div>
//                 <div className="balance-label">Sick Leave</div>
//               </div>
//               <div className="balance-card">
//                 <div className="balance-count">1</div>
//                 <div className="balance-label">Birthday Leave</div>
//               </div>
//             </div>
            
//             <form onSubmit={handleLeaveSubmit} className="leave-form">
//               <div className="form-group">
//                 <label>Leave Type</label>
//                 <select 
//                   value={leaveForm.type}
//                   onChange={(e) => setLeaveForm({...leaveForm, type: e.target.value})}
//                   required
//                 >
//                   <option value="">Select Leave Type</option>
//                   <option value="CL">Casual Leave</option>
//                   <option value="SL">Sick Leave</option>
//                   <option value="BL">Birthday Leave</option>
//                 </select>
//               </div>
              
//               <div className="form-group">
//                 <label>Leave Date</label>
//                 <input 
//                   type="date" 
//                   value={leaveForm.date}
//                   onChange={(e) => setLeaveForm({...leaveForm, date: e.target.value})}
//                   required
//                 />
//               </div>
              
//               <div className="form-group">
//                 <label>Reason</label>
//                 <textarea 
//                   placeholder="Enter reason for leave..."
//                   value={leaveForm.reason}
//                   onChange={(e) => setLeaveForm({...leaveForm, reason: e.target.value})}
//                   required
//                 ></textarea>
//               </div>
              
//               <button type="submit" className="submit-btn">
//                 Submit Leave Application
//               </button>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Profile Modal */}
//       {activeModal === 'profile' && (
//         <div className="modal-overlay" onClick={closeModal}>
//           <div className="modal-content profile-modal" onClick={(e) => e.stopPropagation()}>
//             <div className="modal-header">
//               <h2>👤 Employee Profile</h2>
//               <button className="close-btn" onClick={closeModal}>✕</button>
//             </div>
            
//             <div className="profile-header">
//               <div className="profile-avatar">
//                 {currentUser?.name?.charAt(0)}
//               </div>
//               <h3>{currentUser?.name}</h3>
//               <p>{currentUser?.designation}</p>
//             </div>
            
//             <div className="profile-details">
//               <div className="detail-item">
//                 <span className="detail-label">Employee ID</span>
//                 <span className="detail-value">{currentUser?.employeeId}</span>
//               </div>
//               <div className="detail-item">
//                 <span className="detail-label">Department</span>
//                 <span className="detail-value">{currentUser?.department}</span>
//               </div>
//               <div className="detail-item">
//                 <span className="detail-label">Email</span>
//                 <span className="detail-value">{currentUser?.email}</span>
//               </div>
//               <div className="detail-item">
//                 <span className="detail-label">Phone</span>
//                 <span className="detail-value">{currentUser?.phone}</span>
//               </div>
//               <div className="detail-item">
//                 <span className="detail-label">Joining Date</span>
//                 <span className="detail-value">{currentUser?.joiningDate}</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Birthdays Modal */}
//       {activeModal === 'birthdays' && (
//         <div className="modal-overlay" onClick={closeModal}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <div className="modal-header">
//               <h2>🎂 Upcoming Birthdays</h2>
//               <button className="close-btn" onClick={closeModal}>✕</button>
//             </div>
            
//             <div className="birthdays-list">
//               {birthdays.map((person, index) => (
//                 <div key={index} className="birthday-item">
//                   <div className="birthday-avatar">
//                     {person.name.charAt(0)}
//                   </div>
//                   <div className="birthday-info">
//                     <h4>{person.name}</h4>
//                     <p>{person.department} • {person.date}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Toast Notification */}
//       {toast.show && (
//         <div className="toast show">
//           <span>✅</span>
//           {toast.message}
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;



// import React, { useState } from 'react';
// import { useAuth } from './hooks/useAuth';
// import { useAttendance } from './hooks/useAttendance';
// import { useToast } from './hooks/useToast';

// // Components
// import Login from './components/auth/Login';
// import Header from './components/common/Header';
// import Toast from './components/common/Toast';
// import AnnouncementSlider from './components/dashboard/AnnouncementSlider';
// import DashboardGrid from './components/dashboard/DashboardGrid';

// // Modals
// import AttendanceModal from './components/modals/AttendanceModal';
// import LeaveModal from './components/modals/LeaveModal';
// import BirthdayModal from './components/modals/BirthdayModal';
// import ProfileModal from './components/modals/ProfileModal';
// import CalendarModal from './components/modals/CalendarModal';
// import GithubModal from './components/modals/GithubModal';

// import './App.css';

// function App() {
//   // Authentication
//   const { currentUser, loading: authLoading, login, logout } = useAuth();
  
//   // Attendance
//   const attendance = useAttendance();
  
//   // Toast Notifications
//   const { toast, showToast, hideToast } = useToast();
  
//   // Modal State
//   const [activeModal, setActiveModal] = useState(null);
//   const [leaveLoading, setLeaveLoading] = useState(false);
//   const [githubLoading, setGithubLoading] = useState(false);

//   // Handle Login
//   const handleLogin = async (email, password) => {
//     try {
//       await login(email, password);
//       showToast('✅ Login successful! Welcome to Acore IT Hub', 'success');
//     } catch (error) {
//       showToast('❌ Login failed. Please check your credentials.', 'error');
//     }
//   };

//   // Handle Logout
//   const handleLogout = () => {
//     if (attendance.isPunchedIn) {
//       showToast('⛔ Please punch out before logging out', 'warning');
//       return;
//     }
//     logout();
//     showToast('👋 Logged out successfully!', 'success');
//   };

//   // Handle Punch In/Out
//   const handlePunch = async () => {
//     const result = await attendance.handlePunch();
    
//     if (result.success) {
//       if (result.action === 'in') {
//         showToast('✅ Punched in successfully! Have a productive day.', 'success');
//       } else {
//         showToast('✅ Punched out successfully! See you tomorrow.', 'success');
//         closeModal();
//       }
//     } else {
//       showToast(result.error, 'warning');
//     }
//   };

//   // Handle Leave Application
//   const handleLeaveSubmit = async (formData) => {
//     setLeaveLoading(true);
    
//     try {
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 2000));
//       showToast('✅ Leave application submitted successfully!', 'success');
//       setActiveModal(null);
//     } catch (error) {
//       showToast('❌ Failed to submit leave application', 'error');
//     } finally {
//       setLeaveLoading(false);
//     }
//   };

//   // Handle GitHub Push
//   const handleGithubPush = async (formData) => {
//     setGithubLoading(true);
    
//     try {
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 2000));
//       showToast('✅ Code pushed to GitHub successfully!', 'success');
//     } catch (error) {
//       showToast('❌ Failed to push code to GitHub', 'error');
//     } finally {
//       setGithubLoading(false);
//     }
//   };

//   // Open Modal
//   const openModal = (modalName) => {
//     setActiveModal(modalName);
//   };

//   // Close Modal
//   const closeModal = () => {
//     setActiveModal(null);
//   };

//   // Render Login Page if not authenticated
//   if (!currentUser) {
//     return (
//       <>
//         <Login onLogin={handleLogin} loading={authLoading} />
//         <Toast toast={toast} onClose={hideToast} />
//       </>
//     );
//   }

//   // Main Dashboard
//   return (
//     <div className="app">
//       <div className="app-container">
//         <Header
//           currentUser={currentUser}
//           onProfileClick={() => openModal('profile')}
//           onLogout={handleLogout}
//           onAttendanceClick={() => openModal('attendance')}
//         />

//         <AnnouncementSlider />
        
//         <DashboardGrid
//           onCardClick={openModal}
//           attendanceStatus={attendance}
//         />

//         {/* Modals */}
//         <AttendanceModal
//           isOpen={activeModal === 'attendance'}
//           onClose={closeModal}
//           attendance={attendance}
//           onPunch={handlePunch}
//         />

//         <LeaveModal
//           isOpen={activeModal === 'leave'}
//           onClose={closeModal}
//           onLeaveSubmit={handleLeaveSubmit}
//           loading={leaveLoading}
//         />

//         <BirthdayModal
//           isOpen={activeModal === 'birthday'}
//           onClose={closeModal}
//         />

//         <ProfileModal
//           isOpen={activeModal === 'profile'}
//           onClose={closeModal}
//           currentUser={currentUser}
//         />

//         <CalendarModal
//           isOpen={activeModal === 'calendar'}
//           onClose={closeModal}
//         />

//         <GithubModal
//           isOpen={activeModal === 'github'}
//           onClose={closeModal}
//           onPushCode={handleGithubPush}
//           loading={githubLoading}
//         />

//         <Toast toast={toast} onClose={hideToast} />
//       </div>
//     </div>
//   );
// }

// export default App;












import React, { useState, useEffect } from 'react';
import { useAuth } from './hooks/useAuth';
import { useAttendance } from './hooks/useAttendance';
import { useToast } from './hooks/useToast';

// Components
import Login from './components/auth/Login';
import Header from './components/common/Header';
import Toast from './components/common/Toast';
import AnnouncementSlider from './components/dashboard/AnnouncementSlider';
import DashboardGrid from './components/dashboard/DashboardGrid';

// Modals
import AttendanceModal from './components/modals/AttendanceModal';
import LeaveModal from './components/modals/LeaveModal';
import BirthdayModal from './components/modals/BirthdayModal';
import ProfileModal from './components/modals/ProfileModal';
import CalendarModal from './components/modals/CalendarModal';
import GithubModal from './components/modals/GithubModal';

import './App.css';

function App() {
  // Authentication
  const { currentUser, loading: authLoading, login, logout } = useAuth();
  
  // Attendance
  const attendance = useAttendance();
  
  // Toast Notifications
  const { toast, showToast, hideToast } = useToast();
  
  // Modal State
  const [activeModal, setActiveModal] = useState(null);
  const [leaveLoading, setLeaveLoading] = useState(false);
  const [githubLoading, setGithubLoading] = useState(false);

  // Auto close modal when user logs out
  useEffect(() => {
    if (!currentUser) {
      setActiveModal(null);
    }
  }, [currentUser]);

  // Handle Login
  const handleLogin = async (email, password) => {
    try {
      if (!email || !password) {
        showToast('❌ Please enter both email and password', 'error');
        return;
      }

      await login(email, password);
      showToast('✅ Login successful! Welcome to Acore IT Hub', 'success');
    } catch (error) {
      showToast('❌ Login failed. Please check your credentials.', 'error');
    }
  };

  // Handle Logout
  const handleLogout = () => {
    if (attendance.isPunchedIn) {
      showToast('⛔ Please punch out before logging out', 'warning');
      return;
    }
    
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
      showToast('👋 Logged out successfully!', 'success');
    }
  };

  // Handle Punch In/Out
  const handlePunch = async () => {
    try {
      const result = await attendance.handlePunch();
      
      if (result.success) {
        if (result.action === 'in') {
          showToast('✅ Punched in successfully! Have a productive day.', 'success');
        } else {
          showToast('✅ Punched out successfully! See you tomorrow.', 'success');
          closeModal();
        }
      } else {
        showToast(result.error, 'warning');
      }
    } catch (error) {
      showToast('❌ Error processing attendance', 'error');
    }
  };

  // Handle Leave Application
  const handleLeaveSubmit = async (formData) => {
    setLeaveLoading(true);
    
    try {
      // Validate form data
      if (!formData.type || !formData.startDate || !formData.endDate || !formData.reason) {
        showToast('❌ Please fill all required fields', 'error');
        return;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      showToast('✅ Leave application submitted successfully!', 'success');
      setActiveModal(null);
    } catch (error) {
      showToast('❌ Failed to submit leave application', 'error');
    } finally {
      setLeaveLoading(false);
    }
  };

  // Handle GitHub Push
  const handleGithubPush = async (formData) => {
    setGithubLoading(true);
    
    try {
      // Validate form data
      if (!formData.repository || !formData.commitMessage) {
        showToast('❌ Please fill all required fields', 'error');
        return;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      showToast('✅ Code pushed to GitHub successfully!', 'success');
    } catch (error) {
      showToast('❌ Failed to push code to GitHub', 'error');
    } finally {
      setGithubLoading(false);
    }
  };

  // Open Modal
  const openModal = (modalName) => {
    setActiveModal(modalName);
  };

  // Close Modal
  const closeModal = () => {
    setActiveModal(null);
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activeModal]);

  // Render Login Page if not authenticated
  if (!currentUser) {
    return (
      <>
        <Login onLogin={handleLogin} loading={authLoading} />
        <Toast toast={toast} onClose={hideToast} />
      </>
    );
  }

  // Main Dashboard
  return (
    <div className="app">
      <div className="app-container">
        <Header
          currentUser={currentUser}
          onProfileClick={() => openModal('profile')}
          onLogout={handleLogout}
          onAttendanceClick={() => openModal('attendance')}
        />

        <AnnouncementSlider />
        
        <DashboardGrid
          onCardClick={openModal}
          attendanceStatus={attendance}
        />

        {/* Modals */}
        <AttendanceModal
          isOpen={activeModal === 'attendance'}
          onClose={closeModal}
          attendance={attendance}
          onPunch={handlePunch}
        />

        <LeaveModal
          isOpen={activeModal === 'leave'}
          onClose={closeModal}
          onLeaveSubmit={handleLeaveSubmit}
          loading={leaveLoading}
        />

        <BirthdayModal
          isOpen={activeModal === 'birthday'}
          onClose={closeModal}
        />

        <ProfileModal
          isOpen={activeModal === 'profile'}
          onClose={closeModal}
          currentUser={currentUser}
        />

        <CalendarModal
          isOpen={activeModal === 'calendar'}
          onClose={closeModal}
        />

        <GithubModal
          isOpen={activeModal === 'github'}
          onClose={closeModal}
          onPushCode={handleGithubPush}
          loading={githubLoading}
        />

        <Toast toast={toast} onClose={hideToast} />
      </div>
    </div>
  );
}

export default App;