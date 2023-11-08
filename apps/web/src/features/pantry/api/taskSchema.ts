import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(2, "Title must be at least 2 characters long"),
  status: z.union([
    z.literal("todo"),
    z.literal("done"),
    z.literal("in-progress"),
    z.literal("backlog"),
    z.literal("canceled"),
  ]),
  label: z.enum([
    "bug",
    "feature",
    "enhancement",
    "documentation",
    "maintenance",
  ] as const),
  priority: z.enum(["low", "medium", "high"] as const),
  createdAt: z.string().pipe(z.coerce.date()),
  updatedAt: z.string().pipe(z.coerce.date()).nullable(),
});

export type Task = z.infer<typeof taskSchema>;
