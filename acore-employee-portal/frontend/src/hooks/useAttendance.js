// import { useState, useEffect, useRef } from 'react';

// export const useAttendance = () => {
//   const [isPunchedIn, setIsPunchedIn] = useState(false);
//   const [punchInTime, setPunchInTime] = useState(null);
//   const [workingHours, setWorkingHours] = useState(0);
//   const [workingTime, setWorkingTime] = useState('00:00:00');
//   const [canLogout, setCanLogout] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const intervalRef = useRef(null);

//   const handlePunch = async () => {
//     setLoading(true);
    
//     if (!isPunchedIn) {
//       // Punch In
//       try {
//         // Simulate API call
//         await new Promise(resolve => setTimeout(resolve, 1000));
//         setIsPunchedIn(true);
//         setPunchInTime(new Date());
//         setCanLogout(false);
//         setLoading(false);
//         return { success: true, action: 'in' };
//       } catch (error) {
//         setLoading(false);
//         return { success: false, error: error.message };
//       }
//     } else {
//       // Punch Out
//       if (workingHours >= 7) {
//         try {
//           await new Promise(resolve => setTimeout(resolve, 1000));
//           setIsPunchedIn(false);
//           setPunchInTime(null);
//           setWorkingHours(0);
//           setWorkingTime('00:00:00');
//           setCanLogout(false);
//           setLoading(false);
//           return { success: true, action: 'out' };
//         } catch (error) {
//           setLoading(false);
//           return { success: false, error: error.message };
//         }
//       } else {
//         setLoading(false);
//         return { 
//           success: false, 
//           error: `Complete ${(7 - workingHours).toFixed(2)} more hours before punching out` 
//         };
//       }
//     }
//   };

//   useEffect(() => {
//     if (isPunchedIn && punchInTime) {
//       intervalRef.current = setInterval(() => {
//         const now = new Date();
//         const diff = now - punchInTime;
//         const hours = diff / (1000 * 60 * 60);
//         setWorkingHours(hours);
        
//         // Update working time display
//         const totalSeconds = Math.floor(diff / 1000);
//         const hoursFormatted = Math.floor(totalSeconds / 3600);
//         const minutesFormatted = Math.floor((totalSeconds % 3600) / 60);
//         const secondsFormatted = totalSeconds % 60;
        
//         setWorkingTime(
//           `${String(hoursFormatted).padStart(2, '0')}:${String(minutesFormatted).padStart(2, '0')}:${String(secondsFormatted).padStart(2, '0')}`
//         );
        
//         // Check if 7 hours completed
//         if (hours >= 7) {
//           setCanLogout(true);
//         }
//       }, 1000);
//     } else {
//       if (intervalRef.current) {
//         clearInterval(intervalRef.current);
//       }
//     }

//     return () => {
//       if (intervalRef.current) {
//         clearInterval(intervalRef.current);
//       }
//     };
//   }, [isPunchedIn, punchInTime]);

//   return {
//     isPunchedIn,
//     workingHours,
//     workingTime,
//     canLogout,
//     loading,
//     handlePunch
//   };
// };




// import { useState, useEffect } from 'react';
// import useActivityTracker from './useActivityTracker';

// const useAttendance = () => {
//   const [attendance, setAttendance] = useState({
//     isPunchedIn: false,
//     workingHours: 0,
//     workingTime: '00:00',
//     canLogout: false,
//     loading: false,
//     lastPunchIn: null,
//     location: null
//   });

//   const {
//     trackingData,
//     startTracking,
//     stopTracking,
//     getCompletedHours,
//     canLogout,
//     getFormattedTime
//   } = useActivityTracker();

//   // Get user's current location
//   const getCurrentLocation = () => {
//     return new Promise((resolve, reject) => {
//       if (!navigator.geolocation) {
//         reject(new Error('Geolocation is not supported'));
//         return;
//       }

//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           resolve({
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude,
//             timestamp: new Date().toISOString()
//           });
//         },
//         (error) => {
//           reject(error);
//         },
//         {
//           enableHighAccuracy: true,
//           timeout: 10000,
//           maximumAge: 60000
//         }
//       );
//     });
//   };

//   // Punch in function
//   const punchIn = async () => {
//     setAttendance(prev => ({ ...prev, loading: true }));

//     try {
//       // Get location first
//       const location = await getCurrentLocation();
      
//       // Start activity tracking
//       const trackingStarted = await startTracking();
      
//       if (trackingStarted) {
//         setAttendance(prev => ({
//           ...prev,
//           isPunchedIn: true,
//           loading: false,
//           lastPunchIn: new Date().toISOString(),
//           location: location,
//           workingHours: 0,
//           workingTime: '00:00',
//           canLogout: false
//         }));

