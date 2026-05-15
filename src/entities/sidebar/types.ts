import type { PermissionKey } from "@/entities/auth/types"

export type ISidebarMenuTree = {
  path: string
  label: string
  icon?: React.ReactNode
  section?: string
  depth?: number
  count?: number
  permission?: PermissionKey
  children?: ISidebarMenuTree[]
}
