import {
  HttpException,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Encrypter, HashComparer } from 'enterprise';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { AccessTokenRepository } from '@/database/repositories/access-token.repository';

type AuthenticationRequestDTO = {
  email: string;
  password: string;
};

type AuthenticationResponseDTO = {
  access_token: string;
  refresh_token: string;
};

@Injectable()
export class AppService {
  constructor(
    private readonly encrypter: Encrypter,
    private readonly hashComparer: HashComparer,
    private readonly accessTokenRepository: AccessTokenRepository,
    @Inject('USER_CLIENT') private readonly client: ClientProxy,
  ) { }
  async authenticate({
    email,
    password,
  }: AuthenticationRequestDTO): Promise<AuthenticationResponseDTO> {
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
    const refreshToken = await this.encrypter.encrypt(
      { sub: user.id.toString() },
      { expiresIn: '1d' },
    );
    const result = await this.accessTokenRepository.create({
      token: refreshToken,
      userId: user.id.toString(),
    });

    return {
      access_token: token,
      refresh_token: result.id.toString(),
    };
  }

  async verify(authorization: string) {
    try {
      const token = authorization.split(' ')[1];
      const payload = await this.encrypter.decrypt(token);
      return { user: payload.sub as string };
    } catch (error) {
      const message = new UnauthorizedException();
      throw new RpcException(message);
    }
  }

  async refreshToken(authorization: string) {
    console.log(
      '🚀 ~ file: app.service.ts:88 ~ AppService ~ refreshToken ~ authorization:',
      authorization,
    );
    try {
      const tokenExists = await this.accessTokenRepository.findById({
        id: authorization,
      });

      if (!tokenExists) {
        throw new UnauthorizedException('Invalid token');
      }

      await this.accessTokenRepository.delete({ token: tokenExists.token });

      const newToken = await this.encrypter.encrypt({
        sub: tokenExists.userId,
      });
      const newRefreshToken = await this.encrypter.encrypt(
        { sub: tokenExists.userId },
        { expiresIn: '1d' },
      );

      const storedRefresh = await this.accessTokenRepository.create({
        token: newRefreshToken,
        userId: tokenExists.userId,
      });

      return {
        access_token: newToken,
        refresh_token: storedRefresh.id.toString(),
      };
    } catch (error) {
      const message = new UnauthorizedException();
      throw new RpcException(message);
    }
  }
}
