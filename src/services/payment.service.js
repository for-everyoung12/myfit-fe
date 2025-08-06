import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Gọi API tạo QR cho plan
export const generatePlanQR = async (planId) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    `${API_BASE_URL}/api/Payment/generate-plan-payment-qr`,
    { planId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.data;
};

export const enrollPlan = async ({
  userId,
  planId,
  amount,
  paymentContent,
  bankName,
  bankRefNumber,
}) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    `${API_BASE_URL}/api/Payment/enroll-plan`,
    {
      userId,
      planId,
      amount,
      paymentContent,
      bankName,
      bankRefNumber,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
