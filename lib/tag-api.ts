// Tags API client for CodeAdvisor backend
// Base URL: http://159.65.8.211:8080/api

const API_BASE_URL = 'http://159.65.8.211:8080/api';

// ==========================================
// TYPE DEFINITIONS
// ==========================================

export interface Tag {
  id: number;
  name: string;
  slug: string;
  color: string;
  followersCount: number;
  isFollowed: boolean;
}

export interface PaginatedTags {
  content: Tag[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

// Backend response types (different from our frontend types)
interface BackendTag {
  id: number;
  name: string;
  slug: string;
  description?: string;
  color: string;
  usageCount?: number;
  followerCount: number;
  isFollowing: boolean | null;
}

interface BackendPaginatedTags {
  content: BackendTag[];
  page: {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };
}

// Map backend tag to frontend tag
function mapTag(backendTag: BackendTag): Tag {
  return {
    id: backendTag.id,
    name: backendTag.name,
    slug: backendTag.slug,
    color: backendTag.color,
    followersCount: backendTag.followerCount,
    isFollowed: backendTag.isFollowing === true,
  };
}

// ==========================================
// API FUNCTIONS
// ==========================================

/**
 * Get all tags with pagination and search
 */
export async function getTags(params: {
  page?: number;
  limit?: number;
  search?: string;
} = {}): Promise<PaginatedTags> {
  const { page = 0, limit = 20, search = '' } = params;
  
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });
  
  if (search) {
    queryParams.append('search', search);
  }

  const response = await fetch(`${API_BASE_URL}/tags?${queryParams}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    console.error('Failed to fetch tags:', response.status, response.statusText);
    throw new Error('Failed to fetch tags');
  }

  const data: BackendPaginatedTags = await response.json();
  
  console.log('Tags API response:', data);
  
  // Map backend response to frontend format
  return {
    content: data.content.map(mapTag),
    totalPages: data.page.totalPages,
    totalElements: data.page.totalElements,
    size: data.page.size,
    number: data.page.number,
  };
}

/**
 * Get tag by slug
 */
export async function getTagBySlug(slug: string): Promise<Tag> {
  const response = await fetch(`${API_BASE_URL}/tags/${slug}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch tag');
  }

  const data: BackendTag = await response.json();
  return mapTag(data);
}
