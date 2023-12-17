import { Module } from '@nestjs/common';
import { NestCreateUserService } from './use-cases/nest-create-user.service';
import { CreateUserController } from './controllers/create-user.controller';
import { DatabaseModule } from 'src/database/database.module';
import { CryptographyModule } from 'src/cryptography/cryptography.module';
import { NestFindUserByEmailService } from './use-cases/nest-find-user-by-email.service';
import { FindUserController } from './controllers/find-user.controller';
import { ListUsersController } from './controllers/list-users-controller';
import { NestListUsersService } from './use-cases/nest-list-users.service';

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [CreateUserController, FindUserController, ListUsersController],
  providers: [
    NestCreateUserService,
    NestFindUserByEmailService,
    NestListUsersService,
  ],
})
export class TcpModule { }
