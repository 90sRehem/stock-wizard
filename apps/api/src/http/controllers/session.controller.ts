import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common';
import { Public } from '@/auth/decorators/public.decorator';
import { z } from 'zod';
import { NestAuthenticateUserUseCase } from '../representations/use-cases/nest-authenticate-user.use-case';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe.';
import { WrongCredentialsError } from 'enterprise';

const authenticationSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
  })
  .required();

const bodyValidationPipe = new ZodValidationPipe(authenticationSchema);

type AuthenticationDTO = z.infer<typeof authenticationSchema>;

@Controller('session')
@Public()
export class SessionController {
  constructor(
    private readonly authenticateUserUseCase: NestAuthenticateUserUseCase,
  ) { }

  @Post()
  @UsePipes(bodyValidationPipe)
  async handle(@Body() { email, password }: AuthenticationDTO) {
    const result = await this.authenticateUserUseCase.execute({
      email,
      password,
    });

    if (result.isFailure()) {
      const error = result.value;

      switch (error.constructor) {
        case WrongCredentialsError:
          throw new UnauthorizedException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }

    return { access_token: result.value.access_token };
  }
}
