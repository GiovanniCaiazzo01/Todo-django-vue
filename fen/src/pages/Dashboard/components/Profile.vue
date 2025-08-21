<template>
    <!-- Profilo -->
    <div class="card">
        <div class="card-header">
            <h2 class="text-lg font-medium">Profilo</h2>
        </div>
        <div class="card-body space-y-2">
            <div class="text-sm">
                <p class="text-gray-500 dark:text-gray-400">Nome</p>
                <p class="font-medium">
                    {{ firstName || "—" }}
                    {{ lastName || "" }}
                </p>
            </div>
            <div class="text-sm">
                <p class="text-gray-500 dark:text-gray-400">Username</p>
                <p class="font-medium">{{ username || "—" }}</p>
            </div>
            <div class="text-sm">
                <p class="text-gray-500 dark:text-gray-400">Email</p>
                <p class="font-medium">{{ email || "—" }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { User } from "@/types/user";

withDefaults(
    defineProps<Pick<User, "username" | "firstName" | "lastName" | "email">>(),
    {
        username: "",
        firstName: "",
        lastName: "",
        email: "",
    },
);
</script>
