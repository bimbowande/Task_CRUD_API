import { z } from "zod";

//validator for create schema
export const createTaskSchema = z.object({
  title: z.string().min(1, "Task title is required"),
  description: z.string().optional(),
  status: z.enum(["pending", "in-progres", "completed"]),
  dueDate: z.coerce.date(),
});

//validator for status schema
export const updateStatusSchema = z.object({
  status: z.enum(["pending", "in-progress", "completed"]),
});
