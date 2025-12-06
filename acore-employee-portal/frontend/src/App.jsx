
// import React, { useState, useEffect } from 'react';
// import { useAuth } from './hooks/useAuth';
// import  useAttendance  from './hooks/useAttendance';
// import { useToast } from './hooks/useToast';

// // Components
// import Login from './components/auth/Login';
// import Header from './components/common/Header';
// import Toast from './components/common/Toast';
// import AnnouncementSlider from './components/dashboard/AnnouncementSlider';
// // DashboardGrid remove kiya - ab Header ke andar hai

// // Modals
// import AttendanceModal from './components/modals/AttendanceModal';
// import LeaveModal from './components/modals/LeaveModal';
// import BirthdayModal from './components/modals/BirthdayModal';
// import ProfileModal from './components/modals/ProfileModal';
// import CalendarModal from './components/modals/CalendarModal';
// import GithubModal from './components/modals/GithubModal';
// import SalaryModal from './components/modals/SalaryModal';
// import BirthdaySlider from './components/dashboard/BirthdaySlider';

// import './App.css';
// import EmployeeSlider from './components/dashboard/EmployeeSlider';

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

//   // Auto close modal when user logs out
//   useEffect(() => {
//     if (!currentUser) {
//       setActiveModal(null);
//     }
//   }, [currentUser]);

//   // Handle Login
//   const handleLogin = async (email, password) => {
//     try {
//       if (!email || !password) {
//         showToast('❌ Please enter both email and password', 'error');
//         return;
//       }

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
    
//     if (window.confirm('Are you sure you want to logout?')) {
//       logout();
//       showToast('👋 Logged out successfully!', 'success');
//     }
//   };

//   // Handle Punch In/Out
//   const handlePunch = async () => {
//     try {
//       const result = await attendance.handlePunch();
      
//       if (result.success) {
//         if (result.action === 'in') {
//           showToast('✅ Punched in successfully! Have a productive day.', 'success');
//         } else {
//           showToast('✅ Punched out successfully! See you tomorrow.', 'success');
//           closeModal();
//         }
//       } else {
//         showToast(result.error, 'warning');
//       }
//     } catch (error) {
//       showToast('❌ Error processing attendance', 'error');
//     }
//   };

//   // Handle Leave Application
//   const handleLeaveSubmit = async (formData) => {
//     setLeaveLoading(true);
    
//     try {
//       // Validate form data
//       if (!formData.type || !formData.startDate || !formData.endDate || !formData.reason) {
//         showToast('❌ Please fill all required fields', 'error');
//         return;
//       }

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
//       // Validate form data
//       if (!formData.repository || !formData.commitMessage) {
//         showToast('❌ Please fill all required fields', 'error');
//         return;
//       }

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
//           onCardClick={openModal}
//           attendanceStatus={attendance}
//         />

//         {/* ✅ DIRECT ATTENDANCE TRACKER - SIMPLE DIV HATA KAR */}
//         <AttendanceModal
//           attendance={attendance}
//           onPunch={handlePunch}
//         />

//         <AnnouncementSlider />
//          <BirthdaySlider />
//          <EmployeeSlider/>
        

//         {/* Other Modals */}
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

//         <SalaryModal
//           isOpen={activeModal === 'salary'}
//           onClose={closeModal}
//           currentUser={currentUser}
//         />

//         <Toast toast={toast} onClose={hideToast} />
//       </div>
//     </div>
//   );
// }

// export default App;










// import React, { useState, useEffect } from 'react';
// import { useAuth } from './hooks/useAuth';
// import useAttendance from './hooks/useAttendance';
// import { useToast } from './hooks/useToast';



// import Swal from "sweetalert2";


// // Components
// import Login from './components/auth/Login';
// import Header from './components/common/Header';
// import Toast from './components/common/Toast';
// import AnnouncementSlider from './components/dashboard/AnnouncementSlider';
// import BirthdaySlider from './components/dashboard/BirthdaySlider';
// import EmployeeSlider from './components/dashboard/EmployeeSlider';

