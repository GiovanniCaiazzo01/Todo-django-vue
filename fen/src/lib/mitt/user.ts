import { useUserStore } from "@/stores/userStore/userStore";
import mitt from "mitt";

export type Events = { "log-out": void };
export const emitterAuth = mitt<Events>();

const userStore = useUserStore();

const handleLogoutEvent = async () => {
  localStorage.removeItem("authtoken");
  try {
    await userStore.userLogout();
  } catch (error) {
    console.error(error);
  }
};

emitterAuth.on("log-out", handleLogoutEvent);
