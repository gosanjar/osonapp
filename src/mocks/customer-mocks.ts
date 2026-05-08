import type { Customer } from "@/entities/customer/types"

const names = [
  "Alisher Karimov",
  "Malika Yusupova",
  "Jasur Toshmatov",
  "Nilufar Rahimova",
  "Bobur Mirzayev",
  "Dilnoza Hasanova",
  "Sherzod Ergashev",
  "Zulfiya Abdullayeva",
  "Ulugbek Normatov",
  "Feruza Qodirova",
]

export function customerMocks(count = 10): Customer[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `c-${i + 1}`,
    name: names[i % names.length],
    phone: `+998 ${90 + (i % 9)}${String(i).padStart(1, "0")} ${String(1000000 + i * 137).slice(0, 3)} ${String(1000000 + i * 137).slice(3, 7)}`,
    email: `user${i + 1}@example.com`,
    ordersCount: Math.floor(Math.random() * 20),
    totalSpent: Math.floor(Math.random() * 5000000) + 100000,
    createdAt: new Date(2024, i % 12, (i % 28) + 1).toLocaleDateString("uz-UZ"),
    status: i % 5 === 0 ? "inactive" : "active",
  }))
}
