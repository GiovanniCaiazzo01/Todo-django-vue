<template #main>
    <div>hey, {{ userStore.token }}</div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/userStore/userStore";

const userStore = useUserStore();
</script>
