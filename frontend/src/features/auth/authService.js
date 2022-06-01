import axios from 'axios';

const API_URL = '/api/users';

// Register user
const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
}

// Login user
const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
}

// Logout user
const logout = () => localStorage.removeItem('user');

// Get users
const getUsers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.get(`${API_URL}`, config);
  return response.data;
}

// Get user
const getUser = async (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.get(`${API_URL}/${userId}`, config);
  return response.data;
}

// Get note by user._id
const getUserByNote = async (note, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.get(`${API_URL}/${note.user}`, config);
  return response.data;
}

// Get current user
const getMe = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.get(`${API_URL}/me`, config);
  return response.data;
}

const authService = {
  register,
  logout,
  login,
  getUsers,
  getUser,
  getUserByNote,
  getMe
}

export default authService;