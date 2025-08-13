import React, { useEffect, useMemo, useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
  Filler, // thêm Filler cho area fill
} from "chart.js";
import { getAllUsers } from "../../services/auth.service";
import { getAllTransactions } from "../../services/transaction.service";

// ---- Shadow plugin for subtle depth ----
const shadowPlugin = {
  id: "shadowPlugin",
  beforeDatasetsDraw(chart, _args, opts) {
    const { ctx } = chart;
    ctx.save();
    ctx.shadowColor = opts?.color || "rgba(0,0,0,0.12)";
    ctx.shadowBlur = opts?.blur ?? 10;
    ctx.shadowOffsetX = opts?.offsetX ?? 0;
    ctx.shadowOffsetY = opts?.offsetY ?? 6;
  },
  afterDatasetsDraw(chart) {
    chart.ctx.restore();
  },
};
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
  Filler,
  shadowPlugin
);

// ---- Helpers ----
const pad2 = (n) => (n < 10 ? "0" + n : "" + n);
const startOfMonth = (d) => new Date(d.getFullYear(), d.getMonth(), 1);
const endOfMonth = (d) =>
  new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59, 999);
const toMonthKey = (d) => `${d.getFullYear()}-${pad2(d.getMonth() + 1)}`;
const clampDate = (d) => new Date(new Date(d).setHours(0, 0, 0, 0));
const clampDateEnd = (d) => new Date(new Date(d).setHours(23, 59, 59, 999));

// Build a month key array covering [from..to]
const monthsBetweenDates = (from, to) => {
  const res = [];
  let y = from.getFullYear(),
    m = from.getMonth();
  const y2 = to.getFullYear(),
    m2 = to.getMonth();
  while (y < y2 || (y === y2 && m <= m2)) {
    res.push(`${y}-${pad2(m + 1)}`);
    m++;
    if (m > 11) {
      m = 0;
      y++;
    }
  }
  return res;
};

// pick first available date field
const pickDate = (obj, fields) => {
  for (const f of fields) if (obj && obj[f]) return new Date(obj[f]);
  return null;
};

// parse number safely (handles "20.018 đ", "99,000", number, etc.)
const parseAmount = (x) =>
  typeof x === "string"
    ? Number(String(x).replace(/[^\d.-]/g, "")) || 0
    : Number(x || 0);

// Safe gradient (chartArea may be undefined during first render)
const safeGradient = (ctx, area, c1, c2, fallback) => {
  if (!area) return fallback;
  const g = ctx.createLinearGradient(0, area.top, 0, area.bottom);
  g.addColorStop(0, c1);
  g.addColorStop(1, c2);
  return g;
};

const money = (v) => {
  const n = Number(v || 0);
  try {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(n);
  } catch {
    return `${n.toLocaleString()} đ`;
  }
};

