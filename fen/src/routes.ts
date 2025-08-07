import { createWebHistory, createRouter } from "vue-router";
import TodoPage from "@/pages/Todo/TodoPage.vue";
import Test from "@/pages/Test/test.vue";

const routes = [
  { path: "/", name: "todo", component: TodoPage },
  { path: "/test", name: "test", component: Test },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
