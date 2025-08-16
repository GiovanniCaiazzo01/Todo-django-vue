<template>
    <div class="max-w-7xl mx-auto p-6">
        <!-- Todo Input Form -->
        <form @submit.prevent="handleCreate" class="mb-4 space-y-3">
            <div class="flex items-center space-x-2">
                <input
                    v-model="formData.title"
                    class="input"
                    type="text"
                    placeholder="Add a new todo"
                    required
                />
                <button class="btn btn-primary" type="submit">Add</button>
            </div>
            <div>
                <textarea
                    v-model="formData.description"
                    class="input"
                    placeholder="Add a description (optional)"
                    rows="2"
                ></textarea>
            </div>
        </form>

        <!-- Todo List -->
        <ul class="space-y-3">
            <li
                v-for="todo in store.todos"
                :key="todo.id"
                class="card p-4 space-y-2"
            >
                <div class="flex justify-between items-center">
                    <div class="flex items-center">
                        <input
                            type="checkbox"
                            class="h-4 w-4 text-primary-600"
                            :checked="todo.completed"
                            @change="
                                () =>
                                    toggle({
                                        id: todo.id,
                                        completed: todo.completed,
                                    })
                            "
                        />
                        <div
                            :class="{
                                'line-through text-gray-500 dark:text-gray-400':
                                    todo.completed,
                                'ml-3': true,
                            }"
                        >
                            {{ todo.title }}
                        </div>
                    </div>
                    <button
                        class="btn btn-danger"
                        @click="() => remove(todo.id)"
                    >
                        Delete
                    </button>
                </div>

                <!-- Description -->
                <div
                    v-if="todo.description"
                    class="ml-7 text-sm text-gray-600 dark:text-gray-400"
                >
                    {{ todo.description }}
                </div>

                <!-- Created date -->
                <div class="ml-7 text-xs text-gray-400">
                    Created: {{ formatDate(todo.created_at) }}
                </div>
            </li>
        </ul>

        <!-- Loading spinner -->
        <div v-if="store.isLoading" class="mt-4 flex justify-center">
            <div class="loading w-6 h-6"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useTodoStore } from "@/stores/todoStore/todoStore";
import type { Todo } from "@/types/todo";
import { onMounted } from "vue";
import { ref } from "vue";

const store = useTodoStore();
onMounted(store.loadTodos);

// Form data
const formData = ref({
    title: "",
    description: "",
});

// Create new todo
function handleCreate() {
    if (!formData.value.title) return;
    store.createTodo({
        title: formData.value.title,
        description: formData.value.description || "",
    });
    formData.value.title = "";
    formData.value.description = "";
}

// Toggle completed
function toggle(todo: Pick<Todo, "id" | "completed">) {
    store.updateTodo(todo.id, { completed: !todo.completed });
}

// Remove todo
function remove(todoId: Todo["id"]) {
    store.deleteTodo(todoId);
}

// Format date
function formatDate(dateStr: string) {
    const date = new Date(dateStr);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
}
</script>