// // Modals
// import AttendanceModal from './components/modals/AttendanceModal';
// import LeaveModal from './components/modals/LeaveModal';
// import BirthdayModal from './components/modals/BirthdayModal';
// import ProfileModal from './components/modals/ProfileModal';
// import CalendarModal from './components/modals/CalendarModal';
// import GithubModal from './components/modals/GithubModal';
// import SalaryModal from './components/modals/SalaryModal';

// import './App.css';

// function App() {
//   // Authentication
//   const { currentUser, loading: authLoading, login, logout } = useAuth();
  
//   // Attendance - CORRECT USAGE
//   const { attendance, punchIn, punchOut } = useAttendance();
  
//   // Toast Notifications
//   const { toast, showToast, hideToast } = useToast();
  
//   // Modal State
//   const [activeModal, setActiveModal] = useState(null);
//   const [leaveLoading, setLeaveLoading] = useState(false);
//   const [githubLoading, setGithubLoading] = useState(false);

//   // Auto close modal when user logs out
//   useEffect(() => {
//     if (!currentUser) {
//       setActiveModal(null);
//     }
//   }, [currentUser]);

//   // Handle Login
//   const handleLogin = async (email, password) => {
//     try {
//       if (!email || !password) {
//         showToast('❌ Please enter both email and password', 'error');
//         return;
//       }

//       await login(email, password);
//       showToast('✅ Login successful! Welcome to Acore IT Hub', 'success');
//     } catch (error) {
//       showToast('❌ Login failed. Please check your credentials.', 'error');
//     }
//   };

//   // Handle Logout
//   // const handleLogout = () => {
//   //   if (attendance.isPunchedIn) {
//   //     showToast('⛔ Please punch out before logging out', 'warning');
//   //     return;
//   //   }
    
//   //   if (window.confirm('Are you sure you want to logout?')) {
//   //     logout();
//   //     showToast('👋 Logged out successfully!', 'success');
//   //   }
//   // };


//   const handleLogout = () => {
//   Swal.fire({
//     title: "Logout?",
//     text: "Are you sure you want to logout?",
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonColor: "#3085d6",
//     cancelButtonColor: "#d33",
//     confirmButtonText: "Yes, Logout",
//   }).then((result) => {
//     if (result.isConfirmed) {
//       logout();
//       showToast("👋 Logged out successfully!", "success");
//     }
//   });
// };


//   // Handle Punch In/Out - CORRECTED
//   const handlePunch = async () => {
//     try {
//       if (attendance.isPunchedIn) {
//         // Punch out
//         const result = await punchOut();
//         if (result && result.success) {
//           showToast('✅ Punched out successfully! See you tomorrow.', 'success');
//         } else {
//           showToast(result?.error || '❌ Punch out failed', 'error');
//         }
//       } else {
//         // Punch in
//         const result = await punchIn();
//         if (result && result.success) {
//           showToast('✅ Punched in successfully! Have a productive day.', 'success');
//         } else {
//           showToast(result?.error || '❌ Punch in failed', 'error');
//         }
//       }
//     } catch (error) {
//       showToast('❌ Error processing attendance', 'error');
//       console.error('Punch error:', error);
//     }
//   };

//   // Handle Leave Application
//   const handleLeaveSubmit = async (formData) => {
//     setLeaveLoading(true);
    
//     try {
//       // Validate form data
//       if (!formData.type || !formData.startDate || !formData.endDate || !formData.reason) {
//         showToast('❌ Please fill all required fields', 'error');
//         return;
//       }

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
//       // Validate form data
//       if (!formData.repository || !formData.commitMessage) {
//         showToast('❌ Please fill all required fields', 'error');
//         return;
//       }

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
//           onCardClick={openModal}
//           attendanceStatus={attendance}
//         />

//         {/* ✅ ATTENDANCE MODAL */}
//         <AttendanceModal
//           attendance={attendance}
//           onPunch={handlePunch}
//         />

//         <AnnouncementSlider />
//         <BirthdaySlider />
//         <EmployeeSlider/>

//         {/* Other Modals */}
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

