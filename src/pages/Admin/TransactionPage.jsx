import React, { useEffect, useState } from "react";
import { getAllTransactions } from "../../services/transaction.service";

const TransactionPage = () => {
  const [transactions, setTransactions] = useState([]);

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
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 flex items-center gap-3">
                  <span className="font-medium text-gray-800">{tx.username}</span>
                </td>
                <td className="px-6 py-4 text-green-600 font-semibold">
                  {tx.amount.toLocaleString("vi-VN")}₫
                </td>
                <td className="px-6 py-4">
                  {tx.type === "plan_purchase" ? (
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold capitalize">
                      {tx.type.replace("_", " ")}
                    </span>
                  ) : (
                    <span className="capitalize">{tx.type.replace("_", " ")}</span>
                  )}
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionPage;