//         // Save to localStorage or send to backend
//         localStorage.setItem('punchInTime', new Date().toISOString());
//         localStorage.setItem('punchInLocation', JSON.stringify(location));
        
//         return { success: true, location };
//       } else {
//         throw new Error('Failed to start activity tracking');
//       }
//     } catch (error) {
//       console.error('Punch in failed:', error);
//       setAttendance(prev => ({ ...prev, loading: false }));
//       return { success: false, error: error.message };
//     }
//   };

//   // Punch out function
//   const punchOut = async () => {
//     setAttendance(prev => ({ ...prev, loading: true }));

//     try {
//       // Stop activity tracking
//       const trackingResult = await stopTracking();
      
//       if (trackingResult && trackingResult.success) {
//         const completedHours = getCompletedHours();
        
//         setAttendance(prev => ({
//           ...prev,
//           isPunchedIn: false,
//           loading: false,
//           workingHours: completedHours,
//           workingTime: getFormattedTime(),
//           canLogout: false
//         }));

//         // Clear localStorage
//         localStorage.removeItem('punchInTime');
//         localStorage.removeItem('punchInLocation');
        
//         return { 
//           success: true, 
//           totalHours: completedHours,
//           trackingData: trackingResult.data
//         };
//       } else {
//         throw new Error('Failed to stop activity tracking');
//       }
//     } catch (error) {
//       console.error('Punch out failed:', error);
//       setAttendance(prev => ({ ...prev, loading: false }));
//       return { success: false, error: error.message };
//     }
//   };

//   // Update attendance data when tracking data changes
//   useEffect(() => {
//     if (trackingData.isTracking) {
//       const completedHours = getCompletedHours();
//       const canLogoutNow = canLogout();

//       setAttendance(prev => ({
//         ...prev,
//         workingHours: completedHours,
//         workingTime: getFormattedTime(),
//         canLogout: canLogoutNow
//       }));
//     }
//   }, [trackingData, getCompletedHours, canLogout, getFormattedTime]);

//   // Check for existing punch in on component mount
//   useEffect(() => {
//     const punchInTime = localStorage.getItem('punchInTime');
//     if (punchInTime) {
//       // If there's a punch in time in localStorage, resume tracking
//       setAttendance(prev => ({
//         ...prev,
//         isPunchedIn: true,
//         lastPunchIn: punchInTime
//       }));
      
//       // Resume tracking
//       startTracking();
//     }
//   }, [startTracking]);

//   return {
//     attendance,
//     punchIn,
//     punchOut,
//     trackingData
//   };
// };

// export default useAttendance;



// import { useState, useEffect } from 'react';

// const useAttendance = () => {
//   const [attendance, setAttendance] = useState({
//     isPunchedIn: false,
//     workingHours: 0,
//     workingTime: '00:00',
//     canLogout: false,
//     loading: false
//   });

//   const [startTime, setStartTime] = useState(null);
//   const [activeTime, setActiveTime] = useState(0);

//   // Simple punch in function
//   const punchIn = async () => {
//     setAttendance(prev => ({ ...prev, loading: true }));
    
//     try {
//       // Get location (optional)
//       const location = await getCurrentLocation();
      
//       // Start tracking
//       setStartTime(Date.now());
//       setActiveTime(0);
      
//       setAttendance({
//         isPunchedIn: true,
//         workingHours: 0,
//         workingTime: '00:00',
//         canLogout: false,
//         loading: false
//       });

//       console.log('Punch in successful');
//       return { success: true, location };
      
//     } catch (error) {
//       setAttendance(prev => ({ ...prev, loading: false }));
//       return { success: false, error: error.message };
//     }
//   };

//   // Simple punch out function
//   const punchOut = async () => {
//     setAttendance(prev => ({ ...prev, loading: true }));
    
//     try {
//       const totalHours = activeTime / (1000 * 60 * 60);
      
//       setAttendance({
//         isPunchedIn: false,
//         workingHours: totalHours,
//         workingTime: formatTime(totalHours),
//         canLogout: false,
//         loading: false
//       });

//       setStartTime(null);
//       setActiveTime(0);
      
//       console.log('Punch out successful');
//       return { success: true, totalHours };
      
//     } catch (error) {
//       setAttendance(prev => ({ ...prev, loading: false }));
//       return { success: false, error: error.message };
//     }
//   };

//   // Get location (simplified)
//   const getCurrentLocation = () => {
//     return new Promise((resolve) => {
//       if (!navigator.geolocation) {
//         resolve({ latitude: null, longitude: null });
//         return;
//       }

//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           resolve({
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude
//           });
//         },
//         () => {
//           resolve({ latitude: null, longitude: null });
//         }
//       );
//     });
//   };

