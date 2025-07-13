import React from "react";
import { Outlet } from "react-router-dom";
import { DashboardSidebar } from "../components/sidebar/DashboardSidebar";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      <DashboardSidebar role="admin" userName="Admin" userEmail="admin@example.com" />
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
