import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";

import { getMessages, getUsers, postMessage } from "../services/message.service"
import { useChatStore } from "../store/useChatStore";
import type { UserResProps } from "../types/auth.type";
import type { MessageResProps } from "../types/message.type";

export const useGetMessages = (chatUserId: string) => {
    const { messages, subscribeToMessages, unsubscribeToMessages } = useChatStore();

    const {
        data,
        isLoading: isMessagesLoading,
        isError: isMessagesError
    } = useQuery<MessageResProps>({
        queryKey: [`messages-${chatUserId}`],
        queryFn: () => getMessages({ chatUserId }),
        refetchOnWindowFocus: false,
        enabled: !!chatUserId
    });

    useEffect(() => {
        if (data?.record) {
            useChatStore.setState({ messages: data.record });
        }
    }, [data]);


    useEffect(() => {
        subscribeToMessages();
        return () => unsubscribeToMessages();
    }, [subscribeToMessages, unsubscribeToMessages])

    return { messages, isMessagesError, isMessagesLoading };
}

export const useGetUsers = () => {
    const {
        data,
        isLoading: isUsersLoading,
        isError: isUsersError
    } = useQuery<UserResProps>({
        queryKey: ['users'],
        queryFn: getUsers,
    });

    return { users: data?.record, isUsersError, isUsersLoading };
}

export const usePostMessage = (receiverId: string) => {
    const queryClient = useQueryClient();
    const { messages } = useChatStore();

    return useMutation({
        mutationFn: postMessage,
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: [`messages-${receiverId}`] })
            toast.success('Message sent successfully')
            useChatStore.setState({ messages: [...messages, data?.record] })
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