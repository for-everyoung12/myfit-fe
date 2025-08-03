import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 

export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_BASE_URL}/api/v1/Auth/login`, credentials);
  return response.data.data; 
};

export const registerUser = async (data) => {
  const response = await axios.post(`${API_BASE_URL}/api/v1/Auth/register`, data);
  return response.data;
};