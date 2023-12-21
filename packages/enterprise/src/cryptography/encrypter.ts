import type { SignOptions } from 'jsonwebtoken';

export abstract class Encrypter {
  abstract encrypt(payload: Record<string, unknown>, options?: SignOptions): Promise<string>;
  abstract decrypt(token: string): Promise<Record<string, unknown>>;
}
