import React, { useEffect, useState } from "react";
import axios from "axios";

const TransactionPage = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axios.get("https://688f6988f21ab1769f891b1d.mockapi.io/api/v1/Auth/transactions");
        setTransactions(res.data);
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
                  <img
                    src={tx.avatar}
                    alt={tx.username}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="font-medium text-gray-800">{tx.username}</span>
                </td>
                <td className="px-6 py-4 text-green-600 font-semibold">
                  {tx.amount.toLocaleString("vi-VN")}₫
                </td>
                <td className="px-6 py-4 capitalize">{tx.type}</td>
                <td className="px-6 py-4 capitalize">{tx.method}</td>
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
