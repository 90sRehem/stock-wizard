import { Contract, Entity, Guid } from "@/core";
import { z } from "zod";

export const groceryItemSchema = z.object({
  name: z
    .string()
    .min(3, "O nome deve ter pelo menos 3 caracteres"),
  description: z
    .string()
    .min(3, "A descrição deve ter pelo menos 3 caracteres")
    .optional(),
  image: z.string(),
  price: z.number(),
  quantity: z.number(),
  category: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type GroceryItemProps = z.infer<typeof groceryItemSchema>;

export class GroceryItem extends Entity<GroceryItemProps> {
  constructor(props: GroceryItemProps, id?: Guid) {
    super(props, id);
    const validations = new Contract(groceryItemSchema, props).notifications;
    this.addNotifications(validations);
  }

  public get name() {
    return this.props.name;
  }

  public get description() {
    return this.props.description;
  }

  public get image() {
    return this.props.image;
  }

  public get price() {
    return this.props.price;
  }

  public get quantity() {
    return this.props.quantity;
  }

  public get category() {
    return this.props.category;
  }
}