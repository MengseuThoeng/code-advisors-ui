import { API_BASE_URL } from "./constants";

// Helper to get auth token
const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('accessToken');
  }
  return null;
};

// Admin API Types
export interface AdminVerifyResponse {
  isAdmin: boolean;
  role: string;
}

export interface PlatformOverviewStats {
  totalUsers: number;
  totalArticles: number;
  totalComments: number;
  totalTags: number;
  totalNotifications: number;
  activeUsers: number;
  todayRegistrations: number;
  todayArticles: number;
}

export interface UserGrowthStats {
  period: string;
  totalUsers: number;
  newUsers: number;
  activeUsers: number;
  verifiedUsers: number;
  unverifiedUsers: number;
  usersByRole: {
    admin: number;
    user: number;
  };
  growthData: Array<{
    date: string;
    count: number;
  }>;
}

export interface ContentStats {
  articles: {
    total: number;
    published: number;
    draft: number;
    todayPublished: number;
  };
  comments: {
    total: number;
    todayComments: number;
  };
  tags: {
    total: number;
    mostUsed: Array<{
      name: string;
      count: number;
    }>;
  };
}

export interface EngagementStats {
  likes: {
    total: number;
    todayLikes: number;
  };
  bookmarks: {
    total: number;
    todayBookmarks: number;
  };
  views: {
    total: number;
    todayViews: number;
  };
}

export interface AdminUser {
  id?: number;
  uuid?: string;
  username: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  profileImageUrl?: string;
  bio?: string;
  role?: string;
  isVerified: boolean;
  isActive?: boolean;
  reputation?: number;
  postsCount?: number;
  followersCount?: number;
  followingCount?: number;
  createdAt?: string;
  lastLoginAt?: string;
}

export interface AdminUserListResponse {
  content: AdminUser[];
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface BlockUserRequest {
  userUuid: string;
  reason?: string;
}

// Admin API Client
export const adminApi = {
  /**
   * Verify if current user is admin
   */
  verify: async (): Promise<AdminVerifyResponse> => {
    const token = getToken();
    const response = await fetch(`${API_BASE_URL}/admin/verify`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to verify admin status');
    }
    
    return response.json();
  },

  /**
   * Get platform overview statistics
   */
  getOverviewStats: async (): Promise<PlatformOverviewStats> => {
    const token = getToken();
    const response = await fetch(`${API_BASE_URL}/admin/stats/overview`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch overview stats');
    }
    
    return response.json();
  },

  /**
   * Get user growth statistics
   */
  getUserStats: async (period: '7d' | '30d' | '90d' | '1y' = '30d'): Promise<UserGrowthStats> => {
    const token = getToken();
    const response = await fetch(
      `${API_BASE_URL}/admin/stats/users?period=${period}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch user stats');
    }
    
    return response.json();
  },

  /**
   * Get content statistics
   */
  getContentStats: async (): Promise<ContentStats> => {
    const token = getToken();
    const response = await fetch(`${API_BASE_URL}/admin/stats/content`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch content stats');
    }
    
    return response.json();
  },

  /**
   * Get engagement statistics
   */
  getEngagementStats: async (): Promise<EngagementStats> => {
    const token = getToken();
    const response = await fetch(`${API_BASE_URL}/admin/stats/engagement`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch engagement stats');
    }
    
    return response.json();
  },

  /**
   * Get all users with filters (using public endpoint)
   */
  getUsers: async (params?: {
    page?: number;
    size?: number;
    role?: string;
    status?: string;
    search?: string;
    sortBy?: string;
  }): Promise<AdminUserListResponse> => {
    const token = getToken();
    const queryParams = new URLSearchParams();
    
    if (params?.page !== undefined) queryParams.append('page', params.page.toString());
    if (params?.size !== undefined) queryParams.append('limit', params.size.toString()); // Public API uses 'limit'
    if (params?.search) queryParams.append('search', params.search);
    if (params?.sortBy) queryParams.append('sortBy', params.sortBy);
    // Note: public /api/users doesn't support role/status filters

    const url = `${API_BASE_URL}/users?${queryParams.toString()}`;
    console.log('Fetching users from:', url);
    console.log('With token:', token ? 'Present' : 'Missing');

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    console.log('Users response status:', response.status);
    
    if (!response.ok) {
      let errorMessage = `Failed to fetch users (${response.status})`;
      try {
        const errorData = await response.json();
        console.error('Users error (JSON):', errorData);
        
        if (response.status === 403) {
          errorMessage = 'Access denied. You need admin privileges to view this page.';
        } else {
          errorMessage = errorData.message || errorData.error || errorMessage;
        }
      } catch (e) {
        const errorText = await response.text();
        console.error('Users error (Text):', errorText);
        
        if (response.status === 403) {
          errorMessage = 'Access denied. You need admin privileges to view this page.';
        } else {
          errorMessage = errorText || errorMessage;
        }
      }
      throw new Error(errorMessage);
    }
    
    const data = await response.json();
    console.log('Users data received:', {
      totalElements: data.totalElements,
      totalPages: data.totalPages,
      contentLength: data.content?.length
    });
    return data;
  },

  /**
   * Ban a user
   */
  banUser: async (userUuid: string, reason?: string): Promise<{ message: string }> => {
    const token = getToken();
    const response = await fetch(`${API_BASE_URL}/admin/users/${userUuid}/ban`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ reason: reason || 'Banned by admin', duration: 'permanent' }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to ban user');
    }
    
    return response.json();
  },

  /**
   * Unban a user
   */
  unbanUser: async (userUuid: string): Promise<{ message: string }> => {
    const token = getToken();
    const response = await fetch(`${API_BASE_URL}/admin/users/${userUuid}/unban`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to unban user');
    }
    
    return response.json();
  },
};
