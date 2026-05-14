import axios from "axios"

export const TOKEN_KEY = "access_token"

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY)
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export function request<T>(config: {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
  url: string
  data?: object
  params?: object
}): Promise<T> {
  return axiosInstance(config).then((res) => res.data)
}

export function getApiError(error: unknown, fallback: string): string | null {
  if (!error) return null
  const msg = (error as { response?: { data?: { message?: string } } })?.response?.data?.message
  return msg ?? fallback
}
