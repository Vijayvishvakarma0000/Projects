// import React from 'react';
// import Modal from '../common/Modal';
// import './AttendanceModal.css';

// const AttendanceModal = ({ isOpen, onClose, attendance, onPunch }) => {
//   const {
//     isPunchedIn,
//     workingHours,
//     workingTime,
//     canLogout,
//     loading
//   } = attendance;

//   const calculateProgress = () => {
//     return Math.min((workingHours / 7) * 100, 100);
//   };

//   const getRemainingTime = () => {
//     if (workingHours >= 7) return 'Ready to punch out!';
    
//     const remainingHours = 7 - workingHours;
//     const hours = Math.floor(remainingHours);
//     const minutes = Math.floor((remainingHours - hours) * 60);
    
//     return `Complete ${hours}h ${minutes}m more`;
//   };

//   return (
//     <Modal
//       isOpen={isOpen}
//       onClose={onClose}
//       title="⏰ Attendance Tracker"
//       size="medium"
//     >
//       <div className="attendance-modal-content">
//         <div className={`attendance-status-card ${isPunchedIn ? 'active' : 'inactive'}`}>
//           <div className="status-header">
//             <h3 className="status-title">
//               Today's Status: 
//               <span className="status-value">
//                 {isPunchedIn ? ' 🟢 Punched In' : ' ⚪ Not Punched In'}
//               </span>
//             </h3>
//           </div>

//           <div className="working-time-display">
//             <div className="time-value">{workingTime}</div>
//             <p className="time-label">Working Hours Today</p>
//           </div>

//           {isPunchedIn && (
//             <div className="progress-section">
//               <div className="progress-bar">
//                 <div 
//                   className="progress-fill"
//                   style={{ width: `${calculateProgress()}%` }}
//                 ></div>
//               </div>
//               <div className="progress-info">
//                 <span className="progress-text">{getRemainingTime()}</span>
//                 <span className="progress-percentage">
//                   {calculateProgress().toFixed(1)}%
//                 </span>
//               </div>
//             </div>
//           )}

//           <button
//             className={`punch-button ${isPunchedIn ? 'punch-out' : 'punch-in'} ${loading ? 'loading' : ''}`}
//             onClick={onPunch}
//             disabled={loading}
//           >
//             {loading ? (
//               <>
//                 <span className="button-spinner"></span>
//                 Processing...
//               </>
//             ) : isPunchedIn ? (
//               canLogout ? (
//                 '🔴 Punch Out'
//               ) : (
//                 `⏳ ${getRemainingTime()}`
//               )
//             ) : (
//               '🟢 Punch In'
//             )}
//           </button>

//           <div className="location-info">
//             <span className="location-icon">📍</span>
//             <span className="location-text">
//               {isPunchedIn ? 'Location tracking active' : 'Location will be detected on punch in'}
//             </span>
//           </div>
//         </div>

//         {isPunchedIn && (
//           <div className="attendance-stats">
//             <div className="stat-item">
//               <div className="stat-value">{workingHours.toFixed(2)}h</div>
//               <div className="stat-label">Total Time</div>
//             </div>
//             <div className="stat-item">
//               <div className="stat-value">
//                 {canLogout ? '✅' : '⏳'}
//               </div>
//               <div className="stat-label">7 Hours</div>
//             </div>
//             <div className="stat-item">
//               <div className="stat-value">
//                 {Math.floor(workingHours)}h {Math.floor((workingHours % 1) * 60)}m
//               </div>
//               <div className="stat-label">Completed</div>
//             </div>
//           </div>
//         )}
//       </div>
//     </Modal>
//   );
// };

// export default AttendanceModal;



// import React from 'react';
// import './AttendanceModal.css';

// const AttendanceModal = ({ attendance, onPunch }) => {
//   const {
//     isPunchedIn,
//     workingHours,
//     workingTime,
//     canLogout,
//     loading
//   } = attendance;

//   const calculateProgress = () => {
//     return Math.min((workingHours / 7) * 100, 100);
//   };

//   const getRemainingTime = () => {
//     if (workingHours >= 7) return 'Ready to punch out!';
    
//     const remainingHours = 7 - workingHours;
//     const hours = Math.floor(remainingHours);
//     const minutes = Math.floor((remainingHours - hours) * 60);
    
//     return `Complete ${hours}h ${minutes}m more`;
//   };

//   return (
//     <div className="attendance-tracker-container">
//       <div className="attendance-tracker-content">
//         <div className="attendance-tracker-header">
//           <h2 className="attendance-tracker-title">⏰ Attendance Tracker</h2>
//         </div>
        
//         <div className={`attendance-status-card ${isPunchedIn ? 'active' : 'inactive'}`}>
//           <div className="status-header">
//             <h3 className="status-title">
//               Today's Status: 
//               <span className="status-value">
//                 {isPunchedIn ? ' 🟢 Punched In' : ' ⚪ Not Punched In'}
//               </span>
//             </h3>
//           </div>

//           <div className="working-time-display">
//             <div className="time-value">{workingTime}</div>
//             <p className="time-label">Working Hours Today</p>
//           </div>

//           {isPunchedIn && (
//             <div className="progress-section">
//               <div className="progress-bar">
//                 <div 
//                   className="progress-fill"
//                   style={{ width: `${calculateProgress()}%` }}
//                 ></div>
//               </div>
//               <div className="progress-info">
//                 <span className="progress-text">{getRemainingTime()}</span>
//                 <span className="progress-percentage">
//                   {calculateProgress().toFixed(1)}%
//                 </span>
//               </div>
//             </div>
//           )}

//           <button
//             className={`punch-button ${isPunchedIn ? 'punch-out' : 'punch-in'} ${loading ? 'loading' : ''}`}
//             onClick={onPunch}
//             disabled={loading}
//           >
//             {loading ? (
//               <>
//                 <span className="button-spinner"></span>
//                 Processing...
//               </>
//             ) : isPunchedIn ? (
//               canLogout ? (
//                 '🔴 Punch Out'
//               ) : (
//                 `⏳ ${getRemainingTime()}`
//               )
//             ) : (
//               '🟢 Punch In'
//             )}
//           </button>

//           <div className="location-info">
//             <span className="location-icon">📍</span>
//             <span className="location-text">
//               {isPunchedIn ? 'Location tracking active' : 'Location will be detected on punch in'}
//             </span>
//           </div>
//         </div>

//         {isPunchedIn && (
//           <div className="attendance-stats">
//             <div className="stat-item">
//               <div className="stat-value">{workingHours.toFixed(2)}h</div>
//               <div className="stat-label">Total Time</div>
//             </div>
//             <div className="stat-item">
//               <div className="stat-value">
//                 {canLogout ? '✅' : '⏳'}
//               </div>
//               <div className="stat-label">7 Hours</div>
//             </div>
//             <div className="stat-item">
//               <div className="stat-value">
//                 {Math.floor(workingHours)}h {Math.floor((workingHours % 1) * 60)}m
//               </div>
//               <div className="stat-label">Completed</div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AttendanceModal;



// import React from 'react';
// import './AttendanceModal.css';

// const AttendanceModal = ({ attendance, onPunch }) => {
//   const { isPunchedIn, workingHours, workingTime, canLogout, loading } = attendance;

//   const calculateProgress = () => {
//     return Math.min((workingHours / 7) * 100, 100);
//   };

//   const getRemainingTime = () => {
//     if (workingHours >= 7) return "Ready to punch out!";
//     const remainingHours = 7 - workingHours;
//     const hours = Math.floor(remainingHours);
//     const minutes = Math.floor((remainingHours - hours) * 60);
//     return `Complete ${hours}h ${minutes}m more`;
//   };

//   return (
//     <div className="attendance-tracker-container">
//       <div className="attendance-tracker-content">

//         <div className="attendance-tracker-header">
//           <h2 className="attendance-tracker-title">⏰ Attendance Tracker</h2>
//         </div>

//         <div className={`attendance-status-card ${isPunchedIn ? 'active' : 'inactive'}`}>
//           <div className="status-header">
//             <h3 className="status-title">
//               Today's Status:
//               <span className="status-value">
//                 {isPunchedIn ? ' 🟢 Punched In' : ' ⚪ Not Punched In'}
//               </span>
//             </h3>
//           </div>

//           <div className="working-time-display">
//             <div className="time-value">{workingTime}</div>
//             <p className="time-label">Working Hours Today</p>
//           </div>

//           {isPunchedIn && (
//             <div className="progress-section">

//               <div className="progress-bar">
//                 <div
//                   className="progress-fill"
//                   style={{ width: `${calculateProgress()}%` }}
//                 ></div>
//               </div>

//               <div className="progress-info">
//                 <span className="progress-text">{getRemainingTime()}</span>
//                 <span className="progress-percentage">
//                   {calculateProgress().toFixed(1)}%
//                 </span>
//               </div>
//             </div>
//           )}

//           <button
//             className={`punch-button ${isPunchedIn ? 'punch-out' : 'punch-in'} ${loading ? 'loading' : ''}`}
//             onClick={onPunch}
//             disabled={loading}
//           >
//             {loading ? (
//               <>
//                 <span className="button-spinner"></span> Processing...
//               </>
//             ) : isPunchedIn ? (
//               canLogout ? (
//                 '🔴 Punch Out'
//               ) : (
//                 `⏳ ${getRemainingTime()}`
//               )
//             ) : (
//               '🟢 Punch In'
//             )}
//           </button>

//           <div className="location-info">
//             <span className="location-icon">📍</span>
//             <span className="location-text">
//               {isPunchedIn ? 'Location tracking active' : 'Location will be detected on punch in'}
//             </span>
//           </div>
//         </div>

//         {isPunchedIn && (
//           <div className="attendance-stats">
//             <div className="stat-item">
//               <div className="stat-value">{workingHours.toFixed(2)}h</div>
//               <div className="stat-label">Total Time</div>
//             </div>

//             <div className="stat-item">
//               <div className="stat-value">{canLogout ? '✅' : '⏳'}</div>
//               <div className="stat-label">7 Hours</div>
//             </div>

//             <div className="stat-item">
//               <div className="stat-value">
//                 {Math.floor(workingHours)}h {Math.floor((workingHours % 1) * 60)}m
//               </div>
//               <div className="stat-label">Completed</div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AttendanceModal;








// import React from 'react';
// import './AttendanceModal.css';

// const AttendanceModal = ({ attendance, onPunch }) => {
//   const {
//     isPunchedIn,
//     workingHours,
//     workingTime,
//     canLogout,
//     loading,
//     activityData,
//   } = attendance;

//   const calculateProgress = () => {
//     if (!workingHours) return 0;
//     return Math.min((workingHours / 7) * 100, 100);
//   };

//   const getRemainingTime = () => {
//     if (workingHours >= 7) return "Ready to punch out!";

//     const remainingHours = 7 - workingHours;
//     const hours = Math.floor(remainingHours);
//     const minutes = Math.floor((remainingHours - hours) * 60);

//     return `Complete ${hours}h ${minutes}m more`;
//   };

//   return (
//     <div className="attendance-tracker-container">
//       <div className="attendance-tracker-content">

//         {/* HEADER */}
//         <div className="attendance-tracker-header">
//           <h2 className="attendance-tracker-title">⏰ Attendance Tracker</h2>
//         </div>

//         {/* STATUS CARD */}
//         <div className={`attendance-status-card ${isPunchedIn ? 'active' : 'inactive'}`}>

//           <div className="status-header">
//             <h3 className="status-title">
//               Today's Status:
//               <span className="status-value">
//                 {isPunchedIn ? ' 🟢 Punched In' : ' ⚪ Not Punched In'}
//               </span>
//             </h3>
//           </div>

//           {/* WORKING TIME */}
//           <div className="working-time-display">
//             <div className="time-value">{workingTime || "00:00:00"}</div>
//             <p className="time-label">Working Hours Today</p>
//           </div>

//           {/* PROGRESS BAR */}
//           {isPunchedIn && (
//             <div className="progress-section">
//               <div className="progress-bar">
//                 <div
//                   className="progress-fill"
//                   style={{ width: `${calculateProgress()}%` }}
//                 ></div>
//               </div>

//               <div className="progress-info">
//                 <span className="progress-text">{getRemainingTime()}</span>
//                 <span className="progress-percentage">
//                   {calculateProgress().toFixed(1)}%
//                 </span>
//               </div>
//             </div>
//           )}

//           {/* BUTTON */}
//           <button
//             className={`punch-button ${isPunchedIn ? 'punch-out' : 'punch-in'} ${loading ? 'loading' : ''}`}
//             onClick={onPunch}
//             disabled={loading}
//           >
//             {loading ? (
//               <>
//                 <span className="button-spinner"></span> Processing...
//               </>
//             ) : isPunchedIn ? (
//               canLogout ? (
//                 "🔴 Punch Out"
//               ) : (
//                 `⏳ ${getRemainingTime()}`
//               )
//             ) : (
//               "🟢 Punch In"
//             )}
//           </button>

//           {/* LOCATION INFO */}
//           <div className="location-info">
//             <span className="location-icon">📍</span>
//             <span className="location-text">
//               {isPunchedIn
//                 ? "Location tracking active"
//                 : "Location will be detected on punch in"}
//             </span>
//           </div>
//         </div>

//         {/* ELECTRON ACTIVITY DATA */}
//         {isPunchedIn && (
//           <div className="attendance-stats">

//             <div className="stat-item">
//               <div className="stat-value">{workingHours.toFixed(2)}h</div>
//               <div className="stat-label">Total Time</div>
//             </div>

