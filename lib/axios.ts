import axios from 'axios';

const BASE_URL = 'apiabdm.docbot.in';

export const apiClient = axios.create({
  baseURL: `//${BASE_URL}`,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

// Get access token
export const getAccessToken = async () => {
  try {
    const response = await apiClient.get('/api/access-token');
    return response.data.access_token; 
  } catch (error) {
    console.error('Error getting access token:', error);
    throw error;
  }
};

// Aadhar verification endpoints
export const sendAadharOTP = async (aadharNumber: string, accessToken: string) => {
  try {
    const response = await apiClient.post('/api/send-otp', {
      aadhar: aadharNumber,
      accessToken
    });
    
    if (response.data.txnId) {
      sessionStorage.setItem('txnId', response.data.txnId);
    }
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const verifyAadharOTP = async (aadharNumber: string, otp: string, mobile: string, accessToken: string) => {
  try {
    const txnId = sessionStorage.getItem('txnId');
    
    if (!txnId) {
      throw new Error('Transaction ID not found');
    }

    const response = await apiClient.post('/api/verify-otp', {
      txnId,
      mobile,
      otp,
      accessToken
    });
    
    const { tokens, ABHAProfile } = response.data;
    
    if (tokens?.token) {
      sessionStorage.setItem('token', tokens.token);
      sessionStorage.setItem('X_Token', tokens.token);
    }
    
    if (ABHAProfile) {
      sessionStorage.setItem('ABHAProfile', JSON.stringify(ABHAProfile));
    }
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logout = () => {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('X_Token');
  sessionStorage.removeItem('txnId');
  sessionStorage.removeItem('ABHAProfile');
  window.location.href = '/login';
};

export const getProfile = async () => {
  const accessToken = sessionStorage.getItem('token');
  const xToken = sessionStorage.getItem('X_Token');

  if (!accessToken || !xToken) {
    throw new Error('Authentication tokens not found');
  }

  const response = await apiClient.post('/api/profile/account', {
    accessToken,
    xToken
  });
  return response.data;
};

export const getQrCode = async () => {
  const accessToken = sessionStorage.getItem('token');
  const xToken = sessionStorage.getItem('X_Token');

  if (!accessToken || !xToken) {
    throw new Error('Authentication tokens not found');
  }

  const response = await apiClient.post('/api/profile/qr', {
    accessToken,
    xToken
  }, {
    responseType: 'blob'
  });
  
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(response.data);
  });
};

export const getJustProfile = async () => {
  const accessToken = sessionStorage.getItem('token');
  const xToken = sessionStorage.getItem('X_Token');

  if (!accessToken || !xToken) {
    throw new Error('Authentication tokens not found');
  }

  const response = await apiClient.post('/api/profile', {
    accessToken,
    xToken
  });
  return response.data;
};

export const isAuthenticated = () => {
  return !!sessionStorage.getItem('token');
};