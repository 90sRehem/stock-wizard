import { Public } from '@/decorators/public.decorator';
import { ZodValidationPipe } from '@/pipes/zod-validation.pipe.';
import { Controller, Logger } from '@nestjs/common';
import { z } from 'zod';
import { AppService } from '@/services/app.service';
import { MessagePattern } from '@nestjs/microservices';

const authenticationSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
  })
  .required();

const bodyValidationPipe = new ZodValidationPipe(authenticationSchema);

type AuthenticationDTO = z.infer<typeof authenticationSchema>;

// @Public()
@Controller()
export class SessionController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('authenticate')
  async authenticate(authenticationDTO: AuthenticationDTO) {
    Logger.log('Authenticating user in UserService...');
    return await this.appService.authenticate(authenticationDTO);
  }
}
