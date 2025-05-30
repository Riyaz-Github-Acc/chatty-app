import { zodResolver } from "@hookform/resolvers/zod";
import { Image, Send, X } from "lucide-react";
import { type ChangeEvent, type KeyboardEvent, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { usePostMessage } from "../hooks/useMessageHook";
import { useChatStore } from "../store/useChatStore";
import type { MessageFormProps } from "../types/message.type";
import { PostMessageSchema } from "../validators/message.validator";

const MessageInput = () => {
    const { selectedUser } = useChatStore();
    const messageMutation = usePostMessage(selectedUser?.id ?? "");

    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [sending, setSending] = useState(false)
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        watch,
        formState: { errors },
    } = useForm<MessageFormProps>({
        resolver: zodResolver(PostMessageSchema),
        defaultValues: {
            text: "",
            image: undefined,
        },
    });

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            toast.error("Please select an image file");
            return;
        }


        const reader = new FileReader();
        reader.onloadend = () => {
            if (typeof reader.result === "string") {
                setImagePreview(reader.result);
                setValue("image", reader.result);
            }
        };
        reader.readAsDataURL(file);
    };

    const removeImage = () => {
        setImagePreview(null);
        setValue("image", undefined);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const onSubmit = async (messageData: MessageFormProps) => {
        if (sending || !messageData.text?.trim() && !messageData.image) return;
        setSending(true)
        try {
            await messageMutation.mutateAsync({ messageData, receiverId: selectedUser?.id || '' })

            setImagePreview(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
            reset();
        } catch (error) {
            console.error("Failed to send message:", error);
        } finally {
            setSending(false)
        }
    };

    return (
        <div className="p-4 w-full">
            {imagePreview && (
                <div className="mb-3 flex items-center gap-2">
                    <div className="relative">
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
                        />
                        <button
                            onClick={removeImage}
                            className="cursor-pointer absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300 flex items-center justify-center"
                            type="button"
                        >
                            <X className="size-3" />
                        </button>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-2">
                <div className="flex-1 flex gap-2">
                    <input
                        type="text"
                        className="w-full input input-bordered rounded-lg input-sm sm:input-md"
                        placeholder="Type a message..."
                        {...register("text")}
                        onKeyDown={(e: KeyboardEvent) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSubmit(onSubmit)();
                            }
                        }}
                    />
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                    />
                    <button
                        type="button"
                        className={`hidden sm:flex btn btn-circle ${imagePreview ? "text-emerald-500" : "text-zinc-400"
                            }`}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <Image size={20} />
                    </button>
                </div>
                <button
                    type="submit"
                    className="btn btn-sm btn-circle"
                    disabled={sending || !watch("text")?.trim() && !watch("image")}
                >
                    <Send size={22} />
                </button>
            </form>

            {errors.image && (
                <p className="text-error text-sm mt-1">{errors.image.message}</p>
            )}
        </div>
    );
};

export default MessageInput;
