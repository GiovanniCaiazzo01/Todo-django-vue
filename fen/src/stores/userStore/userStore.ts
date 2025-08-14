import { defineStore } from "pinia";

type UseUserStore = {
  user: Omit<User, "password">;
  type: "member" | "guest";
};

export const useUserStore = defineStore("user", {
  state: (): UseUserStore => ({
    user: {
      id: "",
      email: "",
      firstName: "",
      lastName: "",
      username: "",
    },
    type: "member",
  }),
});
