// Tags hooks using TanStack Query
import { useQuery } from '@tanstack/react-query';
import * as tagApi from '@/lib/tag-api';

// ==========================================
// QUERY KEYS
// ==========================================

export const tagKeys = {
  all: ['tags'] as const,
  lists: () => [...tagKeys.all, 'list'] as const,
  list: (params: any) => [...tagKeys.lists(), params] as const,
  details: () => [...tagKeys.all, 'detail'] as const,
  detail: (slug: string) => [...tagKeys.details(), slug] as const,
};

// ==========================================
// QUERY HOOKS
// ==========================================

/**
 * Hook to get all tags with pagination
 */
export function useTags(params: {
  page?: number;
  limit?: number;
  search?: string;
} = {}) {
  return useQuery({
    queryKey: tagKeys.list(params),
    queryFn: () => tagApi.getTags(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook to get tag by slug
 */
export function useTag(slug: string) {
  return useQuery({
    queryKey: tagKeys.detail(slug),
    queryFn: () => tagApi.getTagBySlug(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
