import type { User } from "@/types/user";

export interface SignUpForm extends User {
  confirmPassword: string;
}
