import {
  ArgumentsHost,
  BadRequestException,
  Body,
  Catch,
  ConflictException,
  Controller,
  ExceptionFilter,
  HttpException,
  UseFilters,
  UsePipes,
} from '@nestjs/common';
import { NestCreateUserService } from '../use-cases/nest-create-user.service';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe.';
import { z } from 'zod';
import { UserAlreadyExistsError } from 'enterprise';
import { MessagePattern, RpcException } from '@nestjs/microservices';

@Catch(HttpException)
export class RpcValidationFilter implements ExceptionFilter {
  catch(exception: HttpException, _host: ArgumentsHost) {
    return new RpcException(exception.getResponse());
  }
}

const createUserSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});

export type CreateUserDTO = z.infer<typeof createUserSchema>;

const bodyValidationPipe = new ZodValidationPipe(createUserSchema);

@Controller('/users')
export class CreateUserController {
  constructor(private readonly useCase: NestCreateUserService) { }

  @MessagePattern({ cmd: 'createUser' })
  @UsePipes(bodyValidationPipe)
  @UseFilters(RpcValidationFilter)
  async handle(@Body() { email, name, password }: CreateUserDTO) {
    const result = await this.useCase.execute({ email, name, password });

    if (result.isFailure()) {
      const error = result.value;
      switch (error.constructor) {
        case UserAlreadyExistsError:
          throw new ConflictException(error.message);

        default:
          throw new BadRequestException(error.message);
      }
    }
    return null;
  }
}
