import React, { useEffect, useState } from "react";
import {
  getAllPlans,
  createPlan,
  updatePlan,
  deletePlan,
} from "../../services/plan.service";

const emptyForm = {
  name: "",
  description: "",
  durationMonths: 1,
  price: 0,
  discountPercent: 0,
  isActive: true,
};

export default function PlanPage() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);

  // modal & form
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const loadPlans = async () => {
    setLoading(true);
    try {
      const data = await getAllPlans();
      setPlans(data || []);
    } catch (e) {
      console.error(e);
      alert("Lỗi khi tải danh sách gói");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPlans();
  }, []);

  const openCreate = () => {
    setForm(emptyForm);
    setIsCreateOpen(true);
  };

  const openEdit = (plan) => {
    setSelectedPlan(plan);
    setForm({
      name: plan.name || "",
      description: plan.description || "",
      durationMonths: plan.durationMonths ?? 1,
      price: plan.price ?? 0,
      discountPercent: plan.discountPercent ?? 0,
      isActive: !!plan.isActive,
    });
    setIsEditOpen(true);
  };

  const handleCreate = async () => {
    // validate đơn giản
    if (!form.name?.trim()) return alert("Vui lòng nhập tên gói");
    if (Number(form.durationMonths) <= 0) return alert("Thời hạn phải > 0");
    if (Number(form.price) < 0) return alert("Giá không hợp lệ");

    try {
      const created = await createPlan({
        ...form,
        durationMonths: Number(form.durationMonths),
        price: Number(form.price),
        discountPercent: Number(form.discountPercent),
      });
      setPlans((prev) => [created, ...prev]);
      setIsCreateOpen(false);
    } catch (e) {
      console.error(e);
      alert("Tạo gói thất bại");
    }
  };

  const handleUpdate = async () => {
    if (!selectedPlan) return;
    if (!form.name?.trim()) return alert("Vui lòng nhập tên gói");

    const id = selectedPlan.id || selectedPlan._id;
    try {
      const updated = await updatePlan(id, {
        ...form,
        durationMonths: Number(form.durationMonths),
        price: Number(form.price),
        discountPercent: Number(form.discountPercent),
      });
      setPlans((prev) =>
        prev.map((p) => ( (p.id||p._id) === (updated.id||updated._id) ? { ...p, ...updated } : p ))
      );
      setIsEditOpen(false);
      setSelectedPlan(null);
    } catch (e) {
      console.error(e);
      alert("Cập nhật gói thất bại");
    }
  };

  const handleDelete = async (plan) => {
    const id = plan.id || plan._id;
    if (!confirm(`Xóa gói "${plan.name}"?`)) return;
    try {
      await deletePlan(id);
      setPlans((prev) => prev.filter((p) => (p.id || p._id) !== id));
    } catch (e) {
      console.error(e);
      alert("Xóa gói thất bại");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Danh sách Gói Dịch Vụ</h1>
        <button
          onClick={openCreate}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded"
        >
          + Tạo gói
        </button>
      </div>

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
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {!loading &&
              plans.map((plan) => {
                const id = plan.id || plan._id;
                return (
                  <tr key={id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-800">
                      {plan.name}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {plan.description}
                    </td>
                    <td className="px-6 py-4">{plan.durationMonths} tháng</td>
                    <td className="px-6 py-4 text-green-600 font-semibold">
                      {Number(plan.price).toLocaleString("vi-VN")}₫
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
                    <td className="px-6 py-4 text-right space-x-3">
                      <button
                        onClick={() => openEdit(plan)}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(plan)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            {loading && (
              <tr>
                <td className="px-6 py-6 text-center text-gray-500" colSpan={7}>
                  Đang tải...
                </td>
              </tr>
            )}
            {!loading && plans.length === 0 && (
              <tr>
                <td className="px-6 py-6 text-center text-gray-500" colSpan={7}>
                  Chưa có gói nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Create */}
      {isCreateOpen && (
        <Modal onClose={() => setIsCreateOpen(false)} title="Tạo gói mới">
          <PlanForm form={form} setForm={setForm} />
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={() => setIsCreateOpen(false)}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Hủy
            </button>
            <button
              onClick={handleCreate}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Tạo
            </button>
          </div>
        </Modal>
      )}

      {/* Modal Edit */}
      {isEditOpen && selectedPlan && (
        <Modal onClose={() => setIsEditOpen(false)} title={`Sửa gói: ${selectedPlan.name}`}>
          <PlanForm form={form} setForm={setForm} />
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={() => setIsEditOpen(false)}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Hủy
            </button>
            <button
              onClick={handleUpdate}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Lưu
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

/** ---------- Subcomponents ---------- */

function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[520px] max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

function PlanForm({ form, setForm }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="col-span-2">
        <label className="block text-sm text-gray-600 mb-1">Tên gói</label>
        <input
          className="w-full border rounded px-3 py-2"
          value={form.name}
          onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
          placeholder="Ví dụ: Gói BETA Cao Cấp 3 Tháng"
        />
      </div>

      <div className="col-span-2">
        <label className="block text-sm text-gray-600 mb-1">Mô tả</label>
        <textarea
          className="w-full border rounded px-3 py-2"
          rows={3}
          value={form.description}
          onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
        />
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">Thời hạn (tháng)</label>
        <input
          type="number"
          min="1"
          className="w-full border rounded px-3 py-2"
          value={form.durationMonths}
          onChange={(e) => setForm((p) => ({ ...p, durationMonths: e.target.value }))}
        />
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">Giá (VNĐ)</label>
        <input
          type="number"
          min="0"
          className="w-full border rounded px-3 py-2"
          value={form.price}
          onChange={(e) => setForm((p) => ({ ...p, price: e.target.value }))}
        />
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">Giảm giá (%)</label>
        <input
          type="number"
          min="0"
          max="100"
          className="w-full border rounded px-3 py-2"
          value={form.discountPercent}
          onChange={(e) => setForm((p) => ({ ...p, discountPercent: e.target.value }))}
        />
      </div>

      <div className="flex items-center gap-2 mt-6">
        <input
          id="isActive"
          type="checkbox"
          checked={form.isActive}
          onChange={(e) => setForm((p) => ({ ...p, isActive: e.target.checked }))}
        />
        <label htmlFor="isActive" className="text-sm">Active</label>
      </div>
    </div>
  );
}
