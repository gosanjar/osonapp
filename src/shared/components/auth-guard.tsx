import { Outlet } from "react-router-dom"
import { useAuth } from "@/shared/providers/auth-provider"
import Flex from "@/shared/ui/flex"
import { HugeiconsIcon } from "@hugeicons/react"
import { Loading03Icon } from "@hugeicons/core-free-icons"

export function AuthGuard() {
  const { state } = useAuth()

  if (state.status === "loading") {
    return (
      <Flex
        direction="column"
        align="center"
        justify="center"
        className="h-screen w-screen"
      >
        <HugeiconsIcon icon={Loading03Icon} size={32} className="animate-spin" />
      </Flex>
    )
  }

  if (state.status === "unauthenticated") {
    window.location.assign(
      (import.meta.env.VITE_MAIN_URL || "https://osonapp.uz") + "/login"
    )
    return null
  }

  return <Outlet />
}
