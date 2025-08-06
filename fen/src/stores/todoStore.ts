import { TodoService } from "@/services/api";
import type { CreateTodoData, Todo, UpdateTodoData } from "@/types";
import { defineStore } from "pinia";

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
  actions: {
    async loadTodos() {
      try {
        this.isLoading = true;
        this.error = null;
        const response = await TodoService.getAll();
        this.todos = response.results;
      } catch (err: any) {
        this.error = err.response?.data?.detail || "Failed to load todos";
        console.error("Error loading todos:", err);
      } finally {
        this.isLoading = false;
      }
    },

    async createTodo(data: CreateTodoData) {
      try {
        this.error = null;
        const newTodo = await TodoService.create(data);
        this.todos.unshift(newTodo); // Add to beginning of list
        return newTodo;
      } catch (err: any) {
        this.error = err.response?.data?.detail || "Failed to create todo";
        console.error("Error creating todo:", err);
        throw err;
      }
    },

    async updateTodo(id: number, data: UpdateTodoData) {
      try {
        this.error = null;
        const updatedTodo = await TodoService.update(id, data);
        const index = this.todos.findIndex((todo) => todo.id === id);
        if (index !== -1) {
          this.todos[index] = updatedTodo;
        }
        return updatedTodo;
      } catch (err: any) {
        this.error = err.response?.data?.detail || "Failed to update todo";
        console.error("Error updating todo:", err);
        throw err;
      }
    },

    async deleteTodo(id: number) {
      try {
        this.error = null;
        await TodoService.delete(id);
        this.todos = this.todos.filter((todo) => todo.id !== id);
      } catch (err: any) {
        this.error = err.response?.data?.detail || "Failed to delete todo";
        console.error("Error deleting todo:", err);
        throw err;
      }
    },
    async toggleTodo(id: number) {
      const todo = this.todos.find((t) => t.id === id);
      if (!todo) {
        console.error("Todo not found with ID:", id);
        return;
      }

      try {
        this.error = null;
        const updatedTodo = await TodoService.toggleComplete(
          id,
          !todo.completed,
        );
        const index = this.todos.findIndex((t) => t.id === id);
        if (index !== -1) {
          this.todos[index].completed = updatedTodo.completed;
        }
        return updatedTodo;
      } catch (err: any) {
        this.error = err.response?.data?.detail || "Failed to toggle todo";
        console.error("Error toggling todo:", err);
        throw err;
      }
    },
    async clearCompleted() {
      const completedIds = this.completedTodos.map((todo) => todo.id);

      try {
        this.error = null;
        await Promise.all(completedIds.map((id) => TodoService.delete(id)));
        this.todos = this.todos.filter((todo) => !todo.completed);
      } catch (err: any) {
        this.error =
          err.response?.data?.detail || "Failed to clear completed todos";
        console.error("Error clearing completed todos:", err);
        throw err;
      }
    },
    clearError() {
      this.error = null;
    },
  },
});
