import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { AccessTokenRepository } from './repositories/access-token.repository';
import { PrismaAccessTokenRepository } from './prisma/repositories/prisma-access-token.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: AccessTokenRepository,
      useClass: PrismaAccessTokenRepository,
    },
  ],
  exports: [PrismaService, AccessTokenRepository],
})
export class DatabaseModule { }
