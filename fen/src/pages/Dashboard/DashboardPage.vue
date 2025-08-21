<template #main>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <Header :username="userName" :email />
        <QuickStats
            :active-count="activeTodos"
            :completed-count="completedTodos"
            :token-short
        />

        <section class="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Progression
                :completed-count="completedTodos"
                :total-count="totalTodos"
            />
            <MotivationalWidget :active-count="activeTodos" />
        </section>

        <section class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Actions />
            <Profile :username="userName" :first-name :last-name :email />
            <RecentActivities />
        </section>

        <!-- TodoListForm integrato -->
        <section class="grid grid-cols-1 gap-4">
            <div class="card">
                <div class="card-header">
                    <h2 class="text-lg font-medium">I tuoi Todo</h2>
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                        Aggiungi e gestisci i task direttamente dalla dashboard.
                    </p>
                </div>
                <div class="card-body">
                    <TodoListForm />
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/userStore/userStore";
import { useTodos } from "@/composables/useTodos";

// Componente Todo (integrazione diretta)
import TodoListForm from "@/pages/Todo/components/TodoList.vue"; // adatta il path
import QuickStats from "./components/QuickStats.vue";
import Header from "./components/Header.vue";
import Progression from "./components/Progression.vue";
import MotivationalWidget from "./components/MotivationalWidget.vue";
import Actions from "./components/Actions.vue";
import Profile from "./components/Profile.vue";
import RecentActivities from "./components/RecentActivities.vue";

const { loadTodosTasks, activeTodos, completedTodos, totalTodos } = useTodos();

const userStore = useUserStore();
const { user, token } = storeToRefs(userStore);

const userName = computed(() => {
    return user.value.username;
});

const firstName = computed(() => {
    return user.value.firstName || "";
});

const lastName = computed(() => {
    return user.value.lastName || "";
});

const email = computed(() => {
    return user.value.email;
});

const tokenShort = computed(() =>
    token.value ? `${token.value.slice(0, 8)}…${token.value.slice(-4)}` : "",
);

onMounted(() => {
    loadTodosTasks();
});
</script>
