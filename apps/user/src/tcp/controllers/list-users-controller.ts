import { Controller, UseFilters } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { RpcValidationFilter } from '../filters/rpc-validation.filter';
import { NestListUsersService } from '../use-cases/nest-list-users.service';
import { PrismaUserMapper } from 'src/database/mappers/prisma-user-mapper';

@Controller('/users')
export class ListUsersController {
  constructor(private readonly listUsersUseCase: NestListUsersService) { }

  @MessagePattern({ cmd: 'list-users' })
  @UseFilters(RpcValidationFilter)
  async handle() {
    const result = await this.listUsersUseCase.execute();

    return {
      users: result.map(PrismaUserMapper.toHttp),
    };
  }
}
