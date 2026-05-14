import axios from "axios"

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})

export function request<T>(config: {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
  url: string
  data?: object
  params?: object
}): Promise<T> {
  return axiosInstance(config).then((res) => res.data)
}
