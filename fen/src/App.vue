<template>
    <div id="app" class="min-h-screen flex flex-col">
        <BaseLayout>
            <!-- Navigation -->
            <template #header>
                <Navigation
                    :active-count="store.activeCount"
                    :completed-count="store.completedCount"
                />
            </template>

            <!-- Main Content -->
            <template #main>
                <TodoPage />
            </template>

            <!-- Footer -->
            <template #footer>
                <Footer
                    :total-count="store.todosCount"
                    :completed-count="store.completedCount"
                    @clear-completed="handleClearCompleted"
                />
            </template>
        </BaseLayout>
    </div>
</template>

<script setup lang="ts">
import Navigation from "./layouts/Navigation.vue";
import Footer from "./layouts/Footer.vue";
import { useTheme } from "./composables/useTheme";
import BaseLayout from "./layouts/BaseLayout.vue";
import TodoPage from "./pages/Todo/TodoPage.vue";
import { useTodoStore } from "./stores/todoStore/todoStore";

// Initialize theme
const { initTheme } = useTheme();
initTheme();

// Todo state
const store = useTodoStore();

const handleClearCompleted = async () => {
    await store.clearCompleted();
};
</script>

<style>
#app {
    font-family: "Inter", system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
</style>
