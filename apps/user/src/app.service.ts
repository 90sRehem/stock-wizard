import { Injectable } from '@nestjs/common';
import { UserRepository } from 'enterprise';

@Injectable()
export class AppService {
  constructor(private readonly userRepository: UserRepository) { }
  getHello(): string {
    return 'Hello World!';
  }

  async listUsers() {
    const users = await this.userRepository.list();

    const mappedUsers = users.map((user) => ({
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }));
    console.log(
      '🚀 ~ file: app.service.ts:25 ~ AppService ~ listUsers ~ mappedUsers:',
      mappedUsers,
    );
    return mappedUsers;
  }
}
