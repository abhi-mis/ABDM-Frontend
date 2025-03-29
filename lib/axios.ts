import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'apiabdm.docbot.in';

export const apiClient = axios.create({
  baseURL: `https://${BASE_URL}`, 
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    // Get tokens from sessionStorage
    const accessToken = sessionStorage.getItem('token');
    const xToken = sessionStorage.getItem('X_Token');

    // Add authorization headers if tokens exist
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    
    if (xToken) {
      config.headers['X-Token'] = xToken;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Handle specific error cases
    if (error.response?.status === 401) {
      // Clear tokens on unauthorized
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('X_Token');
      // You might want to redirect to login or handle this differently
    }
    return Promise.reject(error);
  }
);