import { defineStore } from "pinia";
import * as todoActions from "./actions";
import type { Todo } from "@/types/todo";

type UseTodoStore = {
  todos: Todo[];
  isLoading: boolean;
  error: string | null;
};

export const useTodoStore = defineStore("todo", {
  state: (): UseTodoStore => ({ todos: [], isLoading: false, error: null }),
  getters: {
    completedTodos: (state) => state.todos.filter((todo) => todo.completed),
    activeTodos: (state) => state.todos.filter((todo) => !todo.completed),
    todosCount: (state) => state.todos.length,
    completedCount(): number {
      return this.completedTodos.length;
    },
    activeCount(): number {
      return this.activeTodos.length;
    },
  },
  actions: { ...todoActions },
});
