import { HashGenerator } from "@/cryptography";
import { UserRepository } from "../repositories";
import { Either, failure } from "@/core";
import { UserAlreadyExistsError } from "./errors";
import { User } from "../entities";
import { success } from "dist";
import { ValidationError } from "./errors/validation-erros";

type CreateUserUseCaseRequest = {
  name: string;
  email: string;
  password: string;
};

type CreateUserUseCaseResponse = Either<UserAlreadyExistsError, User>;

export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashGenerator: HashGenerator,
  ) { }
  async execute({ email, name, password }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const userAlreadyExists = await this.userRepository.findByEmail(email);

    if (userAlreadyExists) {
      return failure(new UserAlreadyExistsError(email));
    }

    const passwordHash = await this.hashGenerator.hash(password);

    const user = new User({
      name,
      email,
      password: passwordHash,
    });

    if (user.isInvalid()) {
      return failure(new ValidationError(user.notifications.map((notification) => notification.message)));
    }

    await this.userRepository.create(user);

    return success<UserAlreadyExistsError, User>(user)
  }
}