// User Management hooks using TanStack Query
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import * as userApi from '@/lib/user-api'

// ==========================================
// QUERY HOOKS
// ==========================================

/**
 * Hook to get current user profile
 */
export function useCurrentUserProfile() {
  return useQuery({
    queryKey: ['userProfile'],
    queryFn: userApi.getCurrentUserProfile,
    enabled: typeof window !== 'undefined' && !!localStorage.getItem('accessToken'),
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook to get user by username
 */
export function useUserByUsername(username: string) {
  return useQuery({
    queryKey: ['user', username],
    queryFn: () => userApi.getUserByUsername(username),
    enabled: !!username,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

/**
 * Hook to get users list
 */
export function useUsers(params: {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: 'reputation' | 'followers' | 'posts';
}) {
  return useQuery({
    queryKey: ['users', params],
    queryFn: () => userApi.getUsers(params),
    staleTime: 1 * 60 * 1000, // 1 minute
  });
}

/**
 * Hook to get user statistics
 */
export function useUserStats(userUuid: string) {
  return useQuery({
    queryKey: ['userStats', userUuid],
    queryFn: () => userApi.getUserStats(userUuid),
    enabled: !!userUuid,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

/**
 * Hook to get user's followers
 */
export function useUserFollowers(userUuid: string, params: { page?: number; limit?: number }) {
  return useQuery({
    queryKey: ['userFollowers', userUuid, params],
    queryFn: () => userApi.getUserFollowers(userUuid, params),
    enabled: !!userUuid,
    staleTime: 1 * 60 * 1000, // 1 minute
  });
}

/**
 * Hook to get user's following
 */
export function useUserFollowing(userUuid: string, params: { page?: number; limit?: number }) {
  return useQuery({
    queryKey: ['userFollowing', userUuid, params],
    queryFn: () => userApi.getUserFollowing(userUuid, params),
    enabled: !!userUuid,
    staleTime: 1 * 60 * 1000, // 1 minute
  });
}

// ==========================================
// MUTATION HOOKS
// ==========================================

/**
 * Hook to update user profile
 */
export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userApi.updateUserProfile,
    onSuccess: (updatedUser) => {
      // Invalidate and refetch user profile queries
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      queryClient.invalidateQueries({ queryKey: ['user', updatedUser.username] });
      console.log('Profile updated successfully:', updatedUser);
    },
    onError: (error: Error) => {
      console.error('Profile update failed:', error);
    },
  });
}

/**
 * Hook to follow/unfollow user
 */
export function useToggleFollow() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userUuid: string) => userApi.toggleFollowUser(userUuid),
    onSuccess: (data, userUuid) => {
      console.log('Follow toggle successful:', data);
      // Invalidate queries to refetch updated counts
      queryClient.invalidateQueries({ queryKey: ['user'] });
      queryClient.invalidateQueries({ queryKey: ['userFollowers', userUuid] });
      queryClient.invalidateQueries({ queryKey: ['userFollowing'] });
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    },
    onError: (error: Error) => {
      console.error('Follow toggle failed:', error);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      // You could show a toast notification here
      alert(`Failed to update follow status: ${error.message}`);
    },
  });
}
