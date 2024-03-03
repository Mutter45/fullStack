interface Result<T> {
  data: T;
  error: boolean;
  message: string;
}
const baseUrl = "http://localhost:8888";
const baseConfig = {
  headers: {
    "Content-Type": "application/json",
  },
};
const useFetch = <T>(url: string, config: RequestInit): Promise<Result<T>> =>
  fetch(`${baseUrl + url}`, { ...config, ...baseConfig })
    .then((res) => {
      if (res.status === 400) {
        alert("请求错误");
        return {
          error: true,
          message: "请求错误",
        };
      }
      return res.json();
    })
    .then((data) => {
      return {
        data,
        error: false,
        message: "",
      };
    });
export const http = {
  get: <T>(url: string) => useFetch<T>(url, { method: "GET" }),
  post: <T>(url: string, data: any = {}) =>
    useFetch<T>(url, { method: "POST", body: JSON.stringify(data) }),
  delete: <T>(url: string, data: any = {}) =>
    useFetch<T>(url, { method: "DELETE", body: JSON.stringify(data) }),
  put: <T>(url: string, data: any = {}) =>
    useFetch<T>(url, { method: "PUT", body: JSON.stringify(data) }),
};
