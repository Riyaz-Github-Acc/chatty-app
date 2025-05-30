import { useEffect, useRef } from "react";

import { useGetMessages } from "../hooks/useMessageHook";
import { useAuthUserStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import type { MessageDetailsProps } from "../types/message.type";
import { formatMessageTime } from "../utils/formatMessageTime";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";

const ChatContainer = () => {
    const { authUser } = useAuthUserStore()
    const { selectedUser } = useChatStore()
    const { messages, isMessagesLoading } = useGetMessages(selectedUser?.id as string)

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        if (messages?.length) {
            scrollToBottom()
        }
    }, [messages])

    if (isMessagesLoading) {
        return (
            <div className="flex-1 flex flex-col overflow-auto">
                <ChatHeader />
                <MessageSkeleton />
                <MessageInput />
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col overflow-auto">
            <ChatHeader />

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages?.map((message: MessageDetailsProps) => (
                    <div
                        key={message.id}
                        className={`chat ${message.senderId === authUser?.id ? "chat-end" : "chat-start"}`}
                        ref={messagesEndRef}
                    >
                        <div className=" chat-image avatar">
                            <div className="size-10 rounded-full border">
                                <img
                                    src={
                                        message.senderId === authUser?.id
                                            ? authUser.profilePic || "/avatar.png"
                                            : selectedUser?.profilePic || "/avatar.png"
                                    }
                                    alt="profile pic"
                                />
                            </div>
                        </div>

                        <div className="chat-header mb-1">
                            <time className="text-xs opacity-50 ml-1">
                                {formatMessageTime(message.createdAt)}
                            </time>
                        </div>
                        <div className="chat-bubble flex flex-col">
                            {message.image && (
                                <img
                                    src={message.image}
                                    alt="Attachment"
                                    className="sm:max-w-[200px] rounded-md mb-2"
                                />
                            )}
                            {message.text && <p>{message.text}</p>}
                        </div>
                    </div>
                ))}
            </div >

            <MessageInput />
        </div >
    )
}

export default ChatContainer;