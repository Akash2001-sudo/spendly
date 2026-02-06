import axios from 'axios';

const API_URL = 'https://spendly-sehe.onrender.com/api/auth';
const USERS_API_URL = 'https://spendly-sehe.onrender.com/api/users'; // New API URL for user-related operations

// Create an axios instance with default config
const authApi = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to include the Authorization header for all requests
authApi.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem('user');
    if (user) {
      const { token } = JSON.parse(user);
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const signup = async (userData: any) => {
  const response = await authApi.post('/signup', userData);
  return response.data;
};

export const login = async (userData: any) => {
  const response = await authApi.post('/login', userData);
  return response.data;
};

// New function to update user profile
export const updateProfile = async (userId: string, profileData: { username?: string, email?: string }): Promise<any> => {
  const response = await authApi.put(`${USERS_API_URL}/${userId}`, profileData);
  return response.data;
};

