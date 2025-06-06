import { create } from "zustand";

export interface ThemeStoreProps {
    theme: string,
    setTheme: (theme: string) => void
}

export const useThemeStore = create<ThemeStoreProps>((set) => ({
    theme: localStorage.getItem("chat-theme") || 'coffee',
    setTheme: (theme) => {
        localStorage.setItem("chat-theme", theme);
        set({ theme });
    },
}));
