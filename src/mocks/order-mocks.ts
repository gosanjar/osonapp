import type { Order } from "@/entities/order/types"
import { faker } from "@faker-js/faker"

export const orderMocks = (count = 10): Order[] => {
  return Array.from({ length: count }).map(() => {
    const price = Number(
      faker.commerce.price({ min: 10000, max: 50000, dec: 0 })
    )
    const quantity = faker.number.int({ min: 1, max: 10 })

    return {
      id: faker.string.uuid(),
      client: faker.person.fullName(),
      phone: faker.phone.number({ style: "national" }),
      product: faker.commerce.productName(),
      price,
      quantity,
      total: price * quantity,
      createdAt: faker.date.recent().toISOString(),
      status: faker.helpers.arrayElement(["pending", "paid", "cancelled"]),
    }
  })
}
