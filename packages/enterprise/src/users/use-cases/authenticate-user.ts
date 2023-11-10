import { Either, failure, success } from "@/core";
import { WrongCredentialsError } from "./errors/wrong-credentials-error";
import { UserRepository } from "../repositories/user-repository";
import { Encrypter, HashComparer } from "@/cryptography";

interface AuthenticateUserUseCaseRequest {
  email: string;
  password: string;
}

type AuthenticateUserUseCaseResponse = Either<WrongCredentialsError, { access_token: string }>;

export class AuthenticateUserUseCase {
  constructor(
    private readonly repository: UserRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
  ) { }

  async execute(request: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> {
    const user = await this.repository.findByEmail(request.email);
    if (!user) {
      return failure(new WrongCredentialsError());
    }
    const passwordIsValid = await this.hashComparer.compare(request.password, user.password);

    if (!passwordIsValid) {
      return failure(new WrongCredentialsError());
    }

    const access_token = await this.encrypter.encrypt({ sub: user.id.toString() });

    return success({ access_token });
  }
}