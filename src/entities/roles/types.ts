export type Permission = {
  id: number
  key: string
  label: string
}

export type Role = {
  id: string
  name: string
  key: string
  permissions: Permission[]
  created_at: string
  updated_at: string
}

export type RoleCreateData = {
  name: string
  key: string
  permissions: string[]
}
