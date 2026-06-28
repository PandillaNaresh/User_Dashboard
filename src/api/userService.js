import axios from 'axios';

// The base URL of the fake REST API we are using
const BASE_URL = 'https://jsonplaceholder.typicode.com/users';

// All API functions are here — GET, POST, PUT, DELETE
const userService = {

  // Get all users from the API
  getUsers: async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
  },

  // Add a new user
  createUser: async (userData) => {
    const response = await axios.post(BASE_URL, userData);
    return response.data;
  },

  // Update an existing user by their ID
  updateUser: async (id, userData) => {
    const response = await axios.put(`${BASE_URL}/${id}`, userData);
    return response.data;
  },

  // Delete a user by their ID
  deleteUser: async (id) => {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
  }

};

export default userService;
