import { MutationConfig } from "@/lib";
import { api } from "@/lib/wretch";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "..";
import { useNavigate } from "react-router-dom";
import { Credentials, User } from "./types";

export async function login({ email }: Credentials): Promise<User> {
  const user = await api.get(`/users?email=${email}`).res<User[]>((res) => {
    return res.json();
  });

  if (!user[0]) {
    throw new Error("User not found");
  }

  return user[0];
}

type UseLoginConfig = {
  config?: MutationConfig<typeof login>;
};

export function useLogin({ config }: UseLoginConfig = {}) {
  const setUser = useAuthStore((state) => state.setUser);

  const navigate = useNavigate();
  return useMutation({
    mutationFn: login,
    mutationKey: ["user"],
    onSuccess: (user) => {
      setUser(user);
      navigate("/app");
    },

    ...config,
  });
}
