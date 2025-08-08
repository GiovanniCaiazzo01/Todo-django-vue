<template>
    <div class="max-w-7xl mx-auto p-6">
        <!-- Todo Input Form -->
        <form @submit.prevent="handleCreate" class="mb-4">
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
        </form>

        <!-- Todo List -->
        <ul class="space-y-3">
            <li
                v-for="todo in store.todos"
                :key="todo.id"
                class="card flex justify-between p-4"
            >
                <div class="flex items-center">
                    <input
                        type="checkbox"
                        class="h-4 w-4 text-primary-600"
                        :checked="todo.completed"
                        @change="() => toggle(todo)"
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
                <button class="btn btn-danger" @click="() => remove(todo)">
                    Delete
                </button>
            </li>
        </ul>

        <!-- Loading spinner -->
        <div v-if="store.isLoading" class="mt-4 flex justify-center">
            <div class="loading w-6 h-6"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useTodoStore } from "@/stores/todoStore/todoStore";
import type { Todo } from "@/types/todo";

const store = useTodoStore();
const formData = ref({ title: "" });

onMounted(store.loadTodos);

const handleCreate = async () => {
    if (!formData.value.title) return;
    await store.createTodo({
        title: formData.value.title,
    });
    formData.value.title = "";
};

const toggle = async (todo: Todo) => {
    await store.toggleTodo(todo.id);
};

const remove = async (todo: Todo) => {
    await store.deleteTodo(todo.id);
};
</script>

<style scoped>
.line-through {
    text-decoration: line-through;
}
</style>
