import axios, { type InternalAxiosRequestConfig } from "axios"

export const TOKEN_KEY = "access_token"
export const REFRESH_KEY = "refresh_token"

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY)
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

type FailedRequest = {
  resolve: (token: string) => void
  reject: (err: unknown) => void
}

let isRefreshing = false
let failedQueue: FailedRequest[] = []

function processQueue(error: unknown, token: string | null) {
  failedQueue.forEach((p) => (token ? p.resolve(token) : p.reject(error)))
  failedQueue = []
}

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config as InternalAxiosRequestConfig & { _retry?: boolean }

    if (error.response?.status !== 401 || original._retry) {
      return Promise.reject(error)
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: (token) => {
            original.headers.Authorization = `Bearer ${token}`
            resolve(axiosInstance(original))
          },
          reject,
        })
      })
    }

    original._retry = true
    isRefreshing = true

    const refresh = localStorage.getItem(REFRESH_KEY)

    if (!refresh) {
      isRefreshing = false
      processQueue(error, null)
      localStorage.clear()
      window.location.href = "/login"
      return Promise.reject(error)
    }

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/token/refresh/`,
        { refresh }
      )
      const newAccess: string = data.access
      localStorage.setItem(TOKEN_KEY, newAccess)
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${newAccess}`
      processQueue(null, newAccess)
      original.headers.Authorization = `Bearer ${newAccess}`
      return axiosInstance(original)
    } catch (err) {
      processQueue(err, null)
      localStorage.clear()
      window.location.href = "/login"
      return Promise.reject(err)
    } finally {
      isRefreshing = false
    }
  }
)

export function request<T>(config: {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
  url: string
  data?: object
  params?: object
}): Promise<T> {
  return axiosInstance(config).then((res) => res.data)
}

export type ApiResponse<T> = {
  success: boolean
  message: string
  data: T
}

export function getApiError(error: unknown, fallback: string): string | null {
  if (!error) return null
  const msg = (error as { response?: { data?: { message?: string } } })?.response?.data?.message
  return msg ?? fallback
}
