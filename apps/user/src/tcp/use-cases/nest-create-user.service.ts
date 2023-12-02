import { Injectable } from '@nestjs/common';
import { CreateUserUseCase, HashGenerator, UserRepository } from 'enterprise';

@Injectable()
export class NestCreateUserService extends CreateUserUseCase {
  constructor(userRepository: UserRepository, hashGenerator: HashGenerator) {
    super(userRepository, hashGenerator);
  }
}