//   // Format time
//   const formatTime = (hours) => {
//     const totalMinutes = Math.floor(hours * 60);
//     const hrs = Math.floor(totalMinutes / 60);
//     const mins = totalMinutes % 60;
//     return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
//   };

//   // Track active time
//   useEffect(() => {
//     let interval;
    
//     if (attendance.isPunchedIn && startTime) {
//       interval = setInterval(() => {
//         const currentTime = Date.now();
//         const elapsed = currentTime - startTime;
//         setActiveTime(elapsed);
        
//         const hours = elapsed / (1000 * 60 * 60);
//         const canLogoutNow = hours >= 7;
        
//         setAttendance(prev => ({
//           ...prev,
//           workingHours: hours,
//           workingTime: formatTime(hours),
//           canLogout: canLogoutNow
//         }));
//       }, 1000);
//     }
    
//     return () => clearInterval(interval);
//   }, [attendance.isPunchedIn, startTime]);

//   return {
//     attendance,
//     punchIn,
//     punchOut
//   };
// };

// export default useAttendance;









// import { useState, useEffect } from 'react';

// const useAttendance = () => {
//   const [attendance, setAttendance] = useState({
//     isPunchedIn: false,
//     workingHours: 0,
//     workingTime: '00:00',
//     canLogout: false,
//     loading: false,
//     lastPunchIn: null,
//     location: null
//   });

//   const [startTime, setStartTime] = useState(null);

//   // Get user's current location
//   const getCurrentLocation = () => {
//     return new Promise((resolve) => {
//       if (!navigator.geolocation) {
//         resolve({ latitude: null, longitude: null });
//         return;
//       }

//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           resolve({
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude,
//             timestamp: new Date().toISOString()
//           });
//         },
//         () => {
//           resolve({ latitude: null, longitude: null });
//         },
//         {
//           enableHighAccuracy: false,
//           timeout: 10000,
//           maximumAge: 60000
//         }
//       );
//     });
//   };

//   // Punch in function
//   const punchIn = async () => {
//     setAttendance(prev => ({ ...prev, loading: true }));

//     try {
//       const location = await getCurrentLocation();
//       const now = Date.now();
      
//       setStartTime(now);
//       setAttendance({
//         isPunchedIn: true,
//         workingHours: 0,
//         workingTime: '00:00',
//         canLogout: false,
//         loading: false,
//         lastPunchIn: new Date().toISOString(),
//         location: location
//       });

//       // Save to localStorage
//       localStorage.setItem('punchInTime', now.toString());
//       localStorage.setItem('punchInLocation', JSON.stringify(location));
      
//       return { success: true, location };
//     } catch (error) {
//       setAttendance(prev => ({ ...prev, loading: false }));
//       return { success: false, error: error.message };
//     }
//   };

//   // Punch out function
//   const punchOut = async () => {
//     setAttendance(prev => ({ ...prev, loading: true }));

//     try {
//       const currentTime = Date.now();
//       const elapsedTime = startTime ? (currentTime - startTime) : 0;
//       const totalHours = elapsedTime / (1000 * 60 * 60);
      
//       setAttendance({
//         isPunchedIn: false,
//         workingHours: totalHours,
//         workingTime: formatTime(totalHours),
//         canLogout: false,
//         loading: false,
//         lastPunchIn: null,
//         location: null
//       });

//       setStartTime(null);

//       // Clear localStorage
//       localStorage.removeItem('punchInTime');
//       localStorage.removeItem('punchInLocation');
      
//       return { success: true, totalHours };
//     } catch (error) {
//       setAttendance(prev => ({ ...prev, loading: false }));
//       return { success: false, error: error.message };
//     }
//   };

//   // Format time
//   const formatTime = (hours) => {
//     const totalSeconds = Math.floor(hours * 3600);
//     const hrs = Math.floor(totalSeconds / 3600);
//     const mins = Math.floor((totalSeconds % 3600) / 60);
//     return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
//   };

//   // Track time when punched in
//   useEffect(() => {
//     let interval;
    
//     if (attendance.isPunchedIn && startTime) {
//       interval = setInterval(() => {
//         const currentTime = Date.now();
//         const elapsedTime = currentTime - startTime;
//         const hours = elapsedTime / (1000 * 60 * 60);
//         const canLogoutNow = hours >= 7;
        
//         setAttendance(prev => ({
//           ...prev,
//           workingHours: hours,
//           workingTime: formatTime(hours),
//           canLogout: canLogoutNow
//         }));
//       }, 1000);
//     }
    
//     return () => clearInterval(interval);
//   }, [attendance.isPunchedIn, startTime]);

//   // Check for existing punch in on component mount
//   useEffect(() => {
//     const punchInTime = localStorage.getItem('punchInTime');
//     if (punchInTime) {
//       const time = parseInt(punchInTime);
//       const currentTime = Date.now();
//       const elapsedTime = currentTime - time;
      
