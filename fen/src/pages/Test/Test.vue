<template #main>
    <div>hey, this is the route: {{ route.name }}</div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
const route = useRoute();
</script>
