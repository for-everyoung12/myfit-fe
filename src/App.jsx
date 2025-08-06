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
const PaymentPage = lazy(() => import('./pages/PaymentPage/PaymentPage'));

// Dashboard pages
const ReportsPage = lazy(() => import('./pages/Admin/ReportsPage'));
const UserManagementPage = lazy(() => import('./pages/Admin/UserManagementPage'));
const TransactionPage = lazy(() => import('./pages/Admin/TransactionPage'));
const PlanPage = lazy(() => import('./pages/Admin/PlanPage'));
const Subcriptions = lazy(() => import('./pages/Admin/Subcriptions'));

const RedirectAfterLogin = () => {
  const { isLoggedIn, roleId } = useContext(AuthContext);
  const navigate = useNavigate();

  const roleIdAdmin = "661fcf75e40000551e02a001"; 

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
          <Route path="payment" element={<PaymentPage />} />
        </Route>

        {/* Admin dashboard layout routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<ReportsPage />} />
          <Route path="users" element={<UserManagementPage />} />
          <Route path="transactions" element={<TransactionPage />} />
          <Route path="plans" element={<PlanPage />} />
          <Route path="subscriptions" element={<Subcriptions />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
