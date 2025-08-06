import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [roleId, setRoleId] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUsername(decoded?.username || '');
        setEmail(decoded?.email || '');
        setRoleId(decoded?.role || '');
        setIsLoggedIn(true);
      } catch (error) {
        console.error('Invalid token:', error);
        logout();
      }
    }
    setLoading(false); 
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    try {
      const decoded = jwtDecode(token);
      setUsername(decoded?.username || '');
      setEmail(decoded?.email || '');
      setRoleId(decoded?.role || '');
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Invalid token during login:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUsername('');
    setEmail('');
    setRoleId('');
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, username, email, roleId, login, logout, loading }} 
    >
      {children}
    </AuthContext.Provider>
  );
};
