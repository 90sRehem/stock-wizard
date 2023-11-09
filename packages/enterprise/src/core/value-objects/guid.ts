import { randomUUID } from "node:crypto";

export class Guid {
  private _value: string;

  public toString(): string {
    return this._value;
  }

  public toValue(): Guid {
    return new Guid(this._value);
  }

  constructor(value: string) {
    this._value = value;
  }

  static create(): Guid {
    const value = randomUUID();
    return new Guid(value);
  }

  public equals(id: Guid): boolean {
    if (id._value === this._value) return true;

    return false;
  }
}
