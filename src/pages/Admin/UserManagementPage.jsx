import React, { useState, useEffect } from "react";
import Select from "react-select";
import { getAllUsers, getUserById, updateUser, deleteUser } from "../../services/auth.service";
import { getAllPlans } from "../../services/plan.service";
import { enrollPlan } from "../../services/payment.service";

const ROLE_MAP = {
  "661fcf75e40000551e02a001": "admin",
  "661fcf75e40000551e02a002": "user",
};
const ROLES = [
  { id: "661fcf75e40000551e02a002", label: "user" },
  { id: "661fcf75e40000551e02a001", label: "admin" },
];

export default function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [plans, setPlans] = useState([]);
  const [bankOptions, setBankOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [isEnrollOpen, setIsEnrollOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);
  const [detailUser, setDetailUser] = useState(null);
  const [editForm, setEditForm] = useState({ roleId: "", isActive: true });
  const [formData, setFormData] = useState({
    planId: "",
    amount: 0,
    paymentContent: "",
    bankName: "",
    bankRefNumber: "",
  });
  const [loadingRow, setLoadingRow] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
        setFilteredUsers(data);
      } catch (e) {
        console.error("Fetch users failed", e);
      }
    })();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    setFilteredUsers(
      users.filter(
        (u) =>
          u.id.toLowerCase().includes(value) ||
          (u.username || "").toLowerCase().includes(value) ||
          (u.email || "").toLowerCase().includes(value)
      )
    );
  };

  const fetchBanks = async () => {
    try {
      const res = await fetch("https://api.vietqr.io/v2/banks");
      const data = await res.json();
      setBankOptions(
        (data.data || []).map((b) => ({
          value: b.shortName,
          label: `${b.shortName} - ${b.name}`,
        }))
      );
    } catch (e) {
      console.error("Fetch banks failed", e);
    }
  };

  const openEnroll = async (user) => {
    setSelectedUser(user);
    setIsEnrollOpen(true);
    setFormData({ planId: "", amount: 0, paymentContent: "", bankName: "", bankRefNumber: "" });
    try {
      const planData = await getAllPlans();
      setPlans(planData);
      await fetchBanks();
    } catch (e) {
      console.error("Load enroll data failed", e);
    }
  };

  const openDetail = async (user) => {
    setLoadingRow(user.id);
    try {
      const full = await getUserById(user.id);
      setDetailUser(full);
      setIsDetailOpen(true);
    } catch (e) {
      console.error(e);
      alert("Không tải được chi tiết user");
    } finally {
      setLoadingRow(null);
    }
  };

  const openEdit = (user) => {
    setSelectedUser(user);
    setEditForm({ roleId: user.roleId, isActive: !!user.isActive });
    setIsEditOpen(true);
  };

  const handleUpdateUser = async () => {
    if (!selectedUser) return;
    setLoadingRow(selectedUser.id);
    try {
      const updated = await updateUser(selectedUser.id, editForm);
      setUsers((prev) => prev.map((u) => (u.id === updated.id ? { ...u, ...updated } : u)));
      setFilteredUsers((prev) => prev.map((u) => (u.id === updated.id ? { ...u, ...updated } : u)));
      setIsEditOpen(false);
    } catch (e) {
      console.error(e);
      alert("Cập nhật thất bại");
    } finally {
      setLoadingRow(null);
    }
  };

  const handleDelete = async (user) => {
    if (!confirm(`Xóa user "${user.username}"? Hành động này không thể hoàn tác.`)) return;
    setLoadingRow(user.id);
    try {
      await deleteUser(user.id);
      setUsers((prev) => prev.filter((u) => u.id !== user.id));
      setFilteredUsers((prev) => prev.filter((u) => u.id !== user.id));
    } catch (e) {
      console.error(e);
      alert("Xóa thất bại");
    } finally {
      setLoadingRow(null);
    }
  };

  const handleEnrollSubmit = async () => {
    if (!selectedUser) return;
    try {
      await enrollPlan({ ...formData, userId: selectedUser.id });
      alert("Enroll thành công!");
      setIsEnrollOpen(false);
    } catch (e) {
      console.error(e);
      alert("Enroll thất bại");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header + search */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">User Management</h1>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Tìm theo ID, email, username..."
            className="px-3 py-1 text-sm border rounded"
          />
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded">
            + Add User
          </button>
        </div>
      </div>

      {/* Table */}
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
                <td className="px-4 py-3">{ROLE_MAP[user.roleId] || "unknown"}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${user.isActive ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                      }`}
                  >
                    {user.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right space-x-3">
                  <button
                    onClick={() => openDetail(user)}
                    className="text-gray-700 hover:underline"
                    disabled={loadingRow === user.id}
                  >
                    View
                  </button>
                  <button
                    onClick={() => openEdit(user)}
                    className="text-blue-600 hover:underline"
                    disabled={loadingRow === user.id}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => openEnroll(user)}
                    className="text-purple-600 hover:underline"
                  >
                    Enroll Plan
                  </button>
                  <button
                    onClick={() => handleDelete(user)}
                    className="text-red-600 hover:underline"
                    disabled={loadingRow === user.id}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-center text-gray-500" colSpan={6}>
                  Không có user nào phù hợp bộ lọc
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal: View detail */}
      {isDetailOpen && detailUser && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[520px] space-y-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-semibold">User Detail</h2>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><span className="text-gray-500">ID:</span> {detailUser.id}</div>
              <div><span className="text-gray-500">Username:</span> {detailUser.username}</div>
              <div><span className="text-gray-500">Email:</span> {detailUser.email}</div>
              <div><span className="text-gray-500">Role:</span> {ROLE_MAP[detailUser.roleId] || "unknown"}</div>
              <div><span className="text-gray-500">Active:</span> {detailUser.isActive ? "Yes" : "No"}</div>

              {/* Gender */}
              <div>
                <span className="text-gray-500">Gender:</span>{" "}
                {detailUser.gender === 0
                  ? "Male"
                  : detailUser.gender === 1
                    ? "Female"
                    : "Other"}
              </div>

              {/* Height & Weight */}
              <div><span className="text-gray-500">Height:</span> {detailUser.height ?? "N/A"}</div>
              <div><span className="text-gray-500">Weight:</span> {detailUser.weight ?? "N/A"}</div>

              {detailUser.createdAt && (
                <div className="col-span-2">
                  <span className="text-gray-500">Created:</span>{" "}
                  {new Date(detailUser.createdAt).toLocaleString()}
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setIsDetailOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Edit role & status */}
      {isEditOpen && selectedUser && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[420px] space-y-4">
            <h2 className="text-lg font-semibold">Edit User</h2>

            <label className="block text-sm text-gray-600">Role</label>
            <select
              className="w-full border rounded px-3 py-2"
              value={editForm.roleId}
              onChange={(e) => setEditForm((p) => ({ ...p, roleId: e.target.value }))}
            >
              {ROLES.map((r) => (
                <option key={r.id} value={r.id}>{r.label}</option>
              ))}
            </select>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={editForm.isActive}
                onChange={(e) => setEditForm((p) => ({ ...p, isActive: e.target.checked }))}
              />
              Active
            </label>

            <div className="flex justify-end gap-2">
              <button onClick={() => setIsEditOpen(false)} className="px-4 py-2 bg-gray-200 rounded">Hủy</button>
              <button
                onClick={handleUpdateUser}
                className="px-4 py-2 bg-blue-600 text-white rounded"
                disabled={loadingRow === selectedUser.id}
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Enroll plan */}
      {isEnrollOpen && selectedUser && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[420px] space-y-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-semibold">Enroll Plan cho {selectedUser.username}</h2>

            <select
              className="w-full px-3 py-2 border rounded"
              value={formData.planId}
              onChange={(e) => {
                const chosen = plans.find((p) => p.id === e.target.value);
                if (!chosen) return;
                setFormData((prev) => ({
                  ...prev,
                  planId: chosen.id,
                  amount: chosen.price,
                  paymentContent: `NAP ${chosen.id} ${selectedUser.id}`,
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

            <Select
              className="w-full text-sm"
              options={bankOptions}
              placeholder="Chọn ngân hàng..."
              value={bankOptions.find((opt) => opt.value === formData.bankName)}
              onChange={(opt) => setFormData({ ...formData, bankName: opt?.value || "" })}
              menuPlacement="bottom"
              styles={{ menu: (p) => ({ ...p, zIndex: 9999 }) }}
            />

            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              placeholder="Mã giao dịch ngân hàng"
              value={formData.bankRefNumber}
              onChange={(e) => setFormData({ ...formData, bankRefNumber: e.target.value })}
            />

            <textarea
              className="w-full border px-3 py-2 rounded"
              rows={2}
              value={formData.paymentContent}
              onChange={(e) => setFormData({ ...formData, paymentContent: e.target.value })}
              placeholder="Nội dung chuyển khoản"
            />

            <div className="flex justify-end gap-2">
              <button onClick={() => setIsEnrollOpen(false)} className="px-4 py-2 bg-gray-200 rounded">Hủy</button>
              <button onClick={handleEnrollSubmit} className="px-4 py-2 bg-green-600 text-white rounded">Xác nhận</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
