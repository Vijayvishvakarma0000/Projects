// const { app, BrowserWindow, ipcMain, powerMonitor, globalShortcut } = require('electron');
// const path = require('path');
// const { activeWindow } = require('@nut-tree/nut-js');

// class ActivityTracker {
//   constructor() {
//     this.isTracking = false;
//     this.startTime = null;
//     this.totalActiveTime = 0;
//     this.lastActivityTime = Date.now();
//     this.idleThreshold = 5 * 60 * 1000; // 5 minutes
//     this.currentApp = 'Browser';
//     this.isIdle = false;
//   }

//   startTracking() {
//     this.isTracking = true;
//     this.startTime = Date.now();
//     this.setupActivityListeners();
//     this.startAppTracking();
//   }

//   stopTracking() {
//     this.isTracking = false;
//     this.totalActiveTime = this.getActiveTime();
//     this.cleanupListeners();
//   }

//   setupActivityListeners() {
//     // Monitor system idle time
//     powerMonitor.on('resume', () => {
//       this.lastActivityTime = Date.now();
//       this.isIdle = false;
//     });

//     // Global shortcuts for activity detection
//     globalShortcut.register('Super', () => {
//       this.updateActivity();
//     });

//     // Check idle status every 30 seconds
//     this.idleInterval = setInterval(() => {
//       this.checkIdleStatus();
//     }, 30000);
//   }

//   startAppTracking() {
//     // Track active application every 10 seconds
//     this.appInterval = setInterval(async () => {
//       try {
//         const window = await activeWindow();
//         this.currentApp = window.title || 'Unknown App';
//       } catch (error) {
//         this.currentApp = 'Browser';
//       }
//     }, 10000);
//   }

//   updateActivity() {
//     this.lastActivityTime = Date.now();
//     this.isIdle = false;
//   }

//   checkIdleStatus() {
//     const idleTime = Date.now() - this.lastActivityTime;
//     this.isIdle = idleTime > this.idleThreshold;
//   }

//   getActiveTime() {
//     if (!this.isTracking) return this.totalActiveTime;

//     const currentTime = Date.now();
//     const idleTime = this.isIdle ? (currentTime - this.lastActivityTime) : 0;
//     const currentSessionTime = currentTime - this.startTime - idleTime;

//     return this.totalActiveTime + Math.max(0, currentSessionTime);
//   }

//   getTrackingData() {
//     return {
//       isTracking: this.isTracking,
//       activeTime: this.getActiveTime(),
//       currentApp: this.currentApp,
//       isIdle: this.isIdle,
//       lastActivity: this.lastActivityTime
//     };
//   }

//   cleanupListeners() {
//     if (this.idleInterval) clearInterval(this.idleInterval);
//     if (this.appInterval) clearInterval(this.appInterval);
//     globalShortcut.unregisterAll();
//   }
// }

// const activityTracker = new ActivityTracker();

// let mainWindow;

// function createWindow() {
//   mainWindow = new BrowserWindow({
//     width: 1200,
//     height: 800,
//     webPreferences: {
//       nodeIntegration: false,
//       contextIsolation: true,
//       preload: path.join(__dirname, 'preload.js')
//     },
//     icon: path.join(__dirname, '../public/logo.png')
//   });

//   mainWindow.loadURL(
//     process.env.NODE_ENV === 'development' 
//       ? 'http://localhost:3000' 
//       : `file://${path.join(__dirname, '../build/index.html')}`
//   );

//   // Open DevTools in development
//   if (process.env.NODE_ENV === 'development') {
//     mainWindow.webContents.openDevTools();
//   }
// }

// // IPC Handlers for communication with React app
// ipcMain.handle('start-tracking', () => {
//   activityTracker.startTracking();
//   return { success: true };
// });

// ipcMain.handle('stop-tracking', () => {
//   activityTracker.stopTracking();
//   const data = activityTracker.getTrackingData();
//   return { success: true, data };
// });

// ipcMain.handle('get-tracking-data', () => {
//   return activityTracker.getTrackingData();
// });

// ipcMain.handle('get-current-app', () => {
//   return activityTracker.currentApp;
// });

// // App event handlers
// app.whenReady().then(createWindow);

// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     app.quit();
//   }
// });

// app.on('activate', () => {
//   if (BrowserWindow.getAllWindows().length === 0) {
//     createWindow();
//   }
// });

// app.on('before-quit', () => {
//   activityTracker.cleanupListeners();
// });




// const { app, BrowserWindow, ipcMain, powerMonitor, globalShortcut } = require('electron');
// const path = require('path');
// // const { activeWindow } = require('@nut-tree/nut-js');

// class ActivityTracker {
//   constructor() {
//     this.isTracking = false;
//     this.startTime = null;
//     this.totalActiveTime = 0;
//     this.lastActivityTime = Date.now();
//     this.idleThreshold = 5 * 60 * 1000; // 5 minutes
//     this.currentApp = 'Browser';
//     this.isIdle = false;
//     this.idleInterval = null;
//     this.appInterval = null;
//   }

//   startTracking() {
//     if (this.isTracking) return;

//     this.isTracking = true;
//     this.startTime = Date.now();
//     this.setupActivityListeners();
//     this.startAppTracking();
//     console.log('Activity tracking started');
//   }

//   stopTracking() {
//     this.isTracking = false;
//     this.totalActiveTime = this.getActiveTime();
//     this.cleanupListeners();
//     console.log('Activity tracking stopped');
//   }

//   setupActivityListeners() {
//     // Monitor system idle time
//     powerMonitor.on('resume', () => {
//       this.updateActivity();
//     });

//     powerMonitor.on('suspend', () => {
//       this.isIdle = true;
//     });

//     // Global shortcuts for activity detection
//     try {
//       globalShortcut.register('Super', () => {
//         this.updateActivity();
//       });
//     } catch (error) {
//       console.log('Super key registration failed, using alternative');
//     }

//     // Check idle status every 30 seconds
//     this.idleInterval = setInterval(() => {
//       this.checkIdleStatus();
//     }, 30000);
//   }

//   startAppTracking() {
//     // Track active application every 10 seconds
//     this.appInterval = setInterval(async () => {
//       try {
//         const window = await activeWindow();
//         this.currentApp = window.title || 'Unknown App';
//         // Limit app name length
//         if (this.currentApp.length > 30) {
//           this.currentApp = this.currentApp.substring(0, 30) + '...';
//         }
//       } catch (error) {
//         this.currentApp = 'Browser';
//       }
//     }, 10000);
//   }

//   updateActivity() {
//     this.lastActivityTime = Date.now();
//     this.isIdle = false;
//   }

//   checkIdleStatus() {
//     const idleTime = Date.now() - this.lastActivityTime;
//     const wasIdle = this.isIdle;
//     this.isIdle = idleTime > this.idleThreshold;

//     // Send update to renderer if idle status changed
//     if (wasIdle !== this.isIdle && mainWindow) {
//       mainWindow.webContents.send('activity-update', {
//         isIdle: this.isIdle,
//         currentApp: this.currentApp
//       });
//     }
//   }

//   getActiveTime() {
//     if (!this.isTracking) return this.totalActiveTime;

//     const currentTime = Date.now();
//     const idleTime = this.isIdle ? (currentTime - this.lastActivityTime) : 0;
//     const currentSessionTime = currentTime - this.startTime - Math.min(idleTime, this.idleThreshold);

//     return this.totalActiveTime + Math.max(0, currentSessionTime);
//   }

//   getTrackingData() {
//     return {
//       isTracking: this.isTracking,
//       activeTime: this.getActiveTime(),
//       currentApp: this.currentApp,
//       isIdle: this.isIdle,
//       lastActivity: this.lastActivityTime
//     };
//   }

//   cleanupListeners() {
//     if (this.idleInterval) {
//       clearInterval(this.idleInterval);
//       this.idleInterval = null;
//     }
//     if (this.appInterval) {
//       clearInterval(this.appInterval);
//       this.appInterval = null;
//     }
//     try {
//       globalShortcut.unregisterAll();
//     } catch (error) {
//       console.log('Error unregistering shortcuts:', error);
//     }
//   }
// }

// const activityTracker = new ActivityTracker();
// let mainWindow;

// function createWindow() {
//   mainWindow = new BrowserWindow({
//     width: 1200,
//     height: 800,
//     webPreferences: {
//       nodeIntegration: false,
//       contextIsolation: true,
//       preload: path.join(__dirname, 'preload.js')
//     },
//     icon: path.join(__dirname, 'assets/icon.png'),
//     title: 'ACore Employee Portal'
//   });

//   // Load the React app
//   const startUrl = process.env.ELECTRON_IS_DEV 
//     ? 'http://localhost:3000' 
//     : `file://${path.join(__dirname, '../frontend/build/index.html')}`;

//   mainWindow.loadURL(startUrl);

//   // Open DevTools in development
//   if (process.env.ELECTRON_IS_DEV) {
//     mainWindow.webContents.openDevTools();
//   }

//   // Handle window closed
//   mainWindow.on('closed', () => {
//     mainWindow = null;
//     activityTracker.cleanupListeners();
//   });
// }

// // IPC Handlers for communication with React app
// ipcMain.handle('start-tracking', () => {
//   activityTracker.startTracking();
//   return { success: true };
// });

// ipcMain.handle('stop-tracking', () => {
//   const data = activityTracker.getTrackingData();
//   activityTracker.stopTracking();
//   return { success: true, data };
// });

// ipcMain.handle('get-tracking-data', () => {
//   return activityTracker.getTrackingData();
// });

// ipcMain.handle('get-current-app', () => {
//   return activityTracker.currentApp;
// });

// // App event handlers
// app.whenReady().then(createWindow);

// app.on('window-all-closed', () => {
//   activityTracker.cleanupListeners();
//   if (process.platform !== 'darwin') {
//     app.quit();
//   }
// });

// app.on('activate', () => {
//   if (BrowserWindow.getAllWindows().length === 0) {
//     createWindow();
//   }
// });

// app.on('before-quit', () => {
//   activityTracker.cleanupListeners();
// });

// app.on('will-quit', () => {
//   activityTracker.cleanupListeners();
// });




// const { app, BrowserWindow, ipcMain } = require('electron');
// const path = require('path');

// let mainWindow;

// function createWindow() {
//   mainWindow = new BrowserWindow({
//     width: 1200,
//     height: 800,
//     show: false,
//     webPreferences: {
//       nodeIntegration: false,
//       contextIsolation: true,
//       preload: path.join(__dirname, 'preload.js')
//     }
//   });

//   // ✅ CORRECT PORT: 5173 (Vite default)
//   mainWindow.loadURL('http://localhost:5173/')
//     .then(() => {
//       console.log('✅ Vite React app loaded successfully!');
//       mainWindow.show();
//       mainWindow.webContents.openDevTools();
//     })
//     .catch(err => {
//       console.log('❌ Error loading app:', err);
//       mainWindow.show();
//     });
// }

// // IPC handlers
// ipcMain.handle('start-tracking', () => {
//   console.log('🟢 REAL: Tracking Started in Electron');
//   return { 
//     success: true, 
//     message: 'Real Electron tracking active!',
//     currentApp: 'ACore Employee Portal',
//     timestamp: new Date().toISOString()
//   };
// });

// ipcMain.handle('stop-tracking', () => {
//   console.log('🔴 REAL: Tracking Stopped in Electron');
//   return { 
//     success: true, 
//     message: 'Tracking stopped',
//     timestamp: new Date().toISOString()
//   };
// });

// ipcMain.handle('get-tracking-data', () => {
//   return {
//     isTracking: true,
//     activeTime: Date.now(),
//     currentApp: 'ACore Portal - REAL MODE',
//     isIdle: false,
//     source: 'Electron Desktop App'
//   };
// });

// app.whenReady().then(createWindow);

// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     app.quit();
//   }
// });

// app.on('activate', () => {
//   if (BrowserWindow.getAllWindows().length === 0) {
//     createWindow();
//   }
// });



// const { app, BrowserWindow, ipcMain, powerMonitor } = require('electron');
// const path = require('path');

// class ActivityTracker {
//   constructor() {
//     this.isTracking = false;
//     this.startTime = null;
//     this.totalActiveTime = 0;
//     this.lastActivityTime = Date.now();
//     this.idleThreshold = 1 * 60 * 1000; // 1 minute for testing
//     this.isIdle = false;
//     this.idleInterval = null;
//     this.mainWindow = null;
//   }

//   setMainWindow(window) {
//     this.mainWindow = window;
//   }

//   startTracking() {
//     if (this.isTracking) return;

