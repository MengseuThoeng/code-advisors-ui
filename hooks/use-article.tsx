import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  getArticles,
  getTrendingArticles,
  getArticleBySlug,
  createArticle,
  updateArticle,
  deleteArticle,
  likeArticle,
  voteArticle,
  getDraftArticles,
  getUserVotes,
  bookmarkArticle,
  getBookmarkedArticles,
  type Article,
  type GetArticlesParams,
  type CreateArticleDto,
  type UpdateArticleDto,
} from "@/lib/article-api";

// Query Keys
export const articleKeys = {
  all: ['articles'] as const,
  lists: () => [...articleKeys.all, 'list'] as const,
  list: (params: GetArticlesParams) => [...articleKeys.lists(), params] as const,
  trending: () => [...articleKeys.all, 'trending'] as const,
  drafts: () => [...articleKeys.all, 'drafts'] as const,
  detail: (slug: string) => [...articleKeys.all, 'detail', slug] as const,
  votes: () => [...articleKeys.all, 'votes'] as const,
};

/**
 * Get paginated articles with filters
 */
export function useArticles(params: GetArticlesParams = {}) {
  return useQuery({
    queryKey: articleKeys.list(params),
    queryFn: () => getArticles(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

/**
 * Get trending articles
 */
export function useTrendingArticles(params: { page?: number; limit?: number } = {}) {
  return useQuery({
    queryKey: articleKeys.trending(),
    queryFn: () => getTrendingArticles(params),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

/**
 * Get article by slug
 */
export function useArticle(slug: string) {
  return useQuery({
    queryKey: articleKeys.detail(slug),
    queryFn: () => getArticleBySlug(slug),
    enabled: !!slug,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

/**
 * Get draft articles
 */
export function useDraftArticles(page: number = 0, limit: number = 10) {
  return useQuery({
    queryKey: [...articleKeys.drafts(), page, limit],
    queryFn: () => getDraftArticles(page, limit),
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
}

/**
 * Get user's votes
 */
export function useUserVotes() {
  return useQuery({
    queryKey: articleKeys.votes(),
    queryFn: getUserVotes,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

/**
 * Create article mutation
 */
export function useCreateArticle() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateArticleDto) => createArticle(data),
    onSuccess: (article) => {
      // Invalidate article lists
      queryClient.invalidateQueries({ queryKey: articleKeys.lists() });
      queryClient.invalidateQueries({ queryKey: articleKeys.drafts() });
      
      // Redirect to article page
      router.push(`/content/${article.slug}`);
    },
  });
}

/**
 * Update article mutation
 */
export function useUpdateArticle(slug: string) {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateArticleDto) => updateArticle(slug, data),
    onSuccess: (article) => {
      // Invalidate article lists and detail
      queryClient.invalidateQueries({ queryKey: articleKeys.lists() });
      queryClient.invalidateQueries({ queryKey: articleKeys.detail(slug) });
      queryClient.invalidateQueries({ queryKey: articleKeys.drafts() });
      
      // Redirect to updated article
      if (article.slug !== slug) {
        router.push(`/content/${article.slug}`);
      }
    },
  });
}

/**
 * Delete article mutation
 */
export function useDeleteArticle() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (slug: string) => deleteArticle(slug),
    onSuccess: () => {
      // Invalidate article lists
      queryClient.invalidateQueries({ queryKey: articleKeys.lists() });
      queryClient.invalidateQueries({ queryKey: articleKeys.drafts() });
      
      // Redirect to home
      router.push('/content');
    },
  });
}

/**
 * Like/Unlike article mutation (for articles)
 */
export function useLikeArticle(slug: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => likeArticle(slug),
    // Optimistic update - immediately update UI before API response
    onMutate: async () => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: articleKeys.detail(slug) });

      // Snapshot the previous value
      const previousArticle = queryClient.getQueryData<Article>(articleKeys.detail(slug));

      // Optimistically update to the new value
      if (previousArticle) {
        queryClient.setQueryData<Article>(articleKeys.detail(slug), {
          ...previousArticle,
          userLiked: !previousArticle.userLiked,
          likesCount: previousArticle.userLiked 
            ? previousArticle.likesCount - 1 
            : previousArticle.likesCount + 1,
        });
      }

      // Return context with the previous value
      return { previousArticle };
    },
    // If mutation fails, roll back to previous value
    onError: (err, variables, context) => {
      if (context?.previousArticle) {
        queryClient.setQueryData(articleKeys.detail(slug), context.previousArticle);
      }
    },
    // Always refetch after error or success to sync with server
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: articleKeys.detail(slug) });
      queryClient.invalidateQueries({ queryKey: articleKeys.lists() });
    },
  });
}

/**
 * Vote on article mutation (for forum posts - upvote/downvote)
 */
export function useVoteArticle(slug: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (voteType: 'upvote' | 'downvote') => voteArticle(slug, voteType),
    onSuccess: () => {
      // Invalidate article detail and votes
      queryClient.invalidateQueries({ queryKey: articleKeys.detail(slug) });
      queryClient.invalidateQueries({ queryKey: articleKeys.votes() });
    },
  });
}

/**
 * Bookmark article mutation (toggle)
 */
export function useBookmarkArticle(slug: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => bookmarkArticle(slug),
    onMutate: async () => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: articleKeys.detail(slug) });

      // Snapshot the previous value
      const previousArticle = queryClient.getQueryData<Article>(articleKeys.detail(slug));

      // Optimistically toggle bookmark
      if (previousArticle) {
        queryClient.setQueryData<Article>(articleKeys.detail(slug), {
          ...previousArticle,
          isBookmarked: !previousArticle.isBookmarked,
        });
      }

      return { previousArticle };
    },
    onError: (err, variables, context) => {
      // Rollback on error
      if (context?.previousArticle) {
        queryClient.setQueryData(articleKeys.detail(slug), context.previousArticle);
      }
    },
    onSuccess: () => {
      // Backend now returns correct isBookmarked status - refetch to sync
      queryClient.invalidateQueries({ queryKey: articleKeys.detail(slug) });
    },
  });
}

/**
 * Get bookmarked articles
 */
export function useBookmarkedArticles(page: number = 0, limit: number = 10) {
  return useQuery({
    queryKey: ['bookmarked-articles', page, limit],
    queryFn: () => getBookmarkedArticles(page, limit),
  });
}
