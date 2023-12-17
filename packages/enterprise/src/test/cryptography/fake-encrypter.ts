import { Encrypter } from "@/cryptography";

export class FakeEncrypter implements Encrypter {
  async decrypt(token: string): Promise<Record<string, unknown>> {
    return JSON.parse(token) as Record<string, unknown>;
  }
  async encrypt(payload: Record<string, unknown>): Promise<string> {
    return JSON.stringify(payload);
  }
}