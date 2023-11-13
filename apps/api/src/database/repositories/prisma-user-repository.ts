import { Injectable } from '@nestjs/common';
import { User, UserRepository } from 'enterprise';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaUserMapper } from '../mappers/prisma-user-mapper';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prismaService: PrismaService) { }
  async findById(id: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return null;
    }

    return PrismaUserMapper.toDomain(user);
  }
  async remove(id: string): Promise<void> {
    await this.prismaService.user.delete({
      where: {
        id,
      },
    });
  }
  async update(user: User): Promise<void> {
    const data = PrismaUserMapper.toPersistence(user);

    await this.prismaService.user.update({
      where: {
        id: user.id.toString(),
      },
      data,
    });
  }
  async findByEmail(email: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }

    return PrismaUserMapper.toDomain(user);
  }
  async create(user: User): Promise<void> {
    const data = PrismaUserMapper.toPersistence(user);

    await this.prismaService.user.create({
      data,
    });
  }

  async list(): Promise<User[]> {
    const users = await this.prismaService.user.findMany();

    return users.map((user) => PrismaUserMapper.toDomain(user));
  }
}
