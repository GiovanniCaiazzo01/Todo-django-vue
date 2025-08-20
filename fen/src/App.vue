<template>
    <div id="app" class="min-h-dvh flex flex-col">
        <BaseLayout>
            <!-- Navigation -->
            <template v-if="isSlotVisible" #header>
                <Navigation
                    :active-count="todos.totalTodos.value"
                    :completed-count="todos.completedTodos.value"
                />
            </template>

            <!-- Main Content -->
            <template #main>
                <Transition>
                    <RouterView />
                </Transition>
                <ApiErrorToaster />
            </template>

            <!-- Footer -->
            <template v-if="isSlotVisible" #footer>
                <Footer
                    :total-count="todos.totalTodos.value"
                    :completed-count="todos.completedTodos.value"
                    @clear-completed="handleClearCompleted"
                />
            </template>
        </BaseLayout>
    </div>
</template>

<script setup lang="ts">
import { useTheme } from "./composables/useTheme";
import { useRoute } from "vue-router";
import BaseLayout from "./layouts/BaseLayout.vue";
import Navigation from "./layouts/Navigation.vue";
import Footer from "./layouts/Footer.vue";
import { computed } from "vue";
import ApiErrorToaster from "./components/ApiErrorToaster.vue";
import { useTodos } from "./composables/useTodos";

// Initialize theme
const { initTheme } = useTheme();
initTheme();

const route = useRoute();
const isSlotVisible = computed(() =>
    route.path.includes("/auth") ? false : true,
);

const todos = useTodos();

const handleClearCompleted = async () => {
    await todos.clearCompletedTodoTask();
};
</script>

<style>
#app {
    font-family: "Inter", system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
</style>
