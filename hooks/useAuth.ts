"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userEmail, setUserEmail] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Check authentication status on component mount
    const checkAuth = () => {
      const authStatus = localStorage.getItem('adminAuthenticated');
      const email = localStorage.getItem('adminEmail');
      
      if (authStatus === 'true' && email) {
        setIsAuthenticated(true);
        setUserEmail(email);
      } else {
        setIsAuthenticated(false);
        setUserEmail('');
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = (email: string, password: string): Promise<boolean> => {
    return new Promise((resolve) => {
      // Simple admin credentials (in production, this would be in a database)
      const ADMIN_CREDENTIALS = {
        email: 'admin@restaurant.com',
        password: 'admin123'
      };

      if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
        localStorage.setItem('adminAuthenticated', 'true');
        localStorage.setItem('adminEmail', email);
        setIsAuthenticated(true);
        setUserEmail(email);
        resolve(true);
      } else {
        resolve(false);
      }
    });
  };

  const logout = () => {
    localStorage.removeItem('adminAuthenticated');
    localStorage.removeItem('adminEmail');
    setIsAuthenticated(false);
    setUserEmail('');
    router.push('/admin/login');
  };

  return {
    isAuthenticated,
    isLoading,
    userEmail,
    login,
    logout
  };
}
