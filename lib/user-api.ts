// User Management API client for CodeAdvisor backend
// Base URL: http://159.65.8.211:8080/api

const API_BASE_URL = 'http://159.65.8.211:8080/api';

// ==========================================
// TYPE DEFINITIONS
// ==========================================

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
  isFollowing?: boolean; // Whether current user is following this user
  role: string;
  createdAt: string;
}

export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  bio?: string;
  location?: string;
  website?: string;
  github?: string;
  twitter?: string;
  linkedin?: string;
  skills?: string[];
  avatar?: string;
}

export interface UserStats {
  postsCount: number;
  forumPostsCount: number;
  reputation: number;
  followersCount: number;
  followingCount: number;
  badges: any[];
}

export interface UserListItem {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  avatarUrl: string | null;
  bio: string | null;
  reputation: number;
  followersCount: number;
  followingCount: number;
  isVerified: boolean;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

export interface ApiResponse<T = any> {
  message?: string;
  data?: T;
}

// ==========================================
// HELPER FUNCTIONS
// ==========================================

function getAccessToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('accessToken');
  }
  return null;
}

function getAuthHeaders(): HeadersInit {
  const token = getAccessToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };
}

// ==========================================
// API FUNCTIONS
// ==========================================

/**
 * 1. Get current user profile
 * GET /api/users/profile
 */
export async function getCurrentUserProfile(): Promise<UserProfile> {
  const token = getAccessToken();
  
  if (!token) {
    throw new Error('No access token found');
  }

  const response = await fetch(`${API_BASE_URL}/users/profile`, {
    method: 'GET',
    headers: getAuthHeaders(),
    credentials: 'include',
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('getCurrentUserProfile error:', errorText);
    throw new Error(errorText || 'Failed to get user profile');
  }

  const userData = await response.json();
  console.log('Current user profile:', userData);
  return userData;
}

/**
 * 2. Update user profile
 * PUT /api/users/profile
 */
export async function updateUserProfile(data: UpdateProfileRequest): Promise<UserProfile> {
  const token = getAccessToken();
  
  if (!token) {
    throw new Error('No access token found');
  }

  const response = await fetch(`${API_BASE_URL}/users/profile`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    credentials: 'include',
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to update profile');
  }

  return response.json();
}

/**
 * 3. Get user by username
 * GET /api/users/{username}
 */
export async function getUserByUsername(username: string): Promise<UserProfile> {
  const response = await fetch(`${API_BASE_URL}/users/${username}`, {
    method: 'GET',
    headers: getAuthHeaders(), // Include auth to get isFollowing status
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'User not found');
  }

  return response.json();
}

/**
 * 4. Get users list with pagination and search
 * GET /api/users
 */
export async function getUsers(params: {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: 'reputation' | 'followers' | 'posts';
}): Promise<PaginatedResponse<UserListItem>> {
  const queryParams = new URLSearchParams();
  
  if (params.page !== undefined) queryParams.append('page', params.page.toString());
  if (params.limit !== undefined) queryParams.append('limit', params.limit.toString());
  if (params.search) queryParams.append('search', params.search);
  if (params.sortBy) queryParams.append('sortBy', params.sortBy);

  const response = await fetch(`${API_BASE_URL}/users?${queryParams.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch users');
  }

  return response.json();
}

/**
 * 5. Get user statistics
 * GET /api/users/{userUuid}/stats
 */
export async function getUserStats(userUuid: string): Promise<UserStats> {
  const response = await fetch(`${API_BASE_URL}/users/${userUuid}/stats`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch user stats');
  }

  return response.json();
}

/**
 * 6. Follow/unfollow user (toggle)
 * POST /api/users/{userUuid}/follow
 */
export async function toggleFollowUser(userUuid: string): Promise<ApiResponse> {
  const token = getAccessToken();
  
  if (!token) {
    throw new Error('No access token found');
  }

  console.log('Toggling follow for user:', userUuid);
  console.log('API URL:', `${API_BASE_URL}/users/${userUuid}/follow`);
  console.log('Using token:', token?.substring(0, 20) + '...');

  try {
    // Create abort controller for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const response = await fetch(`${API_BASE_URL}/users/${userUuid}/follow`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({}), // Send empty JSON object
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    console.log('Follow toggle response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Follow toggle error response:', errorText);
      
      try {
        const error = JSON.parse(errorText);
        throw new Error(error.message || 'Failed to update follow status');
      } catch {
        throw new Error(errorText || 'Failed to update follow status');
      }
    }

    const result = await response.json();
    console.log('Follow toggle success:', result);
    return result;
  } catch (error: any) {
    if (error.name === 'AbortError') {
      console.error('Follow toggle timeout - request took too long');
      throw new Error('Request timeout - server is not responding');
    }
    console.error('Follow toggle fetch error:', error);
    throw error;
  }
}

/**
 * 7. Get user's followers
 * GET /api/users/{userUuid}/followers
 */
export async function getUserFollowers(
  userUuid: string,
  params: { page?: number; limit?: number }
): Promise<PaginatedResponse<UserListItem>> {
  const queryParams = new URLSearchParams();
  
  if (params.page !== undefined) queryParams.append('page', params.page.toString());
  if (params.limit !== undefined) queryParams.append('limit', params.limit.toString());

  const response = await fetch(`${API_BASE_URL}/users/${userUuid}/followers?${queryParams.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch followers');
  }

  return response.json();
}

/**
 * 8. Get users that user is following
 * GET /api/users/{userUuid}/following
 */
export async function getUserFollowing(
  userUuid: string,
  params: { page?: number; limit?: number }
): Promise<PaginatedResponse<UserListItem>> {
  const queryParams = new URLSearchParams();
  
  if (params.page !== undefined) queryParams.append('page', params.page.toString());
  if (params.limit !== undefined) queryParams.append('limit', params.limit.toString());

  const response = await fetch(`${API_BASE_URL}/users/${userUuid}/following?${queryParams.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch following');
  }

  return response.json();
}
