import { ValueObject } from "@/core/value-object";
import { randomUUID } from "node:crypto";

export class Guid extends ValueObject<string> {
  public constructor(props: string) {
    super(props);
  }

  public toString(): string {
    return this.props;
  }

  public static create(): Guid {
    return new Guid(randomUUID());
  }
}
