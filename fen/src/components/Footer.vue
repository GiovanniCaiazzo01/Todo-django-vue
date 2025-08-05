<template>
  <footer class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div class="flex flex-col sm:flex-row justify-between items-center">
        <div class="text-sm text-gray-600 dark:text-gray-400">
          <p>&copy; 2024 Todo App. Built with Vue.js & Django.</p>
        </div>
        
        <div class="flex items-center space-x-4 mt-2 sm:mt-0">
          <button
            v-if="completedCount > 0"
            @click="$emit('clear-completed')"
            class="text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-200"
          >
            Clear {{ completedCount }} completed
          </button>
          
          <div class="text-sm text-gray-500 dark:text-gray-500">
            Total: {{ totalCount }}
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
interface Props {
  totalCount?: number
  completedCount?: number
}

withDefaults(defineProps<Props>(), {
  totalCount: 0,
  completedCount: 0,
})

defineEmits<{
  'clear-completed': []
}>()
</script>
