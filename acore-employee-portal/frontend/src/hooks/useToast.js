import { useState, useCallback } from 'react';

export const useToast = () => {
  const [toast, setToast] = useState({
    show: false,
    message: '',
    type: 'success' // success, error, warning
  });

  const showToast = useCallback((message, type = 'success') => {
    setToast({ show: true, message, type });
    
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 3000);
  }, []);

  const hideToast = useCallback(() => {
    setToast(prev => ({ ...prev, show: false }));
  }, []);

  return {
    toast,
    showToast,
    hideToast
  };
};