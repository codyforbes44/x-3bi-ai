import * as z from "zod";
import { LucideIcon } from "lucide-react";

export const issueFormSchema = z.object({
  name: z.string().trim().min(2, { message: "Name must be at least 2 characters" }).max(100),
  email: z.string().trim().email({ message: "Invalid email address" }).max(255),
  title: z.string().trim().min(5, { message: "Title must be at least 5 characters" }).max(200),
  description: z.string().trim().min(20, { message: "Description must be at least 20 characters" }).max(2000),
  category: z.string().min(1, { message: "Please select a category" }),
});

export type IssueFormValues = z.infer<typeof issueFormSchema>;

export interface IssueExample {
  icon: LucideIcon;
  title: string;
  description: string;
  category: string;
}
