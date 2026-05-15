import type { ReactNode } from "react"
import { usePermission } from "@/shared/hooks/use-permission"
import type { PermissionKey } from "@/entities/auth/types"

type CanAccessProps = {
  permission: PermissionKey
  children: ReactNode
  fallback?: ReactNode
}

export function CanAccess({ permission, children, fallback = null }: CanAccessProps) {
  const allowed = usePermission(permission)
  return allowed ? <>{children}</> : <>{fallback}</>
}
