import { request, type ApiResponse } from "@/shared/api"
import type { Employee, EmployeeCreateData } from "./types"

type EmployeeListResponse = ApiResponse<{
  results: Employee[]
  count: number
}>

export class EmployeesApi {
  static async list() {
    return request<EmployeeListResponse>({ method: "GET", url: "/auth/staff/" })
  }

  static async get(id: string) {
    return request<ApiResponse<Employee>>({ method: "GET", url: `/auth/staff/${id}/` })
  }

  static async create(data: EmployeeCreateData) {
    return request<ApiResponse<Employee>>({ method: "POST", url: "/auth/staff/", data })
  }

  static async update(id: string, data: Partial<EmployeeCreateData>) {
    return request<ApiResponse<Employee>>({ method: "PATCH", url: `/auth/staff/${id}/`, data })
  }

  static async remove(id: string) {
    return request<ApiResponse<null>>({ method: "DELETE", url: `/auth/staff/${id}/` })
  }
}