export default function ReportsPage() {
  // Default: last 90 days
  const today = new Date();
  const ninetyAgo = new Date(today);
  ninetyAgo.setDate(today.getDate() - 89);

  const [fromStr, setFromStr] = useState(ninetyAgo.toISOString().slice(0, 10));
  const [toStr, setToStr] = useState(today.toISOString().slice(0, 10));

  const fromDate = useMemo(() => clampDate(fromStr), [fromStr]);
  const toDate = useMemo(() => clampDateEnd(toStr), [toStr]);

  const [users, setUsers] = useState([]);
  const [txs, setTxs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch once
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const [u, t] = await Promise.all([getAllUsers(), getAllTransactions()]);
        setUsers(u || []);
        setTxs(t || []);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Month buckets covering the selected date range
  const months = useMemo(
    () => monthsBetweenDates(startOfMonth(fromDate), endOfMonth(toDate)),
    [fromDate, toDate]
  );

  // Aggregations within date range
  const usersByMonth = useMemo(() => {
    const map = new Map(months.map((m) => [m, 0]));
    users.forEach((u) => {
      const d = pickDate(u, [
        "createdAt",
        "created_at",
        "createdDate",
        "created",
      ]);
      if (!d) return;
      if (d < fromDate || d > toDate) return;
      const key = toMonthKey(d);
      if (map.has(key)) map.set(key, map.get(key) + 1);
    });
    return months.map((m) => map.get(m));
  }, [users, months, fromDate, toDate]);

  const txAgg = useMemo(() => {
    const count = new Map(months.map((m) => [m, 0]));
    const revenue = new Map(months.map((m) => [m, 0]));
    txs.forEach((tx) => {
      const d = pickDate(tx, ["paidAt", "createdAt", "created_at", "date"]);
      if (!d) return;
      if (d < fromDate || d > toDate) return;
      const key = toMonthKey(d);
      if (!count.has(key)) return;
      count.set(key, count.get(key) + 1);
      const amt = parseAmount(tx.amount ?? tx.total);
      revenue.set(key, revenue.get(key) + amt);
    });
    return {
      count: months.map((m) => count.get(m)),
      revenue: months.map((m) => revenue.get(m)),
    };
  }, [txs, months, fromDate, toDate]);

  // KPIs
  const kpis = useMemo(() => {
    const newUsers = users.filter((u) => {
      const d = pickDate(u, [
        "createdAt",
        "created_at",
        "createdDate",
        "created",
      ]);
      return d && d >= fromDate && d <= toDate;
    }).length;
    const buyersInRange = new Set(
      txs
        .filter((t) => {
          const d = pickDate(t, ["paidAt", "createdAt", "created_at", "date"]);
          return d && d >= fromDate && d <= toDate;
        })
        .map((t) => String(t.userId || t.user || t.user_id || ""))
    );
    const revenueInRange = txs.reduce((sum, t) => {
      const d = pickDate(t, ["paidAt", "createdAt", "created_at", "date"]);
      if (d && d >= fromDate && d <= toDate)
        return sum + parseAmount(t.amount ?? t.total);
      return sum;
    }, 0);
    return {
      totalUsers: users.length,
      newUsers,
      buyersInRange: buyersInRange.has("")
        ? buyersInRange.size - 1
        : buyersInRange.size,
      revenueInRange,
    };
  }, [users, txs, fromDate, toDate]);

  // Top Buyers (in date range) — sort by amount desc (tie-break: times desc)
  const topBuyers = useMemo(() => {
    const map = new Map(); // userId -> { times, amount }
    txs.forEach((t) => {
      const d = pickDate(t, ["paidAt", "createdAt", "created_at", "date"]);
      if (!d || d < fromDate || d > toDate) return;
      const uid = String(t.userId || t.user || t.user_id || "");
      if (!uid) return;
      const amt = parseAmount(t.amount ?? t.total);
      const prev = map.get(uid) || { times: 0, amount: 0 };
      map.set(uid, { times: prev.times + 1, amount: prev.amount + amt });
    });

    const rows = Array.from(map.entries()).map(([userId, v]) => {
      const u = users.find((x) => String(x.id || x._id) === userId) || {};
      return {
        userId,
        username: u.username || u.name || "(unknown)",
        email: u.email || "-",
        times: v.times,
        amount: v.amount,
      };
    });

    rows.sort((a, b) => b.amount - a.amount || b.times - a.times);
    return rows.slice(0, 10);
  }, [txs, users, fromDate, toDate]);

  // ---- Charts (safe gradients + keys to avoid reuse) ----
  const baseOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom", labels: { boxWidth: 14, boxHeight: 14 } },
      shadowPlugin: { color: "rgba(0,0,0,0.12)", blur: 10, offsetY: 6 },
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true, ticks: { precision: 0 } },
    },
  };

  const usersChart = {
    labels: months,
    datasets: [
      {
        label: "New Users",
        data: usersByMonth,
        fill: true,
        borderWidth: 2,
        borderColor: "#4F46E5",
        backgroundColor: (ctx) => {
          const { ctx: c, chartArea } = ctx.chart;
          return safeGradient(
            c,
            chartArea,
            "rgba(79,70,229,0.45)",
            "rgba(79,70,229,0.06)",
            "rgba(79,70,229,0.15)"
          );
        },
        tension: 0.35,
        pointRadius: 3,
        pointHoverRadius: 5,
      },
    ],
  };

  const txChart = {
    labels: months,
    datasets: [
      {
        type: "bar",
        label: "Purchases",
        data: txAgg.count,
        backgroundColor: (ctx) => {
          const { ctx: c, chartArea } = ctx.chart;
          return safeGradient(
            c,
            chartArea,
            "rgba(16,185,129,0.85)",
            "rgba(16,185,129,0.25)",
            "rgba(16,185,129,0.6)"
          );
        },
        borderRadius: 8,
        barThickness: "flex",
        maxBarThickness: 36,
      },
      {
        type: "line",
        label: "Revenue",
        data: txAgg.revenue,
        borderColor: "#F59E0B",
        backgroundColor: "rgba(245,158,11,0.35)",
        yAxisID: "y1",
        tension: 0.35,
        pointRadius: 3,
        pointHoverRadius: 5,
        borderWidth: 2,
      },
    ],
  };
  const txOptions = {
    ...baseOptions,
    scales: {
      x: { grid: { display: false } },
      y: {
        beginAtZero: true,
        title: { display: true, text: "Purchases" },
        ticks: { precision: 0 },
      },
      y1: {
        beginAtZero: true,
        position: "right",
        title: { display: true, text: "Revenue" },
      },
    },
  };

  return (
    <div className="space-y-8">
      {/* Header / Filters */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-3xl font-bold">Reports</h1>
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">From</label>
          <input
            type="date"
            value={fromStr}
            onChange={(e) => setFromStr(e.target.value)}
            className="border rounded px-2 py-1"
          />
          <label className="text-sm text-gray-600">To</label>
          <input
            type="date"
            value={toStr}
            onChange={(e) => setToStr(e.target.value)}
            className="border rounded px-2 py-1"
          />
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Total Users"
          value={kpis.totalUsers}
          color="from-indigo-500 to-indigo-300"
        />
        <KpiCard
          title="New Users (range)"
          value={kpis.newUsers}
          color="from-sky-500 to-sky-300"
        />
        <KpiCard
          title="Buyers (range)"
          value={kpis.buyersInRange}
          color="from-emerald-500 to-emerald-300"
        />
        <KpiCard
          title="Revenue (range)"
          value={money(kpis.revenueInRange)}
          color="from-amber-500 to-amber-300"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card title="Users by Month">
          <div className="h-[320px]">
            <Line
              key={`users-${fromStr}-${toStr}`}
              data={usersChart}
              options={baseOptions}
              redraw
            />
          </div>
        </Card>
        <Card title="Purchases & Revenue">
          <div className="h-[320px]">
            <Bar
              key={`tx-${fromStr}-${toStr}`}
              data={txChart}
              options={txOptions}
              redraw
            />
          </div>
        </Card>
      </div>

      {/* Top Buyers */}
      <Card
        title={
          <div className="flex items-center gap-2">
            <span>Top Buyers (in range)</span>
            <span className="text-xs text-gray-500 font-normal">
              {topBuyers?.length || 0} buyers
            </span>
          </div>
        }
      >
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          {/* Sticky header */}
          <div className="hidden md:grid grid-cols-[48px,2fr,2fr,120px,160px] items-center gap-3 px-4 py-3 text-xs uppercase tracking-wide text-gray-600 bg-gray-50 sticky top-0 z-10">
            <div>#</div>
            <div>User</div>
            <div>Email</div>
            <div className="text-right">Times</div>
            <div className="text-right">Amount</div>
          </div>

          {(() => {
            // đã sort sẵn ở topBuyers theo amount ↓; dùng lại cho render
            const buyers = topBuyers || [];

            const maxAmount = Math.max(1, ...buyers.map((b) => b.amount || 0));
            const maxTimes = Math.max(1, ...buyers.map((b) => b.times || 0));
            const totalAmount = buyers.reduce(
              (s, b) => s + (b.amount || 0),
              0
            );

            const medal = (idx) =>
              idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : null;

            const initials = (name = "", email = "") => {
              const n = (name?.trim() || email?.split("@")[0] || "").trim();
              if (!n) return "?";
              const parts = n.split(/\s+/).filter(Boolean);
              const first = parts[0]?.[0] || "";
              const last =
                parts.length > 1
                  ? parts[parts.length - 1]?.[0]
                  : parts[0]?.[1] || "";
              return (first + last).toUpperCase();
            };

            return (
              <>
                {/* Rows */}
                <ul className="divide-y divide-gray-100">
                  {buyers.map((r, i) => {
                    const isAlt = i % 2 !== 0;
                    const barW = Math.round(((r.amount || 0) / maxAmount) * 100);
                    const timesW = Math.round(((r.times || 0) / maxTimes) * 100);
                    return (
                      <li
                        key={r.userId}
                        className={`grid grid-cols-1 md:grid-cols-[48px,2fr,2fr,120px,160px] items-center gap-3 px-4 py-3 transition-colors ${
                          isAlt ? "bg-gray-50/50" : "bg-white"
                        } hover:bg-indigo-50/60`}
                      >
                        {/* Rank */}
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <span className="w-7 text-gray-700">{i + 1}</span>
                          {medal(i) && (
                            <span
                              className={`text-lg leading-none ${
                                i === 0
                                  ? "drop-shadow-[0_0_6px_rgba(250,204,21,0.6)]"
                                  : ""
                              }`}
                              title={
                                i === 0 ? "Top 1" : i === 1 ? "Top 2" : "Top 3"
                              }
                            >
                              {medal(i)}
                            </span>
                          )}
                        </div>

                        {/* User */}
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white grid place-items-center text-xs font-semibold shadow-sm">
                            {initials(r.username, r.email)}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 leading-tight">
                              {r.username || "Unknown"}
                            </div>
                            <div className="md:hidden text-xs text-gray-500">
                              {r.email}
                            </div>
                          </div>
                        </div>

                        {/* Email (desktop) */}
                        <div className="hidden md:flex items-center justify-between text-gray-600">
                          <a
                            href={`mailto:${r.email}`}
                            className="truncate hover:text-indigo-600"
                            title={r.email}
                          >
                            {r.email}
                          </a>
                        </div>

                        {/* Times */}
                        <div className="md:text-right">
                          <div className="inline-flex items-center gap-2">
                            <span className="font-semibold text-gray-900">
                              {r.times}
                            </span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                              times
                            </span>
                          </div>
                          <div className="mt-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-sky-400 to-indigo-500"
                              style={{ width: `${timesW}%` }}
                              aria-hidden
                            />
                          </div>
                        </div>

                        {/* Amount */}
                        <div className="md:text-right">
                          <div className="font-semibold tabular-nums">
                            {money(r.amount)}
                          </div>
                          <div className="mt-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-500"
                              style={{ width: `${barW}%` }}
                              aria-hidden
                            />
                          </div>
                        </div>
                      </li>
                    );
                  })}

                  {buyers.length === 0 && (
                    <li className="px-6 py-10 text-center text-gray-500">
                      <div className="inline-flex flex-col items-center gap-2">
                        <svg
                          viewBox="0 0 24 24"
                          className="w-8 h-8"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path
                            d="M3 3h18M3 7h18M3 21h18M3 11h10"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                        <p>No data</p>
                      </div>
                    </li>
                  )}
                </ul>

                {/* Footer summary */}
                {buyers.length > 0 && (
                  <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-gray-50">
                    <div className="text-sm text-gray-600">
                      Total amount:&nbsp;
                      <span className="font-semibold text-gray-900">
                        {money(totalAmount)}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">
                      Showing top {buyers.length} buyers
                    </div>
                  </div>
                )}
              </>
            );
          })()}
        </div>
      </Card>

      {loading && <div className="text-sm text-gray-500">Loading…</div>}
    </div>
  );
}

// ---- Small UI components ----
const Card = ({ title, children }) => (
  <div className="bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
    <h2 className="font-semibold mb-3">{title}</h2>
    {children}
  </div>
);

const KpiCard = ({ title, value, color }) => (
  <div
    className={`bg-gradient-to-br ${color} text-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1`}
  >
    <div className="text-sm/5 opacity-85">{title}</div>
    <div className="text-2xl font-bold mt-1">{value}</div>
  </div>
);
