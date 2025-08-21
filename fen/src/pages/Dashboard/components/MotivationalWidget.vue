<template>
    <!-- Widget motivazionale -->
    <div class="card">
        <div class="card-body">
            <p class="text-sm text-gray-500 dark:text-gray-400">Suggerimento</p>
            <p class="mt-1 text-base">
                <span v-if="activeCount === 0"
                    >Ottimo lavoro, sei in pari! 🎉</span
                >
                <span v-else-if="activeCount < 5">
                    Ci sei quasi: {{ activeCount }}
                    {{ activeCount === 1 ? "task" : "task" }} rimanenti 💪
                </span>
                <span v-else>
                    Hai ancora {{ activeCount }} task in sospeso: inizia da
                    quelli creati da più tempo ⏳
                </span>
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
interface MotivationalWidgetProps {
    activeCount?: number;
}

withDefaults(defineProps<MotivationalWidgetProps>(), {
    activeCount: 0,
});
</script>