//         <SalaryModal
//           isOpen={activeModal === 'salary'}
//           onClose={closeModal}
//           currentUser={currentUser}
//         />

//         <Toast toast={toast} onClose={hideToast} />
//       </div>
//     </div>
//   );
// }

// export default App;


// ---------------------------------------->>




// import React, { useState, useEffect } from 'react';
// import { useAuth } from './hooks/useAuth';
// import useAttendance from './hooks/useAttendance';
// import { useToast } from './hooks/useToast';
// import Swal from "sweetalert2";

// // Components
// import Login from './components/auth/Login';
// import Header from './components/common/Header';
// import Toast from './components/common/Toast';
// import AnnouncementSlider from './components/dashboard/AnnouncementSlider';
// import BirthdaySlider from './components/dashboard/BirthdaySlider';
// import EmployeeSlider from './components/dashboard/EmployeeSlider';


// // Modals
// import AttendanceModal from './components/modals/AttendanceModal';
// import LeaveModal from './components/modals/LeaveModal';
// import BirthdayModal from './components/modals/BirthdayModal';
// import ProfileModal from './components/modals/ProfileModal';
// import CalendarModal from './components/modals/CalendarModal';
// import GithubModal from './components/modals/GithubModal';
// import SalaryModal from './components/modals/SalaryModal';
// import DashboardModal from './components/modals/DashboardModal';

// // NEW: Attendance Calendar Modal
// import AttendanceCalendarModal from './components/modals/AttendanceCalendarModal';

// import './App.css';

// function App() {
//   // Authentication
//   const { currentUser, loading: authLoading, login, logout } = useAuth();
  
//   // Attendance - CORRECT USAGE
//   const { attendance, punchIn, punchOut } = useAttendance();
  
//   // Toast Notifications
//   const { toast, showToast, hideToast } = useToast();
  
//   // Modal State
//   const [activeModal, setActiveModal] = useState(null);
//   const [showAttendanceCalendar, setShowAttendanceCalendar] = useState(false); // NEW STATE
//   const [leaveLoading, setLeaveLoading] = useState(false);
//   const [githubLoading, setGithubLoading] = useState(false);
//   const [showDashboard, setShowDashboard] = useState(false);

//   // Auto close modal when user logs out
//   useEffect(() => {
//     if (!currentUser) {
//       setActiveModal(null);
//       setShowAttendanceCalendar(false);
//     }
//   }, [currentUser]);

//   // Handle Login
//   const handleLogin = async (email, password) => {
//     try {
//       if (!email || !password) {
//         showToast('❌ Please enter both email and password', 'error');
//         return;
//       }

//       await login(email, password);
//       showToast('✅ Login successful! Welcome to Acore IT Hub', 'success');
//     } catch (error) {
//       showToast('❌ Login failed. Please check your credentials.', 'error');
//     }
//   };

//   // Handle Logout
//   const handleLogout = () => {
//     Swal.fire({
//       title: "Logout?",
//       text: "Are you sure you want to logout?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, Logout",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         logout();
//         showToast("👋 Logged out successfully!", "success");
//       }
//     });
//   };

//   // Handle Punch In/Out - CORRECTED
//   const handlePunch = async () => {
//     try {
//       if (attendance.isPunchedIn) {
//         // Punch out
//         const result = await punchOut();
//         if (result && result.success) {
//           showToast('✅ Punched out successfully! See you tomorrow.', 'success');
//         } else {
//           showToast(result?.error || '❌ Punch out failed', 'error');
//         }
//       } else {
//         // Punch in
//         const result = await punchIn();
//         if (result && result.success) {
//           showToast('✅ Punched in successfully! Have a productive day.', 'success');
//         } else {
//           showToast(result?.error || '❌ Punch in failed', 'error');
//         }
//       }
//     } catch (error) {
//       showToast('❌ Error processing attendance', 'error');
//       console.error('Punch error:', error);
//     }
//   };

//   // Handle Leave Application
//   const handleLeaveSubmit = async (formData) => {
//     setLeaveLoading(true);
    
