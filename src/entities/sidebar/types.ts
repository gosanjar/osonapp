export type ISidebarMenuTree = {
  path: string
  label: string
  icon?: React.ReactNode
  section?: string
  depth?: number
  count?: number
  children?: ISidebarMenuTree[]
}
