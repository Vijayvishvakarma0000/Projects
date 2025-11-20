import { useState, useEffect, useRef } from 'react';

export const useAttendance = () => {
  const [isPunchedIn, setIsPunchedIn] = useState(false);
  const [punchInTime, setPunchInTime] = useState(null);
  const [workingHours, setWorkingHours] = useState(0);
  const [workingTime, setWorkingTime] = useState('00:00:00');
  const [canLogout, setCanLogout] = useState(false);
  const [loading, setLoading] = useState(false);

  const intervalRef = useRef(null);

  const handlePunch = async () => {
    setLoading(true);
    
    if (!isPunchedIn) {
      // Punch In
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsPunchedIn(true);
        setPunchInTime(new Date());
        setCanLogout(false);
        setLoading(false);
        return { success: true, action: 'in' };
      } catch (error) {
        setLoading(false);
        return { success: false, error: error.message };
      }
    } else {
      // Punch Out
      if (workingHours >= 7) {
        try {
          await new Promise(resolve => setTimeout(resolve, 1000));
          setIsPunchedIn(false);
          setPunchInTime(null);
          setWorkingHours(0);
          setWorkingTime('00:00:00');
          setCanLogout(false);
          setLoading(false);
          return { success: true, action: 'out' };
        } catch (error) {
          setLoading(false);
          return { success: false, error: error.message };
        }
      } else {
        setLoading(false);
        return { 
          success: false, 
          error: `Complete ${(7 - workingHours).toFixed(2)} more hours before punching out` 
        };
      }
    }
  };

  useEffect(() => {
    if (isPunchedIn && punchInTime) {
      intervalRef.current = setInterval(() => {
        const now = new Date();
        const diff = now - punchInTime;
        const hours = diff / (1000 * 60 * 60);
        setWorkingHours(hours);
        
        // Update working time display
        const totalSeconds = Math.floor(diff / 1000);
        const hoursFormatted = Math.floor(totalSeconds / 3600);
        const minutesFormatted = Math.floor((totalSeconds % 3600) / 60);
        const secondsFormatted = totalSeconds % 60;
        
        setWorkingTime(
          `${String(hoursFormatted).padStart(2, '0')}:${String(minutesFormatted).padStart(2, '0')}:${String(secondsFormatted).padStart(2, '0')}`
        );
        
        // Check if 7 hours completed
        if (hours >= 7) {
          setCanLogout(true);
        }
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPunchedIn, punchInTime]);

  return {
    isPunchedIn,
    workingHours,
    workingTime,
    canLogout,
    loading,
    handlePunch
  };
};