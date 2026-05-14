import api from "./index"

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

export type AuthResponse = {
  user: AuthUser
}

export const authApi = {
  login: (data: LoginPayload) => api.post<AuthResponse>("/auth/login/", data),

  register: (data: RegisterPayload) =>
    api.post<AuthResponse>("/auth/register/", data),

  logout: () => api.post("/auth/logout/"),

  me: () => api.get<AuthUser>("/auth/me/"),
}
