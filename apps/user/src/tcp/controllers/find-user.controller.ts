import {
  BadRequestException,
  Body,
  Controller,
  NotFoundException,
  UseFilters,
  UsePipes,
} from '@nestjs/common';
import { NestFindUserByEmailService } from '../use-cases/nest-find-user-by-email.service';
import {
  UserNotFoundError,
  type FindUserByEmailUseCaseRequest,
} from 'enterprise';
import { MessagePattern } from '@nestjs/microservices';
import { RpcValidationFilter } from '../filters/rpc-validation.filter';
import { z } from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe.';
import { PrismaUserMapper } from 'src/database/mappers/prisma-user-mapper';

const findUserByEmailSchema = z.object({
  email: z.string().email(),
});

const bodyValidationPipe = new ZodValidationPipe(findUserByEmailSchema);

@Controller('/users')
export class FindUserController {
  constructor(private readonly useCase: NestFindUserByEmailService) { }

  @MessagePattern({ cmd: 'findUserByEmail' })
  @UsePipes(bodyValidationPipe)
  @UseFilters(RpcValidationFilter)
  async handle(@Body() { email }: FindUserByEmailUseCaseRequest) {
    const result = await this.useCase.execute({ email });

    if (result.isFailure()) {
      const error = result.value;

      switch (error.constructor) {
        case UserNotFoundError:
          throw new NotFoundException(error.message);

        default:
          throw new BadRequestException(error.message);
      }
    }

    return PrismaUserMapper.toHttp(result.value);
  }
}
