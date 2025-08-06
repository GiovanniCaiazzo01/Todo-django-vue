export interface Todo {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
  is_overdue: boolean;
}

export interface CreateTodoData {
  title: string;
  description?: string;
}

export interface UpdateTodoData {
  title?: string;
  description?: string;
  completed?: boolean;
}

export interface ApiResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface ApiError {
  detail?: string;
  [key: string]: any;
}

export type Theme = "light" | "dark";

export interface AppState {
  theme: Theme;
  isLoading: boolean;
}
