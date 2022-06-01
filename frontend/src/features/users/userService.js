import axios from 'axios';

const API_URL = '/api/users';

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

// Get note by userId
const getUserByNote = async (note, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.get(`${API_URL}/${note.user}`, config);
  return response.data;
}

const userService = {
  getUsers,
  getUser,
  getUserByNote
}

export default userService;