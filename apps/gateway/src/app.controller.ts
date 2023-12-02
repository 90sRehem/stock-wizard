import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  Inject,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

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
    @Inject('AUTH_SERVICE') private readonly authService,
  ) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('users')
  async listUsers() {
    const response = await this.userClient.send('listUsers', {}).toPromise();
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

    if (response.error) {
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
    return await this.authService.send('authenticate', { email, password });
  }
}
