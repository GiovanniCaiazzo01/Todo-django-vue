import { ref, computed } from "vue";
import { TodoService } from "@/services/api";
import type { Todo, CreateTodoData, UpdateTodoData } from "@/types";

// Global state
const todos = ref<Todo[]>([]);
const isLoading = ref(false);
const error = ref<string | null>(null);

// Computed properties
const completedTodos = computed(() =>
  todos.value.filter((todo) => todo.completed),
);
const activeTodos = computed(() =>
  todos.value.filter((todo) => !todo.completed),
);
const todosCount = computed(() => todos.value.length);
const completedCount = computed(() => completedTodos.value.length);
const activeCount = computed(() => activeTodos.value.length);

// Actions
const loadTodos = async () => {
  try {
    isLoading.value = true;
    error.value = null;
    const response = await TodoService.getAll();
    todos.value = response.results;
  } catch (err: any) {
    error.value = err.response?.data?.detail || "Failed to load todos";
    console.error("Error loading todos:", err);
  } finally {
    isLoading.value = false;
  }
};

const createTodo = async (data: CreateTodoData) => {
  try {
    error.value = null;
    const newTodo = await TodoService.create(data);
    todos.value.unshift(newTodo); // Add to beginning of list
    return newTodo;
  } catch (err: any) {
    error.value = err.response?.data?.detail || "Failed to create todo";
    console.error("Error creating todo:", err);
    throw err;
  }
};

const updateTodo = async (id: number, data: UpdateTodoData) => {
  try {
    error.value = null;
    const updatedTodo = await TodoService.update(id, data);
    const index = todos.value.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      todos.value[index] = updatedTodo;
    }
    return updatedTodo;
  } catch (err: any) {
    error.value = err.response?.data?.detail || "Failed to update todo";
    console.error("Error updating todo:", err);
    throw err;
  }
};

const deleteTodo = async (id: number) => {
  try {
    error.value = null;
    await TodoService.delete(id);
    todos.value = todos.value.filter((todo) => todo.id !== id);
  } catch (err: any) {
    error.value = err.response?.data?.detail || "Failed to delete todo";
    console.error("Error deleting todo:", err);
    throw err;
  }
};

const toggleTodo = async (id: number) => {
  const todo = todos.value.find((t) => t.id === id);
  if (!todo) {
    console.error("Todo not found with ID:", id);
    return;
  }

  try {
    error.value = null;
    const updatedTodo = await TodoService.toggleComplete(id, !todo.completed);
    const index = todos.value.findIndex((t) => t.id === id);
    if (index !== -1) {
      todos.value[index].completed = updatedTodo.completed;
    }
    return updatedTodo;
  } catch (err: any) {
    error.value = err.response?.data?.detail || "Failed to toggle todo";
    console.error("Error toggling todo:", err);
    throw err;
  }
};

const clearCompleted = async () => {
  const completedIds = completedTodos.value.map((todo) => todo.id);

  try {
    error.value = null;
    await Promise.all(completedIds.map((id) => TodoService.delete(id)));
    todos.value = todos.value.filter((todo) => !todo.completed);
  } catch (err: any) {
    error.value =
      err.response?.data?.detail || "Failed to clear completed todos";
    console.error("Error clearing completed todos:", err);
    throw err;
  }
};

const clearError = () => {
  error.value = null;
};

// Export the store
export function useTodoStore() {
  return {
    // State
    todos,
    isLoading,
    error,

    // Computed
    completedTodos,
    activeTodos,
    todosCount,
    completedCount,
    activeCount,

    // Actions
    loadTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    clearCompleted,
    clearError,
  };
}
