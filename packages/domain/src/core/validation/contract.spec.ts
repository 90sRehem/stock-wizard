import { z } from "zod";
import { Contract } from "./contract";

const schema = z.object({
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('O e-mail informado é inválido'),
})

describe('Contract', () => {
  it("should create notifications when validation fails", () => {
    const contract = new Contract(schema, { email: "", name: "", });
    expect(contract.notifications).toHaveLength(2);
  });

  it("should not create notifications when validation succeeds", () => {
    const contract = new Contract(schema, { email: "johndoe@email.com", name: "John" });
    expect(contract.notifications).toHaveLength(0);
  });
});