//     try {
//       // Validate form data
//       if (!formData.type || !formData.startDate || !formData.endDate || !formData.reason) {
//         showToast('❌ Please fill all required fields', 'error');
//         return;
//       }

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
//       // Validate form data
//       if (!formData.repository || !formData.commitMessage) {
//         showToast('❌ Please fill all required fields', 'error');
//         return;
//       }

//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 2000));
//       showToast('✅ Code pushed to GitHub successfully!', 'success');
//     } catch (error) {
//       showToast('❌ Failed to push code to GitHub', 'error');
//     } finally {
//       setGithubLoading(false);
//     }
//   };

//   // Open Modal - UPDATED to handle attendance calendar
//   // const openModal = (modalName) => {
//   //   if (modalName === 'attendance-calendar') {
//   //     setShowAttendanceCalendar(true);
//   //   } else {
//   //     setActiveModal(modalName);
//   //   }
//   // };


//   const openModal = (modalName) => {
//   if (modalName === 'attendance-calendar') {
//     setShowAttendanceCalendar(true);
//   } else if (modalName === 'dashboard') {
//     setShowDashboard(true);
//   } else {
//     setActiveModal(modalName);
//   }
// };

//   // Close Modal - UPDATED
//   // const closeModal = () => {
//   //   setActiveModal(null);
//   //   setShowAttendanceCalendar(false);
//   // };


//   const closeModal = () => {
//   setActiveModal(null);
//   setShowAttendanceCalendar(false);
//   setShowDashboard(false);
// };

//   // Close Attendance Calendar Only
//   const closeAttendanceCalendar = () => {
//     setShowAttendanceCalendar(false);
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
//           onCardClick={openModal} // This will handle all menu clicks including attendance-calendar
//           attendanceStatus={attendance}
//         />

//         {/* ✅ ATTENDANCE MODAL */}
//         <AttendanceModal
//           attendance={attendance}
//           onPunch={handlePunch}
//         />

//         <AnnouncementSlider />
//         <BirthdaySlider />
//         <EmployeeSlider/>

//         {/* NEW: ATTENDANCE CALENDAR MODAL */}
//         <AttendanceCalendarModal
//           isOpen={showAttendanceCalendar}
//           onClose={closeAttendanceCalendar}
//           currentUser={currentUser}
//           attendanceData={attendance}
//         />

//         {/* Other Modals */}
//         <LeaveModal
//           isOpen={activeModal === 'leave'}
//           onClose={closeModal}
//           onLeaveSubmit={handleLeaveSubmit}
//           loading={leaveLoading}
//         />

//         <DashboardModal
//   isOpen={showDashboard}
//   onClose={() => setShowDashboard(false)}
// />

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

//         <SalaryModal
//           isOpen={activeModal === 'salary'}
//           onClose={closeModal}
//           currentUser={currentUser}
//         />

//         <Toast toast={toast} onClose={hideToast} />
//       </div>
//     </div>
//   );
// }

// export default App;



// dashboard in humberger btn 





// import React, { useState, useEffect } from 'react';
// import { useAuth } from './hooks/useAuth';
// import useAttendance from './hooks/useAttendance';
// import { useToast } from './hooks/useToast';
// import Swal from "sweetalert2";

// // Components
// import Login from './components/auth/Login';
// import Header from './components/common/Header';
// import Toast from './components/common/Toast';
// import AnnouncementSlider from './components/dashboard/AnnouncementSlider';
// import BirthdaySlider from './components/dashboard/BirthdaySlider';
// import EmployeeSlider from './components/dashboard/EmployeeSlider';
// import Dashboard from './components/dashboard/Dashboard'; // NEW: Regular Dashboard Component

// // Modals
// import AttendanceModal from './components/modals/AttendanceModal';
// import LeaveModal from './components/modals/LeaveModal';
// import BirthdayModal from './components/modals/BirthdayModal';
// import ProfileModal from './components/modals/ProfileModal';
// import CalendarModal from './components/modals/CalendarModal';
// import GithubModal from './components/modals/GithubModal';
// import SalaryModal from './components/modals/SalaryModal';
// import AttendanceCalendarModal from './components/modals/AttendanceCalendarModal';

