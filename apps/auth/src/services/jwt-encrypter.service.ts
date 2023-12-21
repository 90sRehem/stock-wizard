import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { Encrypter } from 'enterprise';

@Injectable()
export class JwtEncrypter implements Encrypter {
  constructor(private readonly jwtService: JwtService) { }
  decrypt(token: string): Promise<Record<string, unknown>> {
    return this.jwtService.verifyAsync(token);
  }
  encrypt(
    payload: Record<string, unknown>,
    options?: JwtSignOptions,
  ): Promise<string> {
    return this.jwtService.signAsync(payload, options);
  }
}
