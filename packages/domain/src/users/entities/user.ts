import { Entity } from "@/core/entities/entity";
import { Guid } from "../../core/value-objects/guid";
import { Password, passwordSchema } from "../value-objects/password";
import { z } from "zod";
import { Contract } from "@/core/validation/contract";

// export type UserProps = {
//   name: string;
//   email: string;
//   password: Password;
// };

const userSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("O email deve ser válido"),
  password: passwordSchema,
});

export type UserProps = z.infer<typeof userSchema>;

export class User extends Entity<UserProps> {
  constructor(props: UserProps, id?: Guid) {
    super(props, id);
    const validations = new Contract(userSchema, props).notifications;
    this.addNotifications(validations);
  }

  public get email() {
    return this.props.email;
  }

  public get password() {
    return this.props.password.value;
  }

  public get name() {
    return this.props.name;
  }
}
