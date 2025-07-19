import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme:
    typeof window !== "undefined"
      ? localStorage.getItem("heylo-theme") || "forest"
      : "forest",
  setTheme: (theme) => {
    set({ theme });
    if (typeof window !== "undefined") {
      localStorage.setItem("heylo-theme", theme);
    }
  },
}));
