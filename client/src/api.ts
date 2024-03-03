import { TodoData } from "./TodoEvent";
import { http } from "./http";
export const getList = async () => {
  return await http.get("/todos");
};
export const addTodo = async (data: Pick<TodoData, "content">) => {
  return await http.post("/todos", data);
};
export const removeTodo = async (id: number) => {
  return await http.delete(`/todos/${id}`);
};
export const updateTodo = async (id: number) => {
  return await http.put(`/todos/${id}`);
};
