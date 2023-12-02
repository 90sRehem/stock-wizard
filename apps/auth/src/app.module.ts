import { Module } from '@nestjs/common';
import { EnvModule } from './env/env.module';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env/env-schema';
import { JwtStrategy } from './services/jwt-strategy.service';
import { EnvService } from './env/env.service';
import { APP_GUARD } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Encrypter, HashComparer, HashGenerator } from 'enterprise';
import { BCryptHasher } from './services/bcrypt-hasher.service';
import { JwtEncrypter } from './services/jwt-encrypter.service';
import { SessionController } from './controllers/session.controller';
import { AppService } from '@/services/app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (envConfig) => envSchema.parse(envConfig),
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      imports: [EnvModule],
      inject: [EnvService],
      global: true,
      useFactory: async (env: EnvService) => {
        const privateKey = env.get('JWT_PRIVATE_KEY');
        const publicKey = env.get('JWT_PUBLIC_KEY');

        return {
          privateKey: Buffer.from(privateKey, 'base64'),
          publicKey: Buffer.from(publicKey, 'base64'),
          signOptions: {
            algorithm: 'RS256',
            expiresIn: '1d',
          },
        };
      },
    }),
    ClientsModule.register([
      {
        name: 'USER_CLIENT',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3010,
        },
      },
    ]),
    EnvModule,
    PassportModule,
  ],
  providers: [
    JwtStrategy,
    EnvService,
    AppService,
    { provide: APP_GUARD, useClass: JwtStrategy },
    { provide: Encrypter, useClass: JwtEncrypter },
    { provide: HashGenerator, useClass: BCryptHasher },
    { provide: HashComparer, useClass: BCryptHasher },
  ],
  controllers: [SessionController],
})
export class AppModule {}
