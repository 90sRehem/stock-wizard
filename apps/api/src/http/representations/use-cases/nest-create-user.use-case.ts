import { Injectable } from '@nestjs/common';
import { CreateUserUseCase, HashGenerator, UserRepository } from 'enterprise';

@Injectable()
export class NestCreateUserUseCase extends CreateUserUseCase {
  constructor(userRepository: UserRepository, hashGenerator: HashGenerator) {
    super(userRepository, hashGenerator);
  }
}
