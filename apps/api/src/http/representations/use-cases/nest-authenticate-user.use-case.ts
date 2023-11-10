import {
  AuthenticateUserUseCase,
  Encrypter,
  HashComparer,
  UserRepository,
} from 'enterprise';

export class NestAuthenticateUserUseCase extends AuthenticateUserUseCase {
  constructor(
    userRepository: UserRepository,
    hashComparer: HashComparer,
    encrypter: Encrypter,
  ) {
    super(userRepository, hashComparer, encrypter);
  }
}
