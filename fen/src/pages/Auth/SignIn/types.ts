import type { User } from "@/types/user";

export type SignInForm = Pick<User, "email" | "password">;
