import { Guid, User } from 'enterprise';
import { User as PrismaUser, Prisma } from '@prisma/client';

export class PrismaUserMapper {
  static toDomain(raw: PrismaUser): User {
    return new User(
      {
        email: raw.email,
        name: raw.name,
        password: raw.password,
      },
      new Guid(raw.id),
    );
  }

  static toPersistence(user: User): Prisma.UserUncheckedCreateInput {
    return {
      id: user.id.toString(),
      email: user.email,
      name: user.name,
      password: user.password,
    };
  }
}