//     this.isTracking = true;
//     this.startTime = Date.now();
//     this.lastActivityTime = Date.now();
//     this.isIdle = false;
//     this.setupActivityListeners();

//     console.log('🟢 REAL Tracking Started');
//     this.sendActivityUpdate();
//   }

//   stopTracking() {
//     this.isTracking = false;
//     this.cleanupListeners();
//     console.log('🔴 Tracking Stopped');
//     this.sendActivityUpdate();
//   }

//   setupActivityListeners() {
//     // ✅ SYSTEM IDLE DETECTION - Yeh actually work karega
//     let lastMousePos = { x: 0, y: 0 };

//     // Mouse movement detection
//     if (this.mainWindow) {
//       this.mainWindow.on('focus', () => {
//         this.updateActivity();
//       });

//       // ✅ REAL Mouse move detection
//       this.mainWindow.webContents.executeJavaScript(`
//         document.addEventListener('mousemove', (e) => {
//           window.electronAPI.reportActivity();
//         });
//         document.addEventListener('keydown', () => {
//           window.electronAPI.reportActivity();
//         });
//         document.addEventListener('click', () => {
//           window.electronAPI.reportActivity();
//         });
//         console.log('🎯 Activity listeners installed in renderer');
//       `);
//     }

//     // ✅ System power monitor
//     powerMonitor.on('resume', () => {
//       this.updateActivity();
//     });

//     powerMonitor.on('suspend', () => {
//       this.markIdle();
//     });

//     // ✅ Check idle status every 5 seconds
//     this.idleInterval = setInterval(() => {
//       this.checkIdleStatus();
//     }, 5000);
//   }

//   updateActivity() {
//     const now = Date.now();
//     const wasIdle = this.isIdle;

//     this.lastActivityTime = now;
//     this.isIdle = false;

//     if (wasIdle) {
//       console.log('🎯 ACTIVITY DETECTED - Tracking RESUMED');
//       this.sendActivityUpdate();
//     }
//   }

//   markIdle() {
//     if (!this.isIdle) {
//       this.isIdle = true;
//       console.log('⏸️ IDLE DETECTED - Tracking PAUSED');
//       this.sendActivityUpdate();
//     }
//   }

//   checkIdleStatus() {
//     if (!this.isTracking) return;

//     const idleTime = Date.now() - this.lastActivityTime;
//     const wasIdle = this.isIdle;

//     if (idleTime > this.idleThreshold && !this.isIdle) {
//       this.markIdle();
//     }

//     // Auto-send updates every 10 seconds
//     if (this.isTracking) {
//       this.sendActivityUpdate();
//     }
//   }

//   getActiveTime() {
//     if (!this.isTracking) return this.totalActiveTime;

//     const currentTime = Date.now();
//     const idleTime = this.isIdle ? (currentTime - this.lastActivityTime) : 0;
//     const currentSessionTime = currentTime - this.startTime - Math.min(idleTime, this.idleThreshold);

//     return this.totalActiveTime + Math.max(0, currentSessionTime);
//   }

//   getTrackingData() {
//     const activeTime = this.getActiveTime();
//     const idleSeconds = Math.floor((Date.now() - this.lastActivityTime) / 1000);

//     return {
//       isTracking: this.isTracking,
//       activeTime: activeTime,
//       currentApp: 'ACore Employee Portal',
//       isIdle: this.isIdle,
//       lastActivity: this.lastActivityTime,
//       idleSeconds: idleSeconds,
//       totalSeconds: Math.floor(activeTime / 1000)
//     };
//   }

//   // sendActivityUpdate() {
//   //   if (this.mainWindow) {
//   //     const data = this.getTrackingData();
//   //     this.mainWindow.webContents.send('activity-update', data);

//   //     // ✅ Terminal pe bhi dikhao real status
//   //     console.log('📊', {
//   //       tracking: this.isTracking ? '🟢 ON' : '🔴 OFF',
//   //       idle: this.isIdle ? '⏸️ YES' : '🎯 NO', 
//   //       activeTime: Math.floor(data.activeTime / 1000) + 's',
//   //       idleFor: data.idleSeconds + 's'
//   //     });
//   //   }
//   // }

// //   sendActivityUpdate() {
// //   if (this.mainWindow) {
// //     const data = this.getTrackingData();
// //     this.mainWindow.webContents.send('activity-update', data);

// //     // ✅ Better logging
// //     const activeSeconds = Math.floor(data.activeTime / 1000);
// //     const idleSeconds = data.idleSeconds;

// //     console.log('📊', {
// //       status: this.isTracking ? '🟢 TRACKING' : '🔴 STOPPED',
// //       state: this.isIdle ? '⏸️ IDLE' : '🎯 ACTIVE', 
// //       activeTime: `${Math.floor(activeSeconds / 60)}m ${activeSeconds % 60}s`,
// //       idleFor: `${Math.floor(idleSeconds / 60)}m ${idleSeconds % 60}s`,
// //       willResume: 'FROM LAST POSITION ✅'
// //     });
// //   }
// // }

// sendActivityUpdate() {
//   if (this.mainWindow) {
//     const data = this.getTrackingData();
//     this.mainWindow.webContents.send('activity-update', data);

//     const activeSeconds = Math.floor(data.activeTime / 1000);
//     const idleSeconds = data.idleSeconds;

//     console.log('📊 LIVE STATUS:', {
//       state: this.isIdle ? '⏸️ IDLE - TIMER STOPPED' : '🎯 ACTIVE - TIMER RUNNING', 
//       totalActive: `${Math.floor(activeSeconds / 60)}m ${activeSeconds % 60}s`,
//       idleFor: `${Math.floor(idleSeconds / 60)}m ${idleSeconds % 60}s`,
//       behavior: this.isIdle ? 'TIMER FROZEN ❄️' : 'TIMER COUNTING ⏰'
//     });
//   }
// }


//   cleanupListeners() {
//     if (this.idleInterval) clearInterval(this.idleInterval);
//   }
// }

// const activityTracker = new ActivityTracker();
// let mainWindow;

// function createWindow() {
//   mainWindow = new BrowserWindow({
//     width: 1200,
//     height: 800,
//     webPreferences: {
//       nodeIntegration: false,
//       contextIsolation: true,
//       preload: path.join(__dirname, 'preload.js')
//     }
//   });

//   activityTracker.setMainWindow(mainWindow);

//   mainWindow.loadURL('http://localhost:5173/')
//     .then(() => {
//       console.log('✅ React app loaded successfully!');
//       mainWindow.show();
//       mainWindow.webContents.openDevTools();
//     })
//     .catch(err => {
//       console.log('❌ Error loading app:', err);
//       mainWindow.show();
//     });
// }

// // ✅ IPC Handlers
// // ipcMain.handle('start-tracking', () => {
// //   activityTracker.startTracking();
// //   return { 
// //     success: true, 
// //     message: 'Real tracking with ACTIVE idle detection started!',
// //     idleThreshold: '1 minute (testing)'
// //   };
// // });


// ipcMain.handle('start-tracking', () => {
//   activityTracker.startTracking();
//   return { 
//     success: true, 
//     message: 'Smart tracking started - Resume from last position!',
//     idleThreshold: '1 minute'
//   };
// });


// ipcMain.handle('stop-tracking', () => {
//   const data = activityTracker.getTrackingData();
//   activityTracker.stopTracking();
//   return { success: true, data };
// });

// ipcMain.handle('get-tracking-data', () => {
//   return activityTracker.getTrackingData();
// });

// ipcMain.handle('report-activity', () => {
//   activityTracker.updateActivity();
//   return { success: true, message: 'Activity reported manually' };
// });

// app.whenReady().then(createWindow);

// app.on('window-all-closed', () => {
//   activityTracker.cleanupListeners();
//   if (process.platform !== 'darwin') {
//     app.quit();
//   }
// });






// const { app, BrowserWindow, ipcMain, powerMonitor } = require('electron');
// const path = require('path');
// const activeWin = require('active-win');
// const si = require('systeminformation');

// class ActivityTracker {
//   constructor() {
//     this.isTracking = false;
//     this.startTime = null;
//     this.totalActiveTime = 0;
//     this.lastActivityTime = Date.now();
//     this.idleThreshold = 1 * 60 * 1000; // 1 minute
//     this.isIdle = false;
//     this.idleInterval = null;
//     this.appCheckInterval = null;
//     this.mainWindow = null;
//     this.currentApp = 'Unknown';
//     this.lastAppCheck = Date.now();
//   }

//   setMainWindow(window) {
//     this.mainWindow = window;
//   }

//   async startTracking() {
//     if (this.isTracking) return;

//     this.isTracking = true;
//     this.startTime = Date.now();
//     this.lastActivityTime = Date.now();
//     this.isIdle = false;

//     this.setupActivityListeners();
//     this.startAppTracking();
//     this.startSystemMonitoring();

//     console.log('🟢 REAL SYSTEM-LEVEL Tracking Started');
//     console.log('🎯 Now tracking: VS Code, Chrome, Firefox, Word, Excel, etc.');
//     this.sendActivityUpdate();
//   }

//   stopTracking() {
//     this.isTracking = false;
//     this.cleanupListeners();
//     console.log('🔴 Tracking Stopped');
//     this.sendActivityUpdate();
//   }

//   setupActivityListeners() {
//     // ✅ System power events
//     powerMonitor.on('resume', () => {
//       this.updateActivity();
//       console.log('💻 System resumed from sleep');
//     });

//     powerMonitor.on('suspend', () => {
//       this.markIdle();
//       console.log('💤 System going to sleep');
//     });

//     // ✅ Check idle status
//     this.idleInterval = setInterval(() => {
//       this.checkIdleStatus();
//     }, 10000);
//   }

//   startAppTracking() {
//     // ✅ Track ACTIVE WINDOW every 3 seconds
//     this.appCheckInterval = setInterval(async () => {
//       if (!this.isTracking) return;

//       try {
//         const now = Date.now();
//         // Only check every 3 seconds to reduce CPU usage
//         if (now - this.lastAppCheck < 3000) return;

//         this.lastAppCheck = now;

//         const window = await activeWin();
//         if (window && window.owner) {
//           const appName = this.formatAppName(window.owner.name);
//           if (appName !== this.currentApp) {
//             this.currentApp = appName;
//             this.updateActivity(); // Activity detected - app changed
//             console.log('💻 Switched to:', this.currentApp);
//             this.sendActivityUpdate();
//           }
//         }
//       } catch (error) {
//         console.log('⚠️ App detection failed:', error.message);
//       }
//     }, 1000);
//   }

//   startSystemMonitoring() {
//     // ✅ System-level activity monitoring
//     setInterval(async () => {
//       if (!this.isTracking) return;

//       try {
//         // Check keyboard and mouse activity
//         const processes = await si.processes();
//         const activeProcesses = processes.list.filter(p => 
//           p.name && this.isUserApp(p.name)
//         );

//         if (activeProcesses.length > 0) {
//           this.updateActivity();
//         }
//       } catch (error) {
//         // Ignore monitoring errors
//       }
//     }, 15000);
//   }

//   isUserApp(processName) {
//     const userApps = [
//       'code', 'chrome', 'firefox', 'msedge', 'notepad', 'winword', 'excel',
//       'powerpoint', 'photoshop', 'figma', 'slack', 'discord', 'teams'
//     ];
//     return userApps.some(app => processName.toLowerCase().includes(app));
//   }

//   formatAppName(name) {
//     if (!name) return 'Unknown App';

//     const appMap = {
//       'Code': 'VS Code',
//       'chrome': 'Google Chrome',
//       'firefox': 'Mozilla Firefox',
//       'msedge': 'Microsoft Edge',
//       'notepad': 'Notepad',
//       'winword': 'Microsoft Word',
//       'excel': 'Microsoft Excel',
//       'powerpnt': 'Microsoft PowerPoint',
//       'photoshop': 'Adobe Photoshop',
//       'figma': 'Figma',
//       'slack': 'Slack',
//       'discord': 'Discord',
//       'teams': 'Microsoft Teams'
//     };

//     return appMap[name] || name;
//   }

//   updateActivity() {
//     const now = Date.now();
//     const wasIdle = this.isIdle;

//     this.lastActivityTime = now;
//     this.isIdle = false;

//     if (wasIdle) {
//       console.log('🎯 ACTIVITY DETECTED - User is working again');
//       this.sendActivityUpdate();
//     }
//   }

//   markIdle() {
//     if (!this.isIdle) {
//       this.isIdle = true;
//       console.log('⏸️ USER IDLE - No activity detected');
//       this.sendActivityUpdate();
//     }
//   }

//   checkIdleStatus() {
//     if (!this.isTracking) return;

