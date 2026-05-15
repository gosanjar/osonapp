export type Employee = {
  id: string
  first_name: string
  last_name: string
  phone_number: string
  staff_role: number
  is_active: boolean
}

export type EmployeeCreateData = {
  first_name: string
  last_name: string
  phone_number: string
  password: string
  staff_role: string
  is_active: boolean
}
