import type { User } from "./user";

export interface AuthResponse {
  user: Omit<User, "password">;
  token: string;
}
