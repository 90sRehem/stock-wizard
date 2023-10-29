import { api } from "@/lib/wretch";

export type LoginProps = {
  email: string;
  password: string;
};

export type User = {
  name: string;
  email: string;
  password: string;
};

export async function login({ email, password }: LoginProps): Promise<User> {
  const users = (await api.get(`/users?${email}`)) as User[];
  const foundUser = users.find((user) => user.email === email);

  if (!foundUser) {
    throw new Error("User not found");
  }

  // if (foundUser.password !== password) {
  //   throw new Error("Invalid password");
  // }

  return users[0];
}
