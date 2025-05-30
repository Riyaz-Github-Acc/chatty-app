import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

import { checkAuth, login, logout, signup, updateProfilePic } from '../services/auth.service'
import { useAuthUserStore } from '../store/useAuthStore';
import { useSocketStore } from '../store/useSocketStore';

export const useAuthenticatedUser = () => {
    const { authUser: authenticatedUser, setAuthUser } = useAuthUserStore();
    const { connectSocket } = useSocketStore();

    const {
        data,
        isLoading: isAuthLoading,
        isError: isAuthError,
        error: authError
    } = useQuery({
        queryKey: ['auth-user'],
        queryFn: checkAuth,
        retry: false,
        refetchOnWindowFocus: false,
        staleTime: 0,
        refetchOnMount: true,
        enabled: true
    });

    useEffect(() => {
        if (data?.record) {
            setAuthUser(data?.record);
            connectSocket();
        }
    }, [data, setAuthUser, connectSocket]);

    return { authenticatedUser, isAuthLoading, isAuthError, authError };
}

export const useSignupUser = () => {
    const queryClient = useQueryClient()
    const { connectSocket } = useSocketStore();

    return useMutation({
        mutationFn: signup,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['auth-user'] })
            toast.success('User registered successfully')
            connectSocket();
        },
        onError: (err: unknown) => {
            let errorMessage = 'Something went wrong during signup'

            if (err instanceof AxiosError) {
                errorMessage = err.response?.data?.message ?? errorMessage
            } else if (err instanceof Error) {
                errorMessage = err.message
            }

            toast.error(errorMessage)
            console.error('Signup error: ', err)
        }
    })
}

export const useLoginUser = () => {
    const queryClient = useQueryClient();
    const { connectSocket } = useSocketStore();

    return useMutation({
        mutationFn: login,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['auth-user'] })
            toast.success('User logged in successfully')
            connectSocket()
        },
        onError: (err: unknown) => {
            let errorMessage = 'Something went wrong during login'

            if (err instanceof AxiosError) {
                errorMessage = err.response?.data?.message ?? errorMessage
            } else if (err instanceof Error) {
                errorMessage = err.message
            }

            toast.error(errorMessage)
            console.error('Signup error: ', err)
        }
    })
}

export const useLogoutUser = () => {
    const queryClient = useQueryClient();
    const { disconnectSocket } = useSocketStore();

    return useMutation({
        mutationFn: logout,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['auth-user'] })
            queryClient.setQueryData(['auth-user'], null);
            toast.success('User logged out successfully');
            disconnectSocket();
        },
        onError: (err: unknown) => {
            let errorMessage = 'Something went wrong during logout'

            if (err instanceof AxiosError) {
                errorMessage = err.response?.data?.message ?? errorMessage
            } else if (err instanceof Error) {
                errorMessage = err.message
            }

            toast.error(errorMessage)
            console.error('Signup error: ', err)
        }
    })
}

export const useUpdateProfilePic = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateProfilePic,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['auth-user'] })
            toast.success('User profile picture updated successfully')
        },
        onError: (err: unknown) => {
            let errorMessage = 'Something went wrong during updating user profile picture'

            if (err instanceof AxiosError) {
                errorMessage = err.response?.data?.message ?? errorMessage
            } else if (err instanceof Error) {
                errorMessage = err.message
            }

            toast.error(errorMessage)
            console.error('Profile pic update error: ', err)
        }
    })
}