//       // Only resume if punch in was within last 24 hours
//       if (elapsedTime < 24 * 60 * 60 * 1000) {
//         setStartTime(time);
//         setAttendance(prev => ({
//           ...prev,
//           isPunchedIn: true,
//           lastPunchIn: new Date(time).toISOString()
//         }));
//       } else {
//         // Clear expired punch in
//         localStorage.removeItem('punchInTime');
//         localStorage.removeItem('punchInLocation');
//       }
//     }
//   }, []);

//   return {
//     attendance,
//     punchIn,
//     punchOut
//   };
// };

// export default useAttendance;












// import { useState, useEffect } from 'react';

// const useAttendance = () => {
//   const [attendance, setAttendance] = useState({
//     isPunchedIn: false,
//     workingHours: 0,
//     workingTime: '00:00:00', // ✅ Seconds add kiye
//     canLogout: false,
//     loading: false,
//     lastPunchIn: null,
//     location: null
//   });

//   const [startTime, setStartTime] = useState(null);
//   const [elapsedSeconds, setElapsedSeconds] = useState(0);

//   // Get user's current location
//   const getCurrentLocation = () => {
//     return new Promise((resolve) => {
//       if (!navigator.geolocation) {
//         resolve({ latitude: null, longitude: null });
//         return;
//       }

//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           resolve({
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude,
//             timestamp: new Date().toISOString()
//           });
//         },
//         () => {
//           resolve({ latitude: null, longitude: null });
//         },
//         {
//           enableHighAccuracy: false,
//           timeout: 10000,
//           maximumAge: 60000
//         }
//       );
//     });
//   };

//   // Punch in function
//   const punchIn = async () => {
//     setAttendance(prev => ({ ...prev, loading: true }));

//     try {
//       const location = await getCurrentLocation();
//       const now = Date.now();
      
//       setStartTime(now);
//       setElapsedSeconds(0);
//       setAttendance({
//         isPunchedIn: true,
//         workingHours: 0,
//         workingTime: '00:00:00', // ✅ Initial time with seconds
//         canLogout: false,
//         loading: false,
//         lastPunchIn: new Date().toISOString(),
//         location: location
//       });

//       // Save to localStorage
//       localStorage.setItem('punchInTime', now.toString());
//       localStorage.setItem('punchInLocation', JSON.stringify(location));
      
//       return { success: true, location };
//     } catch (error) {
//       setAttendance(prev => ({ ...prev, loading: false }));
//       return { success: false, error: error.message };
//     }
//   };

//   // Punch out function
//   const punchOut = async () => {
//     setAttendance(prev => ({ ...prev, loading: true }));

//     try {
//       const totalHours = elapsedSeconds / 3600;
      
//       setAttendance({
//         isPunchedIn: false,
//         workingHours: totalHours,
//         workingTime: formatTime(totalHours),
//         canLogout: false,
//         loading: false,
//         lastPunchIn: null,
//         location: null
//       });

//       setStartTime(null);
//       setElapsedSeconds(0);

//       // Clear localStorage
//       localStorage.removeItem('punchInTime');
//       localStorage.removeItem('punchInLocation');
      
//       return { success: true, totalHours };
//     } catch (error) {
//       setAttendance(prev => ({ ...prev, loading: false }));
//       return { success: false, error: error.message };
//     }
//   };

//   // Format time with seconds - ✅ UPDATED
//   const formatTime = (hours) => {
//     const totalSeconds = Math.floor(hours * 3600);
//     const hrs = Math.floor(totalSeconds / 3600);
//     const mins = Math.floor((totalSeconds % 3600) / 60);
//     const secs = totalSeconds % 60;
//     return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//   };

//   // Track time when punched in - ✅ UPDATED for seconds
//   useEffect(() => {
//     let interval;
    
//     if (attendance.isPunchedIn && startTime) {
//       interval = setInterval(() => {
//         const currentTime = Date.now();
//         const elapsedTime = currentTime - startTime;
//         const seconds = Math.floor(elapsedTime / 1000);
//         const hours = seconds / 3600;
//         const canLogoutNow = hours >= 7;
        
//         setElapsedSeconds(seconds);
//         setAttendance(prev => ({
//           ...prev,
//           workingHours: hours,
//           workingTime: formatTime(hours), // ✅ Live updating with seconds
//           canLogout: canLogoutNow
//         }));
//       }, 1000); // ✅ Every second update
//     }
    
//     return () => clearInterval(interval);
//   }, [attendance.isPunchedIn, startTime]);

//   // Check for existing punch in on component mount
//   useEffect(() => {
//     const punchInTime = localStorage.getItem('punchInTime');
//     if (punchInTime) {
//       const time = parseInt(punchInTime);
//       const currentTime = Date.now();
//       const elapsedTime = currentTime - time;
      
