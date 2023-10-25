import { Guid } from "./value-objects";

export abstract class Entity<Props> {
  private readonly _id: Guid;
  protected props: Props;

  protected constructor(props: Props, id?: Guid) {
    this.props = props;
    this._id = id ?? Guid.create();
  }

  public get id(): Guid {
    return this._id;
  }

  public equals(entity?: Entity<Props>): boolean {
    if (entity === this) return true;

    if (entity?._id === this._id) return true;

    return false;
  }
}