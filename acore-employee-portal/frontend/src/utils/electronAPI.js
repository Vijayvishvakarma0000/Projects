// // Utility functions for Electron API
// export const isElectron = () => {
//   return !!(window && window.electronAPI);
// };

// export const startActivityTracking = async () => {
//   if (isElectron()) {
//     return await window.electronAPI.startTracking();
//   }
//   return { success: false, error: 'Electron not available' };
// };

// export const stopActivityTracking = async () => {
//   if (isElectron()) {
//     return await window.electronAPI.stopTracking();
//   }
//   return { success: false, error: 'Electron not available' };
// };

// export const getActivityData = async () => {
//   if (isElectron()) {
//     return await window.electronAPI.getTrackingData();
//   }
//   return null;
// };

// export const setupActivityListener = (callback) => {
//   if (isElectron() && window.electronAPI.onActivityUpdate) {
//     window.electronAPI.onActivityUpdate(callback);
//   }
// };

// export const removeActivityListeners = () => {
//   if (isElectron() && window.electronAPI.removeAllListeners) {
//     window.electronAPI.removeAllListeners();
//   }
// };