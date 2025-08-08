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
    ],
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
