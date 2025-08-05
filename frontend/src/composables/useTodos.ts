import { ref, computed } from 'vue'
import { TodoService } from '@/services/api'
import type { Todo, CreateTodoData, UpdateTodoData } from '@/types'

export function useTodos() {
  const todos = ref<Todo[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Computed properties
  const completedTodos = computed(() => todos.value.filter(todo => todo.completed))
  const activeTodos = computed(() => todos.value.filter(todo => !todo.completed))
  const todosCount = computed(() => todos.value.length)
  const completedCount = computed(() => completedTodos.value.length)
  const activeCount = computed(() => activeTodos.value.length)

  // Load all todos
  const loadTodos = async () => {
    try {
      isLoading.value = true
      error.value = null
      const response = await TodoService.getAll()
      todos.value = response.results
    } catch (err: any) {
      error.value = err.response?.data?.detail || 'Failed to load todos'
      console.error('Error loading todos:', err)
    } finally {
      isLoading.value = false
    }
  }

  // Create new todo
  const createTodo = async (data: CreateTodoData) => {
    try {
      error.value = null
      const newTodo = await TodoService.create(data)
      todos.value.unshift(newTodo) // Add to beginning of list
      return newTodo
    } catch (err: any) {
      error.value = err.response?.data?.detail || 'Failed to create todo'
      console.error('Error creating todo:', err)
      throw err
    }
  }

  // Update existing todo
  const updateTodo = async (id: number, data: UpdateTodoData) => {
    try {
      error.value = null
      const updatedTodo = await TodoService.update(id, data)
      const index = todos.value.findIndex(todo => todo.id === id)
      if (index !== -1) {
        todos.value[index] = updatedTodo
      }
      return updatedTodo
    } catch (err: any) {
      error.value = err.response?.data?.detail || 'Failed to update todo'
      console.error('Error updating todo:', err)
      throw err
    }
  }

  // Delete todo
  const deleteTodo = async (id: number) => {
    try {
      error.value = null
      await TodoService.delete(id)
      todos.value = todos.value.filter(todo => todo.id !== id)
    } catch (err: any) {
      error.value = err.response?.data?.detail || 'Failed to delete todo'
      console.error('Error deleting todo:', err)
      throw err
    }
  }

  // Toggle todo completion
  const toggleTodo = async (id: number) => {
    const todo = todos.value.find(t => t.id === id)
    if (!todo) return

    try {
      error.value = null
      const updatedTodo = await TodoService.toggleComplete(id, !todo.completed)
      const index = todos.value.findIndex(t => t.id === id)
      if (index !== -1) {
        todos.value[index] = updatedTodo
      }
      return updatedTodo
    } catch (err: any) {
      error.value = err.response?.data?.detail || 'Failed to toggle todo'
      console.error('Error toggling todo:', err)
      throw err
    }
  }

  // Clear completed todos
  const clearCompleted = async () => {
    const completedIds = completedTodos.value.map(todo => todo.id)
    
    try {
      error.value = null
      await Promise.all(completedIds.map(id => TodoService.delete(id)))
      todos.value = todos.value.filter(todo => !todo.completed)
    } catch (err: any) {
      error.value = err.response?.data?.detail || 'Failed to clear completed todos'
      console.error('Error clearing completed todos:', err)
      throw err
    }
  }

  // Clear error
  const clearError = () => {
    error.value = null
  }

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
  }
}
