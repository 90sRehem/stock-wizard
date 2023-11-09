import { Notifiable } from "../validation/notifiable";
import { Guid } from "../value-objects/guid";

export abstract class Entity<Props> extends Notifiable {
  private _id: Guid;
  protected props: Props;
  private _createdAt: Date;
  private _updatedAt?: Date | null;

  protected constructor(props: Props, id?: Guid) {
    super();
    this.props = props;
    this._id = id ?? Guid.create();
    this._createdAt = new Date();
    this._updatedAt = null;
  }



  public get id() {
    return this._id;
  }

  public get createdAt() {
    return this._createdAt;
  }

  public get updatedAt() {
    return this._updatedAt;
  }

  private touch(): void {
    this._updatedAt = new Date();
  }

  public update(props: Partial<Props>): void {
    this.props = {
      ...this.props,
      ...props,
    };
    this.touch();
  }

  public equals(entity?: Entity<Props>): boolean {
    if (entity === this) return true;

    if (entity?.id === this._id) return true;

    return false;
  }
}