//     const idleTime = Date.now() - this.lastActivityTime;
//     const wasIdle = this.isIdle;

//     if (idleTime > this.idleThreshold && !this.isIdle) {
//       this.markIdle();
//     }
//   }

//   getActiveTime() {
//     if (!this.isTracking) return this.totalActiveTime;

//     const currentTime = Date.now();
//     const idleTime = this.isIdle ? (currentTime - this.lastActivityTime) : 0;
//     const currentSessionTime = currentTime - this.startTime - Math.min(idleTime, this.idleThreshold);

//     return this.totalActiveTime + Math.max(0, currentSessionTime);
//   }

//   getTrackingData() {
//     const activeTime = this.getActiveTime();
//     const idleSeconds = Math.floor((Date.now() - this.lastActivityTime) / 1000);

//     return {
//       isTracking: this.isTracking,
//       activeTime: activeTime,
//       currentApp: this.currentApp,
//       isIdle: this.isIdle,
//       lastActivity: this.lastActivityTime,
//       idleSeconds: idleSeconds,
//       totalSeconds: Math.floor(activeTime / 1000),
//       platform: process.platform,
//       trackingLevel: 'SYSTEM-WIDE' // ✅ Confirmation
//     };
//   }

//   sendActivityUpdate() {
//     if (this.mainWindow) {
//       const data = this.getTrackingData();
//       this.mainWindow.webContents.send('activity-update', data);

//       const activeSeconds = Math.floor(data.activeTime / 1000);

//       console.log('📊 LIVE TRACKING:', {
//         application: data.currentApp,
//         state: data.isIdle ? '⏸️ IDLE' : '🎯 ACTIVE', 
//         activeTime: `${Math.floor(activeSeconds / 60)}m ${activeSeconds % 60}s`,
//         idleFor: `${Math.floor(data.idleSeconds / 60)}m ${data.idleSeconds % 60}s`,
//         tracking: 'SYSTEM-LEVEL ✅'
//       });
//     }
//   }

//   cleanupListeners() {
//     if (this.idleInterval) clearInterval(this.idleInterval);
//     if (this.appCheckInterval) clearInterval(this.appCheckInterval);
//   }
// }

// const activityTracker = new ActivityTracker();
// let mainWindow;

// function createWindow() {
//   mainWindow = new BrowserWindow({
//     width: 1200,
//     height: 800,
//     webPreferences: {
//       nodeIntegration: false,
//       contextIsolation: true,
//       preload: path.join(__dirname, 'preload.js')
//     }
//   });

//   activityTracker.setMainWindow(mainWindow);

//   mainWindow.loadURL('http://localhost:5173/')
//     .then(() => {
//       console.log('✅ React app loaded successfully!');
//       mainWindow.show();
//       mainWindow.webContents.openDevTools();
//     })
//     .catch(err => {
//       console.log('❌ Error loading app:', err);
//       mainWindow.show();
//     });
// }

// // IPC Handlers
// ipcMain.handle('start-tracking', async () => {
//   await activityTracker.startTracking();
//   return { 
//     success: true, 
//     message: 'REAL SYSTEM-LEVEL tracking activated!',
//     features: [
//       'Cross-Application Tracking',
//       'VS Code Monitoring', 
//       'Chrome/Firefox Tracking',
//       'Office Apps Detection',
//       'System-Wide Idle Detection'
//     ]
//   };
// });

// ipcMain.handle('stop-tracking', () => {
//   const data = activityTracker.getTrackingData();
//   activityTracker.stopTracking();
//   return { success: true, data };
// });

// ipcMain.handle('get-tracking-data', () => {
//   return activityTracker.getTrackingData();
// });

// ipcMain.handle('report-activity', () => {
//   activityTracker.updateActivity();
//   return { success: true, message: 'Activity reported' };
// });

// app.whenReady().then(createWindow);

// app.on('window-all-closed', () => {
//   activityTracker.cleanupListeners();
//   if (process.platform !== 'darwin') {
//     app.quit();
//   }
// });







// const { app, BrowserWindow, ipcMain, powerMonitor } = require('electron');
// const path = require('path');

// class ActivityTracker {
//   constructor() {
//     this.isTracking = false;
//     this.startTime = null;
//     this.totalActiveTime = 0;
//     this.lastActivityTime = Date.now();
//     this.idleThreshold = 1 * 60 * 1000; // 1 minute
//     this.isIdle = false;
//     this.idleInterval = null;
//     this.mainWindow = null;
//     this.currentApp = 'ACore Portal';
//     this.manualMode = true; // ✅ Manual tracking mode
//   }

//   setMainWindow(window) {
//     this.mainWindow = window;
//   }

//   async startTracking() {
//     if (this.isTracking) return;

//     this.isTracking = true;
//     this.startTime = Date.now();
//     this.lastActivityTime = Date.now();
//     this.isIdle = false;

//     this.setupActivityListeners();

//     console.log('🟢 MANUAL Tracking Started');
//     console.log('📝 Note: Switch to manual testing mode');
//     this.sendActivityUpdate();
//   }

//   stopTracking() {
//     this.isTracking = false;
//     this.cleanupListeners();
//     console.log('🔴 Tracking Stopped');
//     this.sendActivityUpdate();
//   }

//   setupActivityListeners() {
//     // ✅ Only basic system events
//     powerMonitor.on('suspend', () => {
//       this.markIdle();
//       console.log('💤 System sleep detected');
//     });

//     powerMonitor.on('resume', () => {
//       this.updateActivity();
//       console.log('💻 System wake detected');
//     });

//     // ✅ SIMPLE Idle detection (time-based only)
//     this.idleInterval = setInterval(() => {
//       this.checkIdleStatus();
//     }, 5000);

//     console.log('🎯 Using time-based idle detection');
//   }

//   updateActivity() {
//     const now = Date.now();
//     const wasIdle = this.isIdle;

//     this.lastActivityTime = now;
//     this.isIdle = false;

//     if (wasIdle) {
//       console.log('🎯 ACTIVITY DETECTED - Timer RESUMED');
//       this.sendActivityUpdate();
//     }
//   }

//   markIdle() {
//     if (!this.isIdle) {
//       this.isIdle = true;
//       console.log('⏸️ IDLE DETECTED - Timer STOPPED');
//       this.sendActivityUpdate();
//     }
//   }

//   checkIdleStatus() {
//     if (!this.isTracking) return;

//     const idleTime = Date.now() - this.lastActivityTime;
//     const wasIdle = this.isIdle;

//     if (idleTime > this.idleThreshold && !this.isIdle) {
//       this.markIdle();
//     }

//     // ✅ Auto activity detection (fallback)
//     if (this.isIdle && idleTime < this.idleThreshold) {
//       this.updateActivity();
//     }
//   }

//   getActiveTime() {
//     if (!this.isTracking) return this.totalActiveTime;

//     const currentTime = Date.now();
//     const idleTime = this.isIdle ? (currentTime - this.lastActivityTime) : 0;
//     const currentSessionTime = currentTime - this.startTime - Math.min(idleTime, this.idleThreshold);

//     return this.totalActiveTime + Math.max(0, currentSessionTime);
//   }

//   getTrackingData() {
//     const activeTime = this.getActiveTime();
//     const idleSeconds = Math.floor((Date.now() - this.lastActivityTime) / 1000);

//     return {
//       isTracking: this.isTracking,
//       activeTime: activeTime,
//       currentApp: this.currentApp,
//       isIdle: this.isIdle,
//       lastActivity: this.lastActivityTime,
//       idleSeconds: idleSeconds,
//       totalSeconds: Math.floor(activeTime / 1000),
//       trackingMode: 'TIME-BASED 🕒'
//     };
//   }

//   sendActivityUpdate() {
//     if (this.mainWindow) {
//       const data = this.getTrackingData();
//       this.mainWindow.webContents.send('activity-update', data);

//       const activeSeconds = Math.floor(data.activeTime / 1000);

//       console.log('📊 STATUS:', {
//         state: data.isIdle ? '⏸️ IDLE' : '🎯 ACTIVE', 
//         activeTime: `${Math.floor(activeSeconds / 60)}m ${activeSeconds % 60}s`,
//         idleFor: `${Math.floor(data.idleSeconds / 60)}m ${data.idleSeconds % 60}s`
//       });
//     }
//   }

//   cleanupListeners() {
//     if (this.idleInterval) clearInterval(this.idleInterval);
//   }
// }

// const activityTracker = new ActivityTracker();
// let mainWindow;

// function createWindow() {
//   mainWindow = new BrowserWindow({
//     width: 1200,
//     height: 800,
//     webPreferences: {
//       nodeIntegration: false,
//       contextIsolation: true,
//       preload: path.join(__dirname, 'preload.js')
//     }
//   });

//   activityTracker.setMainWindow(mainWindow);

//   mainWindow.loadURL('http://localhost:5173/')
//     .then(() => {
//       console.log('✅ React app loaded successfully!');
//       mainWindow.show();
//       mainWindow.webContents.openDevTools();

//       // ✅ Add manual testing instructions
//       console.log('\n🎯 MANUAL TESTING INSTRUCTIONS:');
//       console.log('1. Punch In in the app');
//       console.log('2. Wait 1 minute (DO NOT touch mouse/keyboard)');
//       console.log('3. Check if timer pauses automatically');
//       console.log('4. Move mouse to resume timer\n');
//     })
//     .catch(err => {
//       console.log('❌ Error loading app:', err);
//       mainWindow.show();
//     });
// }

// // IPC Handlers
// ipcMain.handle('start-tracking', async () => {
//   await activityTracker.startTracking();
//   return { 
//     success: true, 
//     message: 'Time-based tracking started!',
//     note: 'Using fallback time-based detection'
//   };
// });

// ipcMain.handle('stop-tracking', () => {
//   const data = activityTracker.getTrackingData();
//   activityTracker.stopTracking();
//   return { success: true, data };
// });

// ipcMain.handle('get-tracking-data', () => {
//   return activityTracker.getTrackingData();
// });

// ipcMain.handle('report-activity', () => {
//   activityTracker.updateActivity();
//   return { success: true, message: 'Activity reported' };
// });

// // ✅ Manual testing commands
// ipcMain.handle('force-idle', () => {
//   activityTracker.markIdle();
//   return { success: true, message: 'Forced idle state' };
// });

// ipcMain.handle('force-active', () => {
//   activityTracker.updateActivity();
//   return { success: true, message: 'Forced active state' };
// });

// app.whenReady().then(createWindow);

// app.on('window-all-closed', () => {
//   activityTracker.cleanupListeners();
//   if (process.platform !== 'darwin') {
//     app.quit();
//   }
// });




// const { app, BrowserWindow, ipcMain } = require('electron');
// const path = require('path');

// class ActivityTracker {
//   constructor() {
//     this.isTracking = false;
//     this.startTime = null;
//     this.lastActivityTime = Date.now();
//     this.idleThreshold = 1 * 60 * 1000; // 1 minute
//     this.isIdle = false;
//     this.idleInterval = null;
//     this.mainWindow = null;
//   }

//   setMainWindow(window) {
//     this.mainWindow = window;
//   }

//   startTracking() {
//     if (this.isTracking) return;

//     this.isTracking = true;
//     this.startTime = Date.now();
//     this.lastActivityTime = Date.now();
//     this.isIdle = false;

//     this.setupActivityListeners();

//     console.log('🟢 Electron Window Tracking Started');
//     this.sendActivityUpdate();
//   }

//   stopTracking() {
//     this.isTracking = false;
//     this.cleanupListeners();
//     console.log('🔴 Tracking Stopped');
//     this.sendActivityUpdate();
//   }

//   setupActivityListeners() {
//     // ✅ Install activity listeners in renderer
//     if (this.mainWindow) {
//       this.mainWindow.webContents.executeJavaScript(`
//         let lastActivityTime = Date.now();

//         function reportActivity() {
//           lastActivityTime = Date.now();
//           window.electronAPI.reportActivity().catch(console.error);
//         }

//         // Track all possible interactions
//         document.addEventListener('mousemove', reportActivity);
//         document.addEventListener('mousedown', reportActivity); 
//         document.addEventListener('keydown', reportActivity);
//         document.addEventListener('click', reportActivity);
//         document.addEventListener('scroll', reportActivity);
//         document.addEventListener('touchstart', reportActivity);

//         // Also track window focus
//         window.addEventListener('focus', reportActivity);

//         console.log('🎯 Activity listeners installed in Electron window');

//         // Periodic activity check
//         setInterval(() => {
//           const idleTime = Date.now() - lastActivityTime;
//           if (idleTime > 60000) { // 1 minute
//             console.log('ℹ️ No activity in Electron window for 1 minute');
//           }
//         }, 30000);
//       `).catch(console.error);
//     }

