import { request, type ApiResponse } from "@/shared/api"
import type { Role, RoleCreateData, Permission } from "./types"

type RoleListResponse = ApiResponse<{ results: Role[]; count: number }>
type PermissionListResponse = ApiResponse<Permission[]>

export class RolesApi {
  static async list() {
    return request<RoleListResponse>({ method: "GET", url: "/auth/roles/" })
  }

  static async get(id: string) {
    return request<ApiResponse<Role>>({ method: "GET", url: `/auth/roles/${id}/` })
  }

  static async create(data: RoleCreateData) {
    return request<ApiResponse<Role>>({ method: "POST", url: "/auth/roles/", data })
  }

  static async update(id: string, data: Partial<RoleCreateData>) {
    return request<ApiResponse<Role>>({ method: "PATCH", url: `/auth/roles/${id}/`, data })
  }

  static async remove(id: string) {
    return request<ApiResponse<null>>({ method: "DELETE", url: `/auth/roles/${id}/` })
  }

  static async permissions() {
    return request<PermissionListResponse>({ method: "GET", url: "/auth/permissions/" })
  }
}
