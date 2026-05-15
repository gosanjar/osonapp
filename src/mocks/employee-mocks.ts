export type Employee = {
  id: string
  firstName: string
  lastName: string
  phone: string
  role: string
  status: "active" | "blocked"
}

const firstNames = ["Alisher", "Jasur", "Bobur", "Sherzod", "Ulugbek", "Malika", "Nilufar", "Dilnoza", "Zulfiya", "Feruza"]
const lastNames = ["Karimov", "Toshmatov", "Mirzayev", "Ergashev", "Normatov", "Yusupova", "Rahimova", "Hasanova", "Abdullayeva", "Qodirova"]
const roles = ["Admin", "Menejer", "Operator", "Kassir"]

export function employeeMocks(count = 10): Employee[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `e-${i + 1}`,
    firstName: firstNames[i % firstNames.length],
    lastName: lastNames[i % lastNames.length],
    phone: `+998${90 + (i % 9)}${String(1000000 + i * 137).slice(0, 7)}`,
    role: roles[i % roles.length],
    status: i % 6 === 0 ? "blocked" : "active",
  }))
}
