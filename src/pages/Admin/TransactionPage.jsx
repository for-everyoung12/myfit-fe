import React, { useEffect, useMemo, useState } from "react";
import { getAllTransactions } from "../../services/transaction.service";

export default function TransactionPage() {
  const [transactions, setTransactions] = useState([]);
  const [selectedTx, setSelectedTx] = useState(null);

  // filters (status removed)
  const [q, setQ] = useState("");
  const [type, setType] = useState("");     // income | expense | ...
  const [method, setMethod] = useState(""); // bank_transfer | momo | cash...
  const [from, setFrom] = useState("");     // yyyy-mm-dd
  const [to, setTo] = useState("");         // yyyy-mm-dd

  // simple client-side pagination
  const [page, setPage] = useState(1);
  const pageSize = 20;

  useEffect(() => {
    (async () => {
      try {
        const data = await getAllTransactions();
        setTransactions(data || []);
      } catch (e) {
        console.error("Failed to load transactions:", e);
      }
    })();
  }, []);

  const quickRange = (days) => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - (days - 1));
    setFrom(start.toISOString().slice(0, 10));
    setTo(end.toISOString().slice(0, 10));
  };

  // filter + sort (no status filtering)
  const filtered = useMemo(() => {
    const fromTs = from ? new Date(from).setHours(0, 0, 0, 0) : null;
    const toTs = to ? new Date(to).setHours(23, 59, 59, 999) : null;

    return (transactions || [])
      .filter((tx) => {
        if (q) {
          const needle = q.toLowerCase();
          const hay = `${tx.username || ""} ${tx.email || ""} ${tx.note || ""}`.toLowerCase();
          if (!hay.includes(needle)) return false;
        }
        if (type && tx.type !== type) return false;
        if (method && tx.method !== method) return false;
        const ts = tx.createdAt ? new Date(tx.createdAt).getTime() : 0;
        if (fromTs && ts < fromTs) return false;
        if (toTs && ts > toTs) return false;
        return true;
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [transactions, q, type, method, from, to]);

  // metrics: count + total amount
  const { totalCount, totalAmount } = useMemo(() => {
    let count = 0, sum = 0;
    for (const tx of filtered) {
      count++;
      sum += tx.amount || 0;
    }
    return { totalCount: count, totalAmount: sum };
  }, [filtered]);

  // pagination slice
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageData = filtered.slice((page - 1) * pageSize, page * pageSize);

  const toVnd = (n) => (n || 0).toLocaleString("vi-VN") + "₫";

  const exportCsv = () => {
    const rows = [
      ["id", "username", "amount", "type", "method", "status", "note", "createdAt"],
      ...filtered.map((tx) => [
        tx.id || tx._id || "",
        tx.username || "",
        tx.amount || 0,
        tx.type || "",
        tx.method || "",
        tx.status || "",
        (tx.note || "").replace(/\n/g, " "),
        tx.createdAt ? new Date(tx.createdAt).toISOString() : "",
      ]),
    ];
    const csv = rows.map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `transactions_${Date.now()}.csv`;
    document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header + quick actions */}
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Transaction History</h1>
        <div className="flex items-center gap-2">
          <button onClick={() => quickRange(1)} className="px-2 py-1 text-xs border rounded">Today</button>
          <button onClick={() => quickRange(7)} className="px-2 py-1 text-xs border rounded">7 days</button>
          <button onClick={() => quickRange(30)} className="px-2 py-1 text-xs border rounded">30 days</button>
          <button onClick={() => { setFrom(""); setTo(""); }} className="px-2 py-1 text-xs border rounded">Clear dates</button>
          <button onClick={exportCsv} className="px-3 py-1 text-sm bg-gray-900 text-white rounded">Export CSV</button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="p-4 bg-white rounded-lg shadow">
          <div className="text-gray-500 text-sm">Total transactions (filtered)</div>
          <div className="text-2xl font-semibold">{totalCount}</div>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <div className="text-gray-500 text-sm">Total amount (filtered)</div>
          <div className="text-2xl font-semibold">{toVnd(totalAmount)}</div>
        </div>
      </div>

      {/* Filters (status removed) */}
      <div className="p-3 bg-white rounded-lg shadow grid grid-cols-1 md:grid-cols-5 gap-3 items-end">
        <div className="md:col-span-1">
          <label className="text-xs text-gray-500">Search by user/email/note</label>
          <input value={q} onChange={(e)=>setQ(e.target.value)} className="w-full border rounded px-3 py-2" placeholder="keyword..." />
        </div>
        <div>
          <label className="text-xs text-gray-500">Type</label>
          <select value={type} onChange={(e)=>{setType(e.target.value); setPage(1);}} className="w-full border rounded px-3 py-2">
            <option value="">All</option>
            <option value="income">income/topup</option>
            <option value="expense">expense</option>
            <option value="refund">refund</option>
            <option value="plan_purchase">plan_purchase</option>
          </select>
        </div>
        <div>
          <label className="text-xs text-gray-500">Method</label>
          <select value={method} onChange={(e)=>{setMethod(e.target.value); setPage(1);}} className="w-full border rounded px-3 py-2">
            <option value="">All</option>
            <option value="bank_transfer">bank_transfer</option>
            <option value="momo">momo</option>
            <option value="cash">cash</option>
          </select>
        </div>
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="text-xs text-gray-500">From date</label>
            <input type="date" value={from} onChange={(e)=>{setFrom(e.target.value); setPage(1);}} className="w-full border rounded px-3 py-2"/>
          </div>
          <div className="flex-1">
            <label className="text-xs text-gray-500">To date</label>
            <input type="date" value={to} onChange={(e)=>{setTo(e.target.value); setPage(1);}} className="w-full border rounded px-3 py-2"/>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">User</th>
              <th className="px-6 py-3">Amount</th>
              <th className="px-6 py-3">Type</th>
              <th className="px-6 py-3">Method</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Note</th>
              <th className="px-6 py-3">Time</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pageData.map((tx) => (
              <tr key={tx.id || tx._id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">{tx.username}</td>
                <td className="px-6 py-4 font-semibold">{toVnd(tx.amount)}</td>
                <td className="px-6 py-4">
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold capitalize">
                    {String(tx.type || "").replace("_"," ")}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium capitalize">
                    {String(tx.method || "").replace("_"," ")}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    tx.status === "paid" || tx.status === "approved" ? "bg-emerald-100 text-emerald-700"
                    : tx.status === "pending" ? "bg-amber-100 text-amber-700"
                    : "bg-rose-100 text-rose-700"
                  }`}>
                    {tx.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600">{tx.note}</td>
                <td className="px-6 py-4 text-gray-500 text-xs">
                  {tx.createdAt ? new Date(tx.createdAt).toLocaleString("vi-VN") : "-"}
                </td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => setSelectedTx(tx)} className="text-blue-600 hover:underline">View</button>
                </td>
              </tr>
            ))}
            {pageData.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center py-6 text-gray-500">No transactions</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between text-sm">
        <div className="text-gray-500">
          Showing {(page - 1) * pageSize + 1}‑{Math.min(page * pageSize, filtered.length)} of {filtered.length} transactions
        </div>
        <div className="flex gap-2">
          <button disabled={page===1} onClick={()=>setPage(p=>Math.max(1,p-1))} className="px-3 py-1 border rounded disabled:opacity-50">Prev</button>
          <span className="px-2">Page {page}/{totalPages}</span>
          <button disabled={page===totalPages} onClick={()=>setPage(p=>Math.min(totalPages,p+1))} className="px-3 py-1 border rounded disabled:opacity-50">Next</button>
        </div>
      </div>

      {/* Detail modal */}
      {selectedTx && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[520px] max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">Transaction Detail</h2>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><span className="text-gray-500">ID:</span> {selectedTx.id || selectedTx._id}</div>
              <div><span className="text-gray-500">User:</span> {selectedTx.username}</div>
              <div><span className="text-gray-500">Amount:</span> {toVnd(selectedTx.amount)}</div>
              <div><span className="text-gray-500">Type:</span> {selectedTx.type}</div>
              <div><span className="text-gray-500">Method:</span> {selectedTx.method}</div>
              <div className="col-span-2"><span className="text-gray-500">Note:</span> {selectedTx.note}</div>
              <div className="col-span-2"><span className="text-gray-500">Payment Content:</span> {selectedTx.paymentContent}</div>
              <div><span className="text-gray-500">Bank Name:</span> {selectedTx.bankName}</div>
              <div><span className="text-gray-500">Bank Ref #:</span> {selectedTx.bankRefNumber}</div>
              <div><span className="text-gray-500">Status:</span> {selectedTx.status}</div>
              <div><span className="text-gray-500">Created:</span> {selectedTx.createdAt ? new Date(selectedTx.createdAt).toLocaleString("vi-VN") : "-"}</div>
              <div><span className="text-gray-500">Updated:</span> {selectedTx.updatedAt ? new Date(selectedTx.updatedAt).toLocaleString("vi-VN") : "-"}</div>
            </div>
            <div className="flex justify-end mt-4">
              <button onClick={() => setSelectedTx(null)} className="px-4 py-2 bg-gray-200 rounded">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
