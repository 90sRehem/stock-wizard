import { QueryConfig, api } from "@/lib";
import { useQuery } from "@tanstack/react-query";
import { User, Credentials } from "./types";

async function getUser({ email }: Credentials) {
  const user = await api.get(`/users?email=${email}`).res<User[]>((res) => {
    return res.json();
  });

  if (!user[0]) {
    throw new Error("User not found");
  }

  return user[0];
}

type UseUserConfig = {
  config?: QueryConfig<typeof getUser>;
};

function getUserConfig({ email, password }: Credentials) {
  return {
    queryFn: getUser,
    queryKey: ["user", { email, password }],
  };
}

export function useUser({ config }: UseUserConfig = {}) {
  return useQuery({
    queryFn: getUser,
    queryKey: ["user"],
    ...config,
  });
}