//       // Only resume if punch in was within last 24 hours
//       if (elapsedTime < 24 * 60 * 60 * 1000) {
//         const seconds = Math.floor(elapsedTime / 1000);
//         const hours = seconds / 3600;
        
//         setStartTime(time);
//         setElapsedSeconds(seconds);
//         setAttendance(prev => ({
//           ...prev,
//           isPunchedIn: true,
//           workingHours: hours,
//           workingTime: formatTime(hours),
//           lastPunchIn: new Date(time).toISOString(),
//           canLogout: hours >= 7
//         }));
//       } else {
//         // Clear expired punch in
//         localStorage.removeItem('punchInTime');
//         localStorage.removeItem('punchInLocation');
//       }
//     }
//   }, []);

//   return {
//     attendance,
//     punchIn,
//     punchOut
//   };
// };

// export default useAttendance;






// import { useState, useEffect } from 'react';

// const useAttendance = () => {
//   const [attendance, setAttendance] = useState({
//     isPunchedIn: false,
//     workingHours: 0,
//     workingTime: '00:00:00',
//     canLogout: false,
//     loading: false,
//     lastPunchIn: null,
//     location: null
//   });

//   const [startTime, setStartTime] = useState(null);

//   // Get user's current location
//   const getCurrentLocation = () => {
//     return new Promise((resolve) => {
//       if (!navigator.geolocation) {
//         resolve({ latitude: null, longitude: null });
//         return;
//       }

//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           resolve({
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude,
//             timestamp: new Date().toISOString()
//           });
//         },
//         () => {
//           resolve({ latitude: null, longitude: null });
//         }
//       );
//     });
//   };

//   // Punch in function
//   const punchIn = async () => {
//     setAttendance(prev => ({ ...prev, loading: true }));

//     try {
//       const location = await getCurrentLocation();
//       const now = Date.now();
      
//       setStartTime(now);
//       setAttendance({
//         isPunchedIn: true,
//         workingHours: 0,
//         workingTime: '00:00:00',
//         canLogout: false,
//         loading: false,
//         lastPunchIn: new Date().toISOString(),
//         location: location
//       });

//       // ✅ NO storage - complete reset on refresh
//       return { success: true, location };
//     } catch (error) {
//       setAttendance(prev => ({ ...prev, loading: false }));
//       return { success: false, error: error.message };
//     }
//   };

//   // Punch out function
//   const punchOut = async () => {
//     setAttendance(prev => ({ ...prev, loading: true }));

//     try {
//       const currentTime = Date.now();
//       const elapsedTime = startTime ? (currentTime - startTime) : 0;
//       const totalHours = elapsedTime / 3600000;
      
//       setAttendance({
//         isPunchedIn: false,
//         workingHours: totalHours,
//         workingTime: formatTime(totalHours),
//         canLogout: false,
//         loading: false,
//         lastPunchIn: null,
//         location: null
//       });

//       setStartTime(null);
      
//       return { success: true, totalHours };
//     } catch (error) {
//       setAttendance(prev => ({ ...prev, loading: false }));
//       return { success: false, error: error.message };
//     }
//   };

//   // Format time with seconds
//   const formatTime = (hours) => {
//     const totalSeconds = Math.floor(hours * 3600);
//     const hrs = Math.floor(totalSeconds / 3600);
//     const mins = Math.floor((totalSeconds % 3600) / 60);
//     const secs = totalSeconds % 60;
//     return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//   };

//   // Track time when punched in
//   useEffect(() => {
//     let interval;
    
//     if (attendance.isPunchedIn && startTime) {
//       interval = setInterval(() => {
//         const currentTime = Date.now();
//         const elapsedTime = currentTime - startTime;
//         const hours = elapsedTime / 3600000;
//         const canLogoutNow = hours >= 7;
        
//         setAttendance(prev => ({
//           ...prev,
//           workingHours: hours,
//           workingTime: formatTime(hours),
//           canLogout: canLogoutNow
//         }));
//       }, 1000);
//     }
    
//     return () => clearInterval(interval);
//   }, [attendance.isPunchedIn, startTime]);

//   // ✅ NO resume logic - complete reset on page load
//   useEffect(() => {
//     // Clear any existing storage on component mount
//     sessionStorage.removeItem('punchInTime');
//     sessionStorage.removeItem('punchInLocation');
//     localStorage.removeItem('punchInTime');
//     localStorage.removeItem('punchInLocation');
//   }, []);

//   return {
//     attendance,
//     punchIn,
//     punchOut
//   };
// };

// export default useAttendance;













// import { useState, useEffect } from 'react';

