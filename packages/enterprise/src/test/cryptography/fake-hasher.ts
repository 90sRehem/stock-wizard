import { HashComparer, HashGenerator } from "@/cryptography";

export class FakeHasher implements HashGenerator, HashComparer {
  async hash(payload: string): Promise<string> {
    return payload.concat("-hashed");
  }
  async compare(payload: string, hashedPayload: string): Promise<boolean> {
    const result = payload.concat("-hashed") === hashedPayload;

    return result
  }
}