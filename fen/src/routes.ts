import { createWebHistory, createRouter } from "vue-router";
import { Navlinks } from "./data/navigation";

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
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
