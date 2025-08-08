export type Theme = "light" | "dark";

export interface AppState {
  theme: Theme;
  isLoading: boolean;
}
