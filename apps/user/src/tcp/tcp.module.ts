import { Module } from '@nestjs/common';
import { NestCreateUserService } from './use-cases/nest-create-user.service';
import { CreateUserController } from './controllers/create-user-controller.controller';
import { DatabaseModule } from 'src/database/database.module';
import { CryptographyModule } from 'src/cryptography/cryptography.module';

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [CreateUserController],
  providers: [NestCreateUserService],
})
export class TcpModule { }
