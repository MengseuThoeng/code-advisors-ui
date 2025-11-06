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
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Login failed');
  }

  const result = await response.json();
  
  // Store tokens in localStorage
  if (typeof window !== 'undefined') {
    localStorage.setItem('accessToken', result.accessToken);
    localStorage.setItem('refreshToken', result.refreshToken);
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
 * GET /api/auth/me
 */
export async function getCurrentUser(): Promise<UserProfile> {
  const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  
  if (!accessToken) {
    throw new Error('No access token found');
  }

  const response = await fetch(`${API_BASE_URL}/auth/me`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
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
    const error = await response.json();
    throw new Error(error.message || 'Failed to get user profile');
  }

  return response.json();
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
