import type { ApiResponse } from "@/types/api";
import type { SignUpResponse } from "@/types/auth";
import api from "../api";

export class AuthService {
  private static readonly ENDPOINT = "/auth";

  static async signUp(userData): Promise<ApiResponse<SignUpResponse>> {
    const response = await api.post(`${this.ENDPOINT}/sign-up/`, {
      username: userData.firstName,
      email: userData.email,
      password: userData.password,
    });

    console.log(response);
    return response.data;
  }
}
