import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { User } from "../api/types";

type State = {
  isAuthenticated: boolean;
  user: User | null;
};

type Action = {
  setUser: (user: User) => void;
  removeUser: () => void;
};

type AuthStore = State & Action;

export const authStore = create(
  persist<AuthStore>(
    (set) => ({
      isAuthenticated: false,
      user: null,
      setUser(user) {
        set({ isAuthenticated: true, user });
      },
      removeUser() {
        set({ isAuthenticated: false, user: null });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export const useAuthStore = <T>(selector: (state: AuthStore) => T): T => {
  const state = authStore.getState();
  return selector(state);
};
