import { create } from "zustand";

import type { AuthUserProps } from "../types/auth.type";

export interface AuthStoreProps {
    authUser: AuthUserProps | null;
    setAuthUser: (authUser: AuthUserProps) => void;
    logout: () => void;
}

export const useAuthUserStore = create<AuthStoreProps>((set) => ({
    authUser: null,
    setAuthUser: (authUser) => set({ authUser }),
    logout: () => set({ authUser: null }),
}))