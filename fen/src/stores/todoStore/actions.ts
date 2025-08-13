import { TodoService } from "@/services/todo/todoApi";
import type { useTodoStore } from "./todoStore";
import type { CreateTodoData, UpdateTodoData } from "@/types/todo";

async function loadTodos(this: ReturnType<typeof useTodoStore>) {
  try {
    this.isLoading = true;
    this.error = null;
    const { results } = await TodoService.getAll();
    console.log("todos lista: ", await TodoService.getAll());
    this.todos = results;
  } catch (err: any) {
    console.log({ err });
    this.error = "Failed to load todos";
    console.error("Error loading todos:", err);
  } finally {
    this.isLoading = false;
  }
}

async function createTodo(
  this: ReturnType<typeof useTodoStore>,
  data: CreateTodoData,
) {
  try {
    this.error = null;
    const newTodo = await TodoService.create(data);
    this.todos.unshift(newTodo);
    return newTodo;
  } catch (err: any) {
    this.error = "Failed to create todo";
    console.error("Error creating todo:", err);
    throw err;
  }
}

async function updateTodo(
  this: ReturnType<typeof useTodoStore>,
  id: number,
  data: UpdateTodoData,
) {
  try {
    this.error = null;
    const updatedTodo = await TodoService.update(id, data);
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      this.todos[index] = updatedTodo;
    }
    return updatedTodo;
  } catch (err: any) {
    this.error = "Failed to update todo";
    console.error("Error updating todo:", err);
    throw err;
  }
}

async function deleteTodo(this: ReturnType<typeof useTodoStore>, id: number) {
  try {
    this.error = null;
    await TodoService.delete(id);
    this.todos = this.todos.filter((todo) => todo.id !== id);
  } catch (err: any) {
    this.error = "Failed to delete todo";
    console.error("Error deleting todo:", err);
    throw err;
  }
}

async function toggleTodo(this: ReturnType<typeof useTodoStore>, id: number) {
  const todo = this.todos.find((t) => t.id === id);
  if (!todo) {
    console.error("Todo not found with ID:", id);
    return;
  }

  try {
    this.error = null;
    const updatedTodo = await TodoService.toggleComplete(id, !todo.completed);
    const index = this.todos.findIndex((t) => t.id === id);
    if (index !== -1) {
      this.todos[index].completed = updatedTodo.completed;
    }
    return updatedTodo;
  } catch (err: any) {
    this.error = "Failed to toggle todo";
    console.error("Error toggling todo:", err);
    throw err;
  }
}

async function clearCompleted(this: ReturnType<typeof useTodoStore>) {
  const completedIds = this.completedTodos.map((todo) => todo.id);

  try {
    this.error = null;
    await Promise.all(completedIds.map((id) => TodoService.delete(id)));
    this.todos = this.todos.filter((todo) => !todo.completed);
  } catch (err: any) {
    this.error = "Failed to clear completed todos";
    console.error("Error clearing completed todos:", err);
    throw err;
  }
}

function clearError(this: ReturnType<typeof useTodoStore>) {
  this.error = null;
}

export {
  loadTodos,
  createTodo,
  updateTodo,
  toggleTodo,
  deleteTodo,
  clearError,
  clearCompleted,
};
