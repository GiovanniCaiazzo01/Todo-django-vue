import { defineStore } from "pinia";

type UseUserStore = {
  user: User;
  type: "member" | "guest";
};

export const useUserStore = defineStore("user", {
  state: (): UseUserStore => ({
    user: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      username: "",
    },
    type: "member",
  }),
});
