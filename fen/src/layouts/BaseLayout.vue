<!-- src/layouts/BaseLayout.vue -->
<template>
    <!-- Wrapper verticale -->
    <div class="flex flex-col flex-1">
        <!-- Header -->
        <slot name="header" />
        <!-- Main -->
        <div class="flex-1 flex flex-col">
            <slot name="main" />
        </div>

        <!-- Footer -->
        <slot name="footer" />
    </div>
</template>
