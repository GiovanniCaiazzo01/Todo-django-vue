import type { ApiResponse } from "@/types/api";
import api from "../api";
import type { CreateTodoData, Todo, UpdateTodoData } from "@/types/todo";

export class TodoService {
  private static readonly ENDPOINT = "/todos/";

  static async getAll(): Promise<ApiResponse<Todo>> {
    const response = await api.get<ApiResponse<Todo>>(this.ENDPOINT);
    return response.data;
  }

  static async getById(id: number): Promise<Todo> {
    const response = await api.get<Todo>(`${this.ENDPOINT}${id}/`);
    return response.data;
  }

  static async create(data: CreateTodoData): Promise<Todo> {
    const response = await api.post<Todo>(this.ENDPOINT, data);
    return response.data;
  }

  static async update(id: number, data: UpdateTodoData): Promise<Todo> {
    const response = await api.patch<Todo>(`${this.ENDPOINT}${id}/`, data);
    return response.data;
  }

  static async delete(id: number): Promise<void> {
    await api.delete(`${this.ENDPOINT}${id}/`);
  }

  static async toggleComplete(
    id: number,
    completed: boolean,
  ): Promise<Pick<Todo, "completed" | "description" | "title">> {
    return this.update(id, { completed });
  }
}
