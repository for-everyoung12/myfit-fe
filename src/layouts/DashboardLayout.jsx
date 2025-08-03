import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { DashboardSidebar } from "../components/sidebar/DashboardSidebar";
import { AuthContext } from "../context/AuthContext";

const DashboardLayout = () => {
  const { username, email } = useContext(AuthContext);

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      <DashboardSidebar
        role="admin"
        userName={username}
        userEmail={email}
      />
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
