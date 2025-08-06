import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

// Tạo context
export const AuthContext = createContext();

// Provider bọc quanh app
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [roleId, setRoleId] = useState('');

  // Khi mở trang (hoặc refresh) => check token từ localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);

        setUsername(decoded?.username || '');
        setEmail(decoded?.email || '');
        setRoleId(decoded?.role || ''); // ✅ lấy đúng key "role"
        setIsLoggedIn(true);
      } catch (error) {
        console.error('Invalid token:', error);
        logout(); // Token lỗi thì logout
      }
    }
  }, []);

  // Hàm login để dùng sau khi submit form login
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

  // Hàm logout xoá token và reset state
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
