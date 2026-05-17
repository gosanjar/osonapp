import { request, type ApiResponse } from "@/shared/api"
import type { AuthData } from "./types"

export class AuthApi {
  static async login(data: { phone_number: string; password: string }) {
    return request<ApiResponse<AuthData>>({ method: "POST", url: "/auth/login/", data })
  }

  static async register(data: {
    first_name: string
    last_name: string
    phone_number: string
    password: string
    subdomain: string
    register_token: string
  }) {
    return request<ApiResponse<AuthData>>({ method: "POST", url: "/auth/register/", data })
  }

  static async me() {
    return request<ApiResponse<AuthData>>({ method: "GET", url: "/auth/me/" })
  }

  static async forgotPassword(phone_number: string) {
    return request<ApiResponse<{ message: string }>>({
      method: "POST",
      url: "/auth/forgot-password/",
      data: { phone_number },
    })
  }

  static async resetPassword(phone_number: string, reset_token: string, new_password: string) {
    return request<ApiResponse<{ message: string }>>({
      method: "POST",
      url: "/auth/reset-password/",
      data: { phone_number, reset_token, new_password },
    })
  }

  static async botLogin(bot_token: string) {
    return request<ApiResponse<AuthData>>({
      method: "POST",
      url: "/auth/bot-login/",
      data: { bot_token },
    })
  }

  static async checkPhone(phone_number: string) {
    return request<ApiResponse<{ exists: boolean }>>({
      method: "POST",
      url: "/auth/check-phone/",
      data: { phone_number },
    })
  }

  static async logout() {
    return request<ApiResponse<object>>({ method: "POST", url: "/auth/logout/" })
  }
}
