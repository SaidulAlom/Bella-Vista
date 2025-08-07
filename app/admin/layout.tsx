"use client";

import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    // Check if we're on the login page
    const isLoginPage = window.location.pathname === '/admin/login';
    
    // If not authenticated and not on login page, redirect to login
    if (!isLoading && !isAuthenticated && !isLoginPage) {
      window.location.href = '/admin/login';
    }
    
    // If authenticated and on login page, redirect to admin dashboard
    if (!isLoading && isAuthenticated && isLoginPage) {
      window.location.href = '/admin';
    }
  }, [isAuthenticated, isLoading]);

  return <>{children}</>;
}
