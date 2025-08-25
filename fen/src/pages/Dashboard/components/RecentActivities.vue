<template>
    <div class="card">
        <div class="card-header">
            <h2 class="text-lg font-medium">Attività recente</h2>
        </div>
        <div class="card-body text-sm">
            <div v-if="isTodosLoading" class="flex justify-center">
                <div class="loading w-6 h-6"></div>
            </div>

            <ul v-else class="space-y-3">
                <li
                    v-for="todo in recentTodos"
                    :key="todo.id"
                    class="flex items-start justify-between"
                >
                    <div class="min-w-0">
                        <p
                            class="truncate"
                            :class="{
                                'line-through text-gray-500 dark:text-gray-400':
                                    todo.completed,
                            }"
                        >
                            {{ todo.title }}
                        </p>
                        <p class="text-xs text-gray-400">
                            {{ formatDate(todo.updated_at || todo.created_at) }}
                        </p>
                    </div>
                    <span
                        class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium"
                        :class="
                            todo.completed
                                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                        "
                    >
                        {{ todo.completed ? "Fatto" : "Aperto" }}
                    </span>
                </li>
            </ul>

            <p
                v-if="recentTodos.length === 0"
                class="text-gray-500 dark:text-gray-400"
            >
                Nessuna attività recente. Crea un nuovo todo!
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Todo } from "@/types/todo";
import { formatDate } from "@/utils";
import { computed } from "vue";

interface RecentActivitiesProps {
    todos: Todo[];
    isTodosLoading: boolean;
}

const props = withDefaults(defineProps<RecentActivitiesProps>(), {
    todos: () => [],
    isTodosLoading: false,
});

const recentTodos = computed(() => {
    const arr = [...(props.todos || [])];
    arr.sort((a, b) => {
        const da = new Date(a.updated_at || a.created_at || 0).getTime();
        const db = new Date(b.updated_at || b.created_at || 0).getTime();
        return db - da;
    });
    return arr.slice(0, 6);
});
</script>
