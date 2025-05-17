'use client';

import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in on mount
    const checkAuth = async () => {
      try {
        // In a real app, you would fetch the current user from an API
        const storedUser = localStorage.getItem('adminUser');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials) => {
    setIsLoading(true);
    try {
      // In a real app, you would call an API endpoint to verify credentials
      // This is a placeholder - replace with actual authentication logic
      if (credentials.email === 'admin@example.com' && credentials.password === 'password') {
        const user = { id: 1, name: 'Admin User', email: credentials.email, role: 'admin' };
        localStorage.setItem('adminUser', JSON.stringify(user));
        setUser(user);
        router.push('/admin');
        return { success: true };
      }
      return { success: false, error: 'Invalid credentials' };
    } catch (error) {
      console.error('Login failed:', error);
      return { success: false, error: 'Authentication failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('adminUser');
    setUser(null);
    router.push('/admin/login');
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 