import { useState } from 'react';
import { EMPLOYEE_DATA } from '../data/mockData';

export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      
      setTimeout(() => {
        if (email && password) {
          setCurrentUser(EMPLOYEE_DATA);
          setLoading(false);
          resolve(EMPLOYEE_DATA);
        } else {
          setLoading(false);
          reject(new Error('Please enter email and password'));
        }
      }, 1500);
    });
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return {
    currentUser,
    loading,
    login,
    logout
  };
};