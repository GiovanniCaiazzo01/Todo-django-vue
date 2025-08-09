import type { SignUpResponse } from "@/types/auth";
import api from "../api";
import type { ApiListResponse } from "@/types/api";

export class AuthService {
  private static readonly ENDPOINT = "/auth";

  static async signUp(userData): Promise<SignUpResponse> {
    const response = await api.post(`${this.ENDPOINT}/sign-up/`, {
      username: userData.firstName,
      email: userData.email,
      password: userData.password,
    });

    return response.data;
  }

  static async signIn(userData): Promise<unknown> {
    const respose = await api.post(`${this.ENDPOINT}/sign-in/`, {
      email: userData.email,
      password: userData.password,
    });

    return respose.data;
  }
}
