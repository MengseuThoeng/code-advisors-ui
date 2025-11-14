import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '@/lib/admin-api';
import { toast } from 'sonner';

/**
 * Hook to verify if current user is admin
 */
export const useAdminVerify = () => {
  return useQuery({
    queryKey: ['admin', 'verify'],
    queryFn: adminApi.verify,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 5 * 60 * 1000,
  });
};

/**
 * Hook to get platform overview statistics
 */
export const useOverviewStats = () => {
  return useQuery({
    queryKey: ['admin', 'stats', 'overview'],
    queryFn: adminApi.getOverviewStats,
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};

/**
 * Hook to get user growth statistics
 */
export const useUserStats = (period: '7d' | '30d' | '90d' | '1y' = '30d') => {
  return useQuery({
    queryKey: ['admin', 'stats', 'users', period],
    queryFn: () => adminApi.getUserStats(period),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

/**
 * Hook to get content statistics
 */
export const useContentStats = () => {
  return useQuery({
    queryKey: ['admin', 'stats', 'content'],
    queryFn: adminApi.getContentStats,
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};

/**
 * Hook to get engagement statistics
 */
export const useEngagementStats = () => {
  return useQuery({
    queryKey: ['admin', 'stats', 'engagement'],
    queryFn: adminApi.getEngagementStats,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

/**
 * Hook to get users list with filters
 */
export const useAdminUsers = (params?: {
  page?: number;
  size?: number;
  role?: string;
  status?: string;
  search?: string;
  sortBy?: string;
}) => {
  return useQuery({
    queryKey: ['admin', 'users', params],
    queryFn: () => adminApi.getUsers(params),
    staleTime: 30 * 1000, // 30 seconds
  });
};

/**
 * Hook to ban a user
 */
export const useBanUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ userUuid, reason }: { userUuid: string; reason?: string }) => 
      adminApi.banUser(userUuid, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'stats'] });
      toast.success('User banned successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to ban user');
    },
  });
};

/**
 * Hook to unban a user
 */
export const useUnbanUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (userUuid: string) => adminApi.unbanUser(userUuid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'stats'] });
      toast.success('User unbanned successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to unban user');
    },
  });
};
