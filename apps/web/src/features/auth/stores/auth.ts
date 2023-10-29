import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { LoginProps, User, login } from "../api/login";

type State = {
  isAuthenticated: boolean;
  user: User | null;
};

type Action = {
  login: (props: LoginProps) => Promise<void>;
  logout: () => Promise<void>;
};

type AuthStore = State & Action;

export const authStore = create(
  persist<AuthStore>(
    (set) => ({
      isAuthenticated: false,
      user: null,
      login: async (props) => {
        const user = await login(props);
        set({ isAuthenticated: true, user });
      },
      logout: async () => {
        set({ isAuthenticated: false, user: null });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export const useAuth = <T>(selector: (state: AuthStore) => T): T => {
  const state = authStore.getState();
  return selector(state);
};
