export interface AuthResponse {
  user: Omit<User, "password">;
  token: string;
}
