const baseUrl = "http://localhost:8888";
const baseConfig = {
  headers: {
    "Content-Type": "application/json",
  },
};
const useFetch = (url: string, config: RequestInit) =>
  fetch(`${baseUrl}${url}`, { ...config, ...baseConfig })
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
  get: (url: string) => useFetch(url, { method: "GET" }),
  post: (url: string, data: any) =>
    useFetch(url, { method: "POST", body: JSON.stringify(data) }),
};
