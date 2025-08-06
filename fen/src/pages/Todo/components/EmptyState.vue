<template>
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

</template>

<script setup lang="ts">
type EmptyStateProps = {
    isLoading: boolean
    todosCount: number
}
withDefaults(defineProps<EmptyStateProps>(), {
 isLoading: false,
  todosCount: 0,
})


</script>