//             <div className="stat-item">
//               <div className="stat-value">{canLogout ? "✅" : "⏳"}</div>
//               <div className="stat-label">7 Hours</div>
//             </div>

//             <div className="stat-item">
//               <div className="stat-value">
//                 {Math.floor(workingHours)}h {Math.floor((workingHours % 1) * 60)}m
//               </div>
//               <div className="stat-label">Completed</div>
//             </div>

//             {/* NEW — ACTIVITY FROM ELECTRON */}
//             <div className="stat-item">
//               <div className="stat-value">
//                 {activityData?.lastKey || "-"}
//               </div>
//               <div className="stat-label">Last Key</div>
//             </div>

//             <div className="stat-item">
//               <div className="stat-value">
//                 {activityData?.isActive ? "🟢 Active" : "⚪ Idle"}
//               </div>
//               <div className="stat-label">User State</div>
//             </div>

//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AttendanceModal;



// import React from 'react';
// import './AttendanceModal.css';

// const AttendanceModal = ({ attendance, onPunch }) => {
//   const {
//     isPunchedIn,
//     workingHours,
//     workingTime,
//     canLogout,
//     loading,
//     activityData
//   } = attendance;

//   const calculateProgress = () => {
//     return Math.min((workingHours / 7) * 100, 100);
//   };

//   const getRemainingTime = () => {
//     if (workingHours >= 7) return "Ready to punch out!";
//     const remainingHours = 7 - workingHours;
//     const hours = Math.floor(remainingHours);
//     const minutes = Math.floor((remainingHours - hours) * 60);
//     return `Complete ${hours}h ${minutes}m more`;
//   };

//   return (
//     <div className="attendance-tracker-container">
//       <div className="attendance-tracker-content">

//         {/* Header */}
//         <div className="attendance-tracker-header">
//           <h2 className="attendance-tracker-title">⏰ Attendance Tracker</h2>
//         </div>

//         {/* Status Card */}
//         <div className={`attendance-status-card ${isPunchedIn ? "active" : "inactive"}`}>
//           <div className="status-header">
//             <h3 className="status-title">
//               Today's Status:
//               <span className="status-value">
//                 {isPunchedIn ? " 🟢 Punched In" : " ⚪ Not Punched In"}
//               </span>
//             </h3>
//           </div>

//           {/* Working Time */}
//           <div className="working-time-display">
//             <div className="time-value">{workingTime}</div>
//             <p className="time-label">Working Hours Today</p>
//           </div>

//           {/* Progress Bar */}
//           {isPunchedIn && (
//             <div className="progress-section">
//               <div className="progress-bar">
//                 <div
//                   className="progress-fill"
//                   style={{ width: `${calculateProgress()}%` }}
//                 ></div>
//               </div>

//               <div className="progress-info">
//                 <span className="progress-text">{getRemainingTime()}</span>
//                 <span className="progress-percentage">
//                   {calculateProgress().toFixed(1)}%
//                 </span>
//               </div>
//             </div>
//           )}

//           {/* Activity Tracking (NEW) */}
//           {isPunchedIn && (
//             <div className="activity-tracker-box">
//               <h3 className="activity-title">🧩 User Activity Tracking</h3>

//               <div className="activity-item">
//                 <strong>Last Key:</strong> {activityData.lastKey || "No activity"}
//               </div>

//               <div className="activity-item">
//                 <strong>Last Activity:</strong>{" "}
//                 {activityData.lastEventTime || "—"}
//               </div>

//               <div className="activity-item">
//                 <strong>Status:</strong>{" "}
//                 {activityData.isActive ? "🟢 Active" : "🔴 Idle"}
//               </div>

//               <div className="activity-item">
//                 <strong>Total Active:</strong>{" "}
//                 {activityData.totalActiveMinutes} min
//               </div>
//             </div>
//           )}

//           {/* Punch Button */}
//           <button
//             className={`punch-button ${isPunchedIn ? "punch-out" : "punch-in"} ${
//               loading ? "loading" : ""
//             }`}
//             onClick={onPunch}
//             disabled={loading}
//           >
//             {loading ? (
//               <>
//                 <span className="button-spinner"></span> Processing...
//               </>
//             ) : isPunchedIn ? (
//               canLogout ? (
//                 "🔴 Punch Out"
//               ) : (
//                 `⏳ ${getRemainingTime()}`
//               )
//             ) : (
//               "🟢 Punch In"
//             )}
//           </button>

//           {/* Location Info */}
//           <div className="location-info">
//             <span className="location-icon">📍</span>
//             <span className="location-text">
//               {isPunchedIn
//                 ? "Location tracking active"
//                 : "Location will be detected on punch in"}
//             </span>
//           </div>

//         </div>

//         {/* Footer Stats */}
//         {isPunchedIn && (
//           <div className="attendance-stats">
//             <div className="stat-item">
//               <div className="stat-value">{workingHours.toFixed(2)}h</div>
//               <div className="stat-label">Total Time</div>
//             </div>

//             <div className="stat-item">
//               <div className="stat-value">{canLogout ? "✅" : "⏳"}</div>
//               <div className="stat-label">7 Hours</div>
//             </div>

//             <div className="stat-item">
//               <div className="stat-value">
//                 {Math.floor(workingHours)}h {Math.floor((workingHours % 1) * 60)}m
//               </div>
//               <div className="stat-label">Completed</div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AttendanceModal;


// import React from "react";
// import "./AttendanceModal.css";

// const AttendanceModal = ({ attendance, onPunch }) => {
//   const { isPunchedIn, workingHours, workingTime, canLogout, loading } = attendance;

//   const calculateProgress = () => {
//     return Math.min((workingHours / 7) * 100, 100);
//   };

//   const getRemainingTime = () => {
//     if (workingHours >= 7) return "Ready to punch out!";
//     const remainingHours = 7 - workingHours;
//     const hours = Math.floor(remainingHours);
//     const minutes = Math.floor((remainingHours - hours) * 60);
//     return `Complete ${hours}h ${minutes}m more`;
//   };

//   return (
//     <div className="attendance-tracker-container">
//       <div className="attendance-tracker-content">

//         <div className="attendance-tracker-header">
//           <h2 className="attendance-tracker-title">⏰ Attendance Tracker</h2>
//         </div>

//         <div
//           className={`attendance-status-card ${
//             isPunchedIn ? "active" : "inactive"
//           }`}
//         >
//           <div className="status-header">
//             <h3 className="status-title">
//               Today's Status:
//               <span className="status-value">
//                 {isPunchedIn ? " 🟢 Punched In" : " ⚪ Not Punched In"}
//               </span>
//             </h3>
//           </div>

//           <div className="working-time-display">
//             <div className="time-value">{workingTime}</div>
//             <p className="time-label">Working Hours Today</p>
//           </div>

//           {isPunchedIn && (
//             <div className="progress-section">
//               <div className="progress-bar">
//                 <div
//                   className="progress-fill"
//                   style={{ width: `${calculateProgress()}%` }}
//                 ></div>
//               </div>

//               <div className="progress-info">
//                 <span className="progress-text">{getRemainingTime()}</span>
//                 <span className="progress-percentage">
//                   {calculateProgress().toFixed(1)}%
//                 </span>
//               </div>
//             </div>
//           )}

//           <button
//             className={`punch-button ${
//               isPunchedIn ? "punch-out" : "punch-in"
//             } ${loading ? "loading" : ""}`}
//             onClick={onPunch}
//             disabled={loading}
//           >
//             {loading ? (
//               <>
//                 <span className="button-spinner"></span> Processing...
//               </>
//             ) : isPunchedIn ? (
//               canLogout ? "🔴 Punch Out" : `⏳ ${getRemainingTime()}`
//             ) : (
//               "🟢 Punch In"
//             )}
//           </button>

//           <div className="location-info">
//             <span className="location-icon">📍</span>
//             <span className="location-text">
//               {isPunchedIn
//                 ? "Location tracking active"
//                 : "Location will be detected on punch in"}
//             </span>
//           </div>
//         </div>

//         {isPunchedIn && (
//           <div className="attendance-stats">
//             <div className="stat-item">
//               <div className="stat-value">{workingHours.toFixed(2)}h</div>
//               <div className="stat-label">Total Time</div>
//             </div>

//             <div className="stat-item">
//               <div className="stat-value">{canLogout ? "✅" : "⏳"}</div>
//               <div className="stat-label">7 Hours</div>
//             </div>

//             <div className="stat-item">
//               <div className="stat-value">
//                 {Math.floor(workingHours)}h{" "}
//                 {Math.floor((workingHours % 1) * 60)}m
//               </div>
//               <div className="stat-label">Completed</div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AttendanceModal;


// import React from "react";
// import "./AttendanceModal.css";

// const AttendanceModal = ({ attendance, onPunch }) => {
//   const { isPunchedIn, workingHours, workingTime, canLogout, loading } = attendance;

//   const calculateProgress = () => {
//     return Math.min((workingHours / 7) * 100, 100);
//   };

//   const getRemainingTime = () => {
//     if (workingHours >= 7) return "Ready to punch out!";
//     const remaining = 7 - workingHours;
//     const hours = Math.floor(remaining);
//     const minutes = Math.floor((remaining - hours) * 60);
//     return `Complete ${hours}h ${minutes}m more`;
//   };

//   return (
//     <div className="attendance-tracker-container">
//       <div className="attendance-tracker-content">
        
//         <div className="attendance-tracker-header">
//           <h2 className="attendance-tracker-title">⏰ Attendance Tracker</h2>
//         </div>

//         <div className={`attendance-status-card ${isPunchedIn ? "active" : "inactive"}`}>
          
//           <div className="status-header">
//             <h3 className="status-title">
//               Status: 
//               <span className="status-value">
//                 {isPunchedIn ? " 🟢 Punched In" : " ⚪ Not Punched In"}
//               </span>
//             </h3>
//           </div>

//           <div className="working-time-display">
//             <div className="time-value">{workingTime}</div>
//             <p className="time-label">Working Hours Today</p>
//           </div>

//           {isPunchedIn && (
//             <div className="progress-section">
//               <div className="progress-bar">
//                 <div
//                   className="progress-fill"
//                   style={{ width: `${calculateProgress()}%` }}
//                 ></div>
//               </div>

//               <div className="progress-info">
//                 <span className="progress-text">{getRemainingTime()}</span>
//                 <span className="progress-percentage">
//                   {calculateProgress().toFixed(1)}%
//                 </span>
//               </div>
//             </div>
//           )}

//           <button
//             className={`punch-button ${isPunchedIn ? "punch-out" : "punch-in"} ${loading ? "loading" : ""}`}
//             onClick={onPunch}
//             disabled={loading || (isPunchedIn && !canLogout)}
//           >
//             {loading ? (
//               <>
//                 <span className="button-spinner"></span> Processing...
//               </>
//             ) : isPunchedIn ? (
//               canLogout ? "🔴 Punch Out" : `⏳ ${getRemainingTime()}`
//             ) : (
//               "🟢 Punch In"
//             )}
//           </button>

//           <div className="location-info">
//             <span className="location-icon">📍</span>
//             <span className="location-text">
//               {isPunchedIn ? "Location tracking active" : "Click punch in to start"}
//             </span>
//           </div>
//         </div>

//         {isPunchedIn && (
//           <div className="attendance-stats">
//             <div className="stat-item">
//               <div className="stat-value">{workingHours.toFixed(2)}h</div>
//               <div className="stat-label">Total Time</div>
//             </div>
//             <div className="stat-item">
//               <div className="stat-value">{canLogout ? "✅" : "⏳"}</div>
//               <div className="stat-label">7 Hours</div>
//             </div>
//             <div className="stat-item">
//               <div className="stat-value">
//                 {Math.floor(workingHours)}h {Math.floor((workingHours % 1) * 60)}m
//               </div>
//               <div className="stat-label">Completed</div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AttendanceModal;





 //thik  he ye code


//     import React from "react";
// import "./AttendanceModal.css";
// import { useEffect } from "react";

// const AttendanceModal = ({ attendance, onPunch }) => {
//   const { isPunchedIn, workingHours, workingTime, canLogout, loading, isIdle, currentApp } = attendance;

//   const calculateProgress = () => {
//     return Math.min((workingHours / 7) * 100, 100);
//   };

//   const getRemainingTime = () => {
//     if (workingHours >= 7) return "Ready to punch out!";
//     const remainingHours = 7 - workingHours;
//     const hours = Math.floor(remainingHours);
//     const minutes = Math.floor((remainingHours - hours) * 60);
    
//     if (hours === 0 && minutes === 0) {
//       return "Ready to punch out!";
//     }
    
//     return `Complete ${hours}h ${minutes}m more`;
//   };

//   const getStatusColor = () => {
//     if (!isPunchedIn) return "inactive";
//     if (isIdle) return "idle"; // ✅ IDLE status
//     return "active";
//   };

//   const getStatusText = () => {
//     if (!isPunchedIn) return "⚪ Not Punched In";
//     if (isIdle) return "🟡 Idle - Tracking Paused"; // ✅ IDLE text
//     return "🟢 Active Tracking";
//   };


//   // App.jsx ya Dashboard.jsx mein
// useEffect(() => {
//   const handler = (e) => {
//     console.log('Network Tab Proof →', e.detail);
//   };
//   window.addEventListener('electron-activity', handler);
//   return () => window.removeEventListener('electron-activity', handler);
// }, []);

//   return (
//     <div className="attendance-tracker-container">
//       <div className="attendance-tracker-content">

