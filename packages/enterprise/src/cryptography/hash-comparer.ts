export abstract class HashComparer {
  abstract compare(payload: string, hashedPayload: string): Promise<boolean>;
}
