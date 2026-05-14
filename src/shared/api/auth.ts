import { request } from "./index"

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
  static async login(data: { phone_number: string; password: string }) {
    return await request<ApiResponse<AuthData>>({ method: "POST", url: "/auth/login/", data })
  }

  static async register(data: {
    first_name: string
    last_name: string
    phone_number: string
    password: string
    shop_name: string
    register_token: string
  }) {
    return await request<ApiResponse<AuthData>>({ method: "POST", url: "/auth/register/", data })
  }

  static async me() {
    return await request<ApiResponse<AuthUser>>({ method: "GET", url: "/auth/me/" })
  }

  static async sendRegisterOtp(phone_number: string) {
    return await request<ApiResponse<{ method?: string }>>({
      method: "POST",
      url: "/auth/send-register-otp/",
      data: { phone_number },
    })
  }

  static async verifyRegisterOtp(phone_number: string, otp: string) {
    return await request<ApiResponse<{ register_token: string }>>({
      method: "POST",
      url: "/auth/verify-register-otp/",
      data: { phone_number, otp },
    })
  }

  static async forgotPassword(phone_number: string) {
    return await request<ApiResponse<object>>({
      method: "POST",
      url: "/auth/forgot-password/",
      data: { phone_number },
    })
  }

  static async verifyOtp(phone_number: string, otp: string) {
    return await request<ApiResponse<{ reset_token: string }>>({
      method: "POST",
      url: "/auth/verify-otp/",
      data: { phone_number, otp },
    })
  }

  static async resetPassword(phone_number: string, reset_token: string, new_password: string) {
    return await request<ApiResponse<object>>({
      method: "POST",
      url: "/auth/reset-password/",
      data: { phone_number, reset_token, new_password },
    })
  }

  static async checkPhone(phone_number: string) {
    return await request<ApiResponse<{ exists: boolean }>>({
      method: "POST",
      url: "/auth/check-phone/",
      data: { phone_number },
    })
  }

  static async checkPreReg(phone_number: string) {
    return await request<ApiResponse<{ ready: boolean; register_token?: string }>>({
      method: "POST",
      url: "/auth/check-pre-reg/",
      data: { phone_number },
    })
  }

  static async logout() {
    return await request<ApiResponse<object>>({ method: "POST", url: "/auth/logout/" })
  }
}