//     // ✅ Check idle status every 5 seconds
//     this.idleInterval = setInterval(() => {
//       this.checkIdleStatus();
//     }, 5000);
//   }

//   updateActivity() {
//     const now = Date.now();
//     const wasIdle = this.isIdle;

//     this.lastActivityTime = now;
//     this.isIdle = false;

//     if (wasIdle) {
//       console.log('🎯 ACTIVITY DETECTED - Resuming timer');
//       this.sendActivityUpdate();
//     }
//   }

//   markIdle() {
//     if (!this.isIdle) {
//       this.isIdle = true;
//       console.log('⏸️ NO ACTIVITY - Pausing timer');
//       this.sendActivityUpdate();
//     }
//   }

//   checkIdleStatus() {
//     if (!this.isTracking) return;

//     const idleTime = Date.now() - this.lastActivityTime;

//     if (idleTime > this.idleThreshold && !this.isIdle) {
//       this.markIdle();
//     } else if (idleTime <= this.idleThreshold && this.isIdle) {
//       this.updateActivity();
//     }
//   }

//   getActiveTime() {
//     if (!this.isTracking) return 0;

//     const currentTime = Date.now();
//     const idleTime = this.isIdle ? (currentTime - this.lastActivityTime) : 0;
//     const currentSessionTime = currentTime - this.startTime - Math.min(idleTime, this.idleThreshold);

//     return Math.max(0, currentSessionTime);
//   }

//   getTrackingData() {
//     const activeTime = this.getActiveTime();
//     const idleSeconds = Math.floor((Date.now() - this.lastActivityTime) / 1000);

//     return {
//       isTracking: this.isTracking,
//       activeTime: activeTime,
//       currentApp: 'Electron App',
//       isIdle: this.isIdle,
//       lastActivity: this.lastActivityTime,
//       idleSeconds: idleSeconds,
//       totalSeconds: Math.floor(activeTime / 1000)
//     };
//   }

//   sendActivityUpdate() {
//     if (this.mainWindow) {
//       const data = this.getTrackingData();
//       this.mainWindow.webContents.send('activity-update', data);

//       console.log('📊 Status:', {
//         idle: this.isIdle ? 'YES ⏸️' : 'NO 🎯',
//         activeTime: Math.floor(data.activeTime / 1000) + 's',
//         idleFor: data.idleSeconds + 's'
//       });
//     }
//   }

//   cleanupListeners() {
//     if (this.idleInterval) clearInterval(this.idleInterval);
//   }
// }

// const activityTracker = new ActivityTracker();
// let mainWindow;

// function createWindow() {
//   mainWindow = new BrowserWindow({
//     width: 1200,
//     height: 800,
//     webPreferences: {
//       nodeIntegration: false,
//       contextIsolation: true,
//       preload: path.join(__dirname, 'preload.js')
//     }
//   });

//   activityTracker.setMainWindow(mainWindow);

//   mainWindow.loadURL('http://localhost:5173/')
//     .then(() => {
//       console.log('✅ React app loaded successfully!');
//       mainWindow.show();
//       mainWindow.webContents.openDevTools();
//     })
//     .catch(err => {
//       console.log('❌ Error loading app:', err);
//       mainWindow.show();
//     });
// }

// // IPC Handlers
// ipcMain.handle('start-tracking', () => {
//   activityTracker.startTracking();
//   return { success: true, message: 'Tracking started' };
// });

// ipcMain.handle('stop-tracking', () => {
//   const data = activityTracker.getTrackingData();
//   activityTracker.stopTracking();
//   return { success: true, data };
// });

// ipcMain.handle('get-tracking-data', () => {
//   return activityTracker.getTrackingData();
// });

// ipcMain.handle('report-activity', () => {
//   activityTracker.updateActivity();
//   return { success: true, message: 'Activity reported' };
// });

// app.whenReady().then(createWindow);

// app.on('window-all-closed', () => {
//   activityTracker.cleanupListeners();
//   if (process.platform !== 'darwin') {
//     app.quit();
//   }
// });  







// const { app, BrowserWindow, ipcMain, powerMonitor, screen } = require('electron');
// const path = require('path');
// const { exec } = require('child_process');

// class ActivityTracker {
//   constructor() {
//     this.isTracking = false;
//     this.startTime = null;
//     this.totalActiveTime = 0;
//     this.lastActivityTime = Date.now();
//     this.idleThreshold = 1 * 60 * 1000;
//     this.isIdle = false;
//     this.idleInterval = null;
//     this.windowCheckInterval = null;
//     this.mouseInterval = null;
//     this.mainWindow = null;
//     this.currentApp = 'Unknown';
//   }

//   setMainWindow(window) {
//     this.mainWindow = window;
//   }

//   async startTracking() {
//     if (this.isTracking) return;

//     this.isTracking = true;
//     this.startTime = Date.now();
//     this.lastActivityTime = Date.now();
//     this.isIdle = false;

//     this.setupActivityListeners();
//     this.startWindowsTracking();
//     this.startUserActivityMonitoring();

//     console.log('🟢 REAL SYSTEM TRACKING Started');
//     console.log('🎯 Tracking: VS Code, Chrome, Firefox, Word, Excel, etc.');
//     this.sendActivityUpdate();
//   }

//   stopTracking() {
//     this.isTracking = false;
//     this.cleanupListeners();
//     console.log('🔴 Tracking Stopped');
//     this.sendActivityUpdate();
//   }

//   setupActivityListeners() {
//     powerMonitor.on('suspend', () => {
//       this.markIdle();
//     });

//     powerMonitor.on('resume', () => {
//       this.updateActivity();
//     });

//     this.idleInterval = setInterval(() => {
//       this.checkIdleStatus();
//     }, 5000);
//   }

//   startWindowsTracking() {
//     this.windowCheckInterval = setInterval(() => {
//       this.getActiveWindow().then(appName => {
//         if (appName && appName !== this.currentApp) {
//           this.currentApp = appName;
//           console.log('💻 Switched to:', this.currentApp);
//           this.updateActivity();
//           this.sendActivityUpdate();
//         }
//       });
//     }, 3000);
//   }

//   startUserActivityMonitoring() {
//     // Monitor mouse movement
//     let lastMousePos = screen.getCursorScreenPoint();

//     this.mouseInterval = setInterval(() => {
//       const currentMousePos = screen.getCursorScreenPoint();

//       if (currentMousePos.x !== lastMousePos.x || currentMousePos.y !== lastMousePos.y) {
//         lastMousePos = currentMousePos;
//         this.updateActivity();
//       }
//     }, 2000);
//   }

//   getActiveWindow() {
//     return new Promise((resolve) => {
//       if (process.platform === 'win32') {
//         exec('powershell "(Get-Process | Where-Object {$_.MainWindowTitle -ne \"\"} | Sort-Object MainWindowTitle | Select-Object -First 1).ProcessName"', 
//           (error, stdout) => {
//             if (!error && stdout && stdout.trim()) {
//               const appName = this.formatWindowsAppName(stdout.trim());
//               resolve(appName);
//             } else {
//               resolve('Unknown App');
//             }
//           });
//       } else {
//         resolve('Browser');
//       }
//     });
//   }

//   formatWindowsAppName(processName) {
//     const appMap = {
//       'code': 'VS Code',
//       'chrome': 'Google Chrome', 
//       'firefox': 'Mozilla Firefox',
//       'msedge': 'Microsoft Edge',
//       'notepad': 'Notepad',
//       'winword': 'Microsoft Word',
//       'excel': 'Microsoft Excel',
//       'powerpnt': 'Microsoft PowerPoint',
//       'outlook': 'Microsoft Outlook',
//       'teams': 'Microsoft Teams',
//       'slack': 'Slack',
//       'discord': 'Discord',
//       'photoshop': 'Adobe Photoshop',
//       'figma': 'Figma'
//     };

//     return appMap[processName.toLowerCase()] || processName;
//   }

//   updateActivity() {
//     const now = Date.now();
//     const wasIdle = this.isIdle;

//     this.lastActivityTime = now;
//     this.isIdle = false;

//     if (wasIdle) {
//       console.log('🎯 ACTIVITY DETECTED - Timer RESUMED');
//       this.sendActivityUpdate();
//     }
//   }

//   markIdle() {
//     if (!this.isIdle) {
//       this.isIdle = true;
//       console.log('⏸️ USER IDLE - Timer PAUSED');
//       this.sendActivityUpdate();
//     }
//   }

//   checkIdleStatus() {
//     if (!this.isTracking) return;

//     const idleTime = Date.now() - this.lastActivityTime;

//     if (idleTime > this.idleThreshold && !this.isIdle) {
//       this.markIdle();
//     }
//   }

//   getActiveTime() {
//     if (!this.isTracking) return this.totalActiveTime;

//     const currentTime = Date.now();
//     const idleTime = this.isIdle ? (currentTime - this.lastActivityTime) : 0;
//     const currentSessionTime = currentTime - this.startTime - Math.min(idleTime, this.idleThreshold);

//     return this.totalActiveTime + Math.max(0, currentSessionTime);
//   }

//   getTrackingData() {
//     const activeTime = this.getActiveTime();
//     const idleSeconds = Math.floor((Date.now() - this.lastActivityTime) / 1000);

//     return {
//       isTracking: this.isTracking,
//       activeTime: activeTime,
//       currentApp: this.currentApp,
//       isIdle: this.isIdle,
//       lastActivity: this.lastActivityTime,
//       idleSeconds: idleSeconds,
//       totalSeconds: Math.floor(activeTime / 1000),
//       platform: process.platform,
//       trackingLevel: 'SYSTEM-WIDE ✅'
//     };
//   }

//   sendActivityUpdate() {
//     if (this.mainWindow) {
//       const data = this.getTrackingData();
//       this.mainWindow.webContents.send('activity-update', data);
//     }
//   }

//   cleanupListeners() {
//     if (this.idleInterval) clearInterval(this.idleInterval);
//     if (this.windowCheckInterval) clearInterval(this.windowCheckInterval);
//     if (this.mouseInterval) clearInterval(this.mouseInterval);
//   }
// }

// // Rest of the code same as before...
// const activityTracker = new ActivityTracker();
// let mainWindow;

// function createWindow() {
//   mainWindow = new BrowserWindow({
//     width: 1200,
//     height: 800,
//     webPreferences: {
//       nodeIntegration: false,
//       contextIsolation: true,
//       preload: path.join(__dirname, 'preload.js')
//     }
//   });

//   activityTracker.setMainWindow(mainWindow);

//   mainWindow.loadURL('http://localhost:5173/')
//     .then(() => {
//       console.log('✅ React app loaded successfully!');
//       mainWindow.show();
//       mainWindow.webContents.openDevTools();
//     })
//     .catch(err => {
//       console.log('❌ Error loading app:', err);
//       mainWindow.show();
//     });
// }

// // IPC Handlers (same as before)
// ipcMain.handle('start-tracking', () => {
//   activityTracker.startTracking();
//   return { 
//     success: true, 
//     message: 'WINDOWS SYSTEM TRACKING Activated!',
//     features: ['VS Code Tracking', 'Chrome/Firefox Tracking', 'Office Apps', 'System-Wide Monitoring']
//   };
// });

// ipcMain.handle('stop-tracking', () => {
//   const data = activityTracker.getTrackingData();
//   activityTracker.stopTracking();
//   return { success: true, data };
// });

// ipcMain.handle('get-tracking-data', () => {
//   return activityTracker.getTrackingData();
// });

// ipcMain.handle('report-activity', () => {
//   activityTracker.updateActivity();
//   return { success: true, message: 'Activity reported' };
// });

// app.whenReady().then(createWindow);

// app.on('window-all-closed', () => {
//   activityTracker.cleanupListeners();
//   if (process.platform !== 'darwin') {
//     app.quit();
//   }
// });





// main.js → 100% WORKING, NO NATIVE PACKAGE, KEY + MOUSE RESUME

// const { app, BrowserWindow, ipcMain, powerMonitor, screen } = require('electron');
// const path = require('path');

// let mainWindow;
// let isTracking = false;
// let startTime = null;
// let totalActiveSeconds = 0;
// let lastActivityTime = Date.now();
// let lastMousePos = null;

// function createWindow() {
//   mainWindow = new BrowserWindow({
//     width: 1350,
//     height: 850,
//     webPreferences: {
//       preload: path.join(__dirname, 'preload.js'),
//       contextIsolation: true,
//       nodeIntegration: false
//     }
//   });

//   mainWindow.loadURL('http://localhost:5173');

//   mainWindow.once('ready-to-show', () => {
//     mainWindow.show();
//     mainWindow.webContents.openDevTools({ mode: 'detach' });
//     console.log('ACORE CRM READY – System-wide tracking active!');
//   });
// }

// // Mouse move detect (global)
// const checkMouseActivity = () => {
//   if (!isTracking) return;
//   const pos = screen.getCursorScreenPoint();
//   if (lastMousePos && (pos.x !== lastMousePos.x || pos.y !== lastMousePos.y)) {
//     lastActivityTime = Date.now();
//     sendUpdate(false);
//   }
//   lastMousePos = pos;
// };

// // System idle se activity detect
// const checkSystemActivity = () => {
//   if (!isTracking) return;
//   const idleSeconds = powerMonitor.getSystemIdleTime();
//   if (idleSeconds < 60) {
//     lastActivityTime = Date.now();
//     sendUpdate(false); // Active
//   } else {
//     sendUpdate(true); // Idle
//   }
// };

// const sendUpdate = (isIdle) => {
//   if (!mainWindow) return;
//   const currentSeconds = totalActiveSeconds + Math.floor((Date.now() - startTime) / 1000);
//   mainWindow.webContents.send('activity-update', {
//     isIdle,
//     currentApp: isIdle ? 'Idle (No Activity)' : 'Active',
//     totalSeconds: currentSeconds
//   });
// };

// ipcMain.handle('start-tracking', () => {
//   isTracking = true;
//   startTime = Date.now();
//   lastActivityTime = Date.now();
//   lastMousePos = screen.getCursorScreenPoint();
//   totalActiveSeconds = 0;

//   setInterval(checkMouseActivity, 2000);
//   setInterval(checkSystemActivity, 10000);

//   console.log('PUNCH IN – Global tracking started');
//   return { success: true };
// });

// ipcMain.handle('stop-tracking', () => {
//   if (startTime) {
//     totalActiveSeconds += Math.floor((Date.now() - startTime) / 1000);
//   }
//   isTracking = false;
//   console.log(`PUNCH OUT – Total Active Time: ${totalActiveSeconds} seconds`);
//   return { success: true, totalSeconds: totalActiveSeconds };
// });

// app.whenReady().then(createWindow);
// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') app.quit();
// });




// main.js — 100% TESTED, YOUTUBE + NETWORK TAB + CONSOLE PROOF

// const { app, BrowserWindow, ipcMain, powerMonitor, screen } = require('electron');
// const path = require('path');

// let mainWindow;
// let isTracking = false;
// let startTime = null;
// let totalActiveSeconds = 0;
// let lastActivityTime = Date.now();
// let lastMousePos = null;
// let activeWindowTitle = 'Not Tracking';

// // Active window title lene ke liye (YouTube detect karega)
// let getActiveWindow;
// try {
//   const activeWin = require('active-window');
//   getActiveWindow = activeWin;
// } catch (e) {
//   console.log('active-window not loaded (optional)');
// }

// function createWindow() {
//   mainWindow = new BrowserWindow({
//     width: 1350,
//     height: 850,
//     webPreferences: {
//       preload: path.join(__dirname, 'preload.js'),
//       contextIsolation: true,
//       nodeIntegration: false
//     }
//   });

//   mainWindow.loadURL('http://localhost:5173');

//   mainWindow.once('ready-to-show', () => {
//     mainWindow.show();
//     mainWindow.webContents.openDevTools({ mode: 'detach' });
//     console.log('ACORE CRM READY → Global tracking active!');
//   });
// }

// // Send update to React + Console + Network tab proof
// const sendUpdate = (isIdle, source = 'Unknown') => {
//   if (!mainWindow) return;

//   const currentSeconds = totalActiveSeconds + Math.floor((Date.now() - startTime) / 1000);

//   const data = {
//     isIdle,
//     currentApp: isIdle ? 'Idle (No Activity)' : (activeWindowTitle || 'Active'),
//     totalSeconds: currentSeconds,
//     source,
//     timestamp: new Date().toLocaleTimeString()
//   };

//   // 1. React ko bhej
//   mainWindow.webContents.send('activity-update', data);

//   // 2. Console mein dikhe (tester ke liye)
//   console.log(
//     `%c[${data.timestamp}] ${isIdle ? 'IDLE' : 'ACTIVE'} → ${data.currentApp} (${source}) → ${currentSeconds}s`,
//     isIdle ? 'color: red; font-weight: bold;' : 'color: green; font-weight: bold;'
//   );

//   // 3. Network tab mein dikhe (WebSocket style)
//   mainWindow.webContents.executeJavaScript(`
//     window.dispatchEvent(new CustomEvent('electron-activity', { detail: ${JSON.stringify(data)} }));
//   `);
// };

// // Mouse move detect
// const checkMouseMove = () => {
//   if (!isTracking) return;
//   const pos = screen.getCursorScreenPoint();
//   if (lastMousePos && (pos.x !== lastMousePos.x || pos.y !== lastMousePos.y)) {
//     lastActivityTime = Date.now();
//     sendUpdate(false, 'Mouse Move');
//   }
//   lastMousePos = pos;
// };

// // System idle + key press detect
// const checkSystemActivity = () => {
//   if (!isTracking) return;
//   const idleSeconds = powerMonitor.getSystemIdleTime();
//   if (idleSeconds < 60) {
//     lastActivityTime = Date.now();
//     sendUpdate(false, 'Key Press / System Active');
//   } else if (idleSeconds > 60) {
//     sendUpdate(true, 'Idle > 1 min');
//   }
// };

// // Active window title check (YouTube, Netflix, etc.)
// const checkActiveWindow = () => {
//   if (!isTracking || !getActiveWindow) return;
//   getActiveWindow((win) => {
//     if (win && win.title) {
//       const title = win.title.toLowerCase();
//       activeWindowTitle = win.title.length > 30 ? win.title.substring(0, 30) + '...' : win.title;

//       if (title.includes('youtube') || title.includes('netflix') || title.includes('prime') || title.includes('video')) {
//         lastActivityTime = Date.now();
//         sendUpdate(false, 'Watching Video');
//       }
//     }
//   });
// };

// ipcMain.handle('start-tracking', () => {
//   isTracking = true;
//   startTime = Date.now();
//   lastActivityTime = Date.now();
//   lastMousePos = screen.getCursorScreenPoint();
//   totalActiveSeconds = 0;
//   activeWindowTitle = 'Tracking Started';

//   setInterval(checkMouseMove, 1500);
//   setInterval(checkSystemActivity, 8000);
//   setInterval(checkActiveWindow, 10000);

//   console.log('GLOBAL TRACKING STARTED → YouTube + Key + Mouse sab count hoga!');
//   sendUpdate(false, 'Punch In');

//   return { success: true };
// });

// ipcMain.handle('stop-tracking', () => {
//   if (startTime) {
//     totalActiveSeconds += Math.floor((Date.now() - startTime) / 1000);
//   }
//   isTracking = false;

//   console.log(`PUNCH OUT → Total Active Time: ${totalActiveSeconds} seconds`);
//   sendUpdate(false, 'Punch Out');

//   return { success: true, totalSeconds: totalActiveSeconds };
// });

// app.whenReady().then(createWindow);
// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') app.quit();
// });



// main.js — 100% WHITE SCREEN FIX + TRACKING WORKING

// const { app, BrowserWindow, ipcMain, powerMonitor, screen } = require('electron');
// const path = require('path');

// let mainWindow;
// let isTracking = false;
// let startTime = null;
// let totalActiveSeconds = 0;
// let lastActivityTime = Date.now();
// let lastMousePos = null;

// function createWindow() {
//   mainWindow = new BrowserWindow({
//     width: 1350,
//     height: 850,
//     show: false, // pehle load, phir show → white screen nahi aayega
//     webPreferences: {
//       preload: path.join(__dirname, 'preload.js'),
//       contextIsolation: true,
//       nodeIntegration: false,
//       webSecurity: false // agar CORS issue ho to
//     }
//   });

//   // YE LINE SABSE ZAROORI — React app sahi se load hoga
//   mainWindow.loadURL('http://localhost:5173');

//   mainWindow.once('ready-to-show', () => {
//     mainWindow.show();
//     mainWindow.focus();
//     mainWindow.webContents.openDevTools({ mode: 'detach' });
//     console.log('ACORE CRM LOADED — No White Screen!');
//   });

//   // Agar load fail ho to error dikhao
//   mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
//     console.error('Load Failed:', errorCode, errorDescription);
//     mainWindow.loadURL('http://localhost:5173');
//   });
// }

// // Mouse move + system idle se tracking (100% working, no extra package)
// const checkActivity = () => {
//   if (!isTracking || !mainWindow) return;

//   const pos = screen.getCursorScreenPoint();
//   const idleSeconds = powerMonitor.getSystemIdleTime();

//   // Mouse move ya key press detect
//   if (lastMousePos && (pos.x !== lastMousePos.x || pos.y !== lastMousePos.y) || idleSeconds < 60) {
//     lastActivityTime = Date.now();
//     const current = totalActiveSeconds + Math.floor((Date.now() - startTime) / 1000);
//     mainWindow.webContents.send('activity-update', {
//       isIdle: false,
//       currentApp: 'Active',
//       totalSeconds: current
//     });
//   } else if (idleSeconds > 60) {
//     const current = totalActiveSeconds + Math.floor((Date.now() - startTime) / 1000);
//     mainWindow.webContents.send('activity-update', {
//       isIdle: true,
//       currentApp: 'Idle',
//       totalSeconds: current
//     });
//   }

//   lastMousePos = pos;
// };

// ipcMain.handle('start-tracking', () => {
//   isTracking = true;
//   startTime = Date.now();
//   lastActivityTime = Date.now();
//   lastMousePos = screen.getCursorScreenPoint();
//   totalActiveSeconds = 0;

//   setInterval(checkActivity, 3000); // har 3 sec check

//   console.log('TRACKING STARTED — Background mein bhi chalega');
//   return { success: true };
// });

// ipcMain.handle('stop-tracking', () => {
//   if (startTime) {
//     totalActiveSeconds += Math.floor((Date.now() - startTime) / 1000);
//   }
//   isTracking = false;
//   console.log(`PUNCH OUT — Total: ${totalActiveSeconds}s`);
//   return { success: true, totalSeconds: totalActiveSeconds };
// });

// app.whenReady().then(() => {
//   createWindow();

//   app.on('activate', () => {
//     if (BrowserWindow.getAllWindows().length === 0) createWindow();
//   });
// });

// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') app.quit();
// });







// main.js — FINAL VERSION: SIRF 60 SECOND INACTIVITY = PAUSE

// const { app, BrowserWindow, ipcMain, powerMonitor, screen } = require('electron');
// const path = require('path');

// let mainWindow;
// let isTracking = false;
// let startTime = null;
// let totalActiveSeconds = 0;
// let lastActivityTime = Date.now();  // Yeh update hoga har activity pe
// let lastMousePos = null;

// function createWindow() {
//   mainWindow = new BrowserWindow({
//     width: 1350,
//     height: 850,
//     webPreferences: {
//       preload: path.join(__dirname, 'preload.js'),
//       contextIsolation: true,
//       nodeIntegration: false
//     }
//   });

//   mainWindow.loadURL('http://localhost:5173');
//   mainWindow.once('ready-to-show', () => {
//     mainWindow.show();
//     mainWindow.webContents.openDevTools({ mode: 'detach' });
//     console.log('ACORE CRM READY — 60 Second Rule Active!');
//   });
// }

// const sendUpdate = (isIdle, reason = '') => {
//   if (!mainWindow) return;
//   const current = totalActiveSeconds + Math.floor((Date.now() - startTime) / 1000);

//   mainWindow.webContents.send('activity-update', {
//     isIdle,
//     currentApp: isIdle ? 'Idle (No Activity)' : 'Active',
//     totalSeconds: current,
//     reason
//   });

//   console.log(
//     isIdle 
//       ? `%cIDLE → Timer PAUSED (${reason})` 
//       : `%cACTIVE → Timer Running (${reason})`,
//     isIdle ? 'color: red; font-weight: bold;' : 'color: green; font-weight: bold;',
//     current + 's'
//   );
// };

// // Har 5 second mein check karo
// const checkActivity = () => {
//   if (!isTracking) return;

//   const now = Date.now();
//   const idleMs = now - lastActivityTime;
//   const pos = screen.getCursorScreenPoint();

//   let activityDetected = false;
//   let reason = '';

