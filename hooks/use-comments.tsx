import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getArticleComments,
  createComment,
  updateComment,
  deleteComment,
  voteComment,
  type CreateCommentDto,
  type ArticleComment,
} from "@/lib/comment-api";

// Query Keys
export const commentKeys = {
  all: ['comments'] as const,
  lists: () => [...commentKeys.all, 'list'] as const,
  list: (articleSlug: string, page: number = 0) => 
    [...commentKeys.lists(), articleSlug, page] as const,
  details: () => [...commentKeys.all, 'detail'] as const,
  detail: (id: number) => [...commentKeys.details(), id] as const,
};

/**
 * Fetch comments for an article
 */
export function useArticleComments(
  articleSlug: string, 
  page: number = 0, 
  limit: number = 20,
  sortBy: 'newest' | 'oldest' | 'popular' = 'newest'
) {
  return useQuery({
    queryKey: commentKeys.list(articleSlug, page),
    queryFn: () => getArticleComments(articleSlug, page, limit, sortBy),
    staleTime: 30000, // 30 seconds
  });
}

/**
 * Create comment mutation
 */
export function useCreateComment(articleSlug: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCommentDto) => createComment(articleSlug, data),
    onSuccess: () => {
      // Invalidate all comment lists for this article
      queryClient.invalidateQueries({ 
        queryKey: commentKeys.lists(),
        predicate: (query: any) => 
          query.queryKey[0] === 'comments' && 
          query.queryKey[1] === 'list' && 
          query.queryKey[2] === articleSlug
      });
      
      // Also invalidate article detail to update comment count
      queryClient.invalidateQueries({ 
        queryKey: ['articles', 'detail', articleSlug] 
      });
    },
  });
}

/**
 * Update comment mutation
 */
export function useUpdateComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ commentId, content }: { commentId: number; content: string }) =>
      updateComment(commentId, content),
    onSuccess: () => {
      // Invalidate all comment lists
      queryClient.invalidateQueries({ queryKey: commentKeys.lists() });
    },
  });
}

/**
 * Delete comment mutation
 */
export function useDeleteComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: number) => deleteComment(commentId),
    onSuccess: () => {
      // Invalidate all comment lists
      queryClient.invalidateQueries({ queryKey: commentKeys.lists() });
    },
  });
}

/**
 * Vote on comment mutation (upvote/downvote) with optimistic updates
 */
export function useVoteComment(articleSlug: string, page: number = 0) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ commentId, voteType }: { commentId: number; voteType: 'upvote' | 'downvote' }) => 
      voteComment(commentId, voteType),
    onMutate: async ({ commentId, voteType }: { commentId: number; voteType: 'upvote' | 'downvote' }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: commentKeys.list(articleSlug, page) });

      // Snapshot previous value
      const previousComments = queryClient.getQueryData(commentKeys.list(articleSlug, page));

      // Optimistically update
      queryClient.setQueryData(
        commentKeys.list(articleSlug, page),
        (old: any) => {
          if (!old) return old;
          
          return {
            ...old,
            content: old.content.map((comment: ArticleComment) => {
              if (comment.id === commentId) {
                const currentVote = comment.userVote;
                let newVotes = comment.votes;
                let newUserVote: 'upvote' | 'downvote' | null = voteType;

                // Calculate vote change
                if (currentVote === voteType) {
                  // Removing vote
                  newVotes = voteType === 'upvote' ? newVotes - 1 : newVotes + 1;
                  newUserVote = null;
                } else if (currentVote === null) {
                  // Adding new vote
                  newVotes = voteType === 'upvote' ? newVotes + 1 : newVotes - 1;
                } else {
                  // Changing vote
                  newVotes = voteType === 'upvote' ? newVotes + 2 : newVotes - 2;
                }

                return {
                  ...comment,
                  userVote: newUserVote,
                  votes: newVotes,
                };
              }
              return comment;
            }),
          };
        }
      );

      return { previousComments };
    },
    onError: (_err: any, _variables: any, context: any) => {
      // Roll back on error
      if (context?.previousComments) {
        queryClient.setQueryData(
          commentKeys.list(articleSlug, page),
          context.previousComments
        );
      }
    },
    onSettled: () => {
      // Always refetch after mutation
      queryClient.invalidateQueries({ queryKey: commentKeys.list(articleSlug, page) });
    },
  });
}
