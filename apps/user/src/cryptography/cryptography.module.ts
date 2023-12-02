import { Module } from '@nestjs/common';
import { BcryptHasherService } from './bcrypt-hasher.service';
import { HashComparer, HashGenerator } from 'enterprise';

@Module({
  providers: [
    {
      provide: HashGenerator,
      useClass: BcryptHasherService,
    },
    {
      provide: HashComparer,
      useClass: BcryptHasherService,
    },
  ],
  exports: [HashGenerator, HashComparer],
})
export class CryptographyModule { }
