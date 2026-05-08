export type Customer = {
  id: string
  name: string
  phone: string
  email: string
  ordersCount: number
  totalSpent: number
  createdAt: string
  status: "active" | "inactive"
}
