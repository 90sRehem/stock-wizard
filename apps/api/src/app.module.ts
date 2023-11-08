import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvModule } from './env/env.module';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env/env';
import { DatabaseModule } from './database/database.module';
import { PrismaService } from './database/prisma/prisma.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    EnvModule,
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    DatabaseModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule { }
