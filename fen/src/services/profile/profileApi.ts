import type { User } from "@/types/user";
import api from "../api";

export class ProfileService {
  private static readonly ENDPOINT = "/auth/profile";

  static async getUserInfo(id: User["id"]) {
    const response = await api.get(`${this.ENDPOINT}/${id}`);
    return response.data;
  }

  static async patchUserGeneralInfo(
    userProfileData: Partial<
      Pick<User, "username" | "firstName" | "lastName" | "email">
    > &
      Required<Pick<User, "id">>,
  ): Promise<Omit<User, "password">> {
    const { id } = userProfileData;
    const response = await api.patch(
      `${this.ENDPOINT}/${id}/`,
      userProfileData,
    );
    return response.data;
  }

  static async patchUserCredentialInfo(
    userProfileData: Pick<User, "password" | "id">,
  ): Promise<Omit<User, "password">> {
    const { id } = userProfileData;
    const response = await api.patch(
      `${this.ENDPOINT}/${id}/`,
      userProfileData,
    );
    return response.data;
  }
}
