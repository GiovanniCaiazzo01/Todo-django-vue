<template #main>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <!-- Header: welcome -->
        <div class="flex flex-col gap-2">
            <h1 class="text-2xl font-semibold text-balance">
                Benvenuto,
                <span class="text-primary-600">{{ displayName }}</span> 👋
            </h1>
            <p class="text-sm text-gray-600 dark:text-gray-400">
                Autenticato come
                <span class="font-medium">{{ user.email || "—" }}</span>
            </p>
        </div>

        <!-- Quick stats -->
        <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div class="card">
                <div class="card-body">
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                        Attive
                    </p>
                    <p class="mt-1 text-3xl font-semibold">{{ activeCount }}</p>
                </div>
            </div>

            <div class="card">
                <div class="card-body">
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                        Completate
                    </p>
                    <p class="mt-1 text-3xl font-semibold">
                        {{ completedCount }}
                    </p>
                </div>
            </div>

            <div class="card">
                <div class="card-body">
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                        Totali
                    </p>
                    <p class="mt-1 text-3xl font-semibold">{{ totalCount }}</p>
                </div>
            </div>

            <div class="card">
                <div class="card-body">
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                        Token (debug)
                    </p>
                    <p class="mt-1 font-mono text-xs truncate">
                        {{ tokenShort || "—" }}
                    </p>
                </div>
            </div>
        </section>

        <!-- Actions -->
        <section class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="card">
                <div class="card-header">
                    <h2 class="text-lg font-medium">Azioni rapide</h2>
                </div>
                <div class="card-body">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button class="btn btn-primary" @click="goToTodos">
                            Nuovo Todo
                        </button>
                        <button class="btn btn-secondary" @click="goToTodos">
                            Vedi tutti
                        </button>
                        <button class="btn btn-secondary" @click="goToSettings">
                            Impostazioni
                        </button>
                        <button class="btn btn-danger" @click="signOut">
                            Esci
                        </button>
                    </div>
                </div>
            </div>

            <!-- Profilo -->
            <div class="card">
                <div class="card-header">
                    <h2 class="text-lg font-medium">Profilo</h2>
                </div>
                <div class="card-body space-y-2">
                    <div class="text-sm">
                        <p class="text-gray-500 dark:text-gray-400">Nome</p>
                        <p class="font-medium">
                            {{ user.firstName || "—" }}
                            {{ user.lastName || "" }}
                        </p>
                    </div>
                    <div class="text-sm">
                        <p class="text-gray-500 dark:text-gray-400">Username</p>
                        <p class="font-medium">{{ user.username || "—" }}</p>
                    </div>
                    <div class="text-sm">
                        <p class="text-gray-500 dark:text-gray-400">Email</p>
                        <p class="font-medium">{{ user.email || "—" }}</p>
                    </div>
                </div>
            </div>

            <!-- Suggerimenti / placeholder attività recenti -->
            <div class="card">
                <div class="card-header">
                    <h2 class="text-lg font-medium">Attività recente</h2>
                </div>
                <div class="card-body text-sm text-gray-600 dark:text-gray-400">
                    <p>
                        Collega qui la tua lista “recenti” (es. ultimi todo
                        aggiornati) se il tuo store espone un array di elementi.
                        Per ora, usa il pulsante “Vedi tutti” per gestirli dalla
                        pagina principale.
                    </p>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { Navlinks } from "@/data/navigation";
import { useUserStore } from "@/stores/userStore/userStore";

// (opzionale) se hai uno store dei todo con questi getter:
import { useTodoStore } from "@/stores/todoStore/todoStore"; // adatta il path se diverso

const router = useRouter();

// USER
const userStore = useUserStore();
const { user, token, isAuth } = storeToRefs(userStore);

const displayName = computed(() => {
    return user.value.firstName || user.value.username || "utente";
});

const tokenShort = computed(() =>
    token.value ? `${token.value.slice(0, 8)}…${token.value.slice(-4)}` : "",
);

// TODO STATS (usiamo i getter già presenti nella tua app)
const todoStore = useTodoStore?.() as any; // evita errori se il path è diverso
const { activeCount = computed(() => 0), completedCount = computed(() => 0) } =
    todoStore ? storeToRefs(todoStore) : ({} as any);

const totalCount = computed(
    () => (activeCount.value ?? 0) + (completedCount.value ?? 0),
);

// ACTIONS
const goToTodos = () => router.push(Navlinks.landingPage.route);
const goToSettings = () => {
    // se/quando avrai una pagina impostazioni
    // router.push({ name: 'settings' })
    // per ora porto alla home
    router.push(Navlinks.landingPage.route);
};

const signOut = () => {
    // azzera lo store (e, se usi persistedstate, si “svuota” anche lo storage)
    userStore.$reset();
    // se salvi anche token altrove, puliscilo:
    localStorage.removeItem("authtoken");
    router.push({ name: Navlinks.signIn.name });
};
</script>
