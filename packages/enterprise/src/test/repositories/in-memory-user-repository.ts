import { User } from "@/users";
import { UserRepository } from "@/users/repositories/user-repository";

export class InMemoryUserRepository implements UserRepository {
  public readonly users: User[] = [];

  async findById(id: string): Promise<User | null> {
    const user = this.users.find((user) => user.id.toString() === id);
    if (!user) {
      return null;
    }
    return user;
  }
  async list(): Promise<User[]> {
    const users = this.users;
    return users;
  }
  async remove(id: string): Promise<void> {
    const user = this.users.find((user) => user.id.toString() === id);

    if (user) {
      this.users.splice(this.users.indexOf(user), 1);
    }
  }
  async update(user: User): Promise<void> {
    const index = this.users.findIndex((u) => u.id.toString() === user.id.toString());
    this.users[index] = user;
  }
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