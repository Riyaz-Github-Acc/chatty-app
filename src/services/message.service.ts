import { axiosInstance } from "../lib/axios"
import type { MessageFormProps } from "../types/message.type";

export const getMessages = async ({ chatUserId }: { chatUserId: string }) => {
    const res = await axiosInstance.get(`/messages/${chatUserId}`);
    return res.data;
}

export const getUsers = async () => {
    const res = await axiosInstance.get(`/messages/users/`);
    return res.data;
}

export const postMessage = async ({ messageData, receiverId }: { messageData: MessageFormProps, receiverId: string }) => {
    const res = await axiosInstance.post(`/messages/${receiverId}`, { ...messageData });
    return res.data;
}