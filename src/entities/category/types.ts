export type Product = {
  id: string
  title: {
    uz: string
    ru: string
  }
  description: {
    uz: string
    ru: string
  }
  media: {
    images: string[]
    video?: string
  }
  pricing: {
    price: number
    comparePrice?: number
    cost?: number
    margin?: number
    profit?: number
  }
  inventory: {
    quantity: number
    trackQuantity: boolean
    warehouse?: string
    sku?: string
    barcode?: string
  }
  variants: ProductVariant[]
  category?: string
  brand?: string
  tags: string[]
  is_active: boolean
  is_trend: boolean
  createdAt: string
  updatedAt: string
}

export type ProductVariant = {
  id: string
  options: Record<string, string>
  price: number
  quantity: number
  sku?: string
  barcode?: string
}
