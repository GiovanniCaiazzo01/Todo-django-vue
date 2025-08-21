<template>
    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="card">
            <div class="card-body">
                <p class="text-sm text-gray-500 dark:text-gray-400">Attive</p>
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
                <p class="text-sm text-gray-500 dark:text-gray-400">Totali</p>
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
</template>
<script setup lang="ts">
interface QuickStatsProps {
    activeCount?: number;
    completedCount?: number;
    totalCount?: number;
    tokenShort?: string;
}

withDefaults(defineProps<QuickStatsProps>(), {
    activeCount: 0,
    totalCount: 0,
    completedCount: 0,
    tokenShort: "",
});
</script>
