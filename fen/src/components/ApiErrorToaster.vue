<script setup lang="ts">
import { errorBus } from "@/lib/mitt/error-bus";
import type { ApiErrorPayload } from "@/types/mitt";
import { onMounted, onBeforeUnmount } from "vue";
import { useToast } from "vue-toastification";
const toast = useToast();

function onApiError(payload: ApiErrorPayload) {
    toast.error(payload.message);
}

onMounted(() => {
    errorBus.on("apiError", onApiError);
});
onBeforeUnmount(() => {
    errorBus.off("apiError", onApiError);
});
</script>
