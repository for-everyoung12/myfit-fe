import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getAllTransactions = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_BASE_URL}/api/v1/Transaction`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
};

export const createTransaction = async (transactionData) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(
    `${API_BASE_URL}/api/v1/Transaction`,
    transactionData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
