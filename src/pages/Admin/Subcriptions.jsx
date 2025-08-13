import React, { useEffect, useMemo, useState } from "react";
import { getAllUsers } from "../../services/auth.service";
import { getAllPlans } from "../../services/plan.service";

const Subcriptions = () => {
  const [rows, setRows] = useState([]);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  // filters
  const [q, setQ] = useState("");
  const [planId, setPlanId] = useState("");
  const [from, setFrom] = useState(""); // yyyy-mm-dd
  const [to, setTo] = useState("");     // yyyy-mm-dd
  const [dateField, setDateField] = useState("start"); // start | end
  const [sortDir, setSortDir] = useState("desc");      // desc=newest, asc=oldest

  useEffect(() => {
    (async () => {
      try {
        const [users, planList] = await Promise.all([getAllUsers(), getAllPlans()]);
        setPlans(planList || []);
        setRows((users || []).filter((u) => !!u.planId)); // only users with a plan
      } catch (e) {
        console.error("Failed to fetch data:", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const getPlanName = (id) => {
    const p = plans.find((x) => x.id === id);
    return p ? p.name : "Unknown";
  };

  const filtered = useMemo(() => {
    const fromTs = from ? new Date(from).setHours(0, 0, 0, 0) : null;
    const toTs = to ? new Date(to).setHours(23, 59, 59, 999) : null;

    const data = (rows || [])
      .filter((u) => {
        if (q) {
          const needle = q.toLowerCase();
          const hay = `${u.email || ""} ${u.username || ""}`.toLowerCase();
          if (!hay.includes(needle)) return false;
        }
        if (planId && u.planId !== planId) return false;

        // choose date field
        const d =
          dateField === "end"
            ? (u.planEnd ? new Date(u.planEnd).getTime() : null)
            : (u.planStart ? new Date(u.planStart).getTime() : null);

        if (fromTs && (d === null || d < fromTs)) return false;
        if (toTs && (d === null || d > toTs)) return false;
        return true;
      })
      .sort((a, b) => {
        const da =
          dateField === "end"
            ? (a.planEnd ? new Date(a.planEnd).getTime() : 0)
            : (a.planStart ? new Date(a.planStart).getTime() : 0);
        const db =
          dateField === "end"
            ? (b.planEnd ? new Date(b.planEnd).getTime() : 0)
            : (b.planStart ? new Date(b.planStart).getTime() : 0);
        return sortDir === "desc" ? db - da : da - db;
      });

    return data;
  }, [rows, q, planId, from, to, dateField, sortDir]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-gray-600">
        <p className="text-lg animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-white min-h-screen text-gray-800 space-y-6">
      <h1 className="text-2xl font-bold">Subscribed Users</h1>

      {/* Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 bg-white">
        <div className="lg:col-span-1">
          <label className="text-xs text-gray-500">Search (email / username)</label>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="keyword..."
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="text-xs text-gray-500">Plan</label>
          <select
            value={planId}
            onChange={(e) => setPlanId(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">All</option>
            {plans.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs text-gray-500">Date field</label>
          <select
            value={dateField}
            onChange={(e) => setDateField(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="start">Start date</option>
            <option value="end">End date</option>
          </select>
        </div>

        <div className="flex gap-2">
          <div className="flex-1">
            <label className="text-xs text-gray-500">From</label>
            <input
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div className="flex-1">
            <label className="text-xs text-gray-500">To</label>
            <input
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        <div>
          <label className="text-xs text-gray-500">Sort</label>
          <select
            value={sortDir}
            onChange={(e) => setSortDir(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="desc">Newest</option>
            <option value="asc">Oldest</option>
          </select>
        </div>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <p className="text-gray-500">No data.</p>
      ) : (
        <div className="overflow-x-auto shadow border border-gray-200 rounded">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Username</th>
                <th className="px-4 py-3">Plan</th>
                <th className="px-4 py-3">Start date</th>
                <th className="px-4 py-3">End date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u, idx) => (
                <tr key={u._id || u.id} className="border-t hover:bg-gray-50 transition">
                  <td className="px-4 py-2">{idx + 1}</td>
                  <td className="px-4 py-2">{u.email}</td>
                  <td className="px-4 py-2 capitalize">{u.username}</td>
                  <td className="px-4 py-2 font-medium text-gray-900">
                    {getPlanName(u.planId)}
                  </td>
                  <td className="px-4 py-2">
                    {u.planStart ? new Date(u.planStart).toLocaleDateString() : "-"}
                  </td>
                  <td className="px-4 py-2">
                    {u.planEnd ? new Date(u.planEnd).toLocaleDateString() : "-"}
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
