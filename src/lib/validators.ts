import { z } from "zod";

export const loginSchema = z.object({ email: z.email("Enter a valid work email"), password: z.string().min(6, "Password must be at least 6 characters") });
export const taskSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters").max(150),
  description: z.string().trim().min(3, "Add a short description").max(10000),
  assigneeId: z.string().min(1, "Choose an assignee"),
  priority: z.enum(["Low", "Medium", "High", "Urgent"]),
  dueDate: z.string().min(1, "Choose a due date"),
  startDate: z.string().optional(),
  projectName: z.string().optional(),
  tags: z.string().optional(),
  requiresApproval: z.boolean()
}).refine((data) => !data.startDate || new Date(data.dueDate) >= new Date(data.startDate), { path: ["dueDate"], message: "Due date cannot be before start date" });

export type LoginInput = z.infer<typeof loginSchema>;
export type TaskInput = z.infer<typeof taskSchema>;
