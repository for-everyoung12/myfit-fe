import React, { useState } from "react";
import axios from "axios";

const users = [
  {
    id: 1,
    username: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    role: "User",
    status: "Active",
    avatar: "https://i.pravatar.cc/100?img=1",
    userId: "68669b4c0617dea426bbf57e",
  },
];

const UserManagementPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    amount: 1000,
    type: "topup",
    method: "manual",
    note: "Admin nạp sau khi kiểm tra MB Bank",
    createdBy: "admin@example.com",
  });

  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({
      amount: 1000,
      type: "topup",
      method: "manual",
      note: "Admin nạp sau khi kiểm tra MB Bank",
      createdBy: "admin@example.com",
    });
  };

  const handleSubmit = async () => {
    const payload = {
      ...formData,
      userId: selectedUser.userId,
      username: selectedUser.username,      // thêm dòng này
      avatar: selectedUser.avatar,
      createdAt: new Date().toISOString(),
    };
    try {
      await axios.post(
        "https://688f6988f21ab1769f891b1d.mockapi.io/api/v1/Auth/transactions",
        payload
      );
      alert("Nạp tiền thành công!");
      closeModal();
    } catch (error) {
      console.error("Lỗi khi nạp tiền:", error);
      alert("Nạp thất bại!");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">User Management</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded">
          + Add User
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">User</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 flex items-center gap-3">
                  <img
                    src={user.avatar}
                    alt={user.username}
                    className="w-9 h-9 rounded-full object-cover"
                  />
                  <span className="font-medium text-gray-800">{user.username}</span>
                </td>
                <td className="px-6 py-4 text-gray-600">{user.email}</td>
                <td className="px-6 py-4">{user.role}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${user.status === "Active"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                      }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button
                    onClick={() => openModal(user)}
                    className="text-purple-600 hover:underline"
                  >
                    Top-up
                  </button>
                  <button className="text-blue-600 hover:underline">Edit</button>
                  <button className="text-red-600 hover:underline">Disable</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[400px] space-y-4">
            <h2 className="text-lg font-semibold">Nạp tiền cho {selectedUser.username}</h2>

            {/* Preset Amount Buttons */}
            <div className="flex flex-wrap gap-2">
              {[10000, 20000, 50000, 100000].map((value) => (
                <button
                  key={value}
                  onClick={() => setFormData({ ...formData, amount: value })}
                  className={`px-3 py-1 rounded border ${formData.amount === value
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700"
                    }`}
                >
                  {value.toLocaleString("vi-VN")}₫
                </button>
              ))}
            </div>

            {/* Amount Input */}
            <input
              type="number"
              step="1000"
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: parseInt(e.target.value) })
              }
              className="w-full border px-3 py-2 rounded"
              placeholder="Số tiền"
            />

            {/* Note Input */}
            <textarea
              className="w-full border px-3 py-2 rounded"
              rows={3}
              value={formData.note}
              onChange={(e) =>
                setFormData({ ...formData, note: e.target.value })
              }
              placeholder="Ghi chú giao dịch"
            ></textarea>

            <div className="flex justify-end gap-2">
              <button onClick={closeModal} className="px-4 py-2 bg-gray-200 rounded">
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
