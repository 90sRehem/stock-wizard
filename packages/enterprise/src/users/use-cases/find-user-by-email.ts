import { Either, failure, success } from "@/core";
import { UserRepository } from "../repositories";
import { User } from "../entities";
import { UserNotFoundError } from "./errors";

export type FindUserByEmailUseCaseRequest = {
  email: string;
};

export type FindUserByEmailUseCaseResponse = Either<UserNotFoundError, User>;

export class FindUserByEmailUseCase {
  constructor(private readonly userRepository: UserRepository) {
  }
  async execute({ email }: FindUserByEmailUseCaseRequest): Promise<FindUserByEmailUseCaseResponse> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      return failure(new UserNotFoundError());
    }
    return success(user);
  }
}