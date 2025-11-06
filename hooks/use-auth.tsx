// Auth hooks using TanStack Query
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import * as authApi from '@/lib/auth-api'

// ==========================================
// MUTATION HOOKS
// ==========================================

/**
 * Hook for user registration
 */
export function useRegister() {
  const router = useRouter()
  
  return useMutation({
    mutationFn: authApi.register,
    onSuccess: (data, variables) => {
      // Store email for OTP verification
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('pendingVerificationEmail', variables.email)
      }
      // Redirect to OTP page
      router.push('/auth/otp')
    },
  })
}

/**
 * Hook for OTP verification
 */
export function useVerifyOtp() {
  const router = useRouter()
  
  return useMutation({
    mutationFn: authApi.verifyOtp,
    onSuccess: () => {
      // Clear pending email
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('pendingVerificationEmail')
      }
      // Redirect to login
      router.push('/auth/login')
    },
  })
}

/**
 * Hook for user login
 */
export function useLogin() {
  const router = useRouter()
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: authApi.login,
    onSuccess: () => {
      // Invalidate user query to refetch user data
      queryClient.invalidateQueries({ queryKey: ['currentUser'] })
      // Redirect to home
      router.push('/')
    },
  })
}

/**
 * Hook for forgot password
 */
export function useForgotPassword() {
  return useMutation({
    mutationFn: authApi.forgotPassword,
  })
}

/**
 * Hook for reset password
 */
export function useResetPassword() {
  const router = useRouter()
  
  return useMutation({
    mutationFn: authApi.resetPassword,
    onSuccess: () => {
      // Redirect to login
      router.push('/auth/login')
    },
  })
}

/**
 * Hook for logout
 */
export function useLogout() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async () => {
      authApi.logout()
    },
    onSuccess: () => {
      // Clear all queries
      queryClient.clear()
    },
  })
}

// ==========================================
// QUERY HOOKS
// ==========================================

/**
 * Hook to get current user
 */
export function useCurrentUser() {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: authApi.getCurrentUser,
    enabled: authApi.isAuthenticated(),
    retry: false,
  })
}

/**
 * Hook to check if user is authenticated
 */
export function useAuth() {
  const { data: user, isLoading, error } = useCurrentUser()
  
  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    error,
  }
}
