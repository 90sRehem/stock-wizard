import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvModule } from './env/env.module';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env/env';
import { DatabaseModule } from './database/database.module';
import { TcpModule } from './tcp/tcp.module';
import { CryptographyModule } from './cryptography/cryptography.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),

    EnvModule,
    DatabaseModule,
    TcpModule,
    CryptographyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
