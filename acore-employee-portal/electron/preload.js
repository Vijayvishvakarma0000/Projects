// const { contextBridge, ipcRenderer } = require('electron');

// contextBridge.exposeInMainWorld('electronAPI', {
//   // Activity tracking methods
//   startTracking: () => ipcRenderer.invoke('start-tracking'),
//   stopTracking: () => ipcRenderer.invoke('stop-tracking'),
//   getTrackingData: () => ipcRenderer.invoke('get-tracking-data'),
//   getCurrentApp: () => ipcRenderer.invoke('get-current-app'),
  
//   // Listen for activity updates
//   onActivityUpdate: (callback) => {
//     ipcRenderer.on('activity-update', (event, data) => callback(data));
//   },
  
//   // Remove listeners
//   removeAllListeners: () => {
//     ipcRenderer.removeAllListeners('activity-update');
//   }
// });


// const { contextBridge, ipcRenderer } = require('electron');

// // Expose protected methods that allow the renderer process to use
// // the ipcRenderer without exposing the entire object
// contextBridge.exposeInMainWorld('electronAPI', {
//   // Activity tracking methods
//   startTracking: () => ipcRenderer.invoke('start-tracking'),
//   stopTracking: () => ipcRenderer.invoke('stop-tracking'),
//   getTrackingData: () => ipcRenderer.invoke('get-tracking-data'),
//   getCurrentApp: () => ipcRenderer.invoke('get-current-app'),
  
//   // Listen for activity updates
//   onActivityUpdate: (callback) => {
//     ipcRenderer.on('activity-update', (event, data) => callback(data));
//   },
  
//   // Remove listeners
//   removeAllListeners: (channel) => {
//     ipcRenderer.removeAllListeners(channel);
//   }
// });





// const { contextBridge, ipcRenderer } = require('electron');

// contextBridge.exposeInMainWorld('electronAPI', {
//   startTracking: () => ipcRenderer.invoke('start-tracking'),
//   stopTracking: () => ipcRenderer.invoke('stop-tracking'),
//   getTrackingData: () => ipcRenderer.invoke('get-tracking-data'),
//   reportActivity: () => ipcRenderer.invoke('report-activity'),
  
//   // ✅ Real-time updates
//   onActivityUpdate: (callback) => {
//     ipcRenderer.on('activity-update', (event, data) => callback(data));
//   },
  
//   // ✅ Remove listeners
//   removeAllListeners: () => {
//     ipcRenderer.removeAllListeners('activity-update');
//   }
// });


// const { contextBridge, ipcRenderer } = require('electron');

// contextBridge.exposeInMainWorld('electronAPI', {
//   startTracking: () => ipcRenderer.invoke('start-tracking'),
//   stopTracking: () => ipcRenderer.invoke('stop-tracking'),
//   getTrackingData: () => ipcRenderer.invoke('get-tracking-data'),
//   reportActivity: () => ipcRenderer.invoke('report-activity'),
  
//   onActivityUpdate: (callback) => {
//     ipcRenderer.on('activity-update', (event, data) => callback(data));
//   },
  
//   removeAllListeners: () => {
//     ipcRenderer.removeAllListeners('activity-update');
//   }
// });


// updated code



// const { contextBridge, ipcRenderer } = require('electron');

// contextBridge.exposeInMainWorld('electronAPI', {
//   startTracking: () => ipcRenderer.invoke('start-tracking'),
//   stopTracking: () => ipcRenderer.invoke('stop-tracking'),
//   getTrackingData: () => ipcRenderer.invoke('get-tracking-data'),
//   reportActivity: () => ipcRenderer.invoke('report-activity'),
  
//   // ✅ Add location functions
//   getUserLocation: () => ipcRenderer.invoke('get-user-location'),
  
//   // Browser geolocation wrapper for Electron
//   getBrowserLocation: () => {
//     return new Promise((resolve) => {
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(
//           (position) => {
//             resolve({
//               latitude: position.coords.latitude,
//               longitude: position.coords.longitude,
//               accuracy: position.coords.accuracy,
//               source: 'browser'
//             });
//           },
//           (error) => {
//             console.log('Browser geolocation error:', error);
//             resolve(null);
//           },
//           {
//             enableHighAccuracy: true,
//             timeout: 10000,
//             maximumAge: 0
//           }
//         );
//       } else {
//         resolve(null);
//       }
//     });
//   },
  
//   onActivityUpdate: (callback) => {
//     ipcRenderer.on('activity-update', (event, data) => callback(data));
//   },
  
//   removeAllListeners: () => {
//     ipcRenderer.removeAllListeners('activity-update');
//   }
// });








const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  startTracking: () => ipcRenderer.invoke('start-tracking'),
  stopTracking: () => ipcRenderer.invoke('stop-tracking'),
  
  // ✅ Simple location function
  getSimpleLocation: () => ipcRenderer.invoke('get-simple-location'),
  
  onActivityUpdate: (callback) => {
    ipcRenderer.on('activity-update', (event, data) => callback(data));
  },
  
  removeAllListeners: () => {
    ipcRenderer.removeAllListeners('activity-update');
  }
});