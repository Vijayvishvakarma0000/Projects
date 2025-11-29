// // import React, { useState, useEffect } from "react";
// // import Login from "./pages/Login";
// // import Dashboard from "./pages/Dashboard";
// // import { setAuthToken } from "./services/api";

// // export default function App() {
// //   const [token, setToken] = useState(localStorage.getItem("token"));
// //   useEffect(() => {
// //     setAuthToken(token);
// //     if (token) localStorage.setItem("token", token);
// //     else localStorage.removeItem("token");
// //   }, [token]);

// //   if (!token) return <Login onAuth={(t) => setToken(t)} />;
// //   return <Dashboard onLogout={() => setToken(null)} />;
// // }


// import React, { useState, useEffect, useRef } from 'react';
// import './App.css';

// const App = () => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [isPunchedIn, setIsPunchedIn] = useState(false);
//   const [punchInTime, setPunchInTime] = useState(null);
//   const [workingHours, setWorkingHours] = useState('00:00:00');
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [activeModal, setActiveModal] = useState(null);
//   const [currentMonthIndex, setCurrentMonthIndex] = useState(11);
//   const [currentYear, setCurrentYear] = useState(2024);
//   const [toast, setToast] = useState({ show: false, message: '' });
//   const [loginLoading, setLoginLoading] = useState(false);
//   const [punchLoading, setPunchLoading] = useState(false);
//   const [leaveLoading, setLeaveLoading] = useState(false);
//   const [githubLoading, setGithubLoading] = useState(false);
//   const [resignationLoading, setResignationLoading] = useState(false);

//   const workHoursInterval = useRef(null);
//   const slideInterval = useRef(null);

//   const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

//   const salaryData = {
//     basicSalary: 45000,
//     hra: 18000,
//     da: 4500,
//     transport: 2500,
//     special: 5000,
//     pf: 5400,
//     professionalTax: 200,
//     incomeTax: 2500,
//     esi: 400
//   };

//   const announcements = [
//     {
//       title: "🎉 Welcome to New Employee Portal!",
//       content: "We're excited to launch our new employee management system with enhanced features including attendance tracking, leave management, and salary slip management.",
//       date: "📅 Posted on: December 2024"
//     },
//     {
//       title: "💰 Salary Slips Now Available!",
//       content: "Check your profile section to view detailed salary breakdowns, earnings, deductions, and download your monthly salary slips.",
//       date: "📅 Posted on: December 2024"
//     },
//     {
//       title: "🏖 Holiday Calendar Updated",
//       content: "The holiday calendar for 2024 has been updated. Please check the calendar section for all upcoming holidays.",
//       date: "📅 Posted on: December 2024"
//     }
//   ];

//   const birthdayList = [
//     {
//       name: "Rajesh Kumar",
//       avatar: "RK",
//       type: "birthday",
//       details: "💼 Software Developer • 📅 Joined: Jan 2020 • 🎂 Age: 28",
//       today: true
//     },
//     {
//       name: "Priya Sharma",
//       avatar: "PS",
//       type: "birthday",
//       details: "🎨 UI/UX Designer • 📅 Joined: Mar 2021 • 🎂 Age: 26",
//       today: false
//     },
//     {
//       name: "Amit Patel",
//       avatar: "AP",
//       type: "anniversary",
//       details: "👨‍💼 Project Manager • 📅 Joined: Dec 2021 • 🎉 Completing 3 years!",
//       today: false
//     }
//   ];

//   useEffect(() => {
//     startAnnouncementSlider();
//     return () => {
//       if (slideInterval.current) clearInterval(slideInterval.current);
//       if (workHoursInterval.current) clearInterval(workHoursInterval.current);
//     };
//   }, []);

//   useEffect(() => {
//     if (isPunchedIn && punchInTime) {
//       startWorkHoursCounter();
//     }
//   }, [isPunchedIn, punchInTime]);

//   const startAnnouncementSlider = () => {
//     slideInterval.current = setInterval(() => {
//       setCurrentSlide(prev => (prev + 1) % announcements.length);
//     }, 5000);
//   };

//   const goToSlide = (index) => {
//     setCurrentSlide(index);
//     if (slideInterval.current) {
//       clearInterval(slideInterval.current);
//     }
//     slideInterval.current = setInterval(() => {
//       setCurrentSlide(prev => (prev + 1) % announcements.length);
//     }, 5000);
//   };

//   const startWorkHoursCounter = () => {
//     workHoursInterval.current = setInterval(() => {
//       if (punchInTime) {
//         const elapsed = Date.now() - punchInTime;
//         const hours = Math.floor(elapsed / (1000 * 60 * 60));
//         const minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
//         const seconds = Math.floor((elapsed % (1000 * 60)) / 1000);
//         setWorkingHours(
//           `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
//         );
//       }
//     }, 1000);
//   };

//   const showToast = (message) => {
//     setToast({ show: true, message });
//     setTimeout(() => setToast({ show: false, message: '' }), 3000);
//   };

//   const handleLogin = (e) => {
//     e.preventDefault();
//     setLoginLoading(true);
    
//     setTimeout(() => {
//       setCurrentUser({
//         name: 'Admin User',
//         designation: 'Software Developer',
//         empId: 'EMP001',
//         department: 'Engineering',
//         email: 'admin@acoreithub.com',
//         mobile: '+91 98765 43210',
//         joinDate: '01 Jan 2022',
//         anniversary: '2 years 11 months',
//         birthday: '15 March',
//         gender: 'Male',
//         address: 'Delhi, India',
//         empType: 'Full Time'
//       });
//       setLoginLoading(false);
//       showToast('✅ Login successful!');
//     }, 1000);
//   };

//   const handleLogout = () => {
//     if (isPunchedIn) {
//       const workHours = (Date.now() - punchInTime) / (1000 * 60 * 60);
//       if (workHours < 7) {
//         const hours = Math.floor(7 - workHours);
//         const minutes = Math.floor(((7 - workHours) - hours) * 60);
//         showToast(`⛔ Cannot logout! Complete ${hours}h ${minutes}m more work time.`);
//         return;
//       }
//     }
    
//     setCurrentUser(null);
//     setIsPunchedIn(false);
//     setPunchInTime(null);
//     if (workHoursInterval.current) {
//       clearInterval(workHoursInterval.current);
//     }
//     showToast('👋 Logged out successfully!');
//   };

//   const handlePunch = async () => {
//     setPunchLoading(true);
    