// const useAttendance = () => {
//   const [attendance, setAttendance] = useState({
//     isPunchedIn: false,
//     workingHours: 0,
//     workingTime: '00:00:00',
//     canLogout: false,
//     loading: false,
//     lastPunchIn: null,
//     location: null,
//     isIdle: false, // ✅ NEW: Idle status
//     currentApp: 'Browser' // ✅ NEW: Current app
//   });

//   const [startTime, setStartTime] = useState(null);
//   const [elapsedSeconds, setElapsedSeconds] = useState(0);
//   const [isTrackingPaused, setIsTrackingPaused] = useState(false); // ✅ NEW: Pause state

//   // Get user's current location
//   const getCurrentLocation = () => {
//     return new Promise((resolve) => {
//       if (!navigator.geolocation) {
//         resolve({ latitude: null, longitude: null });
//         return;
//       }

//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           resolve({
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude,
//             timestamp: new Date().toISOString()
//           });
//         },
//         () => {
//           resolve({ latitude: null, longitude: null });
//         }
//       );
//     });
//   };

//   // Punch in function
//   const punchIn = async () => {
//     setAttendance(prev => ({ ...prev, loading: true }));

//     try {
//       const location = await getCurrentLocation();
//       const now = Date.now();
      
//       setStartTime(now);
//       setElapsedSeconds(0);
//       setIsTrackingPaused(false);
      
//       setAttendance({
//         isPunchedIn: true,
//         workingHours: 0,
//         workingTime: '00:00:00',
//         canLogout: false,
//         loading: false,
//         lastPunchIn: new Date().toISOString(),
//         location: location,
//         isIdle: false,
//         currentApp: 'Browser'
//       });

//       // ✅ Setup Electron tracking if available
//       if (window.electronAPI) {
//         await window.electronAPI.startTracking();
        
//         // ✅ Listen for real-time updates from Electron
//         window.electronAPI.onActivityUpdate((data) => {
//           console.log('🔄 Electron Activity Update:', data);
          
//           setAttendance(prev => ({
//             ...prev,
//             isIdle: data.isIdle,
//             currentApp: data.currentApp || 'Browser'
//           }));

//           setIsTrackingPaused(data.isIdle);
//         });
//       }

//       return { success: true, location };
//     } catch (error) {
//       setAttendance(prev => ({ ...prev, loading: false }));
//       return { success: false, error: error.message };
//     }
//   };

//   // Punch out function
//   const punchOut = async () => {
//     setAttendance(prev => ({ ...prev, loading: true }));

//     try {
//       const totalHours = elapsedSeconds / 3600;
      
//       // ✅ Stop Electron tracking if available
//       if (window.electronAPI) {
//         await window.electronAPI.stopTracking();
//       }

//       setAttendance({
//         isPunchedIn: false,
//         workingHours: totalHours,
//         workingTime: formatTime(totalHours),
//         canLogout: false,
//         loading: false,
//         lastPunchIn: null,
//         location: null,
//         isIdle: false,
//         currentApp: 'Browser'
//       });

//       setStartTime(null);
//       setElapsedSeconds(0);
//       setIsTrackingPaused(false);

//       return { success: true, totalHours };
//     } catch (error) {
//       setAttendance(prev => ({ ...prev, loading: false }));
//       return { success: false, error: error.message };
//     }
//   };

//   // Format time with seconds
//   const formatTime = (hours) => {
//     const totalSeconds = Math.floor(hours * 3600);
//     const hrs = Math.floor(totalSeconds / 3600);
//     const mins = Math.floor((totalSeconds % 3600) / 60);
//     const secs = totalSeconds % 60;
//     return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//   };

//   // Track time when punched in
//   useEffect(() => {
//     let interval;
    
//     if (attendance.isPunchedIn && startTime && !isTrackingPaused) {
//       interval = setInterval(() => {
//         const currentTime = Date.now();
//         const elapsedTime = currentTime - startTime;
//         const seconds = Math.floor(elapsedTime / 1000);
//         const hours = seconds / 3600;
//         const canLogoutNow = hours >= 7;
        
//         setElapsedSeconds(seconds);
//         setAttendance(prev => ({
//           ...prev,
//           workingHours: hours,
//           workingTime: formatTime(hours),
//           canLogout: canLogoutNow
//         }));
//       }, 1000);
//     }
    
//     return () => clearInterval(interval);
//   }, [attendance.isPunchedIn, startTime, isTrackingPaused]);

//   return {
//     attendance,
//     punchIn,
//     punchOut
//   };
// };

// export default useAttendance;










// import { useState, useEffect } from 'react';

// const useAttendance = () => {
//   const [attendance, setAttendance] = useState({
//     isPunchedIn: false,
//     workingHours: 0,
//     workingTime: '00:00:00',
//     canLogout: false,
//     loading: false,
//     lastPunchIn: null,
//     location: null,
//     isIdle: false,
//     currentApp: 'Browser'
//   });

