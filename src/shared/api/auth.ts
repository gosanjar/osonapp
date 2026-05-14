import api from "./index"

export type LoginPayload = {
  phone: string
  password: string
}

export type RegisterPayload = {
  firstName: string
  lastName: string
  phone: string
  password: string
  shopName: string
}

export type AuthUser = {
  id: string
  firstName: string
  lastName: string
  phone: string
  shopSlug: string
}

export type AuthResponse = {
  user: AuthUser
}

export const authApi = {
  login: (data: LoginPayload) => api.post<AuthResponse>("/auth/login", data),

  register: (data: RegisterPayload) =>
    api.post<AuthResponse>("/auth/register", data),

  logout: () => api.post("/auth/logout"),

  me: () => api.get<AuthUser>("/auth/me"),
}