//     if (!isPunchedIn) {
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition((position) => {
//           setIsPunchedIn(true);
//           setPunchInTime(Date.now());
//           showToast('✅ Punched in successfully!');
//           setPunchLoading(false);
//         }, (error) => {
//           showToast('❌ Could not get location');
//           setPunchLoading(false);
//         });
//       }
//     } else {
//       const workHours = (Date.now() - punchInTime) / (1000 * 60 * 60);
      
//       if (workHours >= 7) {
//         setIsPunchedIn(false);
//         setPunchInTime(null);
//         if (workHoursInterval.current) clearInterval(workHoursInterval.current);
//         setWorkingHours('00:00:00');
//         showToast('✅ Punched out successfully! You can now logout.');
//       } else {
//         const remainingTime = 7 - workHours;
//         const hours = Math.floor(remainingTime);
//         const minutes = Math.floor((remainingTime - hours) * 60);
//         showToast(`⚠ You need ${hours}h ${minutes}m more to complete 7 hours!`);
//       }
//       setPunchLoading(false);
//     }
//   };

//   const handleLeaveApplication = async (e) => {
//     e.preventDefault();
//     setLeaveLoading(true);
    
//     setTimeout(() => {
//       showToast('✅ Leave application submitted!');
//       e.target.reset();
//       setActiveModal(null);
//       setLeaveLoading(false);
//     }, 1000);
//   };

//   const handleGithubPush = async (e) => {
//     e.preventDefault();
//     setGithubLoading(true);
    
//     setTimeout(() => {
//       showToast('✅ Code pushed successfully!');
//       e.target.reset();
//       setGithubLoading(false);
//     }, 1000);
//   };

//   const handleResignation = async (e) => {
//     e.preventDefault();
//     setResignationLoading(true);
    
//     setTimeout(() => {
//       showToast('✅ Resignation request submitted successfully!');
//       e.target.reset();
//       setResignationLoading(false);
//       setTimeout(() => {
//         showToast('📧 HR will contact you within 24-48 hours.');
//       }, 2000);
//     }, 1000);
//   };

//   const changeMonth = (direction) => {
//     setCurrentMonthIndex(prev => {
//       let newIndex = prev + direction;
//       if (newIndex > 11) {
//         setCurrentYear(prevYear => prevYear + 1);
//         return 0;
//       } else if (newIndex < 0) {
//         setCurrentYear(prevYear => prevYear - 1);
//         return 11;
//       }
//       return newIndex;
//     });
    
//     showToast(`📅 Viewing ${months[currentMonthIndex]} ${currentYear} salary slip`);
//   };

//   const downloadSalarySlip = () => {
//     const month = months[currentMonthIndex];
//     const year = currentYear;
//     showToast(`📥 Downloading ${month} ${year} salary slip...`);
    
//     setTimeout(() => {
//       showToast(`✅ Salary slip for ${month} ${year} downloaded successfully!`);
//     }, 1500);
//   };

//   const openModal = (modalName) => {
//     setActiveModal(modalName);
//     document.body.style.overflow = 'hidden';
//   };

//   const closeModal = () => {
//     setActiveModal(null);
//     document.body.style.overflow = 'auto';
//   };

//   const grossSalary = salaryData.basicSalary + salaryData.hra + salaryData.da + salaryData.transport + salaryData.special;
//   const totalDeductions = salaryData.pf + salaryData.professionalTax + salaryData.incomeTax + salaryData.esi;
//   const netSalary = grossSalary - totalDeductions;

//   const userInitials = currentUser ? currentUser.name.split(' ').map(n => n.charAt(0)).join('') : 'A';

//   // Calendar generation
//   const generateCalendar = () => {
//     const today = new Date();
//     const month = today.getMonth();
//     const year = today.getFullYear();
//     const firstDay = new Date(year, month, 1).getDay();
//     const daysInMonth = new Date(year, month + 1, 0).getDate();
    
//     const calendarDays = [];
//     const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
//     dayHeaders.forEach(day => {
//       calendarDays.push(
//         <div key={`header-${day}`} className="calendar-day header">
//           {day}
//         </div>
//       );
//     });
    
//     for (let i = 0; i < firstDay; i++) {
//       calendarDays.push(<div key={`empty-${i}`} className="calendar-day"></div>);
//     }
    
//     for (let day = 1; day <= daysInMonth; day++) {
//       const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
//       const isHoliday = [1, 15, 26].includes(day);
      
//       calendarDays.push(
//         <div 
//           key={`day-${day}`} 
//           className={`calendar-day ${isToday ? 'today' : ''} ${isHoliday ? 'holiday' : ''}`}
//         >
//           {day}
//         </div>
//       );
//     }
    
//     return calendarDays;
//   };

//   return (
//     <div className="container">
//       {/* Login Page */}
//       {!currentUser ? (
//         <div className="login-container">
//           <div className="login-box">
//             <div className="login-logo">🏢</div>
//             <h2>Acore IT Hub Pvt Ltd</h2>
//             <p>Welcome to Employee Portal</p>
//             <form onSubmit={handleLogin}>
//               <div className="input-group">
//                 <label htmlFor="email">Company Email</label>
//                 <input type="email" id="email" placeholder="employee@acoreithub.com" required />
//               </div>
//               <div className="input-group">
//                 <label htmlFor="password">Password</label>
//                 <input type="password" id="password" placeholder="Enter your password" required />
//               </div>
//               <button type="submit" className="login-btn" disabled={loginLoading}>
//                 {loginLoading ? 'Logging in...' : 'Login'}
//               </button>
//             </form>
//           </div>
//         </div>
//       ) : (
//         /* Main Dashboard */
//         <div id="mainDashboard">
//           {/* Header */}
//           <div className="header">
//             <div className="logo-section">
//               <div className="logo">🏢</div>
//               <div className="company-info">
//                 <h1>Acore IT Hub Pvt Ltd</h1>
//                 <p>Employee Management Portal</p>
//               </div>
//               <button className="profile-header-btn" onClick={() => openModal('profile')} title="View Profile">
//                 <span className="profile-icon">👤</span>
//                 <span className="profile-text">My Profile</span>
//               </button>
//             </div>
//             <div className="user-section">
//               <div className="user-avatar">{userInitials}</div>
//               <div className="user-info">
//                 <h3>{currentUser.name}</h3>
//                 <p>{currentUser.designation}</p>
//               </div>
//               <button className="logout-btn" onClick={handleLogout}>Logout</button>
//             </div>
//           </div>

//           {/* Announcement Slider */}
//           <div className="announcement-slider">
//             <div className="slider-header">
//               <h2>📢 Announcements</h2>
//             </div>
//             <div className="announcement-content">
//               {announcements.map((announcement, index) => (
//                 <div 
//                   key={index} 
//                   className={`announcement-slide ${index === currentSlide ? 'active' : ''}`}
//                 >
//                   <h3>{announcement.title}</h3>
//                   <p>{announcement.content}</p>
//                   <p className="date">{announcement.date}</p>
//                 </div>
//               ))}
//             </div>
//             <div className="slider-controls">
//               {announcements.map((_, index) => (
//                 <span 
//                   key={index} 
//                   className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
//                   onClick={() => goToSlide(index)}
//                 ></span>
//               ))}
//             </div>
//           </div>

//           {/* Dashboard Cards */}
//           <div className="dashboard-grid">
//             <div className="dashboard-card" onClick={() => openModal('attendance')}>
//               <div className="card-icon">⏰</div>
//               <h3 className="card-title">Attendance</h3>
//               <p className="card-description">Punch in/out and track your daily attendance with automatic location detection</p>
//               <span className="card-badge">Active</span>
//             </div>
//             <div className="dashboard-card" onClick={() => openModal('leave')}>
//               <div className="card-icon">🏖</div>
//               <h3 className="card-title">Leave Management</h3>
//               <p className="card-description">Apply for CL, SL, Birthday Leave and track your leave balance</p>
//             </div>
//             <div className="dashboard-card" onClick={() => openModal('birthday')}>
//               <div className="card-icon">🎂</div>
//               <h3 className="card-title">Birthdays</h3>
//               <p className="card-description">Check upcoming birthdays and work anniversaries of your colleagues</p>
//             </div>
//             <div className="dashboard-card" onClick={() => openModal('calendar')}>
//               <div className="card-icon">📅</div>
//               <h3 className="card-title">Holiday Calendar</h3>
//               <p className="card-description">View all official holidays and plan your time off accordingly</p>
//             </div>
//             <div className="dashboard-card" onClick={() => openModal('github')}>
//               <div className="card-icon">💻</div>
//               <h3 className="card-title">GitHub Integration</h3>
//               <p className="card-description">Push your code commits and track your development work</p>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Modals */}
//       {/* Attendance Modal */}
//       {activeModal === 'attendance' && (
//         <div className="modal active">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h2>⏰ Attendance Tracker</h2>
//               <button className="close-modal" onClick={closeModal}>✕</button>
//             </div>
//             <div className={`attendance-status ${isPunchedIn ? 'working' : ''}`}>
//               <h3>Today's Status: <span>{isPunchedIn ? 'Punched In - Working' : 'Not Punched In'}</span></h3>
//               <div className="attendance-time">{workingHours}</div>
//               <p>Working Hours Today</p>
//               {isPunchedIn && (
//                 <div className="work-progress-info">
//                   <span>⏱</span>
//                   <span>In progress (7 hours required)</span>
//                 </div>
//               )}
//               <button 
//                 className="punch-btn" 
//                 onClick={handlePunch}
//                 disabled={punchLoading}
//               >
//                 {punchLoading ? 'Processing...' : (
//                   isPunchedIn ? '🔴 Punch Out (7hrs required)' : '🟢 Punch In'
//                 )}
//               </button>
//               <div className="location-info">
//                 <span>📍</span>
//                 <span>Location will be detected automatically</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Leave Modal */}
//       {activeModal === 'leave' && (
//         <div className="modal active">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h2>🏖 Leave Management</h2>
//               <button className="close-modal" onClick={closeModal}>✕</button>
//             </div>
//             <div className="leave-types">
//               <div className="leave-type-card">
//                 <div className="leave-count">12</div>
//                 <div className="leave-label">Casual Leave</div>
//               </div>
//               <div className="leave-type-card">
//                 <div className="leave-count">7</div>
//                 <div className="leave-label">Sick Leave</div>
//               </div>
//               <div className="leave-type-card">
//                 <div className="leave-count">1</div>
//                 <div className="leave-label">Birthday Leave</div>
//               </div>
//             </div>
//             <form className="leave-form" onSubmit={handleLeaveApplication}>
//               <div className="form-group">
//                 <label htmlFor="leaveType">Leave Type</label>
//                 <select id="leaveType" required>
//                   <option value="">Select Leave Type</option>
//                   <option value="CL">Casual Leave (CL)</option>
//                   <option value="SL">Sick Leave (SL)</option>
//                   <option value="BL">Birthday Leave (BL)</option>
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label htmlFor="leaveDate">Leave Date</label>
//                 <input type="date" id="leaveDate" required />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="leaveReason">Reason</label>
//                 <textarea id="leaveReason" placeholder="Enter reason for leave..." required></textarea>
//               </div>
//               <button type="submit" className="submit-btn" disabled={leaveLoading}>
//                 {leaveLoading ? 'Submitting...' : 'Submit Leave Application'}
//               </button>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Birthday Modal */}
//       {activeModal === 'birthday' && (
//         <div className="modal active">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h2>🎂 Birthdays & Anniversaries</h2>
//               <button className="close-modal" onClick={closeModal}>✕</button>
//             </div>
//             <div className="birthday-list">
//               {birthdayList.map((person, index) => (
//                 <div key={index} className="birthday-item">
//                   <div className="employee-avatar">{person.avatar}</div>
//                   <div className="birthday-info">
//                     <h4>
//                       {person.today ? '🎉' : '🎂'} {person.name} - 
//                       {person.type === 'birthday' ? ' Birthday' : ' Work Anniversary'}
//                       {person.today ? ' Today!' : ' This Month'}
//                     </h4>
//                     <p>{person.details}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Profile Modal */}
//       {activeModal === 'profile' && (
//         <div className="modal active">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h2>👤 Employee Profile & Salary</h2>
//               <button className="close-modal" onClick={closeModal}>✕</button>
//             </div>
            
//             <div className="profile-header">
//               <div className="profile-picture">{userInitials}</div>
//               <h3>{currentUser.name}</h3>
//               <p>{currentUser.designation}</p>
//             </div>

//             {/* Salary Slip Section */}
//             <div className="salary-slip-section">
//               <div className="salary-header">
//                 <h3>💰 Salary Slip</h3>
//                 <button className="download-slip-btn" onClick={downloadSalarySlip}>
//                   <span>📥</span>
//                   <span>Download Slip</span>
//                 </button>
//               </div>
//               <div className="salary-month">
//                 <div className="salary-month-nav">
//                   <button className="month-btn" onClick={() => changeMonth(-1)} title="Previous Month">◀</button>
//                   <span className="current-month">{months[currentMonthIndex]} {currentYear}</span>
//                   <button className="month-btn" onClick={() => changeMonth(1)} title="Next Month">▶</button>
//                 </div>
//               </div>
//               <div className="salary-grid">
//                 <div className="salary-card earnings">
//                   <div className="salary-label">💵 Gross Salary</div>
//                   <div className="salary-value">₹{grossSalary.toLocaleString('en-IN')}</div>
//                 </div>
//                 <div className="salary-card deductions">
//                   <div className="salary-label">📉 Total Deductions</div>
//                   <div className="salary-value">₹{totalDeductions.toLocaleString('en-IN')}</div>
//                 </div>
//                 <div className="salary-card earnings">
//                   <div className="salary-label">💰 Net Salary</div>
//                   <div className="salary-value">₹{netSalary.toLocaleString('en-IN')}</div>
//                 </div>
//               </div>
              
//               <div className="salary-breakdown">
//                 <div className="breakdown-header">📊 Detailed Salary Breakdown</div>
//                 <div className="breakdown-content">
//                   <div className="breakdown-section">
//                     <div className="breakdown-title">💵 Earnings</div>
//                     <div className="breakdown-item">
//                       <span className="breakdown-label">Basic Salary</span>
//                       <span className="breakdown-amount positive">₹{salaryData.basicSalary.toLocaleString('en-IN')}</span>
//                     </div>
//                     <div className="breakdown-item">
//                       <span className="breakdown-label">House Rent Allowance (HRA)</span>
//                       <span className="breakdown-amount positive">₹{salaryData.hra.toLocaleString('en-IN')}</span>
//                     </div>
//                     <div className="breakdown-item">
//                       <span className="breakdown-label">Dearness Allowance (DA)</span>
//                       <span className="breakdown-amount positive">₹{salaryData.da.toLocaleString('en-IN')}</span>
//                     </div>
//                     <div className="breakdown-item">
//                       <span className="breakdown-label">Transport Allowance</span>
//                       <span className="breakdown-amount positive">₹{salaryData.transport.toLocaleString('en-IN')}</span>
//                     </div>
//                     <div className="breakdown-item">
//                       <span className="breakdown-label">Special Allowance</span>
//                       <span className="breakdown-amount positive">₹{salaryData.special.toLocaleString('en-IN')}</span>
//                     </div>
//                     <div className="breakdown-item" style={{ borderTop: '2px solid #e2e8f0', marginTop: '10px', paddingTop: '15px' }}>
//                       <span className="breakdown-label" style={{ fontWeight: '700', fontSize: '15px' }}>Total Earnings</span>
//                       <span className="breakdown-amount positive" style={{ fontSize: '18px', fontWeight: '700' }}>₹{grossSalary.toLocaleString('en-IN')}</span>
//                     </div>
//                   </div>
                  
//                   <div className="breakdown-section">
//                     <div className="breakdown-title">📉 Deductions</div>
//                     <div className="breakdown-item">
//                       <span className="breakdown-label">Provident Fund (PF)</span>
//                       <span className="breakdown-amount negative">₹{salaryData.pf.toLocaleString('en-IN')}</span>
//                     </div>
//                     <div className="breakdown-item">
//                       <span className="breakdown-label">Professional Tax</span>
//                       <span className="breakdown-amount negative">₹{salaryData.professionalTax.toLocaleString('en-IN')}</span>
//                     </div>
//                     <div className="breakdown-item">
//                       <span className="breakdown-label">Income Tax (TDS)</span>
//                       <span className="breakdown-amount negative">₹{salaryData.incomeTax.toLocaleString('en-IN')}</span>
//                     </div>
//                     <div className="breakdown-item">
//                       <span className="breakdown-label">Employee State Insurance (ESI)</span>
//                       <span className="breakdown-amount negative">₹{salaryData.esi.toLocaleString('en-IN')}</span>
//                     </div>
//                     <div className="breakdown-item" style={{ borderTop: '2px solid #e2e8f0', marginTop: '10px', paddingTop: '15px' }}>
//                       <span className="breakdown-label" style={{ fontWeight: '700', fontSize: '15px' }}>Total Deductions</span>
//                       <span className="breakdown-amount negative" style={{ fontSize: '18px', fontWeight: '700' }}>₹{totalDeductions.toLocaleString('en-IN')}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="net-salary-card">
//                 <div className="net-salary-label">💰 NET SALARY (Take Home)</div>
//                 <div className="net-salary-value">₹{netSalary.toLocaleString('en-IN')}</div>
//                 <div className="net-salary-note">Gross Salary ₹{grossSalary.toLocaleString('en-IN')} - Deductions ₹{totalDeductions.toLocaleString('en-IN')}</div>
//               </div>
//             </div>

//             {/* Resignation Section */}
//             <h3 style={{ margin: '30px 0 20px 0', color: '#1e293b', fontSize: '22px' }}>📝 Resignation Request</h3>
//             <div className="leave-form" style={{ background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)', border: '2px solid #ef4444' }}>
//               <p style={{ color: '#991b1b', marginBottom: '20px', fontWeight: '600', fontSize: '14px' }}>⚠ Please fill this form carefully if you wish to resign from your position.</p>
//               <form onSubmit={handleResignation}>
//                 <div className="form-group">
//                   <label htmlFor="resignationDate">Last Working Day</label>
//                   <input type="date" id="resignationDate" required />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="resignationReason">Reason for Resignation *</label>
//                   <select id="resignationReason" required>
//                     <option value="">Select reason...</option>
//                     <option value="Better Opportunity">Better Opportunity</option>
//                     <option value="Higher Studies">Higher Studies</option>
//                     <option value="Personal Reasons">Personal Reasons</option>
//                     <option value="Health Issues">Health Issues</option>
//                     <option value="Relocation">Relocation</option>
//                     <option value="Career Change">Career Change</option>
//                     <option value="Work-Life Balance">Work-Life Balance</option>
//                     <option value="Other">Other</option>
//                   </select>
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="resignationDetails">Additional Details</label>
//                   <textarea id="resignationDetails" placeholder="Please provide more details about your resignation..." required></textarea>
//                 </div>
//                 <button type="submit" className="submit-btn" style={{ background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' }} disabled={resignationLoading}>
//                   {resignationLoading ? 'Submitting...' : '📤 Submit Resignation Request'}
//                 </button>
//               </form>
//             </div>

//             {/* Employee Details */}
//             <h3 style={{ margin: '30px 0 20px 0', color: '#1e293b', fontSize: '22px' }}>📋 Personal Details</h3>
//             <div className="employee-details">
//               <div className="detail-item">
//                 <div className="detail-label">🆔 Employee ID</div>
//                 <div className="detail-value">{currentUser.empId}</div>
//               </div>
//               <div className="detail-item">
//                 <div className="detail-label">👤 Full Name</div>
//                 <div className="detail-value">{currentUser.name}</div>
//               </div>
//               <div className="detail-item">
//                 <div className="detail-label">💼 Designation</div>
//                 <div className="detail-value">{currentUser.designation}</div>
//               </div>
//               <div className="detail-item">
//                 <div className="detail-label">🏢 Department</div>
//                 <div className="detail-value">{currentUser.department}</div>
//               </div>
//               <div className="detail-item">
//                 <div className="detail-label">📧 Email</div>
//                 <div className="detail-value">{currentUser.email}</div>
//               </div>
//               <div className="detail-item">
//                 <div className="detail-label">📱 Mobile</div>
//                 <div className="detail-value">{currentUser.mobile}</div>
//               </div>
//               <div className="detail-item">
//                 <div className="detail-label">📅 Date of Joining</div>
//                 <div className="detail-value">{currentUser.joinDate}</div>
//               </div>
//               <div className="detail-item">
//                 <div className="detail-label">🎉 Work Anniversary</div>
//                 <div className="detail-value">{currentUser.anniversary}</div>
//               </div>
//               <div className="detail-item">
//                 <div className="detail-label">🎂 Birthday</div>
//                 <div className="detail-value">{currentUser.birthday}</div>
//               </div>
//               <div className="detail-item">
//                 <div className="detail-label">⚧ Gender</div>
//                 <div className="detail-value">{currentUser.gender}</div>
//               </div>
//               <div className="detail-item">
//                 <div className="detail-label">🏠 Address</div>
//                 <div className="detail-value">{currentUser.address}</div>
//               </div>
//               <div className="detail-item">
//                 <div className="detail-label">💰 Employee Type</div>
//                 <div className="detail-value">{currentUser.empType}</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Calendar Modal */}
//       {activeModal === 'calendar' && (
//         <div className="modal active">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h2>📅 Holiday Calendar 2024</h2>
//               <button className="close-modal" onClick={closeModal}>✕</button>
//             </div>
//             <div className="calendar-grid">
//               {generateCalendar()}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* GitHub Modal */}
//       {activeModal === 'github' && (
//         <div className="modal active">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h2>💻 GitHub Integration</h2>
//               <button className="close-modal" onClick={closeModal}>✕</button>
//             </div>
//             <div className="github-section">
//               <div className="github-header">
//                 <h3>📤 Push Code to Repository</h3>
//               </div>
//               <form onSubmit={handleGithubPush}>
//                 <div className="form-group">
//                   <label htmlFor="githubRepo" style={{ color: 'white' }}>Repository URL</label>
//                   <input type="text" className="github-input" id="githubRepo" placeholder="https://github.com/username/repo" required />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="commitMessage" style={{ color: 'white' }}>Commit Message</label>
//                   <input type="text" className="github-input" id="commitMessage" placeholder="Updated feature..." required />
//                 </div>
//                 <button type="submit" className="github-btn" disabled={githubLoading}>
//                   {githubLoading ? 'Pushing...' : '📤 Push Commit'}
//                 </button>
//               </form>
//               <div className="github-commits">
//                 <h4 style={{ color: 'white', marginBottom: '15px' }}>Recent Commits</h4>
//                 <div className="commit-item">
//                   <p style={{ color: 'white', marginBottom: '5px' }}>✅ Initial commit</p>
//                   <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}>Pushed 2 hours ago</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Toast Notification */}
//       {toast.show && (
//         <div className="toast active">
//           <span className="toast-icon">✅</span>
//           <span className="toast-message">{toast.message}</span>
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;


import React, { useState, useEffect, useRef } from "react";
import "./App.css";

/* ---------- small helpers & icons ---------- */
const pad = (n) => String(n).padStart(2, "0");

function IconGrid() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="7" height="7" rx="1" fill="#0ea5e9" />
      <rect x="14" y="3" width="7" height="7" rx="1" fill="#7dd3fc" />
      <rect x="3" y="14" width="7" height="7" rx="1" fill="#7dd3fc" />
      <rect x="14" y="14" width="7" height="7" rx="1" fill="#60a5fa" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M12 22c1.1 0 2-.9 2-2H10c0 1.1.9 2 2 2z" fill="#0ea5e9" />
      <path d="M18 16v-5c0-3.1-2-5.6-5-6V4a2 2 0 1 0-4 0v1c-3 0.4-5 2.9-5 6v5l-1 1v1h16v-1l-1-1z" fill="#60a5fa" />
    </svg>
  );
}

