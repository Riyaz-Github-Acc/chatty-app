import { create } from "zustand";

import type { AuthUserProps } from "../types/auth.type";
import type { MessageDetailsProps } from "../types/message.type";
import { useSocketStore } from "./useSocketStore";

export interface ChatStoreProps {
    selectedUser: AuthUserProps | null,
    setSelectedUser: (selectedUser: AuthUserProps | null) => void,

    onlineUsers: string[]
    messages: MessageDetailsProps[]

    subscribeToMessages: () => void
    unsubscribeToMessages: () => void
}

export const useChatStore = create<ChatStoreProps>((set, get) => ({
    selectedUser: null,
    setSelectedUser: (selectedUser) => set({ selectedUser }),

    onlineUsers: [],
    messages: [],

    subscribeToMessages: () => {
        const { socket } = useSocketStore.getState();

        socket?.on('newMessage', (newMessage: MessageDetailsProps) => {
            const { messages, selectedUser } = get();

            const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser?.id
            console.log(selectedUser, 'selected_user')
            if (!isMessageSentFromSelectedUser) return;

            set({ messages: [...messages, newMessage] })
        });
    },

    unsubscribeToMessages: () => {
        const { socket } = useSocketStore.getState();
        socket?.off('newMessage');
    }
})); 