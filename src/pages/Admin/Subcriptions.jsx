import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../services/auth.service";
import { getAllPlans } from "../../services/plan.service"; // Nhớ tạo hoặc import đúng

const Subcriptions = () => {
  const [usersWithPlan, setUsersWithPlan] = useState([]);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [users, planList] = await Promise.all([
          getAllUsers(),
          getAllPlans(),
        ]);

        const filtered = users.filter((user) => !!user.planId);
        setUsersWithPlan(filtered);
        setPlans(planList);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getPlanName = (planId) => {
    const plan = plans.find((p) => p.id === planId);
    return plan ? plan.name : "Không xác định";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-gray-600">
        <p className="text-lg animate-pulse">Đang tải dữ liệu...</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-white min-h-screen text-gray-800">
      <h1 className="text-2xl font-bold mb-6">Người dùng đã mua gói</h1>

      {usersWithPlan.length === 0 ? (
        <p className="text-red-500">Chưa có ai mua gói.</p>
      ) : (
        <div className="overflow-x-auto shadow border border-gray-200 rounded">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Username</th>
                <th className="px-4 py-3">Tên gói</th>
                <th className="px-4 py-3">Ngày bắt đầu</th>
                <th className="px-4 py-3">Ngày kết thúc</th>
              </tr>
            </thead>
            <tbody>
              {usersWithPlan.map((user, index) => (
                <tr key={user._id} className="border-t hover:bg-gray-50 transition">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2 capitalize">{user.username}</td>
                  <td className="px-4 py-2 font-medium text-gray-900">
                    {getPlanName(user.planId)}
                  </td>
                  <td className="px-4 py-2">
                    {user.planStart ? new Date(user.planStart).toLocaleDateString() : "-"}
                  </td>
                  <td className="px-4 py-2">
                    {user.planEnd ? new Date(user.planEnd).toLocaleDateString() : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Subcriptions;
