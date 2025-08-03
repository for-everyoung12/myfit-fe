import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [roleId, setRoleId] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      try {
        const decoded = jwtDecode(token);
        setUsername(decoded?.username || '');
        setEmail(decoded?.email || '');
        setRoleId(decoded?.roleId || '');
      } catch (e) {
        console.error('Invalid token');
      }
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    const decoded = jwtDecode(token);
    setUsername(decoded?.username || '');
    setEmail(decoded?.email || '');
    setRoleId(decoded?.roleId || '');
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUsername('');
    setEmail('');
    setRoleId('');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, email, roleId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
