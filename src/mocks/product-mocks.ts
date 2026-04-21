import type { Product } from "@/entities/category/types"
import { faker } from "@faker-js/faker"

export const productMocks = (count = 10): Product[] => {
  return Array.from({ length: count }).map(() => {
    const price = faker.number.int({ min: 10000, max: 500000 })
    const quantity = faker.number.int({ min: 0, max: 100 })

    return {
      id: faker.string.uuid(),
      title: {
        uz: faker.commerce.productName(),
        ru: faker.commerce.productName(),
      },
      description: {
        uz: faker.lorem.paragraph(),
        ru: faker.lorem.paragraph(),
      },
      media: {
        images: [faker.image.urlPicsumPhotos()],
        video: faker.datatype.boolean() ? faker.internet.url() : undefined,
      },
      pricing: {
        price,
        comparePrice: price + faker.number.int({ min: 1000, max: 10000 }),
        cost: price - faker.number.int({ min: 1000, max: 5000 }),
        margin: faker.number.int({ min: 10, max: 50 }),
        profit: faker.number.int({ min: 1000, max: 10000 }),
      },
      inventory: {
        quantity,
        trackQuantity: faker.datatype.boolean(),
        warehouse: "Asosiy ombor",
        sku: faker.string.alphanumeric(8).toUpperCase(),
        barcode: faker.string.numeric(13),
      },
      variants: [
        {
          id: faker.string.uuid(),
          options: {
            color: faker.helpers.arrayElement(["qora", "oq"]),
            size: faker.helpers.arrayElement(["s", "m", "xl"]),
          },
          price,
          quantity,
          sku: faker.string.alphanumeric(8),
          barcode: faker.string.numeric(13),
        },
      ],
      category: faker.commerce.department(),
      brand: faker.company.name(),
      tags: faker.helpers.arrayElements(["yangi", "top", "chegirma"], 2),
      is_active: faker.datatype.boolean(),
      is_trend: faker.datatype.boolean(),
      createdAt: faker.date.past().toISOString(),
      updatedAt: faker.date.recent().toISOString(),
    }
  })
}
