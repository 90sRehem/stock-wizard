import { Entity } from "../../core";
import { Guid } from "../../core/value-objects";

type UserProps = {
  name: string;
  email: string;
  password: string;
}

export class User extends Entity<UserProps> {
  public constructor(props: UserProps, id?: Guid) {
    super(props, id);
  }

  get name(): string {
    return this.props.name;
  }

  get email(): string {
    return this.props.email;
  }

  get password(): string {
    return this.props.password;
  }
}
