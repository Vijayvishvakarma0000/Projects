import { useState, useEffect, useCallback } from 'react';

const useActivityTracker = () => {
  const [trackingData, setTrackingData] = useState({
    isTracking: false,
    activeTime: 0,
    currentApp: 'Browser',
    isIdle: false,
    lastActivity: Date.now()
  });

  const [requiredHours] = useState(7); // 7 hours requirement

  // Start tracking
  const startTracking = useCallback(async () => {
    if (window.electronAPI) {
      try {
        await window.electronAPI.startTracking();
        setTrackingData(prev => ({ ...prev, isTracking: true }));
        return true;
      } catch (error) {
        console.error('Failed to start tracking:', error);
        return false;
      }
    }
    return false;
  }, []);

  // Stop tracking
  const stopTracking = useCallback(async () => {
    if (window.electronAPI) {
      try {
        const result = await window.electronAPI.stopTracking();
        setTrackingData(prev => ({ ...prev, isTracking: false }));
        return result;
      } catch (error) {
        console.error('Failed to stop tracking:', error);
        return null;
      }
    }
    return null;
  }, []);

  // Get current tracking status
  const getTrackingStatus = useCallback(async () => {
    if (window.electronAPI) {
      try {
        const data = await window.electronAPI.getTrackingData();
        setTrackingData(data);
        return data;
      } catch (error) {
        console.error('Failed to get tracking status:', error);
        return null;
      }
    }
    return null;
  }, []);

  // Calculate completed hours
  const getCompletedHours = useCallback(() => {
    return trackingData.activeTime / (1000 * 60 * 60); // Convert ms to hours
  }, [trackingData.activeTime]);

  // Check if can logout (7 hours completed)
  const canLogout = useCallback(() => {
    return getCompletedHours() >= requiredHours;
  }, [getCompletedHours, requiredHours]);

  // Format time display
  const getFormattedTime = useCallback(() => {
    const hours = Math.floor(getCompletedHours());
    const minutes = Math.floor((getCompletedHours() - hours) * 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }, [getCompletedHours]);

  // Update tracking data periodically
  useEffect(() => {
    if (trackingData.isTracking) {
      const interval = setInterval(async () => {
        await getTrackingStatus();
      }, 5000); // Update every 5 seconds

      return () => clearInterval(interval);
    }
  }, [trackingData.isTracking, getTrackingStatus]);

  // Listen for activity updates from Electron
  useEffect(() => {
    if (window.electronAPI && window.electronAPI.onActivityUpdate) {
      window.electronAPI.onActivityUpdate((data) => {
        setTrackingData(prev => ({ ...prev, ...data }));
      });
    }

    return () => {
      if (window.electronAPI && window.electronAPI.removeAllListeners) {
        window.electronAPI.removeAllListeners();
      }
    };
  }, []);

  return {
    trackingData,
    startTracking,
    stopTracking,
    getTrackingStatus,
    getCompletedHours,
    canLogout,
    getFormattedTime,
    requiredHours
  };
};

export default useActivityTracker;