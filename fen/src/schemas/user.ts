import { z } from "zod";

export const userCoreSchema = z.object({
  username: z.string().min(2, "Username must have at least 2 characters"),
  firstName: z.string().min(2, "First name must have at least 2 characters"),
  lastName: z.string().min(2, "Last name must have at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
});

export const userCoreSchemaOptional = userCoreSchema.partial();

export const credentialsBase = z.object({
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: z.string(),
});
