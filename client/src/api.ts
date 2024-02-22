import { TodoData } from "./TodoEvent";
import { http } from "./http";
export const getList = async () => {
  return await http.get("/todos");
};
export const addTodo = async (data: Pick<TodoData, "content">) => {
  return await http.post("/todos", data);
};
