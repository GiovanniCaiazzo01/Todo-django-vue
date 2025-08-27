<!-- Actions -->
<template>
    <div class="card">
        <div class="card-header">
            <h2 class="text-lg font-medium">Azioni rapide</h2>
        </div>
        <div class="card-body">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <RouterLink :to="{ name: Navlinks.profile.name }">
                    <button class="btn btn-secondary">Impostazioni</button>
                </RouterLink>

                <button
                    class="btn btn-danger"
                    @click="emitterAuth.emit('log-out')"
                >
                    Esci
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import { emitterAuth } from "@/lib/mitt/user";
import { Navlinks } from "@/data/navigation";
</script>
