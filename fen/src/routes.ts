import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    name: "todo",
    component: () => import("@/pages/Todo/TodoPage.vue"),
  },
  {
    path: "/auth",
    children: [
      {
        path: "sign-up",
        name: "sign-up",
        component: () => import("@/pages/Auth/SignUp/SignUp.vue"),
      },
      {
        path: "sign-in",
        name: "sign-in",
        component: () => import("@/pages/Auth/SignIn/SignIn.vue"),
      },
    ],
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("@/pages/Dashboard/DashboardPage.vue"),
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
