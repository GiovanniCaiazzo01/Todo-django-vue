<!-- Actions -->
<template>
    <div class="card">
        <div class="card-header">
            <h2 class="text-lg font-medium">Azioni rapide</h2>
        </div>
        <div class="card-body">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <RouterLink to="">
                    <button class="btn btn-primary">Nuovo Todo</button>
                </RouterLink>

                <RouterLink to="">
                    <button class="btn btn-secondary">Vedi tutti</button>
                </RouterLink>
                <RouterLink to="">
                    <button class="btn btn-secondary">Impostazioni</button>
                </RouterLink>
                <button class="btn btn-danger" @click="signOut">Esci</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Navlinks } from "@/data/navigation";
import { RouterLink, useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore/userStore";
const router = useRouter();
const userStore = useUserStore();

const signOut = () => {
    userStore.$reset();
    localStorage.removeItem("authtoken");
    router.push({ name: Navlinks.signIn.name });
};
</script>
