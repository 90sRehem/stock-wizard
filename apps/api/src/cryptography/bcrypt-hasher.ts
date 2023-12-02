import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcryptjs';
import { HashComparer, HashGenerator } from 'enterprise/src/cryptography';

@Injectable()
export class BCryptHasher implements HashComparer, HashGenerator {
  private readonly _salt = 8;
  hash(payload: string): Promise<string> {
    return hash(payload, this._salt);
  }
  compare(payload: string, hashedPayload: string): Promise<boolean> {
    return compare(payload, hashedPayload);
  }
}
