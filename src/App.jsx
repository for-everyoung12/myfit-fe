import React, { Suspense, lazy, useContext, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import DashboardLayout from './layouts/DashboardLayout';
import { AuthContext } from './context/AuthContext';

// Public pages
const HomePage = lazy(() => import('./pages/Home'));
const Dowload = lazy(() => import('./pages/Dowload'));
const AboutUsPage = lazy(() => import('./pages/AboutUsPage/AboutUsPage'));
const ServicePage = lazy(() => import('./pages/ServicePage/ServicePage'));
const ContactPage = lazy(() => import('./pages/ContactPage/ContactPage'));
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
const RegisterPage = lazy(() => import('./pages/LoginPage/RegisterPage'));

// Dashboard pages
const ReportsPage = lazy(() => import('./pages/Admin/ReportsPage'));
const UserManagementPage = lazy(() => import('./pages/Admin/UserManagementPage'));
const TransactionPage = lazy(() => import('./pages/Admin/TransactionPage'));

// Component: Tự redirect người dùng sau login theo role
const RedirectAfterLogin = () => {
  const { isLoggedIn, roleId } = useContext(AuthContext);
  const navigate = useNavigate();

  const roleIdAdmin = "661fcf75e40000551e02a001"; // Admin Role ID

  useEffect(() => {
    if (!isLoggedIn) return;

    if (roleId === roleIdAdmin) {
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  }, [isLoggedIn, roleId]);

  return null;
};

function App() {
  return (
    <Suspense fallback={<div className="text-center py-20">Đang tải trang...</div>}>
      <RedirectAfterLogin />
      <Routes>
        {/* Public layout routes */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="download" element={<Dowload />} />
          <Route path="about" element={<AboutUsPage />} />
          <Route path="services" element={<ServicePage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>

        {/* Admin dashboard layout routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<ReportsPage />} />
          <Route path="users" element={<UserManagementPage />} />
          <Route path="transactions" element={<TransactionPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
