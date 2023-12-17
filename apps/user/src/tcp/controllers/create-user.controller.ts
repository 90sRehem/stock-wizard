import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  UseFilters,
  UsePipes,
} from '@nestjs/common';
import { NestCreateUserService } from '../use-cases/nest-create-user.service';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe.';
import { z } from 'zod';
import { UserAlreadyExistsError } from 'enterprise';
import { MessagePattern } from '@nestjs/microservices';
import { RpcValidationFilter } from '../filters/rpc-validation.filter';

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
      console.log(
        '🚀 ~ file: create-user.controller.ts:38 ~ CreateUserController ~ handle ~ error:',
        error,
      );
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
