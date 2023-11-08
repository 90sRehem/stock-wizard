import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { EnvModule } from 'src/env/env.module';
import { EnvService } from 'src/env/env.service';
import { JwtStrategy } from './jwt.strategy';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    PassportModule,
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
  ],
  controllers: [],
  providers: [
    JwtStrategy,
    EnvService,
    {
      provide: APP_GUARD,
      useClass: JwtStrategy,
    },
  ],
  exports: [],
})
export class AuthModule { }
