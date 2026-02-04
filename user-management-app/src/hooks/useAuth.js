import { useState, useEffect } from 'react';
import { login } from '../services/api';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const signIn = async (email, password) => {
    const { access_token } = await login(email, password);
    localStorage.setItem('token', access_token);
    setIsAuthenticated(true);
  };

  const signOut = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return { isAuthenticated, loading, signIn, signOut };
};