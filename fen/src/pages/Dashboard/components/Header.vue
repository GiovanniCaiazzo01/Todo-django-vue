<template>
    <!-- Header: welcome -->
    <div class="flex flex-col gap-2">
        <h1 class="text-2xl font-semibold text-balance">
            Benvenuto,
            <span class="text-primary-600">{{ username }}</span> 👋
        </h1>
        <p class="text-sm text-gray-600 dark:text-gray-400">
            Autenticato come
            <span class="font-medium">{{ email || "—" }}</span>
        </p>
    </div>
</template>
<script setup lang="ts">
import type { User } from "@/types/user";

withDefaults(defineProps<Pick<User, "username" | "email">>(), {
    username: "",
    email: "",
});
</script>
