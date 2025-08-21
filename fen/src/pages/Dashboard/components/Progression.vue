<template>
    <!-- Avanzamento -->
    <div class="card lg:col-span-2">
        <div class="card-body">
            <div class="flex items-center justify-between">
                <p class="text-sm text-gray-500 dark:text-gray-400">
                    Avanzamento
                </p>
                <p class="text-sm">{{ completionRate }}%</p>
            </div>
            <div class="mt-2">
                <div
                    class="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700"
                >
                    <div
                        class="bg-primary-600 h-2 rounded-full transition-all"
                        :style="{ width: `${completionRate}%` }"
                    ></div>
                </div>
                <p class="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    {{ completedCount }} su {{ totalCount }} completati
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface ProgressionProps {
    completionRate?: number;
    completedCount?: number;
    totalCount?: number;
}

const props = withDefaults(defineProps<ProgressionProps>(), {
    completionRate: 0,
    totalCount: 0,
    completedCount: 0,
});

// Progress bar
const completionRate = computed(() => {
    const total = props.totalCount;
    return total > 0 ? Math.round((props.completedCount / total) * 100) : 0;
});
</script>
