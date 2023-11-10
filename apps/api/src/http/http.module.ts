import { Module } from '@nestjs/common';
import { SessionController } from './controllers/session.controller';
import { CryptographyModule } from '@/cryptography/cryptography.module';
import { DatabaseModule } from '@/database/database.module';
import { NestAuthenticateUserUseCase } from './representations/use-cases/nest-authenticate-user.use-case';

@Module({
  controllers: [SessionController],
  imports: [CryptographyModule, DatabaseModule],
  providers: [NestAuthenticateUserUseCase],
})
export class HttpModule { }
