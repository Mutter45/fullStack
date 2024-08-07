import { http } from '../http';
export const uploadFile = async (config: RequestInit) => {
  return await http.post<string, RequestInit>('/upload/file', config);
};
export const mergeFile = async <T extends object = any>(data: T) => {
  return await http.post<string, T>('/upload/merge', data);
};
export const checkFile = async (name: string) => {
  return await http.get<string[]>(`/upload/check/${name}`);
};
