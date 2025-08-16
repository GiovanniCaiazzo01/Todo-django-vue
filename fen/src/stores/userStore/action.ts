import { AuthService } from "@/services/auth/authApi";
import type { useUserStore } from "./userStore";
import type { User } from "@/types/user";

async function userSignIn(
  this: ReturnType<typeof useUserStore>,
  data: Pick<User, "email" | "password">,
) {
  const { email, password } = data;
  console.log("user action sign-in: ", { email, password });
  const { token, user } = await AuthService.signIn({ email, password });
  this.$patch({ user, token });
  console.log(this);
  return { user, token };
}

async function userSignUp(this: ReturnType<typeof useUserStore>, data: User) {
  try {
    const { token, user } = await AuthService.signUp(data);
    this.$patch({ user, token });
    return { user, token };
  } catch (error) {
    console.error("Error during sing-up", error);
  }
}

export { userSignUp, userSignIn };
