import { createWebHistory, createRouter } from "vue-router";
import { Navlinks } from "./data/navigation";
import { useUserStore } from "@/stores/userStore/userStore";
import { pinia } from "./plugins/pinia";

const routes = [
  {
    path: Navlinks.landingPage.route,
    name: Navlinks.landingPage.name,
    component: () => import("@/pages/Todo/TodoPage.vue"),
  },
  {
    path: "/auth",
    children: [
      {
        path: Navlinks.signUp.route,
        name: Navlinks.signUp.name,
        component: () => import("@/pages/Auth/SignUp/SignUp.vue"),
      },
      {
        path: Navlinks.signIn.route,
        name: Navlinks.signIn.name,
        component: () => import("@/pages/Auth/SignIn/SignIn.vue"),
      },
    ],
  },
  {
    path: Navlinks.dashboard.route,
    name: Navlinks.dashboard.name,
    component: () => import("@/pages/Dashboard/DashboardPage.vue"),
  },

  {
    path: Navlinks.profile.route,
    name: Navlinks.profile.name,
    component: () => import("@/pages/Profile/ProfilePage.vue"),
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  const userStore = useUserStore(pinia);
  const protectedRoutes = [Navlinks.dashboard.name, Navlinks.profile.name];

  if (
    userStore.isAuth &&
    (to.name === Navlinks.signIn.name ||
      to.name === Navlinks.signUp.name ||
      to.name === Navlinks.landingPage.name)
  ) {
    return { name: Navlinks.dashboard.name };
  }

  if (!userStore.isAuth && protectedRoutes.includes(String(to.name))) {
    return { name: Navlinks.signIn.name };
  }

  return true;
});