// import './App.css';

// function App() {
//   const { currentUser, loading: authLoading, login, logout } = useAuth();
//   const { attendance, punchIn, punchOut } = useAttendance();
//   const { toast, showToast, hideToast } = useToast();
  
//   // Modal State
//   const [activeModal, setActiveModal] = useState(null);
//   const [showAttendanceCalendar, setShowAttendanceCalendar] = useState(false);
//   const [leaveLoading, setLeaveLoading] = useState(false);
//   const [githubLoading, setGithubLoading] = useState(false);
//   // [IMPORTANT] Dashboard modal ko remove karo, regular component use karo

//   // Auto close modal when user logs out
//   useEffect(() => {
//     if (!currentUser) {
//       setActiveModal(null);
//       setShowAttendanceCalendar(false);
//     }
//   }, [currentUser]);

//   // Handle Login
//   const handleLogin = async (email, password) => {
//     try {
//       if (!email || !password) {
//         showToast('❌ Please enter both email and password', 'error');
//         return;
//       }

//       await login(email, password);
//       showToast('✅ Login successful! Welcome to Acore IT Hub', 'success');
//     } catch (error) {
//       showToast('❌ Login failed. Please check your credentials.', 'error');
//     }
//   };

//   // Handle Logout
//   const handleLogout = () => {
//     Swal.fire({
//       title: "Logout?",
//       text: "Are you sure you want to logout?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, Logout",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         logout();
//         showToast("👋 Logged out successfully!", "success");
//       }
//     });
//   };

//   // Handle Punch In/Out
//   const handlePunch = async () => {
//     try {
//       if (attendance.isPunchedIn) {
//         const result = await punchOut();
//         if (result && result.success) {
//           showToast('✅ Punched out successfully! See you tomorrow.', 'success');
//         } else {
//           showToast(result?.error || '❌ Punch out failed', 'error');
//         }
//       } else {
//         const result = await punchIn();
//         if (result && result.success) {
//           showToast('✅ Punched in successfully! Have a productive day.', 'success');
//         } else {
//           showToast(result?.error || '❌ Punch in failed', 'error');
//         }
//       }
//     } catch (error) {
//       showToast('❌ Error processing attendance', 'error');
//       console.error('Punch error:', error);
//     }
//   };

//   // Handle Leave Application
//   const handleLeaveSubmit = async (formData) => {
//     setLeaveLoading(true);
    
//     try {
//       if (!formData.type || !formData.startDate || !formData.endDate || !formData.reason) {
//         showToast('❌ Please fill all required fields', 'error');
//         return;
//       }

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
//       if (!formData.repository || !formData.commitMessage) {
//         showToast('❌ Please fill all required fields', 'error');
//         return;
//       }

//       await new Promise(resolve => setTimeout(resolve, 2000));
//       showToast('✅ Code pushed to GitHub successfully!', 'success');
//     } catch (error) {
//       showToast('❌ Failed to push code to GitHub', 'error');
//     } finally {
//       setGithubLoading(false);
//     }
//   };

//   // Open Modal
//   // const openModal = (modalName) => {
//   //   if (modalName === 'attendance-calendar') {
//   //     setShowAttendanceCalendar(true);
//   //   } else {
//   //     setActiveModal(modalName);
//   //   }
//   // };



//   // Open Modal function mein AttendanceModal handle karo:
// const openModal = (modalName) => {
//   if (modalName === 'attendance-calendar') {
//     setShowAttendanceCalendar(true);
//   } else if (modalName === 'attendance') { // ✅ YEH ADD KARO
//     setActiveModal('attendance'); // Attendance modal ko open karo
//   } else {
//     setActiveModal(modalName);
//   }
// };

//   // Close Modal
//   const closeModal = () => {
//     setActiveModal(null);
//     setShowAttendanceCalendar(false);
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
//           onCardClick={openModal}
//           attendanceStatus={attendance}
//         />

