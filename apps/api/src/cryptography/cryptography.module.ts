import { Module } from '@nestjs/common';
import { JwtEncrypter } from './jwt-encrypter';
import { BCryptHasher } from './bcrypt-hasher';
import { Encrypter, HashComparer, HashGenerator } from 'enterprise';

@Module({
  providers: [
    {
      provide: Encrypter,
      useClass: JwtEncrypter,
    },
    {
      provide: HashGenerator,
      useClass: BCryptHasher,
    },
    {
      provide: HashComparer,
      useClass: BCryptHasher,
    },
  ],
  exports: [Encrypter, HashGenerator, HashComparer],
})
export class CryptographyModule { }
