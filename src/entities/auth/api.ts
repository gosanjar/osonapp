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
    shop_name: string
    register_token: string
  }) {
    return request<ApiResponse<AuthData>>({ method: "POST", url: "/auth/register/", data })
  }

  static async me() {
    return request<ApiResponse<AuthData>>({ method: "GET", url: "/auth/me/" })
  }

  static async sendRegisterOtp(phone_number: string) {
    return request<ApiResponse<{ method?: string }>>({
      method: "POST",
      url: "/auth/send-register-otp/",
      data: { phone_number },
    })
  }

  static async verifyRegisterOtp(phone_number: string, otp: string) {
    return request<ApiResponse<{ register_token: string }>>({
      method: "POST",
      url: "/auth/verify-register-otp/",
      data: { phone_number, otp },
    })
  }

  static async forgotPassword(phone_number: string) {
    return request<ApiResponse<object>>({
      method: "POST",
      url: "/auth/forgot-password/",
      data: { phone_number },
    })
  }

  static async verifyOtp(phone_number: string, otp: string) {
    return request<ApiResponse<{ reset_token: string }>>({
      method: "POST",
      url: "/auth/verify-otp/",
      data: { phone_number, otp },
    })
  }

  static async resetPassword(phone_number: string, reset_token: string, new_password: string) {
    return request<ApiResponse<object>>({
      method: "POST",
      url: "/auth/reset-password/",
      data: { phone_number, reset_token, new_password },
    })
  }

  static async checkPhone(phone_number: string) {
    return request<ApiResponse<{ exists: boolean }>>({
      method: "POST",
      url: "/auth/check-phone/",
      data: { phone_number },
    })
  }

  static async checkPreReg(phone_number: string) {
    return request<ApiResponse<{ ready: boolean; register_token?: string }>>({
      method: "POST",
      url: "/auth/check-pre-reg/",
      data: { phone_number },
    })
  }

  static async logout() {
    return request<ApiResponse<object>>({ method: "POST", url: "/auth/logout/" })
  }
}