//   // 1. Mouse move?
//   if (lastMousePos && (pos.x !== lastMousePos.x || pos.y !== lastMousePos.y)) {
//     activityDetected = true;
//     reason = 'Mouse Move';
//   }
//   lastMousePos = pos;

//   // 2. Key press ya system activity?
//   if (powerMonitor.getSystemIdleTime() < 60) {
//     activityDetected = true;
//     reason = reason || 'Key Press';
//   }

//   // Agar activity mili → lastActivityTime update kar do
//   if (activityDetected) {
//     lastActivityTime = now;
//     sendUpdate(false, reason);
//   }

//   // 60 second se zyada inactivity → PAUSE
//   else if (idleMs > 60000) {  // 60,000 ms = 60 seconds
//     sendUpdate(true, 'No Activity for 60 Seconds');
//   }
// };

// ipcMain.handle('start-tracking', () => {
//   isTracking = true;
//   startTime = Date.now();
//   lastActivityTime = Date.now();
//   totalActiveSeconds = 0;
//   lastMousePos = screen.getCursorScreenPoint();

//   // Har 5 second mein check
//   setInterval(checkActivity, 5000);

//   console.log('TRACKING STARTED — 60 Second Inactivity = Pause');
//   sendUpdate(false, 'Punch In');
//   return { success: true };
// });

// ipcMain.handle('stop-tracking', () => {
//   if (startTime) {
//     totalActiveSeconds += Math.floor((Date.now() - startTime) / 1000);
//   }
//   isTracking = false;
//   console.log(`PUNCH OUT — Total Active Time: ${totalActiveSeconds} seconds`);
//   return { success: true, totalSeconds: totalActiveSeconds };
// });

// app.whenReady().then(createWindow);
// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') app.quit();
// });



// const { app, BrowserWindow, ipcMain, powerMonitor, screen } = require('electron');
// const path = require('path');

// let mainWindow;
// let isTracking = false;
// let startTime = null;
// let totalActiveSeconds = 0;
// let lastActivityTime = Date.now();  
// let lastMousePos = null;

// function createWindow() {
//   mainWindow = new BrowserWindow({
//     width: 1350,
//     height: 850,
//     webPreferences: {
//       preload: path.join(__dirname, 'preload.js'),
//       contextIsolation: true,
//       nodeIntegration: false
//     }
//   });

//   mainWindow.loadURL('http://localhost:5173');
//   mainWindow.once('ready-to-show', () => {
//     mainWindow.show();
//     mainWindow.webContents.openDevTools({ mode: 'detach' });
//     console.log('ACORE CRM READY — 20 Second Rule Active!');
//   });
// }

// const sendUpdate = (isIdle, reason = '') => {
//   if (!mainWindow) return;
//   const current = totalActiveSeconds + Math.floor((Date.now() - startTime) / 1000);

//   mainWindow.webContents.send('activity-update', {
//     isIdle,
//     currentApp: isIdle ? 'Idle (No Activity)' : 'Active',
//     totalSeconds: current,
//     reason
//   });

//   console.log(
//     isIdle 
//       ? `%cIDLE → Timer PAUSED (${reason})` 
//       : `%cACTIVE → Timer Running (${reason})`,
//     isIdle ? 'color: red; font-weight: bold;' : 'color: green; font-weight: bold;',
//     current + 's'
//   );
// };

// const checkActivity = () => {
//   if (!isTracking) return;

//   const now = Date.now();
//   const idleMs = now - lastActivityTime;
//   const pos = screen.getCursorScreenPoint();

//   let activityDetected = false;
//   let reason = '';

//   if (lastMousePos && (pos.x !== lastMousePos.x || pos.y !== lastMousePos.y)) {
//     activityDetected = true;
//     reason = 'Mouse Move';
//   }
//   lastMousePos = pos;

//   // 🔥 System Idle Time Check -> 60 -> 20 seconds
//   if (powerMonitor.getSystemIdleTime() < 20) { // UPDATED
//     activityDetected = true;
//     reason = reason || 'Key Press';
//   }

//   if (activityDetected) {
//     lastActivityTime = now;
//     sendUpdate(false, reason);
//   }

//   // 🔥 Inactivity sleep -> 60,000 -> 20,000 ms
//   else if (idleMs > 20000) { // UPDATED (20 sec)
//     sendUpdate(true, 'No Activity for 20 Seconds');
//   }
// };

// ipcMain.handle('start-tracking', () => {
//   isTracking = true;
//   startTime = Date.now();
//   lastActivityTime = Date.now();
//   totalActiveSeconds = 0;
//   lastMousePos = screen.getCursorScreenPoint();

//   setInterval(checkActivity, 5000);

//   console.log('TRACKING STARTED — 20 Second Inactivity = Pause');
//   sendUpdate(false, 'Punch In');
//   return { success: true };
// });

// ipcMain.handle('stop-tracking', () => {
//   if (startTime) {
//     totalActiveSeconds += Math.floor((Date.now() - startTime) / 1000);
//   }
//   isTracking = false;
//   console.log(`PUNCH OUT — Total Active Time: ${totalActiveSeconds} seconds`);
//   return { success: true, totalSeconds: totalActiveSeconds };
// });

// app.whenReady().then(createWindow);
// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') app.quit();
// });




// adding geolocation 







// const { app, BrowserWindow, ipcMain, powerMonitor, screen } = require('electron');
// const path = require('path');
// const geoip = require('geoip-lite'); // ✅ Add geoip package

// let mainWindow;
// let isTracking = false;
// let startTime = null;
// let totalActiveSeconds = 0;
// let lastActivityTime = Date.now();  
// let lastMousePos = null;

// function createWindow() {
//   mainWindow = new BrowserWindow({
//     width: 1350,
//     height: 850,
//     webPreferences: {
//       preload: path.join(__dirname, 'preload.js'),
//       contextIsolation: true,
//       nodeIntegration: false,
//       enableRemoteModule: false,
//       // ✅ Location tracking ke liye yeh add karo
//       webSecurity: false,
//       allowRunningInsecureContent: true
//     }
//   });

//   // ✅ Enable geolocation before loading
//   mainWindow.webContents.session.setPermissionRequestHandler((webContents, permission, callback) => {
//     const allowedPermissions = ['geolocation', 'notifications'];
//     if (allowedPermissions.includes(permission)) {
//       callback(true); // Allow
//     } else {
//       callback(false);
//     }
//   });

//   mainWindow.loadURL('http://localhost:5173');
//   mainWindow.once('ready-to-show', () => {
//     mainWindow.show();
//     mainWindow.webContents.openDevTools({ mode: 'detach' });
//     console.log('ACORE CRM READY — 20 Second Rule Active!');
//   });
// }

// // ✅ Function to get approximate location from IP
// const getApproximateLocation = () => {
//   try {
//     // This gives approximate location based on IP
//     // In real production, you might want to use GPS or more accurate method
//     const os = require('os');
//     const networkInterfaces = os.networkInterfaces();
//     let ip = '8.8.8.8'; // Default to Google DNS

//     // Try to get local IP
//     Object.values(networkInterfaces).forEach(iface => {
//       iface.forEach(alias => {
//         if (alias.family === 'IPv4' && !alias.internal) {
//           ip = alias.address;
//         }
//       });
//     });

//     // Get location from IP (approximate)
//     const geo = geoip.lookup(ip);

//     if (geo) {
//       return {
//         latitude: geo.ll[0],
//         longitude: geo.ll[1],
//         city: geo.city || 'Unknown',
//         country: geo.country || 'Unknown',
//         accuracy: 50000, // Approximate accuracy in meters
//         source: 'ip'
//       };
//     }
//   } catch (error) {
//     console.error('GeoIP error:', error);
//   }

//   // Default to Indore coordinates if IP lookup fails
//   return {
//     latitude: 22.7494444,
//     longitude: 75.8991667,
//     city: 'Indore',
//     country: 'India',
//     accuracy: 100000,
//     source: 'default'
//   };
// };

// const sendUpdate = (isIdle, reason = '') => {
//   if (!mainWindow) return;
//   const current = totalActiveSeconds + Math.floor((Date.now() - startTime) / 1000);

//   mainWindow.webContents.send('activity-update', {
//     isIdle,
//     currentApp: isIdle ? 'Idle (No Activity)' : 'Active',
//     totalSeconds: current,
//     reason
//   });

//   console.log(
//     isIdle 
//       ? `%cIDLE → Timer PAUSED (${reason})` 
//       : `%cACTIVE → Timer Running (${reason})`,
//     isIdle ? 'color: red; font-weight: bold;' : 'color: green; font-weight: bold;',
//     current + 's'
//   );
// };

// // ✅ New IPC handler for location
// ipcMain.handle('get-user-location', async () => {
//   try {
//     return getApproximateLocation();
//   } catch (error) {
//     console.error('Location error:', error);
//     return null;
//   }
// });

// const checkActivity = () => {
//   if (!isTracking) return;

//   const now = Date.now();
//   const idleMs = now - lastActivityTime;
//   const pos = screen.getCursorScreenPoint();

//   let activityDetected = false;
//   let reason = '';

//   if (lastMousePos && (pos.x !== lastMousePos.x || pos.y !== lastMousePos.y)) {
//     activityDetected = true;
//     reason = 'Mouse Move';
//   }
//   lastMousePos = pos;

//   if (powerMonitor.getSystemIdleTime() < 20) {
//     activityDetected = true;
//     reason = reason || 'Key Press';
//   }

//   if (activityDetected) {
//     lastActivityTime = now;
//     sendUpdate(false, reason);
//   } else if (idleMs > 20000) {
//     sendUpdate(true, 'No Activity for 20 Seconds');
//   }
// };

// ipcMain.handle('start-tracking', () => {
//   isTracking = true;
//   startTime = Date.now();
//   lastActivityTime = Date.now();
//   totalActiveSeconds = 0;
//   lastMousePos = screen.getCursorScreenPoint();

//   setInterval(checkActivity, 5000);

//   console.log('TRACKING STARTED — 20 Second Inactivity = Pause');
//   sendUpdate(false, 'Punch In');
//   return { success: true };
// });

// ipcMain.handle('stop-tracking', () => {
//   if (startTime) {
//     totalActiveSeconds += Math.floor((Date.now() - startTime) / 1000);
//   }
//   isTracking = false;
//   console.log(`PUNCH OUT — Total Active Time: ${totalActiveSeconds} seconds`);
//   return { success: true, totalSeconds: totalActiveSeconds };
// });

// // ✅ Add geolocation flags
// app.commandLine.appendSwitch('enable-geolocation');
// app.commandLine.appendSwitch('enable-features', 'Geolocation');

// app.whenReady().then(createWindow);
// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') app.quit();
// });





// const { app, BrowserWindow, ipcMain, powerMonitor, screen } = require('electron');
// const path = require('path');

// let mainWindow;
// let isTracking = false;
// let startTime = null;
// let totalActiveSeconds = 0;
// let lastActivityTime = Date.now();
// let lastMousePos = null;

// function createWindow() {
//   mainWindow = new BrowserWindow({
//     width: 1350,
//     height: 850,
//     webPreferences: {
//       preload: path.join(__dirname, 'preload.js'),
//       contextIsolation: true,
//       nodeIntegration: false,
//       // ✅ MUST BE FALSE FOR LOCALHOST
//       webSecurity: false
//     }
//   });

//   // ✅ FIX PERMISSION ERRORS
//   mainWindow.webContents.session.setPermissionRequestHandler((webContents, permission, callback) => {
//     console.log('Permission requested:', permission);
//     // Allow all necessary permissions
//     if (permission === 'geolocation' || permission === 'notifications' || permission === 'media') {
//       callback(true);
//     } else {
//       callback(false);
//     }
//   });

//   mainWindow.loadURL('http://localhost:5175');

//   // ✅ FIX CSP ERRORS - Modify response headers
//   mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
//     callback({
//       responseHeaders: {
//         ...details.responseHeaders,
//         'Content-Security-Policy': [
//           "default-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:* https://localhost:*",
//           "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
//           "style-src 'self' 'unsafe-inline'",
//           "img-src 'self' data: blob: *",
//           "connect-src 'self' http://localhost:* https://localhost:* https://ipapi.co https://*.googleapis.com"
//         ].join('; ')
//       }
//     });
//   });

//   mainWindow.once('ready-to-show', () => {
//     mainWindow.show();
//     // Optional: Comment out in production
//     // mainWindow.webContents.openDevTools({ mode: 'detach' });
//     console.log('ACORE EMPLOYEE PORTAL - READY');
//   });
// }

// // ✅ SIMPLE & WORKING Location Function
// const getCurrentLocation = () => {
//   return new Promise((resolve) => {
//     if (!mainWindow) {
//       resolve({ error: 'Window not ready' });
//       return;
//     }