//   const [startTime, setStartTime] = useState(null);
//   const [accumulatedTime, setAccumulatedTime] = useState(0); // ✅ TOTAL accumulated time
//   const [idleStartTime, setIdleStartTime] = useState(null); // ✅ When idle started

//   // Get user's current location
//   const getCurrentLocation = () => {
//     return new Promise((resolve) => {
//       if (!navigator.geolocation) {
//         resolve({ latitude: null, longitude: null });
//         return;
//       }

//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           resolve({
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude,
//             timestamp: new Date().toISOString()
//           });
//         },
//         () => {
//           resolve({ latitude: null, longitude: null });
//         }
//       );
//     });
//   };

//   // Punch in function
//   const punchIn = async () => {
//     setAttendance(prev => ({ ...prev, loading: true }));

//     try {
//       const location = await getCurrentLocation();
//       const now = Date.now();
      
//       setStartTime(now);
//       setAccumulatedTime(0);
//       setIdleStartTime(null);
      
//       setAttendance({
//         isPunchedIn: true,
//         workingHours: 0,
//         workingTime: '00:00:00',
//         canLogout: false,
//         loading: false,
//         lastPunchIn: new Date().toISOString(),
//         location: location,
//         isIdle: false,
//         currentApp: 'Browser'
//       });

//       // ✅ Setup Electron tracking
//       if (window.electronAPI) {
//         await window.electronAPI.startTracking();
        
//         // ✅ Listen for real-time idle updates
//         window.electronAPI.onActivityUpdate((data) => {
//           console.log('🔄 Electron Activity Update:', data);
          
//           if (data.isIdle && !attendance.isIdle) {
//             // ✅ IDLE STARTED - Record the time when idle started
//             setIdleStartTime(Date.now());
//           } 
//           else if (!data.isIdle && attendance.isIdle) {
//             // ✅ IDLE ENDED - Add the accumulated time before idle
//             const idleEndTime = Date.now();
//             const idleDuration = idleEndTime - idleStartTime;
            
//             // ✅ DON'T add idle time to accumulated time
//             // Just continue from where we left
//             setStartTime(prev => prev + idleDuration); // Adjust start time
//           }

//           setAttendance(prev => ({
//             ...prev,
//             isIdle: data.isIdle,
//             currentApp: data.currentApp || 'Browser'
//           }));
//         });
//       }

//       return { success: true, location };
//     } catch (error) {
//       setAttendance(prev => ({ ...prev, loading: false }));
//       return { success: false, error: error.message };
//     }
//   };

//   // Punch out function
//   const punchOut = async () => {
//     setAttendance(prev => ({ ...prev, loading: true }));

//     try {
//       const totalHours = accumulatedTime / 3600000; // Convert ms to hours
      
//       // ✅ Stop Electron tracking
//       if (window.electronAPI) {
//         await window.electronAPI.stopTracking();
//         window.electronAPI.removeAllListeners('activity-update');
//       }

//       setAttendance({
//         isPunchedIn: false,
//         workingHours: totalHours,
//         workingTime: formatTime(totalHours),
//         canLogout: false,
//         loading: false,
//         lastPunchIn: null,
//         location: null,
//         isIdle: false,
//         currentApp: 'Browser'
//       });

//       setStartTime(null);
//       setAccumulatedTime(0);
//       setIdleStartTime(null);

//       return { success: true, totalHours };
//     } catch (error) {
//       setAttendance(prev => ({ ...prev, loading: false }));
//       return { success: false, error: error.message };
//     }
//   };

//   // Format time with seconds
//   const formatTime = (hours) => {
//     const totalSeconds = Math.floor(hours * 3600);
//     const hrs = Math.floor(totalSeconds / 3600);
//     const mins = Math.floor((totalSeconds % 3600) / 60);
//     const secs = totalSeconds % 60;
//     return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//   };

//   // ✅ UPDATED: Track time with proper idle handling
//   useEffect(() => {
//     let interval;
    
//     if (attendance.isPunchedIn && startTime && !attendance.isIdle) {
//       interval = setInterval(() => {
//         const currentTime = Date.now();
//         const elapsedTime = currentTime - startTime;
//         const hours = elapsedTime / 3600000; // ms to hours
//         const canLogoutNow = hours >= 7;
        
//         setAccumulatedTime(elapsedTime);
//         setAttendance(prev => ({
//           ...prev,
//           workingHours: hours,
//           workingTime: formatTime(hours),
//           canLogout: canLogoutNow
//         }));
//       }, 1000);
//     }
    
//     return () => clearInterval(interval);
//   }, [attendance.isPunchedIn, startTime, attendance.isIdle]);

