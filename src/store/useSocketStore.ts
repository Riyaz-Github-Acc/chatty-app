import { io, Socket } from "socket.io-client";
import { create } from "zustand";

import { useAuthUserStore } from "./useAuthStore";
import { useChatStore } from "./useChatStore";

const BaseApiUrl = import.meta.env.MODE === 'production' ? '/' : 'http://localhost:5001'

export interface SocketStoreProps {
    socket: Socket | null;
    connectSocket: () => void;
    disconnectSocket: () => void;
}

export const useSocketStore = create<SocketStoreProps>((set, get) => ({
    socket: null,

    connectSocket: () => {
        const { authUser } = useAuthUserStore.getState();
        const { socket } = get();

        if (!authUser || socket?.connected) return;

        const newSocket = io(BaseApiUrl, {
            query: { userId: authUser?.id },
        });

        newSocket?.on('onlineUsers', (userIds) => {
            useChatStore.setState({ onlineUsers: userIds })
        });

        set({ socket: newSocket });
    },
    disconnectSocket: () => {
        const { socket } = get();
        if (socket?.connected) socket?.disconnect();
    }
}))