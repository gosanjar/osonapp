import { useAuthStore } from "@/shared/store/auth.store"
import type { PermissionKey } from "@/entities/auth/types"

export function usePermission(key: PermissionKey): boolean {
  const user = useAuthStore((s) => s.user)
  if (!user) return false
  if (user.role === "owner") return true
  if (user.role === "staff") return user.permissions.includes(key)
  return false
}
