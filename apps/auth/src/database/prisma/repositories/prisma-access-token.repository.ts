import { AccessToken } from '@/database/entities/access-token.entity';
import { AccessTokenRepository } from '@/database/repositories/access-token.repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  CreateAccessTokenDTO,
  FindOneAccessTokenDTO,
  DeleteAccessTokenDTO,
  FindAccessTokenByUserIdDTO,
  FindAccessTokenById,
} from '@/database/dtos';
import { PrismaAccessTokenMapper } from '../mappers/access-token.mapper';

@Injectable()
export class PrismaAccessTokenRepository implements AccessTokenRepository {
  constructor(private readonly prismaService: PrismaService) { }
  async create(data: CreateAccessTokenDTO): Promise<AccessToken> {
    const accessToken = await this.prismaService.accessToken.create({
      data: {
        token: data.token,
        userId: data.userId,
      },
    });
    return PrismaAccessTokenMapper.toDomain(accessToken);
  }
  async findOne(data: FindOneAccessTokenDTO): Promise<AccessToken | null> {
    const accessToken = await this.prismaService.accessToken.findUnique({
      where: {
        token: data.token,
      },
    });
    if (!accessToken) {
      return null;
    }

    return PrismaAccessTokenMapper.toDomain(accessToken);
  }
  async delete(data: DeleteAccessTokenDTO): Promise<void> {
    await this.prismaService.accessToken.delete({
      where: {
        token: data.token,
      },
    });
  }
  async findByUserId({
    userId,
  }: FindAccessTokenByUserIdDTO): Promise<AccessToken | null> {
    const accessToken = await this.prismaService.accessToken.findFirst({
      where: {
        userId,
      },
    });

    if (!accessToken) {
      return null;
    }

    return PrismaAccessTokenMapper.toDomain(accessToken);
  }
  async findById(data: FindAccessTokenById): Promise<AccessToken | null> {
    const accessToken = await this.prismaService.accessToken.findUnique({
      where: {
        id: data.id,
      },
    });

    if (!accessToken) {
      return null;
    }

    return PrismaAccessTokenMapper.toDomain(accessToken);
  }
}
