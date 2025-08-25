import { AuthService } from "@/services/auth/authApi";
import type { useUserStore } from "./userStore";
import type { User } from "@/types/user";
import { ProfileService } from "@/services/profile/profileApi";
import { Navlinks } from "@/data/navigation";
import { useRouter } from "vue-router";

async function userSignIn(
  this: ReturnType<typeof useUserStore>,
  data: Pick<User, "email" | "password">,
) {
  const { email, password } = data;
  const { token, user } = await AuthService.signIn({ email, password });
  this.$patch({ user, token });
  return { user, token };
}

async function userSignUp(
  this: ReturnType<typeof useUserStore>,
  data: Omit<User, "id">,
) {
  const { token, user } = await AuthService.signUp(data);
  this.$patch({ user, token });
  return { user, token };
}

async function userLogout(this: ReturnType<typeof useUserStore>) {
  try {
    await AuthService.logOut(); // token ancora presente → header ok
  } catch (e) {
    console.error(e);
  } finally {
    this.$reset(); // <-- torna allo state iniziale
    if (typeof window !== "undefined") {
      localStorage.removeItem("authtoken"); // se lo usavi
      localStorage.removeItem("user"); // chiave pinia-persist
      window.location.replace(Navlinks.landingPage.route);
    }
  }
}

async function userPatchGeneral(
  this: ReturnType<typeof useUserStore>,
  userProfileData: Partial<
    Pick<User, "username" | "firstName" | "lastName" | "email">
  > &
    Required<Pick<User, "id">>,
) {
  const updateUserData =
    await ProfileService.patchUserGeneralInfo(userProfileData);
  this.$patch({ user: updateUserData });
  return { user: updateUserData };
}

async function userPatchCredential(
  this: ReturnType<typeof useUserStore>,
  userProfileData: Pick<User, "password" | "id">,
) {
  const updateUserData =
    await ProfileService.patchUserCredentialInfo(userProfileData);
  this.$patch({ user: updateUserData });
  return { user: updateUserData };
}

export {
  userSignUp,
  userSignIn,
  userPatchGeneral,
  userPatchCredential,
  userLogout,
};
