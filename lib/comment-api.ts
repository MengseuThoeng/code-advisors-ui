import { API_BASE_URL } from './constants';

// Comment Types
export interface CommentAuthor {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  avatarUrl: string | null;
}

export interface ArticleComment {
  id: number;
  uuid: string;
  content: string;
  author: CommentAuthor;
  createdAt: string;
  updatedAt: string;
  votes: number;
  userVote: 'upvote' | 'downvote' | null;
  repliesCount: number;
  parentId: number | null;
  replies?: ArticleComment[];
  isEdited: boolean;
}

export interface PaginatedComments {
  content: ArticleComment[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

export interface CreateCommentDto {
  content: string;
  parentCommentId?: number | null;
}

// API Functions

/**
 * Get comments for an article
 */
export async function getArticleComments(
  articleSlug: string,
  page: number = 0,
  limit: number = 20,
  sortBy: 'newest' | 'oldest' | 'popular' = 'newest'
): Promise<PaginatedComments> {
  const token = localStorage.getItem('accessToken');
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(
    `${API_BASE_URL}/articles/${articleSlug}/comments?page=${page}&limit=${limit}&sortBy=${sortBy}`,
    {
      headers,
      credentials: 'include',
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch comments');
  }

  return response.json();
}

/**
 * Create a new comment on an article
 */
export async function createComment(
  articleSlug: string,
  data: CreateCommentDto
): Promise<ArticleComment> {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    throw new Error('Authentication required');
  }

  const response = await fetch(
    `${API_BASE_URL}/articles/${articleSlug}/comments`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create comment');
  }

  return response.json();
}

/**
 * Update a comment
 */
export async function updateComment(
  commentId: number,
  content: string
): Promise<ArticleComment> {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    throw new Error('Authentication required');
  }

  const response = await fetch(
    `${API_BASE_URL}/comments/${commentId}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
      body: JSON.stringify({ content }),
    }
  );

  if (!response.ok) {
    throw new Error('Failed to update comment');
  }

  return response.json();
}

/**
 * Delete a comment
 */
export async function deleteComment(commentId: number): Promise<void> {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    throw new Error('Authentication required');
  }

  const response = await fetch(
    `${API_BASE_URL}/comments/${commentId}`,
    {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
    }
  );

  if (!response.ok) {
    throw new Error('Failed to delete comment');
  }
}

/**
 * Vote on a comment (upvote/downvote)
 */
export async function voteComment(
  commentId: number,
  voteType: 'upvote' | 'downvote'
): Promise<void> {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    throw new Error('Authentication required');
  }

  const response = await fetch(
    `${API_BASE_URL}/comments/${commentId}/vote`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
      body: JSON.stringify({ voteType }),
    }
  );

  if (!response.ok) {
    throw new Error('Failed to vote on comment');
  }
}
