import { Injectable } from '@nestjs/common';
import { ListUsersUseCase, UserRepository } from 'enterprise';

@Injectable()
export class NestListUsersService extends ListUsersUseCase {
  constructor(userRepository: UserRepository) {
    super(userRepository);
  }
}
