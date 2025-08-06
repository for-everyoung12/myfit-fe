import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const PLAN_ENDPOINT = `${API_BASE_URL}/api/v1/Plan`;

// Lấy tất cả các gói
export const getAllPlans = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(PLAN_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
};

// Lấy gói theo ID
export const getPlanById = async (planId) => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${PLAN_ENDPOINT}/${planId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
};

// Tạo mới một gói
export const createPlan = async (planData) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(PLAN_ENDPOINT, planData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
};

// Cập nhật gói theo ID
export const updatePlan = async (planId, updatedData) => {
  const token = localStorage.getItem('token');
  const response = await axios.put(`${PLAN_ENDPOINT}/${planId}`, updatedData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
};

// Xóa gói theo ID
export const deletePlan = async (planId) => {
  const token = localStorage.getItem('token');
  const response = await axios.delete(`${PLAN_ENDPOINT}/${planId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.message;
};