//         <div className="attendance-tracker-header">
//           <h2 className="attendance-tracker-title">⏰ Employee Activity Tracker</h2>
//         </div>

//         <div className={`attendance-status-card ${getStatusColor()}`}>
          
//           {/* ✅ CURRENT APP & IDLE STATUS */}
//           {isPunchedIn && (
//             <div className="current-app-info">
//               <span className="app-icon">💻</span>
//               <span className="app-text">Using: {currentApp}</span>
//               {isIdle && <span className="idle-badge">⏸️ IDLE</span>}
//             </div>
//           )}

//           <div className="status-header">
//             <h3 className="status-title">
//               Today's Status:
//               <span className="status-value">
//                 {getStatusText()}
//               </span>
//             </h3>
//           </div>

//           <div className="working-time-display">
//             <div className="time-value">
//               {workingTime}
//               {isIdle && <span className="paused-indicator"> ⏸️</span>}
//             </div>
//             <p className="time-label">
//               {isPunchedIn 
//                 ? (isIdle 
//                     ? "⏸️ Tracking Paused (No Activity)" 
//                     : "🟢 Active Working Time") 
//                 : "Working Hours Today"
//               }
//             </p>
//           </div>

//           {isPunchedIn && (
//             <div className="progress-section">
//               <div className="progress-bar">
//                 <div
//                   className="progress-fill"
//                   style={{ 
//                     width: `${calculateProgress()}%`,
//                     backgroundColor: isIdle ? '#f59e0b' : '#10b981' // ✅ Color change when idle
//                   }}
//                 ></div>
//               </div>

//               <div className="progress-info">
//                 <span className="progress-text">
//                   {isIdle ? "⏸️ Waiting for activity..." : getRemainingTime()}
//                 </span>
//                 <span className="progress-percentage">
//                   {calculateProgress().toFixed(1)}%
//                 </span>
//               </div>
//             </div>
//           )}

//           <button
//             className={`punch-button ${
//               isPunchedIn ? "punch-out" : "punch-in"
//             } ${loading ? "loading" : ""}`}
//             onClick={onPunch}
//             disabled={loading || (isPunchedIn && !canLogout)}
//           >
//             {loading ? (
//               <>
//                 <span className="button-spinner"></span> Processing...
//               </>
//             ) : isPunchedIn ? (
//               canLogout ? "🔴 Stop Tracking & Punch Out" : `⏳ ${getRemainingTime()}`
//             ) : (
//               "🟢 Start Tracking & Punch In"
//             )}
//           </button>

//           <div className="location-info">
//             <span className="location-icon">📍</span>
//             <span className="location-text">
//               {isPunchedIn 
//                 ? (isIdle 
//                     ? "⏸️ Location tracking paused" 
//                     : "📍 Location & Activity tracking active") 
//                 : "Location will be captured on punch in"
//               }
//             </span>
//           </div>
//         </div>

//         {isPunchedIn && (
//           <div className="tracking-details">
//             <h4 className="details-title">📊 Live Tracking Details</h4>
//             <div className="details-grid">
//               <div className="detail-item">
//                 <span className="detail-label">Current Application:</span>
//                 <span className="detail-value">{currentApp}</span>
//               </div>
//               <div className="detail-item">
//                 <span className="detail-label">Tracking Status:</span>
//                 <span className="detail-value">
//                   {isIdle ? "⏸️ PAUSED (User Idle)" : "🟢 ACTIVE"}
//                 </span>
//               </div>
//               <div className="detail-item">
//                 <span className="detail-label">Total Time:</span>
//                 <span className="detail-value">{workingHours.toFixed(2)} hours</span>
//               </div>
//               <div className="detail-item">
//                 <span className="detail-label">Required Time:</span>
//                 <span className="detail-value">7 hours</span>
//               </div>
//             </div>
//           </div>
//         )}



//       </div>
//     </div>
//   );
// };

// export default AttendanceModal;






// css updating for attandance model



// import React from "react";
// import "./AttendanceModal.css";
// import { useEffect } from "react";

// const AttendanceModal = ({ attendance, onPunch }) => {
//   const { isPunchedIn, workingHours, workingTime, canLogout, loading, isIdle, currentApp } = attendance;

//   const calculateProgress = () => {
//     return Math.min((workingHours / 7) * 100, 100);
//   };

//   const getRemainingTime = () => {
//     if (workingHours >= 7) return "Ready to punch out!";
//     const remainingHours = 7 - workingHours;
//     const hours = Math.floor(remainingHours);
//     const minutes = Math.floor((remainingHours - hours) * 60);
    
//     if (hours === 0 && minutes === 0) {
//       return "Ready to punch out!";
//     }
    
//     return `Complete ${hours}h ${minutes}m more`;
//   };

//   const getStatusColor = () => {
//     if (!isPunchedIn) return "inactive";
//     if (isIdle) return "idle";
//     return "active";
//   };

//   const getStatusText = () => {
//     if (!isPunchedIn) return "⚪ Not Punched In";
//     if (isIdle) return "🟡 Idle - Tracking Paused";
//     return "🟢 Active Tracking";
//   };

//   useEffect(() => {
//     const handler = (e) => {
//       console.log('Network Tab Proof →', e.detail);
//     };
//     window.addEventListener('electron-activity', handler);
//     return () => window.removeEventListener('electron-activity', handler);
//   }, []);

//   return (
//     <div className="attendance-tracker-container">
//       <div className="attendance-tracker-content">
        
//         {/* Activity Tracker Section (Left Side) */}
//         <div className="activity-tracker-section">
//           <div className="attendance-tracker-header">
//             <h2 className="attendance-tracker-title">⏰ Employee Activity Tracker</h2>
//           </div>

//           <div className={`attendance-status-card ${getStatusColor()}`}>
            
//             {/* CURRENT APP & IDLE STATUS */}
//             {isPunchedIn && (
//               <div className="current-app-info">
//                 <span className="app-icon">💻</span>
//                 <span className="app-text">Using: {currentApp}</span>
//                 {isIdle && <span className="idle-badge">⏸️ IDLE</span>}
//               </div>
//             )}

//             <div className="status-header">
//               <h3 className="status-title">
//                 Today's Status:
//                 <span className="status-value">
//                   {getStatusText()}
//                 </span>
//               </h3>
//             </div>

//             <div className="working-time-display">
//               <div className="time-value">
//                 {workingTime}
//                 {isIdle && <span className="paused-indicator"> ⏸️</span>}
//               </div>
//               <p className="time-label">
//                 {isPunchedIn 
//                   ? (isIdle 
//                       ? "⏸️ Tracking Paused (No Activity)" 
//                       : "🟢 Active Working Time") 
//                   : "Working Hours Today"
//                 }
//               </p>
//             </div>

//             {isPunchedIn && (
//               <div className="progress-section">
//                 <div className="progress-bar">
//                   <div
//                     className="progress-fill"
//                     style={{ 
//                       width: `${calculateProgress()}%`,
//                       backgroundColor: isIdle ? '#f59e0b' : '#10b981'
//                     }}
//                   ></div>
//                 </div>

//                 <div className="progress-info">
//                   <span className="progress-text">
//                     {isIdle ? "⏸️ Waiting for activity..." : getRemainingTime()}
//                   </span>
//                   <span className="progress-percentage">
//                     {calculateProgress().toFixed(1)}%
//                   </span>
//                 </div>
//               </div>
//             )}

//             <button
//               className={`punch-button ${
//                 isPunchedIn ? "punch-out" : "punch-in"
//               } ${loading ? "loading" : ""}`}
//               onClick={onPunch}
//               disabled={loading || (isPunchedIn && !canLogout)}
//             >
//               {loading ? (
//                 <>
//                   <span className="button-spinner"></span> Processing...
//                 </>
//               ) : isPunchedIn ? (
//                 canLogout ? "🔴 Stop Tracking & Punch Out" : `⏳ ${getRemainingTime()}`
//               ) : (
//                 "🟢 Start Tracking & Punch In"
//               )}
//             </button>

//             <div className="location-info">
//               <span className="location-icon">📍</span>
//               <span className="location-text">
//                 {isPunchedIn 
//                   ? (isIdle 
//                       ? "⏸️ Location tracking paused" 
//                       : "📍 Location & Activity tracking active") 
//                   : "Location will be captured on punch in"
//                 }
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Tracking Details Section (Right Side) - Only show when punched in */}
//         {isPunchedIn && (
//           <div className="tracking-details">
//             <h4 className="details-title">📊 Live Tracking Details</h4>
//             <div className="details-grid">
//               <div className="detail-item">
//                 <span className="detail-label">Current Application:</span>
//                 <span className="detail-value">{currentApp}</span>
//               </div>
//               <div className="detail-item">
//                 <span className="detail-label">Tracking Status:</span>
//                 <span className="detail-value">
//                   {isIdle ? "⏸️ PAUSED (User Idle)" : "🟢 ACTIVE"}
//                 </span>
//               </div>
//               <div className="detail-item">
//                 <span className="detail-label">Total Time:</span>
//                 <span className="detail-value">{workingHours.toFixed(2)} hours</span>
//               </div>
//               <div className="detail-item">
//                 <span className="detail-label">Required Time:</span>
//                 <span className="detail-value">7 hours</span>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AttendanceModal;



// import React from "react";
// import "./AttendanceModal.css";
// import { useEffect } from "react";

// const AttendanceModal = ({ attendance, onPunch }) => {
//   const { isPunchedIn, workingHours, workingTime, canLogout, loading, isIdle, currentApp } = attendance;

//   const calculateProgress = () => {
//     return Math.min((workingHours / 7) * 100, 100);
//   };

//   const getRemainingTime = () => {
//     if (workingHours >= 7) return "Ready to punch out!";
//     const remainingHours = 7 - workingHours;
//     const hours = Math.floor(remainingHours);
//     const minutes = Math.floor((remainingHours - hours) * 60);
    
//     if (hours === 0 && minutes === 0) {
//       return "Ready to punch out!";
//     }
    
//     return `Complete ${hours}h ${minutes}m more`;
//   };

//   const getStatusColor = () => {
//     if (!isPunchedIn) return "inactive";
//     if (isIdle) return "idle"; // ✅ IDLE status
//     return "active";
//   };

//   const getStatusText = () => {
//     if (!isPunchedIn) return "⚪ Not Punched In";
//     if (isIdle) return "🟡 Idle - Tracking Paused"; // ✅ IDLE text
//     return "🟢 Active Tracking";
//   };


//   // App.jsx ya Dashboard.jsx mein
// useEffect(() => {
//   const handler = (e) => {
//     console.log('Network Tab Proof →', e.detail);
//   };
//   window.addEventListener('electron-activity', handler);
//   return () => window.removeEventListener('electron-activity', handler);
// }, []);

//   return (
//     <div className="attendance-tracker-container">
//       {/* ✅ YAHAN CHANGE KARO - Line 65 */}
//       <div className={`attendance-tracker-content ${isPunchedIn ? 'punched-in' : ''}`}>

//         <div className="attendance-tracker-header">
//           <h2 className="attendance-tracker-title">⏰ Employee Activity Tracker</h2>
//         </div>

//         <div className={`attendance-status-card ${getStatusColor()}`}>
          
//           {/* ✅ CURRENT APP & IDLE STATUS */}
//           {isPunchedIn && (
//             <div className="current-app-info">
//               <span className="app-icon">💻</span>
//               <span className="app-text">Using: {currentApp}</span>
//               {isIdle && <span className="idle-badge">⏸️ IDLE</span>}
//             </div>
//           )}

//           <div className="status-header">
//             <h3 className="status-title">
//               Today's Status:
//               <span className="status-value">
//                 {getStatusText()}
//               </span>
//             </h3>
//           </div>

//           <div className="working-time-display">
//             <div className="time-value">
//               {workingTime}
//               {isIdle && <span className="paused-indicator"> ⏸️</span>}
//             </div>
//             <p className="time-label">
//               {isPunchedIn 
//                 ? (isIdle 
//                     ? "⏸️ Tracking Paused (No Activity)" 
//                     : "🟢 Active Working Time") 
//                 : "Working Hours Today"
//               }
//             </p>
//           </div>

//           {isPunchedIn && (
//             <div className="progress-section">
//               <div className="progress-bar">
//                 <div
//                   className="progress-fill"
//                   style={{ 
//                     width: `${calculateProgress()}%`,
//                     backgroundColor: isIdle ? '#f59e0b' : '#10b981' // ✅ Color change when idle
//                   }}
//                 ></div>
//               </div>

//               <div className="progress-info">
//                 <span className="progress-text">
//                   {isIdle ? "⏸️ Waiting for activity..." : getRemainingTime()}
//                 </span>
//                 <span className="progress-percentage">
//                   {calculateProgress().toFixed(1)}%
//                 </span>
//               </div>
//             </div>
//           )}

//           <button
//             className={`punch-button ${
//               isPunchedIn ? "punch-out" : "punch-in"
//             } ${loading ? "loading" : ""}`}
//             onClick={onPunch}
//             disabled={loading || (isPunchedIn && !canLogout)}
//           >
//             {loading ? (
//               <>
//                 <span className="button-spinner"></span> Processing...
//               </>
//             ) : isPunchedIn ? (
//               canLogout ? "🔴 Stop Tracking & Punch Out" : `⏳ ${getRemainingTime()}`
//             ) : (
//               "🟢 Start Tracking & Punch In"
//             )}
//           </button>