//         {/* ✅ ATTENDANCE MODAL */}
//         {/* <AttendanceModal
//           attendance={attendance}
//           onPunch={handlePunch}
//         /> */}

//         {/* ✅ DASHBOARD - As a regular component, not modal */}
//         <div className="dashboard-wrapper">
//           <Dashboard />
//         </div>

//         {/* Other content */}
//         <AnnouncementSlider />
//         <BirthdaySlider />
//         <EmployeeSlider/>

//         {/* ATTENDANCE CALENDAR MODAL */}
//         <AttendanceCalendarModal
//           isOpen={showAttendanceCalendar}
//           onClose={closeModal}
//           currentUser={currentUser}
//           attendanceData={attendance}
//         />

//            <AttendanceModal  // ✅ YEH ADD KARO
//         isOpen={activeModal === 'attendance'}
//         onClose={closeModal}
//         attendance={attendance}
//         onPunch={handlePunch}
//       />

    

//         {/* Other Modals */}
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

//         <SalaryModal
//           isOpen={activeModal === 'salary'}
//           onClose={closeModal}
//           currentUser={currentUser}
//         />

//         <Toast toast={toast} onClose={hideToast} />
//       </div>
//     </div>
//   );
// }

// export default App;





// import React, { useState, useEffect } from 'react';
// import { useAuth } from './hooks/useAuth';
// import useAttendance from './hooks/useAttendance';
// import { useToast } from './hooks/useToast';
// import Swal from "sweetalert2";

// // Components
// import Login from './components/auth/Login';
// import Header from './components/common/Header';
// import Toast from './components/common/Toast';
// import AnnouncementSlider from './components/dashboard/AnnouncementSlider';
// import BirthdaySlider from './components/dashboard/BirthdaySlider';
// import EmployeeSlider from './components/dashboard/EmployeeSlider';
// import Dashboard from './components/dashboard/Dashboard';

// // Modals
// import AttendanceModal from './components/modals/AttendanceModal';
// import LeaveModal from './components/modals/LeaveModal';
// import BirthdayModal from './components/modals/BirthdayModal';
// import ProfileModal from './components/modals/ProfileModal';
// import CalendarModal from './components/modals/CalendarModal';
// import GithubModal from './components/modals/GithubModal';
// import SalaryModal from './components/modals/SalaryModal';
// import AttendanceCalendarModal from './components/modals/AttendanceCalendarModal';

// import './App.css';

// function App() {
//   const { currentUser, loading: authLoading, login, logout } = useAuth();
//   const { attendance, punchIn, punchOut } = useAttendance();
//   const { toast, showToast, hideToast } = useToast();
  
//   // Modal State
//   const [activeModal, setActiveModal] = useState(null);
//   const [showAttendanceCalendar, setShowAttendanceCalendar] = useState(false);
//   const [leaveLoading, setLeaveLoading] = useState(false);
//   const [githubLoading, setGithubLoading] = useState(false);

//   // Auto close modal when user logs out
//   useEffect(() => {
//     if (!currentUser) {
//       setActiveModal(null);
//       setShowAttendanceCalendar(false);
//     }
//   }, [currentUser]);

//   // Handle Login
//   const handleLogin = async (email, password) => {
//     try {
//       if (!email || !password) {
//         showToast('❌ Please enter both email and password', 'error');
//         return;
//       }

//       await login(email, password);
//       showToast('✅ Login successful! Welcome to Acore IT Hub', 'success');
//     } catch (error) {
//       showToast('❌ Login failed. Please check your credentials.', 'error');
//     }
//   };

//   // Handle Logout
//   const handleLogout = () => {
//     Swal.fire({
//       title: "Logout?",
//       text: "Are you sure you want to logout?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, Logout",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         logout();
//         showToast("👋 Logged out successfully!", "success");
//       }
//     });
//   };

