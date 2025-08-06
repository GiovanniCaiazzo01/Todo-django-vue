<template>
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
           <ErrorState :error :clearError/>
            <!-- Todo List -->
            <TodoList />

            <!-- Empty State -->
            <EmptyState :isLoading :todosCount />
            </div>
    </main>
</template>

<script setup lang="ts">
import { useTodoStore } from '@/stores/todoStore'
import TodoList from './components/TodoList.vue';
import EmptyState from './components/EmptyState.vue';
import ErrorState from './components/ErrorState.vue';

// Todo state
const {
  isLoading,
  error,
  todosCount,
  clearError,
} = useTodoStore()
</script>