import React, { useEffect, useState } from "react";
import { getAllPlans } from "../../services/plan.service";

const PlanPage = () => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const data = await getAllPlans();
        setPlans(data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách gói:", error);
      }
    };

    fetchPlans();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Danh sách Gói Dịch Vụ</h1>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Tên gói</th>
              <th className="px-6 py-3">Mô tả</th>
              <th className="px-6 py-3">Thời hạn</th>
              <th className="px-6 py-3">Giá</th>
              <th className="px-6 py-3">Giảm giá</th>
              <th className="px-6 py-3">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {plans.map((plan) => (
              <tr key={plan.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-semibold text-gray-800">{plan.name}</td>
                <td className="px-6 py-4 text-gray-600">{plan.description}</td>
                <td className="px-6 py-4">{plan.durationMonths} tháng</td>
                <td className="px-6 py-4 text-green-600 font-semibold">
                  {plan.price.toLocaleString("vi-VN")}₫
                </td>
                <td className="px-6 py-4 text-blue-600">
                  {plan.discountPercent}%
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                      plan.isActive
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {plan.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlanPage;
