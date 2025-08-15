export interface Todo {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
  is_overdue: boolean;
}

export type CreateTodoData = Pick<Todo, "title" | "description">;

export type UpdateTodoData = Pick<Todo, "completed">;
