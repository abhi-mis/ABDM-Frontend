import axios from 'axios';

const BASE_URL = "apiabdm.docbot.in";

const isBrowser = typeof window !== 'undefined';

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
    if (isBrowser) {
      sessionStorage.setItem('token', response.data.access_token);
    }
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
    
    if (response.data.txnId && isBrowser) {
      sessionStorage.setItem('txnId', response.data.txnId);
    }
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const verifyAadharOTP = async (aadharNumber: string, otp: string, mobile: string, accessToken: string) => {
  try {
    const txnId = isBrowser ? sessionStorage.getItem('txnId') : null;
    
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
    
    if (tokens && isBrowser) {
      sessionStorage.setItem('X_Token', tokens.refreshToken);
      sessionStorage.setItem('token', tokens.token);
    }
    
    if (ABHAProfile && isBrowser) {
      sessionStorage.setItem('ABHAProfile', JSON.stringify(ABHAProfile));
    }
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logout = () => {
  if (isBrowser) {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('X_Token');
    sessionStorage.removeItem('txnId');
    sessionStorage.removeItem('ABHAProfile');
    window.location.href = '/login';
  }
};

export const getProfile = async () => {
  if (!isBrowser) {
    throw new Error('Cannot access profile outside browser environment');
  }

  const accessToken = sessionStorage.getItem('token');
  const xToken = sessionStorage.getItem('X_Token');

  if (!accessToken || !xToken) {
    throw new Error('Authentication tokens not found');
  }

  const response = await apiClient.post('/api/profile/account', {
    accessToken,
    'X_Token': xToken
  });
  return response.data;
};

export const getQrCode = async () => {
  if (!isBrowser) {
    throw new Error('Cannot access QR code outside browser environment');
  }

  const accessToken = sessionStorage.getItem('token');
  const xToken = sessionStorage.getItem('X_Token');

  if (!accessToken || !xToken) {
    throw new Error('Authentication tokens not found');
  }

  const response = await apiClient.post('/api/profile/qr', {
    accessToken,
    'X_Token': xToken
  });
  return response.data;
};

export const getJustProfile = async () => {
  if (!isBrowser) {
    throw new Error('Cannot access profile outside browser environment');
  }

  const accessToken = sessionStorage.getItem('token');
  const xToken = sessionStorage.getItem('X_Token');

  if (!accessToken || !xToken) {
    throw new Error('Authentication tokens not found');
  }

  const response = await apiClient.post('/api/profile', {
    accessToken,
    'X_Token': xToken
  });
  return response.data;
};

export const isAuthenticated = () => {
  if (!isBrowser) {
    return false;
  }
  return !!sessionStorage.getItem('token');
};