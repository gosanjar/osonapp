import { Suspense, useMemo } from "react"
import {
  RouterProvider,
  type RouteObject,
  createBrowserRouter,
} from "react-router-dom"
import router from "../router"
import { HugeiconsIcon } from "@hugeicons/react"
import { Loading03Icon } from "@hugeicons/core-free-icons"
import Flex from "@/shared/ui/flex"
import { AuthProvider } from "./auth-provider"

const getSubdomain = () => {
  const hostname = window.location.hostname
  const parts = hostname.split(".")
  if (parts.length >= 3) return parts[0]
  // *.localhost (e.g. app.localhost)
  if (parts.length === 2 && parts[1] === "localhost") return parts[0]
  return null
}

const subdomain = getSubdomain()
export const isMainDomain = subdomain === null
export const isAppDomain = subdomain === "app"

export const Routes = () => {
  const routes = useMemo(
    () => createBrowserRouter(router() as RouteObject[]),
    []
  )

  const content = (
    <Suspense
      fallback={
        <Flex
          direction="column"
          className="h-screen w-screen items-center justify-center"
        >
          <HugeiconsIcon icon={Loading03Icon} size={32} />
        </Flex>
      }
    >
      <RouterProvider router={routes} />
    </Suspense>
  )

  if (isAppDomain) {
    return <AuthProvider>{content}</AuthProvider>
  }

  return content
}
