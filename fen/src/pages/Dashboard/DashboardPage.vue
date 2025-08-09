<template #main>
    <div>hey, {{ token }}</div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
const token = localStorage.getItem("authtoken");
if (!token) router.push("/");
</script>
