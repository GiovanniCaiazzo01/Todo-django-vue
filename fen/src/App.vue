<template>
    <div id="app" class="min-h-dvh flex flex-col">
        <BaseLayout>
            <!-- Navigation -->
            <template v-if="isSlotVisible" #header>
                <Navigation
                    :active-count="store.activeCount"
                    :completed-count="store.completedCount"
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
                    :total-count="store.todosCount"
                    :completed-count="store.completedCount"
                    @clear-completed="handleClearCompleted"
                />
            </template>
        </BaseLayout>
    </div>
</template>

<script setup lang="ts">
import { useTheme } from "./composables/useTheme";
import { useTodoStore } from "./stores/todoStore/todoStore";
import { useRoute } from "vue-router";
import BaseLayout from "./layouts/BaseLayout.vue";
import Navigation from "./layouts/Navigation.vue";
import Footer from "./layouts/Footer.vue";
import { computed } from "vue";
import ApiErrorToaster from "./components/ApiErrorToaster.vue";

// Initialize theme
const { initTheme } = useTheme();
initTheme();

const route = useRoute();
const isSlotVisible = computed(() =>
    route.path.includes("/auth") ? false : true,
);

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
