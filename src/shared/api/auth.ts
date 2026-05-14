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
  register_token: string
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

  static sendRegisterOtp(phone_number: string) {
    return () =>
      request<ApiResponse<object>>({
        method: "POST",
        url: "/auth/send-register-otp/",
        data: { phone_number },
      })
  }

  static verifyRegisterOtp(phone_number: string, otp: string) {
    return () =>
      request<ApiResponse<{ register_token: string }>>({
        method: "POST",
        url: "/auth/verify-register-otp/",
        data: { phone_number, otp },
      })
  }

  static forgotPassword(phone_number: string) {
    return () =>
      request<ApiResponse<object>>({
        method: "POST",
        url: "/auth/forgot-password/",
        data: { phone_number },
      })
  }

  static verifyOtp(phone_number: string, otp: string) {
    return () =>
      request<ApiResponse<{ reset_token: string }>>({
        method: "POST",
        url: "/auth/verify-otp/",
        data: { phone_number, otp },
      })
  }

  static resetPassword(phone_number: string, reset_token: string, new_password: string) {
    return () =>
      request<ApiResponse<object>>({
        method: "POST",
        url: "/auth/reset-password/",
        data: { phone_number, reset_token, new_password },
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
