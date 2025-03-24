// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Adjust the URL as needed

// Auth API
export const login = async (email, password) => {
  return await axios.post(`${API_URL}/auth/login`, { email, password });
};

export const signup = async (name, email, password, location, mobileNo) => {
  return await axios.post(`${API_URL}/auth/signup`, { name, email, password, location, mobile_no: mobileNo });
};

export const forgotPassword = async (email) => {
  return await axios.post(`${API_URL}/auth/forgot-password`, { email });
};

// E-Waste API
export const createEwaste = async (formData) => {
  return await axios.post(`${API_URL}/ewaste`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getEwaste = async () => {
  return await axios.get(`${API_URL}/ewaste`);
};

export const getEwasteById = async (id) => {
  return await axios.get(`${API_URL}/ewaste/${id}`);
};

export const updateEwaste = async (id, data) => {
  return await axios.put(`${API_URL}/ewaste/${id}`, data);
};

export const deleteEwaste = async (id) => {
  return await axios.delete(`${API_URL}/ewaste/${id}`);
};

// Messaging API
export const sendMessage = async (senderId, receiverId, message) => {
  return await axios.post(`${API_URL}/messages`, { sender_id: senderId, receiver_id: receiverId, message });
};

export const getMessages = async (userId) => {
  return await axios.get(`${API_URL}/messages/${userId}`);
};

// Transaction API
export const createTransaction = async (data) => {
  return await axios.post(`${API_URL}/transactions`, data);
};

export const getTransactions = async (userId) => {
  return await axios.get(`${API_URL}/transactions/${userId}`);
};

export const getTransactionById = async (id) => {
  return await axios.get(`${API_URL}/transactions/${id}`);
};

// User API
export const getUser = async (userId) => {
  return await axios.get(`${API_URL}/users/${userId}`);
};

export const updateUser = async (userId, data) => {
  return await axios.put(`${API_URL}/users/${userId}`, data);
};

// Materials API
export const getMaterials = async () => {
  return await axios.get(`${API_URL}/materials`);
};

export const getMaterialsByOthers = async (userId) => {
  return await axios.get(`${API_URL}/materials/others`, { params: { user_id: userId } });
};

export const getMyMaterials = async (userId) => {
  return await axios.get(`${API_URL}/materials/my`, { params: { user_id: userId } });
};

export const getMaterialById = async (id) => {
  return await axios.get(`${API_URL}/materials/${id}`);
};

export const createMaterialRequest = async (data) => {
  return await axios.post(`${API_URL}/requests`, data);
};

export const getRequestsForManufacturer = async (userId) => {
  return await axios.get(`${API_URL}/requests/manufacturer/${userId}`);
};