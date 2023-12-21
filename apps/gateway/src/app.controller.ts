import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  Inject,
  Post,
  Req,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, lastValueFrom } from 'rxjs';

type CreateUserDTO = {
  name: string;
  email: string;
  password: string;
};

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
  ) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('users')
  async listUsers(@Req() req: any) {
    const authorization = req.headers.authorization;

    await firstValueFrom(
      this.authService.send({ cmd: 'verify' }, { authorization }),
    );

    const pattern = { cmd: 'list-users' };
    const response = await firstValueFrom(this.userClient.send(pattern, {}));
    return response;
  }

  @Post('users')
  @HttpCode(201)
  async createUser(@Body() { email, name, password }: CreateUserDTO) {
    const pattern = { cmd: 'createUser' };
    const payload = { email, name, password };

    const response = await firstValueFrom(
      this.userClient.send(pattern, payload),
    );

    if (response?.error) {
      throw new HttpException(
        {
          message: response.message,
          errors: response.error.errors,
        },
        response.error.statusCode,
      );
    }

    return response;
  }

  @Post('session')
  async authenticate(
    @Body() { email, password }: { email: string; password: string },
  ) {
    const pattern = { cmd: 'authenticate' };
    const payload = { email, password };
    const response = await lastValueFrom(
      this.authService.send(pattern, payload),
    );

    if (response.error) {
      throw new HttpException(
        {
          message: response.error.message,
          errors: response.error.errors,
        },
        response.error.statusCode,
      );
    }

    return response;
  }

  @Post('session/refresh')
  async refreshToken(@Body() { authorization }: { authorization: string }) {
    const pattern = { cmd: 'refresh' };
    const payload = { authorization };
    const response = await lastValueFrom(
      this.authService.send(pattern, payload),
    );

    if (response.error) {
      throw new HttpException(
        {
          message: response.error.message,
          errors: response.error.errors,
        },
        response.error.statusCode,
      );
    }

    return response;
  }
}
