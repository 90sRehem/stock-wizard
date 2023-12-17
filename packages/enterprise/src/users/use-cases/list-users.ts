import { Either, success, failure } from "@/core";
import { UserRepository } from "../repositories";
import { User } from "../entities";

type ListUsersUseCaseResponse = Promise<User[]>

export class ListUsersUseCase {
  constructor(private readonly userRepository: UserRepository) { }

  async execute(): ListUsersUseCaseResponse {
    const users = await this.userRepository.list();

    return users;
  }
}