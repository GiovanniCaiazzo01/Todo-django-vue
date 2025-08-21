import { useTodoStore } from "@/stores/todoStore/todoStore";
import { useUserStore } from "@/stores/userStore/userStore";
import type { CreateTodoData, Todo, UpdateTodoData } from "@/types/todo";
import { computed, ref } from "vue";

const STORAGE_KEY = "todos";
const guestTodos = ref<Todo[]>([]);

export function useTodos() {
  const userStore = useUserStore();
  const todoStore = useTodoStore();

  const isAuth = computed(() => userStore.isAuth);

  const todos = computed<Todo[]>(() =>
    isAuth.value ? todoStore.todos : guestTodos.value,
  );

  const completedTodos = computed<number>(
    () => todos.value.filter((todo) => todo.completed).length,
  );

  const activeTodos = computed<number>(
    () => todos.value.filter((todo) => !todo.completed).length,
  );

  const totalTodos = computed<number>(() => todos.value.length);

  async function loadTodosTasks() {
    if (userStore.isAuth) return await todoStore.loadTodos();
    return loadTodoGuest();
  }

  function loadTodoGuest() {
    const storedTodos = localStorage.getItem(STORAGE_KEY);
    if (!storedTodos) {
      guestTodos.value = [];
      return [];
    }
    const parsedTodos = JSON.parse(storedTodos);
    guestTodos.value = parsedTodos;
    return parsedTodos;
  }

  async function createTodoTask(data: CreateTodoData) {
    if (userStore.isAuth) return await todoStore.createTodo(data);
    return createTodoGuest(data);
  }

  function createTodoGuest(data: CreateTodoData): Todo[] {
    const storedTodos = localStorage.getItem(STORAGE_KEY);
    const currentTodos = storedTodos ? JSON.parse(storedTodos) : [];
    const updatedTodos = [
      ...currentTodos,
      { id: guestTodos.value.length + 1, completed: false, ...data },
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTodos));
    guestTodos.value = updatedTodos;
    return updatedTodos;
  }
  async function updateTodoTask(id: Todo["id"], data: UpdateTodoData) {
    console.log({ id, data });
    if (userStore.isAuth) return await todoStore.updateTodo(id, data);
    return updateTodoGuest(id, data);
  }

  async function updateTodoGuest(id: Todo["id"], data: UpdateTodoData) {
    const storedTodos = localStorage.getItem(STORAGE_KEY);
    const currentTodos = storedTodos ? JSON.parse(storedTodos) : [];
    const updatedTodos = currentTodos.map((todo: Todo) =>
      todo.id === id ? { ...todo, ...data } : todo,
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTodos));
    guestTodos.value = updatedTodos;
  }

  async function deleteTodoTask(id: Todo["id"]) {
    if (userStore.isAuth) return await todoStore.deleteTodo(id);
    return deleteTodoGuest(id);
  }

  async function deleteTodoGuest(id: Todo["id"]) {
    const storedTodos = localStorage.getItem(STORAGE_KEY);
    const currentTodos = storedTodos ? JSON.parse(storedTodos) : [];
    const updatedTodos = currentTodos.filter((todo: Todo) => todo.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTodos));
    guestTodos.value = updatedTodos;
  }

  async function clearCompletedTodoTask() {
    if (userStore.isAuth) return await todoStore.clearCompleted();
    return clearCompletedTodoGuest();
  }

  async function clearCompletedTodoGuest() {
    const storedTodos = localStorage.getItem(STORAGE_KEY);
    const currentTodos = storedTodos ? JSON.parse(storedTodos) : [];
    const updatedTodos = currentTodos.filter((todo: Todo) => !todo.completed);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTodos));
    guestTodos.value = updatedTodos;
  }

  return {
    loadTodosTasks,
    createTodoTask,
    updateTodoTask,
    deleteTodoTask,
    clearCompletedTodoTask,
    todos,
    isTodosLoading: todoStore.isLoading,
    completedTodos,
    totalTodos,
    activeTodos,
  };
}
