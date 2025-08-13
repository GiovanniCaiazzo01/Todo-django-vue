import type { SignInResponse, SignUpResponse } from "@/types/auth";
import api from "../api";

export class AuthService {
  private static readonly ENDPOINT = "/auth";

  static async signUp(
    userData: Pick<
      User,
      "username" | "lastName" | "firstName" | "email" | "password"
    >,
  ): Promise<SignUpResponse> {
    console.log(userData);
    const response = await api.post(`${this.ENDPOINT}/sign-up/`, userData);
    return response.data;
  }

  static async signIn(
    userData: Pick<User, "email" | "password">,
  ): Promise<SignInResponse> {
    const respose = await api.post(`${this.ENDPOINT}/sign-in/`, {
      email: userData.email,
      password: userData.password,
    });

    return respose.data;
  }
}