/* ---------- main component ---------- */
export default function App() {
  // Auth + user
  const [currentUser, setCurrentUser] = useState(null);
  const [loginLoading, setLoginLoading] = useState(false);

  // Attendance/punch
  const [isPunchedIn, setIsPunchedIn] = useState(false);
  const [punchInTime, setPunchInTime] = useState(null);
  const [workingHours, setWorkingHours] = useState("00:00:00");
  const workHoursInterval = useRef(null);

  // Announcements slider
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideInterval = useRef(null);

  // Modal + toast
  const [activeModal, setActiveModal] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "" });

  // month / salary
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const [currentMonthIndex, setCurrentMonthIndex] = useState((new Date()).getMonth());
  const [currentYear, setCurrentYear] = useState((new Date()).getFullYear());

  // small loading states
  const [punchLoading, setPunchLoading] = useState(false);
  const [leaveLoading, setLeaveLoading] = useState(false);
  const [githubLoading, setGithubLoading] = useState(false);
  const [resignationLoading, setResignationLoading] = useState(false);

  // salary + sample content
  const salaryData = {
    basicSalary: 45000,
    hra: 18000,
    da: 4500,
    transport: 2500,
    special: 5000,
    pf: 5400,
    professionalTax: 200,
    incomeTax: 2500,
    esi: 400,
  };

  const announcements = [
    {
      title: "🎉 Welcome to New Employee Portal!",
      content: "We're excited to launch our new employee management system with enhanced features including attendance tracking, leave management, and salary slip management.",
      date: "📅 Posted on: December 2024"
    },
    {
      title: "💰 Salary Slips Now Available!",
      content: "Check your profile section to view detailed salary breakdowns, earnings, deductions, and download your monthly salary slips.",
      date: "📅 Posted on: December 2024"
    },
    {
      title: "🏖 Holiday Calendar Updated",
      content: "The holiday calendar for 2024 has been updated. Please check the calendar section for all upcoming holidays.",
      date: "📅 Posted on: December 2024"
    }
  ];

  const birthdayList = [
    { name: "Rajesh Kumar", avatar: "RK", type: "birthday", details: "Software Developer • Joined: Jan 2020 • Age: 28", today: true },
    { name: "Priya Sharma", avatar: "PS", type: "birthday", details: "UI/UX Designer • Joined: Mar 2021 • Age: 26", today: false },
    { name: "Amit Patel", avatar: "AP", type: "anniversary", details: "Project Manager • Joined: Dec 2021 • Completing 3 years!", today: false }
  ];

  const grossSalary = salaryData.basicSalary + salaryData.hra + salaryData.da + salaryData.transport + salaryData.special;
  const totalDeductions = salaryData.pf + salaryData.professionalTax + salaryData.incomeTax + salaryData.esi;
  const netSalary = grossSalary - totalDeductions;

  /* ---------- effects ---------- */
  useEffect(() => {
    // start announcement slider autoplay
    slideInterval.current = setInterval(() => {
      setCurrentSlide((s) => (s + 1) % announcements.length);
    }, 5000);

    return () => {
      if (slideInterval.current) clearInterval(slideInterval.current);
      if (workHoursInterval.current) clearInterval(workHoursInterval.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isPunchedIn && punchInTime) {
      if (workHoursInterval.current) clearInterval(workHoursInterval.current);
      workHoursInterval.current = setInterval(() => updateWorkingHours(punchInTime), 1000);
    } else {
      if (workHoursInterval.current) {
        clearInterval(workHoursInterval.current);
        workHoursInterval.current = null;
      }
      setWorkingHours("00:00:00");
    }
  }, [isPunchedIn, punchInTime]);

  /* ---------- helpers ---------- */
  const updateWorkingHours = (startTs) => {
    const elapsed = Date.now() - startTs;
    const hours = Math.floor(elapsed / (1000 * 60 * 60));
    const minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((elapsed % (1000 * 60)) / 1000);
    setWorkingHours(`${pad(hours)}:${pad(minutes)}:${pad(seconds)}`);
  };

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 3000);
  };

  /* ---------- auth ---------- */
  const handleLogin = (e) => {
    e?.preventDefault();
    setLoginLoading(true);
    setTimeout(() => {
      setCurrentUser({
        name: "Ms. Savita Kavde",
        designation: "Software Developer",
        empId: "EMP001",
        department: "Engineering",
        email: "savita.kavde@acoreithub.com",
        mobile: "+91 8319223458",
        joinDate: "01 Aug 2025",
        anniversary: "3 months",
        birthday: "15 March",
        gender: "Female",
        address: "Pune, India",
        empType: "Full Time"
      });
      setLoginLoading(false);
      showToast("✅ Login successful!");
    }, 900);
  };

  const handleLogout = () => {
    if (isPunchedIn && punchInTime) {
      const worked = (Date.now() - punchInTime) / (1000 * 60 * 60);
      if (worked < 7) {
        const remaining = 7 - worked;
        const rh = Math.floor(remaining);
        const rm = Math.floor((remaining - rh) * 60);
        showToast(`⛔ Cannot logout. Complete ${rh}h ${rm}m more.`);
        return;
      }
    }

    setCurrentUser(null);
    setIsPunchedIn(false);
    setPunchInTime(null);
    if (workHoursInterval.current) {
      clearInterval(workHoursInterval.current);
      workHoursInterval.current = null;
    }
    showToast("👋 Logged out successfully!");
  };

  /* ---------- punch ---------- */
  const handlePunch = () => {
    setPunchLoading(true);
    setTimeout(() => {
      if (!isPunchedIn) {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              setIsPunchedIn(true);
              setPunchInTime(Date.now());
              showToast("✅ Punched in successfully!");
              setPunchLoading(false);
            },
            (err) => {
              setIsPunchedIn(true);
              setPunchInTime(Date.now());
              showToast("✅ Punched in (location unavailable)");
              setPunchLoading(false);
            },
            { timeout: 5000 }
          );
        } else {
          setIsPunchedIn(true);
          setPunchInTime(Date.now());
          showToast("✅ Punched in!");
          setPunchLoading(false);
        }
      } else {
        const worked = (Date.now() - punchInTime) / (1000 * 60 * 60);
        if (worked >= 7) {
          setIsPunchedIn(false);
          setPunchInTime(null);
          if (workHoursInterval.current) {
            clearInterval(workHoursInterval.current);
            workHoursInterval.current = null;
          }
          setWorkingHours("00:00:00");
          showToast("✅ Punched out successfully!");
        } else {
          const remaining = 7 - worked;
          const rh = Math.floor(remaining);
          const rm = Math.floor((remaining - rh) * 60);
          showToast(`⚠ You need ${rh}h ${rm}m more to complete 7 hours.`);
        }
        setPunchLoading(false);
      }
    }, 600);
  };

  /* ---------- slider ---------- */
  const goToSlide = (index) => {
    setCurrentSlide(index);
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
    }
    slideInterval.current = setInterval(() => setCurrentSlide((s) => (s + 1) % announcements.length), 5000);
  };

  /* ---------- forms ---------- */
  const handleLeaveApplication = (e) => {
    e.preventDefault();
    setLeaveLoading(true);
    setTimeout(() => {
      setLeaveLoading(false);
      showToast("✅ Leave application submitted!");
      setActiveModal(null);
    }, 900);
  };

  const handleGithubPush = (e) => {
    e.preventDefault();
    setGithubLoading(true);
    setTimeout(() => {
      setGithubLoading(false);
      showToast("✅ Code pushed successfully!");
      setActiveModal(null);
    }, 900);
  };

  const handleResignation = (e) => {
    e.preventDefault();
    setResignationLoading(true);
    setTimeout(() => {
      setResignationLoading(false);
      showToast("✅ Resignation request submitted successfully!");
      setTimeout(() => showToast("📧 HR will contact you within 24-48 hours."), 1200);
      setActiveModal(null);
    }, 1200);
  };

  /* ---------- salary nav ---------- */
  const changeMonth = (direction) => {
    let newIndex = currentMonthIndex + direction;
    let newYear = currentYear;
    if (newIndex > 11) {
      newIndex = 0;
      newYear = currentYear + 1;
    } else if (newIndex < 0) {
      newIndex = 11;
      newYear = currentYear - 1;
    }
    setCurrentMonthIndex(newIndex);
    setCurrentYear(newYear);
    showToast(`📅 Viewing ${months[newIndex]} ${newYear} salary slip`);
  };

  const downloadSalarySlip = () => {
    const month = months[currentMonthIndex];
    const year = currentYear;
    showToast(`📥 Downloading ${month} ${year} salary slip...`);
    setTimeout(() => showToast(`✅ Salary slip for ${month} ${year} downloaded!`), 1200);
  };

  /* ---------- calendar ---------- */
  const generateCalendar = () => {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const calendarDays = [];

    const dayHeaders = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    dayHeaders.forEach((day) => {
      calendarDays.push(<div key={`h-${day}`} className="calendar-day header">{day}</div>);
    });

    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="calendar-day" />);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const isToday = d === today.getDate() && month === today.getMonth() && year === today.getFullYear();
      const isHoliday = [1,15,26].includes(d);
      const className = `calendar-day ${isToday ? "today" : ""} ${isHoliday ? "holiday" : ""}`.trim();
      calendarDays.push(<div key={`day-${d}`} className={className}>{d}</div>);
    }

    return calendarDays;
  };

  const openModal = (name) => {
    setActiveModal(name);
    document.body.style.overflow = "hidden";
  };
  const closeModal = () => {
    setActiveModal(null);
    document.body.style.overflow = "auto";
  };

  /* ---------- render ---------- */
  if (!currentUser) {
    return (
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div style={{ color: "white", fontSize: 20, marginBottom: 8 }}>Acore IT Hub - Employee Portal</div>
          <div style={{ color: "rgba(255,255,255,0.8)" }}>Please login to continue</div>
        </div>

        <div className="login-container">
          <div className="login-box">
            <div className="login-logo">🏢</div>
            <h2>Acore IT Hub Pvt Ltd</h2>
            <p>Welcome to Employee Portal</p>
            <form onSubmit={handleLogin}>
              <div className="input-group">
                <label htmlFor="email">Company Email</label>
                <input type="email" id="email" placeholder="employee@acoreithub.com" required />
              </div>
              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="Enter your password" required />
              </div>
              <button type="submit" className="login-btn" disabled={loginLoading}>
                {loginLoading ? "Logging in..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  const userInitials = currentUser.name.split(" ").map(n => n[0]).join("").slice(0,2).toUpperCase();

  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <div className="logo-section">
          <div className="logo">🏢</div>
          <div className="company-info">
            <h1>Acore IT Hub Pvt Ltd</h1>
            <p>Employee Management Portal</p>
          </div>
          <button className="profile-header-btn" onClick={() => openModal("profile")} title="View Profile">
            <span className="profile-icon">👤</span>
            <span className="profile-text">My Profile</span>
          </button>
        </div>

        <div className="user-section">
          <div className="user-avatar">{userInitials}</div>
          <div className="user-info">
            <h3>{currentUser.name}</h3>
            <p>{currentUser.designation}</p>
          </div>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>

      {/* Announcement slider */}
      <div className="announcement-slider">
        <div className="slider-header"><h2>📢 Announcements</h2></div>
        <div className="announcement-content">
          {announcements.map((a, idx) => (
            <div key={`a-${idx}`} className={`announcement-slide ${idx === currentSlide ? "active" : ""}`}>
              <h3>{a.title}</h3>
              <p>{a.content}</p>
              <p className="date">{a.date}</p>
            </div>
          ))}
        </div>
        <div className="slider-controls">
          {announcements.map((_, idx) => (
            <span key={`dot-${idx}`} className={`slider-dot ${idx === currentSlide ? "active" : ""}`} onClick={() => goToSlide(idx)} />
          ))}
        </div>
      </div>

      {/* Dashboard */}
      <div className="dashboard-grid">
        <div className="dashboard-card" onClick={() => openModal("attendance")}>
          <div className="card-icon">⏰</div>
          <h3 className="card-title">Attendance</h3>
          <p className="card-description">Punch in/out and track your daily attendance with automatic location detection</p>
          <span className="card-badge">{isPunchedIn ? "Working" : "Active"}</span>
        </div>

        <div className="dashboard-card" onClick={() => openModal("leave")}>
          <div className="card-icon">🏖</div>
          <h3 className="card-title">Leave Management</h3>
          <p className="card-description">Apply for CL, SL, Birthday Leave and track your leave balance</p>
        </div>

        <div className="dashboard-card" onClick={() => openModal("birthday")}>
          <div className="card-icon">🎂</div>
          <h3 className="card-title">Birthdays</h3>
          <p className="card-description">Check upcoming birthdays and work anniversaries of your colleagues</p>
        </div>

        <div className="dashboard-card" onClick={() => openModal("calendar")}>
          <div className="card-icon">📅</div>
          <h3 className="card-title">Holiday Calendar</h3>
          <p className="card-description">View all official holidays and plan your time off accordingly</p>
        </div>

        <div className="dashboard-card" onClick={() => openModal("github")}>
          <div className="card-icon">💻</div>
          <h3 className="card-title">GitHub Integration</h3>
          <p className="card-description">Push your code commits and track your development work</p>
        </div>
      </div>

      {/* MODALS (attendance, leave, birthday, profile, calendar, github) */}
      {activeModal === "attendance" && (
        <div className="modal active" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header"><h2>⏰ Attendance Tracker</h2><button className="close-modal" onClick={closeModal}>✕</button></div>

            <div className={`attendance-status ${isPunchedIn ? "working" : ""}`}>
              <h3>Today's Status: <span style={{ fontWeight: 700 }}>{isPunchedIn ? "Punched In - Working" : "Not Punched In"}</span></h3>
              <div className="attendance-time">{workingHours}</div>
              <p>Working Hours Today</p>
              {isPunchedIn && <div className="work-progress-info"><span>⏱</span><span>In progress (7 hours required)</span></div>}
              <button className="punch-btn" onClick={handlePunch} disabled={punchLoading}>{punchLoading ? "Processing..." : (isPunchedIn ? "🔴 Punch Out (7hrs req)" : "🟢 Punch In")}</button>
              <div className="location-info"><span>📍</span><span>Location will be detected automatically</span></div>
            </div>
          </div>
        </div>
      )}

      {activeModal === "leave" && (
        <div className="modal active" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header"><h2>🏖 Leave Management</h2><button className="close-modal" onClick={closeModal}>✕</button></div>

            <div className="leave-types">
              <div className="leave-type-card"><div className="leave-count">12</div><div className="leave-label">Casual Leave</div></div>
              <div className="leave-type-card"><div className="leave-count">7</div><div className="leave-label">Sick Leave</div></div>
              <div className="leave-type-card"><div className="leave-count">1</div><div className="leave-label">Birthday Leave</div></div>
            </div>

            <form className="leave-form" onSubmit={handleLeaveApplication}>
              <div className="form-group"><label htmlFor="leaveType">Leave Type</label><select id="leaveType" required><option value="">Select Leave Type</option><option value="CL">Casual Leave (CL)</option><option value="SL">Sick Leave (SL)</option><option value="BL">Birthday Leave (BL)</option></select></div>

              <div className="form-group"><label htmlFor="leaveDate">Leave Date</label><input id="leaveDate" type="date" required /></div>

              <div className="form-group"><label htmlFor="leaveReason">Reason</label><textarea id="leaveReason" placeholder="Enter reason for leave..." required /></div>

              <button className="submit-btn" type="submit" disabled={leaveLoading}>{leaveLoading ? "Submitting..." : "Submit Leave Application"}</button>
            </form>
          </div>
        </div>
      )}

      {activeModal === "birthday" && (
        <div className="modal active" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header"><h2>🎂 Birthdays & Anniversaries</h2><button className="close-modal" onClick={closeModal}>✕</button></div>

            <div className="birthday-list">
              {birthdayList.map((p, i) => (
                <div key={`b-${i}`} className="birthday-item">
                  <div className="employee-avatar">{p.avatar}</div>
                  <div className="birthday-info"><h4>{p.today ? "🎉" : "🎂"} {p.name} - {p.type === "birthday" ? "Birthday" : "Work Anniversary"} {p.today ? "Today!" : "This Month"}</h4><p>{p.details}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeModal === "profile" && (
        <div className="modal active" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header"><h2>👤 Employee Profile & Salary</h2><button className="close-modal" onClick={closeModal}>✕</button></div>

            <div className="profile-header"><div className="profile-picture">{userInitials}</div><h3>{currentUser.name}</h3><p>{currentUser.designation}</p></div>

            <div className="salary-slip-section">
              <div className="salary-header"><h3>💰 Salary Slip</h3><button className="download-slip-btn" onClick={downloadSalarySlip}>📥 Download Slip</button></div>

              <div className="salary-month">
                <div className="salary-month-nav"><button className="month-btn" onClick={() => changeMonth(-1)}>◀</button><span className="current-month">{months[currentMonthIndex]} {currentYear}</span><button className="month-btn" onClick={() => changeMonth(1)}>▶</button></div>
              </div>

              <div className="salary-grid">
                <div className="salary-card earnings"><div className="salary-label">💵 Gross Salary</div><div className="salary-value">₹{grossSalary.toLocaleString("en-IN")}</div></div>
                <div className="salary-card deductions"><div className="salary-label">📉 Total Deductions</div><div className="salary-value">₹{totalDeductions.toLocaleString("en-IN")}</div></div>
                <div className="salary-card earnings"><div className="salary-label">💰 Net Salary</div><div className="salary-value">₹{netSalary.toLocaleString("en-IN")}</div></div>
              </div>

              <div className="salary-breakdown">
                <div className="breakdown-header">📊 Detailed Salary Breakdown</div>
                <div className="breakdown-content">
                  <div className="breakdown-section">
                    <div className="breakdown-title">💵 Earnings</div>
                    <div className="breakdown-item"><span className="breakdown-label">Basic Salary</span><span className="breakdown-amount positive">₹{salaryData.basicSalary.toLocaleString("en-IN")}</span></div>
                    <div className="breakdown-item"><span className="breakdown-label">HRA</span><span className="breakdown-amount positive">₹{salaryData.hra.toLocaleString("en-IN")}</span></div>
                    <div className="breakdown-item"><span className="breakdown-label">DA</span><span className="breakdown-amount positive">₹{salaryData.da.toLocaleString("en-IN")}</span></div>
                    <div className="breakdown-item"><span className="breakdown-label">Transport</span><span className="breakdown-amount positive">₹{salaryData.transport.toLocaleString("en-IN")}</span></div>
                    <div className="breakdown-item"><span className="breakdown-label">Special</span><span className="breakdown-amount positive">₹{salaryData.special.toLocaleString("en-IN")}</span></div>

                    <div style={{ borderTop: "2px solid #e2e8f0", marginTop: 10, paddingTop: 15 }} className="breakdown-item">
                      <span className="breakdown-label" style={{ fontWeight: 700, fontSize: 15 }}>Total Earnings</span>
                      <span className="breakdown-amount positive" style={{ fontSize: 18, fontWeight: 700 }}>₹{grossSalary.toLocaleString("en-IN")}</span>
                    </div>
                  </div>

                  <div className="breakdown-section">
                    <div className="breakdown-title">📉 Deductions</div>
                    <div className="breakdown-item"><span className="breakdown-label">PF</span><span className="breakdown-amount negative">₹{salaryData.pf.toLocaleString("en-IN")}</span></div>
                    <div className="breakdown-item"><span className="breakdown-label">Professional Tax</span><span className="breakdown-amount negative">₹{salaryData.professionalTax.toLocaleString("en-IN")}</span></div>
                    <div className="breakdown-item"><span className="breakdown-label">Income Tax</span><span className="breakdown-amount negative">₹{salaryData.incomeTax.toLocaleString("en-IN")}</span></div>
                    <div className="breakdown-item"><span className="breakdown-label">ESI</span><span className="breakdown-amount negative">₹{salaryData.esi.toLocaleString("en-IN")}</span></div>

                    <div style={{ borderTop: "2px solid #e2e8f0", marginTop: 10, paddingTop: 15 }} className="breakdown-item">
                      <span className="breakdown-label" style={{ fontWeight: 700, fontSize: 15 }}>Total Deductions</span>
                      <span className="breakdown-amount negative" style={{ fontSize: 18, fontWeight: 700 }}>₹{totalDeductions.toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="net-salary-card">
                <div className="net-salary-label">💰 NET SALARY (Take Home)</div>
                <div className="net-salary-value">₹{netSalary.toLocaleString("en-IN")}</div>
                <div className="net-salary-note">Gross ₹{grossSalary.toLocaleString("en-IN")} - Deductions ₹{totalDeductions.toLocaleString("en-IN")}</div>
              </div>
            </div>

            <h3 style={{ margin: "30px 0 20px 0", color: "#1e293b", fontSize: 22 }}>📝 Resignation Request</h3>
            <div className="leave-form" style={{ background: "linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)", border: "2px solid #ef4444" }}>
              <p style={{ color: "#991b1b", marginBottom: 20, fontWeight: 600 }}>⚠ Please fill this form carefully if you wish to resign from your position.</p>

              <form onSubmit={handleResignation}>
                <div className="form-group"><label htmlFor="resignationDate">Last Working Day</label><input id="resignationDate" type="date" required /></div>

                <div className="form-group"><label htmlFor="resignationReason">Reason for Resignation *</label><select id="resignationReason" required><option value="">Select reason...</option><option>Better Opportunity</option><option>Higher Studies</option><option>Personal Reasons</option><option>Health Issues</option><option>Relocation</option><option>Career Change</option><option>Work-Life Balance</option><option>Other</option></select></div>

                <div className="form-group"><label htmlFor="resignationDetails">Additional Details</label><textarea id="resignationDetails" placeholder="Please provide more details about your resignation..." required /></div>

                <button className="submit-btn" type="submit" disabled={resignationLoading}>{resignationLoading ? "Submitting..." : "📤 Submit Resignation Request"}</button>
              </form>
            </div>

            <h3 style={{ margin: "30px 0 20px 0", color: "#1e293b", fontSize: 22 }}>📋 Personal Details</h3>
            <div className="employee-details">
              <div className="detail-item"><div className="detail-label">🆔 Employee ID</div><div className="detail-value">{currentUser.empId}</div></div>
              <div className="detail-item"><div className="detail-label">👤 Full Name</div><div className="detail-value">{currentUser.name}</div></div>
              <div className="detail-item"><div className="detail-label">💼 Designation</div><div className="detail-value">{currentUser.designation}</div></div>
              <div className="detail-item"><div className="detail-label">🏢 Department</div><div className="detail-value">{currentUser.department}</div></div>
              <div className="detail-item"><div className="detail-label">📧 Email</div><div className="detail-value">{currentUser.email}</div></div>
              <div className="detail-item"><div className="detail-label">📱 Mobile</div><div className="detail-value">{currentUser.mobile}</div></div>
              <div className="detail-item"><div className="detail-label">📅 Date of Joining</div><div className="detail-value">{currentUser.joinDate}</div></div>
              <div className="detail-item"><div className="detail-label">🎉 Work Anniversary</div><div className="detail-value">{currentUser.anniversary}</div></div>
              <div className="detail-item"><div className="detail-label">🎂 Birthday</div><div className="detail-value">{currentUser.birthday}</div></div>
              <div className="detail-item"><div className="detail-label">⚧ Gender</div><div className="detail-value">{currentUser.gender}</div></div>
              <div className="detail-item"><div className="detail-label">🏠 Address</div><div className="detail-value">{currentUser.address}</div></div>
              <div className="detail-item"><div className="detail-label">💰 Employee Type</div><div className="detail-value">{currentUser.empType}</div></div>
            </div>
          </div>
        </div>
      )}

      {activeModal === "calendar" && (
        <div className="modal active" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header"><h2>📅 Holiday Calendar</h2><button className="close-modal" onClick={closeModal}>✕</button></div>
            <div className="calendar-grid">{generateCalendar()}</div>
          </div>
        </div>
      )}

      {activeModal === "github" && (
        <div className="modal active" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header"><h2>💻 GitHub Integration</h2><button className="close-modal" onClick={closeModal}>✕</button></div>

            <div className="github-section">
              <div className="github-header"><h3 style={{ color: "white" }}>📤 Push Code to Repository</h3></div>
              <form onSubmit={handleGithubPush}>
                <div className="form-group"><label htmlFor="githubRepo" style={{ color: "white" }}>Repository URL</label><input className="github-input" id="githubRepo" placeholder="https://github.com/username/repo" required /></div>
                <div className="form-group"><label htmlFor="commitMessage" style={{ color: "white" }}>Commit Message</label><input className="github-input" id="commitMessage" placeholder="Updated feature..." required /></div>
                <button className="github-btn" type="submit" disabled={githubLoading}>{githubLoading ? "Pushing..." : "📤 Push Commit"}</button>
              </form>

              <div className="github-commits">
                <h4 style={{ color: "white", marginTop: 20 }}>Recent Commits</h4>
                <div className="commit-item"><p style={{ color: "white", marginBottom: 6 }}>✅ Initial commit</p><p style={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }}>Pushed 2 hours ago</p></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast.show && (
        <div className="toast active"><span className="toast-icon">✅</span><span className="toast-message">{toast.message}</span></div>
      )}
    </div>
  );
}