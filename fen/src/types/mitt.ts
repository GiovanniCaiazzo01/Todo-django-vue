export type ApiErrorPayload = {
  status?: number;
  message: string;
  url?: string;
  correlationId?: string;
};
