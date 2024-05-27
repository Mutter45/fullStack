import { TodoData } from "./typing";
import { http } from "../http";
export const getList = async () => {
  return await http.get<TodoData[]>("/todos");
};
export const addTodo = async (data: Pick<TodoData, "content">) => {
  return await http.post<TodoData>("/todos", data);
};
export const removeTodo = async (id: number) => {
  return await http.delete<{ id: string }>(`/todos/${id}`);
};
export const updateTodo = async (id: number) => {
  return await http.put<{ id: string }>(`/todos/${id}`);
};
