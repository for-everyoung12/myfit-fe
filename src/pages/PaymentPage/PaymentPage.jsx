import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { generatePlanQR } from "../../services/payment.service";
import QRCode from "qrcode";

// icon assets
import bankIcon from "../../assets/bank-building.png";
import bank from "../../assets/bank.png";
import message from "../../assets/message.png";
import credit_card from "../../assets/credit-card.png";
import user_card from "../../assets/user-card.png";

const PaymentPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const plan = state?.plan;
  const { userId } = useContext(AuthContext);

  const [qrData, setQrData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQR = async () => {
      if (!plan?.id) return;
      try {
        const data = await generatePlanQR(plan.id);
        const qrImage = await QRCode.toDataURL(data.qrCode);
        setQrData({ ...data, qrImage });
      } catch (error) {
        console.error("Lỗi khi lấy QR:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchQR();
  }, [plan]);

  if (!plan) {
    return (
      <div className="text-center py-20 text-red-500 font-semibold">
        Không có gói nào được chọn.{" "}
        <button onClick={() => navigate("/")} className="underline text-blue-400">
          Quay về trang chủ
        </button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-gray-400">Đang tải thông tin thanh toán...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white px-6 py-12">
      <h1 className="text-3xl font-bold text-center text-cyan-400 mb-8">
        Thanh toán thủ công
      </h1>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 bg-slate-800 p-8 rounded-xl shadow-xl">
        {/* Cột trái: Thông tin tài khoản */}
        <div className="space-y-4 text-sm">
          <h2 className="text-xl font-semibold mb-4 text-white flex items-center gap-2">
            <img src={bankIcon} alt="Bank" className="w-6 h-6" />
            Thông tin tài khoản
          </h2>

          <div className="bg-slate-700 rounded p-3 space-y-1">
            <div className="flex items-center gap-2 text-gray-400">
              <img src={user_card} alt="User Icon" className="w-5 h-5" />
              <p className="text-black font-medium">CHỦ TÀI KHOẢN</p>
            </div>
            <p className="text-[#EC7979] font-bold text-lg">
              {qrData?.adminAccountName?.toUpperCase()}
            </p>
          </div>

          <div className="bg-slate-700 rounded p-3 space-y-1">
            <div className="flex items-center gap-2 text-gray-400">
              <img src={credit_card} alt="Credit Icon" className="w-5 h-5" />
              <p className="text-black font-medium">SỐ TÀI KHOẢN</p>
            </div>
            <p className="text-[#EC7979] font-semibold text-lg">
              {qrData?.adminAccountNumber}
            </p>
          </div>

          <div className="bg-slate-700 rounded p-3 space-y-1">
            <div className="flex items-center gap-2 text-gray-400">
              <img src={bank} alt="Bank Icon" className="w-5 h-5" />
              <p className="text-black font-medium">NGÂN HÀNG</p>
            </div>
            <p className="text-[#EC7979] font-semibold">
               {"VIETCOMBANK" || qrData?.adminBankCode.toUpperCase() }
            </p>
          </div>

          <div className="bg-slate-700 rounded p-3 space-y-1">
            <div className="flex items-center gap-2 text-gray-400">
              <img src={message} alt="Message Icon" className="w-5 h-5" />
              <p className="text-black font-medium">NỘI DUNG CHUYỂN</p>
            </div>
            <p className="text-[#EC7979] font-semibold break-words">
              {qrData?.paymentContent?.toUpperCase()}
            </p>
          </div>
        </div>

        {/* Cột phải: QR & Hướng dẫn */}
        <div className="flex flex-col items-center justify-center space-y-4">
          <h2 className="text-lg font-semibold">Quét mã QR để thanh toán</h2>
          {qrData?.qrImage && (
            <img
              src={qrData.qrImage}
              alt="QR Code"
              className="w-60 h-60 border-4 border-white rounded shadow-lg"
            />
          )}
          <div className="text-center space-y-2">
            <h1 className="font-bold">Hướng dẫn nhanh</h1>
            <p className="text-sm text-white text-center">
              1. Mở ứng dụng banking trên điện thoại <br />
              2. Chọn "Quét mã QR" hoặc "Chuyển tiền QR" <br />
              3. Quét mã và xác nhận thanh toán
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
