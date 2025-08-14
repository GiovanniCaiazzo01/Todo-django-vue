<template #main>
    <div class="h-screen flex w-full">
        <div class="h-full w-full flex flex-col items-center justify-center">
            <SignInForm />
        </div>
        <div
            class="hidden h-full w-full lg:flex lg:items-center lg:justify-center overflow-hidden"
        >
            <img
                :src="authSignInImg"
                loading="lazy"
                class="object-fit h-full w-full animate-kenburns"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import SignInForm from "./SignIn.form.vue";
import authSignInImg from "/assets/auth-sign-in.png";
</script>

<style scoped>
@keyframes kenburns {
    0% {
        transform: scale(1) translate(0, 0);
    }
    50% {
        transform: scale(1.05) translate(-1%, -1%);
    }
    100% {
        transform: scale(1) translate(0, 0);
    }
}

.animate-kenburns {
    animation: kenburns 10s ease-in-out infinite;
    transition: transform 0.5s ease;
    will-change: transform;
}
</style>
