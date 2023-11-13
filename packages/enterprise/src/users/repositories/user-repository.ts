import { User } from "../entities";

export abstract class UserRepository {
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findById(id: string): Promise<User | null>;
  abstract create(user: User): Promise<void>;
  abstract list(): Promise<User[]>;
  abstract remove(id: string): Promise<void>;
  abstract update(user: User): Promise<void>;
}