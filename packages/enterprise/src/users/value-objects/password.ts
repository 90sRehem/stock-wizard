import { Contract, ValueObject } from "@/core";
import bcrypt from "bcryptjs";
import { z } from "zod";

export const passwordSchema = z.object({
  value: z.string()
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
})


export type PasswordProps = z.infer<typeof passwordSchema>;

export class Password extends ValueObject<PasswordProps> {
  constructor(props: PasswordProps) {
    super(props);
    this.addNotifications(new Contract(passwordSchema, props).notifications);

    if (this.isValid()) {
      this.hash(props.value);
    }
  }
  get value(): string {
    return this.props.value;
  }

  private hash(password: string): void {
    const hashed = bcrypt.hashSync(password, 8);
    this.props.value = hashed;
  }

  public async compare(password: string): Promise<boolean> {
    console.log("🚀 ~ file: password.ts:44 ~ Password ~ compare ~ password:", password)
    console.log("🚀 ~ file: password.ts:45 ~ Password ~ compare ~ this.props.value:", this.props.value)
    const result = await bcrypt.compare(password, this.props.value);
    console.log("🚀 ~ file: password.ts:47 ~ Password ~ compare ~ result:", result)


    return result
  }
}
