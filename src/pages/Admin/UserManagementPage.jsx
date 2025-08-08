import React, { useState, useEffect } from "react";
import Select from "react-select";
import { getAllUsers } from "../../services/auth.service";
import { getAllPlans } from "../../services/plan.service";
import { enrollPlan } from "../../services/payment.service";

const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [plans, setPlans] = useState([]);
  const [banks, setBanks] = useState([]);
  const [bankOptions, setBankOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    planId: "",
    amount: 0,
    paymentContent: "",
    bankName: "",
    bankRefNumber: "",
  });

  const ROLE_MAP = {
    "661fcf75e40000551e02a001": "admin",
    "661fcf75e40000551e02a002": "user",
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await getAllUsers();
        setUsers(userData);
        setFilteredUsers(userData);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách người dùng:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = users.filter((user) =>
      user.id.toLowerCase().includes(value)
    );
    setFilteredUsers(filtered);
  };

  const fetchBanks = async () => {
    try {
      const res = await fetch("https://api.vietqr.io/v2/banks");
      const data = await res.json();
      setBanks(data.data);
      setBankOptions(
        data.data.map((bank) => ({
          value: bank.shortName,
          label: `${bank.shortName} - ${bank.name}`,
        }))
      );
    } catch (error) {
      console.error("Lỗi khi lấy danh sách ngân hàng:", error);
    }
  };

  const openModal = async (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
    setFormData({
      planId: "",
      amount: 0,
      paymentContent: "",
      bankName: "",
      bankRefNumber: "",
    });

    try {
      const planData = await getAllPlans();
      setPlans(planData);
      await fetchBanks();
    } catch (error) {
      console.error("Lỗi khi load dữ liệu:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async () => {
    const payload = {
      ...formData,
      userId: selectedUser.id,
    };

    try {
      await enrollPlan(payload);
      alert("Đăng ký thành công!");
      closeModal();
    } catch (error) {
      console.error("Lỗi khi enroll plan:", error);
      alert("Đăng ký thất bại!");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">User Management</h1>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Tìm theo ID..."
            className="px-3 py-1 text-sm border rounded"
          />
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded">
            + Add User
          </button>
        </div>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">{user.username}</td>
                <td className="px-4 py-3 text-gray-600">{user.email}</td>
                <td className="px-4 py-3">
                  {ROLE_MAP[user.roleId] || "unknown"}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                      user.isActive
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {user.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right space-x-2">
                  <button
                    onClick={() => openModal(user)}
                    className="text-purple-600 hover:underline"
                  >
                    Enroll Plan
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[400px] space-y-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-semibold">
              Enroll Plan cho {selectedUser.username}
            </h2>

            {/* Chọn gói */}
            <select
              className="w-full px-3 py-2 border rounded"
              value={formData.planId}
              onChange={(e) => {
                const selected = plans.find((p) => p.id === e.target.value);
                setFormData((prev) => ({
                  ...prev,
                  planId: selected.id,
                  amount: selected.price,
                  paymentContent: `NAP ${selected.id} ${selectedUser.id}`,
                }));
              }}
            >
              <option value="">Chọn gói...</option>
              {plans.map((plan) => (
                <option key={plan.id} value={plan.id}>
                  {plan.name} - {(plan.price / 1000).toFixed(0)}K
                </option>
              ))}
            </select>

            {/* Chọn ngân hàng */}
            <Select
              className="w-full text-sm"
              options={bankOptions}
              placeholder="Chọn ngân hàng..."
              value={bankOptions.find((opt) => opt.value === formData.bankName)}
              onChange={(selectedOption) =>
                setFormData({ ...formData, bankName: selectedOption?.value || "" })
              }
              menuPlacement="bottom"
              styles={{
                menu: (provided) => ({ ...provided, zIndex: 9999 }),
              }}
            />

            {/* Mã giao dịch ngân hàng */}
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              placeholder="Mã giao dịch ngân hàng"
              value={formData.bankRefNumber}
              onChange={(e) =>
                setFormData({ ...formData, bankRefNumber: e.target.value })
              }
            />

            {/* Nội dung chuyển khoản */}
            <textarea
              className="w-full border px-3 py-2 rounded"
              rows={2}
              value={formData.paymentContent}
              onChange={(e) =>
                setFormData({ ...formData, paymentContent: e.target.value })
              }
              placeholder="Nội dung chuyển khoản"
            ></textarea>

            <div className="flex justify-end gap-2">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Hủy
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagementPage;