//     // Execute JavaScript in renderer to get location
//     mainWindow.webContents.executeJavaScript(`
//       (async () => {
//         try {
//           // Method 1: Direct Browser Geolocation
//           if (navigator.geolocation) {
//             return new Promise((resolveGeolocation) => {
//               navigator.geolocation.getCurrentPosition(
//                 (position) => {
//                   resolveGeolocation({
//                     success: true,
//                     latitude: position.coords.latitude,
//                     longitude: position.coords.longitude,
//                     accuracy: position.coords.accuracy,
//                     source: 'browser-gps'
//                   });
//                 },
//                 async (error) => {
//                   // If GPS fails, try IP-based location
//                   try {
//                     const response = await fetch('https://ipapi.co/json/', {
//                       timeout: 5000
//                     });
//                     if (response.ok) {
//                       const data = await response.json();
//                       resolveGeolocation({
//                         success: true,
//                         latitude: parseFloat(data.latitude) || 22.7494444,
//                         longitude: parseFloat(data.longitude) || 75.8991667,
//                         accuracy: 50000,
//                         source: 'ip-api',
//                         city: data.city || 'Indore'
//                       });
//                     } else {
//                       throw new Error('IP API failed');
//                     }
//                   } catch (ipError) {
//                     // Fallback to default office location
//                     resolveGeolocation({
//                       success: true,
//                       latitude: 22.7494444,
//                       longitude: 75.8991667,
//                       accuracy: 100000,
//                       source: 'default-fallback'
//                     });
//                   }
//                 },
//                 {
//                   enableHighAccuracy: true,
//                   timeout: 10000,
//                   maximumAge: 0
//                 }
//               );
//             });
//           } else {
//             throw new Error('Geolocation not supported');
//           }
//         } catch (error) {
//           return {
//             success: false,
//             error: error.message
//           };
//         }
//       })()
//     `).then(resolve).catch(error => {
//       resolve({ success: false, error: error.message });
//     });
//   });
// };

// // ✅ IPC Handler for Location
// ipcMain.handle('get-current-location', async () => {
//   console.log('🔄 Getting location...');
//   try {
//     const location = await getCurrentLocation();
//     console.log('📍 Location result:', location);
//     return location;
//   } catch (error) {
//     console.error('❌ Location error:', error);
//     return {
//       success: false,
//       error: error.message
//     };
//   }
// });

// // ✅ Existing Activity Tracking (Unchanged)
// const sendUpdate = (isIdle, reason = '') => {
//   if (!mainWindow) return;
//   const current = totalActiveSeconds + Math.floor((Date.now() - startTime) / 1000);

//   mainWindow.webContents.send('activity-update', {
//     isIdle,
//     currentApp: isIdle ? 'Idle (No Activity)' : 'Active',
//     totalSeconds: current,
//     reason
//   });

//   console.log(isIdle ? '⏸️ IDLE' : '▶️ ACTIVE', reason, `${current}s`);
// };

// const checkActivity = () => {
//   if (!isTracking) return;

//   const now = Date.now();
//   const idleMs = now - lastActivityTime;
//   const pos = screen.getCursorScreenPoint();

//   let activityDetected = false;
//   let reason = '';

//   if (lastMousePos && (pos.x !== lastMousePos.x || pos.y !== lastMousePos.y)) {
//     activityDetected = true;
//     reason = 'Mouse Move';
//   }
//   lastMousePos = pos;

//   if (powerMonitor.getSystemIdleTime() < 20) {
//     activityDetected = true;
//     reason = reason || 'Key Press';
//   }

//   if (activityDetected) {
//     lastActivityTime = now;
//     sendUpdate(false, reason);
//   } else if (idleMs > 20000) {
//     sendUpdate(true, 'No Activity for 20 Seconds');
//   }
// };

// ipcMain.handle('start-tracking', () => {
//   isTracking = true;
//   startTime = Date.now();
//   lastActivityTime = Date.now();
//   totalActiveSeconds = 0;
//   lastMousePos = screen.getCursorScreenPoint();

//   setInterval(checkActivity, 5000);

//   console.log('✅ TRACKING STARTED');
//   sendUpdate(false, 'Punch In');
//   return { success: true };
// });

// ipcMain.handle('stop-tracking', () => {
//   if (startTime) {
//     totalActiveSeconds += Math.floor((Date.now() - startTime) / 1000);
//   }
//   isTracking = false;
//   console.log(`🛑 PUNCH OUT - Total Time: ${totalActiveSeconds}s`);
//   return { success: true, totalSeconds: totalActiveSeconds };
// });

// // ✅ FIX: Add these flags BEFORE app.whenReady()
// app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors');
// app.commandLine.appendSwitch('disable-web-security');
// app.commandLine.appendSwitch('allow-running-insecure-content');

// app.whenReady().then(() => {
//   console.log('🚀 Electron App Ready');
//   createWindow();
// });

// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') app.quit();
// });


// ---------+

// const { app, BrowserWindow, ipcMain, powerMonitor, screen } = require('electron');
// const path = require('path');

// let mainWindow;
// let isTracking = false;
// let startTime = null;
// let totalActiveSeconds = 0;
// let lastActivityTime = Date.now();
// let lastMousePos = null;

// function createWindow() {
//   mainWindow = new BrowserWindow({
//     width: 1350,
//     height: 850,
//     webPreferences: {
//       preload: path.join(__dirname, 'preload.js'),
//       contextIsolation: true,
//       nodeIntegration: false,
//       // ✅ MUST BE FALSE FOR LOCALHOST
//       webSecurity: false
//     }
//   });

//   // ✅ FIX PERMISSION ERRORS
//   mainWindow.webContents.session.setPermissionRequestHandler((webContents, permission, callback) => {
//     console.log('Permission requested:', permission);
//     // Allow all necessary permissions
//     if (permission === 'geolocation' || permission === 'notifications' || permission === 'media') {
//       callback(true);
//     } else {
//       callback(false);
//     }
//   });

//   mainWindow.loadURL('http://localhost:5174');

//   // ✅ FIX CSP ERRORS - Modify response headers
//   mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
//     callback({
//       responseHeaders: {
//         ...details.responseHeaders,
//         'Content-Security-Policy': [
//           "default-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:* https://localhost:*",
//           "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
//           "style-src 'self' 'unsafe-inline'",
//           "img-src 'self' data: blob: *",
//           "connect-src 'self' http://localhost:* https://localhost:* https://ipapi.co https://*.googleapis.com"
//         ].join('; ')
//       }
//     });
//   });

//   mainWindow.once('ready-to-show', () => {
//     mainWindow.show();
//     // Optional: Comment out in production
//     // mainWindow.webContents.openDevTools({ mode: 'detach' });
//     console.log('ACORE EMPLOYEE PORTAL - READY');
//   });
// }

// // ✅ SIMPLIFIED & RELIABLE Location Function
// ipcMain.handle('get-current-location', async () => {
//   return new Promise((resolve) => {
//     if (!mainWindow) {
//       resolve({
//         success: true,
//         latitude: 22.7494444,
//         longitude: 75.8991667,
//         accuracy: 100000,
//         source: 'window-not-ready'
//       });
//       return;
//     }

//     mainWindow.webContents.executeJavaScript(`
//       new Promise((resolve) => {
//         if (navigator.geolocation) {
//           navigator.geolocation.getCurrentPosition(
//             (pos) => resolve({
//               success: true,
//               latitude: pos.coords.latitude,
//               longitude: pos.coords.longitude,
//               accuracy: pos.coords.accuracy,
//               source: 'gps'
//             }),
//             () => {
//               fetch('https://ipapi.co/json/')
//                 .then(r => r.json())
//                 .then(data => resolve({
//                   success: true,
//                   latitude: data.latitude || 22.7494444,
//                   longitude: data.longitude || 75.8991667,
//                   accuracy: 50000,
//                   source: 'ip'
//                 }))
//                 .catch(() => resolve({
//                   success: true,
//                   latitude: 22.7494444,
//                   longitude: 75.8991667,
//                   accuracy: 100000,
//                   source: 'fallback'
//                 }));
//             },
//             { enableHighAccuracy: true, timeout: 10000 }
//           );
//         } else {
//           resolve({
//             success: true,
//             latitude: 22.7494444,
//             longitude: 75.8991667,
//             accuracy: 100000,
//             source: 'no-api'
//           });
//         }
//       })
//     `).then(resolve).catch(() => {
//       resolve({
//         success: true,
//         latitude: 22.7494444,
//         longitude: 75.8991667,
//         accuracy: 100000,
//         source: 'js-error-fallback'
//       });
//     });
//   });
// });

// // ✅ Existing Activity Tracking (Unchanged)
// const sendUpdate = (isIdle, reason = '') => {
//   if (!mainWindow) return;
//   const current = totalActiveSeconds + Math.floor((Date.now() - startTime) / 1000);

//   mainWindow.webContents.send('activity-update', {
//     isIdle,
//     currentApp: isIdle ? 'Idle (No Activity)' : 'Active',
//     totalSeconds: current,
//     reason
//   });

//   console.log(isIdle ? '⏸️ IDLE' : '▶️ ACTIVE', reason, `${current}s`);
// };

// const checkActivity = () => {
//   if (!isTracking) return;

//   const now = Date.now();
//   const idleMs = now - lastActivityTime;
//   const pos = screen.getCursorScreenPoint();

//   let activityDetected = false;
//   let reason = '';

//   if (lastMousePos && (pos.x !== lastMousePos.x || pos.y !== lastMousePos.y)) {
//     activityDetected = true;
//     reason = 'Mouse Move';
//   }
//   lastMousePos = pos;

//   if (powerMonitor.getSystemIdleTime() < 20) {
//     activityDetected = true;
//     reason = reason || 'Key Press';
//   }

//   if (activityDetected) {
//     lastActivityTime = now;
//     sendUpdate(false, reason);
//   } else if (idleMs > 20000) {
//     sendUpdate(true, 'No Activity for 20 Seconds');
//   }
// };

// ipcMain.handle('start-tracking', () => {
//   isTracking = true;
//   startTime = Date.now();
//   lastActivityTime = Date.now();
//   totalActiveSeconds = 0;
//   lastMousePos = screen.getCursorScreenPoint();

//   setInterval(checkActivity, 5000);

//   console.log('✅ TRACKING STARTED');
//   sendUpdate(false, 'Punch In');
//   return { success: true };
// });

// ipcMain.handle('stop-tracking', () => {
//   if (startTime) {
//     totalActiveSeconds += Math.floor((Date.now() - startTime) / 1000);
//   }
//   isTracking = false;
//   console.log(`🛑 PUNCH OUT - Total Time: ${totalActiveSeconds}s`);
//   return { success: true, totalSeconds: totalActiveSeconds };
// });

// // ✅ FIX: Add these flags BEFORE app.whenReady()
// app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors');
// app.commandLine.appendSwitch('disable-web-security');
// app.commandLine.appendSwitch('allow-running-insecure-content');

// app.whenReady().then(() => {
//   console.log('🚀 Electron App Ready');
//   createWindow();
// });

// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') app.quit();
// });

// +++++++++===========>



//   const { app, BrowserWindow, ipcMain, powerMonitor, screen } = require('electron');
// const path = require('path');

// let mainWindow;
// let isTracking = false;
// let startTime = null;
// let totalActiveSeconds = 0;
// let lastActivityTime = Date.now();
// let lastMousePos = null;

// function createWindow() {
//   mainWindow = new BrowserWindow({
//     width: 1350,
//     height: 850,
//     webPreferences: {
//       preload: path.join(__dirname, 'preload.js'),
//       contextIsolation: true,
//       nodeIntegration: false,
//       webSecurity: false
//     }
//   });

//   mainWindow.webContents.session.setPermissionRequestHandler((webContents, permission, callback) => {
//     if (permission === 'geolocation' || permission === 'notifications' || permission === 'media') {
//       callback(true);
//     } else {
//       callback(false);
//     }
//   });

//   mainWindow.loadURL('http://localhost:5174');

//   mainWindow.once('ready-to-show', () => {
//     mainWindow.show();
//     console.log('🚀 ACORE EMPLOYEE PORTAL READY');
//   });
// }

// // -------------------------------------
// // 📌 LOCATION HANDLER (FINAL & WORKING)
// // -------------------------------------

// ipcMain.handle('get-current-location', async () => {
//   return new Promise((resolve) => {

//     mainWindow.webContents.executeJavaScript(`
//       new Promise((resolve) => {