//           <div className="location-info">
//             <span className="location-icon">📍</span>
//             <span className="location-text">
//               {isPunchedIn 
//                 ? (isIdle 
//                     ? "⏸️ Location tracking paused" 
//                     : "📍 Location & Activity tracking active") 
//                 : "Location will be captured on punch in"
//               }
//             </span>
//           </div>
//         </div>

//         {isPunchedIn && (
//           <div className="tracking-details">
//             <h4 className="details-title">📊 Live Tracking Details</h4>
//             <div className="details-grid">
//               <div className="detail-item">
//                 <span className="detail-label">Current Application:</span>
//                 <span className="detail-value">{currentApp}</span>
//               </div>
//               <div className="detail-item">
//                 <span className="detail-label">Tracking Status:</span>
//                 <span className="detail-value">
//                   {isIdle ? "⏸️ PAUSED (User Idle)" : "🟢 ACTIVE"}
//                 </span>
//               </div>
//               <div className="detail-item">
//                 <span className="detail-label">Total Time:</span>
//                 <span className="detail-value">{workingHours.toFixed(2)} hours</span>
//               </div>
//               <div className="detail-item">
//                 <span className="detail-label">Required Time:</span>
//                 <span className="detail-value">7 hours</span>
//               </div>
//             </div>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// };

// export default AttendanceModal;















// import React from "react";
// import "./AttendanceModal.css";

// const AttendanceModal = ({ attendance, onPunch }) => {
//   const { isPunchedIn, workingHours, workingTime, canLogout, loading, isIdle, currentApp } = attendance;

//   const calculateProgress = () => {
//     return Math.min((workingHours / 7) * 100, 100);
//   };

//   const getRemainingTime = () => {
//     if (workingHours >= 7) return "Ready to punch out!";
//     const remainingHours = 7 - workingHours;
//     const hours = Math.floor(remainingHours);
//     const minutes = Math.floor((remainingHours - hours) * 60);
    
//     if (hours === 0 && minutes === 0) {
//       return "Ready to punch out!";
//     }
    
//     return `Complete ${hours}h ${minutes}m more`;
//   };

//   const getStatusColor = () => {
//     if (!isPunchedIn) return "inactive";
//     if (isIdle) return "idle";
//     return "active";
//   };

//   const getStatusText = () => {
//     if (!isPunchedIn) return "⚪ Not Punched In";
//     if (isIdle) return "🟡 Idle - Tracking Paused";
//     return "🟢 Active Tracking";
//   };

//   return (
//     <div className="attendance-tracker-container">
//       <div className={`attendance-tracker-content ${isPunchedIn ? 'punched-in' : ''}`}>
//         <div className="attendance-tracker-header">
//           <h2 className="attendance-tracker-title">⏰ Employee Activity Tracker</h2>
//         </div>

//         <div className="attendance-cards-wrapper">
//           <div className={`attendance-status-card ${getStatusColor()}`}>
//             {/* ✅ CURRENT APP & IDLE STATUS */}
//             {isPunchedIn && (
//               <div className="current-app-info">
//                 <span className="app-icon">💻</span>
//                 <span className="app-text">Using: {currentApp}</span>
//                 {isIdle && <span className="idle-badge">⏸️ IDLE</span>}
//               </div>
//             )}

//             <div className="status-header">
//               <h3 className="status-title">
//                 Today's Status:
//                 <span className="status-value">
//                   {getStatusText()}
//                 </span>
//               </h3>
//             </div>

//             <div className="working-time-display">
//               <div className="time-value">
//                 {workingTime}
//                 {isIdle && <span className="paused-indicator"> ⏸️</span>}
//               </div>
//               <p className="time-label">
//                 {isPunchedIn 
//                   ? (isIdle 
//                       ? "⏸️ Tracking Paused (No Activity)" 
//                       : "🟢 Active Working Time") 
//                   : "Working Hours Today"
//                 }
//               </p>
//             </div>

//             {isPunchedIn && (
//               <div className="progress-section">
//                 <div className="progress-bar">
//                   <div
//                     className="progress-fill"
//                     style={{ 
//                       width: `${calculateProgress()}%`,
//                       backgroundColor: isIdle ? '#f59e0b' : '#10b981'
//                     }}
//                   ></div>
//                 </div>

//                 <div className="progress-info">
//                   <span className="progress-text">
//                     {isIdle ? "⏸️ Waiting for activity..." : getRemainingTime()}
//                   </span>
//                   <span className="progress-percentage">
//                     {calculateProgress().toFixed(1)}%
//                   </span>
//                 </div>
//               </div>
//             )}

//             <button
//               className={`punch-button ${
//                 isPunchedIn ? "punch-out" : "punch-in"
//               } ${loading ? "loading" : ""}`}
//               onClick={onPunch}
//               disabled={loading || (isPunchedIn && !canLogout)}
//             >
//               {loading ? (
//                 <>
//                   <span className="button-spinner"></span> Processing...
//                 </>
//               ) : isPunchedIn ? (
//                 canLogout ? "🔴 Stop Tracking & Punch Out" : `⏳ ${getRemainingTime()}`
//               ) : (
//                 "🟢 Start Tracking & Punch In"
//               )}
//             </button>

//             <div className="location-info">
//               <span className="location-icon">📍</span>
//               <span className="location-text">
//                 {isPunchedIn 
//                   ? (isIdle 
//                       ? "⏸️ Location tracking paused" 
//                       : "📍 Location & Activity tracking active") 
//                   : "Location will be captured on punch in"
//                 }
//               </span>
//             </div>
//           </div>

//           {isPunchedIn && (
//             <div className="tracking-details">
//               <h4 className="details-title">📊 Live Tracking Details</h4>
//               <div className="details-grid">
//                 <div className="detail-item">
//                   <span className="detail-label">Current Application:</span>
//                   <span className="detail-value">{currentApp}</span>
//                 </div>
//                 <div className="detail-item">
//                   <span className="detail-label">Tracking Status:</span>
//                   <span className="detail-value">
//                     {isIdle ? "⏸️ PAUSED (User Idle)" : "🟢 ACTIVE"}
//                   </span>
//                 </div>
//                 <div className="detail-item">
//                   <span className="detail-label">Total Time:</span>
//                   <span className="detail-value">{workingHours.toFixed(2)} hours</span>
//                 </div>
//                 <div className="detail-item">
//                   <span className="detail-label">Required Time:</span>
//                   <span className="detail-value">7 hours</span>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AttendanceModal;













// import React, { useState, useEffect } from "react";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import "./AttendanceModal.css";

// // Office coordinates (from your Google Maps link)
// const OFFICE_LAT = 22.7494444;
// const OFFICE_LNG = 75.8991667;
// const ALLOWED_RADIUS_METERS = 100; // 100 meter radius

// const AttendanceModal = ({ attendance, onPunch }) => {
//   const { isPunchedIn, workingHours, workingTime, canLogout, loading, isIdle, currentApp } = attendance;
//   const [isWithinOffice, setIsWithinOffice] = useState(false);
//   const [distance, setDistance] = useState(null);
//   const [locationLoading, setLocationLoading] = useState(false);

//   // Calculate distance between two coordinates (Haversine formula)
//   const calculateDistance = (lat1, lon1, lat2, lon2) => {
//     const R = 6371000; // Earth's radius in meters
//     const φ1 = lat1 * Math.PI / 180;
//     const φ2 = lat2 * Math.PI / 180;
//     const Δφ = (lat2 - lat1) * Math.PI / 180;
//     const Δλ = (lon2 - lon1) * Math.PI / 180;

//     const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
//               Math.cos(φ1) * Math.cos(φ2) *
//               Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

//     return R * c; // Distance in meters
//   };

//   // Check user's current location
//   const checkLocation = () => {
//     setLocationLoading(true);
    
//     if (!navigator.geolocation) {
//       toast.error("❌ Geolocation is not supported by your browser", {
//         position: "top-right",
//         autoClose: 3000,
//         theme: "dark"
//       });
//       setLocationLoading(false);
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const userLat = position.coords.latitude;
//         const userLng = position.coords.longitude;
//         const accuracy = position.coords.accuracy;
        
//         // Calculate distance
//         const calculatedDistance = calculateDistance(
//           userLat, 
//           userLng, 
//           OFFICE_LAT, 
//           OFFICE_LNG
//         );
        
//         setDistance(calculatedDistance);
//         const withinRange = calculatedDistance <= ALLOWED_RADIUS_METERS + accuracy;
//         setIsWithinOffice(withinRange);

//         // Show appropriate toast message
//         if (withinRange) {
//           toast.success(`📍 You're ${Math.round(calculatedDistance)}m from office\n✅ You can punch in now!`, {
//             position: "top-right",
//             autoClose: 4000,
//             theme: "dark",
//             style: { 
//               background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
//               color: 'white'
//             }
//           });
//         } else {
//           toast.warning(`📍 You're ${Math.round(calculatedDistance)}m from office\n❌ Must be within 100m to punch in`, {
//             position: "top-right",
//             autoClose: 5000,
//             theme: "dark",
//             style: { 
//               background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
//               color: 'white'
//             }
//           });
//         }
        
//         setLocationLoading(false);
//       },
//       (error) => {
//         console.error("Geolocation error:", error);
//         toast.error("📍 Unable to fetch location. Please enable location services", {
//           position: "top-right",
//           autoClose: 3000,
//           theme: "dark"
//         });
//         setLocationLoading(false);
//       },
//       {
//         enableHighAccuracy: true,
//         timeout: 5000,
//         maximumAge: 0
//       }
//     );
//   };

//   // Check location on component mount and when punch status changes
//   useEffect(() => {
//     if (!isPunchedIn) {
//       checkLocation();
//     }
//   }, [isPunchedIn]);

//   // Auto-check location every 30 seconds when not punched in
//   useEffect(() => {
//     if (!isPunchedIn) {
//       const interval = setInterval(checkLocation, 30000); // 30 seconds
//       return () => clearInterval(interval);
//     }
//   }, [isPunchedIn]);

//   const calculateProgress = () => {
//     return Math.min((workingHours / 7) * 100, 100);
//   };

//   const getRemainingTime = () => {
//     if (workingHours >= 7) return "Ready to punch out!";
//     const remainingHours = 7 - workingHours;
//     const hours = Math.floor(remainingHours);
//     const minutes = Math.floor((remainingHours - hours) * 60);
    
//     if (hours === 0 && minutes === 0) {
//       return "Ready to punch out!";
//     }
    
//     return `Complete ${hours}h ${minutes}m more`;
//   };

//   const getStatusColor = () => {
//     if (!isPunchedIn) return "inactive";
//     if (isIdle) return "idle";
//     return "active";
//   };

//   const getStatusText = () => {
//     if (!isPunchedIn) return "⚪ Not Punched In";
//     if (isIdle) return "🟡 Idle - Tracking Paused";
//     return "🟢 Active Tracking";
//   };

//   // Handle punch button click with location check
//   const handlePunchClick = () => {
//     if (!isPunchedIn && !isWithinOffice) {
//       toast.warning(`🚫 Cannot Punch In!\nYou must be within 100m of the office`, {
//         position: "top-center",
//         autoClose: 4000,
//         theme: "dark",
//         style: { 
//           background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
//           color: 'white',
//           fontSize: '14px'
//         }
//       });
//       checkLocation(); // Re-check location
//       return;
//     }
//     onPunch(); // Proceed with original punch function
//   };

//   return (
//     <div className="attendance-tracker-container">
//       <ToastContainer 
//         position="top-right"
//         autoClose={4000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="dark"
//       />
      
//       <div className={`attendance-tracker-content ${isPunchedIn ? 'punched-in' : ''}`}>
//         <div className="attendance-tracker-header">
//           <h2 className="attendance-tracker-title">⏰ Employee Activity Tracker</h2>
//         </div>

//         <div className="attendance-cards-wrapper">
//           <div className={`attendance-status-card ${getStatusColor()}`}>
//             {/* ✅ CURRENT APP & IDLE STATUS */}
//             {isPunchedIn && (
//               <div className="current-app-info">
//                 <span className="app-icon">💻</span>
//                 <span className="app-text">Using: {currentApp}</span>
//                 {isIdle && <span className="idle-badge">⏸️ IDLE</span>}
//               </div>
//             )}

//             {/* ✅ LOCATION STATUS INDICATOR */}
//             {!isPunchedIn && (
//               <div className={`location-status-indicator ${isWithinOffice ? 'within-range' : 'out-of-range'}`}>
//                 <div className="location-status-header">
//                   <span className="location-pin-icon">📍</span>
//                   <span className="location-status-text">
//                     {locationLoading ? "Checking location..." : 
//                      isWithinOffice ? "✅ Within Office Range" : "❌ Out of Office Range"}
//                   </span>
//                 </div>
                
//                 {distance !== null && !locationLoading && (
//                   <div className="distance-display">
//                     <div className="distance-value">
//                       {Math.round(distance)}m
//                     </div>
//                     <div className="distance-label">
//                       from office • Required: &lt;100m
//                     </div>
//                   </div>
//                 )}
                
//                 {!locationLoading && (
//                   <button 
//                     className="refresh-location-btn"
//                     onClick={checkLocation}
//                   >
//                     🔄 Refresh Location
//                   </button>
//                 )}
//               </div>
//             )}

//             <div className="status-header">
//               <h3 className="status-title">
//                 Today's Status:
//                 <span className="status-value">
//                   {getStatusText()}
//                 </span>
//               </h3>
//             </div>

