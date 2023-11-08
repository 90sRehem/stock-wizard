import { Module } from '@nestjs/common';
import { EnvService } from './env.service';

@Module({
  providers: [EnvService],
  exports: [EnvModule],
})
export class EnvModule { }
