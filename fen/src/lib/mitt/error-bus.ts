import mitt from "mitt";
import type { ApiErrorPayload } from "@/types/mitt";

export const errorBus = mitt<{ apiError: ApiErrorPayload }>();