//             <div className="working-time-display">
//               <div className="time-value">
//                 {workingTime}
//                 {isIdle && <span className="paused-indicator"> ⏸️</span>}
//               </div>
//               <p className="time-label">
//                 {isPunchedIn 
//                   ? (isIdle 
//                       ? "⏸️ Tracking Paused (No Activity)" 
//                       : "🟢 Active Working Time") 
//                   : "Working Hours Today"
//                 }
//               </p>
//             </div>

//             {isPunchedIn && (
//               <div className="progress-section">
//                 <div className="progress-bar">
//                   <div
//                     className="progress-fill"
//                     style={{ 
//                       width: `${calculateProgress()}%`,
//                       backgroundColor: isIdle ? '#f59e0b' : '#10b981'
//                     }}
//                   ></div>
//                 </div>

//                 <div className="progress-info">
//                   <span className="progress-text">
//                     {isIdle ? "⏸️ Waiting for activity..." : getRemainingTime()}
//                   </span>
//                   <span className="progress-percentage">
//                     {calculateProgress().toFixed(1)}%
//                   </span>
//                 </div>
//               </div>
//             )}

//             <button
//               className={`punch-button ${
//                 isPunchedIn ? "punch-out" : "punch-in"
//               } ${loading ? "loading" : ""} ${(!isPunchedIn && !isWithinOffice) ? "disabled-punch" : ""}`}
//               onClick={handlePunchClick}
//               disabled={loading || (isPunchedIn && !canLogout) || (!isPunchedIn && !isWithinOffice)}
//               title={(!isPunchedIn && !isWithinOffice) ? "You must be within 100m of office to punch in" : ""}
//             >
//               {loading ? (
//                 <>
//                   <span className="button-spinner"></span> Processing...
//                 </>
//               ) : isPunchedIn ? (
//                 canLogout ? "🔴 Stop Tracking & Punch Out" : `⏳ ${getRemainingTime()}`
//               ) : (
//                 <>
//                   {isWithinOffice ? "🟢" : "⭕"} 
//                   {isWithinOffice ? " Start Tracking & Punch In" : " Out of Range"}
//                 </>
//               )}
//             </button>

//             <div className="location-info">
//               <span className="location-icon">📍</span>
//               <span className="location-text">
//                 {isPunchedIn 
//                   ? (isIdle 
//                       ? "⏸️ Location tracking paused" 
//                       : "📍 Location & Activity tracking active") 
//                   : `Office: ${OFFICE_LAT.toFixed(6)}, ${OFFICE_LNG.toFixed(6)}`
//                 }
//               </span>
//             </div>
//           </div>

//           {isPunchedIn && (
//             <div className="tracking-details">
//               <h4 className="details-title">📊 Live Tracking Details</h4>
//               <div className="details-grid">
//                 <div className="detail-item">
//                   <span className="detail-label">Current Application:</span>
//                   <span className="detail-value">{currentApp}</span>
//                 </div>
//                 <div className="detail-item">
//                   <span className="detail-label">Tracking Status:</span>
//                   <span className="detail-value">
//                     {isIdle ? "⏸️ PAUSED (User Idle)" : "🟢 ACTIVE"}
//                   </span>
//                 </div>
//                 <div className="detail-item">
//                   <span className="detail-label">Total Time:</span>
//                   <span className="detail-value">{workingHours.toFixed(2)} hours</span>
//                 </div>
//                 <div className="detail-item">
//                   <span className="detail-label">Required Time:</span>
//                   <span className="detail-value">7 hours</span>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AttendanceModal;











// import React, { useState, useEffect } from "react";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import "./AttendanceModal.css";

// // Office coordinates (from your Google Maps link)
// const OFFICE_LAT = 22.7494444;
// const OFFICE_LNG = 75.8991667;
// const ALLOWED_RADIUS_METERS = 100; // 100 meter radius

// const AttendanceModal = ({ attendance, onPunch }) => {
//   const { isPunchedIn, workingHours, workingTime, canLogout, loading, isIdle, currentApp } = attendance;
//   const [isWithinOffice, setIsWithinOffice] = useState(false);
//   const [distance, setDistance] = useState(null);
//   const [accuracy, setAccuracy] = useState(null);
//   const [locationLoading, setLocationLoading] = useState(false);
//   const [locationError, setLocationError] = useState(null);

//   // Calculate distance between two coordinates (Haversine formula)
//   const calculateDistance = (lat1, lon1, lat2, lon2) => {
//     const R = 6371000; // Earth's radius in meters
//     const φ1 = lat1 * Math.PI / 180;
//     const φ2 = lat2 * Math.PI / 180;
//     const Δφ = (lat2 - lat1) * Math.PI / 180;
//     const Δλ = (lon2 - lon1) * Math.PI / 180;

//     const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
//               Math.cos(φ1) * Math.cos(φ2) *
//               Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

//     return R * c; // Distance in meters
//   };

//   // Improved location check with accuracy handling
//   const checkLocation = () => {
//     setLocationLoading(true);
//     setLocationError(null);
    
//     if (!navigator.geolocation) {
//       const errorMsg = "❌ Geolocation is not supported by your browser";
//       toast.error(errorMsg, {
//         position: "top-right",
//         autoClose: 3000,
//         theme: "dark"
//       });
//       setLocationError(errorMsg);
//       setLocationLoading(false);
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const userLat = position.coords.latitude;
//         const userLng = position.coords.longitude;
//         const currentAccuracy = position.coords.accuracy; // Accuracy in meters
        
//         setAccuracy(currentAccuracy);
        
//         // Calculate distance
//         const calculatedDistance = calculateDistance(
//           userLat, 
//           userLng, 
//           OFFICE_LAT, 
//           OFFICE_LNG
//         );
        
//         setDistance(calculatedDistance);
        
//         // ✅ IMPROVED LOGIC: Account for GPS accuracy
//         // If calculated distance minus accuracy is within range, consider it valid
//         // This handles cases where GPS shows 7m, 14m etc.
//         const maxAllowedDistance = ALLOWED_RADIUS_METERS + currentAccuracy;
//         const withinRange = calculatedDistance <= maxAllowedDistance;
        
//         setIsWithinOffice(withinRange);

//         // Debug information
//         console.log("📍 Location Debug:");
//         console.log("- User Location:", userLat, userLng);
//         console.log("- Distance from office:", calculatedDistance, "meters");
//         console.log("- GPS Accuracy:", currentAccuracy, "meters");
//         console.log("- Max allowed (100m + accuracy):", maxAllowedDistance, "meters");
//         console.log("- Is within range?", withinRange);

//         // Show appropriate toast message
//         if (withinRange) {
//           toast.success(
//             <div>
//               <div>✅ <strong>Office Range Detected!</strong></div>
//               <div style={{ fontSize: '12px', opacity: 0.9 }}>
//                 Distance: {Math.round(calculatedDistance)}m (Accuracy: ±{Math.round(currentAccuracy)}m)
//               </div>
//               <div style={{ fontSize: '12px', marginTop: '5px' }}>
//                 ✅ You can now punch in
//               </div>
//             </div>, 
//             {
//               position: "top-right",
//               autoClose: 5000,
//               theme: "dark",
//               style: { 
//                 background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
//                 color: 'white'
//               }
//             }
//           );
//         } else {
//           toast.warning(
//             <div>
//               <div>❌ <strong>Out of Office Range</strong></div>
//               <div style={{ fontSize: '12px', opacity: 0.9 }}>
//                 You're {Math.round(calculatedDistance)}m away (Accuracy: ±{Math.round(currentAccuracy)}m)
//               </div>
//               <div style={{ fontSize: '12px', marginTop: '5px' }}>
//                 Must be within 100m of office
//               </div>
//             </div>, 
//             {
//               position: "top-right",
//               autoClose: 5000,
//               theme: "dark",
//               style: { 
//                 background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
//                 color: 'white'
//               }
//             }
//           );
//         }
        
//         setLocationLoading(false);
//       },
//       (error) => {
//         console.error("Geolocation error:", error);
//         let errorMsg = "Unable to fetch location";
        
//         switch(error.code) {
//           case error.PERMISSION_DENIED:
//             errorMsg = "📍 Location permission denied. Please enable location services";
//             break;
//           case error.POSITION_UNAVAILABLE:
//             errorMsg = "📍 Location information unavailable";
//             break;
//           case error.TIMEOUT:
//             errorMsg = "📍 Location request timed out";
//             break;
//           default:
//             errorMsg = "📍 Unknown location error";
//         }
        
//         toast.error(errorMsg, {
//           position: "top-right",
//           autoClose: 4000,
//           theme: "dark"
//         });
        
//         setLocationError(errorMsg);
//         setLocationLoading(false);
//       },
//       {
//         enableHighAccuracy: true, // High accuracy for better results
//         timeout: 10000, // 10 seconds timeout
//         maximumAge: 0 // Don't use cached position
//       }
//     );
//   };

//   // Check location on component mount and when punch status changes
//   useEffect(() => {
//     if (!isPunchedIn) {
//       checkLocation();
//     }
//   }, [isPunchedIn]);

//   // Auto-check location every 10 seconds when not punched in
//   useEffect(() => {
//     if (!isPunchedIn) {
//       const interval = setInterval(checkLocation, 10000); // 10 seconds
//       return () => clearInterval(interval);
//     }
//   }, [isPunchedIn]);

//   const calculateProgress = () => {
//     return Math.min((workingHours / 7) * 100, 100);
//   };

//   const getRemainingTime = () => {
//     if (workingHours >= 7) return "Ready to punch out!";
//     const remainingHours = 7 - workingHours;
//     const hours = Math.floor(remainingHours);
//     const minutes = Math.floor((remainingHours - hours) * 60);
    
//     if (hours === 0 && minutes === 0) {
//       return "Ready to punch out!";
//     }
    
//     return `Complete ${hours}h ${minutes}m more`;
//   };

//   const getStatusColor = () => {
//     if (!isPunchedIn) return "inactive";
//     if (isIdle) return "idle";
//     return "active";
//   };

//   const getStatusText = () => {
//     if (!isPunchedIn) return "⚪ Not Punched In";
//     if (isIdle) return "🟡 Idle - Tracking Paused";
//     return "🟢 Active Tracking";
//   };

//   // Handle punch button click with location check
//   const handlePunchClick = () => {
//     if (!isPunchedIn && !isWithinOffice) {
//       toast.warning(
//         <div>
//           <div>🚫 <strong>Cannot Punch In!</strong></div>
//           <div style={{ fontSize: '13px', marginTop: '5px' }}>
//             You must be within 100m of the office
//           </div>
//           <div style={{ fontSize: '11px', opacity: 0.8, marginTop: '3px' }}>
//             Current distance: {distance ? Math.round(distance) + 'm' : 'Unknown'}
//           </div>
//         </div>, 
//         {
//           position: "top-center",
//           autoClose: 5000,
//           theme: "dark",
//           style: { 
//             background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
//             color: 'white',
//             fontSize: '14px'
//           }
//         }
//       );
//       checkLocation(); // Re-check location
//       return;
//     }
//     onPunch(); // Proceed with original punch function
//   };

//   return (
//     <div className="attendance-tracker-container">
//       <ToastContainer 
//         position="top-right"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="dark"
//         style={{ zIndex: 9999 }}
//       />
      
//       <div className={`attendance-tracker-content ${isPunchedIn ? 'punched-in' : ''}`}>
//         <div className="attendance-tracker-header">
//           <h2 className="attendance-tracker-title">⏰ Employee Activity Tracker</h2>
//         </div>

//         <div className="attendance-cards-wrapper">
//           <div className={`attendance-status-card ${getStatusColor()}`}>
//             {/* ✅ CURRENT APP & IDLE STATUS */}
//             {isPunchedIn && (
//               <div className="current-app-info">
//                 <span className="app-icon">💻</span>
//                 <span className="app-text">Using: {currentApp}</span>
//                 {isIdle && <span className="idle-badge">⏸️ IDLE</span>}
//               </div>
//             )}

//             {/* ✅ LOCATION STATUS INDICATOR */}
//             {!isPunchedIn && (
//               <div className={`location-status-indicator ${isWithinOffice ? 'within-range' : 'out-of-range'} ${locationLoading ? 'loading' : ''}`}>
//                 <div className="location-status-header">
//                   <span className="location-pin-icon">📍</span>
//                   <span className="location-status-text">
//                     {locationLoading ? "🔍 Detecting location..." : 
//                      isWithinOffice ? "✅ Within Office Range" : "❌ Out of Office Range"}
//                   </span>
//                 </div>
                
//                 {distance !== null && !locationLoading && (
//                   <div className="distance-display">
//                     <div className="distance-value">
//                       {Math.round(distance)}m
//                     </div>
//                     <div className="distance-label">
//                       {accuracy && `(Accuracy: ±${Math.round(accuracy)}m)`}
//                     </div>
//                     <div className="range-info">
//                       Required: Within 100m radius
//                     </div>
//                   </div>
//                 )}
                
//                 {locationError && (
//                   <div className="location-error">
//                     ⚠️ {locationError}
//                   </div>
//                 )}
                
//                 <div className="location-actions">
//                   <button 
//                     className="refresh-location-btn"
//                     onClick={checkLocation}
//                     disabled={locationLoading}
//                   >
//                     {locationLoading ? (
//                       <>
//                         <span className="mini-spinner"></span> Checking...
//                       </>
//                     ) : (
//                       "🔄 Refresh Location"
//                     )}
//                   </button>
//                 </div>
//               </div>
//             )}

