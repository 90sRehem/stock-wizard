import { Entity } from "@/core/entities/entity";
import { UserSchema } from "../../schemas/user-schema"
import { Guid } from "../../core/value-objects/guid";

export type UserProps = Pick<UserSchema, "email" | "password" | "name">

export class User extends Entity<UserProps> {
  constructor(props: UserProps, id?: Guid) {
    super(props, id);
  }

  public get email() {
    return this.props.email;
  }

  public get password() {
    return this.props.password;
  }

  public get name() {
    return this.props.name;
  }
}
