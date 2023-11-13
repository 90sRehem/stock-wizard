import { z } from "zod";
import { Contract, Entity, Guid } from "@/core";

export const userSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("O email deve ser válido"),
  password: z.string()
    .min(6, 'A senha deve ter pelo menos 6 caracteres')
    .refine((password) => /[a-z]/.test(password), {
      message: 'A senha deve conter pelo menos uma letra minúscula',
    })
    .refine((password) => /[A-Z]/.test(password), {
      message: 'A senha deve conter pelo menos uma letra maiúscula',
    })
    .refine((password) => /\d/.test(password), {
      message: 'A senha deve conter pelo menos um número',
    })
    .refine((password) => /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password), {
      message: 'A senha deve conter pelo menos um caractere especial',
    })
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
    return this.props.password;
  }

  public get name() {
    return this.props.name;
  }
}
