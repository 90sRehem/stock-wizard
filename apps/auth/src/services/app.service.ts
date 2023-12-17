import {
  HttpException,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Encrypter, HashComparer } from 'enterprise';
import { z } from 'zod';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

type AuthenticationRequestDTO = {
  email: string;
  password: string;
};

type AuthenticationResponseDTO = {
  access_token: string;
};

@Injectable()
export class AppService {
  constructor(
    private readonly encrypter: Encrypter,
    private readonly hashComparer: HashComparer,
    @Inject('USER_CLIENT') private readonly client: ClientProxy,
  ) { }
  async authenticate({ email, password }: AuthenticationRequestDTO) {
    const pattern = { cmd: 'findUserByEmail' };
    const payload = { email };

    const response = await firstValueFrom(this.client.send(pattern, payload));

    if (response.error) {
      throw new RpcException({
        message: response.message,
        errors: response.error.errors,
        statusCode: response.error.statusCode,
      });
    }

    const user = response;

    const passwordMatch = await this.hashComparer.compare(
      password,
      user.password,
    );

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = await this.encrypter.encrypt({ sub: user.id.toString() });

    return {
      access_token: token,
    };
  }

  async verify(authorization: string) {
    try {
      const token = authorization.split(' ')[1];

      const payload = await this.encrypter.decrypt(token);

      return { user: payload.sub };
    } catch (error) {
      const message = new UnauthorizedException();
      throw new RpcException({
        message: 'não autorizado cara',

        statusCode: 401,
      });
    }
  }
}
