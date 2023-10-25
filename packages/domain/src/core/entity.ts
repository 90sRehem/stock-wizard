import { Guid } from "./value-objects";

export abstract class Entity<Props> {
  private readonly _id: Guid;
  private readonly _createdAt: Date;
  private _updatedAt: Date | null;
  protected props: Props;

  protected constructor(props: Props, id?: Guid) {
    this.props = props;
    this._id = id ?? Guid.create();
    this._createdAt = new Date();
    this._updatedAt = null;
  }

  public get id(): Guid {
    return this._id;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }

  public get updatedAt(): Date | null {
    return this._updatedAt;
  }

  protected touch(): void {
    this._updatedAt = new Date();
  }

  protected update(props: Props): void {
    this.props = { ...this.props, ...props }
    this.touch();
  }

  public equals(entity?: Entity<Props>): boolean {
    if (entity === this) return true;

    if (entity?._id === this._id) return true;

    return false;
  }
}