//   // Handle Punch In/Out
//   const handlePunch = async () => {
//     try {
//       if (attendance.isPunchedIn) {
//         const result = await punchOut();
//         if (result && result.success) {
//           showToast('✅ Punched out successfully! See you tomorrow.', 'success');
//         } else {
//           showToast(result?.error || '❌ Punch out failed', 'error');
//         }
//       } else {
//         const result = await punchIn();
//         if (result && result.success) {
//           showToast('✅ Punched in successfully! Have a productive day.', 'success');
//         } else {
//           showToast(result?.error || '❌ Punch in failed', 'error');
//         }
//       }
//     } catch (error) {
//       showToast('❌ Error processing attendance', 'error');
//       console.error('Punch error:', error);
//     }
//   };

//   // Handle Leave Application
//   const handleLeaveSubmit = async (formData) => {
//     setLeaveLoading(true);
    
//     try {
//       if (!formData.type || !formData.startDate || !formData.endDate || !formData.reason) {
//         showToast('❌ Please fill all required fields', 'error');
//         return;
//       }

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
//       if (!formData.repository || !formData.commitMessage) {
//         showToast('❌ Please fill all required fields', 'error');
//         return;
//       }

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
//     if (modalName === 'attendance-calendar') {
//       setShowAttendanceCalendar(true);
//     } else if (modalName === 'attendance') {
//       setActiveModal('attendance');
//     } else {
//       setActiveModal(modalName);
//     }
//   };

//   // Close Modal
//   const closeModal = () => {
//     setActiveModal(null);
//     setShowAttendanceCalendar(false);
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
//           onCardClick={openModal}
//           attendanceStatus={attendance}
//         />

//         {/* ✅ DASHBOARD */}
//         <div className="dashboard-wrapper">
//           <Dashboard />
//         </div>

//         {/* ✅ SLIDERS */}
//         <AnnouncementSlider />
//         <BirthdaySlider />
//         <EmployeeSlider/>

//         {/* ✅ ATTENDANCE MODAL - Hamburger se open hoga */}
//         <AttendanceModal
//           isOpen={activeModal === 'attendance'}
//           onClose={closeModal}
//           attendance={attendance}
//           onPunch={handlePunch}
//         />

//         {/* ✅ ATTENDANCE CALENDAR MODAL */}
//         <AttendanceCalendarModal
//           isOpen={showAttendanceCalendar}
//           onClose={closeModal}
//           currentUser={currentUser}
//           attendanceData={attendance}
//         />

//         {/* ✅ OTHER MODALS */}
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

//         <SalaryModal
//           isOpen={activeModal === 'salary'}
//           onClose={closeModal}
//           currentUser={currentUser}
//         />

//         <Toast toast={toast} onClose={hideToast} />
//       </div>
//     </div>
//   );
// }

// export default App;




import React, { useState, useEffect } from 'react';
import { useAuth } from './hooks/useAuth';
import useAttendance from './hooks/useAttendance';
import { useToast } from './hooks/useToast';
import Swal from "sweetalert2";

// Components
import Login from './components/auth/Login';
import Header from './components/common/Header';
import Toast from './components/common/Toast';
import AnnouncementSlider from './components/dashboard/AnnouncementSlider';
import BirthdaySlider from './components/dashboard/BirthdaySlider';
import EmployeeSlider from './components/dashboard/EmployeeSlider';
import Dashboard from './components/dashboard/Dashboard';

// Modals
import AttendanceModal from './components/modals/AttendanceModal';
import LeaveModal from './components/modals/LeaveModal';
import BirthdayModal from './components/modals/BirthdayModal';
import ProfileModal from './components/modals/ProfileModal';
import CalendarModal from './components/modals/CalendarModal';
import GithubModal from './components/modals/GithubModal';
import SalaryModal from './components/modals/SalaryModal';
import AttendanceCalendarModal from './components/modals/AttendanceCalendarModal';

// ✅ NEW: Import ProjectsModal
import ProjectsModal from './components/modals/ProjectsModal';
import TasksModal from './components/modals/TasksModal';

import './App.css';

