import React, { useEffect, useState } from "react";
import { getAllTransactions } from "../../services/transaction.service";

export default function TransactionPage() {
  const [transactions, setTransactions] = useState([]);
  const [selectedTx, setSelectedTx] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getAllTransactions();
        setTransactions(data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu giao dịch:", error);
      }
    };
    fetchTransactions();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Transaction History</h1>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">User</th>
              <th className="px-6 py-3">Amount</th>
              <th className="px-6 py-3">Type</th>
              <th className="px-6 py-3">Method</th>
              <th className="px-6 py-3">Note</th>
              <th className="px-6 py-3">Time</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id || tx._id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">{tx.username}</td>
                <td className="px-6 py-4 text-green-600 font-semibold">
                  {tx.amount.toLocaleString("vi-VN")}₫
                </td>
                <td className="px-6 py-4">
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold capitalize">
                    {tx.type.replace("_", " ")}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium capitalize">
                    {tx.method.replace("_", " ")}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600">{tx.note}</td>
                <td className="px-6 py-4 text-gray-500 text-xs">
                  {new Date(tx.createdAt).toLocaleString("vi-VN")}
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => setSelectedTx(tx)}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
            {transactions.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-500">
                  Không có giao dịch
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal xem chi tiết */}
      {selectedTx && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[520px] max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">Transaction Detail</h2>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><span className="text-gray-500">ID:</span> {selectedTx.id || selectedTx._id}</div>
              <div><span className="text-gray-500">User:</span> {selectedTx.username}</div>
              <div><span className="text-gray-500">Amount:</span> {selectedTx.amount.toLocaleString("vi-VN")}₫</div>
              <div><span className="text-gray-500">Type:</span> {selectedTx.type}</div>
              <div><span className="text-gray-500">Method:</span> {selectedTx.method}</div>
              <div className="col-span-2"><span className="text-gray-500">Note:</span> {selectedTx.note}</div>
              <div className="col-span-2"><span className="text-gray-500">Payment Content:</span> {selectedTx.paymentContent}</div>
              <div><span className="text-gray-500">Bank Name:</span> {selectedTx.bankName}</div>
              <div><span className="text-gray-500">Bank Ref #:</span> {selectedTx.bankRefNumber}</div>
              <div><span className="text-gray-500">Status:</span> {selectedTx.status}</div>
              <div><span className="text-gray-500">Created:</span> {new Date(selectedTx.createdAt).toLocaleString("vi-VN")}</div>
              <div><span className="text-gray-500">Updated:</span> {new Date(selectedTx.updatedAt).toLocaleString("vi-VN")}</div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setSelectedTx(null)}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
