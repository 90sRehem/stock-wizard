import { randomUUID } from "node:crypto";
import { ValueObject } from "../value-object";

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
