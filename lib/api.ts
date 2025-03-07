// API endpoints and types
export const API_ENDPOINTS = {
  SESSION: 'https://dev.abdm.gov.in/api/hiecm/gateway/v3/sessions',
  SEND_OTP: 'https://abhasbx.abdm.gov.in/abha/api/v3/enrollment/request/otp',
  VERIFY_OTP: 'https://abhasbx.abdm.gov.in/abha/api/v3/enrollment/enrol/byAadhaar',
};

export interface SessionResponse {
  accessToken: string;
}

export interface OtpResponse {
  txnId: string;
  message: string;
}

export interface VerifyOtpResponse {
  message: string;
  txnId: string;
  tokens: {
    token: string;
    expiresIn: number;
    refreshToken: string;
    refreshExpiresIn: number;
  };
  ABHAProfile: {
    firstName: string;
    middleName: string;
    lastName: string;
    dob: string;
    gender: string;
    mobile: string;
    ABHANumber: string;
  };
}

export async function getSession(clientId: string, clientSecret: string): Promise<SessionResponse> {
  try {
    console.log('Getting session with:', { clientId, clientSecret });
    const response = await fetch(API_ENDPOINTS.SESSION, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'REQUEST-ID': crypto.randomUUID(),
        'TIMESTAMP': new Date().toISOString(),
        'X-CM-ID': 'sbx',
      },
      body: JSON.stringify({
        clientId,
        clientSecret,
        grantType: 'client_credentials',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Session error:', errorData);
      throw new Error(errorData.message || 'Failed to get session');
    }

    const data = await response.json();
    console.log('Session response:', data);

    // Save the access token in session storage
    sessionStorage.setItem('accessToken', data.accessToken);

    return data;
  } catch (error) {
    console.error('Session error:', error);
    throw error;
  }
}

export async function sendOtp(encryptedAadhaar: string): Promise<OtpResponse> {
  try {
    console.log('Sending OTP with encrypted Aadhaar');
    const response = await fetch(API_ENDPOINTS.SEND_OTP, {
      mode: 'no-cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'REQUEST-ID': crypto.randomUUID(),
        'TIMESTAMP': new Date().toISOString(),
      },
      body: JSON.stringify({
        txnId: '',
        scope: ['abha-enrol'],
        loginHint: 'aadhaar',
        loginId: encryptedAadhaar,
        otpSystem: 'aadhaar',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('OTP error:', errorData);
      throw new Error(errorData.message || 'Failed to send OTP');
    }

    const data = await response.json();
    console.log('OTP response:', data);
    return data;
  } catch (error) {
    console.error('Send OTP error:', error);
    throw error;
  }
}

export async function verifyOtp(
  txnId: string,
  otp: string,
  mobile: string
): Promise<VerifyOtpResponse> {
  const accessToken = sessionStorage.getItem('accessToken'); // Retrieve the token from session storage
  if (!accessToken) {
    throw new Error('Access token is not available. Please create a session first.');
  }

  try {
    console.log('Verifying OTP:', { txnId, mobile });
    const response = await fetch(API_ENDPOINTS.VERIFY_OTP, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        'REQUEST-ID': crypto.randomUUID(),
        'TIMESTAMP': new Date().toISOString(),
      },
      body: JSON.stringify({
        authData: {
          authMethods: ['otp'],
          otp: {
            txnId,
            otpValue: otp,
            mobile,
          },
        },
        consent: {
          code: 'abha-enrollment',
          version: '1.4',
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Verify OTP error:', errorData);
      throw new Error(errorData.message || 'Failed to verify OTP');
    }

    const data = await response.json();
    console.log('Verify OTP response:', data);
    return data;
  } catch (error) {
    console.error('Verify OTP error:', error);
    throw error;
  }
}