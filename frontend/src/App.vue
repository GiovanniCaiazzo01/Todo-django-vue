<template>
  <div id="app" class="min-h-screen flex flex-col">
    <!-- Navigation -->
    <Navigation 
      :active-count="activeCount" 
      :completed-count="completedCount" 
    />

    <!-- Main Content -->
    <main class="flex-1 bg-gray-50 dark:bg-gray-900">
      <div class="container mx-auto">
        <!-- Header -->
        <div class="text-center py-8">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            My Todo List
          </h2>
          <p class="text-gray-600 dark:text-gray-400">
            Stay organized and get things done
          </p>
        </div>

        <!-- Error Display -->
        <div v-if="error" class="max-w-7xl mx-auto px-6 mb-4">
          <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg">
            <div class="flex justify-between items-center">
              <span>{{ error }}</span>
              <button @click="clearError" class="text-red-700 dark:text-red-400 hover:text-red-900 dark:hover:text-red-200">
                <X class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <!-- Todo List -->
        <TodoList />

        <!-- Empty State -->
        <div v-if="!isLoading && todosCount === 0" class="text-center py-12">
          <div class="text-gray-400 dark:text-gray-600 mb-4">
            <CheckCircle class="w-16 h-16 mx-auto mb-4 opacity-50" />
          </div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No todos yet
          </h3>
          <p class="text-gray-600 dark:text-gray-400">
            Add your first todo above to get started!
          </p>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <Footer 
      :total-count="todosCount" 
      :completed-count="completedCount"
      @clear-completed="handleClearCompleted"
    />
  </div>
</template>

<script setup lang="ts">
import { CheckCircle, X } from 'lucide-vue-next'
import Navigation from './components/Navigation.vue'
import Footer from './components/Footer.vue'
import TodoList from './components/TodoList.vue'
import { useTodoStore } from './stores/todoStore'
import { useTheme } from './composables/useTheme'

// Initialize theme
const { initTheme } = useTheme()
initTheme()

// Todo state
const {
  isLoading,
  error,
  todosCount,
  activeCount,
  completedCount,
  clearCompleted,
  clearError,
} = useTodoStore()

const handleClearCompleted = async () => {
  await clearCompleted()
}
</script>

<style>
#app {
  font-family: 'Inter', system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
