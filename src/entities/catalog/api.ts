import { request, type ApiResponse } from "@/shared/api"
import type {
  Category, CategoryCreateData,
  Product, ProductCreateData,
  InventoryUpdateData,
  Recommendation, RecommendationCreateData,
  ImportBatch, ImportBatchCreateData,
} from "./types"

type PaginatedResponse<T> = ApiResponse<{
  total: number
  current_page: number
  last_page: number
  per_page: number
  next: number | null
  previous: number | null
  results: T[]
}>

// ── Categories ───────────────────────────────────────────────────────────────

export class CategoriesApi {
  static async list(params?: { page?: number; page_size?: number }) {
    return request<PaginatedResponse<Category>>({ method: "GET", url: "/catalog/categories/", params })
  }

  static async get(id: number) {
    return request<ApiResponse<Category>>({ method: "GET", url: `/catalog/categories/${id}/` })
  }

  static async create(data: CategoryCreateData) {
    return request<ApiResponse<Category>>({ method: "POST", url: "/catalog/categories/", data })
  }

  static async update(id: number, data: Partial<CategoryCreateData>) {
    return request<ApiResponse<Category>>({ method: "PATCH", url: `/catalog/categories/${id}/`, data })
  }

  static async remove(id: number) {
    return request<ApiResponse<null>>({ method: "DELETE", url: `/catalog/categories/${id}/` })
  }
}

// ── Products ──────────────────────────────────────────────────────────────────

export class ProductsApi {
  static async list(params?: { page?: number; page_size?: number; category?: number; is_active?: boolean; search?: string }) {
    return request<PaginatedResponse<Product>>({ method: "GET", url: "/catalog/products/", params })
  }

  static async get(id: number) {
    return request<ApiResponse<Product>>({ method: "GET", url: `/catalog/products/${id}/` })
  }

  static async create(data: ProductCreateData) {
    return request<ApiResponse<Product>>({ method: "POST", url: "/catalog/products/", data })
  }

  static async update(id: number, data: Partial<ProductCreateData>) {
    return request<ApiResponse<Product>>({ method: "PATCH", url: `/catalog/products/${id}/`, data })
  }

  static async remove(id: number) {
    return request<ApiResponse<null>>({ method: "DELETE", url: `/catalog/products/${id}/` })
  }
}

// ── Inventory ─────────────────────────────────────────────────────────────────

export class InventoryApi {
  static async list(params?: { page?: number; page_size?: number; search?: string }) {
    return request<PaginatedResponse<Product>>({ method: "GET", url: "/catalog/inventory/", params })
  }

  static async update(id: number, data: InventoryUpdateData) {
    return request<ApiResponse<Product>>({ method: "PATCH", url: `/catalog/inventory/${id}/`, data })
  }
}

// ── Recommendations ───────────────────────────────────────────────────────────

export class RecommendationsApi {
  static async list(params?: { page?: number; page_size?: number }) {
    return request<PaginatedResponse<Recommendation>>({ method: "GET", url: "/catalog/recommendations/", params })
  }

  static async create(data: RecommendationCreateData) {
    return request<ApiResponse<Recommendation>>({ method: "POST", url: "/catalog/recommendations/", data })
  }

  static async update(id: number, data: Partial<RecommendationCreateData>) {
    return request<ApiResponse<Recommendation>>({ method: "PATCH", url: `/catalog/recommendations/${id}/`, data })
  }

  static async remove(id: number) {
    return request<ApiResponse<null>>({ method: "DELETE", url: `/catalog/recommendations/${id}/` })
  }
}

// ── Imports ───────────────────────────────────────────────────────────────────

export class ImportsApi {
  static async list(params?: { page?: number; page_size?: number }) {
    return request<PaginatedResponse<ImportBatch>>({ method: "GET", url: "/catalog/imports/", params })
  }

  static async get(id: number) {
    return request<ApiResponse<ImportBatch>>({ method: "GET", url: `/catalog/imports/${id}/` })
  }

  static async create(data: ImportBatchCreateData) {
    return request<ApiResponse<ImportBatch>>({ method: "POST", url: "/catalog/imports/", data })
  }
}
