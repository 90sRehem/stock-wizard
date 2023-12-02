import { Controller, Get, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @Get('users')
  @MessagePattern('listUsers')
  listUsers() {
    Logger.log('Listing users');
    return this.appService.listUsers();
  }

  @MessagePattern('createUser')
  createUser(data: any) {
    Logger.log('Creating user', data);
  }
}
