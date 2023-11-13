import { Injectable } from '@nestjs/common';
import {
  AuthenticateUserUseCase,
  Encrypter,
  HashComparer,
  UserRepository,
} from 'enterprise';

@Injectable()
export class NestAuthenticateUserUseCase extends AuthenticateUserUseCase {
  constructor(
    userRepository: UserRepository,
    hashComparer: HashComparer,
    encrypter: Encrypter,
  ) {
    super(userRepository, hashComparer, encrypter);
  }
}
