// Authentication API client for CodeAdvisor backend
// Base URL: http://159.65.8.211:8080

const API_BASE_URL = 'http://159.65.8.211:8080/api';

// ==========================================
// TYPE DEFINITIONS
// ==========================================

export interface RegisterRequest {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface VerifyOtpRequest {
  email: string;
  otp: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

export interface UserProfile {
  id: number;
  uuid: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  bio: string | null;
  avatarUrl: string | null;
  location: string | null;
  websiteUrl: string | null;
  githubUsername: string | null;
  twitterUsername: string | null;
  linkedinUsername: string | null;
  skills: string[];
  reputation: number;
  followersCount: number;
  followingCount: number;
  postsCount: number;
  forumPostsCount: number;
  isVerified: boolean;
  role: string;
  createdAt: string;
}

export interface ApiResponse<T = any> {
  message?: string;
  data?: T;
}

// ==========================================
// API FUNCTIONS
// ==========================================

/**
 * 1. Register a new user
 * POST /api/auth/register
 */
export async function register(data: RegisterRequest): Promise<ApiResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Registration failed');
  }

  return response.json();
}

/**
 * 2. Verify OTP
 * POST /api/auth/verify-otp
 */
export async function verifyOtp(data: VerifyOtpRequest): Promise<ApiResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'OTP verification failed');
  }

  return response.json();
}

/**
 * 3. Login
 * POST /api/auth/login
 */
export async function login(data: LoginRequest): Promise<LoginResponse> {
  console.log('Logging in with:', data.email);
  
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // Important: Include cookies
    body: JSON.stringify(data),
  });

  console.log('Login response status:', response.status);

  if (!response.ok) {
    let errorMessage = 'Login failed. Please try again.';
    
    try {
      const error = await response.json();
      
      // Map common error messages to user-friendly ones
      if (error.message) {
        const msg = error.message.toLowerCase();
        
        if (msg.includes('invalid') || msg.includes('incorrect') || msg.includes('wrong')) {
          errorMessage = 'Invalid email or password. Please try again.';
        } else if (msg.includes('not found') || msg.includes('user does not exist')) {
          errorMessage = 'Account not found. Please check your email.';
        } else if (msg.includes('verify') || msg.includes('verification') || msg.includes('not verified')) {
          errorMessage = 'Please verify your email before logging in.';
        } else if (msg.includes('disabled') || msg.includes('banned') || msg.includes('blocked')) {
          errorMessage = 'Your account has been disabled. Please contact support.';
        } else if (msg.includes('credentials')) {
          errorMessage = 'Invalid email or password. Please try again.';
        } else {
          // If we get a reasonably readable message, use it
          errorMessage = error.message;
        }
      } else if (response.status === 401) {
        errorMessage = 'Invalid email or password. Please try again.';
      } else if (response.status === 403) {
        errorMessage = 'Access denied. Your account may be disabled.';
      } else if (response.status === 404) {
        errorMessage = 'Account not found. Please check your email.';
      }
    } catch (e) {
      // If JSON parsing fails, provide a generic user-friendly message
      if (response.status === 401) {
        errorMessage = 'Invalid email or password. Please try again.';
      } else if (response.status === 403) {
        errorMessage = 'Access denied. Your account may be disabled.';
      } else if (response.status === 404) {
        errorMessage = 'Account not found. Please check your email.';
      } else if (response.status >= 500) {
        errorMessage = 'Server error. Please try again later.';
      }
    }
    
    throw new Error(errorMessage);
  }

  const result = await response.json();
  console.log('Login response:', result);
  
  // Store tokens in localStorage as backup (httpOnly cookies are primary)
  if (typeof window !== 'undefined') {
    localStorage.setItem('accessToken', result.accessToken);
    localStorage.setItem('refreshToken', result.refreshToken);
    console.log('Tokens stored in localStorage');
  }

  return result;
}

/**
 * 4. Refresh access token
 * POST /api/auth/refresh
 */
export async function refreshAccessToken(refreshToken: string): Promise<LoginResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Token refresh failed');
  }

  const result = await response.json();
  
  // Update tokens in localStorage
  if (typeof window !== 'undefined') {
    localStorage.setItem('accessToken', result.accessToken);
    localStorage.setItem('refreshToken', result.refreshToken);
  }

  return result;
}

/**
 * 5. Forgot password
 * POST /api/auth/forgot-password
 */
export async function forgotPassword(data: ForgotPasswordRequest): Promise<ApiResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to send reset email');
  }

  return response.json();
}

/**
 * 6. Reset password
 * POST /api/auth/reset-password
 */
export async function resetPassword(data: ResetPasswordRequest): Promise<ApiResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Password reset failed');
  }

  return response.json();
}

/**
 * 7. Get current user profile
 * GET /api/users/profile
 */
export async function getCurrentUser(): Promise<UserProfile> {
  const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  
  if (!accessToken) {
    throw new Error('No access token found');
  }

  console.log('Fetching current user with token:', accessToken?.substring(0, 20) + '...');

  const response = await fetch(`${API_BASE_URL}/users/profile`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    credentials: 'include', // Important: Include cookies
  });

  console.log('getCurrentUser response status:', response.status);

  if (!response.ok) {
    const errorText = await response.text();
    console.error('getCurrentUser error response:', errorText);
    
    // Clear tokens on any error to prevent infinite loops
    if (response.status === 401 || response.status === 500) {
      logout();
    }
    
    if (response.status === 401) {
      // Try to refresh token
      const refreshToken = typeof window !== 'undefined' ? localStorage.getItem('refreshToken') : null;
      if (refreshToken) {
        try {
          await refreshAccessToken(refreshToken);
          // Retry the request
          return getCurrentUser();
        } catch (error) {
          // Refresh failed, logout
          logout();
          throw new Error('Session expired. Please login again.');
        }
      }
    }
    
    // Try to parse as JSON, fallback to text
    try {
      const errorJson = JSON.parse(errorText);
      throw new Error(errorJson.message || 'Failed to get user profile');
    } catch {
      throw new Error(errorText || 'Failed to get user profile');
    }
  }

  const userData = await response.json();
  console.log('Current user data:', userData);
  return userData;
}

/**
 * 8. Logout (clear tokens)
 */
export function logout(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    // Redirect to login page
    window.location.href = '/auth/login';
  }
}

/**
 * 9. Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  const accessToken = localStorage.getItem('accessToken');
  return !!accessToken;
}

/**
 * 10. Get access token
 */
export function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('accessToken');
}
