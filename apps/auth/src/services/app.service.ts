import { Inject, Injectable, Logger } from '@nestjs/common';
import { Encrypter, HashComparer } from 'enterprise';
import { z } from 'zod';
import { ClientProxy } from '@nestjs/microservices';

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
    Logger.log('Authenticating user...', { email, password });

    return { email, password };
  }
}
