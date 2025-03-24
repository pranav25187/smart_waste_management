// src/api.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API
export const login = async (email, password) => {
  return await api.post('/auth/login', { email, password });
};

export const signup = async (name, email, password, location, mobileNo) => {
  return await api.post('/auth/signup', { name, email, password, location, mobile_no: mobileNo });
};

export const forgotPassword = async (email) => {
  return await api.post('/auth/forgot-password', { email });
};

// E-Waste API
export const createEwaste = async (formData) => {
  return await api.post('/ewaste', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getEwaste = async () => {
  return await api.get('/ewaste');
};

export const getEwasteById = async (id) => {
  return await api.get(`/ewaste/${id}`);
};

export const updateEwaste = async (id, data) => {
  return await api.put(`/ewaste/${id}`, data);
};

export const deleteEwaste = async (id) => {
  return await api.delete(`/ewaste/${id}`);
};

// Messaging API
export const sendMessage = async (data) => {
  return await api.post('/messages', data);
};

export const getMessages = async (userId) => {
  return await api.get(`/messages/${userId}`);
};

export const getUnreadCount = async (userId) => {
  return await api.get(`/messages/${userId}/unread`);
};

// Transaction API
export const createTransaction = async (data) => {
  return await api.post('/transactions', data);
};

export const getTransactions = async (userId) => {
  return await api.get(`/transactions/${userId}`);
};

export const getTransactionById = async (id) => {
  return await api.get(`/transactions/${id}`);
};

export const updateTransactionStatus = async (transactionId, status) => {
  return await api.put(`/transactions/${transactionId}/status`, { status });
};

// User API
export const getUser = async (userId) => {
  return await api.get(`/users/${userId}`);
};

export const updateUser = async (userId, data) => {
  return await api.put(`/users/${userId}`, data);
};

// Materials API
export const getMaterials = async () => {
  return await api.get('/ewaste');
};

export const getMaterialsByOthers = async (userId) => {
  return await api.get('/materials/others', { params: { user_id: userId } });
};

export const getMyMaterials = async () => {
  return await api.get('/ewaste/my');
};

export const getMaterialById = async (id) => {
  return await api.get(`/ewaste/${id}`);
};

export const createMaterialRequest = async (data) => {
  return await api.post('/requests', data);
};

export const getRequestsForManufacturer = async (userId) => {
  return await api.get(`/requests/manufacturer/${userId}`);
};

export const createMaterial = async (formData) => {
  return await api.post('/ewaste', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const updateMaterial = async (id, formData) => {
  return await api.put(`/ewaste/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const deleteMaterial = async (id) => {
  return await api.delete(`/ewaste/${id}`);
};