import { create } from "zustand";

export const useLanguageStore = create((set) => ({
  isLanguageES:
    localStorage.getItem("LanguageES") === null
      ? true
      : localStorage.getItem("LanguageES") === "true",

  toggleIsLanguageES: () =>
    set((state) => {
      const changeLanguage = !state.isLanguageES;
      localStorage.setItem("LanguageES", changeLanguage);
      return { isLanguageES: changeLanguage };
    }),
}));
