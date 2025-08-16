import type { AuthResponse } from "@/types/auth";
import * as userAction from "./action";
import { defineStore } from "pinia";

type UseUserStore = AuthResponse;

export const useUserStore = defineStore("user", {
  state: (): UseUserStore => ({
    user: {
      id: "",
      email: "",
      firstName: "",
      lastName: "",
      username: "",
    },
    token: "",
  }),
  getters: {
    isAuth: (state) => !!state.token,
  },
  actions: { ...userAction },
  persist: true,
});