//             <div className="status-header">
//               <h3 className="status-title">
//                 Today's Status:
//                 <span className="status-value">
//                   {getStatusText()}
//                 </span>
//               </h3>
//             </div>

//             <div className="working-time-display">
//               <div className="time-value">
//                 {workingTime}
//                 {isIdle && <span className="paused-indicator"> ⏸️</span>}
//               </div>
//               <p className="time-label">
//                 {isPunchedIn 
//                   ? (isIdle 
//                       ? "⏸️ Tracking Paused (No Activity)" 
//                       : "🟢 Active Working Time") 
//                   : "Working Hours Today"
//                 }
//               </p>
//             </div>

//             {isPunchedIn && (
//               <div className="progress-section">
//                 <div className="progress-bar">
//                   <div
//                     className="progress-fill"
//                     style={{ 
//                       width: `${calculateProgress()}%`,
//                       backgroundColor: isIdle ? '#f59e0b' : '#10b981'
//                     }}
//                   ></div>
//                 </div>

//                 <div className="progress-info">
//                   <span className="progress-text">
//                     {isIdle ? "⏸️ Waiting for activity..." : getRemainingTime()}
//                   </span>
//                   <span className="progress-percentage">
//                     {calculateProgress().toFixed(1)}%
//                   </span>
//                 </div>
//               </div>
//             )}

//             <button
//               className={`punch-button ${
//                 isPunchedIn ? "punch-out" : "punch-in"
//               } ${loading ? "loading" : ""} ${(!isPunchedIn && !isWithinOffice) ? "disabled-punch" : ""}`}
//               onClick={handlePunchClick}
//               disabled={loading || (isPunchedIn && !canLogout) || (!isPunchedIn && !isWithinOffice)}
//               title={(!isPunchedIn && !isWithinOffice) ? `You must be within 100m of office to punch in\nCurrent distance: ${distance ? Math.round(distance) + 'm' : 'Unknown'}` : ""}
//             >
//               {loading ? (
//                 <>
//                   <span className="button-spinner"></span> Processing...
//                 </>
//               ) : isPunchedIn ? (
//                 canLogout ? "🔴 Stop Tracking & Punch Out" : `⏳ ${getRemainingTime()}`
//               ) : (
//                 <>
//                   {isWithinOffice ? "🟢" : "⭕"} 
//                   {isWithinOffice ? " Start Tracking & Punch In" : " Out of Range"}
//                   {!isWithinOffice && distance && (
//                     <span className="distance-hint"> ({Math.round(distance)}m)</span>
//                   )}
//                 </>
//               )}
//             </button>

//             <div className={`location-info ${isWithinOffice ? 'within-office' : ''}`}>
//               <span className="location-icon">📍</span>
//               <span className="location-text">
//                 {isPunchedIn 
//                   ? (isIdle 
//                       ? "⏸️ Location tracking paused" 
//                       : "📍 Location & Activity tracking active") 
//                   : `ACORE IT HUB | Vijay Nagar, Indore`
//                 }
//               </span>
//             </div>
//           </div>

//           {isPunchedIn && (
//             <div className="tracking-details">
//               <h4 className="details-title">📊 Live Tracking Details</h4>
//               <div className="details-grid">
//                 <div className="detail-item">
//                   <span className="detail-label">Current Application:</span>
//                   <span className="detail-value">{currentApp}</span>
//                 </div>
//                 <div className="detail-item">
//                   <span className="detail-label">Tracking Status:</span>
//                   <span className="detail-value">
//                     {isIdle ? "⏸️ PAUSED (User Idle)" : "🟢 ACTIVE"}
//                   </span>
//                 </div>
//                 <div className="detail-item">
//                   <span className="detail-label">Total Time:</span>
//                   <span className="detail-value">{workingHours.toFixed(2)} hours</span>
//                 </div>
//                 <div className="detail-item">
//                   <span className="detail-label">Required Time:</span>
//                   <span className="detail-value">7 hours</span>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AttendanceModal;

// ye code sahi vala he 

// import React, { useState, useEffect } from "react";
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import "./AttendanceModal.css";

// // Office coordinates
// const OFFICE_LAT = 22.7494444;
// const OFFICE_LNG = 75.8991667;
// const ALLOWED_RADIUS_METERS = 100;

// const AttendanceModal = ({ attendance, onPunch }) => {
//   const { isPunchedIn, workingHours, workingTime, canLogout, loading, isIdle, currentApp } = attendance;
//   const [isWithinOffice, setIsWithinOffice] = useState(false);
//   const [locationStatus, setLocationStatus] = useState('checking'); // 'checking', 'matched', 'not_matched', 'error'
//   const [employeeLocation, setEmployeeLocation] = useState('');

//   // Calculate distance
//   const calculateDistance = (lat1, lon1, lat2, lon2) => {
//     const R = 6371000;
//     const φ1 = lat1 * Math.PI / 180;
//     const φ2 = lat2 * Math.PI / 180;
//     const Δφ = (lat2 - lat1) * Math.PI / 180;
//     const Δλ = (lon2 - lon1) * Math.PI / 180;

//     const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
//               Math.cos(φ1) * Math.cos(φ2) *
//               Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

//     return R * c;
//   };

//   // Get location type based on coordinates
//   const getLocationType = (distance) => {
//     if (distance <= ALLOWED_RADIUS_METERS) {
//       return 'office';
//     } else if (distance <= 500) { // Within 500m
//       return 'near_office';
//     } else if (distance <= 5000) { // Within 5km
//       return 'city';
//     } else {
//       return 'other';
//     }
//   };

//   // Check location with proper flow
//   // const checkLocation = () => {
//   //   setLocationStatus('checking');
//   //   setEmployeeLocation('');
    
//   //   if (!navigator.geolocation) {
//   //     toast.error("Location access not available", {
//   //       position: "top-center",
//   //       autoClose: 3000,
//   //       className: 'custom-toast error-toast'
//   //     });
//   //     setLocationStatus('error');
//   //     return;
//   //   }

//   //   navigator.geolocation.getCurrentPosition(
//   //     (position) => {
//   //       const userLat = position.coords.latitude;
//   //       const userLng = position.coords.longitude;
        
//   //       const distance = calculateDistance(userLat, userLng, OFFICE_LAT, OFFICE_LNG);
//   //       const withinRange = distance <= ALLOWED_RADIUS_METERS;
        
//   //       setIsWithinOffice(withinRange);
        
//   //       // Step 1: Show detecting message
//   //       toast.info("🔍 Detecting your location...", {
//   //         position: "top-center",
//   //         autoClose: 1500,
//   //         className: 'custom-toast info-toast'
//   //       });
        
//   //       // Small delay for better UX
//   //       setTimeout(() => {
//   //         // Step 2: Show match result
//   //         if (withinRange) {
//   //           setLocationStatus('matched');
//   //           toast.success("✅ Your location matches office location", {
//   //             position: "top-center",
//   //             autoClose: 3000,
//   //             className: 'custom-toast success-toast'
//   //           });
//   //         } else {
//   //           setLocationStatus('not_matched');
//   //           toast.error("❌ Your location does not match office location", {
//   //             position: "top-center",
//   //             autoClose: 3000,
//   //             className: 'custom-toast error-toast'
//   //           });
//   //         }
          
//   //         // Step 3: Show employee location
//   //         setTimeout(() => {
//   //           const locationType = getLocationType(distance);
//   //           let locationMessage = "";
            
//   //           switch(locationType) {
//   //             case 'office':
//   //               locationMessage = "Employee is at office location";
//   //               break;
//   //             case 'near_office':
//   //               locationMessage = "Employee is near office (within 500m)";
//   //               break;
//   //             case 'city':
//   //               locationMessage = "Employee is in city (within 5km)";
//   //               break;
//   //             default:
//   //               locationMessage = "Employee is away from office";
//   //           }
            
//   //           setEmployeeLocation(locationMessage);
            
//   //           toast.info(`📍 ${locationMessage}`, {
//   //             position: "top-center",
//   //             autoClose: 4000,
//   //             className: 'custom-toast info-toast'
//   //           });
//   //         }, 1000);
          
//   //       }, 1500);
//   //     },
//   //     (error) => {
//   //       setLocationStatus('error');
//   //       toast.error("Cannot check location. Please enable location services.", {
//   //         position: "top-center",
//   //         autoClose: 3000,
//   //         className: 'custom-toast error-toast'
//   //       });
//   //     },
//   //     {
//   //       enableHighAccuracy: true,
//   //       timeout: 5000,
//   //       maximumAge: 0
//   //     }
//   //   );
//   // };


//   // ✅ Updated checkLocation function for Electron
//   const checkLocation = async () => {
//     setLocationStatus('checking');
//     setEmployeeLocation('');
    
//     try {
//       // Step 1: Try to get location from Electron
//       let userLocation = null;
      
//       // Try Electron API first
//       if (window.electronAPI && window.electronAPI.getUserLocation) {
//         userLocation = await window.electronAPI.getUserLocation();
//       }
      
//       // If Electron API fails or not available, try browser geolocation
//       if (!userLocation && navigator.geolocation) {
//         if (window.electronAPI && window.electronAPI.getBrowserLocation) {
//           userLocation = await window.electronAPI.getBrowserLocation();
//         } else {
//           // Direct browser geolocation (will ask permission)
//           userLocation = await new Promise((resolve) => {
//             navigator.geolocation.getCurrentPosition(
//               (position) => {
//                 resolve({
//                   latitude: position.coords.latitude,
//                   longitude: position.coords.longitude,
//                   accuracy: position.coords.accuracy,
//                   source: 'browser'
//                 });
//               },
//               (error) => {
//                 console.log('Geolocation error:', error);
//                 resolve(null);
//               },
//               {
//                 enableHighAccuracy: true,
//                 timeout: 10000,
//                 maximumAge: 0
//               }
//             );
//           });
//         }
//       }
      
//       if (!userLocation) {
//         // Fallback to hardcoded location or show error
//         setLocationStatus('error');
//         toast.error("⚠️ Unable to get location. Using approximate location.", {
//           position: "top-center",
//           autoClose: 3000,
//           className: 'custom-toast warning-toast'
//         });
        
//         // Use default coordinates for testing
//         userLocation = {
//           latitude: OFFICE_LAT,
//           longitude: OFFICE_LNG,
//           source: 'default'
//         };
//       }
      
//       const distance = calculateDistance(
//         userLocation.latitude,
//         userLocation.longitude,
//         OFFICE_LAT,
//         OFFICE_LNG
//       );
      
//       const withinRange = distance <= ALLOWED_RADIUS_METERS;
//       setIsWithinOffice(withinRange);
      
//       // Show detecting message
//       toast.info("🔍 Detecting your location...", {
//         position: "top-center",
//         autoClose: 1500,
//         className: 'custom-toast info-toast'
//       });
      
//       setTimeout(() => {
//         if (withinRange) {
//           setLocationStatus('matched');
//           toast.success("✅ Location verified! You are at office.", {
//             position: "top-center",
//             autoClose: 3000,
//             className: 'custom-toast success-toast'
//           });
//         } else {
//           setLocationStatus('not_matched');
//           toast.warning(`📍 You are ${distance.toFixed(1)}m away from office`, {
//             position: "top-center",
//             autoClose: 4000,
//             className: 'custom-toast warning-toast'
//           });
//         }
        
//         // Show employee location info
//         setTimeout(() => {
//           const locationType = getLocationType(distance);
//           let locationMessage = "";
          
//           switch(locationType) {
//             case 'office':
//               locationMessage = `You are at office (${distance.toFixed(0)}m)`;
//               break;
//             case 'near_office':
//               locationMessage = `Near office (${distance.toFixed(0)}m away)`;
//               break;
//             case 'city':
//               locationMessage = `In city area (${(distance/1000).toFixed(1)}km away)`;
//               break;
//             default:
//               locationMessage = `Away from office (${(distance/1000).toFixed(1)}km)`;
//           }
          
//           if (userLocation.source === 'default') {
//             locationMessage += " (Approximate location)";
//           }
          
//           setEmployeeLocation(locationMessage);
          
//           toast.info(`📍 ${locationMessage}`, {
//             position: "top-center",
//             autoClose: 4000,
//             className: 'custom-toast info-toast'
//           });
//         }, 1000);
        
//       }, 1500);
      
//     } catch (error) {
//       console.error('Location check error:', error);
//       setLocationStatus('error');
//       toast.error("⚠️ Location service unavailable", {
//         position: "top-center",
//         autoClose: 3000,
//         className: 'custom-toast error-toast'
//       });
//     }
  

//   // ... rest of your component remains SAME ...
// };


//   // Check location when component loads
//   useEffect(() => {
//     if (!isPunchedIn) {
//       checkLocation();
//     }
//   }, [isPunchedIn]);

//   // Auto-check every 30 seconds
//   useEffect(() => {
//     if (!isPunchedIn) {
//       const interval = setInterval(checkLocation, 30000);
//       return () => clearInterval(interval);
//     }
//   }, [isPunchedIn]);

//   // Existing functions (unchanged)
//   const calculateProgress = () => Math.min((workingHours / 7) * 100, 100);

//   const getRemainingTime = () => {
//     if (workingHours >= 7) return "Ready to punch out!";
//     const remainingHours = 7 - workingHours;
//     const hours = Math.floor(remainingHours);
//     const minutes = Math.floor((remainingHours - hours) * 60);
    
//     if (hours === 0 && minutes === 0) return "Ready to punch out!";
//     return `Complete ${hours}h ${minutes}m more`;
//   };

//   const getStatusColor = () => {
//     if (!isPunchedIn) return "inactive";
//     if (isIdle) return "idle";
//     return "active";
//   };

