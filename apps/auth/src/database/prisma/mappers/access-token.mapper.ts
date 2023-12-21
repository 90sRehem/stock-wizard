import { AccessToken } from '@/database/entities/access-token.entity';
import { Prisma, AccessToken as PrismaAccessToken } from '@prisma/client';
import { Guid } from 'enterprise';

export class PrismaAccessTokenMapper {
  static toDomain(raw: PrismaAccessToken): AccessToken {
    return new AccessToken(raw, new Guid(raw.id));
  }

  static toPersistence(
    accessToken: AccessToken,
  ): Prisma.AccessTokenUncheckedCreateInput {
    return {
      id: accessToken.id.toString(),
      token: accessToken.token,
      userId: accessToken.userId,
    };
  }
}
