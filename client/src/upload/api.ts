import { http } from "../http";
export const uploadFile = async (data: any, config: RequestInit) => {
  return await http.post<any>("/upload/file", data, config);
};
export const mergeFile = async (data: any) => {
  return await http.post<any>("/upload/merge", data);
};
export const checkFile = async (name: string) => {
  return await http.get<any>(`/upload/check/${name}`);
};
