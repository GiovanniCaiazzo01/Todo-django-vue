<template #main>
    <div>hey, {{ userStore.token }}</div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/userStore/userStore";
import { useTodoStore } from "@/stores/todoStore/todoStore";

const userStore = useUserStore();
const todoStore = useTodoStore();
console.log(todoStore.todos);
</script>
