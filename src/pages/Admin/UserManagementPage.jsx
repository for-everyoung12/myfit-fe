import React, { useState, useEffect, useMemo } from "react";
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

// helper to compute discounted price
const calcFinalPrice = (plan) => {
  const price = Number(plan?.price || 0);
  const d = Number(plan?.discountPercent || 0);
  const clamped = Math.min(Math.max(d, 0), 100);
  return Math.max(0, Math.round((price * (100 - clamped)) / 100));
};

export default function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const [plans, setPlans] = useState([]);
  const [bankOptions, setBankOptions] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [planStatusFilter, setPlanStatusFilter] = useState("all"); // all | has | none
  const [createdFrom, setCreatedFrom] = useState(""); // yyyy-mm-dd
  const [createdTo, setCreatedTo] = useState("");     // yyyy-mm-dd
  const [sortNameAsc, setSortNameAsc] = useState(true); // true = A→Z, false = Z→A

  const [isEnrollOpen, setIsEnrollOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isPlanOpen, setIsPlanOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);
  const [detailUser, setDetailUser] = useState(null);
  const [planDetailUser, setPlanDetailUser] = useState(null);
  const [editForm, setEditForm] = useState({ roleId: "", isActive: true });
  const [formData, setFormData] = useState({
    planId: "",
    amount: 0,
    paymentContent: "",
    bankName: "",
    bankRefNumber: "",
  });

  const [loadingRow, setLoadingRow] = useState(null);
  const [enrollSubmitting, setEnrollSubmitting] = useState(false);

  // pagination state
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // 10 | 20 | 50

  // Load users + plans
  useEffect(() => {
    (async () => {
      try {
        const [u, p] = await Promise.all([getAllUsers(), getAllPlans()]);
        setUsers(u || []);
        setPlans(p || []);
      } catch (e) {
        console.error("Fetch users/plans failed", e);
        alert("Failed to load users/plans.");
      }
    })();
  }, []);

  // ---------- helpers ----------
  const normalizeId = (obj) => ({ ...obj, id: obj?.id || obj?._id });

  const refreshAndPatchUser = async (userId) => {
    try {
      const fresh = await getUserById(userId);
      const norm = normalizeId(fresh || { id: userId });
      setUsers((prev) => prev.map((u) => (u.id === norm.id ? { ...u, ...norm } : u)));
      setSelectedUser((prev) => (prev && prev.id === norm.id ? { ...prev, ...norm } : prev));
      return norm;
    } catch (err) {
      console.error("Refresh user failed", err);
      // không ném lỗi để UI tiếp tục đóng modal; chỉ log
      return null;
    }
  };

  // filtered users (search + plan status + createdAt + sort name)
  const filteredUsers = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();

    const fromDate = createdFrom ? new Date(createdFrom) : null;
    const toDate = createdTo ? new Date(createdTo + "T23:59:59.999") : null;

    return (users || [])
      .filter((u) => {
        const hitText =
          !q ||
          u.id?.toLowerCase?.().includes(q) ||
          (u.username || "").toLowerCase().includes(q) ||
          (u.email || "").toLowerCase().includes(q);

        const hasPlan = Boolean(u.planId);
        const hitPlan =
          planStatusFilter === "all" ||
          (planStatusFilter === "has" && hasPlan) ||
          (planStatusFilter === "none" && !hasPlan);

        const cAt = u.createdAt ? new Date(u.createdAt) : null;
        const fromOk = !fromDate || (cAt && cAt >= fromDate);
        const toOk = !toDate || (cAt && cAt <= toDate);

        return hitText && hitPlan && fromOk && toOk;
      })
      .sort((a, b) => {
        const nameA = (a.username || "").toLowerCase();
        const nameB = (b.username || "").toLowerCase();
        return sortNameAsc ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
      });
  }, [users, searchTerm, planStatusFilter, createdFrom, createdTo, sortNameAsc]);

  // reset to first page when filters/search change
  useEffect(() => {
    setPage(1);
  }, [searchTerm, planStatusFilter, createdFrom, createdTo, sortNameAsc]);

  // compute pagination + clamp current page
  const total = filteredUsers.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, totalPages);

  useEffect(() => {
    if (page !== safePage) setPage(safePage);
  }, [safePage]); // eslint-disable-line react-hooks/exhaustive-deps

  const paginatedUsers = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return filteredUsers.slice(start, start + pageSize);
  }, [filteredUsers, safePage, pageSize]);

  const startIndex = (safePage - 1) * pageSize; // for row numbering

  const planNameFromId = (planId) => {
    if (!planId) return "None";
    const p = plans.find((x) => x.id === planId);
    return p ? p.name : "Unknown";
  };

  const fetchBanks = async () => {
    try {
      const res = await fetch("https://api.vietqr.io/v2/banks");
      const data = await res.json();
      setBankOptions(
        (data?.data || []).map((b) => ({
          value: b.shortName,
          label: `${b.shortName} - ${b.name}`,
        }))
      );
    } catch (e) {
      console.error("Fetch banks failed", e);
      alert("Failed to load bank list.");
    }
  };

  const openEnroll = async (user) => {
    setSelectedUser(user);
    setIsEnrollOpen(true);
    setFormData({ planId: "", amount: 0, paymentContent: "", bankName: "", bankRefNumber: "" });
    try {
      const planData = await getAllPlans();
      setPlans(planData || []);
      await fetchBanks();
    } catch (e) {
      console.error("Load enroll data failed", e);
      alert("Failed to prepare enroll data.");
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
      alert("Failed to load user details.");
    } finally {
      setLoadingRow(null);
    }
  };

  const openPlanDetail = async (user) => {
    setLoadingRow(user.id);
    try {
      const full = await getUserById(user.id);
      setPlanDetailUser(full);
      setIsPlanOpen(true);
    } catch (e) {
      console.error(e);
      alert("Failed to load plan details.");
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
      const norm = normalizeId(updated || selectedUser);
      setUsers((prev) => prev.map((u) => (u.id === norm.id ? { ...u, ...norm } : u)));
      setIsEditOpen(false);
      alert("User updated successfully.");
    } catch (e) {
      console.error(e);
      alert("Update failed.");
    } finally {
      setLoadingRow(null);
    }
  };

  const handleDelete = async (user) => {
    if (!confirm(`Delete user "${user.username}"? This action cannot be undone.`)) return;
    setLoadingRow(user.id);
    try {
      await deleteUser(user.id);
      setUsers((prev) => prev.filter((u) => u.id !== user.id));
      alert("User deleted.");
    } catch (e) {
      console.error(e);
      alert("Delete failed.");
    } finally {
      setLoadingRow(null);
    }
  };

  const handleEnrollSubmit = async () => {
    if (!selectedUser) return;
    if (!formData.planId) {
      alert("Please select a plan.");
      return;
    }
    try {
      setEnrollSubmitting(true);
      // 1) gọi API enroll
      await enrollPlan({ ...formData, userId: selectedUser.id });

      // 2) fetch user mới nhất & patch lại list để UI cập nhật ngay
      const fresh = await refreshAndPatchUser(selectedUser.id);

      // 3) đóng modal sau khi đã patch state (đảm bảo table hiển thị plan mới ngay lập tức)
      setIsEnrollOpen(false);

      // optional: nếu đang mở modal Plan Detail của chính user đó, cũng cập nhật luôn
      if (isPlanOpen && planDetailUser?.id === selectedUser.id && fresh) {
        setPlanDetailUser(fresh);
      }

      alert("Enroll succeeded!");
    } catch (e) {
      console.error(e);
      alert("Enroll failed.");
    } finally {
      setEnrollSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header + filters */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">User Management</h1>

        <div className="flex flex-wrap items-center gap-2">
          {/* plan status filter */}
          <select
            className="px-3 py-1 text-sm border rounded"
            value={planStatusFilter}
            onChange={(e) => setPlanStatusFilter(e.target.value)}
            title="Filter by plan status"
          >
            <option value="all">All users</option>
            <option value="has">Purchased plan</option>
            <option value="none">No plan</option>
          </select>

          {/* text search */}
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Find by ID, email, username..."
            className="px-3 py-1 text-sm border rounded"
          />

          {/* createdAt filters */}
          <input
            type="date"
            value={createdFrom}
            onChange={(e) => setCreatedFrom(e.target.value)}
            className="px-3 py-1 text-sm border rounded"
            title="Created from"
          />
          <input
            type="date"
            value={createdTo}
            onChange={(e) => setCreatedTo(e.target.value)}
            className="px-3 py-1 text-sm border rounded"
            title="Created to"
          />

          {/* sort name A→Z / Z→A */}
          <button
            onClick={() => setSortNameAsc((prev) => !prev)}
            className="px-3 py-1 text-sm border rounded bg-gray-100 hover:bg-gray-200"
            title="Sort by username"
          >
            Sort Name {sortNameAsc ? "A→Z" : "Z→A"}
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
              <th className="px-4 py-3">Plan</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user, index) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{startIndex + index + 1}</td>
                <td className="px-4 py-3">{user.username}</td>
                <td className="px-4 py-3 text-gray-600">{user.email}</td>
                <td className="px-4 py-3">{ROLE_MAP[user.roleId] || "unknown"}</td>

                {/* PLAN column */}
                <td className="px-4 py-3">
                  {user.planId ? (
                    <button
                      onClick={() => openPlanDetail(user)}
                      className="text-indigo-600 hover:underline"
                      disabled={loadingRow === user.id}
                      title="View plan details"
                    >
                      {planNameFromId(user.planId)}
                    </button>
                  ) : (
                    <span className="text-gray-400">None</span>
                  )}
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                      user.isActive ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
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
            {paginatedUsers.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-center text-gray-500" colSpan={7}>
                  No users match the current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination footer */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        {/* Page size */}
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-600">Rows per page:</span>
          <select
            className="border rounded px-2 py-1"
            value={pageSize}
            onChange={(e) => {
              const v = Number(e.target.value);
              setPageSize(v);
              setPage(1);
            }}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          <span className="text-gray-600">
            Showing <b>{total === 0 ? 0 : startIndex + 1}</b>–<b>{Math.min(startIndex + pageSize, total)}</b> of <b>{total}</b>
          </span>
        </div>

        {/* Pager */}
        <div className="flex items-center gap-2">
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            onClick={() => setPage(1)}
            disabled={safePage === 1}
            title="First"
          >
            « First
          </button>
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={safePage === 1}
            title="Previous"
          >
            ‹ Prev
          </button>
          <span className="text-sm text-gray-700">
            Page <b>{safePage}</b> / <b>{totalPages}</b>
          </span>
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={safePage === totalPages}
            title="Next"
          >
            Next ›
          </button>
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            onClick={() => setPage(totalPages)}
            disabled={safePage === totalPages}
            title="Last"
          >
            Last »
          </button>
        </div>
      </div>

      {/* Modal: User detail */}
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
              <div><span className="text-gray-500">Gender:</span> {detailUser.gender === 0 ? "Male" : detailUser.gender === 1 ? "Female" : "Other"}</div>
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
              <button onClick={() => setIsDetailOpen(false)} className="px-4 py-2 bg-gray-200 rounded">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Plan details */}
      {isPlanOpen && planDetailUser && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[460px] space-y-4">
            <h2 className="text-lg font-semibold">Plan Details</h2>

            <div className="text-sm space-y-2">
              <div><span className="text-gray-500">User:</span> {planDetailUser.username} ({planDetailUser.email})</div>
              <div><span className="text-gray-500">Plan:</span> {planNameFromId(planDetailUser.planId)}</div>
              <div><span className="text-gray-500">Start:</span> {planDetailUser.planStart ? new Date(planDetailUser.planStart).toLocaleDateString() : "-"}</div>
              <div><span className="text-gray-500">End:</span> {planDetailUser.planEnd ? new Date(planDetailUser.planEnd).toLocaleDateString() : "-"}</div>
              {planDetailUser.planEnd && (
                <div>
                  <span className="text-gray-500">Days left:</span>{" "}
                  {Math.max(0, Math.ceil((new Date(planDetailUser.planEnd) - new Date()) / (1000*60*60*24)))}
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2">
              <button onClick={() => setIsPlanOpen(false)} className="px-4 py-2 bg-gray-200 rounded">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Enroll plan */}
      {isEnrollOpen && selectedUser && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[420px] space-y-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-semibold">Enroll Plan for {selectedUser.username}</h2>

            {/* Plan select: auto set amount with discount */}
            <select
              className="w-full px-3 py-2 border rounded"
              value={formData.planId}
              onChange={(e) => {
                const chosen = plans.find((p) => p.id === e.target.value);
                if (!chosen) return;
                const final = calcFinalPrice(chosen);
                setFormData((prev) => ({
                  ...prev,
                  planId: chosen.id,
                  amount: final,
                  paymentContent: `PLAN ${chosen.id} ${selectedUser.id}`,
                }));
              }}
            >
              <option value="">Select plan...</option>
              {plans.map((plan) => {
                const final = calcFinalPrice(plan);
                const hasDiscount = Number(plan?.discountPercent || 0) > 0;
                return (
                  <option key={plan.id} value={plan.id}>
                    {plan.name} —{" "}
                    {hasDiscount
                      ? `${(final / 1000).toFixed(0)}K (-${plan.discountPercent}%)`
                      : `${(plan.price / 1000).toFixed(0)}K`}
                  </option>
                );
              })}
            </select>

            {/* Bank */}
            <Select
              className="w-full text-sm"
              options={bankOptions}
              placeholder="Select bank..."
              value={bankOptions.find((opt) => opt.value === formData.bankName)}
              onChange={(opt) => setFormData({ ...formData, bankName: opt?.value || "" })}
              menuPlacement="bottom"
              styles={{ menu: (p) => ({ ...p, zIndex: 9999 }) }}
            />

            {/* Bank ref */}
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              placeholder="Bank transaction code"
              value={formData.bankRefNumber}
              onChange={(e) => setFormData({ ...formData, bankRefNumber: e.target.value })}
            />

            {/* Transfer content */}
            <textarea
              className="w-full border px-3 py-2 rounded"
              rows={2}
              value={formData.paymentContent}
              onChange={(e) => setFormData({ ...formData, paymentContent: e.target.value })}
              placeholder="Transfer content"
            />

            {/* Amount preview */}
            <div className="text-right text-sm text-gray-700">
              Amount after discount: <b>{(Number(formData.amount || 0) / 1000).toFixed(0)}K</b>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsEnrollOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded"
                disabled={enrollSubmitting}
              >
                Cancel
              </button>
              <button
                onClick={handleEnrollSubmit}
                className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-60"
                disabled={enrollSubmitting}
              >
                {enrollSubmitting ? "Processing…" : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Edit user */}
      {isEditOpen && selectedUser && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[420px] space-y-4">
            <h2 className="text-lg font-semibold">Edit User — {selectedUser.username}</h2>

            <div className="space-y-3 text-sm">
              {/* Role */}
              <label className="block">
                <span className="text-gray-500">Role</span>
                <select
                  className="mt-1 w-full border rounded px-3 py-2"
                  value={editForm.roleId}
                  onChange={(e) => setEditForm((p) => ({ ...p, roleId: e.target.value }))}
                >
                  {ROLES.map((r) => (
                    <option key={r.id} value={r.id}>{r.label}</option>
                  ))}
                </select>
              </label>

              {/* Active */}
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={!!editForm.isActive}
                  onChange={(e) => setEditForm((p) => ({ ...p, isActive: e.target.checked }))}
                />
                <span>Active</span>
              </label>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsEditOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded"
                disabled={loadingRow === selectedUser.id}
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateUser}
                className="px-4 py-2 bg-blue-600 text-white rounded"
                disabled={loadingRow === selectedUser.id}
                title="Save changes"
              >
                {loadingRow === selectedUser.id ? "Saving…" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
