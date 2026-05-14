import { request } from "./index"

export type LoginPayload = {
  phone_number: string
  password: string
}

export type RegisterPayload = {
  first_name: string
  last_name: string
  phone_number: string
  password: string
  shop_name: string
}

export type AuthUser = {
  id: string
  first_name: string
  last_name: string
  phone_number: string
  subdomain: string
}

export type ApiResponse<T> = {
  success: boolean
  message: string
  data: T
}

export type AuthData = {
  user: AuthUser
  access?: string
  refresh?: string
}

export class AuthApi {
  static login(data: LoginPayload) {
    return () =>
      request<ApiResponse<AuthData>>({
        method: "POST",
        url: "/auth/login/",
        data,
      })
  }

  static register(data: RegisterPayload) {
    return () =>
      request<ApiResponse<AuthData>>({
        method: "POST",
        url: "/auth/register/",
        data,
      })
  }

  static me() {
    return () =>
      request<ApiResponse<AuthUser>>({
        method: "GET",
        url: "/auth/me/",
      })
  }

  static logout() {
    return () =>
      request<ApiResponse<object>>({
        method: "POST",
        url: "/auth/logout/",
      })
  }
}
