import { API_BASE_URL } from "./constants";

// Types
export interface ArticleAuthor {
  id: number;
  uuid: string;
  username: string;
  firstName: string;
  lastName: string;
  avatarUrl: string | null;
}

export interface ArticleTag {
  id: number;
  name: string;
  slug: string;
  color: string;
}

export interface Article {
  id: number;
  uuid: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  coverImage: string | null;
  author: ArticleAuthor;
  tags: ArticleTag[] | string[];
  likesCount: number;
  userLiked: boolean | null;
  isBookmarked: boolean | null;
  commentsCount: number;
  viewsCount: number;
  readingTime: number;
  status: 'draft' | 'published' | 'archived';
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedArticles {
  content: Article[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

export interface CreateArticleDto {
  title: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  tags: string[];
  status?: 'draft' | 'published' | 'archived';
}

export interface UpdateArticleDto {
  title?: string;
  content?: string;
  excerpt?: string;
  coverImage?: string;
  tags?: string[];
  status?: 'draft' | 'published' | 'archived';
}

export interface GetArticlesParams {
  page?: number;
  limit?: number;
  sortBy?: 'latest' | 'popular' | 'trending';
  search?: string;
  author?: string;
  tags?: string;
}

// API Functions

/**
 * Get published articles with filtering
 */
export async function getArticles(params: GetArticlesParams = {}): Promise<PaginatedArticles> {
  const queryParams = new URLSearchParams();
  if (params.page !== undefined) queryParams.append('page', params.page.toString());
  if (params.limit !== undefined) queryParams.append('limit', params.limit.toString());
  if (params.sortBy) queryParams.append('sortBy', params.sortBy);
  if (params.search) queryParams.append('search', params.search);
  if (params.author) queryParams.append('author', params.author);
  if (params.tags) queryParams.append('tags', params.tags);

  // Send token if available for personalized data (userLiked status)
  const token = localStorage.getItem('accessToken');
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}/articles?${queryParams}`, {
    headers,
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch articles');
  }

  return response.json();
}

/**
 * Get trending articles
 */
export async function getTrendingArticles(params: { page?: number; limit?: number } = {}): Promise<PaginatedArticles> {
  const { page = 0, limit = 10 } = params;
  
  // Send token if available for personalized data (userLiked status)
  const token = localStorage.getItem('accessToken');
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}/articles/trending?page=${page}&limit=${limit}`, {
    headers,
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch trending articles');
  }

  return response.json();
}

/**
 * Get single article by slug
 */
export async function getArticleBySlug(slug: string): Promise<Article> {
  // Send token if available for personalized data (userLiked status)
  // But allow public access if no token (guests can still read)
  const token = localStorage.getItem('accessToken');
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}/articles/${slug}`, {
    headers,
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch article');
  }

  return response.json();
}

/**
 * Create new article
 */
export async function createArticle(data: CreateArticleDto): Promise<Article> {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    throw new Error('Authentication required');
  }

  const response = await fetch(`${API_BASE_URL}/articles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create article');
  }

  return response.json();
}

/**
 * Update article
 */
export async function updateArticle(slug: string, data: UpdateArticleDto): Promise<Article> {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    throw new Error('Authentication required');
  }

  const response = await fetch(`${API_BASE_URL}/articles/${slug}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to update article');
  }

  return response.json();
}

/**
 * Delete article
 */
export async function deleteArticle(slug: string): Promise<void> {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    throw new Error('Authentication required');
  }

  const response = await fetch(`${API_BASE_URL}/articles/${slug}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to delete article');
  }
}

/**
 * Like/Unlike article
 */
export async function likeArticle(slug: string): Promise<void> {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    throw new Error('Authentication required');
  }

  const response = await fetch(`${API_BASE_URL}/articles/${slug}/like`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to like article');
  }
}

/**
 * Vote on article (for forum - upvote/downvote)
 */
export async function voteArticle(slug: string, voteType: 'upvote' | 'downvote'): Promise<void> {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    throw new Error('Authentication required');
  }

  const response = await fetch(`${API_BASE_URL}/articles/${slug}/vote`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    credentials: 'include',
    body: JSON.stringify({ voteType }),
  });

  if (!response.ok) {
    throw new Error('Failed to vote on article');
  }
}

/**
 * Get user's draft articles
 */
export async function getDraftArticles(page: number = 0, limit: number = 10): Promise<PaginatedArticles> {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    throw new Error('Authentication required');
  }

  const response = await fetch(`${API_BASE_URL}/articles/drafts?page=${page}&limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch draft articles');
  }

  return response.json();
}

/**
 * Get user's votes on articles
 */
export async function getUserVotes(): Promise<{ articleSlug: string; voteType: string }[]> {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    throw new Error('Authentication required');
  }

  const response = await fetch(`${API_BASE_URL}/articles/votes`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user votes');
  }

  return response.json();
}

/**
 * Bookmark/unbookmark article (toggle)
 */
export async function bookmarkArticle(slug: string): Promise<void> {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    throw new Error('Authentication required');
  }

  const response = await fetch(`${API_BASE_URL}/articles/${slug}/bookmark`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to bookmark article');
  }

  const result = await response.json();
  console.log('Bookmark API response:', result);
}

/**
 * Get user's bookmarked articles
 */
export async function getBookmarkedArticles(page: number = 0, limit: number = 10): Promise<PaginatedArticles> {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    throw new Error('Authentication required');
  }

  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  const response = await fetch(`${API_BASE_URL}/articles/bookmarks?${queryParams}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch bookmarked articles');
  }

  return response.json();
}
