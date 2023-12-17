import { Injectable } from '@nestjs/common';
import { FindUserByEmailUseCase, UserRepository } from 'enterprise';

@Injectable()
export class NestFindUserByEmailService extends FindUserByEmailUseCase {
  constructor(userRepository: UserRepository) {
    super(userRepository);
  }
}
