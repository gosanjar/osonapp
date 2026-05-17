export type Category = {
  id: number
  name: { uz: string; ru: string }
  image: string | null
  parent: number | null
  is_active: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export type CategoryCreateData = {
  name: { uz: string; ru: string }
  image?: string | null
  parent?: number | null
  is_active?: boolean
  sort_order?: number
}

export type Product = {
  id: number
  category: number | null
  category_name: { uz: string; ru: string } | null
  title: { uz: string; ru: string }
  description: { uz: string; ru: string }
  price: number
  compare_price: number | null
  cost: number | null
  sku: string | null
  barcode: string | null
  quantity: number
  track_quantity: boolean
  images: string[]
  video: string | null
  tags: string[]
  is_active: boolean
  is_trend: boolean
  created_at: string
  updated_at: string
}

export type ProductCreateData = {
  category?: number | null
  title: { uz: string; ru: string }
  description?: { uz: string; ru: string }
  price: number
  compare_price?: number | null
  cost?: number | null
  sku?: string | null
  barcode?: string | null
  quantity?: number
  track_quantity?: boolean
  images?: string[]
  video?: string | null
  tags?: string[]
  is_active?: boolean
  is_trend?: boolean
}

export type InventoryUpdateData = {
  quantity?: number
  track_quantity?: boolean
  sku?: string | null
  barcode?: string | null
}

export type Recommendation = {
  id: number
  product: number
  product_title: { uz: string; ru: string } | null
  recommended_products: number[]
  recommended_products_data: { id: number; title: { uz: string; ru: string } }[]
  limit: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export type RecommendationCreateData = {
  product: number
  recommended_products: number[]
  limit?: number
  is_active?: boolean
}

export type ImportBatch = {
  id: number
  name: string
  file_type: string
  status: "pending" | "processing" | "completed" | "failed"
  total_count: number
  success_count: number
  error_count: number
  created_at: string
  updated_at: string
}

export type ImportBatchCreateData = {
  name: string
  file_type: string
}
