import { PrismaUserMapper } from '@/database/mappers/prisma-user-mapper';
import { PrismaService } from '@/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { UserFactory, UserProps } from 'enterprise';

@Injectable()
export class NestUserFactory extends UserFactory {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async makePrismaUser(overrides: Partial<UserProps> = {}) {
    const user = UserFactory.make(overrides);

    await this.prisma.user.create({
      data: PrismaUserMapper.toPersistence(user),
    });

    return user;
  }
}