//   // ✅ Handle component unmount
//   useEffect(() => {
//     return () => {
//       if (window.electronAPI) {
//         window.electronAPI.removeAllListeners('activity-update');
//       }
//     };
//   }, []);

//   return {
//     attendance,
//     punchIn,
//     punchOut
//   };
// };

// export default useAttendance;







import { useState, useEffect, useRef } from 'react';

const useAttendance = () => {
  const [attendance, setAttendance] = useState({
    isPunchedIn: false,
    workingHours: 0,
    workingTime: '00:00:00',
    canLogout: false,
    loading: false,
    lastPunchIn: null,
    location: null,
    isIdle: false,
    currentApp: 'Browser'
  });

  // ✅ useRef for stable values
  const accumulatedSecondsRef = useRef(0);
  const timerIntervalRef = useRef(null);
  const isIdleRef = useRef(false);

  // Get user's current location
  const getCurrentLocation = () => {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        resolve({ latitude: null, longitude: null });
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            timestamp: new Date().toISOString()
          });
        },
        () => {
          resolve({ latitude: null, longitude: null });
        }
      );
    });
  };

  // Format time with seconds
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Start/Stop timer
  const manageTimer = (shouldStart) => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }

    if (shouldStart && !isIdleRef.current) {
      console.log('⏰ Timer STARTED');
      
      timerIntervalRef.current = setInterval(() => {
        accumulatedSecondsRef.current += 1;
        
        const hours = accumulatedSecondsRef.current / 3600;
        const canLogoutNow = hours >= 7;
        
        setAttendance(prev => ({
          ...prev,
          workingHours: hours,
          workingTime: formatTime(accumulatedSecondsRef.current),
          canLogout: canLogoutNow
        }));

        // Log every 30 seconds
        if (accumulatedSecondsRef.current % 30 === 0) {
          console.log(`⏱️ Timer: ${formatTime(accumulatedSecondsRef.current)}`);
        }
      }, 1000);
    } else {
      console.log('⏸️ Timer STOPPED');
    }
  };

  // Punch in function
  const punchIn = async () => {
    setAttendance(prev => ({ ...prev, loading: true }));

    try {
      const location = await getCurrentLocation();
      
      accumulatedSecondsRef.current = 0;
      isIdleRef.current = false;
      
      setAttendance({
        isPunchedIn: true,
        workingHours: 0,
        workingTime: '00:00:00',
        canLogout: false,
        loading: false,
        lastPunchIn: new Date().toISOString(),
        location: location,
        isIdle: false,
        currentApp: 'Browser'
      });

      // ✅ Setup Electron tracking
      if (window.electronAPI) {
        await window.electronAPI.startTracking();
        
        window.electronAPI.onActivityUpdate((data) => {
          console.log('🔄 Electron Update:', {
            isIdle: data.isIdle,
            wasIdle: isIdleRef.current,
            seconds: accumulatedSecondsRef.current
          });

          // ✅ Handle idle state change
          if (data.isIdle !== isIdleRef.current) {
            isIdleRef.current = data.isIdle;
            
            setAttendance(prev => ({
              ...prev,
              isIdle: data.isIdle,
              currentApp: data.currentApp || 'Browser'
            }));

            // ✅ Manage timer based on idle state
            if (data.isIdle) {
              console.log('⏸️ Going IDLE - Timer PAUSED');
              manageTimer(false); // Stop timer
            } else {
              console.log('🎯 Becoming ACTIVE - Timer RESUMING');
              manageTimer(true); // Start timer
            }
          }
        });
      }

      // Start timer initially
      manageTimer(true);
      
      return { success: true, location };
    } catch (error) {
      setAttendance(prev => ({ ...prev, loading: false }));
      return { success: false, error: error.message };
    }
  };

  // Punch out function
  const punchOut = async () => {
    setAttendance(prev => ({ ...prev, loading: true }));

    try {
      const totalHours = accumulatedSecondsRef.current / 3600;
      
      // Stop everything
      manageTimer(false);
      
      if (window.electronAPI) {
        await window.electronAPI.stopTracking();
        window.electronAPI.removeAllListeners('activity-update');
      }

      setAttendance({
        isPunchedIn: false,
        workingHours: totalHours,
        workingTime: formatTime(accumulatedSecondsRef.current),
        canLogout: false,
        loading: false,
        lastPunchIn: null,
        location: null,
        isIdle: false,
        currentApp: 'Browser'
      });

      accumulatedSecondsRef.current = 0;
      isIdleRef.current = false;

      return { success: true, totalHours };
    } catch (error) {
      setAttendance(prev => ({ ...prev, loading: false }));
      return { success: false, error: error.message };
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
      if (window.electronAPI) {
        window.electronAPI.removeAllListeners('activity-update');
      }
    };
  }, []);

  return {
    attendance,
    punchIn,
    punchOut
  };
};

export default useAttendance;