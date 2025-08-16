import type { AuthResponse } from "@/types/auth";
import api from "../api";
import type { User } from "@/types/user";

export class AuthService {
  private static readonly ENDPOINT = "/auth";

  static async signUp(userData: User): Promise<AuthResponse> {
    const response = await api.post(`${this.ENDPOINT}/sign-up/`, userData);
    return response.data;
  }

  static async signIn(
    userData: Pick<User, "email" | "password">,
  ): Promise<AuthResponse> {
    const respose = await api.post(`${this.ENDPOINT}/sign-in/`, {
      email: userData.email,
      password: userData.password,
    });

    return respose.data;
  }
}
