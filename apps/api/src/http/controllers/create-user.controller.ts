import { Public } from '@/auth/decorators/public.decorator';
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Post,
  UsePipes,
} from '@nestjs/common';
import { NestCreateUserUseCase } from '../representations/use-cases/nest-create-user.use-case';
import { z } from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe.';
import { UserAlreadyExistsError } from 'enterprise';

const createUserSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});

export type CreateUserBody = z.infer<typeof createUserSchema>;

const bodyValidationPipe = new ZodValidationPipe(createUserSchema);

@Controller('/users')
@Public()
export class CreateUserController {
  public constructor(private readonly useCase: NestCreateUserUseCase) { }

  @Post()
  @UsePipes(bodyValidationPipe)
  async handle(@Body() { email, name, password }: CreateUserBody) {
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
  }
}
