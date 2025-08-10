import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 

const authHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_BASE_URL}/api/v1/Auth/login`, credentials);
  return response.data.data; 
};

export const registerUser = async (data) => {
  const response = await axios.post(`${API_BASE_URL}/api/v1/Auth/register`, data);
  return response.data;
};

export const getAllUsers = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_BASE_URL}/api/v1/Users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
};


export const getCurrentUser = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API_BASE_URL}/api/v1/Users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
};

export const getUserById = async (id) => {
  const res = await axios.get(`${API_BASE_URL}/api/v1/Users/${id}`, {
    headers: authHeaders(),
  });
  return res.data.data;
};

export const updateUser = async (id, payload) => {
  const res = await axios.patch(`${API_BASE_URL}/api/v1/Users/${id}`, payload, {
    headers: authHeaders(),
  });
  return res.data.data;
};

export const deleteUser = async (id) => {
  const res = await axios.delete(`${API_BASE_URL}/api/v1/Users/${id}`, {
    headers: authHeaders(),
  });
  return res.data;
};