//   const getStatusText = () => {
//     if (!isPunchedIn) return "⚪ Not Punched In";
//     if (isIdle) return "🟡 Idle - Tracking Paused";
//     return "🟢 Active Tracking";
//   };

//   // Get location status text
//   const getLocationStatusText = () => {
//     switch(locationStatus) {
//       case 'checking':
//         return "🔍 Detecting your location...";
//       case 'matched':
//         return " Location matched with office";
//       case 'not_matched':
//         return "❌ Not at office location";
//       case 'error':
//         return "⚠️ Location check failed";
//       default:
//         return "📍 Checking location...";
//     }
//   };

//   // Handle punch button click
//   const handlePunchClick = () => {
//     if (!isPunchedIn && !isWithinOffice) {
//       toast.warning("🚫 Cannot Punch In! You must be at office location to punch in.", {
//         position: "top-center",
//         autoClose: 4000,
//         className: 'custom-toast warning-toast'
//       });
//       checkLocation();
//       return;
//     }
//     onPunch();
//   };

//   return (
//     <div className="attendance-tracker-container">
//       <div className={`attendance-tracker-content ${isPunchedIn ? 'punched-in' : ''}`}>
//         <div className="attendance-tracker-header">
//           <h2 className="attendance-tracker-title">⏰ Employee Activity Tracker</h2>
//         </div>

//         <div className="attendance-cards-wrapper">
//           <div className={`attendance-status-card ${getStatusColor()}`}>
//             {/* Current App Info */}
//             {isPunchedIn && (
//               <div className="current-app-info">
//                 <span className="app-icon">💻</span>
//                 <span className="app-text">Using: {currentApp}</span>
//                 {isIdle && <span className="idle-badge">⏸️ IDLE</span>}
//               </div>
//             )}

//             {/* Location Status with Proper Flow */}
//             {!isPunchedIn && (
//               <div className="location-flow-container">
//                 <div className={`location-status-flow ${locationStatus}`}>
//                   <div className="location-status-icon-flow">
//                     {locationStatus === 'checking' && <span className="location-spinner-flow"></span>}
//                     {locationStatus === 'matched' && <span className="matched-icon"></span>}
//                     {locationStatus === 'not_matched' && <span className="not-matched-icon">❌</span>}
//                     {locationStatus === 'error' && <span className="error-icon">⚠️</span>}
//                   </div>
//                   <div className="location-status-text-flow">
//                     {getLocationStatusText()}
//                   </div>
//                 </div>

//                 {/* Employee Location Info */}
//                 {employeeLocation && (
//                   <div className="employee-location-info">
//                     <div className="employee-location-icon">📍</div>
//                     <div className="employee-location-text">
//                       {employeeLocation}
//                     </div>
//                   </div>
//                 )}

//                 {/* Refresh Button */}
//                 <button 
//                   className="refresh-location-flow-btn"
//                   onClick={checkLocation}
//                 >
//                   🔄 Check Location Again
//                 </button>
//               </div>
//             )}

//             <div className="status-header">
//               <h3 className="status-title">
//                 Today's Status:
//                 <span className="status-value">
//                   {getStatusText()}
//                 </span>
//               </h3>
//             </div>

//             <div className="working-time-display">
//               <div className="time-value">
//                 {workingTime}
//                 {isIdle && <span className="paused-indicator"> ⏸️</span>}
//               </div>
//               <p className="time-label">
//                 {isPunchedIn 
//                   ? (isIdle 
//                       ? "⏸️ Tracking Paused (No Activity)" 
//                       : "🟢 Active Working Time") 
//                   : "Working Hours Today"
//                 }
//               </p>
//             </div>

//             {isPunchedIn && (
//               <div className="progress-section">
//                 <div className="progress-bar">
//                   <div
//                     className="progress-fill"
//                     style={{ 
//                       width: `${calculateProgress()}%`,
//                       backgroundColor: isIdle ? '#f59e0b' : '#10b981'
//                     }}
//                   ></div>
//                 </div>

//                 <div className="progress-info">
//                   <span className="progress-text">
//                     {isIdle ? "⏸️ Waiting for activity..." : getRemainingTime()}
//                   </span>
//                   <span className="progress-percentage">
//                     {calculateProgress().toFixed(1)}%
//                   </span>
//                 </div>
//               </div>
//             )}

//             <button
//               className={`punch-button ${
//                 isPunchedIn ? "punch-out" : "punch-in"
//               } ${loading ? "loading" : ""} ${(!isPunchedIn && !isWithinOffice) ? "disabled-punch" : ""}`}
//               onClick={handlePunchClick}
//               disabled={loading || (isPunchedIn && !canLogout) || (!isPunchedIn && !isWithinOffice)}
//             >
//               {loading ? (
//                 <>
//                   <span className="button-spinner"></span> Processing...
//                 </>
//               ) : isPunchedIn ? (
//                 canLogout ? "🔴 Stop Tracking & Punch Out" : `⏳ ${getRemainingTime()}`
//               ) : (
//                 isWithinOffice ? "🟢 Start Tracking & Punch In" : "📍 Wait - Check Location"
//               )}
//             </button>

//             <div className="location-info">
//               <span className="location-icon">📍</span>
//               <span className="location-text">
//                 {isPunchedIn 
//                   ? "Location tracking active" 
//                   : "ACORE IT HUB PVT LTD , Vijay Nagar, Indore"
//                 }
//               </span>
//             </div>
//           </div>

//           {isPunchedIn && (
//             <div className="tracking-details">
//               <h4 className="details-title">📊 Live Tracking Details</h4>
//               <div className="details-grid">
//                 <div className="detail-item">
//                   <span className="detail-label">Current Application:</span>
//                   <span className="detail-value">{currentApp}</span>
//                 </div>
//                 <div className="detail-item">
//                   <span className="detail-label">Tracking Status:</span>
//                   <span className="detail-value">
//                     {isIdle ? "⏸️ PAUSED" : "🟢 ACTIVE"}
//                   </span>
//                 </div>
//                 <div className="detail-item">
//                   <span className="detail-label">Total Time:</span>
//                   <span className="detail-value">{workingHours.toFixed(2)} hours</span>
//                 </div>
//                 <div className="detail-item">
//                   <span className="detail-label">Required Time:</span>
//                   <span className="detail-value">7 hours</span>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AttendanceModal;






// import React, { useState, useEffect } from "react";
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import "./AttendanceModal.css";

// // Office coordinates - Vijay Nagar, Indore
// const OFFICE_LAT = 22.7494444;
// const OFFICE_LNG = 75.8991667;
// const ALLOWED_RADIUS_METERS = 100;

// const AttendanceModal = ({ attendance, onPunch }) => {
//   const { isPunchedIn, workingHours, workingTime, canLogout, loading, isIdle, currentApp } = attendance;
//   const [isWithinOffice, setIsWithinOffice] = useState(false);
//   const [locationStatus, setLocationStatus] = useState('checking');
//   const [employeeLocation, setEmployeeLocation] = useState('');

//   // Calculate distance
//   const calculateDistance = (lat1, lon1, lat2, lon2) => {
//     const R = 6371000;
//     const φ1 = lat1 * Math.PI / 180;
//     const φ2 = lat2 * Math.PI / 180;
//     const Δφ = (lat2 - lat1) * Math.PI / 180;
//     const Δλ = (lon2 - lon1) * Math.PI / 180;

//     const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
//               Math.cos(φ1) * Math.cos(φ2) *
//               Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

//     return R * c;
//   };

//   // ✅ SIMPLE & WORKING Location Check
//   const checkLocation = async () => {
//     setLocationStatus('checking');
//     setEmployeeLocation('');
    
//     try {
//       // Show detecting message
//       toast.info("🔍 Detecting your location...", {
//         position: "top-center",
//         autoClose: 1500,
//         className: 'custom-toast info-toast'
//       });

//       let location = null;
      
//       // Try Electron API first
//       if (window.electronAPI && window.electronAPI.getCurrentLocation) {
//         const result = await window.electronAPI.getCurrentLocation();
//         if (result.success) {
//           location = result;
//           console.log('Location from Electron API:', location);
//         }
//       }
      
//       // If Electron API fails, try direct browser geolocation
//       if (!location && navigator.geolocation) {
//         location = await new Promise((resolve) => {
//           navigator.geolocation.getCurrentPosition(
//             (position) => {
//               resolve({
//                 success: true,
//                 latitude: position.coords.latitude,
//                 longitude: position.coords.longitude,
//                 accuracy: position.coords.accuracy
//               });
//             },
//             (error) => {
//               console.log('Browser geolocation error:', error);
//               resolve(null);
//             },
//             {
//               enableHighAccuracy: true,
//               timeout: 10000,
//               maximumAge: 0
//             }
//           );
//         });
//       }
      
//       // If still no location, use default
//       if (!location) {
//         location = {
//           success: true,
//           latitude: OFFICE_LAT,
//           longitude: OFFICE_LNG,
//           accuracy: 100000,
//           source: 'default'
//         };
//       }
      
//       // Calculate distance
//       const distance = calculateDistance(
//         location.latitude,
//         location.longitude,
//         OFFICE_LAT,
//         OFFICE_LNG
//       );
      
//       const withinRange = distance <= ALLOWED_RADIUS_METERS;
//       setIsWithinOffice(withinRange);
      
//       // Update status
//       setTimeout(() => {
//         if (withinRange) {
//           setLocationStatus('matched');
//           toast.success("✅ Location verified! You can punch in.", {
//             position: "top-center",
//             autoClose: 3000,
//             className: 'custom-toast success-toast'
//           });
//         } else {
//           setLocationStatus('not_matched');
//           toast.error(`❌ You are ${distance.toFixed(0)}m away from office`, {
//             position: "top-center",
//             autoClose: 4000,
//             className: 'custom-toast error-toast'
//           });
//         }
        
//         // Set location message (SIMPLE)
//         setEmployeeLocation(withinRange ? "At office location" : "Not at office location");
        
//       }, 1500);
      
//     } catch (error) {
//       console.error('Location check error:', error);
//       setLocationStatus('error');
//       toast.error("⚠️ Unable to check location", {
//         position: "top-center",
//         autoClose: 3000,
//         className: 'custom-toast error-toast'
//       });
//     }
//   };

//   // Auto-check on component load
//   useEffect(() => {
//     if (!isPunchedIn) {
//       checkLocation();
//     }
//   }, [isPunchedIn]);

//   // Auto-check every 30 seconds
//   useEffect(() => {
//     if (!isPunchedIn) {
//       const interval = setInterval(checkLocation, 30000);
//       return () => clearInterval(interval);
//     }
//   }, [isPunchedIn]);

//   // ✅ EXISTING FUNCTIONS (ORIGINAL)
//   const calculateProgress = () => Math.min((workingHours / 7) * 100, 100);

//   const getRemainingTime = () => {
//     if (workingHours >= 7) return "Ready to punch out!";
//     const remainingHours = 7 - workingHours;
//     const hours = Math.floor(remainingHours);
//     const minutes = Math.floor((remainingHours - hours) * 60);
    
//     if (hours === 0 && minutes === 0) return "Ready to punch out!";
//     return `Complete ${hours}h ${minutes}m more`;
//   };

//   const getStatusColor = () => {
//     if (!isPunchedIn) return "inactive";
//     if (isIdle) return "idle";
//     return "active";
//   };

//   const getStatusText = () => {
//     if (!isPunchedIn) return "⚪ Not Punched In";
//     if (isIdle) return "🟡 Idle - Tracking Paused";
//     return "🟢 Active Tracking";
//   };

//   const getLocationStatusText = () => {
//     switch(locationStatus) {
//       case 'checking':
//         return "🔍 Checking location...";
//       case 'matched':
//         return "✅ Location matched";
//       case 'not_matched':
//         return "❌ Not at office";
//       case 'error':
//         return "⚠️ Location error";
//       default:
//         return "📍 Checking location...";
//     }
//   };

//   // Handle punch button click
//   const handlePunchClick = () => {
//     if (!isPunchedIn && !isWithinOffice) {
//       toast.warning("🚫 Cannot Punch In! You must be at office location.", {
//         position: "top-center",
//         autoClose: 4000,
//         className: 'custom-toast warning-toast'
//       });
//       checkLocation();
//       return;
//     }
//     onPunch();
//   };

//    if (!isOpen) return null;

//   return (
//     <div className="attendance-tracker-container">
//       <div className={`attendance-tracker-content ${isPunchedIn ? 'punched-in' : ''}`}>
//         <div className="attendance-tracker-header">
//           <h2 className="attendance-tracker-title">⏰ Employee Activity Tracker</h2>
//         </div>

//         <div className="attendance-cards-wrapper">
//           <div className={`attendance-status-card ${getStatusColor()}`}>
            
//             {/* ✅ CURRENT APP & IDLE STATUS - ORIGINAL */}
//             {isPunchedIn && (
//               <div className="current-app-info">
//                 <span className="app-icon">💻</span>
//                 <span className="app-text">Using: {currentApp}</span>
//                 {isIdle && <span className="idle-badge">⏸️ IDLE</span>}
//               </div>
//             )}

//             {/* ✅ SIMPLE LOCATION STATUS - ORIGINAL STYLE */}
//             {!isPunchedIn && (
//               <div className="simple-location-status">
//                 <div className={`location-indicator ${locationStatus}`}>
//                   <span className="location-icon">📍</span>
//                   <span className="location-text">{getLocationStatusText()}</span>
//                 </div>
                
