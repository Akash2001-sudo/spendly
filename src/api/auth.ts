import axios from 'axios';

const API_URL = 'https://spendly-sehe.onrender.com/api/auth';

// Create an axios instance with default config
const authApi = axios.create({
  baseURL: API_URL,
});

export const signup = async (userData: any) => {
  const response = await authApi.post('/signup', userData);
  return response.data;
};

export const login = async (userData: any) => {
  const response = await authApi.post('/login', userData);
  return response.data;
};