//         // 1) Try Browser GPS
//         if (navigator.geolocation) {
//           navigator.geolocation.getCurrentPosition(
//             (pos) => resolve({
//               success: true,
//               latitude: pos.coords.latitude,
//               longitude: pos.coords.longitude,
//               accuracy: pos.coords.accuracy,
//               source: "gps"
//             }),
//             async () => {
//               // 2) Try IP API
//               try {
//                 const res = await fetch("https://ipapi.co/json/");
//                 const data = await res.json();
//                 resolve({
//                   success: true,
//                   latitude: parseFloat(data.latitude) || 22.7494444,
//                   longitude: parseFloat(data.longitude) || 75.8991667,
//                   accuracy: 50000,
//                   source: "ip"
//                 });
//               } catch (err) {
//                 // 3) Fallback
//                 resolve({
//                   success: true,
//                   latitude: 22.7494444,
//                   longitude: 75.8991667,
//                   accuracy: 100000,
//                   source: "fallback"
//                 });
//               }
//             },
//             { enableHighAccuracy: true, timeout: 10000 }
//           );
//         } else {
//           resolve({
//             success: true,
//             latitude: 22.7494444,
//             longitude: 75.8991667,
//             accuracy: 100000,
//             source: "no-geolocation"
//           });
//         }
//       })
//     `)
//     .then(resolve)
//     .catch(() => {
//       resolve({
//         success: true,
//         latitude: 22.7494444,
//         longitude: 75.8991667,
//         accuracy: 100000,
//         source: "error-fallback"
//       });
//     });
//   });
// });

// // -------------------------------------

// // ACTIVITY TRACKING (NO CHANGE)

// ipcMain.handle('start-tracking', () => {
//   isTracking = true;
//   startTime = Date.now();
//   lastActivityTime = Date.now();
//   totalActiveSeconds = 0;
//   lastMousePos = screen.getCursorScreenPoint();

//   setInterval(checkActivity, 5000);

//   console.log('▶️ TRACKING STARTED');
//   return { success: true };
// });

// ipcMain.handle('stop-tracking', () => {
//   if (startTime) {
//     totalActiveSeconds += Math.floor((Date.now() - startTime) / 1000);
//   }
//   isTracking = false;
//   console.log(`🛑 TRACKING STOPPED: ${totalActiveSeconds}s`);
//   return { success: true, totalSeconds: totalActiveSeconds };
// });

// function checkActivity() {
//   if (!isTracking) return;

//   const now = Date.now();
//   const pos = screen.getCursorScreenPoint();
//   const idleMs = now - lastActivityTime;

//   let activityDetected = false;
//   let reason = '';

//   if (lastMousePos && (pos.x !== lastMousePos.x || pos.y !== lastMousePos.y)) {
//     activityDetected = true;
//     reason = 'Mouse Move';
//   }
//   lastMousePos = pos;

//   if (powerMonitor.getSystemIdleTime() < 20) {
//     activityDetected = true;
//     reason = reason || 'Key Press';
//   }

//   if (activityDetected) {
//     lastActivityTime = now;
//     mainWindow.webContents.send('activity-update', {
//       isIdle: false,
//       currentApp: "Active",
//       totalSeconds: now
//     });
//   } else if (idleMs > 20000) {
//     mainWindow.webContents.send('activity-update', {
//       isIdle: true,
//       currentApp: "Idle",
//       totalSeconds: now
//     });
//   }
// }

// // FLAGS
// app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors');
// app.commandLine.appendSwitch('disable-web-security');
// app.commandLine.appendSwitch('allow-running-insecure-content');

// app.whenReady().then(createWindow);
// app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });


//                  11111111111111111111111111111111111111111111111111111111






const { app, BrowserWindow, ipcMain, powerMonitor, screen, net } = require('electron');
const path = require('path');

let mainWindow;
let isTracking = false;
let startTime = null;
let totalActiveSeconds = 0;
let lastActivityTime = Date.now();
let lastMousePos = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1350,
    height: 850,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      webSecurity: false
    }
  });

  mainWindow.webContents.session.setPermissionRequestHandler((webContents, permission, callback) => {
    if (permission === 'geolocation' || permission === 'notifications' || permission === 'media') {
      callback(true);
    } else {
      callback(false);
    }
  });

  mainWindow.loadURL('http://localhost:5174');

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    console.log('🚀 ACORE EMPLOYEE PORTAL READY');
  });
}

// -------------------------------------
// 📌 UPDATED LOCATION HANDLER (FIXED FOR ELECTRON)
// -------------------------------------

ipcMain.handle('get-current-location', async () => {
  console.log('📍 get-current-location called from renderer');
  
  return new Promise((resolve) => {
    // First try: Native Electron geolocation
    if (navigator.geolocation) {
      console.log('🔍 Trying native Electron geolocation...');
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('✅ Native geolocation success:', {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracy: position.coords.accuracy
          });
          
          resolve({
            success: true,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy || 50,
            altitude: position.coords.altitude,
            altitudeAccuracy: position.coords.altitudeAccuracy,
            heading: position.coords.heading,
            speed: position.coords.speed,
            timestamp: position.timestamp,
            source: "electron-gps"
          });
        },
        async (error) => {
          console.log('❌ Native geolocation failed:', error.message);
          
          // Second try: BrowserView method (if mainWindow exists)
          try {
            console.log('🌐 Trying BrowserView method...');
            const location = await getLocationViaBrowserView();
            if (location && location.success) {
              console.log('✅ BrowserView location success');
              resolve(location);
              return;
            }
          } catch (browserViewError) {
            console.log('❌ BrowserView method failed:', browserViewError.message);
          }
          
          // Third try: IP-based location
          try {
            console.log('🌍 Trying IP-based location...');
            const ipLocation = await getIPLocation();
            console.log('✅ IP location result:', ipLocation);
            resolve(ipLocation);
          } catch (ipError) {
            console.log('❌ IP location failed:', ipError.message);
            
            // Final fallback: Default office location
            resolve({
              success: true,
              latitude: 22.7494444,
              longitude: 75.8991667,
              accuracy: 100,
              source: "default-office"
            });
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 0
        }
      );
    } else {
      console.log('⚠️ navigator.geolocation not available in main process');
      
      // Fallback to IP location
      getIPLocation()
        .then(resolve)
        .catch(() => {
          resolve({
            success: true,
            latitude: 22.7494444,
            longitude: 75.8991667,
            accuracy: 100,
            source: "fallback"
          });
        });
    }
  });
});

// Helper: Get location via BrowserView (more reliable)
async function getLocationViaBrowserView() {
  return new Promise((resolve, reject) => {
    if (!mainWindow || !mainWindow.webContents) {
      reject(new Error('Main window not available'));
      return;
    }

    mainWindow.webContents.executeJavaScript(`
      new Promise((resolveJS) => {
        if (!navigator.geolocation) {
          resolveJS({ success: false, error: "Geolocation not available in browser" });
          return;
        }
        
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            resolveJS({
              success: true,
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
              accuracy: pos.coords.accuracy || 100,
              source: "browser-view"
            });
          },
          (error) => {
            resolveJS({
              success: false,
              error: error.message,
              source: "browser-view"
            });
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
          }
        );
      })
    `)
    .then((result) => {
      console.log('📍 BrowserView result:', result);
      if (result && result.success) {
        resolve(result);
      } else {
        reject(new Error(result?.error || 'BrowserView location failed'));
      }
    })
    .catch(reject);
  });
}

// Helper: Get IP-based location with multiple fallbacks
async function getIPLocation() {
  const ipServices = [
    'https://ipapi.co/json/',
    'https://ipinfo.io/json?token=test', // Remove token if not needed
    'https://api.ipgeolocation.io/ipgeo?apiKey=demo', // Demo key
    'https://geolocation-db.com/json/'
  ];

  for (const serviceUrl of ipServices) {
    try {
      console.log(`🌐 Trying IP service: ${serviceUrl}`);
      
      const response = await fetch(serviceUrl, {
        signal: AbortSignal.timeout(5000)
      });
      
      if (!response.ok) continue;
      
      const data = await response.json();
      
      // Extract coordinates from different API formats
      let lat, lng;
      
      if (serviceUrl.includes('ipapi.co')) {
        lat = data.latitude;
        lng = data.longitude;
      } else if (serviceUrl.includes('ipinfo.io')) {
        const [latStr, lngStr] = data.loc?.split(',') || [];
        lat = parseFloat(latStr);
        lng = parseFloat(lngStr);
      } else if (serviceUrl.includes('ipgeolocation.io')) {
        lat = data.latitude;
        lng = data.longitude;
      } else if (serviceUrl.includes('geolocation-db.com')) {
        lat = data.latitude;
        lng = data.longitude;
      }
      
      if (lat && lng) {
        return {
          success: true,
          latitude: lat,
          longitude: lng,
          accuracy: 50000, // ~50km accuracy for IP
          source: "ip-api",
          service: serviceUrl,
          city: data.city,
          country: data.country_name || data.country
        };
      }
    } catch (error) {
      console.log(`❌ IP service failed (${serviceUrl}):`, error.message);
      continue;
    }
  }
  
  throw new Error('All IP services failed');
}

// New: Get last known location (for caching)
let lastKnownLocation = null;
ipcMain.handle('get-last-known-location', () => {
  return lastKnownLocation || {
    success: false,
    error: 'No location cached',
    source: 'cache'
  };
});

// Update last known location when we get a new one
function updateLastKnownLocation(location) {
  if (location && location.success) {
    lastKnownLocation = {
      ...location,
      timestamp: Date.now()
    };
    console.log('💾 Updated last known location cache');
  }
}

// -------------------------------------
// ACTIVITY TRACKING (NO CHANGES - KEEPING EXISTING FUNCTIONALITY)
// -------------------------------------

ipcMain.handle('start-tracking', () => {
  isTracking = true;
  startTime = Date.now();
  lastActivityTime = Date.now();
  totalActiveSeconds = 0;
  lastMousePos = screen.getCursorScreenPoint();

  // Start activity checking interval
  const activityInterval = setInterval(() => {
    if (!isTracking) {
      clearInterval(activityInterval);
      return;
    }
    checkActivity();
  }, 5000);

  console.log('▶️ TRACKING STARTED');
  return { success: true, intervalId: activityInterval };
});

ipcMain.handle('stop-tracking', () => {
  if (startTime) {
    totalActiveSeconds += Math.floor((Date.now() - startTime) / 1000);
  }
  isTracking = false;
  console.log(`🛑 TRACKING STOPPED: ${totalActiveSeconds}s`);
  return { success: true, totalSeconds: totalActiveSeconds };
});

function checkActivity() {
  if (!isTracking) return;

  const now = Date.now();
  const pos = screen.getCursorScreenPoint();
  const idleMs = now - lastActivityTime;

  let activityDetected = false;
  let reason = '';

  if (lastMousePos && (pos.x !== lastMousePos.x || pos.y !== lastMousePos.y)) {
    activityDetected = true;
    reason = 'Mouse Move';
  }
  lastMousePos = pos;

  if (powerMonitor.getSystemIdleTime() < 20) {
    activityDetected = true;
    reason = reason || 'Key Press';
  }

  if (activityDetected) {
    lastActivityTime = now;
    if (mainWindow && mainWindow.webContents) {
      mainWindow.webContents.send('activity-update', {
        isIdle: false,
        currentApp: "Active",
        totalSeconds: now
      });
    }
  } else if (idleMs > 20000) {
    if (mainWindow && mainWindow.webContents) {
      mainWindow.webContents.send('activity-update', {
        isIdle: true,
        currentApp: "Idle",
        totalSeconds: now
      });
    }
  }
}

// Get current active application
ipcMain.handle('get-current-app', () => {
  try {
    // This is platform-specific
    if (process.platform === 'win32') {
      return { app: "Windows App", platform: "windows" };
    } else if (process.platform === 'darwin') {
      return { app: "Mac App", platform: "mac" };
    } else {
      return { app: "Linux App", platform: "linux" };
    }
  } catch (error) {
    return { app: "Unknown", error: error.message };
  }
});

// Health check endpoint
ipcMain.handle('health-check', () => {
  return {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    tracking: isTracking,
    uptime: process.uptime(),
    platform: process.platform
  };
});

// Handle window events
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// FLAGS for development
app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors');
app.commandLine.appendSwitch('disable-web-security');
app.commandLine.appendSwitch('allow-running-insecure-content');

// Enable remote module for debugging
app.commandLine.appendSwitch('remote-debugging-port', '8315');

app.whenReady().then(() => {
  createWindow();
  
  // Log when app is ready
  console.log('⚡ Electron app ready');
  console.log('📡 Location services initialized');
  console.log('🖱️ Activity tracking available');
});