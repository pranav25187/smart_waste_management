import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Adjust the URL as needed

export const login = async (email, password) => {
  return await axios.post(`${API_URL}/auth/login`, { email, password });
};

export const signup = async (email, password, role, location) => {
  return await axios.post(`${API_URL}/auth/signup`, { email, password, role, location });
};

export const createEwaste = async (data) => {
  return await axios.post(`${API_URL}/ewaste`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getEwaste = async () => {
  return await axios.get(`${API_URL}/ewaste`);
};

export const createMaterialRequest = async (data) => {
  return await axios.post(`${API_URL}/requests`, data);
};

export const getMaterials = async () => {
  return await axios.get(`${API_URL}/materials`);
};

export const getTransactions = async () => {
  return await axios.get(`${API_URL}/transactions`);
};

export const sendMessage = async (data) => {
  return await axios.post(`${API_URL}/messages`, data);
};

export const getMessages = async (userId) => {
  return await axios.get(`${API_URL}/messages/${userId}`);
};

export const getResources = async () => {
  return await axios.get(`${API_URL}/resources`);
};

export const uploadResource = async (data) => {
  return await axios.post(`${API_URL}/resources`, data);
};