function App() {
  const { currentUser, loading: authLoading, login, logout } = useAuth();
  const { attendance, punchIn, punchOut } = useAttendance();
  const { toast, showToast, hideToast } = useToast();
  
  // Modal State
  const [activeModal, setActiveModal] = useState(null);
  const [showAttendanceCalendar, setShowAttendanceCalendar] = useState(false);
  const [leaveLoading, setLeaveLoading] = useState(false);
  const [githubLoading, setGithubLoading] = useState(false);
  const [showTasks, setShowTasks] = useState(false);

  // Auto close modal when user logs out
  useEffect(() => {
    if (!currentUser) {
      setActiveModal(null);
      setShowAttendanceCalendar(false);
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
    Swal.fire({
      title: "Logout?",
      text: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        showToast("👋 Logged out successfully!", "success");
      }
    });
  };

  // Handle Punch In/Out
  const handlePunch = async () => {
    try {
      if (attendance.isPunchedIn) {
        const result = await punchOut();
        if (result && result.success) {
          showToast('✅ Punched out successfully! See you tomorrow.', 'success');
        } else {
          showToast(result?.error || '❌ Punch out failed', 'error');
        }
      } else {
        const result = await punchIn();
        if (result && result.success) {
          showToast('✅ Punched in successfully! Have a productive day.', 'success');
        } else {
          showToast(result?.error || '❌ Punch in failed', 'error');
        }
      }
    } catch (error) {
      showToast('❌ Error processing attendance', 'error');
      console.error('Punch error:', error);
    }
  };

  // Handle Leave Application
  const handleLeaveSubmit = async (formData) => {
    setLeaveLoading(true);
    
    try {
      if (!formData.type || !formData.startDate || !formData.endDate || !formData.reason) {
        showToast('❌ Please fill all required fields', 'error');
        return;
      }

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
      if (!formData.repository || !formData.commitMessage) {
        showToast('❌ Please fill all required fields', 'error');
        return;
      }

      await new Promise(resolve => setTimeout(resolve, 2000));
      showToast('✅ Code pushed to GitHub successfully!', 'success');
    } catch (error) {
      showToast('❌ Failed to push code to GitHub', 'error');
    } finally {
      setGithubLoading(false);
    }
  };

  // ✅ UPDATED: Open Modal function with Projects support
const openModal = (modalName) => {
  if (modalName === 'attendance-calendar') {
    setShowAttendanceCalendar(true);
  } else if (modalName === 'attendance') {
    setActiveModal('attendance');
  } else if (modalName === 'projects') {
    setActiveModal('projects');
  } else if (modalName === 'tasks') {
    setActiveModal('tasks'); // ✅ NEW
  } else {
    setActiveModal(modalName);
  }
};

  // ✅ UPDATED: Close Modal function with Projects support
 const closeModal = () => {
  setActiveModal(null);
  setShowAttendanceCalendar(false);
};

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
          onCardClick={openModal}
          attendanceStatus={attendance}
        />

        {/* ✅ DASHBOARD */}
        <div className="dashboard-wrapper">
          <Dashboard />
        </div>

        {/* ✅ SLIDERS */}
        <AnnouncementSlider />
        <BirthdaySlider />
        <EmployeeSlider/>

        {/* ✅ ATTENDANCE MODAL */}
        <AttendanceModal
          isOpen={activeModal === 'attendance'}
          onClose={closeModal}
          attendance={attendance}
          onPunch={handlePunch}
        />

        {/* ✅ NEW: PROJECTS MODAL */}
        <ProjectsModal
          isOpen={activeModal === 'projects'}
          onClose={closeModal}
          currentUser={currentUser}
        />

        <TasksModal
         isOpen={activeModal === 'tasks'}
         onClose={closeModal}
         currentUser={currentUser}
       />

        {/* ✅ ATTENDANCE CALENDAR MODAL */}
        <AttendanceCalendarModal
          isOpen={showAttendanceCalendar}
          onClose={closeModal}
          currentUser={currentUser}
          attendanceData={attendance}
        />

        {/* ✅ OTHER MODALS */}
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

        <SalaryModal
          isOpen={activeModal === 'salary'}
          onClose={closeModal}
          currentUser={currentUser}
        />

        <Toast toast={toast} onClose={hideToast} />
      </div>
    </div>
  );
}

export default App;