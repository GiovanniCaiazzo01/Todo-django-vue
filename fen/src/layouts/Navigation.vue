<template>
  <nav class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo/Brand -->
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <h1 class="text-xl font-bold text-gray-900 dark:text-white">
              <span class="text-primary-600">Todo</span> App
            </h1>
          </div>
        </div>

        <!-- Right side - Theme toggle and stats -->
        <div class="flex items-center space-x-4">
          <!-- Todo stats -->
          <div class="hidden sm:flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
            <span>{{ activeCount }} active</span>
            <span>{{ completedCount }} completed</span>
          </div>

          <!-- Theme toggle button -->
          <button
            @click="toggleTheme"
            class="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors duration-200"
            :title="`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`"
          >
            <Sun v-if="theme === 'dark'" class="w-5 h-5 text-yellow-500" />
            <Moon v-else class="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { Sun, Moon } from 'lucide-vue-next'
import { useTheme } from '@/composables/useTheme'

interface Props {
  activeCount?: number
  completedCount?: number
}

withDefaults(defineProps<Props>(), {
  activeCount: 0,
  completedCount: 0,
})

const { theme, toggleTheme } = useTheme()
</script>
