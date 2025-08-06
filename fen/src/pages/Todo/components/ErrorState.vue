<template>
    <div v-if="error" class="max-w-7xl mx-auto px-6 mb-4">
        <div
            class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg"
        >
            <div class="flex justify-between items-center">
                <span>{{ error }}</span>
                <button
                    @click="clearError"
                    class="text-red-700 dark:text-red-400 hover:text-red-900 dark:hover:text-red-200"
                >
                    <X class="w-4 h-4" />
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { X } from "lucide-vue-next";

type ErrorStateProps = {
    error: string | null;
    clearError: () => void;
};

const { error, clearError } = defineProps<ErrorStateProps>();
</script>
