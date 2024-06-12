import { http } from "../http";
export const uploadFile = async (config: RequestInit) => {
  return await http.post<string>("/upload/file", config);
};
export const mergeFile = async (data: any) => {
  return await http.post<string>("/upload/merge", data);
};
export const checkFile = async (name: string) => {
  return await http.get<string[]>(`/upload/check/${name}`);
};
