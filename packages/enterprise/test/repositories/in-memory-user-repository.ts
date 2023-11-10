import { User } from "@/users";
import { UserRepository } from "@/users/repositories/user-repository";

export class inMemoryUserRepository implements UserRepository {
  public readonly users: User[] = [];
  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email);
    if (!user) {
      return null;
    }
    return user;
  }
  async create(user: User): Promise<void> {
    this.users.push(user);
  }
}