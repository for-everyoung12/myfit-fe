import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isLoggedIn, roleId, loading } = useContext(AuthContext);

  if (loading) return <div>Đang xác thực...</div>; // ⏳ chờ auth

  if (!isLoggedIn) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(roleId)) return <Navigate to="/" replace />;

  return children;
};

export default ProtectedRoute;
