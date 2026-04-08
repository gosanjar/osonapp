export type Order = {
  id: string
  client: string
  phone: string
  product: string
  price: number
  quantity: number
  total: number
  createdAt: string
  status: "pending" | "paid" | "cancelled"
}
