import { Module } from '@nestjs/common';
import { SessionController } from './controllers/session.controller';
import { CryptographyModule } from '@/cryptography/cryptography.module';
import { DatabaseModule } from '@/database/database.module';
import { NestAuthenticateUserUseCase } from './representations/use-cases/nest-authenticate-user.use-case';
import { CreateUserController } from './controllers/create-user.controller';
import { NestCreateUserUseCase } from './representations/use-cases/nest-create-user.use-case';

@Module({
  controllers: [SessionController, CreateUserController],
  imports: [CryptographyModule, DatabaseModule],
  providers: [NestAuthenticateUserUseCase, NestCreateUserUseCase],
})
export class HttpModule { }
