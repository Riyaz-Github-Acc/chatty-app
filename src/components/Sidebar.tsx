import { Users } from "lucide-react"
import { useState } from "react";

import { useGetUsers } from "../hooks/useMessageHook";
import { useChatStore } from "../store/useChatStore"
import SidebarSkeleton from './skeletons/SidebarSkeleton'

const Sidebar = () => {
    const { users, isUsersLoading } = useGetUsers();
    const { selectedUser, setSelectedUser, onlineUsers } = useChatStore();

    const [showOnlyOnline, setShowOnlyOnline] = useState(false);

    const filteredUsers = showOnlyOnline ? users?.filter((user) => onlineUsers.includes(user.id)) : users;

    if (isUsersLoading) return <SidebarSkeleton />;

    return (
        <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
            <div className="border-b border-base-300 w-full p-5">
                <div className="flex items-center gap-2">
                    <Users className="size-6" />
                    <span className="font-medium hidden lg:block">Contacts</span>
                </div>

                <div className="mt-3 hidden lg:flex items-center gap-2">
                    <div className="hidden lg:block text-left min-w-0">
                        <label className="cursor-pointer flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={showOnlyOnline}
                                onChange={(e) => setShowOnlyOnline(e.target.checked)}
                                className="checkbox checkbox-sm"
                            />
                            <span className="text-sm">Show online only</span>
                        </label>
                    </div>
                    <span className="text-xs text-zinc-500">({onlineUsers.length - 1} online)</span>
                </div>
            </div>

            <div className="overflow-y-auto w-full py-3">
                {filteredUsers?.map((user) => (
                    <button
                        key={user.id}
                        onClick={() => setSelectedUser(user)}
                        className={`
                            w-full p-3 flex items-center gap-3
                            hover:bg-base-300 transition-colors cursor-pointer
                            ${selectedUser?.id === user.id ? "bg-base-300 ring-1 ring-base-300" : ""}`}
                    >
                        <div className="relative mx-auto lg:mx-0">
                            <img
                                src={user.profilePic || "/avatar.png"}
                                alt={user.username}
                                className="size-12 object-cover rounded-full"
                            />

                            {onlineUsers.includes(user.id) &&
                                <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900" />
                            }
                        </div>

                        <div className="font-medium truncate">{user.username}</div>
                    </button>
                ))}
            </div>
        </aside>
    )
}

export default Sidebar