//                 {employeeLocation && (
//                   <div className="employee-location-simple">
//                     <span className="location-message">{employeeLocation}</span>
//                   </div>
//                 )}

//                 <button 
//                   className="simple-refresh-btn"
//                   onClick={checkLocation}
//                 >
//                   🔄 Check Again
//                 </button>
//               </div>
//             )}

//             <div className="status-header">
//               <h3 className="status-title">
//                 Today's Status:
//                 <span className="status-value">
//                   {getStatusText()}
//                 </span>
//               </h3>
//             </div>

//             <div className="working-time-display">
//               <div className="time-value">
//                 {workingTime}
//                 {isIdle && <span className="paused-indicator"> ⏸️</span>}
//               </div>
//               <p className="time-label">
//                 {isPunchedIn 
//                   ? (isIdle 
//                       ? "⏸️ Tracking Paused (No Activity)" 
//                       : "🟢 Active Working Time") 
//                   : "Working Hours Today"
//                 }
//               </p>
//             </div>

//             {isPunchedIn && (
//               <div className="progress-section">
//                 <div className="A-progress-bar">
//                   <div
//                     className="progress-fill"
//                     style={{ 
//                       width: `${calculateProgress()}%`,
//                       backgroundColor: isIdle ? '#f59e0b' : '#10b981'
//                     }}
//                   ></div>
//                 </div>

//                 <div className="progress-info">
//                   <span className="progress-text">
//                     {isIdle ? "⏸️ Waiting for activity..." : getRemainingTime()}
//                   </span>
//                   <span className="progress-percentage">
//                     {calculateProgress().toFixed(1)}%
//                   </span>
//                 </div>
//               </div>
//             )}

//             <button
//               className={`punch-button ${
//                 isPunchedIn ? "punch-out" : "punch-in"
//               } ${loading ? "loading" : ""} ${(!isPunchedIn && !isWithinOffice) ? "disabled-punch" : ""}`}
//               onClick={handlePunchClick}
//               disabled={loading || (isPunchedIn && !canLogout) || (!isPunchedIn && !isWithinOffice)}
//             >
//               {loading ? (
//                 <>
//                   <span className="button-spinner"></span> Processing...
//                 </>
//               ) : isPunchedIn ? (
//                 canLogout ? "🔴 Stop Tracking & Punch Out" : `⏳ ${getRemainingTime()}`
//               ) : (
//                 isWithinOffice ? "🟢 Start Tracking & Punch In" : "📍 Wait - Check Location"
//               )}
//             </button>

//             <div className="location-info">
//               <span className="location-icon">📍</span>
//               <span className="location-text">
//                 {isPunchedIn 
//                   ? "Location & Activity tracking active" 
//                   : "ACORE IT HUB PVT LTD , Vijay Nagar, Indore"
//                 }
//               </span>
//             </div>
//           </div>

//           {isPunchedIn && (
//             <div className="tracking-details">
//               <h4 className="details-title">📊 Live Tracking Details</h4>
//               <div className="details-grid">
//                 <div className="detail-item">
//                   <span className="detail-label">Current Application:</span>
//                   <span className="detail-value">{currentApp}</span>
//                 </div>
//                 <div className="detail-item">
//                   <span className="detail-label">Tracking Status:</span>
//                   <span className="detail-value">
//                     {isIdle ? "⏸️ PAUSED" : "🟢 ACTIVE"}
//                   </span>
//                 </div>
//                 <div className="detail-item">
//                   <span className="detail-label">Total Time:</span>
//                   <span className="detail-value">{workingHours.toFixed(2)} hours</span>
//                 </div>
//                 <div className="detail-item">
//                   <span className="detail-label">Required Time:</span>
//                   <span className="detail-value">7 hours</span>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AttendanceModal;



// ye proper kam karta he 








import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./AttendanceModal.css";

// Office coordinates - Vijay Nagar, Indore
const OFFICE_LAT = 22.7494444;
const OFFICE_LNG = 75.8991667;
const ALLOWED_RADIUS_METERS = 100;

// ✅ CORRECTED: Added isOpen and onClose props
const AttendanceModal = ({ isOpen, onClose, attendance, onPunch }) => {
  // ✅ IMPORTANT: If modal is not open, return null
  if (!isOpen) return null;

  const { isPunchedIn, workingHours, workingTime, canLogout, loading, isIdle, currentApp } = attendance;
  const [isWithinOffice, setIsWithinOffice] = useState(false);
  const [locationStatus, setLocationStatus] = useState('checking');
  const [employeeLocation, setEmployeeLocation] = useState('');

  // Calculate distance
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371000;
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  // ✅ SIMPLE & WORKING Location Check
  const checkLocation = async () => {
    setLocationStatus('checking');
    setEmployeeLocation('');
    
    try {
      // Show detecting message
      toast.info("🔍 Detecting your location...", {
        position: "top-center",
        autoClose: 1500,
        className: 'custom-toast info-toast'
      });

      let location = null;
      
      // Try Electron API first
      if (window.electronAPI && window.electronAPI.getCurrentLocation) {
        const result = await window.electronAPI.getCurrentLocation();
        if (result.success) {
          location = result;
          console.log('Location from Electron API:', location);
        }
      }
      
      // If Electron API fails, try direct browser geolocation
      if (!location && navigator.geolocation) {
        location = await new Promise((resolve) => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              resolve({
                success: true,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                accuracy: position.coords.accuracy
              });
            },
            (error) => {
              console.log('Browser geolocation error:', error);
              resolve(null);
            },
            {
              enableHighAccuracy: true,
              timeout: 10000,
              maximumAge: 0
            }
          );
        });
      }
      
      // If still no location, use default
      if (!location) {
        location = {
          success: true,
          latitude: OFFICE_LAT,
          longitude: OFFICE_LNG,
          accuracy: 100000,
          source: 'default'
        };
      }
      
      // Calculate distance
      const distance = calculateDistance(
        location.latitude,
        location.longitude,
        OFFICE_LAT,
        OFFICE_LNG
      );
      
      const withinRange = distance <= ALLOWED_RADIUS_METERS;
      setIsWithinOffice(withinRange);
      
      // Update status
      setTimeout(() => {
        if (withinRange) {
          setLocationStatus('matched');
          toast.success("✅ Location verified! You can punch in.", {
            position: "top-center",
            autoClose: 3000,
            className: 'custom-toast success-toast'
          });
        } else {
          setLocationStatus('not_matched');
          toast.error(`❌ You are ${distance.toFixed(0)}m away from office`, {
            position: "top-center",
            autoClose: 4000,
            className: 'custom-toast error-toast'
          });
        }
        
        // Set location message (SIMPLE)
        setEmployeeLocation(withinRange ? "At office location" : "Not at office location");
        
      }, 1500);
      
    } catch (error) {
      console.error('Location check error:', error);
      setLocationStatus('error');
      toast.error("⚠️ Unable to check location", {
        position: "top-center",
        autoClose: 3000,
        className: 'custom-toast error-toast'
      });
    }
  };

  // Auto-check on component load
  useEffect(() => {
    if (!isPunchedIn) {
      checkLocation();
    }
  }, [isPunchedIn]);

  // Auto-check every 30 seconds
  useEffect(() => {
    if (!isPunchedIn) {
      const interval = setInterval(checkLocation, 30000);
      return () => clearInterval(interval);
    }
  }, [isPunchedIn]);

  // ✅ EXISTING FUNCTIONS (ORIGINAL)
  const calculateProgress = () => Math.min((workingHours / 7) * 100, 100);

  const getRemainingTime = () => {
    if (workingHours >= 7) return "Ready to punch out!";
    const remainingHours = 7 - workingHours;
    const hours = Math.floor(remainingHours);
    const minutes = Math.floor((remainingHours - hours) * 60);
    
    if (hours === 0 && minutes === 0) return "Ready to punch out!";
    return `Complete ${hours}h ${minutes}m more`;
  };

  const getStatusColor = () => {
    if (!isPunchedIn) return "inactive";
    if (isIdle) return "idle";
    return "active";
  };

  const getStatusText = () => {
    if (!isPunchedIn) return "⚪ Not Punched In";
    if (isIdle) return "🟡 Idle - Tracking Paused";
    return "🟢 Active Tracking";
  };

  const getLocationStatusText = () => {
    switch(locationStatus) {
      case 'checking':
        return "🔍 Checking location...";
      case 'matched':
        return "✅ Location matched";
      case 'not_matched':
        return "❌ Not at office";
      case 'error':
        return "⚠️ Location error";
      default:
        return "📍 Checking location...";
    }
  };

  // Handle punch button click
  const handlePunchClick = () => {
    if (!isPunchedIn && !isWithinOffice) {
      toast.warning("🚫 Cannot Punch In! You must be at office location.", {
        position: "top-center",
        autoClose: 4000,
        className: 'custom-toast warning-toast'
      });
      checkLocation();
      return;
    }
    onPunch();
  };

  return (
    <div className="attendance-modal-overlay" onClick={onClose}>
      <div className="attendance-modal-content" onClick={(e) => e.stopPropagation()}>
        
        {/* ✅ MODAL HEADER */}
        <div className="modal-header">
          <h2>⏰ Attendance Tracker</h2>
          <button className="close-modal" onClick={onClose}>✕</button>
        </div>

        <div className="attendance-tracker-container">
          <div className={`attendance-tracker-content ${isPunchedIn ? 'punched-in' : ''}`}>
            <div className="attendance-tracker-header">
              <h2 className="attendance-tracker-title">⏰ Employee Activity Tracker</h2>
            </div>

            <div className="attendance-cards-wrapper">
              <div className={`attendance-status-card ${getStatusColor()}`}>
                
                {/* ✅ CURRENT APP & IDLE STATUS */}
                {isPunchedIn && (
                  <div className="current-app-info">
                    <span className="app-icon">💻</span>
                    <span className="app-text">Using: {currentApp}</span>
                    {isIdle && <span className="idle-badge">⏸️ IDLE</span>}
                  </div>
                )}

                {/* ✅ SIMPLE LOCATION STATUS */}
                {!isPunchedIn && (
                  <div className="simple-location-status">
                    <div className={`location-indicator ${locationStatus}`}>
                      <span className="location-icon">📍</span>
                      <span className="location-text">{getLocationStatusText()}</span>
                    </div>
                    
                    {employeeLocation && (
                      <div className="employee-location-simple">
                        <span className="location-message">{employeeLocation}</span>
                      </div>
                    )}

                    <button 
                      className="simple-refresh-btn"
                      onClick={checkLocation}
                    >
                      🔄 Check Again
                    </button>
                  </div>
                )}

                <div className="status-header">
                  <h3 className="status-title">
                    Today's Status:
                    <span className="status-value">
                      {getStatusText()}
                    </span>
                  </h3>
                </div>

                <div className="working-time-display">
                  <div className="time-value">
                    {workingTime}
                    {isIdle && <span className="paused-indicator"> ⏸️</span>}
                  </div>
                  <p className="time-label">
                    {isPunchedIn 
                      ? (isIdle 
                          ? "⏸️ Tracking Paused (No Activity)" 
                          : "🟢 Active Working Time") 
                      : "Working Hours Today"
                    }
                  </p>
                </div>

                {isPunchedIn && (
                  <div className="progress-section">
                    <div className="A-progress-bar">
                      <div
                        className="progress-fill"
                        style={{ 
                          width: `${calculateProgress()}%`,
                          backgroundColor: isIdle ? '#f59e0b' : '#10b981'
                        }}
                      ></div>
                    </div>

                    <div className="progress-info">
                      <span className="progress-text">
                        {isIdle ? "⏸️ Waiting for activity..." : getRemainingTime()}
                      </span>
                      <span className="progress-percentage">
                        {calculateProgress().toFixed(1)}%
                      </span>
                    </div>
                  </div>
                )}

                <button
                  className={`punch-button ${
                    isPunchedIn ? "punch-out" : "punch-in"
                  } ${loading ? "loading" : ""} ${(!isPunchedIn && !isWithinOffice) ? "disabled-punch" : ""}`}
                  onClick={handlePunchClick}
                  disabled={loading || (isPunchedIn && !canLogout) || (!isPunchedIn && !isWithinOffice)}
                >
                  {loading ? (
                    <>
                      <span className="button-spinner"></span> Processing...
                    </>
                  ) : isPunchedIn ? (
                    canLogout ? "🔴 Stop Tracking & Punch Out" : `⏳ ${getRemainingTime()}`
                  ) : (
                    isWithinOffice ? "🟢 Start Tracking & Punch In" : "📍 Wait - Check Location"
                  )}
                </button>

                <div className="location-info">
                  <span className="location-icon">📍</span>
                  <span className="location-text">
                    {isPunchedIn 
                      ? "Location & Activity tracking active" 
                      : "ACORE IT HUB PVT LTD , Vijay Nagar, Indore"
                    }
                  </span>
                </div>
              </div>

              {isPunchedIn && (
                <div className="tracking-details">
                  <h4 className="details-title">📊 Live Tracking Details</h4>
                  <div className="details-grid">
                    <div className="detail-item">
                      <span className="detail-label">Current Application:</span>
                      <span className="detail-value">{currentApp}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Tracking Status:</span>
                      <span className="detail-value">
                        {isIdle ? "⏸️ PAUSED" : "🟢 ACTIVE"}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Total Time:</span>
                      <span className="detail-value">{workingHours.toFixed(2)} hours</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Required Time:</span>
                      <span className="detail-value">7 hours</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceModal;