import { ZodValidationPipe } from '@/pipes/zod-validation.pipe.';
import {
  ArgumentsHost,
  Body,
  Catch,
  Controller,
  ExceptionFilter,
  HttpException,
  UseFilters,
  UsePipes,
} from '@nestjs/common';
import { z } from 'zod';
import { AppService } from '@/services/app.service';
import { MessagePattern, RpcException } from '@nestjs/microservices';

@Catch(HttpException)
export class RpcValidationFilter implements ExceptionFilter {
  catch(exception: HttpException, _host: ArgumentsHost) {
    return new RpcException(exception.getResponse());
  }
}

const authenticationSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
  })
  .required();

const bodyValidationPipe = new ZodValidationPipe(authenticationSchema);

type AuthenticationDTO = z.infer<typeof authenticationSchema>;

const verifySchema = z.object({
  authorization: z.string(),
});

const verifyValidationPipe = new ZodValidationPipe(verifySchema);

type VerifyDTO = z.infer<typeof verifySchema>;

@Controller()
export class SessionController {
  constructor(private readonly appService: AppService) { }

  @MessagePattern({ cmd: 'authenticate' })
  @UsePipes(bodyValidationPipe)
  @UseFilters(RpcValidationFilter)
  async authenticate(@Body() authenticationDTO: AuthenticationDTO) {
    const response = await this.appService.authenticate(authenticationDTO);

    return response;
  }

  @MessagePattern({ cmd: 'verify' })
  @UsePipes(verifyValidationPipe)
  @UseFilters(RpcValidationFilter)
  async verify(@Body() { authorization }: VerifyDTO) {
    const response = await this.appService.verify(authorization);

    return response;
  }
}
