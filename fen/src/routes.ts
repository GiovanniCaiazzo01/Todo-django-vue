import { createMemoryHistory, createRouter } from "vue-router";
import TodoPage from "@/pages/Todo/TodoPage.vue";
import Test from "@/pages/Test/test.vue";

const routes = [
  { path: "/", component: TodoPage },
  { path: "/test", component: Test },
];

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
});
